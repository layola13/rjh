/**
 * 全局绘制配置常量
 * @module PaintGlobal
 */

/**
 * 绘制相关的全局配置对象
 */
export interface PaintGlobal {
  /**
   * 默认缩放比例
   * @description 用于坐标或尺寸计算的基准缩放值，1e6 表示 1,000,000
   * @default 1000000
   */
  readonly DEFAULT_SCALE: number;

  /**
   * 混合绘制数据的命名空间
   * @description 用于标识混合绘制相关数据的命名空间标识符
   * @default "mixpaint"
   */
  readonly MIXPAINT_DATA_NAMESPACE: string;

  /**
   * 自定义瓦片的命名空间
   * @description 用于标识拼花（自定义瓦片）相关数据的命名空间标识符
   * @default "pinhua"
   */
  readonly CUSTOMIZEDTILE_NAMESPACE: string;
}

/**
 * 绘制全局配置常量对象
 */
export declare const PaintGlobal: PaintGlobal;