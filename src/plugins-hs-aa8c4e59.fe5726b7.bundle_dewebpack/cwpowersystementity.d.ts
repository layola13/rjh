/**
 * 电力系统实体类
 * 用于构建和管理电力系统的层级结构，包含电路子实体
 * @module CWPowerSystemEntity
 */

import { AcceptEntity } from './AcceptEntity';
import { CWCircuitEntity } from './CWCircuitEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { ParameterNames } from './ParameterNames';

/**
 * 电路数据接口
 * 描述单个电路的数据结构
 */
interface CircuitData {
  /** 电路唯一标识 */
  id: string;
  /** 电路类型 */
  type?: string;
  /** 其他电路属性 */
  [key: string]: unknown;
}

/**
 * 电力系统数据接口
 * 描述电力系统实体的完整数据结构
 */
interface PowerSystemData {
  /** 实体唯一标识 */
  id: string;
  /** 父级实体ID */
  parentId: string;
  /** 类类型标识 */
  classType: string;
  /** 包含的电路列表 */
  circuits: CircuitData[];
}

/**
 * 类型配置接口
 */
interface TypeConfig {
  /** 类类型标识 */
  classType: string;
}

/**
 * 电力系统实体类
 * 继承自AcceptEntity，负责处理电力系统的数据构建和子实体管理
 * 
 * @example
 *