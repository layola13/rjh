import type { Scene, Mesh, Material, Vector2 } from '@babylonjs/core';

/**
 * 墙体侧面配置
 */
interface WallSideConfig {
  /** 外侧多边形顶点数组 */
  outterSide: Vector2[];
  /** 内侧多边形顶点数组 */
  innerSide: Vector2[];
  /** 墙体高度（单位：米） */
  height: number;
}

/**
 * 网格名称映射
 */
interface MeshNames {
  /** 外墙网格名称 */
  outer: string;
  /** 内墙网格名称 */
  inner: string;
}

/**
 * 纹理元数据
 */
interface TextureMeta {
  /** 纹理宽度（像素） */
  width: number;
  /** 纹理高度（像素） */
  height: number;
}

/**
 * 背景墙体构建器类
 * 负责创建、定位和修改3D场景中的内外墙体网格
 */
export default class BackgroundWallBuilder {
  /** 关联的Babylon.js场景对象 */
  private readonly scene: Scene;

  /** 外墙材质 */
  private readonly outerMaterial: Material;

  /** 内墙材质 */
  private readonly innerMaterial: Material;

  /** 外墙网格对象 */
  private outer?: Mesh;

  /** 内墙网格对象 */
  private inner?: Mesh;

  /**
   * @param scene - Babylon.js场景实例
   */
  constructor(scene: Scene);

  /**
   * 检查内外墙网格是否已创建
   * @returns 当内外墙网格都存在时返回true
   */
  get exists(): boolean;

  /**
   * 获取网格名称配置
   * @returns 包含内外墙网格名称的对象
   */
  get meshNames(): MeshNames;

  /**
   * 获取纹理贴图的元数据
   * @returns 纹理的宽度和高度信息
   */
  get textureMeta(): TextureMeta;

  /**
   * 创建墙体网格
   * @param config - 墙体配置参数，包含内外侧顶点和高度
   */
  make(config: WallSideConfig): void;

  /**
   * 定位墙体在场景中的位置
   * @param depth - 墙体深度（单位：米），用于计算Z轴偏移
   */
  locate(depth: number): void;

  /**
   * 在墙体上挖洞（布尔减法运算）
   * @param holeMesh - 用于挖洞的网格对象
   */
  digHole(holeMesh: Mesh): void;

  /**
   * 修复网格顶点法线
   * 用于改善光照计算和渲染效果
   */
  fixVertexNormal(): void;

  /**
   * 创建内墙网格
   * @param vertices - 内墙多边形顶点数组
   * @param height - 墙体高度（单位：米）
   * @returns 生成的内墙网格对象
   */
  private makeInner(vertices: Vector2[], height: number): Mesh;

  /**
   * 创建外墙网格
   * @param vertices - 外墙多边形顶点数组
   * @param height - 墙体高度（单位：米）
   * @returns 生成的外墙网格对象
   */
  private makeOuter(vertices: Vector2[], height: number): Mesh;

  /**
   * 计算多边形周长
   * @param vertices - 多边形顶点数组
   * @returns 多边形的总周长（单位：米）
   */
  private perimeter(vertices: Vector2[]): number;
}