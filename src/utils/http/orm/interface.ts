import { cloneDeep } from "lodash-es";

export class SelectQuery<Q extends Recordable = Recordable> {
  public query = [] as SelectQueryType<Q>[]

  /** 返回的字段，为空的话返回全部, 默认不填 */
  public return_table_field = [] as string[]
  /** 跨表的信息, 默认不填 */
  public tables_name = [] as SelectTablesType[]
  public query_data_json = [] as { fild_name: string; query: SelectQuery[] }[]
  public group_by = [] as string[]
  public group_by_date = {} as Recordable

  /** 是否只获取查询 state 开启的 */
  public is_state: boolean = true
  /** order_by */
  protected context = {} as SelectTablesType['context']

  public openState() {
    this.is_state = true
    return this
  }

  public closeState() {
    this.is_state = false
    return this
  }

  public orderBy(file: keyof Q, val: ORDER_BY_STATE): this
  public orderBy(by: Recordable<ORDER_BY_STATE>): this
  public orderBy(arg1, arg2?) {
    if (typeof arg1 == 'object') {
      Object.keys(arg1).forEach((key) => {
        const element = arg1[key]
        const [table_name, field] = this.spiltTableField(key)

        if (table_name) {
          this.tables_name.find((el) => {
            if (el.table_name == table_name) {
              el.context = {
                order_by: element,
                order_by_field: field,
              }
              return true
            }
          })
        } else {
          this.context = {
            order_by: element,
            order_by_field: field,
          }
        }
      })
    } else {
      this.context = {
        order_by: arg2,
        order_by_field: arg1,
      }
    }
    return this
  }

  public spiltTableField(key = '') {
    return key.includes('.') ? key.split('.') : ([null, key] as const)
  }

  /** 转换跨表查询 */
  private formatLfField(
    query: SelectQueryType<Q>,
    to_field = 'fild',
    go_field = 'query',
  ) {
    let self_query: SelectQueryType<Q> = cloneDeep(query)

    Object.keys(self_query[to_field]).forEach((key) => {
      const element = self_query[to_field][key]
      const [table_name, field] = this.spiltTableField(key)

      if (table_name) {
        delete self_query[to_field][key]
        this.tables_name.find((el) => {
          if (el.table_name == table_name) {
            let lf_query = cloneDeep(query) as any
            lf_query.fild = {}
            lf_query.fild[field] = element
            el[go_field]?.push(lf_query) ?? (el[go_field] = [lf_query])
            return true
          }
        })
      }
    })

    return self_query
  }

  public where(query: SelectQueryType<Q>) {
    if (!query.condition) query.condition = '&&'
    this.query = [this.formatLfField(query)]
    return this
  }

  public andWhere(query: SelectQueryType<Q>) {
    query.condition = '&&'
    this.query.push(this.formatLfField(query))
    return this
  }

  public orWhere(query: SelectQueryType<Q>) {
    query.condition = '||'
    this.query.push(this.formatLfField(query))
    return this
  }
}

export type SelectQueryType<QT extends Recordable = Recordable> = {
  /** 键值对 例如：{user: 1} */
  fild: QT & Recordable
  /** %(模糊查询), =(等于查询), !=(不等查询) */
  type: '%' | '=' | '!=' | '<' | '>'
  condition?: '&&' | '||'
}

export interface SelectTablesType
  extends Partial<Pick<SelectQuery, 'query' | 'return_table_field'>> {
  /** 重命名 */
  name?: string
  /** 跨表的名字 */
  table_name: string
  /** 跨表的字段。 键是要跨的表的唯一 id 字段名,值是当前表的唯一id 字段名 例如 [{'id': 'patient_id'}]*/
  my_fild: any
  /** 注意：此参数默认为空(查询十条), limit|0-10 */
  query_type?: `limit|${number}-${number}` | 'first' | 'cont' | 'equal'
  /** 排序字段 默认不填 */
  context?: { order_by?: ORDER_BY_STATE; order_by_field?: string }
}

export enum ORDER_BY_STATE {
  DESC = 'desc',
  ASC = 'asc',
}
