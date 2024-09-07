// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class PublicDrugsEntity extends CommonData {
  /** 条码  **/
  public barCode?: string
  /** 注册名称  **/
  public name?: string

  /** 拼音简码  **/
  public simple_code?: string
  /** 药品类型，0非处方药、1处方药  **/
  public drug_type?: string
  /** 性质分类  **/
  public nature_class?: string
  /** 用途分类  **/
  public use_class?: string
  /** 主要成分  **/
  public constituents?: string
  /** 性状  **/
  public property_txt?: string
  /** 适应症  **/
  public indication?: string
  /** 用法用量  **/
  public dosage_txt?: string
  /** 不良反应  **/
  public adverse_reactions?: string
  /** 禁忌  **/
  public contraindication?: string
  /** 注意事项  **/
  public attentions?: string
  /** 药物相互作用  **/
  public interreaction?: string
  /** 贮藏  **/
  public depot?: string
  /** 生产场地  **/
  public address?: string
  /** 科室  **/
  public Department?: string
  /** 二0二二版甲乙类  **/
  public class_ab?: string
  /** 药品代码  **/
  public drugcode?: string
  /** 商品名称  **/
  public commonName?: string
  /** 注册剂型  **/
  public dosage?: string
  /** 实际剂型  **/
  public actualDosage?: string
  /** 注册规格  **/
  public specs?: string
  /** 实际规格  **/
  public actualSpecs?: string
  /** 包装单位  **/
  public pkUnit?: string
  /** 制剂单位  **/
  public preparationUnit?: string
  /** 批准文号  **/
  public approvalNumber?: string
  /** 药品本位码  **/
  public drugStandardCode?: string
  /** 生产企业  **/
  public manufacturingEnterprise?: string

  /** 图片地址  **/
  public img_url?: string
  /** 药品信息汇总，搜索用  **/
  public summary?: string
}
