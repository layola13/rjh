/**
 * CWTube实体类模块
 * 用于表示管道(Tube)实体，继承自AcceptEntity基类
 * @module CWTubeEntity
 */

import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { ParameterNames } from './ParameterNames';

/**
 * 实体类型定义
 */
interface EntityType {
  /** 类类型标识 */
  classType: string;
  /** 子类型标识 */
  subType: string;
}

/**
 * 实体数据接口
 * 定义构建CWTube实体所需的原始数据结构
 */
interface EntityData {
  /** 实体唯一标识符 */
  id: string;
  /** 父实体ID */
  parentId: string;
  /** 管道尺寸(三维坐标数组) */
  size: Array<[number, number, number]>;
  /** 类类型 */
  classType: string;
  /** 子类型 */
  subType: string;
}

/**
 * CWTube实体类
 * 表示计算机辅助设计(CAD)中的管道实体
 * 支持层级结构和参数化实例数据
 * 
 * @extends AcceptEntity
 * @example
 * const tubeEntity = new CWTubeEntity();
 * tubeEntity.buildEntityData({
 *   id: 'tube-001',
 *   parentId: 'parent-001',
 *   size: [[0, 0, 0], [100, 100, 100]],
 *   classType: 'Pipe',
 *   subType: 'Circular'
 * });
 */
export class CWTubeEntity extends AcceptEntity {
  /**
   * 构建子实体集合
   * 当前实现为空，可在子类中重写以添加子实体逻辑
   * 
   * @param data - 用于构建子实体的数据
   * @returns void
   */
  buildChildren(data: unknown): void {
    // 空实现 - 子类可重写
  }

  /**
   * 构建实体数据
   * 解析输入数据并初始化实体的实例数据和类型信息
   * 
   * @param entityData - 包含实体配置的数据对象
   * @returns void
   */
  buildEntityData(entityData: EntityData): void {
    this.setInstanceData(this.getInstanceData(entityData));
    this.setType({
      classType: entityData.classType,
      subType: entityData.subType
    });
  }

  /**
   * 获取实例数据
   * 从原始实体数据构造InstanceData对象，包含父ID和尺寸参数
   * 
   * @param entityData - 原始实体数据
   * @returns 填充了参数的InstanceData对象
   */
  getInstanceData(entityData: EntityData): InstanceData {
    const instanceData = new InstanceData(entityData.id);
    
    instanceData.addParameter(
      new Parameter(ParameterNames.parentId, entityData.parentId, DataType.String),
      new Parameter('size', entityData.size, DataType.ArrayPoint3D)
    );
    
    return instanceData;
  }
}