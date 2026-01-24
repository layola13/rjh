/**
 * 地洞旋转操作请求类
 * 处理地洞对象围绕Z轴旋转的交互逻辑
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import * as THREE from 'three';

/**
 * 地洞对象接口
 */
interface IHole {
  /** Z轴旋转角度 */
  ZRotation: number;
  /** 重建地洞模型 */
  build(): void;
}

/**
 * 接收消息的数据结构
 */
interface IReceiveData {
  /** 角度变化量 */
  delta?: number;
  /** 偏移量 */
  offset?: number;
}

/**
 * 角度吸附配置
 */
interface IAngleSnapOptions {
  /** 当前角度 */
  angle: number;
  /** 吸附偏移阈值 */
  offset: number;
  /** 吸附标记角度 */
  mark: number;
}

/**
 * 消息类型
 */
type MessageType =
  | 'mouseup'
  | 'sliderdragend'
  | 'hotkeyend'
  | 'sliderdragmove'
  | 'dragmove'
  | 'hotkey';

/**
 * 地洞旋转请求类
 * 继承自状态请求基类，实现地洞对象的旋转操作
 */
export declare class RotateHoleRequest extends HSCore.Transaction.Common.StateRequest {
  /** 操作的地洞对象 */
  hole: IHole;

  /** 原始Z轴旋转角度（操作前） */
  originalZAngle: number;

  /** 上一次的Z轴旋转角度 */
  lastZAngle: number;

  /**
   * 构造函数
   * @param hole - 需要旋转的地洞对象
   */
  constructor(hole: IHole);

  /**
   * 提交操作时调用
   * 重建地洞模型并调用父类提交逻辑
   */
  onCommit(): void;

  /**
   * 接收用户交互消息
   * @param messageType - 消息类型（鼠标、滑块、热键等）
   * @param data - 消息携带的数据
   * @returns 是否成功处理消息
   */
  onReceive(messageType: MessageType, data: IReceiveData): boolean;

  /**
   * 围绕世界坐标系的指定轴旋转地洞
   * @param axis - 旋转轴向量
   * @param angle - 旋转角度（度）
   */
  rotateAroundWorldAxis(axis: THREE.Vector3, angle: number): void;

  /**
   * 是否可以进行事务字段操作
   * @returns 始终返回true
   */
  canTransactField(): boolean;

  /**
   * 获取操作描述
   * @returns 操作的中文描述
   */
  getDescription(): string;

  /**
   * 获取操作分类
   * @returns 日志分组类型（内容操作）
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}