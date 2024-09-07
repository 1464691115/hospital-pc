// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export enum ORDER_STATUS {
  /** 全部 */
  ALL = -1,
  /** 未支付 */
  NON_PAY = 0,
  /** 未评价 */
  NON_EVALUATED = 1,
  /** 未发货 */
  NON_SEND = 2,
  /** 待收货 */
  SHIPPED = 3,
}

export enum CONSULTATION_TYPE {
  /** 图文 */
  IMG = '1',
  /** 视频 */
  ViDEO = '0',
}

export class ConsultationOrderEntity extends CommonData {
  /** 问诊订单状态, 0待接单，1进行中，2已完成, 3 订单超时(金额退回账户)  **/
  public declare state?: 0 | 1 | 2 | 3

  /** 就诊人id  **/
  public patient_id?: string
  /** 医生表id  **/
  public doctors_id?: string
  /** 问诊订单类型,0音视频 1图文   **/
  public ConsultationType?: CONSULTATION_TYPE
  /** 是否复诊, 0不是 1是  **/
  public WhetherRevisit?: 0 | 1
  /** 医院id 注: 自动处理，不需要操作当前字段  **/
  public hospital_id?: string
  /** 科室id 注: 自动处理，不需要操作当前字段  **/
  public department_id?: string
  /** 患者病历id  **/
  public patientmedicalrecord_id?: string
  /** 预约的问诊订单日期, 格式 2024-01-01  **/
  public order_time?: string
  /** 付款状态, 0待支付, 1已支付  **/
  public pay_state?: 0 | 1
  /** 支付类型, 0平台支付, 1微信支付  **/
  public pay_type?: 0 | 1
  /** 付款金额, 单位元  **/
  public pay?: string
  /** 评价  **/
  public evaluate?: string
  /** 评价得分, 1~5分  **/
  public scoring?: string
  /** 创建人 userole_id  **/
  public found_id?: string
}
