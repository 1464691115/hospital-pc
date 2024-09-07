import { OrmClass } from "@/utils/http/orm"
import { PatientEntity } from './model/patientModel'
import { dateUtil } from '@/utils/dateUtil'

export class PatientModuleClass extends OrmClass<PatientEntity> {
  constructor(public search_db = 'Patient' as const) {
    super(search_db)
  }
}

const PatientModule = new PatientModuleClass()

export function formatPatientInfo(res: PatientEntity) {
  res.sex = Number(res.identity?.slice(-2, -1)) % 2 ? '男' : '女'
  res.age = dateUtil().diff(dateUtil(res.identity?.slice(6, 14)), 'years')

  return res
}

export async function getPatientListApi(params) {
  const res = await PatientModule.select().closeState().getMany(params)

  if (res.result?.list) res.result.list = res.result.list.map(formatPatientInfo)

  return res
}

export async function getPatientInfoApi(params) {
  const res = await PatientModule.select()
    .where({ fild: { id: params.id }, type: '=' })
    .getOne(params)

  return formatPatientInfo(res)
}

export function addPatientApi(params: PatientEntity) {
  return PatientModule.insert().values(params).execute()
}

export function delPatientApi(params) {
  return PatientModule.delete()
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function updatePatientApi(params: PatientEntity) {
  return PatientModule.update()
    .set(params)
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function uploadPatientFile(file) {
  return PatientModule.file().upload(file)
}

export function getPatientFilePath(file_name) {
  return PatientModule.file().getPath(file_name)
}
