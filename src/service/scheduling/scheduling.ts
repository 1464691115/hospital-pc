import { OrmClass } from "@/utils/http/orm"
import { SchedulingEntity } from './model/schedulingModel'
import { DoctorModule, DoctorModuleClass } from '../doctor/doctor'
import { pick } from 'lodash-es'
import { DepartmentModuleClass } from '../department/department'
import { HospitalModuleClass } from '../hospital/hospital'

const LeftJoinClass = [
  DoctorModuleClass,
  DepartmentModuleClass,
  HospitalModuleClass,
] as const

export class SchedulingModuleClass extends OrmClass<SchedulingEntity> {
  constructor(public search_db = 'Scheduling' as const) {
    super(search_db)
  }

  public queryParams = pick(
    new SchedulingEntity(),
    'department_id',
    'hospital_id',
  )
}

export const SchedulingModule = new SchedulingModuleClass()

export function getSchedulingListApi(params) {
  return SchedulingModule.select()
    .leftJoinAndSelect(LeftJoinClass, {
      'Doctors.id': 'doctors_id',
      'Department.id': 'department_id',
      'Hospital.id': 'hospital_id',
    })
    .where({ fild: pick(params, 'department_id', 'hospital_id'), type: '=' })
    .orWhere({
      fild: {
        [`${DoctorModule.search_db}.name`]: params.name,
      },
      type: '%',
    })
    .getAll(params)
}

export function getSchedulingInfoApi(params) {
  return SchedulingModule.select()
    .where({ fild: { id: params.id }, type: '=' })
    .getOne(params)
}

export function updateSchedulingApi(params) {
  return SchedulingModule.update()
    .set(params)
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function getSchedulingFilePath(file_name) {
  return SchedulingModule.file().getPath(file_name)
}
