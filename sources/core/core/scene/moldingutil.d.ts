/**
 * 踢脚线/顶角线工具类
 * 提供线条创建、合并、自动连接等功能
 */

import { MoldingTypeEnum } from './MoldingTypeEnum';
import { Baseboard } from './Baseboard';
import { Cornice } from './Cornice';
import { Face, FaceHoleType } from './Face';
import { BaseboardTopoPather } from './BaseboardTopoPather';
import { CorniceTopoPather } from './CorniceTopoPather';

/**
 * 拓扑路径器接口
 */
interface ITopoPather {
  /** 拓扑名称 */
  toponame: string;
  /** 是否为辅助路径 */
  isAux: boolean;
  /** 起始参数 */
  from: number;
  /** 结束参数 */
  to: number;
  /** 3D曲线 */
  curve3d: any;
  /** 索引 */
  index: number;
  /** 获取扫掠路径 */
  getSweepPath(): any;
  /** 克隆 */
  clone(): ITopoPather;
}

/**
 * 线条实体基类接口
 */
interface IMolding {
  /** 线条类型 */
  type: MoldingTypeEnum;
  /** X方向尺寸 */
  XSize: number;
  /** Y方向尺寸 */
  YSize: number;
  /** 高度 */
  height: number;
  /** 厚度 */
  thickness: number;
  /** 偏移 */
  offset?: number;
  /** 材质 */
  material?: { seekId: string };
  /** 拓扑路径器数组 */
  topoPathers: ITopoPather[];
  /** 扫掠路径 */
  sweepPath: any[];
  /** 所属面 */
  parent?: Face;
  /** 是否在墙内 */
  isInWall?: boolean;
  /** 实体属性 */
  entityAttribute?: {
    XSize: number;
    YSize: number;
    height: number;
    thickness: number;
  };
  /** 分配到面 */
  assignTo(face: Face): void;
  /** 计算扫掠路径 */
  calcSweepPath(param: boolean): any[];
  /** 获取起始拓扑路径器 */
  getStartTopoPather(): ITopoPather | undefined;
  /** 获取结束拓扑路径器 */
  getEndTopoPather(): ITopoPather | undefined;
  /** 添加拓扑路径器 */
  addTopoPather(pather: ITopoPather): boolean;
  /** 克隆 */
  clone(): IMolding;
}

/**
 * 内容实体接口
 */
interface IContent {
  /** 宿主对象 */
  host?: any;
  /** 内容类型 */
  contentType: { isTypeOf(type: any): boolean };
}

/**
 * 基础扫掠路径数据
 */
interface IBaseSweepPathData {
  /** 拓扑名称 */
  toponame: string;
  /** 是否为辅助 */
  isAux: boolean;
  /** 3D曲线 */
  curve3d: any;
  /** Z轴限制（踢脚线） */
  zlimit?: number;
  /** 偏移Z轴限制（顶角线） */
  offsetZLimit?: number;
  /** 索引 */
  index: number;
}

/**
 * 拓扑路径器参数信息
 */
interface ITopoPatherParamInfo {
  /** 拓扑路径器 */
  topoPather: ITopoPather;
  /** 起始参数 */
  startParam: number;
  /** 结束参数 */
  endParam: number;
}

/** 数值精度阈值 */
const EPSILON = 1e-6;

/**
 * 线条工具类
 * 提供踢脚线和顶角线的创建、合并、自动连接等核心功能
 */
