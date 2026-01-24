import { PModel } from './PModel';
import { WebCadDocument } from './WebCadDocument';

/**
 * 表示二维坐标点
 */
interface Point2D {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 挤压体参数配置
 */
interface ExtrusionOptions {
  /** 路径点集合（多边形轮廓） */
  paths: THREE.Vector3[][];
  /** 挤压平面 */
  plane: Plane;
  /** X射线方向 */
  xRay: THREE.Vector3;
  /** 目标法向量 */
  targetNormal: THREE.Vector3;
  /** Z方向挤压长度 */
  zlength: number;
}

/**
 * 平面定义
 */
interface Plane {
  /** 平面法向量 */
  normal: THREE.Vector3;
  /** X射线方向 */
  xRay: THREE.Vector3;
}

/**
 * PBox实体属性
 */
interface PBoxEntity {
  /** X方向长度 */
  XLength: number;
  /** Y方向长度 */
  YLength: number;
  /** Z方向长度（挤压高度） */
  ZLength: number;
}

/**
 * PBox - 参数化长方体模型类
 * 
 * 继承自PModel，用于创建和管理三维长方体几何体。
 * 支持通过XLength、YLength、ZLength参数动态生成挤压体。
 * 
 * @extends PModel
 */
export declare class PBox extends PModel {
  /**
   * WebCAD文档实例，用于管理几何体数据
   * @private
   */
  private _webCadDocument: WebCadDocument;

  /**
   * 缓存的配置字符串，用于优化性能避免重复计算
   * @private
   */
  private _cache?: string;

  /**
   * 实体属性对象
   * @override
   */
  entity: PBoxEntity;

  /**
   * 构造函数
   * 
   * @param e - 第一个参数（具体类型依赖PModel定义）
   * @param t - 第二个参数（具体类型依赖PModel定义）
   * @param o - 第三个参数（具体类型依赖PModel定义）
   */
  constructor(e: unknown, t: unknown, o: unknown);

  /**
   * 获取长方体的二维轮廓点集
   * 
   * 基于XLength和YLength生成矩形的四个顶点坐标。
   * 确保返回的点集按逆时针顺序排列。
   * 
   * @returns 逆时针排列的矩形顶点数组
   */
  getProfile(): Point2D[];

  /**
   * 更新模型几何体
   * 
   * 当实体参数变化时调用，重新计算并生成三维挤压体。
   * 使用缓存机制避免重复计算相同配置。
   * 
   * @override
   */
  onUpdate(): void;
}