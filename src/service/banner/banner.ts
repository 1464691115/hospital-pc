import { OrmClass } from "@/utils/http/orm"
import { BannerEntity } from './model/bannerModel'

export class BannerModuleClass extends OrmClass<BannerEntity> {
  constructor(public search_db = 'BannerEntity' as const) {
    super(search_db)
  }
}

const BannerModule = new BannerModuleClass()

export function getBannerListApi() {
  return BannerModule.select().getMany()
}

export function getBannerFilePath(file_name) {
  return BannerModule.file().getPath(file_name)
}
