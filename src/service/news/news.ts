import { OrmClass } from "@/utils/http/orm"
import { NewsEntity } from './model/newsModel'

export const NewsTableName = 'News'

export class NewsModuleClass extends OrmClass<NewsEntity> {
  constructor(public search_db = 'News' as const) {
    super(search_db)
  }
}

const NewsModule = new NewsModuleClass()

export function getNewsListApi(params) {
  return NewsModule.select().getMany(params)
}

export function getNewsInfoApi(params) {
  return NewsModule.select()
    .where({ fild: { id: params.id }, type: '=' })
    .getOne(params)
}

export function getNewsFilePath(file_name) {
  return NewsModule.file().getPath(file_name)
}
