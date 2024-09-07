// (\w+)\s.*#(.*)
// /** $2  **/\npublic $1?: string

import { CommonData } from "@/utils/http/orm/utils/CommonData"

export class BannerEntity extends CommonData {
  /** 排序  **/
  public sort?: string
  /** 轮播图标题  **/
  public title?: string
  /** 图片名宇  **/
  public imgs?: string
  /** 轮播图类型，0 是本地，1 跳转到其它web链接 2 仅展示  **/
  public banner_type?: 0 | 1 | 2
  /** 本地 表名  **/
  public table_name?: string
  /** 本地 id  **/
  public table_id?: string
  /** 其他web链接  **/
  public url_path?: string
}
