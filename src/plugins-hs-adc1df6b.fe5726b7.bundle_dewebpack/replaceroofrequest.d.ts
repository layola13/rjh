/**
 * 屋顶替换请求类型声明
 * 用于处理3D建模系统中的屋顶替换操作
 * 原始模块ID: 966086
 */

import { HSCore } from './hscore';

/**
 * 预览参数接口
 * 包含屋顶渲染所需的预览配置
 */
export interface PreviewParams {
  [key: string]: unknown;
}

/**
 * 屋顶参数接口
 * 定义屋顶的几何和结构参数
 */
export interface RoofParameters {
  /** 房间高度（单位：米） */
  roomHeight: number;
  
  /** 关联的墙体ID列表 */
  linkWallIds: string[];
  
  /** 房间轮廓循环 */
  roomLoop: RoomLoop;
  
  /** 屋顶类型（如平顶、斜顶、四坡顶等） */
  roofType: string;
}

/**
 * 房间轮廓接口
 * 表示房间的2D边界多边形
 */
export interface RoomLoop {
  /**
   * 克隆当前轮廓
   * @returns 克隆的轮廓实例
   */
  clone(): RoomLoop;
  
  /**
   * 缩放轮廓
   * @param scale - 缩放因子
   * @returns 缩放后的轮廓实例
   */
  scale(scale: number): RoomLoop;
}

/**
 * 开口对象接口
 * 表示屋顶上的开口（如天窗、烟囱等）
 */
export interface Opening {
  id: string;
  [key: string]: unknown;
}

/**
 * 参数化开口接口
 * 表示可通过参数自定义的开口
 */
export interface ParametricOpening {
  id: string;
  [key: string]: unknown;
}

/**
 * 屋顶模型接口
 * 表示3D建模系统中的屋顶对象
 */
export interface Roof {
  /** 预览参数 */
  previewParams: PreviewParams;
  
  /** 屋顶参数 */
  parameters: RoofParameters;
  
  /** 普通开口列表 */
  openings: Opening[];
  
  /** 参数化开口列表 */
  parametricOpenings: ParametricOpening[];
  
  /**
   * 获取唯一父级对象
   * @returns 父级内容对象（Layer或其他容器）
   */
  getUniqueParent(): HSCore.Model.Layer | HSCore.Model.Content;
}

/**
 * 自定义参数化屋顶接口
 */
export interface CustomizedParametricRoof extends Roof {
  /**
   * 通过元数据初始化屋顶
   * @param meta - 元数据对象
   * @param param2 - 保留参数
   * @param param3 - 保留参数
   * @param param4 - 保留参数
   * @param options - 初始化选项
   */
  initByMeta(
    meta: unknown,
    param2?: unknown,
    param3?: unknown,
    param4?: unknown,
    options?: Partial<RoofParameters>
  ): void;
  
  /**
   * 初始化屋顶几何
   * @param sortedLoop - 已排序的房间轮廓
   */
  initRoof(sortedLoop: RoomLoop): void;
}

/**
 * 图层接口
 * 表示内容的分层容器
 */
export interface Layer {
  /** 房间构建器 */
  roomBuilder: {
    /** 构建/重建房间几何 */
    build(): void;
  };
}

/**
 * 内容添加选项
 */
export interface AddContentOptions {
  /** 要添加的内容对象 */
  content: HSCore.Model.Content;
  
  /** 宿主对象（可选） */
  host: HSCore.Model.Content | null;
  
  /** 父级对象 */
  parent: HSCore.Model.Content | HSCore.Model.Layer;
}

/**
 * 屋顶替换请求类
 * 继承自状态请求基类，用于管理屋顶替换的事务操作
 * 
 * @example
 *