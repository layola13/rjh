/**
 * 电力系统组件模块
 * @module PowerSysCompEnum
 */

import { Component } from './Component';

/**
 * 电力系统组件枚举
 * 定义电力系统相关的组件类型标识
 */
export enum PowerSysCompEnum {
  /** GB电力系统 */
  GBPowerSys = "GBPowerSys"
}

/**
 * 电力系统组件基类
 * 继承自通用组件类，提供电力系统相关的组件功能
 * @extends Component
 */
export class PowerSysComp extends Component {
  // 组件实现
}

/**
 * 类型声明文件
 */
declare module './PowerSysCompEnum' {
  /**
   * 电力系统组件枚举类型
   */
  export { PowerSysCompEnum };
  
  /**
   * 电力系统组件类
   */
  export { PowerSysComp };
}