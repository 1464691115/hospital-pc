import { OrmClass } from "@/utils/http/orm"
import { DoctorEntity } from './model/doctorModel'
import { HospitalModuleClass } from '../hospital/hospital'
import { DepartmentModuleClass } from '../department/department'
import { ConsultationOrderModuleClass } from '../consultation/order'
import { PresModuleClass } from '../pres/pres'

const LeftJoinClass = [DepartmentModuleClass, HospitalModuleClass] as const

export class DoctorModuleClass extends OrmClass<DoctorEntity> {
  constructor(public search_db = 'Doctors' as const) {
    super(search_db)
  }
}

export const DoctorModule = new DoctorModuleClass()

export function getDoctorListApi(params) {
  return DoctorModule.select().getMany(params)
}

export function addDoctorApi(params) {
  return DoctorModule.insert().values(params).execute()
}

export function updateDoctorApi(params) {
  return DoctorModule.update()
    .set(params)
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function getDoctorInfoApi(params = {}) {
  return DoctorModule.select()
    .leftJoinAndSelect(LeftJoinClass, {
      'Department.id': 'department_id',
      'Hospital.id': 'hospital_id',
    })
    .where({ fild: params, type: '=' })
    .andWhere({ fild: { name: 'None' }, type: '!=' })
    .getOne(params)
}

export function getDoctorOptionsApi() {
  return DoctorModule.select().find(['name', 'id']).getMany()
}

export function uploadDoctorFile(file) {
  return DoctorModule.file().upload(file)
}

export function getDoctorFilePath(file_name) {
  return DoctorModule.file().getPath(file_name)
}

export async function getDoctorNum() {
  const res = await DoctorModule.select()
    .leftJoinAndSelect(
      [ConsultationOrderModuleClass, PresModuleClass] as const,
      {
        'ConsultationOrder.doctors_id': 'id',
        'Pres.doctors_id': 'id',
      },
      {},
      false,
    )
    .where({
      fild: {},
      type: '=',
    })
    .getOne({})

  const self_con = res.ConsultationOrder?.filter((el) => el.state == 2)

  return {
    pre: res.Pres?.filter((el) => el.state == 2).length,
    consultation: self_con?.length,
    patient: self_con?.reduce(
      (pre, cur) =>
        cur.patient_id && !pre.includes(cur.patient_id)
          ? pre.concat(cur.patient_id)
          : pre,
      [] as any[],
    ).length,
  }
}
