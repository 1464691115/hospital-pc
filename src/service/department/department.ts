import { OrmClass } from "@/utils/http/orm"
import { DepartmentEntity } from './model/departmentModel'

export class DepartmentModuleClass extends OrmClass<DepartmentEntity> {
  constructor(public search_db = 'Department' as const) {
    super(search_db)
  }
}

export const DepartmentModule = new DepartmentModuleClass()

export function getDepartmentListApi(params) {
  return DepartmentModule.select().getMany(params)
}

export function getDepartmentInfoApi(params) {
  return DepartmentModule.select()
    .where({ fild: { id: params.id }, type: '=' })
    .getOne(params)
}

export function getDepartmentOptionsApi(params) {
  return DepartmentModule.select()
    .where({ fild: params || {}, type: '=' })
    .find(['name', 'id'])
    .getMany()
}

export function getDepartmentFilePath(file_name) {
  return DepartmentModule.file().getPath(file_name)
}
