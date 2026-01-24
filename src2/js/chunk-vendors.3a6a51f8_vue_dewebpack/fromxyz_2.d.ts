/**
 * sRGB 色彩空间与 CIE XYZ 色彩空间之间的转换工具
 * 提供从 XYZ 到 sRGB 以及从 sRGB 到 XYZ 的双向转换功能
 */

/**
 * XYZ 色彩空间的三维坐标表示
 * [X, Y, Z] 分量通常在 [0, 1] 范围内
 */
type XYZColor = [number, number, number];

/**
 * sRGB 色彩的整数表示（24位打包格式）
 * 格式: 0xRRGGBB
 * - 红色通道: (color >> 16) & 0xFF
 * - 绿色通道: (color >> 8) & 0xFF
 * - 蓝色通道: (color >> 0) & 0xFF
 */
type RGBInteger = number;

/**
 * 将 CIE XYZ 色彩空间转换为 sRGB 整数表示
 * 
 * 使用 ITU-R BT.709 标准的转换矩阵和 sRGB 传递函数
 * 
 * @param xyz - XYZ 色彩空间的坐标 [X, Y, Z]
 * @returns 24位打包的 RGB 整数值 (0xRRGGBB)
 * 
 * @example
 *