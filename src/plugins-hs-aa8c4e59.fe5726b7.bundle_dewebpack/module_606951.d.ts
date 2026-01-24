/**
 * 相机类型枚举
 * 定义了相机的两种视角模式
 */
declare enum CameraTypeEnum {
  /** 第一人称视角 */
  FirstPerson = 'FirstPerson',
  /** 轨道视角（环绕视角） */
  OrbitView = 'OrbitView'
}

/**
 * 相机模型接口
 * 定义相机的所有属性
 */
interface ICamera {
  /** 相机类型 */
  type: CameraTypeEnum;
  /** 相机X坐标 */
  x: number;
  /** 相机Y坐标 */
  y: number;
  /** 相机Z坐标（高度） */
  z: number;
  /** 目标点X坐标 */
  target_x: number;
  /** 目标点Y坐标 */
  target_y: number;
  /** 目标点Z坐标（高度），可选 */
  target_z?: number;
  /** 水平视场角（度数） */
  horizontal_fov: number;
  /** 俯仰角（度数） */
  pitch: number;
}

/**
 * 相机常量配置接口
 */
interface ICameraConstants {
  /** 第一人称相机高度 */
  FIRSTPERSON_CAMERA_HEIGHT: number;
  /** 第一人称相机水平视场角 */
  FIRSTPERSON_CAMERA_HORIZONTAL_FOV: number;
  /** 第一人称相机目标点X偏移 */
  FIRSTPERSON_CAMERA_TARGET_X: number;
  /** 第一人称相机目标点Y偏移 */
  FIRSTPERSON_CAMERA_TARGET_Y: number;
  /** 轨道视角相机高度 */
  ORBITVIEW_CAMERA_HEIGHT: number;
  /** 轨道视角相机水平视场角 */
  ORBITVIEW_CAMERA_HORIZONTAL_FOV: number;
  /** 轨道视角相机目标点X坐标 */
  ORBITVIEW_CAMERA_TARGET_X: number;
  /** 轨道视角相机目标点Y坐标 */
  ORBITVIEW_CAMERA_TARGET_Y: number;
  /** 轨道视角相机目标点高度 */
  ORBITVIEW_CAMERA_TARGETPOINT_HEIGHT: number;
}

/**
 * 命令基类
 * 所有命令都需要继承此类
 */
declare abstract class Command {
  /**
   * 执行命令的抽象方法
   */
  abstract onExecute(): void;

  /**
   * 判断命令是否为瞬态（不会被保存到历史记录）
   * @returns 如果为瞬态命令返回true
   */
  abstract isTransient(): boolean;
}

/**
 * 相机更新命令类
 * 根据相机类型自动调整相机参数和目标点位置
 * 
 * @extends Command
 * @example
 *