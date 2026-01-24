/**
 * 相机命令模块
 * 用于处理2D视图中的相机控制和动画
 */

/**
 * 相机配置接口
 * 定义相机的基本属性和状态
 */
interface ICamera {
  /** 相机X坐标 */
  x: number;
  /** 相机Y坐标 */
  y: number;
  /** 目标点X坐标 */
  target_x: number;
  /** 目标点Y坐标 */
  target_y: number;
  /** 近裁剪平面距离 (0-1范围) */
  near: number;
  /** 是否启用裁剪 */
  clip: boolean;
}

/**
 * 视图盒子接口
 * 定义视图的可见区域
 */
interface IViewBox {
  /** 视图盒子左上角X坐标 */
  x: number;
  /** 视图盒子左上角Y坐标 */
  y: number;
  /** 视图盒子宽度 */
  width: number;
  /** 视图盒子高度 */
  height: number;
}

/**
 * 画布坐标点接口
 */
interface ICanvasPoint {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 命令接收消息接口
 */
interface ICommandMessage {
  /** 消息值,可以是任意类型 */
  value: any;
}

/**
 * 相机命令类
 * 继承自HSApp.Cmd.Command,用于执行相机相关操作
 * 
 * @example
 *