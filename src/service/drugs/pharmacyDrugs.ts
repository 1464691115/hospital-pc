import { OrmClass } from "@/utils/http/orm"
import { PharmacyDrugsEntity } from './model/pharmacyDrugsModel'
import { PharmacyModuleClass } from '../pharmacy/pharmacy'

const LeftJoinClass = [PharmacyModuleClass] as const

export class PharmacyDrugsModuleClass extends OrmClass<PharmacyDrugsEntity> {
  constructor(public search_db = 'PharmacyDrugs' as const) {
    super(search_db)
  }
}

const PharmacyDrugsModule = new PharmacyDrugsModuleClass()

export function getPharmacyDrugsListApi(params) {
  return PharmacyDrugsModule.select()
    .closeState()
    .leftJoinAndSelect(LeftJoinClass, {
      'Pharmacy.id': 'pharmacy_id',
    })
    .getMany(params)
}

export function getPharmacyDrugsInfoApi(params) {
  return PharmacyDrugsModule.select()
    .where({ fild: { id: params.id }, type: '=' })
    .getOne(params)
}

export function addPharmacyDrugsApi(params: PharmacyDrugsEntity) {
  return PharmacyDrugsModule.insert().values(params).execute()
}

export function delPharmacyDrugsApi(params) {
  return PharmacyDrugsModule.delete()
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function updatePharmacyDrugsApi(params: PharmacyDrugsEntity) {
  return PharmacyDrugsModule.update()
    .set(params)
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function uploadPharmacyDrugsFile(file) {
  return PharmacyDrugsModule.file().upload(file)
}

export function getPharmacyDrugsFilePath(file_name) {
  return PharmacyDrugsModule.file().getPath(file_name)
}
