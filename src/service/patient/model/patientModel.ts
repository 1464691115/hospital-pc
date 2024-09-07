// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class PatientEntity extends CommonData {
  /** 患者姓名  **/
  public name?: string
  /** 患者性别  **/
  public sex?: string
  /** 患者年龄  **/
  public age?: number
  /** 患者头像 */
  public img?: string
  /**  出生年月日, 格式 1999-01-13  **/
  public BirthDate?: string
  /** 身份证号  **/
  public identity?: string
  /** 住址详情  **/
  public details?: string
  /** 与我关系, 本人， 父母，子女，其他  **/
  public relationship?: string
  /** 身份证照片, json格式 如: ['xx.jpg', 'xx.jpg']  **/
  public id_imgs?: string
  /** 医保照片, json格式 如: ['xx.jpg', 'xx.jpg']  **/
  public medicalinsurance_imgs?: string
  /** 在线状态 0 离线 1在线 **/
  public OnlineStatus?: 0 | 1
}
