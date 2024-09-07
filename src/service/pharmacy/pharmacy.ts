import { OrmClass } from "@/utils/http/orm"
import { PharmacyEntity } from './model/pharmacyModel'

export class PharmacyModuleClass extends OrmClass<PharmacyEntity> {
  constructor(public search_db = 'Pharmacy' as const) {
    super(search_db)
  }
}

export const PharmacyModule = new PharmacyModuleClass()

export function getPharmacyListApi(params) {
  return PharmacyModule.select().closeState().getMany(params)
}

export function getPharmacyInfoApi(params) {
  return PharmacyModule.select()
    .where({ fild: { id: params.id }, type: '=' })
    .getOne(params)
}

export function addPharmacyApi(params: PharmacyEntity) {
  return PharmacyModule.insert().values(params).execute()
}

export function delPharmacyApi(params) {
  return PharmacyModule.delete()
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function updatePharmacyApi(params: PharmacyEntity) {
  return PharmacyModule.update()
    .set(params)
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function uploadPharmacyFile(file) {
  return PharmacyModule.file().upload(file)
}

export function getPharmacyFilePath(file_name) {
  return PharmacyModule.file().getPath(file_name)
}
