/**
 * Babylon.js glTF 文件加载器类型定义
 * 支持 glTF 1.0 和 2.0 格式的 3D 模型加载
 */

import { Observable } from 'core/Misc/observable';
import { Scene } from 'core/scene';
import { AssetContainer } from 'core/assetContainer';
import { AbstractMesh } from 'core/Meshes/abstractMesh';
import { Skeleton } from 'core/Bones/skeleton';
import { AnimationGroup } from 'core/Animations/animationGroup';
import { ParticleSystem } from 'core/Particles/particleSystem';
import { Material } from 'core/Materials/material';
import { BaseTexture } from 'core/Materials/Textures/baseTexture';
import { Camera } from 'core/Cameras/camera';
import { Light } from 'core/Lights/light';
import { TransformNode } from 'core/Meshes/transformNode';
import { Geometry } from 'core/Meshes/geometry';
import { MorphTargetManager } from 'core/Morph/morphTargetManager';
import { ISceneLoaderPlugin, ISceneLoaderPluginAsync } from 'core/Loading/sceneLoader';

/**
 * glTF 加载器坐标系统模式
 */
export declare enum GLTFLoaderCoordinateSystemMode {
  /** 自动检测并转换坐标系统（默认） */
  AUTO = 0,
  /** 强制使用右手坐标系 */
  FORCE_RIGHT_HANDED = 1
}

/**
 * glTF 加载器动画启动模式
 */
export declare enum GLTFLoaderAnimationStartMode {
  /** 不自动播放动画 */
  NONE = 0,
  /** 仅播放第一个动画 */
  FIRST = 1,
  /** 播放所有动画 */
  ALL = 2
}

/**
 * glTF 加载器状态
 */
export declare enum GLTFLoaderState {
  /** 正在加载中 */
  LOADING = 0,
  /** 已就绪 */
  READY = 1,
  /** 加载完成 */
  COMPLETE = 2
}

/**
 * glTF 验证结果接口
 */
export interface IGLTFValidationResults {
  /** 验证是否通过 */
  valid: boolean;
  /** 错误信息列表 */
  errors?: string[];
  /** 警告信息列表 */
  warnings?: string[];
}

/**
 * glTF 数据接口
 */
export interface IGLTFLoaderData {
  /** 解析后的 JSON 对象 */
  json: Record<string, any>;
  /** 二进制数据（可选） */
  bin?: {
    readAsync(byteOffset: number, byteLength: number): Promise<Uint8Array>;
    byteLength: number;
  } | null;
}

/**
 * 加载进度事件接口
 */
export interface ISceneLoaderProgressEvent {
  /** 是否可计算总长度 */
  lengthComputable: boolean;
  /** 已加载字节数 */
  loaded: number;
  /** 总字节数 */
  total: number;
}

/**
 * 网格加载结果接口
 */
export interface IImportMeshResult {
  /** 加载的网格列表 */
  meshes: AbstractMesh[];
  /** 加载的粒子系统列表 */
  particleSystems: ParticleSystem[];
  /** 加载的骨骼列表 */
  skeletons: Skeleton[];
  /** 加载的动画组列表 */
  animationGroups: AnimationGroup[];
  /** 加载的变换节点列表 */
  transformNodes: TransformNode[];
  /** 加载的几何体列表 */
  geometries: Geometry[];
  /** 加载的灯光列表 */
  lights: Light[];
}

/**
 * Babylon.js glTF 文件加载器
 * 用于加载和解析 glTF/GLB 格式的 3D 模型文件
 */
export declare class GLTFFileLoader implements ISceneLoaderPluginAsync {
  /**
   * 是否启用增量加载（静态属性）
   * @default true
   */
  static IncrementalLoading: boolean;

  /**
   * 是否使用齐次坐标（静态属性）
   * @default false
   */
  static HomogeneousCoordinates: boolean;

  /** 加载器名称 */
  readonly name: string;

