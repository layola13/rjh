/**
 * 形状管理器配置选项接口
 * 定义用于配置画布形状管理器的各项参数
 */
export interface ShapeManagerConfig {
  /** 框架边缘连接方式 */
  frameEdgeJointWay: number;
  
  /** 滑动框架边缘连接方式，默认值为2 */
  slideFrameEdgeJointWay?: number | null;
  
  /** 窗扇边缘连接方式 */
  sashEdgeJointWay: number;
  
  /** 固定压条连接方式，默认值为0 */
  fixedBeadJointWay?: number | null;
  
  /** 是否隐藏顶视图 */
  topViewHidden?: boolean;
  
  /** 绘制多边形类型，默认为"bridge" */
  drawPolyType?: string;
  
  /** 窗扇是否向外开启，默认为true */
  sashOutwardOpen?: boolean | null;
  
  /** 窗扇是否支持双向开启 */
  sashDoubleWayOpen?: boolean;
  
  /** 是否显示固定压条，默认为true */
  fixedBeadShown?: boolean | null;
  
  /** 是否显示窗扇压条，默认为true */
  sashBeadShown?: boolean | null;
  
  /** 是否包含转角框架，默认为true */
  withTurningFrame?: boolean | null;
  
  /** 是否反转内外侧 */
  reverseInnerOuter?: boolean;
  
  /** 是否将固定窗扇转换为固定玻璃 */
  fixedSashToFixedGlass?: boolean;
  
  /** 是否无间隙模式（同时应用于框架、固定压条、窗扇和窗扇压条） */
  nonGap?: boolean;
}

/**
 * 画布形状管理器接口
 * 管理画布中各种形状元素的配置和行为
 */
export interface ShapeManager {
  /** 框架边缘连接方式 */
  frameEdgeJointWay: number;
  
  /** 滑动框架边缘连接方式 */
  slideFrameEdgeJointWay: number;
  
  /** 窗扇边缘连接方式 */
  sashEdgeJointWay: number;
  
  /** 固定压条连接方式 */
  fixedBeadJointWay: number;
  
  /** 是否隐藏顶视图 */
  topViewHidden: boolean;
  
  /** 绘制多边形类型 */
  drawPolyType: string;
  
  /** 窗扇是否向外开启 */
  sashOutwardOpen: boolean;
  
  /** 窗扇是否支持双向开启 */
  sashDoubleWayOpen: boolean;
  
  /** 是否显示固定压条 */
  fixedBeadShown: boolean;
  
  /** 是否显示窗扇压条 */
  sashBeadShown: boolean;
  
  /** 是否包含转角框架 */
  withTurningFrame: boolean;
  
  /** 是否显示转角标签 */
  displayTurningLabel: boolean;
  
  /** 是否反转内外侧 */
  reverseInnerOuter: boolean;
  
  /** 是否将固定窗扇转换为固定玻璃 */
  fixedSashToFixedGlass: boolean;
  
  /** 框架是否无间隙 */
  nonGapFrame: boolean;
  
  /** 固定压条是否无间隙 */
  nonGapFixedBead: boolean;
  
  /** 窗扇是否无间隙 */
  nonGapSash: boolean;
  
  /** 窗扇压条是否无间隙 */
  nonGapSashBead: boolean;
}

/**
 * 画布接口
 * 包含形状管理器的画布对象
 */
export interface Canvas {
  /** 形状管理器实例 */
  shapeManager: ShapeManager;
}

/**
 * 形状管理器配置类
 * 用于根据配置对象更新画布形状管理器的各项属性
 */
export declare class ShapeManagerConfigurator {
  /** 画布实例 */
  canvas: Canvas;
  
  /**
   * 应用形状管理器配置
   * @param config - 形状管理器配置选项
   */
  applyConfig(config: ShapeManagerConfig): void;
}

export default ShapeManagerConfigurator;