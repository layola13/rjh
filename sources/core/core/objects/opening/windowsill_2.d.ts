/**
 * 窗台模块
 * 提供窗台实体的类型定义、序列化接口和核心实体类
 */

import type { ExtrudedBody, ExtrudedBody_IO } from './ExtrudedBody';
import type { Vector3 } from 'three';

/**
 * 窗台侧面类型枚举
 * 定义窗台安装的位置
 */
export enum WindowSillSideType {
  /** 内侧窗台 */
  INNER = 'inner',
  /** 外侧窗台 */
  OUTER = 'outer',
  /** 双侧窗台 */
  DOUBLE = 'double'
}

/**
 * 窗台参数接口
 * 描述窗台实体的所有参数
 */
interface WindowSillParameters {
  /** 挤出方向向量 */
  direction?: Vector3;
  /** 截面轮廓点集 */
  points?: Vector3[];
  /** 线脚索引数组，指定哪些边需要应用线脚 */
  moldingIndices?: number[];
  /** 线脚是否翻转 */
  moldingFlip?: boolean;
  /** 窗台侧面类型 */
  side?: WindowSillSideType;
  /** 内侧延伸值 */
  extendValue?: number;
  /** 外侧延伸值 */
  secondExtendValue?: number;
}

/**
 * 窗台序列化IO类
 * 负责窗台实体的序列化和反序列化
 */
export declare class WindowSill_IO extends ExtrudedBody_IO {
  /**
   * 获取单例实例
   * @returns WindowSill_IO实例
   */
  static instance(): WindowSill_IO;
}

/**
 * 窗台实体类
 * 继承自ExtrudedBody，表示参数化窗台构件
 */
export declare class WindowSill extends ExtrudedBody {
  /** 
   * 窗台参数
   * @decorator EntityField
   */
  parameters: WindowSillParameters;

  /**
   * 构造函数
   * @param id - 实体唯一标识符，默认为空字符串
   * @param params - 初始化参数
   */
  constructor(id?: string, params?: WindowSillParameters);

  /**
   * 通过参数初始化窗台
   * @param params - 窗台参数对象
   */
  initByParameters(params: WindowSillParameters): void;

  /**
   * 获取窗台侧面类型
   * @returns 窗台侧面类型，默认为INNER
   */
  get side(): WindowSillSideType;

  /**
   * 获取内侧延伸距离
   * @returns 内侧延伸值，默认为0
   */
  get innerExtend(): number;

  /**
   * 获取外侧延伸距离
   * @returns 外侧延伸值，默认为0
   */
  get outerExtend(): number;

  /**
   * 获取IO序列化实例
   * @returns WindowSill_IO实例
   */
  getIO(): WindowSill_IO;

  /**
   * 添加捕捉面键
   * @param key - 捕捉面标识符
   * @protected
   */
  protected addSnappingFaceKey(key: string): void;
}