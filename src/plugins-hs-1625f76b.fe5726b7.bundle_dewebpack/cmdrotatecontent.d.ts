/**
 * 内容旋转命令模块
 * 提供对3D内容对象的旋转操作功能
 */

import { HSApp } from './types/HSApp';
import { HSConstants } from './types/HSConstants';
import { HSFPConstants } from './types/HSFPConstants';
import { HSCatalog } from './types/HSCatalog';
import { HSCore } from './types/HSCore';
import * as THREE from 'three';

/**
 * 3D坐标点接口
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 旋转平面类型
 */
type RotationPlane = 'xy' | 'yz' | 'xz';

/**
 * 角度吸附配置接口
 */
interface AngleSnapConfig {
  /** 目标角度 */
  angle: number;
  /** 吸附偏移量 */
  offset: number;
  /** 吸附标记角度 */
  mark: number;
}

/**
 * 拖拽事件数据接口
 */
interface DragEventData {
  /** 角度增量 */
  delta?: number;
  /** 角度值 */
  value?: number;
  /** 原生事件对象 */
  event?: MouseEvent | KeyboardEvent;
  /** 预览标题 */
  title?: string;
}

/**
 * 内容对象接口
 */
interface IContent {
  /** X轴坐标 */
  x: number;
  /** Y轴坐标 */
  y: number;
  /** Z轴坐标 */
  z: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
  /** 对象类型 */
  Class: string;
  /** 内容类型 */
  contentType?: IContentType;
  /** 是否为模拟状态 */
  isSimulated?: boolean;
  /** 检查对象类型 */
  instanceOf(className: string): boolean;
  /** 转换为扁平成员列表 */
  toFlatMemberList?(): IContent[];
}

/**
 * 内容类型接口
 */
interface IContentType {
  /** 检查是否为指定类型 */
  isTypeOf(typeEnum: string): boolean;
}

/**
 * 迷你图像预览控制器接口
 */
interface IMiniImagePreviewCtrl {
  /** 预览标题 */
  title: string;
  /** 初始化 */
  init(): void;
  /** 渲染预览 */
  render(position: { x: number; y: number }): void;
  /** 销毁控制器 */
  destroy(): void;
}

/**
 * 事件类型
 */
type CommandEventType = 
  | 'sliderdragend'
  | 'hotkeyend'
  | 'dragmove'
  | 'hotkey'
  | 'sliderdragmove'
  | 'dragend'
  | 'reset';

/**
 * 内容旋转命令类
 * 用于在3D场景中旋转内容对象，支持多种旋转平面和吸附功能
 */
export declare class CmdRotateContent extends HSApp.Cmd.Command {
  /**
   * 要旋转的内容对象
   */
  content: IContent | undefined;

  /**
   * 旋转基准点（内容对象的原始位置）
   */
  basePoint: Point3D | undefined;

  /**
   * 上次目标旋转角度
   */
  lastTargetingAngle: number | undefined;

  /**
   * 原始旋转角度 [X, Y, Z]
   */
  originalAngle: number[];

  /**
   * 是否启用角度吸附功能
   */
  snapEnabled: boolean | undefined;

  /**
   * 旋转所在平面
   */
  plane: RotationPlane | undefined;

  /**
   * 当前旋转角度 [X, Y, Z]
   */
  private _rotation: number[] | undefined;

  /**
   * 迷你图像预览控制器
   */
  private miniImagePreviewCtrl: IMiniImagePreviewCtrl | null | undefined;

  /**
   * 构造函数
   * @param content - 要旋转的内容对象，如果未提供则使用当前选中对象
   * @param plane - 旋转平面，可选值：'xy'、'yz'、'xz'
   * @param snapEnabled - 是否启用角度吸附，默认为 true
   */
  constructor(content?: IContent, plane?: RotationPlane, snapEnabled?: boolean);

  /**
   * 命令执行时调用
   * 初始化旋转参数并保存原始状态
   * @param event - 事件数据
   */
  onExecute(event?: DragEventData): void;

  /**
   * 命令清理时调用
   * 销毁预览控制器等资源
   */
  onCleanup(): void;

  /**
   * 接收事件处理
   * 根据不同事件类型执行相应的旋转操作
   * @param eventType - 事件类型
   * @param eventData - 事件数据
   * @returns 处理结果
   */
  onReceive(eventType: CommandEventType, eventData: DragEventData): Promise<boolean>;

  /**
   * 处理旋转请求
   * 提交旋转事务到事务管理器
   * @param isCustomModel - 是否为自定义模型
   */
  private dealRotateRequest(isCustomModel?: boolean): Promise<void>;

  /**
   * 销毁迷你图像预览
   */
  private destroyMiniImagePreview(): void;

  /**
   * 检查内容是否支持图像预览
   * @param content - 内容对象
   * @returns 是否支持预览
   */
  private isSupportImagePreview(content: IContent): boolean;

  /**
   * 渲染迷你图像预览
   * @param eventData - 事件数据，包含鼠标位置和标题
   * @returns 是否成功渲染
   */
  private renderMiniImagePreview(eventData: DragEventData): boolean;

  /**
   * 是否可以撤销/重做
   * @returns 始终返回 false
   */
  canUndoRedo(): boolean;

  /**
   * 绕世界坐标轴旋转内容
   * @param axis - 旋转轴向量
   * @param angle - 旋转角度（度）
   */
  private rotateAroundWorldAxis(axis: THREE.Vector3, angle: number): void;

  /**
   * 获取命令描述
   * @returns 命令描述文本
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令分类类型
   */
  getCategory(): string;
}