/**
 * OBJ文件解析器，用于将OBJ格式的3D模型数据解析为Babylon.js可用的网格数据
 */
export declare class SolidParser {
  /**
   * 正则表达式：匹配对象描述符 (o objectName)
   */
  static readonly ObjectDescriptor: RegExp;

  /**
   * 正则表达式：匹配组描述符 (g groupName)
   */
  static readonly GroupDescriptor: RegExp;

  /**
   * 正则表达式：匹配材质库引用 (mtllib filename)
   */
  static readonly MtlLibGroupDescriptor: RegExp;

  /**
   * 正则表达式：匹配材质使用声明 (usemtl materialName)
   */
  static readonly UseMtlDescriptor: RegExp;

  /**
   * 正则表达式：匹配平滑着色描述符 (s on/off/group)
   */
  static readonly SmoothDescriptor: RegExp;

  /**
   * 正则表达式：匹配顶点坐标 (v x y z [r g b [a]])
   * 支持3-7个参数：位置xyz + 可选颜色rgba
   */
  static readonly VertexPattern: RegExp;

  /**
   * 正则表达式：匹配顶点法线 (vn x y z)
   */
  static readonly NormalPattern: RegExp;

  /**
   * 正则表达式：匹配纹理坐标 (vt u v)
   */
  static readonly UVPattern: RegExp;

  /**
   * 正则表达式：匹配面定义模式1 (f v1 v2 v3 ...)
   * 仅包含顶点索引
   */
  static readonly FacePattern1: RegExp;

  /**
   * 正则表达式：匹配面定义模式2 (f v1/vt1 v2/vt2 v3/vt3 ...)
   * 包含顶点索引和纹理坐标索引
   */
  static readonly FacePattern2: RegExp;

  /**
   * 正则表达式：匹配面定义模式3 (f v1/vt1/vn1 v2/vt2/vn2 v3/vt3/vn3 ...)
   * 包含顶点索引、纹理坐标索引和法线索引
   */
  static readonly FacePattern3: RegExp;

  /**
   * 正则表达式：匹配面定义模式4 (f v1//vn1 v2//vn2 v3//vn3 ...)
   * 包含顶点索引和法线索引，无纹理坐标
   */
  static readonly FacePattern4: RegExp;

  /**
   * 正则表达式：匹配面定义模式5 (f -v1/-vt1/-vn1 -v2/-vt2/-vn2 ...)
   * 使用负数索引（相对于当前位置的反向索引）
   */
  static readonly FacePattern5: RegExp;

  /**
   * 创建SolidParser实例
   * @param materialToUse - 用于存储材质名称的数组引用
   * @param babylonMeshesArray - 用于存储生成的Babylon网格对象的数组引用
   * @param loadingOptions - 加载选项配置
   */
  constructor(
    materialToUse: string[],
    babylonMeshesArray: any[],
    loadingOptions: OBJLoadingOptions
  );

  /**
   * 检查位置-法线组合是否已存在于索引映射中
   * @param indexMap - 索引映射表
   * @param key - 键值对 [positionIndex, normalIndex]
   * @returns 如果已存在返回对应的顶点索引，否则返回-1
   */
  private _isInArray(
    indexMap: TuplePosNormMap,
    key: [number, number]
  ): number;

  /**
   * 检查位置-法线-UV组合是否已存在于索引映射中（启用UV优化时使用）
   * @param indexMap - 索引映射表
   * @param key - 键值对 [positionIndex, normalIndex, uvIndex]
   * @returns 如果已存在返回对应的顶点索引，否则返回-1
   */
  private _isInArrayUV(
    indexMap: TuplePosNormUVMap,
    key: [number, number, number]
  ): number;

  /**
   * 设置当前面的顶点数据，进行去重优化
   * @param positionIndex - 位置索引
   * @param uvIndex - UV坐标索引
   * @param normalIndex - 法线索引
   * @param position - 顶点位置向量
   * @param uv - UV坐标向量
   * @param normal - 法线向量
   * @param color - 顶点颜色（可选）
   */
  private _setData(
    positionIndex: number,
    uvIndex: number,
    normalIndex: number,
    position: Vector3,
    uv: Vector2,
    normal: Vector3,
    color?: Color4
  ): void;

  /**
   * 将包装的顶点数据展开为平面数组格式
   * 将Vector3/Vector2/Color4对象转换为number[]
   */
  private _unwrapData(): void;

  /**
   * 将多边形面三角化
   * @param vertices - 顶点索引数组
   * @param startIndex - 开始三角化的索引位置
   */
  private _getTriangles(vertices: string[], startIndex: number): void;

  /**
   * 处理面定义模式1的数据：仅顶点索引 (f v1 v2 v3)
   * @param vertices - 顶点索引字符串数组
   * @param startIndex - 开始处理的索引位置
   */
  private _setDataForCurrentFaceWithPattern1(
    vertices: string[],
    startIndex: number
  ): void;

  /**
   * 处理面定义模式2的数据：顶点/纹理 (f v1/vt1 v2/vt2 v3/vt3)
   * @param vertices - 顶点数据字符串数组
   * @param startIndex - 开始处理的索引位置
   */
  private _setDataForCurrentFaceWithPattern2(
    vertices: string[],
    startIndex: number
  ): void;