export declare const MoldingUtil: {
  /**
   * 根据类型创建线条实例
   * @param moldingType - 线条类型枚举
   * @returns 创建的线条实例，如果类型未知则返回 undefined
   */
  createFromType(moldingType: MoldingTypeEnum): IMolding | undefined;

  /**
   * 复制线条属性
   * @param target - 目标线条
   * @param source - 源线条或实体
   */
  copyMoldingAttribute(target: IMolding, source: IMolding | any): void;

  /**
   * 创建踢脚线拓扑路径器
   * @param data - 基础扫掠路径数据
   * @returns 踢脚线拓扑路径器实例
   */
  createBaseboardTopoPather(data: IBaseSweepPathData): BaseboardTopoPather;

  /**
   * 创建顶角线拓扑路径器
   * @param data - 基础扫掠路径数据
   * @returns 顶角线拓扑路径器实例
   */
  createCorniceTopoPather(data: IBaseSweepPathData): CorniceTopoPather;

  /**
   * 将线条添加到面
   * @param molding - 待添加的线条
   * @param face - 目标面
   */
  addToFace(molding: IMolding | undefined, face: Face): void;

  /**
   * 合并两个踢脚线
   * @param first - 第一个踢脚线
   * @param second - 第二个踢脚线
   * @returns 合并后的踢脚线，如果无法合并则返回 undefined
   */
  mergeBaseboard(first: IMolding, second: IMolding): IMolding | undefined;

  /**
   * 合并两个顶角线
   * @param first - 第一个顶角线
   * @param second - 第二个顶角线
   * @returns 合并后的顶角线，如果无法合并则返回 undefined
   */
  mergeCornice(first: IMolding, second: IMolding): IMolding | undefined;

  /**
   * 合并两个踢脚线拓扑路径器
   * @param first - 第一个拓扑路径器
   * @param second - 第二个拓扑路径器
   * @returns 合并后的拓扑路径器，如果无法合并则返回 undefined
   */
  mergeBaseboardTopoPather(first: ITopoPather, second: ITopoPather): ITopoPather | undefined;

  /**
   * 合并两个顶角线拓扑路径器
   * @param first - 第一个拓扑路径器
   * @param second - 第二个拓扑路径器
   * @returns 合并后的拓扑路径器，如果无法合并则返回 undefined
   */
  mergeCorniceTopoPather(first: ITopoPather, second: ITopoPather): ITopoPather | undefined;

  /**
   * 判断内容是否影响面的线条
   * @param content - 内容实体
   * @returns 是否影响面线条
   */
  isAffectFaceMoldingContent(content: IContent): boolean;

  /**
   * 判断内容是否影响踢脚线
   * @param content - 内容实体
   * @returns 是否影响踢脚线
   */
  isAffectBaseboardContent(content: any): boolean;

  /**
   * 判断内容是否影响顶角线
   * @param content - 内容实体
   * @returns 是否影响顶角线
   */
  isAffectCorniceContent(content: any): boolean;

  /**
   * 判断内容是否影响覆盖面
   * @param content - 内容实体
   * @returns 是否影响覆盖面
   */
  isAffectCoverFacesContent(content: any): boolean;

  /**
   * 自动连接面的所有线条（踢脚线和顶角线）
   * @param face - 目标面
   */
  autoConnectFaceMolding(face: Face): void;

  /**
   * 自动连接面的踢脚线
   * @param face - 目标面
   * @param indexMoldingMap - 索引到线条的映射表（可选）
   */
  autoConnectFaceBaseboards(face: Face, indexMoldingMap?: Map<string, IMolding>): void;

  /**
   * 自动连接面的顶角线
   * @param face - 目标面
   * @param indexMoldingMap - 索引到线条的映射表（可选）
   */
  autoConnectFaceCornices(face: Face, indexMoldingMap?: Map<string, IMolding>): void;

  /**
   * 自动连接给定的顶角线数组
   * @param cornices - 顶角线数组
   * @param indexMoldingMap - 索引到线条的映射表（可选）
   */
  autoConnectGivenCornices(cornices: IMolding[], indexMoldingMap?: Map<string, IMolding>): void;

  /**
   * 重新添加面的所有线条
   * @param face - 目标面
   */
  reAddFaceMolding(face: Face): void;

  /**
   * 重新添加面的踢脚线
   * @param face - 目标面
   * @param useDefault - 是否使用默认配置
   * @returns 索引到线条的映射表
   */
  reAddFaceBaseboard(face: Face, useDefault?: boolean): Map<number, IMolding> | undefined;

  /**
   * 重新添加面的顶角线
   * @param face - 目标面
   * @param useDefault - 是否使用默认配置
   * @returns 索引到线条的映射表
   */
  reAddFaceCornice(face: Face, useDefault?: boolean): Map<number, IMolding> | undefined;
};