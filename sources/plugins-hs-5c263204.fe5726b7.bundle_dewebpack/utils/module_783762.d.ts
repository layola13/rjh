import type { Application } from './application';
import type { Canvas } from './canvas';
import type { CommandManager } from './command-manager';
import type { CameraControl } from './camera-control';
import type { Command } from './command';
import type { Floorplan } from './floorplan';
import type { Camera } from './camera';

declare namespace HSCore.Model {
  /**
   * 相机类型枚举
   */
  enum CameraTypeEnum {
    OrbitView = 'OrbitView',
    // 可根据实际扩展其他相机类型
  }
}

declare namespace HSFPConstants {
  /**
   * 命令类型常量
   */
  enum CommandType {
    MoveCamera3D = 'MoveCamera3D',
    // 可根据实际扩展其他命令类型
  }
}

declare namespace HSApp.View.Base {
  /**
   * Gizmo 基类
   */
  class Gizmo {
    protected context: GizmoContext;
    protected canvas: Canvas;
    protected active: boolean;
    protected signalHook: SignalHook;

    constructor(application: Application, canvas: Canvas);

    /**
     * 添加子 Gizmo
     */
    protected addChildGizmo(gizmo: any): void;

    /**
     * 显示 Gizmo
     */
    show(): void;

    /**
     * 隐藏 Gizmo
     */
    hide(): void;

    /**
     * 清理资源
     */
    onCleanup(): void;
  }
}

/**
 * Gizmo 上下文接口
 */
interface GizmoContext {
  application: Application;
}

/**
 * 信号钩子接口
 */
interface SignalHook {
  listen(signal: Signal<any>, handler: (data?: any) => void): this;
}

/**
 * 信号接口
 */
interface Signal<T = void> {
  // 信号基础定义
}

/**
 * 命令事件数据
 */
interface CommandEventData {
  cmd: Command;
}

/**
 * 3D 相机控制 Gizmo
 * 负责在 3D 视图中提供相机旋转控制界面
 */
declare class CameraControl3DGizmo extends HSApp.View.Base.Gizmo {
  /**
   * 相机控制器数组，包含四个方向的控制（0°, 180°, 90°, -90°）
   */
  private _cameraControls?: CameraControl[];

  /**
   * 构造函数
   * @param application - 应用程序实例
   * @param canvas - 画布实例
   * @param options - 可选配置参数
   */
  constructor(application: Application, canvas: Canvas, options?: any);

  /**
   * 清理资源，销毁所有相机控制器
   */
  onCleanup(): void;

  /**
   * 视图变化事件处理
   * 当视图切换或相机类型变化时调用
   * 非轨道视图时隐藏控制器
   */
  private _onViewChanged(): void;

  /**
   * 命令启动/恢复事件处理
   * @param event - 命令事件数据
   * 仅在 MoveCamera3D 命令且非轨道视图时显示控制器
   */
  private _onCmdStart(event: { data: CommandEventData }): void;

  /**
   * 命令暂停/终止事件处理
   * 根据当前视图状态决定是否显示控制器
   */
  private _onCmdEnd(): void;
}

/**
 * 默认导出的 3D 相机控制 Gizmo 类
 */
export default CameraControl3DGizmo;