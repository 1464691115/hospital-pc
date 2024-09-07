// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class RecordDetailsEntity extends CommonData {
  /** 患者病历id  **/
  public patientmedicalrecord_id?: string
  /** 病历详情title  **/
  public title?: string
  /** 病历内容  **/
  public body?: string
  /**  排序，默认0 代表无序  **/
  public sort?: string
}
