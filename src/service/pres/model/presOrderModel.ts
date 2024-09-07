// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"


export class PresOrderEntity extends CommonData {
  /** 处方订单号, 注：自动生成订单号  **/
  public pres_no?: string
  /** 处方id  **/
  public pres_id?: string
  /** 取货类型, 0配送，1自取  **/
  public pick_type?: string
  /** 收货人姓名  **/
  public name?: string
  /** 收货人联系方式  **/
  public phone?: string
  /**  支付金额（以元为单位), 注: 自动处理，不需要操作当前字段  **/
  public pay?: string
  /** 付款状态, 0未结算, 1已结算, 2付款失败  **/
  public pay_state?: string
  /** 支付方式, 0平台支付  **/
  public pay_type?: string
  /** 药店id  **/
  public pharmacy_id?: string
  /** 状态, 0 待接单, 1 已接单, 2 已完成, 3 已取消, 4 已拒绝  **/
  public declare state?: number
  /** 拒绝原因  **/
  public reason?: string
  /**  药品集合 格式 json  **/
  public medicine?: {
    publicdrugs_id: string
    total: string
    dosage_txt: string
    text: string
  }[]
  /** 患者备注  **/
  public patient_text?: string
}
