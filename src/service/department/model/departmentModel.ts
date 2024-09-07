// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class DepartmentEntity extends CommonData {
  /** 科室名称  **/
  public name?: string
  /** 科室简介  **/
  public txt?: string
  /** 科室展示图片, json格式 如: ['xx.jpg', 'xx.jpg']  **/
  public logo_imgs?: string
  /** 其他信息, json 格式  **/
  public extra?: string
  /** 状态, 0 未审核  **/
  public declare state?: 0 | 1
  /** 创建人  **/
  public found_id?: string
}
