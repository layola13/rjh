/**
 * 装配体物理光源模块
 * 提供装配体级别的物理光源实体及其IO操作
 */

import { Entity } from './Entity';
import { LightTypeEnum } from './LightTypeEnum';
import { PhysicalLight, PhysicalLight_IO } from './PhysicalLight';
import { LightSubGroup } from './LightSubGroup';
import { LightSubGroupCompareUtil } from './LightSubGroupCompareUtil';

/**
 * 装配体物理光源的IO处理类
 * 负责装配体物理光源的序列化和反序列化操作
 */
export declare class AsmPhysicalLight_IO extends PhysicalLight_IO {
  /**
   * 加载装配体物理光源数据
   * @param entity - 要加载数据的光源实体
   * @param data - 序列化的光源数据
   * @param options - 加载选项配置
   */
  load(entity: AsmPhysicalLight, data: unknown, options?: Record<string, unknown>): void;
}

/**
 * 光源渲染参数接口
 */
export interface RenderParameters {
  /** 是否为装配体光源 */
  isAssembly?: boolean;
  [key: string]: unknown;
}

/**
 * 光源组接口
 */
export interface LightGroup {
  /** 组交互模式 */
  groupInteractionMode?: boolean;
  /** 成员代理 */
  memberProxy: {
    type: string;
  };
  /** 成员属性配置 */
  memberPropertiesConfig?: unknown;
  /** 转换为扁平成员列表 */
  toFlatMemberList(): unknown[];
}

/**
 * 装配体物理光源实体类
 * 表示装配体级别的物理光源，继承自物理光源基类
 */
export declare class AsmPhysicalLight extends PhysicalLight {
  /** 光源类型，固定为装配体物理光源 */
  type: LightTypeEnum.AsmPhysicalLight;
  
  /** 光源所属的组 */
  group?: LightGroup;

  /**
   * 构造函数
   * @param name - 光源名称，默认为空字符串
   * @param parent - 父节点，可选
   */
  constructor(name?: string, parent?: unknown);

  /**
   * 创建新的装配体物理光源实例
   * @returns 重置后的光源实例
   */
  static create(): AsmPhysicalLight;

  /**
   * 重置光源属性为默认值
   */
  reset(): void;

  /**
   * 获取对应的IO处理器实例
   * @returns IO处理器单例
   */
  getIO(): AsmPhysicalLight_IO;

  /**
   * 从普通物理光源创建装配体物理光源
   * @param physicalLight - 源物理光源实例
   * @returns 新创建的装配体物理光源
   */
  static createFromPhysicalLight(physicalLight: PhysicalLight): AsmPhysicalLight;

  /**
   * 获取渲染参数
   * @returns 包含装配体标识的渲染参数
   */
  getRenderParameters(): RenderParameters;

  /**
   * 字段变更回调
   * 当光源属性发生变化时触发，自动同步组成员属性配置
   * @param fieldName - 变更的字段名
   * @param newValue - 新值
   * @param oldValue - 旧值
   */
  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void;
}

/**
 * 全局常量：装配体物理光源的模型类标识
 */
declare const HSConstants: {
  ModelClass: {
    NgAsmPhysicalLight: string;
  };
};

/**
 * 注册装配体物理光源类到实体系统
 */
Entity.registerClass(HSConstants.ModelClass.NgAsmPhysicalLight, AsmPhysicalLight);