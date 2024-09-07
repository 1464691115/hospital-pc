import { OrmClass } from "@/utils/http/orm"
import { MedicalRecordEntity } from './model/medicalrecordModel'
import { RecordDetailsModuleClass } from './recordDetail'

export class MedicalRecordModuleClass extends OrmClass<MedicalRecordEntity> {
  constructor(public search_db = 'MedicalRecord' as const) {
    super(search_db)
  }
}

const MedicalRecordModule = new MedicalRecordModuleClass()

export function getMedicalRecordListApi(params) {
  return MedicalRecordModule.select().closeState().getMany(params)
}

export function getMedicalRecordInfoApi(params) {
  return MedicalRecordModule.select()
    .leftJoinAndSelect([RecordDetailsModuleClass], {
      'RecordDetails.patientmedicalrecord_id': 'id',
    })
    .where({ fild: { id: params.id }, type: '=' })
    .getOne(params)
}

export function addMedicalRecordApi(params: MedicalRecordEntity) {
  return MedicalRecordModule.insert().values(params).execute()
}

export function delMedicalRecordApi(params) {
  return MedicalRecordModule.delete()
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function updateMedicalRecordApi(params: MedicalRecordEntity) {
  return MedicalRecordModule.update()
    .set(params)
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function uploadMedicalRecordFile(file) {
  return MedicalRecordModule.file().upload(file)
}

export function getMedicalRecordFilePath(file_name) {
  return MedicalRecordModule.file().getPath(file_name)
}
