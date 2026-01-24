/**
 * UUID字节数组到字符串转换工具
 * 提供UUID格式化和验证功能
 */

/**
 * 十六进制查找表，用于快速将字节转换为十六进制字符串
 * 索引0-255对应00-ff的十六进制表示
 */
declare const byteToHex: string[];

/**
 * 将UUID字节数组转换为标准UUID字符串格式（不进行验证）
 * 
 * @param uuidBytes - 包含UUID数据的字节数组（至少16字节）
 * @param offset - 开始读取的偏移位置，默认为0
 * @returns 格式化的UUID字符串（格式：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx）
 * 
 * @example
 *