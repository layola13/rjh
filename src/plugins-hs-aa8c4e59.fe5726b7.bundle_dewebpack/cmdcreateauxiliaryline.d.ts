/**
 * 模块：CmdCreateAuxiliaryLine
 * 原始模块ID: 708246
 * 导出：CmdCreateAuxiliaryLine - 创建辅助线命令类
 */

import { CreateAuxiliaryLineGizmo } from './CreateAuxiliaryLineGizmo';

/**
 * 命令执行上下文接口
 */
interface ICommandContext {
  app: IApplication;
}

/**
 * 应用程序接口
 */
interface IApplication {
  selectionManager: ISelectionManager;
  appSettings: IAppSettings;
  floorplan: IFloorplan;
  getActive2DView(): ICanvas2DView;
}

/**
 * 选择管理器接口
 */
interface ISelectionManager {
  unselectAll(): void;
}

/**
 * 应用设置接口
 */
interface IAppSettings {
  getViewItem(key: string): boolean;
  setViewItem(key: string, value: boolean): void;
}

/**
 * 户型图接口
 */
interface IFloorplan {
  scene: IScene;
}

/**
 * 场景接口
 */
interface IScene {
  activeLayer: ILayer;
}

/**
 * 图层接口
 */
interface ILayer {
  auxiliaryLines: Record<string, IAuxiliaryLineEntity>;
}

/**
 * 辅助线实体接口
 */
interface IAuxiliaryLineEntity {
  setFlagOff(flag: HSCore.Model.EntityFlagEnum): void;
  dirty(): void;
}

/**
 * 2D视图画布接口
 */
interface ICanvas2DView {
  gizmoManager: IGizmoManager;
  context: ICanvasContext;
  displayLayers: IDisplayLayers;
}

/**
 * Gizmo管理器接口
 */
interface IGizmoManager {
  addGizmo(gizmo: CreateAuxiliaryLineGizmo): void;
  removeGizmo(gizmo: CreateAuxiliaryLineGizmo): void;
}

/**
 * 画布上下文接口
 */
interface ICanvasContext {
  cursorStatus: ICursorStatus;
}

/**
 * 光标状态接口
 */
interface ICursorStatus {
  setCurrentStatus(cursor: string): void;
}

/**
 * 显示图层接口
 */
interface IDisplayLayers {
  temp: unknown;
}

/**
 * 鼠标事件接口
 */
interface IMouseEvent {
  type: 'mousedown' | 'mousemove' | 'mouseup' | 'click';
}

/**
 * 命令接收参数接口
 */
interface ICommandReceiveArgs {
  event: IMouseEvent;
}

/**
 * 命令日志参数接口
 */
interface ICommandLogParams {
  /** 活动区段 */
  activeSection: string;
  /** 活动区段名称 */
  activeSectionName: string;
  /** 点击率统计信息 */
  clicksRatio: {
    id: string;
    name: string;
  };
}

/**
 * 创建辅助线命令类
 * 用于进入辅助线绘制模式，允许用户在2D视图中绘制辅助线
 */
export declare class CmdCreateAuxiliaryLine extends HSApp.Cmd.Command {
  /** Gizmo交互控制器 */
  private _gizmo?: CreateAuxiliaryLineGizmo;
  
  /** 2D画布视图 */
  private _canvas?: ICanvas2DView;

  /**
   * 执行命令
   * 初始化辅助线绘制模式，创建Gizmo并设置光标样式
   */
  onExecute(): void;

  /**
   * 接收用户交互事件
   * @param eventType - 事件类型（mousedown/mousemove/click等）
   * @param args - 事件参数
   * @returns 是否继续传播事件（false表示事件已处理）
   */
  onReceive(eventType: string, args: ICommandReceiveArgs): boolean;

  /**
   * 清理命令资源
   * 移除Gizmo并恢复默认光标
   */
  onCleanup(): void;

  /**
   * 获取当前命令的日志参数
   * 用于统计和分析用户操作
   * @returns 命令日志参数
   */
  getCurrentParams(): ICommandLogParams;

  /**
   * 获取命令描述
   * @returns 命令的文字描述
   */
  getDescription(): string;

  /**
   * 判断命令是否为交互式命令
   * @returns false表示该命令需要持续的用户交互
   */
  isInteractive(): boolean;
}