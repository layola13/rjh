/**
 * Module: ParametricCurtain_IO
 * 参数化窗帘模块，提供窗帘实体的IO序列化和业务逻辑
 */

import { Entity } from './Entity';
import { ParametricContentBase_IO, ParametricContentBase } from './ParametricContentBase';

/**
 * 参数化窗帘IO类
 * 负责窗帘实体的序列化和反序列化操作
 * @extends ParametricContentBase_IO
 */
export declare class ParametricCurtain_IO extends ParametricContentBase_IO {
  /**
   * 获取单例实例
   * @returns ParametricCurtain_IO实例
   */
  static instance(): ParametricCurtain_IO;
}

/**
 * 参数化窗帘实体类
 * 表示三维场景中的窗帘对象，支持参数化配置
 * @extends ParametricContentBase
 */
export declare class ParametricCurtain extends ParametricContentBase {
  /**
   * 获取对应的IO处理器
   * @returns 窗帘实体的IO处理器实例
   */
  getIO(): ParametricCurtain_IO;
}

/**
 * 全局常量命名空间
 */
declare global {
  namespace HSConstants {
    enum ModelClass {
      /** 参数化窗帘模型类型标识 */
      ParametricCurtain = 'ParametricCurtain'
    }
  }
}