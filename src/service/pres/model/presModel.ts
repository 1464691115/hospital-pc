// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"
import { MedicineEntity } from "./medicineModel"

export class PresEntity extends CommonData {
  /** 问诊订单id  **/
  public consultationorder_id?: string
  /** 就诊人id  **/
  public patient_id?: string
  /** 医生id  **/
  public doctors_id?: string
  /** 生成的随机订单号  **/
  public pres_no?: string
  /** 状态, 0 待审核, 1 已审核, 2 处方订单已结束  **/
  public declare state?: number
  /** 处方审核类型, 0 默认单药师审核  **/
  public presexamine_type?: string
  /** 药品输送类型, 0 药店配药，1 自备  **/
  public DrugsDeliver_type?: string
  /** 备注  **/
  public conditions?: string
  /** 患者病例id  **/
  public patientmedicalrecord_id?: string
  /**  药品集合 格式 json  **/
  public medicine?: MedicineEntity[]
  public pres_body?: { Drugs: any[] }
  /** 药师审核状态 0待审核 1审核通过 2审核不通过(任意一个药师审核不通过这个状态就会变2)  **/
  public pharmacists_state?: string
  /** 病种名称 格式 json 示例 ['病种1', '病种2']  **/
  public DRGDatabase_name?: string
  /** 创建人 userole_id  **/
  public found_id?: string
}
