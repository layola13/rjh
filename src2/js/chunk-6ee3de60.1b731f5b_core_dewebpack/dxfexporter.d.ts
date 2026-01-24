/**
 * DXF导出器模块
 * 负责将图形数据导出为DXF格式文件
 */

import type Flatten from '@flatten-js/core';
import type DxfWriter from 'dxf-writer';
import type {
  ShapeManager,
  ScreenFiller,
  DimInfo,
  Dimension,
  PolygonCreator,
  PushSashHardwareManager,
  SlideHardwareManager
} from './internal-types';

/**
 * DXF图层枚举
 */
declare enum DxfLayer {
  /** 默认图层 */
  Default = "0",
  /** 虚线图层 */
  DASHED = "1"
}

/**
 * 视图接口，包含图形管理器
 */
interface IView {
  /** 图形管理器 */
  shapeManager: ShapeManager;
}

/**
 * 框架管理器接口
 */
interface IFrameManager {
  /** 框架条集合 */
  bars: Array<{ polygon: Flatten.Polygon }>;
}

/**
 * 中梃管理器接口
 */
interface IMullionManager {
  /** 中梃条集合 */
  bars: Array<{ polygon: Flatten.Polygon }>;
  /** 玻璃填充物集合 */
  glasses: Array<IGlassFiller>;
}

/**
 * 玻璃填充物接口
 */
interface IGlassFiller {
  /** 压条（可选） */
  bead?: {
    frameManager: IFrameManager;
  };
}

/**
 * 百叶窗管理器接口
 */
interface IShutterManager {
  /** 百叶条集合 */
  bars: Array<{ polygon: Flatten.Polygon }>;
}

/**
 * 五金件管理器接口
 */
interface IHardwareManager {
  /** 五金件集合 */
  hardwares: Array<{
    /** 图形集合 */
    shapes: Flatten.Polygon[];
    /** 是否隐藏 */
    hidden: boolean;
    /** 尺寸标注 */
    dim: DimInfo | Dimension;
  }>;
}

/**
 * 推拉窗五金件管理器接口
 */
interface IPushSashHardwareManager extends IHardwareManager {
  /** 开启方向指示器 */
  indicator: {
    shapes: Array<{
      /** 是否为虚线 */
      dashed: boolean;
      /** 路径多边形 */
      poly: Flatten.Polygon;
    }>;
  };
}

/**
 * 滑动窗五金件管理器接口
 */
interface ISlideHardwareManager extends IHardwareManager {
  /** 滑动方向指示器 */
  indicatorForSlide: {
    shapes: Array<{
      /** 路径多边形 */
      poly: Flatten.Polygon;
    }>;
  };
}

/**
 * 窗扇接口
 */
interface ISash {
  /** 框架管理器 */
  frameManager: IFrameManager;
  /** 中梃管理器 */
  mulManager: IMullionManager;
  /** 五金件管理器 */
  hardwareManager: IHardwareManager;
}

/**
 * 防盗窗接口
 */
interface ITheft {
  /** 框架管理器 */
  frameManager: IFrameManager;
  /** 百叶窗管理器 */
  shutManager: IShutterManager;
}

/**
 * 窗扇管理器接口
 */
interface ISashManager {
  /** 所有窗扇 */
  allSashes: ISash[];
  /** 防盗窗集合 */
  thefts: ITheft[];
}

/**
 * 图形对象接口
 */
interface IShape {
  /** 框架管理器 */
  frameManager: IFrameManager;
  /** 中梃管理器 */
  mulManager: IMullionManager;
  /** 尺寸标注 */
  dim: {
    /** 尺寸管理器 */
    diMgr: {
      /** 可视尺寸标注集合 */
      visualDims: Array<DimInfo | Dimension>;
    };
  };
  /** 窗扇管理器 */
  sashManager: ISashManager;
}

/**
 * 连接件接口
 */
interface ICouple {
  /** 多边形 */
  polygon: Flatten.Polygon;
}

/**
 * 墙体接口
 */
interface IWall {
  /** 多边形 */
  polygon: Flatten.Polygon;
  /** 尺寸标注集合 */
  dims: Array<DimInfo | Dimension>;
}

/**
 * DXF导出器类
 * 负责将图形视图导出为DXF格式文件
 */
export declare class DxfExporter {
  /** 视图对象 */
  private readonly view: IView;
  
  /** DXF写入器实例 */
  private readonly dxf: DxfWriter;

  /**
   * 构造函数
   * @param view - 包含图形数据的视图对象
   */
  constructor(view: IView);

  /**
   * 获取图形管理器
   * @returns 视图的图形管理器实例
   */
  get manager(): ShapeManager;

  /**
   * 执行导出操作
   * 将整个视图的图形数据导出为DXF格式字符串
   * @returns DXF格式的字符串内容
   */
  export(): string;

  /**
   * 绘制框架
   * @param frameManager - 框架管理器，包含框架条集合
   */
  private drawFrame(frameManager: IFrameManager): void;

  /**
   * 绘制中梃
   * @param mullionManager - 中梃管理器，包含中梃条和玻璃集合
   */
  private drawMullion(mullionManager: IMullionManager): void;

  /**
   * 绘制百叶窗
   * @param shutterManager - 百叶窗管理器
   */
  private drawShutter(shutterManager: IShutterManager): void;

  /**
   * 绘制填充物（如纱窗等）
   * @param filler - 填充物对象，支持纱窗等类型
   */
  private drawFiller(filler: ScreenFiller | IGlassFiller): void;

  /**
   * 绘制五金件
   * @param hardwareManager - 五金件管理器
   */
  private drawHardware(hardwareManager: IHardwareManager): void;

  /**
   * 在指定图层执行绘制操作
   * @param layer - 目标图层
   * @param callback - 绘制回调函数
   */
  private withLayer(layer: DxfLayer, callback: () => void): void;

  /**
   * 绘制尺寸标注
   * @param dimension - 尺寸标注对象（DimInfo或Dimension类型）
   */
  private drawDim(dimension: DimInfo | Dimension): void;

  /**
   * 绘制文本
   * @param text - 文本内容
   * @param position - 文本位置坐标
   * @param height - 文字高度（单位：毫米）
   */
  private drawText(text: string, position: Flatten.Point, height: number): void;

  /**
   * 绘制多边形
   * 支持圆环、圆形和普通多边形（含圆弧边）
   * @param polygon - Flatten.js多边形对象
   */
  private drawPolygon(polygon: Flatten.Polygon): void;

  /**
   * 绘制路径（开放的多段线）
   * @param path - 路径多边形对象
   */
  private drawPath(path: Flatten.Polygon): void;

  /**
   * 绘制直线段
   * @param segment - Flatten.js线段对象
   */
  private drawLine(segment: Flatten.Segment): void;
}