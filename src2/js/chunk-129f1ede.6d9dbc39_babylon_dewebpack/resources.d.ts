/**
 * 资源管理模块
 * 负责场景资源的加载、初始化和更新
 */

import { Scene, Vector3, MeshBuilder, StandardMaterial, Texture, TransformNode, Mesh, Angle } from '@babylonjs/core';
import { Room, LogoInfo } from './Room';
import { RoomUI } from './RoomUI';
import { Loader } from './Loader';

/**
 * Logo信息配置接口
 */
export interface ILogoInfoConfig {
  /** Logo尺寸 */
  size: Vector3;
  /** 初始位置 */
  pos: Vector3;
  /** 移动速度 */
  speed: Vector3;
  /** 最小边界 */
  min: Vector3;
  /** 最大边界 */
  max: Vector3;
}

/**
 * 三维场景容器接口
 */
export interface IThreeScene {
  /** Babylon场景实例 */
  scene: Scene;
}

/**
 * 资源管理类
 * 管理场景中的所有资源，包括房间、UI、加载器等
 */
export declare class Resources {
  /** Babylon场景实例 */
  scene: Scene;
  
  /** 三维场景容器 */
  threeScene: IThreeScene;
  
  /** 房间对象 */
  room: Room;
  
  /** 房间UI管理器 */
  ui: RoomUI;
  
  /** 资源加载器 */
  loader: Loader;
  
  /** Logo动画信息 */
  logoInfo?: LogoInfo;

  /**
   * 构造函数
   * @param resourceConfig - 资源配置参数
   * @param threeScene - 三维场景容器对象
   */
  constructor(resourceConfig: unknown, threeScene: IThreeScene);

  /**
   * 加载并初始化Logo模型
   * 创建一个带有纹理的盒子网格作为Logo，并设置其动画参数
   */
  LoadLogo(): void;

  /**
   * 加载并初始化信息面板
   * 创建一个显示信息的平面网格
   */
  LoadInfo(): void;

  /**
   * 更新循环
   * 每帧调用，用于更新Logo的位置动画
   */
  Update(): void;
}