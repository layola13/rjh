/**
 * STL 文件加载器，用于加载 STL 格式的 3D 模型文件
 * 支持 ASCII 和二进制两种 STL 格式
 */
export declare class STLFileLoader {
  /**
   * 加载器名称
   */
  name: string;

  /**
   * 支持的文件扩展名配置
   */
  extensions: {
    '.stl': {
      isBinary: boolean;
    };
  };

  /**
   * 是否不修改文件坐标系
   * 默认为 false，会进行坐标转换以适配 Babylon.js 坐标系
   */
  static DO_NOT_ALTER_FILE_COORDINATES: boolean;

  /**
   * 匹配 solid...endsolid 块的正则表达式
   */
  solidPattern: RegExp;

  /**
   * 匹配 facet...endfacet 块的正则表达式
   */
  facetsPattern: RegExp;

  /**
   * 匹配法线数据的正则表达式
   */
  normalPattern: RegExp;

  /**
   * 匹配顶点数据的正则表达式
   */
  vertexPattern: RegExp;

  /**
   * 导入网格数据
   * @param meshesNames - 要导入的网格名称（字符串或字符串数组），null 表示导入所有
   * @param scene - 目标场景对象
   * @param data - STL 文件数据（字符串、ArrayBuffer 或 Uint8Array）
   * @param rootUrl - 根 URL 路径
   * @param meshes - 可选的网格数组，用于存储导入的网格对象
   * @returns 是否成功导入
   */
  importMesh(
    meshesNames: string | string[] | null,
    scene: any,
    data: string | ArrayBuffer | Uint8Array,
    rootUrl: string,
    meshes?: any[]
  ): boolean;

  /**
   * 加载 STL 文件
   * @param scene - 目标场景对象
   * @param data - STL 文件数据
   * @param rootUrl - 根 URL 路径
   * @returns 是否成功加载
   */
  load(scene: any, data: string | ArrayBuffer | Uint8Array, rootUrl: string): boolean;

  /**
   * 加载为资产容器
   * @param scene - 目标场景对象
   * @param data - STL 文件数据
   * @param rootUrl - 根 URL 路径
   * @returns 资产容器对象
   */
  loadAssetContainer(scene: any, data: string | ArrayBuffer | Uint8Array, rootUrl: string): any;

  /**
   * 判断数据是否为二进制格式
   * @param data - ArrayBuffer 数据
   * @returns 是否为二进制格式
   */
  private _isBinary(data: ArrayBuffer): boolean;

  /**
   * 解析二进制格式的 STL 数据
   * @param mesh - 目标网格对象
   * @param data - 二进制 ArrayBuffer 数据
   */
  private _parseBinary(mesh: any, data: ArrayBuffer): void;

  /**
   * 解析 ASCII 格式的 STL 数据
   * @param mesh - 目标网格对象
   * @param solidData - solid 块内的字符串数据
   */
  private _parseASCII(mesh: any, solidData: string): void;
}