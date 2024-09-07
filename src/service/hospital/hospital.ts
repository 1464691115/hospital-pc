import { OrmClass } from "@/utils/http/orm"
import { HospitalEntity } from './model/hospitalModel'

export class HospitalModuleClass extends OrmClass<HospitalEntity> {
  constructor(public search_db = 'Hospital' as const) {
    super(search_db)
  }
}

export const HospitalModule = new HospitalModuleClass()

export function getHospitalListApi(params) {
  return HospitalModule.select().getMany(params)
}

export function getHospitalInfoApi(params) {
  return HospitalModule.select()
    .where({ fild: { id: params.id }, type: '=' })
    .getOne(params)
}

export function getHospitalOptionsApi() {
  return HospitalModule.select().find(['name', 'id']).getMany()
}

export function getHospitalFilePath(file_name) {
  return HospitalModule.file().getPath(file_name)
}
