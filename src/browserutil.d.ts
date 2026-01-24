/**
 * 最低支持的 Chrome 版本号
 */
declare const fitChromeVersionNumber: 58;

/**
 * 最低支持的 Safari 版本号
 */
declare const fitSafariVersionNumber: 11;

/**
 * 从 URL 查询参数中获取指定参数的值
 * @param paramName - 要获取的参数名称
 * @returns 解码后的参数值，如果参数不存在则返回 null
 */
declare const getURLParameter: (paramName: string) => string | null;

/**
 * 从 URL 查询参数中获取的 checkBrowser 参数值
 */
declare const checkBrowser: string | null;

/**
 * 判断是否从千牛客户端跳转而来
 */
declare const isJumpFromQianniuClient: boolean;

/**
 * 优惠券类型参数
 */
declare let coupon: string | null;

/**
 * 环境参数
 */
declare let env: string | null;

/**
 * URL 查询字符串
 */
declare let urlQueryStrings: string;

/**
 * 编码后的来源 URL
 */
declare const fromUrl: string;

/**
 * 小写的用户代理字符串
 */
declare let ua: string;

/**
 * 检测当前设备是否为移动设备
 * @returns 如果是移动设备返回匹配结果数组，否则返回 null
 */
declare const isMobile: () => RegExpMatchArray | null;

/**
 * 浏览器类型字面量
 */
type BrowserType = 'mobile' | 'chrome' | 'firefox' | 'opera' | 'safari' | 'msie' | 'camino' | 'gecko' | null;

/**
 * 获取当前浏览器类型
 * @returns 浏览器类型标识符
 */
declare let getBrowserType: () => BrowserType;

/**
 * 当前浏览器类型
 */
declare const browserType: BrowserType;