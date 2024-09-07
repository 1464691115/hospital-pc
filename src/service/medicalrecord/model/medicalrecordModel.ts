// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class MedicalRecordEntity extends CommonData {
  /** 患者id  **/
  public patient_id?: string
  /** 患者姓名  **/
  public name?: string
  /** 男 or 女  **/
  public sex?: '男' | '女'
  /** 年龄  **/
  public age?: number
  /** 开方医院id, 注：自动更新  **/
  public hospital_id?: string
  /** 开方科室id, 注：自动更新  **/
  public department_id?: string
  /** 开方开方医生id  **/
  public doctors_id?: string
  /** 医院科室关系表id, 注：自动更新  **/
  public hospitalrelateddepartment_id?: string
}