  /** 支持的文件扩展名 */
  readonly extensions: {
    '.gltf': { isBinary: false };
    '.glb': { isBinary: true };
  };

  // ==================== Observables ====================

  /** 当 glTF JSON 解析完成时触发 */
  onParsedObservable: Observable<IGLTFLoaderData>;

  /** 当网格加载完成时触发 */
  onMeshLoadedObservable: Observable<AbstractMesh>;

  /** 当皮肤加载完成时触发 */
  onSkinLoadedObservable: Observable<Skeleton>;

  /** 当纹理加载完成时触发 */
  onTextureLoadedObservable: Observable<BaseTexture>;

  /** 当材质加载完成时触发 */
  onMaterialLoadedObservable: Observable<Material>;

  /** 当相机加载完成时触发 */
  onCameraLoadedObservable: Observable<Camera>;

  /** 当所有资源加载完成时触发 */
  onCompleteObservable: Observable<void>;

  /** 当加载过程中发生错误时触发 */
  onErrorObservable: Observable<any>;

  /** 当加载器被释放时触发 */
  onDisposeObservable: Observable<void>;

  /** 当扩展加载完成时触发 */
  onExtensionLoadedObservable: Observable<any>;

  /** 当加载器状态改变时触发 */
  onLoaderStateChangedObservable: Observable<GLTFLoaderState>;

  /** 当验证完成时触发 */
  onValidatedObservable: Observable<IGLTFValidationResults>;

  // ==================== Callback Setters ====================

  /** 设置解析完成回调 */
  set onParsed(callback: (loaderData: IGLTFLoaderData) => void);

  /** 设置网格加载完成回调 */
  set onMeshLoaded(callback: (mesh: AbstractMesh) => void);

  /** 设置纹理加载完成回调 */
  set onTextureLoaded(callback: (texture: BaseTexture) => void);

  /** 设置材质加载完成回调 */
  set onMaterialLoaded(callback: (material: Material) => void);

  /** 设置相机加载完成回调 */
  set onCameraLoaded(callback: (camera: Camera) => void);

  /** 设置加载完成回调 */
  set onComplete(callback: () => void);

  /** 设置错误回调 */
  set onError(callback: (error: any) => void);

  /** 设置释放回调 */
  set onDispose(callback: () => void);

  /** 设置扩展加载完成回调 */
  set onExtensionLoaded(callback: (extension: any) => void);

  /** 设置验证完成回调 */
  set onValidated(callback: (results: IGLTFValidationResults) => void);

  // ==================== Configuration Properties ====================

  /**
   * 坐标系统模式
   * @default GLTFLoaderCoordinateSystemMode.AUTO
   */
  coordinateSystemMode: GLTFLoaderCoordinateSystemMode;

  /**
   * 动画启动模式
   * @default GLTFLoaderAnimationStartMode.FIRST
   */
  animationStartMode: GLTFLoaderAnimationStartMode;

  /**
   * 是否在加载时编译材质
   * @default false
   */
  compileMaterials: boolean;

  /**
   * 是否使用裁剪平面
   * @default false
   */
  useClipPlane: boolean;

  /**
   * 是否编译阴影生成器
   * @default false
   */
  compileShadowGenerators: boolean;

  /**
   * 是否将透明度作为覆盖度处理
   * @default false
   */
  transparencyAsCoverage: boolean;

  /**
   * 是否使用范围请求（HTTP Range）
   * @default false
   */
  useRangeRequests: boolean;

  /**
   * 是否创建网格实例
   * @default true
   */
  createInstances: boolean;

  /**
   * 是否始终计算包围盒
   * @default false
   */
  alwaysComputeBoundingBox: boolean;

  /**
   * 是否加载所有材质（包括未使用的）
   * @default false
   */
  loadAllMaterials: boolean;

  /**
   * 是否仅加载材质
   * @default false
   */
  loadOnlyMaterials: boolean;

