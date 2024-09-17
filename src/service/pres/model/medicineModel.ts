// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

/**  药品集合 格式 json  **/
export class MedicineEntity extends CommonData {
  public publicdrugs_id?: string
  public total?: string | number
  public dosage_txt?: string
  public text?: string
  public price?: number

  public hidden?: boolean
}
