/**
 * Babylon.js Procedural Textures Library
 * 程序纹理生成库 - 提供多种程序化纹理生成能力
 */

declare module "babylonjs-procedural-textures" {
  import { Scene, ProceduralTexture, Color3, Color4, Vector2, Texture } from "@babylonjs/core";

  /**
   * 砖墙纹理生成器
   * 生成逼真的砖墙程序纹理
   */
  export class BrickProceduralTexture extends ProceduralTexture {
    /**
     * @param name - 纹理名称
     * @param size - 纹理尺寸（像素）
     * @param scene - 场景对象
     * @param fallbackTexture - 降级纹理
     * @param generateMipMaps - 是否生成Mip贴图
     */
    constructor(
      name: string,
      size: number,
      scene: Scene | null,
      fallbackTexture?: Texture,
      generateMipMaps?: boolean
    );

    /** 砖墙高度方向的砖块数量 */
    numberOfBricksHeight: number;

    /** 砖墙宽度方向的砖块数量 */
    numberOfBricksWidth: number;

    /** 砖块颜色 */
    brickColor: Color3;

    /** 砖缝颜色 */
    jointColor: Color3;

    /** 更新着色器uniform变量 */
    updateShaderUniforms(): void;

    /** 序列化为JSON对象 */
    serialize(): Record<string, unknown>;

    /** 从JSON对象解析 */
    static Parse(parsedTexture: unknown, scene: Scene, rootUrl: string): BrickProceduralTexture;
  }

  /**
   * 云层纹理生成器
   * 生成动态云层效果
   */
  export class CloudProceduralTexture extends ProceduralTexture {
    constructor(
      name: string,
      size: number,
      scene: Scene | null,
      fallbackTexture?: Texture,
      generateMipMaps?: boolean
    );

    /** 天空颜色（RGBA） */
    skyColor: Color4;

    /** 云层颜色（RGBA） */
    cloudColor: Color4;

    /** 噪声振幅 */
    amplitude: number;

    /** 噪声倍频数（细节层级） */
    numOctaves: number;

    updateShaderUniforms(): void;
    serialize(): Record<string, unknown>;
    static Parse(parsedTexture: unknown, scene: Scene, rootUrl: string): CloudProceduralTexture;
  }

  /**
   * 火焰纹理生成器
   * 生成动画火焰效果
   */
  export class FireProceduralTexture extends ProceduralTexture {
    constructor(
      name: string,
      size: number,
      scene: Scene | null,
      fallbackTexture?: Texture,
      generateMipMaps?: boolean
    );

    /** 预设：紫色火焰颜色配置 */
    static readonly PurpleFireColors: Color3[];

    /** 预设：绿色火焰颜色配置 */
    static readonly GreenFireColors: Color3[];

    /** 预设：红色火焰颜色配置 */
    static readonly RedFireColors: Color3[];

    /** 预设：蓝色火焰颜色配置 */
    static readonly BlueFireColors: Color3[];

    /** 是否自动更新时间参数 */
    autoGenerateTime: boolean;

    /** 火焰颜色数组（6个颜色） */
    fireColors: Color3[];

    /** 时间参数（控制动画） */
    time: number;

    /** 火焰运动速度 */
    speed: Vector2;

    /** Alpha透明度阈值 */
    alphaThreshold: number;

    updateShaderUniforms(): void;
    render(useCameraPostProcess?: boolean): void;
    serialize(): Record<string, unknown>;
    static Parse(parsedTexture: unknown, scene: Scene, rootUrl: string): FireProceduralTexture;
  }

  /**
   * 草地纹理生成器
   * 生成自然草地表面
   */
  export class GrassProceduralTexture extends ProceduralTexture {
    constructor(
      name: string,
      size: number,
      scene: Scene | null,
      fallbackTexture?: Texture,
      generateMipMaps?: boolean
    );

    /** 草地颜色数组（3种草色） */
    grassColors: Color3[];

    /** 地面底色 */
    groundColor: Color3;

    updateShaderUniforms(): void;
    serialize(): Record<string, unknown>;
    static Parse(parsedTexture: unknown, scene: Scene, rootUrl: string): GrassProceduralTexture;
  }

