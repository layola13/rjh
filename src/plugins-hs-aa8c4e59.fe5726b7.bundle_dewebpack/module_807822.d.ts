/**
 * 相机位置动画命令模块
 * 
 * 该模块实现了相机平滑移动到目标位置的命令，支持以下特性：
 * - 相机位置的平滑过渡动画
 * - 第一人称视角的目标点同步移动
 * - 基于时间的插值计算
 */

/**
 * 相机实例接口
 * 定义了相机的位置、目标点和类型信息
 */
interface ICamera {
  /** 相机X坐标 */
  x: number;
  /** 相机Y坐标 */
  y: number;
  /** 相机目标点X坐标（用于第一人称视角） */
  target_x: number;
  /** 相机目标点Y坐标（用于第一人称视角） */
  target_y: number;
  /** 相机类型 */
  type: HSCore.Model.CameraTypeEnum;
}

/**
 * 2D坐标点接口
 */
interface IPosition {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 命令执行参数接口
 * 支持两种移动模式：
 * 1. 直接移动到指定位置 (x, y)
 * 2. 移动到指定目标点 (target_x, target_y)
 */
interface ICameraMoveCommandParams {
  /** 目标X坐标 */
  x?: number;
  /** 目标Y坐标 */
  y?: number;
  /** 目标点X坐标 */
  target_x?: number;
  /** 目标点Y坐标 */
  target_y?: number;
}

/**
 * 命令管理器接口
 */
interface ICommandManager {
  /** 标记命令完成 */
  complete(command: ICameraMoveCommand): void;
}

/**
 * 相机移动命令类
 * 
 * 实现相机从当前位置平滑移动到目标位置的动画效果。
 * 继承自HSApp.Cmd.Command基类，可以被命令系统管理和执行。
 * 
 * @extends HSApp.Cmd.Command
 * 
 * @example
 *