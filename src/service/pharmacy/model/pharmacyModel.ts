// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class PharmacyEntity extends CommonData {
  /** 药店名称  **/
  public name?: string
  /** 药店logo, json ['', '']  **/
  public logo_imgs?: string
  /** 省份  **/
  public province?: string
  /** 市  **/
  public citie?: string
  /** 住址详情  **/
  public details?: string
  /** 联系人姓名  **/
  public contactName?: string
  /** 联系人电话  **/
  public contactPhone?: string
  /** 药店介绍  **/
  public remarks?: string
  /** 创建人  **/
  public found_id?: string
  /**  项目id  **/
  public project_id?: string
}