  /**
   * 大理石纹理生成器
   * 生成大理石材质效果
   */
  export class MarbleProceduralTexture extends ProceduralTexture {
    constructor(
      name: string,
      size: number,
      scene: Scene | null,
      fallbackTexture?: Texture,
      generateMipMaps?: boolean
    );

    /** 高度方向的瓷砖数量 */
    numberOfTilesHeight: number;

    /** 宽度方向的瓷砖数量 */
    numberOfTilesWidth: number;

    /** 纹理振幅（控制条纹强度） */
    amplitude: number;

    /** 接缝颜色 */
    jointColor: Color3;

    updateShaderUniforms(): void;
    serialize(): Record<string, unknown>;
    static Parse(parsedTexture: unknown, scene: Scene, rootUrl: string): MarbleProceduralTexture;
  }

  /**
   * 法线贴图生成器
   * 从基础纹理生成法线贴图
   */
  export class NormalMapProceduralTexture extends ProceduralTexture {
    constructor(
      name: string,
      size: number,
      scene: Scene | null,
      fallbackTexture?: Texture,
      generateMipMaps?: boolean
    );

    /** 源纹理（用于计算法线） */
    baseTexture: Texture;

    updateShaderUniforms(): void;
    isReady(): boolean;
    serialize(): Record<string, unknown>;
    static Parse(parsedTexture: unknown, scene: Scene, rootUrl: string): NormalMapProceduralTexture;
  }

  /**
   * Perlin噪声纹理生成器
   * 生成Perlin噪声和Worley噪声混合效果
   */
  export class PerlinNoiseProceduralTexture extends ProceduralTexture {
    constructor(
      name: string,
      size: number,
      scene: Scene | null,
      fallbackTexture?: Texture,
      generateMipMaps?: boolean
    );

    /** 时间参数 */
    time: number;

    /** 时间缩放系数 */
    timeScale: number;

    /** 平移速度 */
    translationSpeed: number;

    updateShaderUniforms(): void;
    render(useCameraPostProcess?: boolean): void;
    serialize(): Record<string, unknown>;
    static Parse(parsedTexture: unknown, scene: Scene, rootUrl: string): PerlinNoiseProceduralTexture;
  }

  /**
   * 道路纹理生成器
   * 生成道路路面材质
   */
  export class RoadProceduralTexture extends ProceduralTexture {
    constructor(
      name: string,
      size: number,
      scene: Scene | null,
      fallbackTexture?: Texture,
      generateMipMaps?: boolean
    );

    /** 道路颜色 */
    roadColor: Color3;

    updateShaderUniforms(): void;
    serialize(): Record<string, unknown>;
    static Parse(parsedTexture: unknown, scene: Scene, rootUrl: string): RoadProceduralTexture;
  }

  /**
   * 星空纹理生成器
   * 生成体积星空效果
   */
  export class StarfieldProceduralTexture extends ProceduralTexture {
    constructor(
      name: string,
      size: number,
      scene: Scene | null,
      fallbackTexture?: Texture,
      generateMipMaps?: boolean
    );

    /** 时间参数 */
    time: number;

    /** 旋转角度Alpha */
    alpha: number;

    /** 旋转角度Beta */
    beta: number;

    /** 缩放级别 */
    zoom: number;

    /** 形状参数 */
    formuparam: number;

    /** 步进大小 */
    stepsize: number;

    /** 平铺系数 */
    tile: number;

    /** 亮度 */
    brightness: number;

    /** 暗物质密度 */
    darkmatter: number;

    /** 距离衰减 */
    distfading: number;

    /** 饱和度 */
    saturation: number;

    updateShaderUniforms(): void;
    serialize(): Record<string, unknown>;
    static Parse(parsedTexture: unknown, scene: Scene, rootUrl: string): StarfieldProceduralTexture;
  }

  /**
   * 木纹纹理生成器
   * 生成自然木纹效果
   */
  export class WoodProceduralTexture extends ProceduralTexture {
    constructor(
      name: string,
      size: number,
      scene: Scene | null,
      fallbackTexture?: Texture,
      generateMipMaps?: boolean
    );

    /** 振幅缩放（控制纹理密度） */
    ampScale: number;

    /** 木材颜色 */
    woodColor: Color3;

    updateShaderUniforms(): void;
    serialize(): Record<string, unknown>;
    static Parse(parsedTexture: unknown, scene: Scene, rootUrl: string): WoodProceduralTexture;
  }
}