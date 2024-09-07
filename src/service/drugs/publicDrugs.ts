import { OrmClass } from "@/utils/http/orm"
import { PublicDrugsEntity } from './model/publicDrugsModel'

export class PublicDrugsModuleClass extends OrmClass<PublicDrugsEntity> {
  constructor(public search_db = 'PublicDrugs' as const) {
    super(search_db)
  }
}

const PublicDrugsModule = new PublicDrugsModuleClass()

export function getPublicDrugsListApi(params) {
  return PublicDrugsModule.select().closeState().getMany(params)
}

export function getPublicDrugsInfoApi(params) {
  return PublicDrugsModule.select()
    .where({ fild: { id: params.id }, type: '=' })
    .getOne(params)
}

export function addPublicDrugsApi(params: PublicDrugsEntity) {
  return PublicDrugsModule.insert().values(params).execute()
}

export function delPublicDrugsApi(params) {
  return PublicDrugsModule.delete()
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function updatePublicDrugsApi(params: PublicDrugsEntity) {
  return PublicDrugsModule.update()
    .set(params)
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function uploadPublicDrugsFile(file) {
  return PublicDrugsModule.file().upload(file)
}

export function getPublicDrugsFilePath(file_name) {
  return PublicDrugsModule.file().getPath(file_name)
}
