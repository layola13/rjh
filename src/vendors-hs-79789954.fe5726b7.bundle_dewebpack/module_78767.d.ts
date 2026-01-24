/**
 * ClipperLib 布尔运算工具模块
 * 提供多边形的合并、差集、交集等布尔运算功能
 */

import type * as ClipperLib from 'clipperlib';

/**
 * 2D路径：点的数组
 */
export type Path = ClipperLib.IntPoint[];

/**
 * 多个路径的集合
 */
export type Paths = Path[];

/**
 * 面：由多个路径组成（外轮廓 + 可选的内孔）
 */
export type Face = Paths;

/**
 * 多个面的集合
 */
export type Faces = Face[];

/**
 * 扩展多边形（包含外轮廓和孔洞信息）
 */
export type ExPolygon = ClipperLib.ExPolygon;

/**
 * 布尔运算选项配置
 */
export interface BooleanOptions {
  /**
   * 是否严格简化多边形（去除自相交）
   * @default true
   */
  strictlySimple?: boolean;

  /**
   * 是否执行坐标缩放（提高精度）
   * @default true
   */
  scaleUpDown?: boolean;

  /**
   * 坐标缩放因子
   * @default CLIPPER_SCALE_FACTOR from global config
   */
  scale?: number;

  /**
   * 主体多边形的填充类型
   * @default ClipperLib.PolyFillType.pftEvenOdd
   */
  subjectFillType?: ClipperLib.PolyFillType;

  /**
   * 裁剪多边形的填充类型
   * @default ClipperLib.PolyFillType.pftEvenOdd
   */
  clipFillType?: ClipperLib.PolyFillType;
}

/**
 * 内部完整的选项配置（所有字段必填）
 */
interface FilledBooleanOptions {
  strictlySimple: boolean;
  scaleUpDown: boolean;
  scale: number;
  subjectFillType: ClipperLib.PolyFillType;
  clipFillType: ClipperLib.PolyFillType;
}

/**
 * 中间联合操作的结果
 */
interface IntermediateUnionResult {
  /**
   * 主体多边形（如果未合并）
   */
  subject?: Paths;

  /**
   * 裁剪多边形（合并后的结果或原始裁剪）
   */
  clip: Paths;
}

/**
 * 填充并标准化选项配置
 * @param options - 用户提供的选项
 * @returns 完整的选项配置
 */
export function _fillUpOption(options?: BooleanOptions): FilledBooleanOptions;

/**
 * 合并两组面（并集操作，保留重叠部分的材质信息）
 * @param facesA - 第一组面
 * @param facesB - 第二组面
 * @param options - 布尔运算选项
 * @returns 合并后的面集合
 */
export function mergeFaces(
  facesA: Faces,
  facesB: Faces,
  options?: BooleanOptions
): Faces;

/**
 * 联合两组面（标准并集操作）
 * @param facesA - 第一组面
 * @param facesB - 第二组面
 * @param options - 布尔运算选项
 * @returns 联合后的面集合
 */
export function unionFaces(
  facesA: Faces,
  facesB: Faces,
  options?: BooleanOptions
): Faces;

/**
 * 执行中间联合操作（内部辅助函数）
 * @param subject - 主体面
 * @param clip - 裁剪面
 * @param strictlySimple - 是否严格简化
 * @returns 联合结果
 */
export function _doIntermidiateUnion(
  subject: Face,
  clip: Face,
  strictlySimple: boolean
): IntermediateUnionResult;

/**
 * 从第一组面中减去第二组面（差集操作）
 * @param facesA - 被减数面集合
 * @param facesB - 减数面集合
 * @param options - 布尔运算选项
 * @returns 差集结果面集合
 */
export function subtractFaces(
  facesA: Faces,
  facesB: Faces,
  options?: BooleanOptions
): Faces;

