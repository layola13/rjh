/**
 * 从 UUID 字符串中提取版本号
 * 
 * UUID 版本号位于第 15 个字符位置（索引 14），是一个十六进制数字
 * 常见的 UUID 版本：
 * - 1: 基于时间戳
 * - 3: 基于 MD5 哈希
 * - 4: 随机生成
 * - 5: 基于 SHA-1 哈希
 * 
 * @param uuid - 待解析的 UUID 字符串（格式如 "xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx"）
 * @returns UUID 的版本号（1-5 的整数）
 * @throws {TypeError} 当传入的字符串不是有效的 UUID 格式时抛出
 * 
 * @example
 *