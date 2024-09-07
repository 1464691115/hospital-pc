// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class WalletRecordEntity extends CommonData {
  /** 钱包id  **/
  public wallet_id?: string
  /** 计算方法 + and -  **/
  public computing_type?: string
  /** 金额  **/
  public money?: string
  /** 钱包总金额  **/
  public total?: string
  /** 更改后总金额  **/
  public total_change?: string
  /** 支付方式  **/
  public pay_type?: string
  /** 来源表名  **/
  public table_name?: string
  /** 来源表id  **/
  public table_id?: string
  /** 详情  **/
  public details?: string
  /** 创建人  **/
  public found_id?: string
  /** 状态 1 正常 2 计算未生效  **/
  public declare state?: number
}
