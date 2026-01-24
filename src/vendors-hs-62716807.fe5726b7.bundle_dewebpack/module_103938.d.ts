/**
 * iOS设备检测模块
 * 
 * 通过检测User-Agent字符串来判断当前设备是否为iOS设备（iPad、iPhone或iPod）。
 * 该模块依赖于模块331189提供的User-Agent字符串。
 * 
 * @module IsIOSDevice
 */

/**
 * User-Agent字符串，用于设备检测
 * 来自模块331189
 */
declare const userAgentString: string;

/**
 * 检测结果：当前设备是否为iOS设备
 * 
 * 该值通过正则表达式匹配User-Agent字符串中的iOS设备标识符：
 * - ipad: iPad设备
 * - iphone: iPhone设备
 * - ipod: iPod设备
 * 
 * 同时要求User-Agent包含"applewebkit"以确保是WebKit内核浏览器
 * 
 * @returns {boolean} 如果是iOS设备则返回true，否则返回false
 * @example
 * // User-Agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15..."
 * // 返回: true
 */
declare const isIOSDevice: boolean;

export default isIOSDevice;

/**
 * 正则表达式说明：
 * /(?:ipad|iphone|ipod).*applewebkit/i
 * 
 * - (?:...) : 非捕获分组
 * - ipad|iphone|ipod : 匹配三种iOS设备类型之一
 * - .* : 匹配任意字符（零次或多次）
 * - applewebkit : 匹配WebKit浏览器引擎标识
 * - /i : 不区分大小写标志
 */