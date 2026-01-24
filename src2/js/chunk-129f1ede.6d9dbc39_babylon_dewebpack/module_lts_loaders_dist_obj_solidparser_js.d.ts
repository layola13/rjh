/**
 * @fileoverview OBJ文件的Solid解析器，用于解析OBJ格式的3D模型数据并转换为Babylon.js可用的网格数据
 */

import type { Vector2, Vector3, Color4 } from 'core/Maths/math.vector';
import type { Mesh } from 'core/Meshes/mesh';
import type { Scene } from 'core/scene';
import type { AssetContainer } from 'core/assetContainer';
import type { VertexData } from 'core/Meshes/mesh.vertexData';
import type { StandardMaterial } from 'core/Materials/standardMaterial';

/**
 * OBJ加载选项配置
 */
export interface IOBJLoadingOptions {
  /** 是否使用UV优化 */
  optimizeWithUV: boolean;
  /** 是否导入顶点颜色 */
  importVertexColors: boolean;
  /** 是否计算法线 */
  computeNormals: boolean;
  /** 是否优化法线 */
  optimizeNormals: boolean;
  /** 是否反转Y轴 */
  invertY: boolean;
  /** UV缩放比例 */
  UVScaling: { x: number; y: number };
}

/**
 * 从OBJ解析的网格数据结构
 */
export interface IMeshFromOBJ {
  /** 网格名称 */
  name: string;
  /** 顶点索引数组 */
  indices: number[] | undefined;
  /** 顶点位置数组 */
  positions: number[] | undefined;
  /** 顶点法线数组 */
  normals: number[] | undefined;
  /** UV坐标数组 */
  uvs: number[] | undefined;
  /** 顶点颜色数组 */
  colors: number[] | undefined;
  /** 材质名称 */
  materialName: string;
  /** 直接关联的材质对象 */
  directMaterial?: StandardMaterial;
}

/**
 * 位置-法线-UV元组索引缓存结构
 */
interface ITuplePosNorm {
  /** 法线索引列表 */
  normals: number[];
  /** 对应的顶点索引列表 */
  idx: number[];
  /** UV索引列表（用于UV优化） */
  uv?: number[];
}

/**
 * OBJ文件的Solid解析器类
 * 负责解析OBJ文本格式并生成Babylon.js网格对象
 */
export declare class SolidParser {
  // ===== 静态正则表达式模式 =====
  /** 匹配对象定义 (o objectName) */
  static readonly ObjectDescriptor: RegExp;
  /** 匹配组定义 (g groupName) */
  static readonly GroupDescriptor: RegExp;
  /** 匹配材质库引用 (mtllib filename) */
  static readonly MtlLibGroupDescriptor: RegExp;
  /** 匹配材质使用声明 (usemtl materialName) */
  static readonly UseMtlDescriptor: RegExp;
  /** 匹配平滑组 (s off/on/number) */
  static readonly SmoothDescriptor: RegExp;
  /** 匹配顶点位置 (v x y z [r g b a]) */
  static readonly VertexPattern: RegExp;
  /** 匹配法线向量 (vn x y z) */
  static readonly NormalPattern: RegExp;
  /** 匹配UV坐标 (vt u v) */
  static readonly UVPattern: RegExp;
  /** 匹配面定义模式1: f v1 v2 v3 ... */
  static readonly FacePattern1: RegExp;
  /** 匹配面定义模式2: f v1/vt1 v2/vt2 v3/vt3 ... */
  static readonly FacePattern2: RegExp;
  /** 匹配面定义模式3: f v1/vt1/vn1 v2/vt2/vn2 v3/vt3/vn3 ... */
  static readonly FacePattern3: RegExp;
  /** 匹配面定义模式4: f v1//vn1 v2//vn2 v3//vn3 ... */
  static readonly FacePattern4: RegExp;
  /** 匹配面定义模式5: f -v1/-vt1/-vn1 -v2/-vt2/-vn2 ... (负索引) */
  static readonly FacePattern5: RegExp;

