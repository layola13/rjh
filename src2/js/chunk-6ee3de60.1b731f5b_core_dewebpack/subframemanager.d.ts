/**
 * 子框架管理器模块
 * 负责管理和操作子框架中的杆件(Bar)元素
 */

import { Bar, ShapeType } from './Bar';
import { Polygon } from './Polygon';

/**
 * 子框架配置接口
 */
interface SubFrameConfig {
  /** 型材尺寸 */
  profileSize: number;
  /** 边缘连接方式 */
  edgeJointWay: number | string;
}

/**
 * 多边形框架化结果接口
 */
interface FrametifyResult {
  /** 生成的杆件多边形数组 */
  barPolys: Polygon[];
}

/**
 * 宿主对象接口
 * 表示包含子框架的父级对象
 */
interface SubFrameHost {
  /** 子框架配置 */
  subFrame: SubFrameConfig;
  /** 多边形几何信息 */
  polygon: Polygon & {
    /** 多边形的边集合 */
    edges: unknown[];
    /** 将多边形转换为框架结构 */
    frametify(sizes: number[], jointWays: (number | string)[]): FrametifyResult;
  };
  /** 子元素集合 */
  children: unknown[];
  /** 添加子元素 */
  add(child: Bar): void;
  /** 清除所有子元素 */
  clearChildren(): void;
}

/**
 * 子框架管理器类
 * 用于创建、管理和操作子框架中的杆件元素
 */
export declare class SubFrameManager {
  /** 宿主对象引用 */
  private readonly host: SubFrameHost;

  /**
   * 构造函数
   * @param host 宿主对象，包含子框架配置和几何信息
   */
  constructor(host: SubFrameHost);

  /**
   * 获取型材尺寸
   * @returns 型材尺寸数值
   */
  get profileSize(): number;

  /**
   * 获取边缘连接方式
   * @returns 边缘连接方式标识
   */
  get edgeJointWay(): number | string;

  /**
   * 获取所有杆件（包括虚拟杆件）
   * @returns 所有杆件实例数组
   */
  get allBars(): Bar[];

  /**
   * 获取实际杆件（不包括虚拟杆件）
   * @returns 非虚拟杆件实例数组
   */
  get bars(): Bar[];

  /**
   * 创建子框架杆件
   * 根据宿主多边形的边信息生成对应的杆件元素
   */
  create(): void;

  /**
   * 重新创建子框架
   * 清除所有子元素后重新创建
   */
  recreated(): void;

  /**
   * 重新创建杆件
   * 移除所有现有杆件后重新创建
   */
  recreateBars(): void;

  /**
   * 平移所有杆件
   * @param offset 平移向量或偏移量
   */
  translate(offset: unknown): void;

  /**
   * 高亮显示杆件
   * @param highlight 是否高亮显示
   */
  highlight(highlight: boolean): void;
}