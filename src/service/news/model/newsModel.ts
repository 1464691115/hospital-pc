// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class NewsEntity extends CommonData {
  /** 状态, 0 未读, 1 已读  **/
  public declare state?: 0 | 1
  /** 消息类型 0 全部  **/
  public news_type?: string
  /** 关联表id  **/
  public table_id?: string
  /** 关联表名  **/
  public search_db?: string
  /** 消息内容  **/
  public body?: string
}
