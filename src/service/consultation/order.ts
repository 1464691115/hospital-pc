import { OrmClass } from "@/utils/http/orm"
import { ConsultationOrderEntity } from './model/orderModel'
import { HospitalModuleClass } from '../hospital/hospital'
import { DepartmentModuleClass } from '../department/department'
import { PatientModuleClass, formatPatientInfo } from '../patient/patient'
import { getDoctorId } from '@/utils/auth'
import { EntityClass } from "@/utils/http/orm/utils/Entity"
import { PresModuleClass } from '../pres/pres'
import { DoctorModuleClass } from '../doctor/doctor'

const LeftJoinClass = [
  DepartmentModuleClass,
  HospitalModuleClass,
  PatientModuleClass,
  PresModuleClass,
] as const

export class ConsultationOrderModuleClass extends OrmClass<ConsultationOrderEntity> {
  constructor(public search_db = 'ConsultationOrder' as const) {
    super(search_db)
  }
}

export const ConsultationOrderModule = new ConsultationOrderModuleClass()

export async function getConsultationOrderListApi(params = {}) {
  const res = await ConsultationOrderModule.select()
    .closeState()
    .leftJoinAndSelect(LeftJoinClass, {
      'Department.id': 'department_id',
      'Hospital.id': 'hospital_id',
      'Patient.id': 'patient_id',
      'Pres.consultationorder_id': 'id',
    })
    .where({
      fild: {
        ...new EntityClass(params, ConsultationOrderEntity).getValues(),
        doctors_id: getDoctorId(),
      },
      type: '=',
    })
    .getMany()

  if (res.result?.list)
    res.result.list = res.result.list?.map((el) => {
      el.Patient = formatPatientInfo(el.Patient || {})
      return el
    })

  return res
}

export async function getConsultationOrderInfoApi(params) {
  const res = await ConsultationOrderModule.select()
    .closeState()
    .leftJoinAndSelect([PatientModuleClass, DoctorModuleClass] as const, {
      'Doctor.id': 'doctors_id',
      'Patient.id': 'patient_id',
    })
    .where({ fild: { id: params.id }, type: '=' })
    .getOne(params)

  res.Patient = formatPatientInfo(res.Patient || {})

  return res
}

export function getConsultationOrderOptionsApi() {
  return ConsultationOrderModule.select().getMany()
}

export function updateConsultationOrderApi(params: ConsultationOrderEntity) {
  return ConsultationOrderModule.update()
    .delRoleIdParams()
    .set(params)
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function addConsultationOrderApi(params: ConsultationOrderEntity) {
  return ConsultationOrderModule.insert().values(params).execute()
}

export function getConsultationOrderFilePath(file_name) {
  return ConsultationOrderModule.file().getPath(file_name)
}
