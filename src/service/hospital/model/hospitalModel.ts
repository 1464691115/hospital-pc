// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class HospitalEntity extends CommonData {
  /** 医院名称  **/
  public name?: string
  /** 医院简介  **/
  public txt?: string
  /** 医院展示图片, json格式 如: ['xx.jpg', 'xx.jpg']  **/
  public logo_imgs?: string
  /** 其他信息, json 格式  **/
  public extra?: string
  /** 创建人  **/
  public found_id?: string
}
