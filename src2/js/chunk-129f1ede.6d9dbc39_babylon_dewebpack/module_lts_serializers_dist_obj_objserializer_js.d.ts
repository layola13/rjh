/**
 * OBJ/MTL 文件序列化器
 * 用于将 Babylon.js 网格数据导出为 OBJ 和 MTL 格式
 */

import type { AbstractMesh } from 'core/Meshes/abstractMesh';
import type { Mesh } from 'core/Meshes/mesh';
import type { StandardMaterial } from 'core/Materials/standardMaterial';
import type { Scene } from 'core/scene';
import type { Geometry } from 'core/Meshes/geometry';
import type { Nullable } from 'core/types';
import type { Matrix } from 'core/Maths/math.vector';
import type { BaseTexture } from 'core/Materials/Textures/baseTexture';

/**
 * 材质颜色定义
 */
interface MaterialColor {
  /** 红色通道 (0-1) */
  r: number;
  /** 绿色通道 (0-1) */
  g: number;
  /** 蓝色通道 (0-1) */
  b: number;
}

/**
 * 标准材质接口（简化）
 */
interface IMaterial {
  /** 材质唯一标识符 */
  id: string;
  /** 镜面反射强度 */
  specularPower: number;
  /** 透明度 (0-1) */
  alpha: number;
  /** 环境光颜色 */
  ambientColor: MaterialColor;
  /** 漫反射颜色 */
  diffuseColor: MaterialColor;
  /** 镜面反射颜色 */
  specularColor: MaterialColor;
  /** 自发光颜色 */
  emissiveColor: MaterialColor;
  /** 环境光贴图 */
  ambientTexture?: { name: string };
  /** 漫反射贴图 */
  diffuseTexture?: { name: string };
  /** 镜面反射贴图 */
  specularTexture?: { name: string };
  /** 法线/凹凸贴图 */
  bumpTexture?: { name: string };
  /** 透明度贴图 */
  opacityTexture?: { name: string };
}

/**
 * 网格接口（简化）
 */
interface IMesh {
  /** 网格材质 */
  material?: IMaterial;
  /** 网格几何体 */
  geometry?: Geometry;
  /** 获取所属场景 */
  getScene(): { useRightHandedSystem: boolean };
  /** 计算世界变换矩阵 */
  computeWorldMatrix(force: boolean): Matrix;
  /** 将变换烘焙到顶点数据中 */
  bakeTransformIntoVertices(transform: Matrix): void;
}

/**
 * OBJ 导出器类
 */
export declare class OBJExport {
  /**
   * 将网格数组导出为 OBJ 格式字符串
   * 
   * @param meshes - 要导出的网格数组
   * @param exportMaterials - 是否导出材质引用
   * @param materialLibraryName - MTL 文件名（不含扩展名），默认 "mat"
   * @param bakeTransforms - 是否将世界变换烘焙到顶点坐标中
   * @returns OBJ 格式的文本内容
   */
  static OBJ(
    meshes: IMesh[],
    exportMaterials: boolean,
    materialLibraryName?: string,
    bakeTransforms?: boolean
  ): string;

  /**
   * 将材质导出为 MTL 格式字符串
   * 
   * @param mesh - 包含材质的网格对象
   * @returns MTL 格式的文本内容
   */
  static MTL(mesh: IMesh): string;
}