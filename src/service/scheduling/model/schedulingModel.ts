// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class SchedulingEntity extends CommonData {
  /** 医生id  **/
  public doctors_id?: string
  /** 医院id  **/
  public hospital_id?: string
  /** 科室id  **/
  public department_id?: string
  /** 工作日期,格式 2024-01-01  **/
  public work_date?: string
  /** 日期可预约人数, 默认不填  **/
  public order_num?: string
}
