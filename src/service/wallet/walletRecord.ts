import { OrmClass } from "@/utils/http/orm"
import { WalletRecordEntity } from './model/walletRecordModel'
import { getUserRoleId } from '@/utils/auth'

export class WalletRecordModuleClass extends OrmClass<WalletRecordEntity> {
  constructor(public search_db = 'WalletRecord' as const) {
    super(search_db)
  }
}

export const WalletRecordModule = new WalletRecordModuleClass()

export function getWalletRecordListApi() {
  return WalletRecordModule.select()
    .where({
      fild: {
        userrole_id: getUserRoleId(),
      },
      type: '=',
    })
    .getMany()
}

export function getWalletRecordInfoApi() {
  return WalletRecordModule.select()
    .where({
      fild: {
        userrole_id: getUserRoleId(),
      },
      type: '=',
    })
    .getOne()
}
