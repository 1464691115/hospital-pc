// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class AddressEntity extends CommonData {
  /** 收件人  **/
  public name?: string
  /** 手机号  **/
  public phone?: string
  /** 是否默认 0 否， 1是 */
  public if_default?: 0 | 1
  /** 省市区  **/
  public location?: string
  /** 省份  **/
  public province?: string
  /** 市  **/
  public citie?: string
  /** 区  **/
  public region?: string
  /** 住址详情  **/
  public details?: string
}
