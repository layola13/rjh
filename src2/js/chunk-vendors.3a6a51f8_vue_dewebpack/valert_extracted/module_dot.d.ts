/**
 * 颜色HSVA值接口
 * 表示色调、饱和度、明度和透明度
 */
interface HSVA {
  /** 色调 (Hue): 0-360 */
  h: number;
  /** 饱和度 (Saturation): 0-1 */
  s: number;
  /** 明度 (Value/Brightness): 0-1 */
  v: number;
  /** 透明度 (Alpha): 0-1 */
  a: number;
}

/**
 * 颜色对象接口
 */
interface Color {
  /** HSVA颜色值 */
  hsva: HSVA;
}

/**
 * 坐标点接口
 */
interface Point {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 颜色选择器点位模块上下文接口
 */
interface DotModuleContext {
  /** 颜色对象，可能未初始化 */
  color?: Color;
  /** 容器宽度（字符串格式，如 "200px"） */
  width: string;
  /** 容器高度（字符串格式，如 "200px"） */
  height: string;
}

/**
 * 计算颜色选择器中dot的位置坐标
 * 
 * 基于当前颜色的HSVA值计算dot在颜色选择器画布中的位置：
 * - X坐标由饱和度(s)决定，从左(0)到右(1)
 * - Y坐标由明度(v)决定，从上(0)到下(1)，需要反转(1-v)
 * 
 * @this {DotModuleContext} 包含颜色信息和容器尺寸的上下文
 * @returns {Point} 包含x和y坐标的点对象
 * 
 * @example
 * const context = {
 *   color: { hsva: { h: 180, s: 0.5, v: 0.8, a: 1 } },
 *   width: "200",
 *   height: "200"
 * };
 * const position = moduleDot.call(context);
 * // 返回: { x: 100, y: 40 }
 */
declare function moduleDot(this: DotModuleContext): Point;

export { moduleDot, DotModuleContext, Point, Color, HSVA };