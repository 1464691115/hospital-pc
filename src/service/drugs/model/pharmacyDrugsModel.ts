// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class PharmacyDrugsEntity extends CommonData {
  /** 创建人  **/
  public found_id?: string
  /** 条码  **/
  public barCode?: string
  /** 商品名称  **/
  public name?: string
  /** 商品通用名  **/
  public commonName?: string
  /** 批准文号  **/
  public approvalNumber?: string
  /** 扫描条形码的code  **/
  public drugcode?: string
  /** 药店id  **/
  public pharmacy_id?: string
  /** 公共药品id  **/
  public publicdrugs_id?: string

  /** 药品售价  **/
  public price?: string
  /** 药品数量  **/
  public drugs_num?: string

  /** 药品信息汇总，搜索用  **/
  public summary?: string
}
