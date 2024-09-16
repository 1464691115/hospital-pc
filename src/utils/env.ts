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
    $chat_SDKAppID: 1600049682,
    $chat_secretKey:
      '3f230a2765d7b6fb2e599c9336e25a8f06109409ecf564d3a7dc08a8c4d535f6',
  }
}

export function getAppEnvConfig() {
  const _config = {
    VITE_GLOB_APP_TITLE: pkg.description,
    /** 全局接口域名 */
    VITE_GLOB_API_URL: '',
    /** 全局图片域名 */
    VITE_GLOB_IMG_PREFIX: 'https://auth.net-sun.com',
    VITE_GLOB_APP_SHORT_NAME: pkg.name,
    VITE_GLOB_FONT_URL: '/static/font/SourceHanSansSC-Regular.otf',
  }

  let version = import.meta.env.MODE
  switch (version) {
    // 开发
    case devMode:
      _config.VITE_GLOB_API_URL = '/base-api'
      break
    //  线上
    case prodMode:
      _config.VITE_GLOB_API_URL = 'https://auth.net-sun.com'
      break
  }

  return _config
}