  /**
   * 处理面定义模式3的数据：顶点/纹理/法线 (f v1/vt1/vn1 v2/vt2/vn2 v3/vt3/vn3)
   * @param vertices - 顶点数据字符串数组
   * @param startIndex - 开始处理的索引位置
   */
  private _setDataForCurrentFaceWithPattern3(
    vertices: string[],
    startIndex: number
  ): void;

  /**
   * 处理面定义模式4的数据：顶点//法线 (f v1//vn1 v2//vn2 v3//vn3)
   * @param vertices - 顶点数据字符串数组
   * @param startIndex - 开始处理的索引位置
   */
  private _setDataForCurrentFaceWithPattern4(
    vertices: string[],
    startIndex: number
  ): void;

  /**
   * 处理面定义模式5的数据：负索引 (f -v1/-vt1/-vn1 -v2/-vt2/-vn2)
   * @param vertices - 顶点数据字符串数组
   * @param startIndex - 开始处理的索引位置
   */
  private _setDataForCurrentFaceWithPattern5(
    vertices: string[],
    startIndex: number
  ): void;

  /**
   * 将之前处理的网格数据添加到网格数组中
   * 完成数据展开和索引反转
   */
  private _addPreviousObjMesh(): void;

  /**
   * 优化网格法线数据
   * 对共享相同位置的顶点法线进行平均化处理
   * @param mesh - 要优化的Babylon网格对象
   */
  private _optimizeNormals(mesh: Mesh): void;

  /**
   * 解析OBJ文件内容
   * @param meshNames - 要解析的网格名称（字符串或字符串数组），null表示解析所有
   * @param data - OBJ文件的文本内容
   * @param scene - Babylon场景对象
   * @param assetContainer - 资源容器（可选）
   * @param onFileToLoadFound - 发现需要加载的外部文件时的回调函数
   */
  parse(
    meshNames: string | string[] | null,
    data: string,
    scene: Scene,
    assetContainer: AssetContainer | null,
    onFileToLoadFound: (filename: string) => void
  ): void;
}

/**
 * OBJ加载选项配置接口
 */
interface OBJLoadingOptions {
  /**
   * 是否启用UV坐标优化（去重时考虑UV坐标）
   */
  optimizeWithUV: boolean;

  /**
   * 是否导入顶点颜色
   */
  importVertexColors: boolean;

  /**
   * 是否计算法线（当OBJ文件不包含法线数据时）
   */
  computeNormals: boolean;

  /**
   * 是否反转Y轴
   */
  invertY: boolean;

  /**
   * UV缩放系数
   */
  UVScaling: Vector2;

  /**
   * 是否优化法线（平均化共享顶点的法线）
   */
  optimizeNormals: boolean;
}

/**
 * 位置-法线索引映射项
 */
interface TuplePosNormEntry {
  /**
   * 法线索引列表
   */
  normals: number[];

  /**
   * 对应的顶点索引列表
   */
  idx: number[];
}

/**
 * 位置-法线-UV索引映射项
 */
interface TuplePosNormUVEntry extends TuplePosNormEntry {
  /**
   * UV索引列表
   */
  uv: number[];
}

/**
 * 位置-法线索引映射表
 */
type TuplePosNormMap = {
  [positionIndex: number]: TuplePosNormEntry;
};

/**
 * 位置-法线-UV索引映射表
 */
type TuplePosNormUVMap = {
  [positionIndex: number]: TuplePosNormUVEntry;
};

/**
 * 从OBJ解析的网格数据结构
 */
interface MeshObject {
  /**
   * 网格名称
   */
  name: string;

  /**
   * 顶点索引数组
   */
  indices: number[] | undefined;

  /**
   * 顶点位置数组（扁平化：[x1,y1,z1,x2,y2,z2,...]）
   */
  positions: number[] | undefined;

  /**
   * 法线数组（扁平化：[nx1,ny1,nz1,nx2,ny2,nz2,...]）
   */
  normals: number[] | undefined;

  /**
   * UV坐标数组（扁平化：[u1,v1,u2,v2,...]）
   */
  uvs: number[] | undefined;

  /**
   * 顶点颜色数组（扁平化：[r1,g1,b1,a1,r2,g2,b2,a2,...]）
   */
  colors: number[] | undefined;

  /**
   * 材质名称
   */
  materialName: string;

  /**
   * 直接关联的材质对象（用于点云等特殊情况）
   */
  directMaterial?: Material;
}

/**
 * Babylon.js Vector2向量类型（引用）
 */
type Vector2 = import('@babylonjs/core').Vector2;

/**
 * Babylon.js Vector3向量类型（引用）
 */
type Vector3 = import('@babylonjs/core').Vector3;

/**
 * Babylon.js Color4颜色类型（引用）
 */
type Color4 = import('@babylonjs/core').Color4;

/**
 * Babylon.js Scene场景类型（引用）
 */
type Scene = import('@babylonjs/core').Scene;

/**
 * Babylon.js Mesh网格类型（引用）
 */
type Mesh = import('@babylonjs/core').Mesh;

/**
 * Babylon.js AssetContainer资源容器类型（引用）
 */
type AssetContainer = import('@babylonjs/core').AssetContainer;

/**
 * Babylon.js Material材质类型（引用）
 */
type Material = import('@babylonjs/core').Material;