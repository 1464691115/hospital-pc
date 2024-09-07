
declare interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Format request parameter time
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  /** 自定义域名 */
  domain?: string
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // Success message prompt type
  successMessageMode?: SuccessMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header
  withToken?: boolean;
  // 请求重试机制
  retryRequest?: RetryRequest;
}

/** 请求返回类型 */
declare interface Result<T = string> {
  code: import('@/enums/httpEnum').ResultEnum
  text: string
  result?: T
  total_count?: number
  total_page?: number
}

/** 列表请求参数 */
declare class ArrayRequestParam {
  count: ArrayRequestResult['count']
  page: ArrayRequestResult['page']

  constructor(params) {
    this.count = params.count
    this.page = params.page
  }
}

/** 列表分页返回接口 */
declare type ArrayRequestResult<T = any> = {
  /** 每页数量 */
  count: number
  list: T[]
  /** 当前页 */
  page: number
  /** 总条数 */
  total_count: number
  /** 总页数 */
  total_page: number
}

/** 上传文件返回 */
declare type UploadFileResult = {
  file_name: string
}

declare type GlobalRequestType = Result | ArrayRequestResult

declare type BaseOptions = { id: number; value: string }

declare type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

// multipart/form-data: upload file
declare interface UploadFileParams {
  // Other parameters
  data?: Recordable
  // File parameter interface field name
  name?: string
  // file name
  file?: File | Blob
  // file name
  filename?: string
  [key: string]: any
}
