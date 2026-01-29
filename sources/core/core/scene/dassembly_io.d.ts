/**
 * DAssembly模块 - 组装组件的类型定义
 * 用于处理3D设计软件中的组装件对象，包括序列化、反序列化和几何变换
 */

import type { Content, Content_IO } from './Content';
import type { AnimationType } from './AnimationType';
import type { EntityProxyTypeEnum } from './EntityProxy';
import type { Matrix4 } from 'three';

/**
 * 动画信息配置
 */
interface AnimationInfo {
  /** 旋转动画配置 */
  rotation?: {
    /** 旋转角度（弧度） */
    angle: number;
    /** 旋转锚点坐标 */
    anchor: [number, number, number];
    /** 旋转轴向量 */
    anchorAxis: [number, number, number];
  };
  /** 平移动画配置 */
  translation?: {
    /** 平移向量 [x, y, z] */
    translation: [number, number, number];
  };
}

/**
 * 动画数据结构
 */
interface Animation {
  /** 动画类型 */
  type: AnimationType;
  /** 旋转角度 */
  angle?: number;
  /** 锚点位置 */
  anchor?: [number, number, number];
  /** 旋转轴 */
  axis?: [number, number, number];
  /** 平移向量 */
  translation?: [number, number, number];
}

/**
 * 序列化数据结构
 */
interface DAssemblySerializedData {
  /** 主模型ID */
  masterId?: string;
  /** 是否被约束隐藏 */
  hiddenByConstrain?: boolean;
  /** 定制内容类型列表 */
  customizationContentType?: string[];
  /** 是否为功能组件 */
  isFunctionComponent?: boolean;
  /** 父级iModel ID */
  imodelParentId?: string;
  /** 固定系数K */
  fixK?: number;
  /** 固定系数S */
  fixS?: number;
  /** 材质ID */
  materialId?: string;
  /** 动画变换矩阵（4x4矩阵的16个元素数组） */
  animationMatrix4?: number[];
  /** 动画列表 */
  animations?: Animation[];
}

/**
 * 3D包围盒数据结构
 */
interface BoundingBox3D {
  square: {
    minX: number;
    minY: number;
    minZ: number;
    maxX: number;
    maxY: number;
    maxZ: number;
  };
}

/**
 * 路径点坐标
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 3D点坐标
 */
interface Point3D extends Point2D {
  z: number;
}

/**
 * 元素路径信息
 */
interface ElementPathInfo {
  /** Z轴高度 */
  z: number;
  /** 元素本地ID */
  id: string;
  /** 路径点集合 */
  paths: Point2D[] | Point2D[][];
}

/**
 * 切割路径信息
 */
interface CutterInfo {
  /** 切割路径点集 */
  cutPath: Point2D[];
  /** 替换的扫掠曲线（可选） */
  replaceSweepCurves?: unknown;
}

/**
 * 踢脚板切割信息
 */
interface BaseboardCutterInfo {
  /** 切割路径 */
  cutPath: Point2D[];
  /** 补丁线段 */
  patchLines: unknown[];
}

/**
 * DAssembly输入输出处理类
 * 负责组装件的序列化和反序列化操作
 */
export declare class DAssembly_IO extends Content_IO {
  /**
   * 获取单例实例
   */
  static instance(): DAssembly_IO;

  /**
   * 序列化组装件对象
   * @param entity - 要序列化的组装件实体
   * @param callback - 序列化完成后的回调函数
   * @param includeChildren - 是否包含子对象，默认true
   * @param options - 额外的序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: DAssembly,
    callback?: (data: unknown[], entity: DAssembly) => void,
    includeChildren?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * 反序列化组装件对象
   * @param entity - 目标组装件实体
   * @param data - 序列化的数据
   * @param options - 反序列化选项
   */
  load(
    entity: DAssembly,
    data: DAssemblySerializedData,
    options?: unknown
  ): void;
}

/**
 * DAssembly组装件类
 * 表示3D场景中的组装件对象，支持动画、变换和层级结构
 */
export declare class DAssembly extends Content {
  /**
   * 构造函数
   * @param name - 组装件名称，默认为空字符串
   * @param parent - 父级对象，默认为undefined
   */
  constructor(name?: string, parent?: Content | undefined);

  // ==================== 私有属性 ====================

  /** 平移向量 [x, y, z] */
  private __translation: [number, number, number];
  
  /** 是否被约束隐藏 */
  private __hiddenByConstrain: boolean;
  
  /** 本地唯一标识符 */
  private __localId: string;
  
  /** 定制内容类型数组 */
  private __customizationContentType: string[];
  
  /** 是否为功能组件 */
  private __isFunctionComponent: boolean;
  
  /** 动画变换矩阵（4x4） */
  private __animationMatrix4: Matrix4 | null;
  
  /** 主模型ID */
  private __masterId?: string;
  
  /** 父级iModel ID */
  private __imodelParentId?: string;
  
  /** 固定系数K */
  private __fixK?: number;
  
  /** 固定系数S */
  private __fixS?: number;
  
  /** 材质ID */
  private __materialId?: string;
  
  /** 是否处于打开状态 */
  private __isOpened?: boolean;

