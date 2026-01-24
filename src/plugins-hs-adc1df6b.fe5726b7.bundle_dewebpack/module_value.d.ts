/**
 * 绘制线条工厂函数
 * 
 * 创建一个新的 DrawLine 实例用于在临时显示层上绘制线条
 * 
 * @module module_value
 * @originalId value
 */

/**
 * 绘制上下文配置接口
 */
interface DrawContext {
  /** 绘图上下文（Canvas 2D 或 WebGL 上下文） */
  context: CanvasRenderingContext2D | WebGLRenderingContext;
  
  /** 显示层配置 */
  displayLayers: {
    /** 临时绘制层，用于预览或临时图形 */
    temp: HTMLCanvasElement | OffscreenCanvas;
    [key: string]: HTMLCanvasElement | OffscreenCanvas;
  };
}

/**
 * DrawLine 类的构造函数参数类型
 */
interface DrawLineConstructorParams {
  context: CanvasRenderingContext2D | WebGLRenderingContext;
  layer: HTMLCanvasElement | OffscreenCanvas;
  parent: unknown;
  isEditable: boolean;
}

/**
 * 绘制线条类
 */
declare class DrawLine {
  constructor(
    context: CanvasRenderingContext2D | WebGLRenderingContext,
    layer: HTMLCanvasElement | OffscreenCanvas,
    parent: unknown,
    isEditable: boolean
  );
}

/**
 * 创建绘制线条实例的工厂函数
 * 
 * @param options - 绘制上下文配置对象
 * @returns 新的 DrawLine 实例
 * 
 * @example
 *