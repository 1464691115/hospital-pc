import { queryParamsStr } from '@/utils'
import { SelectQuery, SelectTablesType } from './interface'
import { getUserRoleId } from '@/utils/auth'
import { isArray } from '@/utils/is'
import { defHttp } from '../axios'

type GetEntityType<T> = Omit<
  valueOfU<T>,
  keyof Function | keyof Array<any> | keyof Number
>

type GetJoinType<
  LQI extends new () => any,
  T = any,
  E = InstanceType<LQI>['entity'],
  S = InstanceType<LQI>['search_db'],
> = {
    [P in keyof E as P extends string
    ? S extends string
    ? `${S}.${P}`
    : never
    : never]: keyof T
  }

export class SelectBuilderClass<
  T extends Recordable = Recordable,
> extends SelectQuery<T> {
  public model = {} as T

  private isFormatResultJoinTables = true

  constructor(private search_db: string) {
    super()
  }

  private formatResultJoinTablesField(el, tables_name) {
    if (this.isFormatResultJoinTables === false) return el
    const record = el
    tables_name?.forEach?.((tl) => {
      const element = record[tl.table_name]
      if (isArray(element))
        record[tl.table_name] = element.length == 1 ? element[0] : element
    })
    return record
  }

  private request<TF extends boolean, LF = typeof this.model>(
    data: Recordable,
    isTransformResponse: TF,
  ): Promise<TF extends false ? Result<LF[]> : LF[]>
  private request<LF = typeof this.model>(data: Recordable): Promise<LF[]>
  private async request(data, isTransformResponse?) {
    const res = await defHttp.post({
      url:
        '/query2' +
        queryParamsStr({
          search_db: this.search_db,
          userrole_id: getUserRoleId(),
          query_type: data.query_type,
          ...this.context,
        }),
      data: {
        query: this.is_state
          ? this.query.concat([
            { fild: { state: 1 }, type: '=', condition: '&&' } as any,
          ])
          : this.query,
        return_table_field: this.return_table_field,
        tables_name: this.tables_name,
        query_data_json: this.query_data_json,
        group_by: this.group_by,
        group_by_date: this.group_by_date,
      },
    })

    return res
  }

  public async getMany<This extends SelectBuilderClass>(
    this: This,
    params = {} as ArrayRequestParam,
  ) {
    const { page, count } = params
    const res = await this.request<false, This['model']>(
      {
        query_type:
          params?.page !== undefined
            ? `limit|${((page || 1) - 1) * count}-${page * count}`
            : 'equal',
        ...params,
      },
      false,
    )

    return {
      code: 200,
      text: '成功',
      result: {
        count,
        list: res.result?.map?.((el) =>
          this.formatResultJoinTablesField(el, this.tables_name),
        ),
        page,
        total_count: res.total_count,
        total_page: Math.ceil((res.total_count ?? 0) / count),
      },
    } as Result<ArrayRequestResult<This['model']>>
  }

  public async getAll<This extends SelectBuilderClass>(
    this: This,
    params = {} as ArrayRequestParam,
  ) {
    const res = await this.request<false, This['model']>(
      {
        query_type: 'equal',
        ...params,
      },
      false,
    )

    return {
      code: 200,
      text: '成功',
      result: {
        count: -1,
        list: res.result?.map?.((el) =>
          this.formatResultJoinTablesField(el, this.tables_name),
        ),
        page: 1,
        total_count: res.total_count,
        total_page: 1,
      },
    } as Result<ArrayRequestResult<This['model']>>
  }

  public async getOne<This extends SelectBuilderClass>(
    this: This,
    params = {},
  ) {
    const res = await this.request<This['model']>({
      query_type: 'first',
      ...params,
    })

    return this.formatResultJoinTablesField(
      res,
      this.tables_name,
    ) as This['model']
  }

  public async getCount<This extends SelectBuilderClass>(
    this: This,
    params = {},
  ) {
    const res = await this.request<This['model']>({
      query_type: 'count',
      ...params,
    })

    return res as unknown as Result<number>
  }

  public find<This extends SelectBuilderClass>(
    this: This,
    select: Array<keyof This['model']> | Array<string>,
  ) {
    this.return_table_field = select.filter((el) => {
      if (typeof el !== 'string') return el
      const [table_name, field] = this.spiltTableField(el)

      if (table_name) {
        this.tables_name.find((el) => {
          if (el.table_name == table_name) {
            el.return_table_field?.push(field) ??
              (el.return_table_field = [field])
            return true
          }
        })
      }
      return !table_name
    }) as string[]
    return this
  }

  /** 链接跨表 例如：leftJoinAndSelect('Doctor', {'Doctor.id': 'doctor_id'}) */
  public leftJoinAndSelect<
    LQ extends Array<new () => any> | readonly (new () => any)[],
    IF,
  >(
    table_class: LQ | string[],
    join: GetEntityType<{
      [Key in keyof LQ]: GetJoinType<LQ[Key], T>
    }>,
    orderBy?: SelectTablesType['context'],
    isFormatResultJoinTables?: IF,
  ): this & {
    model: GetEntityType<{
      [Key in keyof LQ]: Partial<
        Record<
          `${InstanceType<LQ[Key]>['search_db']}`,
          IF extends boolean
          ? Array<InstanceType<LQ[Key]>['entity']>
          : InstanceType<LQ[Key]>['entity']
        >
      >
    }>
  }
  public leftJoinAndSelect(
    table_class,
    join,
    orderBy?,
    isFormatResultJoinTables?,
  ) {
    this.isFormatResultJoinTables = isFormatResultJoinTables ?? true
    const self_join = Object.keys(join).reduce((pre, key) => {
      const [table_name, field] = this.spiltTableField(key)
      if (table_name) pre[table_name] = { [field]: join[key] }
      return pre
    }, {})

    table_class.forEach((el) => {
      const table_name =
        typeof table_class == 'string' ? table_class : new el().search_db

      this.tables_name.push({
        name: table_name,
        table_name,
        my_fild: self_join[table_name],
        context: orderBy,
      })
    })

    return this
  }
}