  // ==================== 公共属性（通过装饰器声明） ====================

  /** 平移向量 */
  translation: [number, number, number];
  
  /** 主模型ID */
  masterId: string | undefined;
  
  /** 是否被约束隐藏 */
  hiddenByConstrain: boolean;
  
  /** 本地ID */
  localId: string;
  
  /** 定制内容类型 */
  customizationContentType: string[];
  
  /** 是否为功能组件 */
  isFunctionComponent: boolean;
  
  /** 父级iModel ID */
  imodelParentId: string | undefined;
  
  /** 固定系数K */
  fixK: number | undefined;
  
  /** 固定系数S */
  fixS: number | undefined;
  
  /** 材质ID */
  materialId: string | undefined;
  
  /** 动画变换矩阵 */
  animationMatrix4: Matrix4 | null;

  // ==================== 访问器 ====================

  /**
   * 判断是否为台面（Countertop）类型
   */
  get isCountertop(): boolean;

  // ==================== 几何计算方法 ====================

  /**
   * 判断内容是否在给定的循环路径内
   * @param face - 面对象
   * @param strict - 是否严格模式，默认false
   * @returns 是否在循环内
   */
  isContentInLoop(face: unknown, strict?: boolean): boolean;

  /**
   * 判断内容是否在给定的房间内
   * @param face - 面对象
   * @param strict - 是否严格模式，默认false
   * @returns 是否在房间内
   */
  isContentInRoom(face: unknown, strict?: boolean): boolean;

  /**
   * 获取元素路径集合（用于2D投影）
   * @param unused - 未使用参数
   * @param offset - 偏移量，默认{x:0, y:0}
   * @returns 路径点数组
   */
  getElementPaths(unused?: unknown, offset?: Point2D): Point2D[][] | Point2D[];

  /**
   * 获取全局3D包围盒顶点
   * @returns 3D点数组
   */
  getGlobalBound3dPoints(): Point3D[];

  /**
   * 获取全局3D包围盒
   * @returns 包围盒对象
   */
  getGlobalBoundingBox3d(): BoundingBox3D;

  /**
   * 获取本地3D包围盒
   * @returns 包围盒对象
   */
  getBoundingBox3d(): BoundingBox3D;

  /**
   * 获取本地3D包围盒顶点
   * @returns 3D点数组
   */
  getBound3dPoints(): Point3D[];

  /**
   * 获取局部坐标系下的3D包围盒顶点
   * @returns 3D点数组
   */
  getLocalBound3dPoints(): Point3D[];

  /**
   * 获取局部坐标系下的包围盒
   * @returns 包围盒对象
   */
  getLocalBoundBox3d(): BoundingBox3D;

  /**
   * 获取局部轮廓
   * @returns 轮廓点数组
   */
  getLocalOutline(): Point2D[];

  /**
   * 获取全局轮廓
   * @returns 轮廓点数组
   */
  getOutline(): Point2D[];

  /**
   * 获取视图路径（仅台面类型有效）
   * @returns 路径点数组
   */
  getViewPaths(): Point2D[];

  // ==================== 层级与子对象管理 ====================

  /**
   * 根据本地ID获取子对象
   * @param localId - 本地ID
   * @returns 子对象或undefined
   */
  getChild(localId: string): unknown | undefined;

  /**
   * 获取唯一的父对象
   * @returns 父对象或undefined
   */
  getUniqueParent(): Content | undefined;

  /**
   * 当添加到父对象时的回调
   * @param parent - 父对象
   */
  onAddedToParent(parent: Content): void;

  // ==================== 脏标记与更新 ====================

  /**
   * 标记所有非跟随父动画的子对象为脏（需要重新计算几何）
   */
  dirtyNotFloorChildren(): void;

  /**
   * 递归标记自身及所有子对象为脏
   */
  dirtyRecursive(): void;

  /**
   * 标记位置为脏
   */
  dirtyPosition(): void;

  /**
   * 刷新内部包围盒缓存
   */
  refreshBoundInternal(): void;

  // ==================== 序列化与代理 ====================

  /**
   * 获取IO处理器实例
   * @returns IO处理器
   */
  getIO(): DAssembly_IO;

  /**
   * 获取代理对象ID
   * @returns 代理类型枚举值
   */
  getProxyId(): EntityProxyTypeEnum;

  /**
   * 获取代理对象实例
   * @returns 代理对象或undefined
   */
  getProxyObject(): unknown | undefined;

  /**
   * 是否可以事务化字段
   * @returns 始终返回false
   */
  canTransactField(): boolean;

  /**
   * 迁移加载（版本兼容性处理）
   * @param entity - 实体对象
   * @param data - 数据对象
   */
  migrateLoad(entity: unknown, data: unknown): void;

  // ==================== 切割信息（用于墙面装饰） ====================

  /**
   * 获取檐口切割信息
   * @param host - 宿主对象
   * @returns 切割信息
   */
  getCorniceCutterInfo(host: unknown): CutterInfo;

  /**
   * 获取踢脚板切割信息
   * @param host - 宿主对象
   * @returns 切割信息数组
   */
  getBaseboardCutterInfo(host: unknown): BaseboardCutterInfo[];
}