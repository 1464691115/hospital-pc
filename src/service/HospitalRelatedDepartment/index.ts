import { OrmClass } from "@/utils/http/orm"
import { HospitalRelatedDepartmentEntity } from './model/HRelatedD'
import {
  DepartmentModule,
  DepartmentModuleClass,
} from '../department/department'
import { HospitalModule, HospitalModuleClass } from '../hospital/hospital'
import { SchedulingEntity } from '../scheduling/model/schedulingModel'
import { pick } from 'lodash-es'

const LeftJoinClass = [DepartmentModuleClass, HospitalModuleClass] as const

export class HospitalRelatedDepartmentModuleClass extends OrmClass<HospitalRelatedDepartmentEntity> {
  constructor(public search_db = 'HospitalRelatedDepartment' as const) {
    super(search_db)
  }

  public queryParams = pick(
    new SchedulingEntity(),
    'department_id',
    'hospital_id',
  )
}

export const HospitalRelatedDepartmentModule =
  new HospitalRelatedDepartmentModuleClass()

export function getHospitalRelatedDepartmentListApi(params) {
  return HospitalRelatedDepartmentModule.select()
    .leftJoinAndSelect(LeftJoinClass, {
      'Department.id': 'department_id',
      'Hospital.id': 'hospital_id',
    })
    .where({
      fild: params,
      type: '=',
    })
    .getMany(params)
}

export function getHospitalRelatedDepartmentInfoApi(params) {
  return HospitalRelatedDepartmentModule.select()
    .where({ fild: { id: params.id }, type: '=' })
    .getOne(params)
}

export function getHospitalRelatedDepartmentOptionsApi(params) {
  return HospitalRelatedDepartmentModule.select()
    .leftJoinAndSelect(LeftJoinClass, {
      'Department.id': 'department_id',
      'Hospital.id': 'hospital_id',
    })
    .find([
      `${DepartmentModule.search_db}.name`,
      `${HospitalModule.search_db}.name`,
      'department_id',
      'hospital_id',
      'id',
    ])
    .where({
      fild: params,
      type: '=',
    })
    .getMany(params)
}

export function getHospitalRelatedDepartmentFilePath(file_name) {
  return HospitalRelatedDepartmentModule.file().getPath(file_name)
}