/**
 * 执行中间差集操作（内部辅助函数）
 * @param subject - 主体面
 * @param clip - 裁剪面
 * @param strictlySimple - 是否严格简化
 * @returns 差集结果面数组
 */
export function _doIntermidiateSubtract(
  subject: Face,
  clip: Face,
  strictlySimple: boolean
): Faces;

/**
 * 计算两组面的交集
 * @param facesA - 第一组面
 * @param facesB - 第二组面
 * @param options - 布尔运算选项
 * @returns 交集结果面集合
 */
export function intersectFaces(
  facesA: Faces,
  facesB: Faces,
  options?: BooleanOptions
): Faces;

/**
 * 执行中间交集操作（内部辅助函数）
 * @param subject - 主体面
 * @param clip - 裁剪面
 * @param strictlySimple - 是否严格简化
 * @returns 交集结果面数组
 */
export function _doIntermidiateIntersection(
  subject: Face,
  clip: Face,
  strictlySimple: boolean
): Faces;

/**
 * 联合两个单独的面
 * @param faceA - 第一个面
 * @param faceB - 第二个面
 * @param options - 布尔运算选项
 * @returns 联合后的面集合
 */
export function unionFace(
  faceA: Face,
  faceB: Face,
  options?: BooleanOptions
): Faces;

/**
 * 从第一个面中减去第二个面
 * @param faceA - 被减数面
 * @param faceB - 减数面
 * @param options - 布尔运算选项
 * @returns 差集结果面集合
 */
export function subtractFace(
  faceA: Face,
  faceB: Face,
  options?: BooleanOptions
): Faces;

/**
 * 计算两个面的交集
 * @param faceA - 第一个面
 * @param faceB - 第二个面
 * @param options - 布尔运算选项
 * @returns 交集结果面集合
 */
export function intersectFace(
  faceA: Face,
  faceB: Face,
  options?: BooleanOptions
): Faces;

/**
 * 将多个面展平为路径数组
 * @param faces - 面集合
 * @returns 路径数组
 */
export function _flattenFacesToPaths(faces: Faces): Paths;

/**
 * 执行通用布尔运算
 * @param subjectPaths - 主体路径
 * @param clipPaths - 裁剪路径
 * @param clipType - 裁剪类型（并集/差集/交集/异或）
 * @param options - 布尔运算选项
 * @returns 运算结果面集合
 */
export function doBoolean(
  subjectPaths: Paths,
  clipPaths: Paths,
  clipType: ClipperLib.ClipType,
  options?: BooleanOptions
): Faces;

/**
 * 执行布尔运算并返回扩展多边形（内部核心函数）
 * @param subjectPaths - 主体路径
 * @param clipPaths - 裁剪路径
 * @param clipType - 裁剪类型
 * @param strictlySimple - 是否严格简化
 * @param subjectFillType - 主体填充类型
 * @param clipFillType - 裁剪填充类型
 * @returns 扩展多边形数组
 */
export function _doBoolean(
  subjectPaths: Paths,
  clipPaths: Paths,
  clipType: ClipperLib.ClipType,
  strictlySimple: boolean,
  subjectFillType?: ClipperLib.PolyFillType,
  clipFillType?: ClipperLib.PolyFillType
): ExPolygon[];

/**
 * 执行简单布尔运算（返回路径而非扩展多边形）
 * @param subjectPaths - 主体路径
 * @param clipPaths - 裁剪路径
 * @param clipType - 裁剪类型
 * @param strictlySimple - 是否严格简化
 * @param subjectFillType - 主体填充类型
 * @param clipFillType - 裁剪填充类型
 * @returns 路径数组
 */
export function doBooleanSimple(
  subjectPaths: Paths,
  clipPaths: Paths,
  clipType: ClipperLib.ClipType,
  strictlySimple: boolean,
  subjectFillType?: ClipperLib.PolyFillType,
  clipFillType?: ClipperLib.PolyFillType
): Paths;

