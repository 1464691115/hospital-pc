import { OrmClass } from "@/utils/http/orm"
import { AddressEntity } from './model/addressModel'
import { isObject } from '@/utils/is'

export class AddressModuleClass extends OrmClass<AddressEntity> {
  constructor(public search_db = 'Address' as const) {
    super(search_db)
  }
}

const AddressModule = new AddressModuleClass()

export function getAddressListApi(params) {
  return AddressModule.select().getMany(params)
}

export function getAddressInfoApi(params) {
  return AddressModule.select()
    .where({ fild: { id: params.id }, type: '=' })
    .getOne(params)
}

export function addAddressApi(params: AddressEntity) {
  return AddressModule.insert().values(params).execute()
}

export function delAddressApi(params) {
  return AddressModule.delete()
    .where({ fild: { id: isObject(params) ? params.id : params }, type: '=' })
    .execute()
}

export function updateAddressApi(params: AddressEntity) {
  return AddressModule.update()
    .set(params)
    .where({ fild: { id: params.id }, type: '=' })
    .execute()
}

export function getAddressDefIdApi() {
  return AddressModule.select()
    .where({
      fild: { if_default: 1 },
      type: '=',
    })
    .getOne()
}

export function uploadAddressFile(file) {
  return AddressModule.file().upload(file)
}

export function getAddressFilePath(file_name) {
  return AddressModule.file().getPath(file_name)
}
