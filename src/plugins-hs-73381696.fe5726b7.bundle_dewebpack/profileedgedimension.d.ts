/**
 * 轮廓边缘尺寸标注模块
 * 用于在SVG视图中显示和管理墙体边缘的尺寸标注
 */

import { HSCore } from 'hsw-core';
import { Dimension, InputBoxType } from './dimension';
import { Line2d } from './geometry';
import { SVGGizmo } from './svg-gizmo';

/**
 * 尺寸标注偏移长度常量
 */
export declare const dimOffsetLength: number;

/**
 * 边缘数据接口
 */
export interface EdgeData {
  /** 边缘曲线对象 */
  curve: {
    /** 获取起始点坐标 */
    getStartPt(): GeLib.Vector3;
    /** 获取结束点坐标 */
    getEndPt(): GeLib.Vector3;
  };
}

/**
 * 轮廓边缘实体接口
 */
export interface ProfileEdgeEntity extends HSCore.Model.Entity {
  /** 边缘起点 */
  from: GeLib.Vector3;
  /** 边缘终点 */
  to: GeLib.Vector3;
  /** 边缘长度 */
  length: number;
  /** 边缘数据 */
  edge: EdgeData;
}

/**
 * 尺寸标注配置选项
 */
export interface DimensionOptions {
  /** 标注类型 */
  type: InputBoxType;
}

/**
 * 尺寸标注样式配置
 */
export interface DimensionStyleOptions {
  /** 标注偏移距离 */
  offset: number;
  /** 是否按屏幕空间偏移 */
  offsetByScreen: boolean;
}

/**
 * 应用程序设置接口
 */
export interface AppSettings {
  /** 尺寸标注类型配置 */
  dimensionType: string;
}

/**
 * 应用程序上下文接口
 */
export interface ApplicationContext {
  /** 应用程序实例 */
  application: {
    /** 应用程序设置 */
    appSettings: AppSettings;
    /** 事务管理器 */
    transManager: {
      /** 撤销操作信号 */
      signalUndone: HSCore.Signal;
      /** 重做操作信号 */
      signalRedone: HSCore.Signal;
    };
    /** 视图激活信号 */
    signalViewActivated: HSCore.Signal<{ newView: unknown }>;
    /** 检查是否为活动视图 */
    isActiveView(canvas: unknown): boolean;
  };
}

/**
 * 信号数据接口
 */
export interface SignalFlagChangedData {
  /** 标志变化数据 */
  data: {
    /** 实体标志枚举值 */
    flag: HSCore.Model.EntityFlagEnum | HSCore.Model.WallFlagEnum;
  };
}

/**
 * 轮廓边缘尺寸标注类
 * 
 * 负责在SVG画布上显示和管理墙体边缘的尺寸标注，
 * 包括标注的位置计算、可见性控制和交互处理。
 * 
 * @extends {HSApp.View.SVG.Gizmo}
 * 
 * @example
 *