import { OrmClass } from "@/utils/http/orm"
import { RecordDetailsEntity } from './model/recorddetailModel'

export class RecordDetailsModuleClass extends OrmClass<RecordDetailsEntity> {
  constructor(public search_db = 'RecordDetails' as const) {
    super(search_db)
  }
}

const RecordDetailsModule = new RecordDetailsModuleClass()

export function getRecordDetailsListApi(params) {
  return RecordDetailsModule.select().closeState().getMany(params)
}

export function getRecordDetailsInfoApi(params) {
  return RecordDetailsModule.select()
    .where({ fild: { id: params.id }, type: '=' })
    .getOne(params)
}

export function addRecordDetailsApi(params: RecordDetailsEntity) {
  return RecordDetailsModule.insert().values(params).execute()
}

export function delRecordDetailsApi(params) {
  return RecordDetailsModule.delete()
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function updateRecordDetailsApi(params: RecordDetailsEntity) {
  return RecordDetailsModule.update()
    .set(params)
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function uploadRecordDetailsFile(file) {
  return RecordDetailsModule.file().upload(file)
}

export function getRecordDetailsFilePath(file_name) {
  return RecordDetailsModule.file().getPath(file_name)
}
