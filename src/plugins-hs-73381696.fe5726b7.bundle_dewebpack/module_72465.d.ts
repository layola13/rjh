/**
 * HSApp命令模块 - 3D标尺工具
 * @module MeasureGizmoCommand
 */

import { HSApp } from './518193';

/**
 * 鼠标事件数据接口
 */
interface MouseEventData {
  /** 鼠标X坐标 */
  x: number;
  /** 鼠标Y坐标 */
  y: number;
  /** 鼠标按钮状态 */
  button?: number;
  /** 其他事件数据 */
  [key: string]: unknown;
}

/**
 * 3D视图上下文接口
 */
interface View3DContext {
  /** Canvas显示层 */
  hscanvas: {
    displayLayers: {
      /** Gizmo图层 */
      gizmo: unknown;
    };
  };
}

/**
 * 3D视图接口
 */
interface View3D {
  /** 视图上下文 */
  context: View3DContext;
  /** Gizmo管理器 */
  gizmoManager: GizmoManager;
}

/**
 * Gizmo管理器接口
 */
interface GizmoManager {
  /**
   * 添加Gizmo到管理器
   * @param gizmo - 要添加的Gizmo实例
   */
  addGizmo(gizmo: HSApp.View.T3d.MeasureGizmo): void;
  
  /**
   * 从管理器移除Gizmo
   * @param gizmo - 要移除的Gizmo实例
   */
  removeGizmo(gizmo: HSApp.View.T3d.MeasureGizmo): void;
}

/**
 * HSApp应用程序接口
 */
interface HSAppInstance {
  /**
   * 获取当前激活的3D视图
   * @returns 3D视图实例
   */
  getActive3DView(): View3D;
}

/**
 * 3D测量Gizmo命令类
 * @description 提供3D场景中的测量工具功能，支持交互式测量操作
 * @extends HSApp.Cmd.Command
 */
declare class MeasureGizmoCommand extends HSApp.Cmd.Command {
  /**
   * HSApp应用程序实例
   * @private
   */
  private _app: HSAppInstance;

  /**
   * 3D测量Gizmo实例
   */
  public gizmo3d: HSApp.View.T3d.MeasureGizmo | undefined;

  /**
   * 构造函数
   * @param gizmo - 可选的Gizmo实例，如果不提供则在执行时创建
   */
  constructor(gizmo?: HSApp.View.T3d.MeasureGizmo);

  /**
   * 判断命令是否支持撤销/重做
   * @returns 始终返回false，表示此命令不支持撤销重做
   */
  canUndoRedo(): boolean;

  /**
   * 接收并处理事件
   * @param eventName - 事件名称（"click" | "mousemove" | 其他）
   * @param eventData - 事件数据
   * @returns 如果事件被处理则返回true，否则返回false
   */
  onReceive(eventName: string, eventData?: MouseEventData): boolean;

  /**
   * 执行命令
   * @description 创建或初始化3D测量Gizmo并添加到视图管理器
   */
  onExecute(): void;

  /**
   * 清理命令资源
   * @description 清理Gizmo并从管理器中移除
   */
  onCleanup(): void;

  /**
   * 获取命令描述
   * @returns 命令的中文描述："3d标尺"
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令所属的日志组类型（视图操作）
   */
  getCategory(): string;

  /**
   * 判断命令是否为交互式命令
   * @returns 始终返回true，表示此命令需要用户交互
   */
  isInteractive(): boolean;
}

/**
 * 默认导出的命令类
 */
export default MeasureGizmoCommand;

/**
 * HSFPConstants全局常量（假定存在于全局作用域）
 */
declare global {
  namespace HSFPConstants {
    /**
     * 日志组类型枚举
     */
    enum LogGroupTypes {
      /** 视图操作类型 */
      ViewOperation = 'ViewOperation'
    }
  }
}