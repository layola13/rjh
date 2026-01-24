import { LinearDimension } from './LinearDimension';

/**
 * 管道线性标注类
 * 用于在3D视图中创建和显示管道的线性尺寸标注
 * @extends LinearDimension
 */
export declare class TubeLinearDimension extends LinearDimension {
  /**
   * 构造函数
   * 创建一个新的管道线性标注实例
   */
  constructor();

  /**
   * 创建标注线段
   * 将模型空间中的两点转换为视图空间，并创建对应的3D线段网格节点
   * 
   * @param startPoint - 线段起点的模型空间坐标
   * @param endPoint - 线段终点的模型空间坐标
   * @param material - 用于渲染线段的材质对象
   * @returns 返回创建的三维网格节点对象
   * @protected
   */
  protected _createLine(
    startPoint: Vector3 | Point3D,
    endPoint: Vector3 | Point3D,
    material: Material | MeshMaterial
  ): MeshNode;
}

/**
 * 三维向量或点坐标类型
 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * 三维点坐标类型别名
 */
type Point3D = Vector3;

/**
 * 三维网格材质
 */
interface Material {
  [key: string]: unknown;
}

/**
 * 网格材质类型别名
 */
type MeshMaterial = Material;

/**
 * 三维网格节点
 * 表示3D场景中的一个可渲染网格对象
 */
interface MeshNode {
  geometry: unknown;
  material: Material;
  [key: string]: unknown;
}