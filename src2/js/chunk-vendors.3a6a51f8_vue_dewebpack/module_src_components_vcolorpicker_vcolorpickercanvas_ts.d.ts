/**
 * VColorPickerCanvas 组件类型定义
 * 颜色选择器的画布组件，用于选择颜色的饱和度和明度
 */

import Vue from 'vue';

/**
 * HSVA 颜色模型接口
 * @property h - 色相 (Hue): 0-360
 * @property s - 饱和度 (Saturation): 0-1
 * @property v - 明度 (Value): 0-1
 * @property a - 透明度 (Alpha): 0-1
 */
interface HSVA {
  h: number;
  s: number;
  v: number;
  a: number;
}

/**
 * RGBA 颜色模型接口
 * @property r - 红色通道: 0-255
 * @property g - 绿色通道: 0-255
 * @property b - 蓝色通道: 0-255
 * @property a - 透明度: 0-1
 */
interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * 颜色对象接口
 * 包含多种颜色格式表示
 */
interface ColorObject {
  /** HSVA 格式的颜色值 */
  hsva: HSVA;
  /** 色相值 (0-360) */
  hue: number;
  /** 透明度 (0-1) */
  alpha: number;
}

/**
 * 边界矩形接口
 * 描述元素的位置和尺寸信息
 */
interface BoundingRect {
  /** 矩形宽度 */
  width: number;
  /** 矩形高度 */
  height: number;
  /** 相对于视口的左侧距离 */
  left: number;
  /** 相对于视口的顶部距离 */
  top: number;
}

/**
 * 点坐标接口
 * 表示画布上的一个位置
 */
interface DotPosition {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
}

/**
 * 组件属性接口
 */
interface VColorPickerCanvasProps {
  /** 当前颜色对象 */
  color: ColorObject;
  /** 是否禁用交互 */
  disabled: boolean;
  /** 颜色指示点的尺寸 */
  dotSize: number | string;
  /** 画布高度 */
  height: number | string;
  /** 画布宽度 */
  width: number | string;
}

/**
 * 组件数据接口
 */
interface VColorPickerCanvasData {
  /** 画布元素的边界矩形信息 */
  boundingRect: BoundingRect;
}

/**
 * 组件计算属性接口
 */
interface VColorPickerCanvasComputed {
  /** 颜色指示点在画布上的位置 */
  dot: DotPosition;
}

/**
 * 组件方法接口
 */
interface VColorPickerCanvasMethods {
  /**
   * 根据鼠标位置发射颜色更新事件
   * @param clientX - 鼠标 X 坐标（相对于视口）
   * @param clientY - 鼠标 Y 坐标（相对于视口）
   */
  emitColor(clientX: number, clientY: number): void;

  /**
   * 更新画布渐变背景
   * 根据当前色相值重绘画布
   */
  updateCanvas(): void;

  /**
   * 处理画布点击事件
   * @param event - 鼠标事件对象
   */
  handleClick(event: MouseEvent): void;

  /**
   * 处理鼠标按下事件
   * 开始拖拽操作，添加全局鼠标移动和释放监听
   * @param event - 鼠标事件对象
   */
  handleMouseDown(event: MouseEvent): void;

  /**
   * 处理鼠标移动事件
   * 拖拽过程中持续更新颜色
   * @param event - 鼠标事件对象
   */
  handleMouseMove(event: MouseEvent): void;

  /**
   * 处理鼠标释放事件
   * 结束拖拽操作，移除全局监听
   */
  handleMouseUp(): void;

  /**
   * 生成 canvas 元素的 VNode
   * @returns Canvas 虚拟节点
   */
  genCanvas(): Vue.VNode;

  /**
   * 生成颜色指示点元素的 VNode
   * @returns 指示点虚拟节点
   */
  genDot(): Vue.VNode;
}

/**
 * VColorPickerCanvas 组件实例类型
 * 颜色选择器画布组件，支持通过点击或拖拽选择颜色的饱和度和明度
 */
declare const VColorPickerCanvas: Vue.ExtendedVue<
  Vue,
  VColorPickerCanvasData,
  VColorPickerCanvasMethods,
  VColorPickerCanvasComputed,
  VColorPickerCanvasProps
>;

export default VColorPickerCanvas;

/**
 * 组件事件定义
 * @event update:color - 颜色更新事件
 * @param color - 新的颜色对象
 */
export interface VColorPickerCanvasEvents {
  'update:color': (color: ColorObject) => void;
}