  /**
   * 是否跳过材质加载
   * @default false
   */
  skipMaterials: boolean;

  /**
   * 是否使用 SRGB 缓冲区
   * @default true
   */
  useSRGBBuffers: boolean;

  /**
   * 目标帧率（用于增量加载）
   * @default 60
   */
  targetFps: number;

  /**
   * 是否始终计算骨骼根节点
   * @default false
   */
  alwaysComputeSkeletonRootNode: boolean;

  /**
   * 是否启用验证
   * @default false
   */
  validate: boolean;

  /**
   * 是否启用日志记录
   */
  loggingEnabled: boolean;

  /**
   * 是否捕获性能计数器
   */
  capturePerformanceCounters: boolean;

  /**
   * URL 预处理异步函数
   * 可用于修改资源 URL（如添加认证令牌）
   */
  preprocessUrlAsync: (url: string) => Promise<string>;

  // ==================== State Properties ====================

  /**
   * 当前加载器状态
   */
  readonly loaderState: GLTFLoaderState | null;

  // ==================== Core Methods ====================

  /**
   * 释放加载器资源
   */
  dispose(): void;

  /**
   * 加载文件
   * @param scene - Babylon 场景对象
   * @param fileOrUrl - 文件对象或 URL
   * @param onSuccess - 成功回调
   * @param onProgress - 进度回调
   * @param useArrayBuffer - 是否使用 ArrayBuffer
   * @param onError - 错误回调
   * @param name - 文件名
   */
  loadFile(
    scene: Scene,
    fileOrUrl: string | File,
    onSuccess: (data: IGLTFLoaderData) => void,
    onProgress?: (event: ISceneLoaderProgressEvent) => void,
    useArrayBuffer?: boolean,
    onError?: (request?: any, exception?: any) => void,
    name?: string
  ): any;

  /**
   * 异步导入网格
   * @param meshNames - 要导入的网格名称（null 表示全部）
   * @param scene - 目标场景
   * @param data - glTF 数据
   * @param rootUrl - 根 URL
   * @param onProgress - 进度回调
   * @param fileName - 文件名
   */
  importMeshAsync(
    meshNames: string | string[] | null,
    scene: Scene,
    data: IGLTFLoaderData,
    rootUrl: string,
    onProgress?: (event: ISceneLoaderProgressEvent) => void,
    fileName?: string
  ): Promise<IImportMeshResult>;

  /**
   * 异步加载场景
   * @param scene - 目标场景
   * @param data - glTF 数据
   * @param rootUrl - 根 URL
   * @param onProgress - 进度回调
   * @param fileName - 文件名
   */
  loadAsync(
    scene: Scene,
    data: IGLTFLoaderData,
    rootUrl: string,
    onProgress?: (event: ISceneLoaderProgressEvent) => void,
    fileName?: string
  ): Promise<void>;

  /**
   * 异步加载资源容器
   * @param scene - Babylon 场景
   * @param data - glTF 数据
   * @param rootUrl - 根 URL
   * @param onProgress - 进度回调
   * @param fileName - 文件名
   */
  loadAssetContainerAsync(
    scene: Scene,
    data: IGLTFLoaderData,
    rootUrl: string,
    onProgress?: (event: ISceneLoaderProgressEvent) => void,
    fileName?: string
  ): Promise<AssetContainer>;

  /**
   * 检查是否可以直接加载数据字符串
   * @param data - 数据字符串
   */
  canDirectLoad(data: string): boolean;

  /**
   * 直接加载数据字符串
   * @param scene - Babylon 场景
   * @param data - 数据字符串（JSON 或 Base64 编码的二进制）
   */
  directLoad(scene: Scene, data: string): Promise<IGLTFLoaderData>;

  /**
   * 创建加载器插件实例
   */
  createPlugin(): ISceneLoaderPluginAsync;

  /**
   * 返回当加载完成时解决的 Promise
   */
  whenCompleteAsync(): Promise<void>;
}