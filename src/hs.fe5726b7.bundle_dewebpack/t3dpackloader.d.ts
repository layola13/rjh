/**
 * T3dPackLoader - 用于加载T3D格式模型包的加载器类
 * @module T3dPackLoader
 */

import { 
  App, 
  MeshLambertMaterial, 
  RasterizerCullMode, 
  MeshComponent,
  Node 
} from './t3d-engine';

/**
 * 线网格材质类型（需根据实际引擎定义）
 */
declare class LineMeshMaterial {
  constructor();
}

/**
 * 加载成功回调函数类型
 */
type LoadSuccessCallback = (model: LoadedModel) => void;

/**
 * 加载进度回调函数类型
 */
type LoadProgressCallback = (progress: number) => void;

/**
 * 加载失败回调函数类型
 */
type LoadErrorCallback = (error: Error) => void;

/**
 * 加载的模型数据结构
 */
interface LoadedModel {
  /** 模型的根节点 */
  mRootNode: Node;
}

/**
 * 资源加载选项
 */
interface LoadAssetOptions {
  /** 是否缓存资源包 */
  cachePack?: boolean;
}

/**
 * T3D模型包加载器
 * 负责加载和初始化T3D格式的3D模型资源
 */
export declare class T3dPackLoader {
  /**
   * 跨域请求设置
   * @private
   */
  private crossOrigin?: string;

  /**
   * 默认面材质缓存
   * @private
   */
  private _defaultFaceMaterial?: MeshLambertMaterial;

  /**
   * 默认线材质缓存
   * @private
   */
  private _defaultLineMaterial?: LineMeshMaterial;

  /**
   * 构造函数
   */
  constructor();

  /**
   * 设置跨域资源共享策略
   * @param crossOrigin - CORS设置值（如 "anonymous" 或 "use-credentials"）
   */
  setCrossOrigin(crossOrigin: string): void;

  /**
   * 获取默认的面材质（懒加载单例模式）
   * @returns 默认的Lambert材质实例
   * @private
   */
  private _getDefaultFaceMaterial(): MeshLambertMaterial;

  /**
   * 获取默认的线材质（懒加载单例模式）
   * @returns 默认的线网格材质实例
   * @private
   */
  private _getDefaultLineMaterial(): LineMeshMaterial;

  /**
   * 异步加载T3D模型包
   * @param url - 模型资源的URL路径
   * @param onSuccess - 加载成功时的回调函数
   * @param onProgress - 加载进度回调函数（可选）
   * @param onError - 加载失败时的回调函数（可选）
   */
  load(
    url: string,
    onSuccess: LoadSuccessCallback,
    onProgress?: LoadProgressCallback,
    onError?: LoadErrorCallback
  ): void;

  /**
   * 从完整路径中提取模型ID
   * @param path - 模型文件的完整路径
   * @returns 提取的模型ID（不含扩展名）
   * @example
   * _getModelId("assets/models/character.t3d") // returns "character"
   * @private
   */
  private _getModelId(path: string): string;
}