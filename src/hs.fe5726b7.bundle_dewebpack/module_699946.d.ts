/**
 * T3D OBJ 文件加载器
 * 用于加载和解析 Wavefront OBJ 格式的 3D 模型文件
 */

import { App, Prefab, Node, Mesh, MeshComponent, Pass, ERenderPrimitiveGroup, RasterizerFillMode, RasterizerCullMode, MeshLambertMaterial, LineMeshMaterial, DefaultMaterialType } from './path-to-module-367441';
import { Three2T3d } from './path-to-module-305566';

/**
 * 支持的渲染图元组
 * 包含不透明和半透明的光照与非光照渲染模式
 */
declare const SUPPORTED_RENDER_PRIMITIVE_GROUPS: readonly [
  ERenderPrimitiveGroup.RPG_OpaqueLit,
  ERenderPrimitiveGroup.RPG_OpaqueUnlit,
  ERenderPrimitiveGroup.RPG_TranslucentLit,
  ERenderPrimitiveGroup.RPG_TranslucentUnlit
];

/**
 * OBJ 几何数据结构
 */
interface OBJGeometry {
  /** 顶点坐标数组 (x, y, z, x, y, z, ...) */
  vertices: number[];
  /** 法线向量数组 (nx, ny, nz, nx, ny, nz, ...) */
  normals: number[];
  /** UV 纹理坐标数组 (u, v, u, v, ...) */
  uvs: number[];
  /** 是否为线条几何体 */
  isLine?: boolean;
}

/**
 * OBJ 材质数据结构
 */
interface OBJMaterial {
  /** 材质名称 */
  name: string;
}

/**
 * OBJ 对象数据结构
 */
interface OBJObject {
  /** 对象名称 */
  name: string;
  /** 几何数据 */
  geometry: OBJGeometry;
  /** 材质数据 */
  material: OBJMaterial;
}

/**
 * 加载进度事件回调
 */
type ProgressCallback = (event: ProgressEvent) => void;

/**
 * 加载成功回调
 */
type LoadSuccessCallback<T> = (result: T) => void;

/**
 * 加载错误回调
 */
type ErrorCallback = (error: Error | Event) => void;

/**
 * T3D OBJ 加载器类
 * 支持同步和异步加载 Wavefront OBJ 格式的 3D 模型
 */
declare class T3dOBJLoader {
  /**
   * 是否启用异步加载模式
   */
  isAsync: boolean;

  /**
   * 跨域请求设置
   */
  crossOrigin?: string;

  /**
   * XHR 响应类型
   */
  responseType?: XMLHttpRequestResponseType;

  /**
   * 内部 T3D OBJ 文件解析器实例
   * @private
   */
  private _t3dObjFileParser?: unknown;

  /**
   * 默认面材质（Lambert 材质）
   * @private
   */
  private _defaultFaceMaterial?: MeshLambertMaterial;

  /**
   * 默认线条材质
   * @private
   */
  private _defaultLineMaterial?: LineMeshMaterial;

  /**
   * 全局异步加载标志
   */
  static async: boolean;

  constructor();

  /**
   * 获取或创建默认面材质
   * 使用双面渲染的 Lambert 材质
   * @returns Lambert 材质实例
   * @private
   */
  private _getDefaultFaceMaterial(): MeshLambertMaterial;

  /**
   * 获取或创建默认线条材质
   * @returns 线条材质实例
   * @private
   */
  private _getDefaultLineMaterial(): LineMeshMaterial;

  /**
   * 加载 OBJ 文件
   * @param url - OBJ 文件的 URL 地址
   * @param onLoad - 加载成功回调函数
   * @param onProgress - 加载进度回调函数
   * @param onError - 加载错误回调函数
   * @param options - 额外加载选项
   */
  load(
    url: string,
    onLoad?: LoadSuccessCallback<Node>,
    onProgress?: ProgressCallback,
    onError?: ErrorCallback,
    options?: unknown
  ): void;

  /**
   * 执行 HTTP 请求加载文件
   * @param url - 文件 URL
   * @param onLoad - 成功回调
   * @param onProgress - 进度回调
   * @param onError - 错误回调
   * @private
   */
  private _doLoad(
    url: string,
    onLoad?: LoadSuccessCallback<string>,
    onProgress?: ProgressCallback,
    onError?: ErrorCallback
  ): void;

  /**
   * 解析 OBJ 文件内容
   * @param content - OBJ 文件文本内容
   * @returns 解析后的节点对象
   */
  parse(content: string): Node;

  /**
   * 设置是否异步下载
   * @param isAsync - true 为异步，false 为同步
   */
  setAsyncDownload(isAsync: boolean): void;

  /**
   * 设置跨域请求模式
   * @param crossOrigin - 跨域设置值（如 "anonymous"）
   */
  setCrossOrigin(crossOrigin: string): void;

  /**
   * 扩展加载方法，支持坐标系转换
   * @param url - OBJ 文件的 URL 地址
   * @param onLoad - 加载成功回调函数
   * @param onProgress - 加载进度回调函数
   * @param onError - 加载错误回调函数
   * @param options - 额外加载选项
   * @param convertCoordinates - 是否转换坐标系（Three.js 到 T3D）
   */
  loadex(
    url: string,
    onLoad?: LoadSuccessCallback<Node>,
    onProgress?: ProgressCallback,
    onError?: ErrorCallback,
    options?: unknown,
    convertCoordinates?: boolean
  ): void;

  /**
   * 扩展解析方法，支持坐标系转换
   * @param content - OBJ 文件文本内容
   * @param convertCoordinates - 是否转换坐标系（Three.js 到 T3D，Y-up 转 Z-up）
   * @returns 解析后的节点对象
   */
  parseex(content: string, convertCoordinates?: boolean): Node;
}

/**
 * 模块导出
 */
export { T3dOBJLoader };