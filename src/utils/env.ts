import pkg from '../../package.json'


/**
 * @description: Development mode
 */
export const devMode = 'development';

/**
 * @description: Production mode
 */
export const prodMode = 'production';

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return import.meta.env.MODE;
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD;
}

export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig()
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase()
}

// Generate cache key according to version
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase()
}

export function getAppGlobalConfig() {
  return {
    $chat_userID: '',
    $chat_userSig: '',
    $chat_SDKAppID: 1600021247,
    $chat_secretKey:
      'a5334d14a081fda03aeeb757585a82d79c9319bfdaf77c8ac97abf5d27c9728e',
  }
}

export function getAppEnvConfig() {
  const _config = {
    VITE_GLOB_APP_TITLE: pkg.description,
    /** 全局接口域名 */
    VITE_GLOB_API_URL: 'http://ashfire.cn:51101',
    /** 全局图片域名 */
    VITE_GLOB_IMG_PREFIX: 'http://ashfire.cn:51101',
    VITE_GLOB_APP_SHORT_NAME: pkg.name,
    VITE_GLOB_FONT_URL: '/static/font/SourceHanSansSC-Regular.otf',
  }

  let version = import.meta.env.MODE
  switch (version) {
    // 开发
    case devMode:
    //  线上
    case prodMode:
      _config.VITE_GLOB_API_URL = 'http://ashfire.cn:51101'
  }

  return _config
}
