import { OrmClass } from "@/utils/http/orm"
import { PresOrderEntity } from './model/presOrderModel'

export class PresOrderModuleClass extends OrmClass<PresOrderEntity> {
  constructor(public search_db = 'PresOrder' as const) {
    super(search_db)
  }
}

export const PresOrderModule = new PresOrderModuleClass()

export function getPresOrderListApi(params) {
  return PresOrderModule.select().closeState().getMany(params)
}

export function getPresOrderInfoApi(params) {
  return PresOrderModule.select()
    .where({ fild: { id: params.id }, type: '=' })
    .getOne(params)
}

export function addPresOrderApi(params: PresOrderEntity) {
  return PresOrderModule.insert().values(params).execute()
}

export function delPresOrderApi(params) {
  return PresOrderModule.delete()
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function updatePresOrderApi(params: PresOrderEntity) {
  return PresOrderModule.update()
    .set(params)
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function uploadPresOrderFile(file) {
  return PresOrderModule.file().upload(file)
}

export function getPresOrderFilePath(file_name) {
  return PresOrderModule.file().getPath(file_name)
}
