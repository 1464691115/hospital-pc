// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class WalletEntity extends CommonData {
  /** 余额  **/
  public balance?: string
}
