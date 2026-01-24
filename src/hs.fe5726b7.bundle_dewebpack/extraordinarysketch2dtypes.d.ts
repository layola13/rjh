/**
 * ExtraordinarySketch2d 插件类型定义
 * 
 * 定义了二维草图绘制插件中所有可用的操作类型常量。
 * 这些类型用于标识不同的绘图命令请求。
 * 
 * @module ExtraordinarySketch2dTypes
 */

/**
 * 二维草图绘制操作类型枚举
 * 
 * 包含所有支持的二维草图绘制操作的类型标识符。
 * 每个属性对应一个特定的绘图功能请求类型。
 */
export declare const ExtraordinarySketch2dTypes: {
  /**
   * 添加分割点操作
   * 用于在现有图形元素上添加分割点
   */
  readonly ExAddSplitPoint: "hsw.plugin.extraordinarySketch2d.req.AddSplitPoint";
  
  /**
   * 绘制线条操作
   * 用于绘制一条或多条直线
   */
  readonly ExDrawLines: "hsw.plugin.extraordinarySketch2d.req.DrawLines";
  
  /**
   * 绘制矩形操作
   * 用于绘制矩形图形
   */
  readonly ExDrawRectangle: "hsw.plugin.extraordinarySketch2d.req.DrawRectangle";
  
  /**
   * 绘制圆形操作
   * 用于绘制圆形或椭圆形图形
   */
  readonly ExDrawCircle: "hsw.plugin.extraordinarySketch2d.req.DrawCircle";
  
  /**
   * 绘制正多边形操作
   * 用于绘制正多边形（如正五边形、正六边形等）
   */
  readonly ExDrawRegularPolygon: "hsw.plugin.extraordinarySketch2d.req.DrawRegularPolygon";
  
  /**
   * 线条转圆弧操作
   * 用于将直线转换为圆弧
   */
  readonly ExConvertLineToArc: "hsw.plugin.extraordinarySketch2d.req.ConvertLineToArc";
};

/**
 * 二维草图操作类型
 * 
 * 表示所有可用的二维草图操作类型的联合类型
 */
export type ExtraordinarySketch2dType = typeof ExtraordinarySketch2dTypes[keyof typeof ExtraordinarySketch2dTypes];