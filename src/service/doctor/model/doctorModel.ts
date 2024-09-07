// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class DoctorEntity extends CommonData {
  /** 职称  **/
  public title?: string
  /** 姓名  **/
  public name?: string
  /** 简介  **/
  public txt?: string
  /** 邮箱  **/
  public mail?: string

  /** 医院id 注: 自动处理，不需要操作当前字段  **/
  public hospital_id?: string
  /** 科室id 注: 自动处理，不需要操作当前字段  **/
  public department_id?: string
  /** 医院科室关系表id  **/
  public hospitalrelateddepartment_id?: string

  /** 工作照  **/
  public work_imgs?: string
  /** 身份证照片, json格式 如: ['xx.jpg', 'xx.jpg']  **/
  public id_imgs?: string
  /** 医师执业证书, json格式 如: ['xx.jpg', 'xx.jpg']  **/
  public PracticingCertificate_imgs?: string
  /** 医师资格证书, json格式 如: ['xx.jpg', 'xx.jpg']  **/
  public qualification_imgs?: string
  /** 医师职称证书, json格式 如: ['xx.jpg', 'xx.jpg']  **/
  public title_imgs?: string

  /** 图文接诊状态, 0 为启用, 1 已启用  **/
  public TextReception_state?: 0 | 1
  /** 音视频接诊状态, 0 未启用, 1 已启用  **/
  public VideoReception_state?: 0 | 1
  /** 在线状态 0 离线 1在线 **/
  public OnlineStatus?: 0 | 1
  /** 图文价格 以元为单位  **/
  public TextReception_pay?: string
  /** 视频价格 以元为单位  **/
  public VideoReception_pay?: string
  /** 图文服务有效时间：整个问诊订单持续时间, 单位小时  **/
  public TextReception_server_time?: string
  /** 图文接诊有效时间：患者发起问诊订单的有效时间 单位小时  **/
  public TextReception_effective_time?: string
  /** 视频服务有效时间：整个问诊订单持续时间 单位小时  **/
  public VideoReception_server_time?: string
  /** 视频接诊有效时间：患者发起问诊订单的有效时间 单位小时  **/
  public VideoReception_effective_time?: string

  /** 状态, 0 未审核, 1 已审核, 2 拒绝  **/
  public declare state?: 0 | 1 | 2
  /** 拒绝原因  **/
  public ReviewReason?: string

  /** 学校 */
  public school?: string
  /** 语言 */
  public language?: string
  /** 工作经验 富文本 */
  public work_experience?: string
  /** 教育经历 富文本 */
  public education?: string
  /** 地址 */
  public address?: string
}