/**
 * 执行简单布尔运算的内部实现
 */
export function _doBooleanSimple(
  subjectPaths: Paths,
  clipPaths: Paths,
  clipType: ClipperLib.ClipType,
  strictlySimple: boolean,
  subjectFillType?: ClipperLib.PolyFillType,
  clipFillType?: ClipperLib.PolyFillType
): Paths;

/**
 * 将扩展多边形转换为合格的面（过滤掉面积过小的面）
 * @param exPolygons - 扩展多边形数组
 * @param scaleDown - 是否缩小坐标
 * @param scale - 缩放因子
 * @returns 合格的面集合
 */
export function _toQualifiedFaces(
  exPolygons: ExPolygon[],
  scaleDown?: boolean,
  scale?: number
): Faces;

/**
 * 放大路径数组的坐标
 * @param pathArray - 路径数组
 * @param scale - 缩放因子
 */
export function scaleUpPathArray(pathArray: Paths[], scale?: number): void;

/**
 * 缩小路径数组的坐标
 * @param pathArray - 路径数组
 * @param scale - 缩放因子
 */
export function scaleDownPathArray(pathArray: Paths[], scale?: number): void;

/**
 * 检查第一个路径是否完全包含第二个路径
 * @param pathA - 外部路径
 * @param pathB - 内部路径
 * @param options - 布尔运算选项
 * @param strictContainment - 是否严格包含（pathA必须大于pathB）
 * @returns 是否包含
 */
export function pathContainsPath(
  pathA: Paths,
  pathB: Paths,
  options?: BooleanOptions,
  strictContainment?: boolean
): boolean;

/**
 * 获取路径的外轮廓（合并所有路径并提取外边界）
 * @param paths - 路径数组
 * @param strictlySimple - 是否严格简化
 * @returns 外轮廓路径数组
 */
export function _getContours(paths: Paths, strictlySimple: boolean): Paths;

/**
 * 检查两个3D路径是否相同
 * @param path3dA - 第一个3D路径
 * @param path3dB - 第二个3D路径
 * @returns 是否相同
 */
export function areTheSame3dPath(path3dA: unknown, path3dB: unknown): boolean;

/**
 * 检查两个路径是否相同
 * @param pathA - 第一个路径
 * @param pathB - 第二个路径
 * @returns 是否相同
 */
export function areTheSamePaths(pathA: Paths, pathB: Paths): boolean;

/**
 * 获取面集合的轮廓
 * @param faces - 面集合
 * @param scale - 缩放因子
 * @returns 轮廓路径数组
 */
export function getContours(faces: Faces, scale?: number): Paths;

/**
 * 计算面集合的总面积
 * @param faces - 面集合
 * @param scale - 缩放因子
 * @returns 总面积
 */
export function getFacesArea(faces: Faces, scale?: number): number;

/**
 * 简化路径（移除自相交和冗余点）
 * @param path - 待简化的路径
 * @param options - 布尔运算选项
 * @returns 简化后的面集合
 */
export function simplifyPath(path: Paths, options?: BooleanOptions): Faces;

/**
 * 格式化主体路径（确保正确的顺时针/逆时针方向）
 * @param subjectPath - 主体路径
 */
export function formatSubjectPath(subjectPath: Paths): void;

/**
 * 检查两个路径是否有交集
 * @param pathA - 第一个路径
 * @param pathB - 第二个路径
 * @param scale - 缩放因子
 * @returns 是否有交集
 */
export function hasInterSection(
  pathA: Paths,
  pathB: Paths,
  scale?: number
): boolean;

/**
 * 将3D顶点通过变换矩阵转换为2D坐标（用于Clipper）
 * @param vertex3d - 3D顶点
 * @param transformMatrix - 变换矩阵
 * @returns 转换后的2D顶点
 */
export function vertex3dTo2dForClipper(
  vertex3d: unknown,
  transformMatrix: unknown
): unknown;