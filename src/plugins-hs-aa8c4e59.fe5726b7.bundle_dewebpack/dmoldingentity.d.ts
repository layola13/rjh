/**
 * DMoldingEntity - 线脚/装饰条实体类
 * 用于表示3D场景中的装饰线条模型,继承自CustomizationEntity
 * 提供实例数据获取和材质、尺寸等定制化参数管理功能
 */

import { HSCore, HSConstants } from './HSCore';
import { CustomizationEntity } from './CustomizationEntity';
import { CustomizationEntityFactory } from './CustomizationEntityFactory';
import { Parameter, DataType } from './Parameter';
import { CustomizationParamKey } from './CustomizationParamKey';
import { genMaterialInfoFromMeta } from './MaterialUtils';

/**
 * 材质元数据接口
 */
interface MaterialMetadata {
  /** 材质名称 */
  name?: string;
  /** 材质类型 */
  type?: string;
  /** 材质属性 */
  properties?: Record<string, unknown>;
}

/**
 * 材质对象接口
 */
interface Material {
  /** 材质元数据 */
  metadata?: MaterialMetadata;
  /** 材质ID */
  id?: string;
}

/**
 * 3D路径点类型 [x, y, z]
 */
type Point3D = [number, number, number];

/**
 * 实体子对象联合类型
 */
type EntityChild = HSCore.Model.DContent | HSCore.Model.DSweep;

/**
 * 扫掠实体元数据
 */
interface SweepMetadata {
  /** 轮廓Y方向尺寸 */
  profileSizeY?: number;
  /** 轮廓X方向尺寸 */
  profileSizeX?: number;
}

/**
 * 扫掠模型接口扩展
 */
declare module './HSCore' {
  namespace HSCore.Model {
    interface DSweep {
      /** 扫掠元数据 */
      metadata?: SweepMetadata;
      /** 扫掠材质 */
      material?: Material;
    }
  }
}

/**
 * 实例数据接口
 * 描述从3D模型中提取的实例化数据
 */
interface InstanceData {
  /** 路径数组,每个路径包含多个3D点 */
  paths: Point3D[][];
  /** Y轴方向尺寸(高度) */
  YSize: number;
  /** 子对象集合 */
  children: Record<string, EntityChild>;
  
  /**
   * 添加定制化参数
   * @param parameter - 要添加的参数对象
   */
  addParameter(parameter: Parameter): void;
}

/**
 * 装饰线条实体类
 * 用于处理3D建模场景中的线脚、踢脚线、天花线等装饰条模型
 * 自动计算长度、高度等几何参数并提取材质信息
 * 
 * @example
 *