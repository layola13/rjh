/**
 * SVG样式配置模块
 * 
 * 提供用于SVG图形渲染的预定义样式对象，包括交叉指示器、预览路径等的视觉样式配置。
 */

/**
 * SVG样式属性接口
 * 定义SVG元素的常用样式属性
 */
interface SVGStyleAttributes {
  /** 填充颜色 */
  fill?: string;
  /** 描边颜色 */
  stroke?: string;
  /** 描边宽度 */
  "stroke-width"?: number;
  /** 描边虚线样式 */
  "stroke-dasharray"?: string;
  /** 向量效果（控制缩放时的描边行为） */
  "vector-effect"?: "non-scaling-stroke" | "none";
  /** 指针事件处理 */
  "pointer-events"?: "none" | "auto" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" | "painted" | "fill" | "stroke" | "all";
}

/**
 * 样式配置对象
 * 包含应用中使用的所有预定义SVG样式
 */
interface StylesConfig {
  /** 交叉点指示器样式 - 用于标记路径交叉位置 */
  intersectIndicatorStyle: SVGStyleAttributes;
  /** 预览路径样式 - 用于显示有效的路径预览 */
  previewPathStyle: SVGStyleAttributes;
  /** 无效预览路径样式 - 用于显示无效或错误的路径预览 */
  invalidPreviewPathStyle: SVGStyleAttributes;
}

/**
 * 样式配置常量
 * 
 * @remarks
 * - `intersectIndicatorStyle`: 橙红色填充，黑色描边，用于突出显示交叉点
 * - `previewPathStyle`: 深灰色描边，浅绿色填充，表示正常预览状态
 * - `invalidPreviewPathStyle`: 橙红色描边，浅绿色填充，表示无效状态
 * 
 * 所有样式均使用 `non-scaling-stroke` 确保描边宽度不受变换影响，
 * 且设置 `pointer-events: none` 避免干扰用户交互。
 */
export const Styles: Readonly<StylesConfig> = {
  intersectIndicatorStyle: {
    fill: "#eb5d46",
    stroke: "black",
    "stroke-width": 1,
    "vector-effect": "non-scaling-stroke",
    "pointer-events": "none"
  },
  
  previewPathStyle: {
    "stroke-dasharray": "none",
    "stroke-width": 1,
    stroke: "#1C1C1C",
    fill: "#EDF1E8",
    "vector-effect": "non-scaling-stroke",
    "pointer-events": "none"
  },
  
  invalidPreviewPathStyle: {
    "stroke-dasharray": "none",
    "stroke-width": 1,
    stroke: "#eb5d46",
    fill: "#EDF1E8",
    "vector-effect": "non-scaling-stroke",
    "pointer-events": "none"
  }
};