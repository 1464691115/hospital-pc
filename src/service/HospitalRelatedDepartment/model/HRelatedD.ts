// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class HospitalRelatedDepartmentEntity extends CommonData {
  /** 医院id  **/
  public hospital_id?: string
  /** 科室id  **/
  public department_id?: string
  /** 当前医院下的科室简介  **/
  public txt?: string
  /** 状态, 0 未审核  **/
  public declare state?: 0 | 1
}
