import { OrmClass } from "@/utils/http/orm"

export class publicstaticModuleClass extends OrmClass {
  constructor(public search_db = 'publicstatic' as const) {
    super(search_db)
  }
}

const PatientModule = new publicstaticModuleClass()

export function uploadPublicFile(file) {
  return PatientModule.file().upload(file)
}

export function getPublicFilePath(file_name) {
  return PatientModule.file().getPath(file_name)
}
