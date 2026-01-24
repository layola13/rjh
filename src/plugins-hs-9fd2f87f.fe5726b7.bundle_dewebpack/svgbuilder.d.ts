/**
 * SVG构建器模块
 * 提供三种SVG导出构建器：标准构建器、原始构建器和小地图构建器
 */

import type { SvgContext, SvgRawContext, SvgMinimapContext, SvgOutline } from './svg-context';
import type { SvgOpenings } from './svg-openings';
import type { SvgDoorStones } from './svg-door-stones';
import type { SvgCornerWindows } from './svg-corner-windows';
import type { SvgRooms } from './svg-rooms';
import type { SvgDimensions } from './svg-dimensions';
import type { SvgCompass, SvgEntry, SvgLogo } from './svg-decorations';
import type { SvgWalls } from './svg-walls';
import type { SvgContents } from './svg-contents';

/**
 * 应用程序主实例接口
 */
export interface IApplication {
  floorplan: {
    scene: {
      /** 室外图层 */
      outdoorLayer: Record<string, unknown>;
      /** 根图层 */
      rootLayer: Record<string, unknown>;
    };
  };
}

/**
 * SVG导出配置选项
 */
export interface ISvgExportOptions {
  /** 语言设置 */
  lang?: string;
  /** 是否忽略开口（门窗等） */
  ignoreOpening?: boolean;
  /** 是否包含油漆/涂料信息 */
  withPaint?: boolean;
  /** 是否为2D缩略图模式 */
  thumbnail2D?: boolean;
  /** 是否省略内容 */
  isNoContent?: boolean;
}

/**
 * 位置信息接口
 */
export interface IPositionInfo {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 缩放比例 */
  scale?: number;
}

/**
 * 可导出的SVG组件接口
 */
interface ISvgExportable {
  /** 异步导出方法 */
  export(): Promise<void>;
}

/**
 * 可导出小地图的SVG组件接口
 */
interface ISvgMinimapExportable {
  /** 同步导出小地图方法 */
  exportM(): void;
}

/**
 * 标准SVG构建器
 * 用于生成完整的户型图SVG，包含所有装饰元素（指南针、标志、尺寸标注等）
 */
export declare class SvgBuilder {
  private _svg: ISvgExportable[];
  private _app: IApplication;
  private _position?: IPositionInfo;
  private _svgoutline?: SvgOutline;

  /**
   * 构造函数
   * @param app - 应用程序实例
   */
  constructor(app: IApplication);

  /**
   * 构建SVG内容
   * @param options - 导出配置选项
   * @param additionalContext - 附加上下文参数
   * @returns Promise，解析为SVG的outerHTML字符串
   */
  build(options: ISvgExportOptions, additionalContext?: unknown): Promise<string>;

  /**
   * 获取导出后的位置信息
   * @returns 位置信息对象
   */
  getPositionInfo(): IPositionInfo | undefined;
}

/**
 * 原始SVG构建器
 * 用于生成简化版SVG，通常用于2D缩略图，不包含装饰元素
 */
export declare class SvgRawBuilder {
  private _svg: ISvgExportable[];
  private _app: IApplication;

  /**
   * 构造函数
   * @param app - 应用程序实例
   */
  constructor(app: IApplication);

  /**
   * 构建原始SVG内容
   * @param options - 导出配置选项
   * @returns Promise，解析为SVG的outerHTML字符串
   */
  build(options: ISvgExportOptions): Promise<string>;
}

/**
 * 小地图SVG构建器
 * 用于生成小地图视图的SVG，采用同步导出方式
 */
export declare class SvgMinimapBuilder {
  private _app: IApplication;
  private _svg: ISvgMinimapExportable[];

  /**
   * 构造函数
   * @param app - 应用程序实例
   */
  constructor(app: IApplication);

  /**
   * 构建小地图SVG内容
   * @param options - 导出配置选项
   * @returns SVG的outerHTML字符串（同步返回）
   */
  build(options: ISvgExportOptions): string;
}