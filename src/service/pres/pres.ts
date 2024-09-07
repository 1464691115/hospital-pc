import { OrmClass } from "@/utils/http/orm"
import { PresEntity } from './model/presModel'

export class PresModuleClass extends OrmClass<PresEntity> {
  constructor(public search_db = 'Pres' as const) {
    super(search_db)
  }
}

export const PresModule = new PresModuleClass()

export function getPresListApi(params) {
  return PresModule.select().closeState().getMany(params)
}

export function getPresInfoApi(params) {
  return PresModule.select()
    .closeState()
    .where({ fild: { id: params.id }, type: '=' })
    .getOne(params)
}

export function addPresApi(params: PresEntity) {
  return PresModule.insert().values(params).execute()
}

export function delPresApi(params) {
  return PresModule.delete()
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function updatePresApi(params: PresEntity) {
  return PresModule.update()
    .set(params)
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function uploadPresFile(file) {
  return PresModule.file().upload(file)
}

export function getPresFilePath(file_name) {
  return PresModule.file().getPath(file_name)
}
