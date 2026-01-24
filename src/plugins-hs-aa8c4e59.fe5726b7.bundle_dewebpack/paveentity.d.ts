/**
 * PaveEntity模块
 * 负责处理铺贴实体的构建和数据管理
 * @module PaveEntity
 */

import { AcceptEntity } from './AcceptEntity';
import { RegionEntity } from './RegionEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { HSPaveSDK, HSCore } from './SDKTypes';
import { Utils } from './Utils';

/**
 * 铺贴输入数据接口
 */
interface IPaveInput {
  /** 混合绘制对象 */
  mixPaint: IMixPaint;
  /** 轮廓路径 */
  outline?: IPath2D[];
  /** 源实体 */
  srcEntity?: HSCore.Model.Face | IEntity;
  /** 面类型 */
  faceType?: string;
  /** 面所有者ID */
  faceOwnerId?: string;
}

/**
 * 混合绘制接口
 */
interface IMixPaint {
  /** 唯一标识 */
  id: string;
  /** 类型类 */
  Class: string;
  /** 混合铺贴对象 */
  mixPave: IMixPave;
  /** 面组 */
  faceGroup: IFaceGroup;
  /** 获取背景路径 */
  getBackgroundPath(): IPath2D | undefined;
}

/**
 * 混合铺贴接口
 */
interface IMixPave {
  /** 独立区域集合 */
  independentRegions: IRegion[];
  /** 普通区域集合 */
  regions: IRegion[];
}

/**
 * 区域接口
 */
interface IRegion {
  /** 区域路径 */
  path: IPath2D;
}

/**
 * 面组接口
 */
interface IFaceGroup {
  /** 获取面ID列表 */
  getFaceIds(): string[];
  /** 变换映射表 */
  transformMap: Record<string, ITransform>;
}

/**
 * 2D路径接口
 */
interface IPath2D {
  /** 外轮廓 */
  outer: IPoint[];
  /** 内孔集合 */
  holes: IPoint[][];
}

/**
 * 点坐标接口
 */
interface IPoint {
  x: number;
  y: number;
  /** 应用变换 */
  transform(matrix: ITransform): void;
}

/**
 * 变换矩阵接口
 */
interface ITransform {
  // 变换矩阵相关属性
}

/**
 * 实体基础接口
 */
interface IEntity {
  /** 实体ID */
  id: string;
  /** 原始2D路径 */
  rawPath2d?: IPath2D;
  /** 孔洞路径集合 */
  holesPath2d?: IPath2D[];
}

/**
 * 区域接受参数接口
 */
interface IRegionAcceptParams {
  /** 区域对象 */
  region: IRegion;
  /** 轮廓路径 */
  outline?: IPath2D[];
  /** 混合铺贴对象 */
  mixPave: IMixPave;
  /** 面ID列表 */
  faceIds: string[];
}

/**
 * 铺贴实体类
 * 继承自AcceptEntity，负责处理铺贴区域的构建和实例数据生成
 * @extends AcceptEntity
 */
export declare class PaveEntity extends AcceptEntity {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 构建子实体
   * 根据混合铺贴数据创建独立区域和普通区域实体
   * @param input - 铺贴输入数据
   * @param context - 构建上下文
   */
  buildChildren(input: IPaveInput, context: unknown): void;

  /**
   * 构建实体数据
   * 设置实例数据和类型信息
   * @param input - 铺贴输入数据
   * @param context - 构建上下文
   */
  buildEntityData(input: IPaveInput, context: unknown): void;

  /**
   * 获取实例数据
   * 生成包含面ID、面组ID、父ID等参数的实例数据
   * @param input - 铺贴输入数据
   * @returns 实例数据对象
   */
  getInstanceData(input: IPaveInput): InstanceData;

  /**
   * 获取轮廓路径（私有方法）
   * 根据源实体类型计算最终轮廓，处理孔洞、障碍物等裁剪
   * @param input - 铺贴输入数据
   * @returns 处理后的轮廓路径数组，如果无法计算则返回undefined
   * @private
   */
  private _getOutline(input: IPaveInput): IPath2D[] | undefined;

  /**
   * 设置实例数据（继承自父类）
   * @param data - 实例数据
   */
  protected setInstanceData(data: InstanceData): void;

  /**
   * 设置类型信息（继承自父类）
   * @param typeInfo - 类型信息对象
   */
  protected setType(typeInfo: { classType: string }): void;

  /**
   * 获取参数值（继承自父类）
   * @param paramName - 参数名称
   * @returns 参数值
   */
  protected getParameterValue<T = unknown>(paramName: string): T;

  /**
   * 添加子实体（继承自父类）
   * @param child - 子实体对象
   */
  protected addChild(child: unknown): void;
}