import { OrmClass } from "@/utils/http/orm"
import { WalletEntity } from './model/walletModel'
import { getDoctorId, getUserRoleId } from '@/utils/auth'
import { WalletRecordModule, WalletRecordModuleClass } from './walletRecord'
import { dateUtil } from '@/utils/dateUtil'
import { ConsultationOrderModule } from '../consultation/order'

export class WalletModuleClass extends OrmClass<WalletEntity> {
  constructor(public search_db = 'Wallet' as const) {
    super(search_db)
  }
}

const WalletModule = new WalletModuleClass()

export function getWalletInfoApi() {
  return WalletModule.select()
    .where({
      fild: {
        userrole_id: getUserRoleId(),
      },
      type: '=',
    })
    .getOne()
}

/** 我的收入 */
export async function getUserPayInfo() {
  const res = await WalletModule.select()
    .where({
      fild: {
        userrole_id: getUserRoleId(),
      },
      type: '=',
    })
    .getOne()

  const record = await WalletRecordModule.select()
    .where({
      fild: {
        computing_type: '+',
        wallet_id: res.id,
        state: 1,
      },
      type: '=',
    })
    .find(['money', 'computing_type', 'updated_at', 'created_at'])
    .getAll()

  const conOrder = await ConsultationOrderModule.select()
    .closeState()
    .where({
      fild: {
        doctors_id: getDoctorId(),
        state: 2,
      },
      type: '=',
    })
    .getCount()

  return record.result?.list?.reduce(
    (pre, cur) => {
      if (dateUtil(cur.created_at).isAfter(dateUtil().subtract(1, 'month'))) {
        setPrice('monthPrice')
      }

      setPrice('sumPrice')

      function setPrice(key: keyof typeof pre) {
        if (cur.computing_type == '+') pre[key] += Number(cur.money)
        else if (cur.computing_type == '-') pre[key] -= Number(cur.money)

        pre[key] = +pre[key].toFixed(2)
      }

      return pre
    },
    {
      sumPrice: 0,
      monthPrice: 0,
      interrogation: conOrder.result || 0,
    },
  )
}