  // ===== 私有属性 =====
  /** 解析的顶点位置数组 */
  private _positions: Vector3[];
  /** 解析的法线向量数组 */
  private _normals: Vector3[];
  /** 解析的UV坐标数组 */
  private _uvs: Vector2[];
  /** 解析的顶点颜色数组 */
  private _colors: Color4[];
  /** 从OBJ解析出的网格数据列表 */
  private _meshesFromObj: IMeshFromOBJ[];
  /** 用于Babylon的索引数组 */
  private _indicesForBabylon: number[];
  /** 包装的位置数据（去重前） */
  private _wrappedPositionForBabylon: Vector3[];
  /** 包装的UV数据（去重前） */
  private _wrappedUvsForBabylon: Vector2[];
  /** 包装的颜色数据（去重前） */
  private _wrappedColorsForBabylon: Color4[];
  /** 包装的法线数据（去重前） */
  private _wrappedNormalsForBabylon: Vector3[];
  /** 位置-法线元组缓存，用于顶点去重 */
  private _tuplePosNorm: Record<number, ITuplePosNorm>;
  /** 当前索引位置计数器 */
  private _curPositionInIndices: number;
  /** 是否已解析到网格数据 */
  private _hasMeshes: boolean;
  /** 展开的位置数据（最终输出） */
  private _unwrappedPositionsForBabylon: number[];
  /** 展开的颜色数据（最终输出） */
  private _unwrappedColorsForBabylon: number[];
  /** 展开的法线数据（最终输出） */
  private _unwrappedNormalsForBabylon: number[];
  /** 展开的UV数据（最终输出） */
  private _unwrappedUVForBabylon: number[];
  /** 三角形临时存储 */
  private _triangles: string[];
  /** 当前材质名称 */
  private _materialNameFromObj: string;
  /** 当前对象名称 */
  private _objMeshName: string;
  /** 网格名称递增计数器 */
  private _increment: number;
  /** 是否为第一个材质 */
  private _isFirstMaterial: boolean;
  /** 默认灰色 */
  private _grayColor: Color4;
  /** 当前处理的网格对象 */
  private _handledMesh: IMeshFromOBJ;
  /** 材质名称数组输出 */
  private _materialToUse: string[];
  /** Babylon网格对象数组输出 */
  private _babylonMeshesArray: Mesh[];
  /** 加载选项配置 */
  private _loadingOptions: IOBJLoadingOptions;

  /**
   * 构造函数
   * @param materialToUse - 输出的材质名称数组
   * @param babylonMeshesArray - 输出的Babylon网格数组
   * @param loadingOptions - 加载选项配置
   */
  constructor(
    materialToUse: string[],
    babylonMeshesArray: Mesh[],
    loadingOptions: IOBJLoadingOptions
  );

  /**
   * 检查顶点数据是否已存在于缓存中（不考虑UV）
   * @param cache - 元组缓存对象
   * @param tuple - [位置索引, 法线索引]
   * @returns 如果找到返回对应的索引，否则返回-1
   */
  private _isInArray(
    cache: Record<number, ITuplePosNorm>,
    tuple: [number, number]
  ): number;

  /**
   * 检查顶点数据是否已存在于缓存中（考虑UV优化）
   * @param cache - 元组缓存对象
   * @param tuple - [位置索引, 法线索引, UV索引]
   * @returns 如果找到返回对应的索引，否则返回-1
   */
  private _isInArrayUV(
    cache: Record<number, ITuplePosNorm>,
    tuple: [number, number, number]
  ): number;

  /**
   * 设置顶点数据到内部数组中
   * @param positionIndex - 位置索引
   * @param uvIndex - UV索引
   * @param normalIndex - 法线索引
   * @param position - 位置向量
   * @param uv - UV坐标
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
   * 将包装的顶点数据展开为平坦数组
   */
  private _unwrapData(): void;

  /**
   * 将面数据分解为三角形
   * @param face - 面的顶点索引数组
   * @param offset - 起始偏移量
   */
  private _getTriangles(face: string[], offset: number): void;

  /**
   * 处理面模式1: f v1 v2 v3
   * @param face - 面的顶点数据数组
   * @param offset - 起始偏移量
   */
  private _setDataForCurrentFaceWithPattern1(face: string[], offset: number): void;

  /**
   * 处理面模式2: f v1/vt1 v2/vt2 v3/vt3
   * @param face - 面的顶点数据数组
   * @param offset - 起始偏移量
   */
  private _setDataForCurrentFaceWithPattern2(face: string[], offset: number): void;

  /**
   * 处理面模式3: f v1/vt1/vn1 v2/vt2/vn2 v3/vt3/vn3
   * @param face - 面的顶点数据数组
   * @param offset - 起始偏移量
   */
  private _setDataForCurrentFaceWithPattern3(face: string[], offset: number): void;

  /**
   * 处理面模式4: f v1//vn1 v2//vn2 v3//vn3
   * @param face - 面的顶点数据数组
   * @param offset - 起始偏移量
   */
  private _setDataForCurrentFaceWithPattern4(face: string[], offset: number): void;

  /**
   * 处理面模式5: f -v1/-vt1/-vn1 -v2/-vt2/-vn2 (负索引)
   * @param face - 面的顶点数据数组
   * @param offset - 起始偏移量
   */
  private _setDataForCurrentFaceWithPattern5(face: string[], offset: number): void;

  /**
   * 将之前解析的网格数据添加到结果数组中
   */
  private _addPreviousObjMesh(): void;

  /**
   * 优化网格的法线数据（合并相同位置的顶点法线）
   * @param mesh - 需要优化的网格对象
   */
  private _optimizeNormals(mesh: Mesh): void;

  /**
   * 解析OBJ文件内容
   * @param meshNames - 要解析的网格名称（字符串或数组），如果为空则解析全部
   * @param data - OBJ文件文本内容
   * @param scene - Babylon场景对象
   * @param assetContainer - 资源容器（可选）
   * @param onFileToLoadFound - 发现材质库文件时的回调函数
   */
  parse(
    meshNames: string | string[] | null,
    data: string,
    scene: Scene,
    assetContainer: AssetContainer | null,
    onFileToLoadFound: (filename: string) => void
  ): void;
}