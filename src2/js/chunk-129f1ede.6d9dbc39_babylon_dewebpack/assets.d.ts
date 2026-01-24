/**
 * 资产管理模块
 * 包含场景资产、房间模型、Logo信息等相关类型定义
 */

import { Scene, TransformNode, Color3, ShaderMaterial, Vector2, Vector3, Texture, PBRMaterial, VideoTexture, Mesh } from '@babylonjs/core';

/**
 * 资产基类
 * 用于管理和加载场景中的各类资产
 */
export declare class Assets {
  constructor();
}

/**
 * 资产项
 * 表示场景中的单个资产对象
 */
export declare class AssetItem {
  constructor();
}

/**
 * 纹理资产项
 * 包含纹理名称和纹理对象
 */
export interface TextureAsset {
  /** 纹理名称标识符 */
  name: string;
  /** Babylon.js 纹理对象 */
  texture: Texture;
}

/**
 * 房间场景类
 * 管理3D房间场景的模型、材质、光照和纹理
 */
export declare class Room {
  /** Babylon.js 场景实例 */
  readonly scene: Scene;
  
  /** 房间模型使用的纹理数组 */
  roomModelTextures: Texture[];
  
  /** 场景中所有纹理资产 */
  textures: TextureAsset[];
  
  /** 场景根节点变换 */
  root: TransformNode;
  
  /** 房间模型根节点 */
  roomModel?: TransformNode;
  
  /** 椅子模型根节点 */
  chairModel?: TransformNode;
  
  /** 咖啡模型根节点 */
  coffeeModel?: TransformNode;
  
  /** Mac电脑模型根节点 */
  macModel?: TransformNode;
  
  /** PC显示器模型根节点 */
  pcModel?: TransformNode;
  
  /** 房间材质 */
  mat_room?: ShaderMaterial;
  
  /** 咖啡蒸汽材质 */
  mat_coffee?: ShaderMaterial;
  
  /** Mac屏幕纹理 */
  macTexture?: Texture;
  
  /** PC屏幕视频纹理 */
  pcTexture?: VideoTexture;
  
  /** 咖啡颜色 */
  coffeeColor: Color3;
  
  /** 时间频率系数 */
  uTimeFrequency: number;
  
  /** UV频率X轴分量 */
  x: number;
  
  /** UV频率Y轴分量 */
  y: number;
  
  private _uNightMix: number;
  private _uNeutralMix: number;
  private _uLightTvColor: Color3;
  private _uLightTvStrength: number;
  private _uLightDeskColor: Color3;
  private _uLightDeskStrength: number;
  private _uLightPcColor: Color3;
  private _uLightPcStrength: number;
  
  /**
   * 构造函数
   * @param scene - Babylon.js 场景实例
   */
  constructor(scene: Scene);
  
  /**
   * 夜晚模式混合系数 (0-1)
   * 控制白天和夜晚烘焙纹理的混合程度
   */
  get uNightMix(): number;
  set uNightMix(value: number);
  
  /**
   * 中性光照混合系数 (0-1)
   * 控制中性光照纹理的混合强度
   */
  get uNeutralMix(): number;
  set uNeutralMix(value: number);
  
  /**
   * 电视光源颜色
   * RGB颜色值，影响电视发出的光照颜色
   */
  get uLightTvColor(): Color3;
  set uLightTvColor(value: Color3);
  
  /**
   * 电视光源强度
   * 数值越大光照越强
   */
  get uLightTvStrength(): number;
  set uLightTvStrength(value: number);
  
  /**
   * 台灯光源颜色
   * RGB颜色值，影响台灯发出的光照颜色
   */
  get uLightDeskColor(): Color3;
  set uLightDeskColor(value: Color3);
  
  /**
   * 台灯光源强度
   * 数值越大光照越强
   */
  get uLightDeskStrength(): number;
  set uLightDeskStrength(value: number);
  
  /**
   * 电脑显示器光源颜色
   * RGB颜色值，影响显示器发出的光照颜色
   */
  get uLightPcColor(): Color3;
  set uLightPcColor(value: Color3);
  
  /**
   * 电脑显示器光源强度
   * 数值越大光照越强
   */
  get uLightPcStrength(): number;
  set uLightPcStrength(value: number);
  
  /**
   * 加载房间着色器
   * 从远程服务器获取顶点和片段着色器代码，创建并配置房间材质
   * @returns Promise，加载完成后resolve
   */
  DoLoadShaderRoom(): Promise<void>;
  
  /**
   * 加载咖啡蒸汽着色器
   * 从远程服务器获取着色器代码，创建并配置咖啡蒸汽动画材质
   * @returns Promise，加载完成后resolve
   */
  DoLoadShaderCoffeeSteam(): Promise<void>;
  
  /**
   * 更新材质参数
   * 将当前光照和混合参数同步到着色器材质
   */
  Update(): void;
  
  /**
   * 加载Mac屏幕纹理
   * 将纹理应用到Mac模型的材质上
   */
  DoLoadMacTexture(): void;
  
  /**
   * 加载PC屏幕视频纹理
   * 将视频纹理应用到PC显示器模型的材质上
   */
  DoLoadVideoTexture(): void;
}

/**
 * Logo信息配置接口
 * 用于定义Logo的位置、尺寸、运动参数等
 */
export interface LogoInfoOptions {
  /** Logo尺寸向量 */
  size?: Vector3;
  /** Logo位置向量 */
  pos?: Vector3;
  /** Logo移动速度向量 */
  speed?: Vector3;
  /** Logo移动范围最小边界 */
  min?: Vector3;
  /** Logo移动范围最大边界 */
  max?: Vector3;
}

/**
 * Logo信息类
 * 存储和管理Logo的空间属性和运动参数
 */
export declare class LogoInfo {
  /** Logo的三维尺寸 */
  size: Vector3;
  
  /** Logo的三维位置坐标 */
  pos: Vector3;
  
  /** Logo的移动速度（每轴分量） */
  speed: Vector3;
  
  /** Logo移动的最小边界约束 */
  min: Vector3;
  
  /** Logo移动的最大边界约束 */
  max: Vector3;
  
  /**
   * 构造函数
   * @param options - Logo配置选项，所有参数可选
   */
  constructor(options?: LogoInfoOptions);
}