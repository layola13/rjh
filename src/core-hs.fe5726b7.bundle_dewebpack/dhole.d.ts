/**
 * DHole模块类型声明
 * 表示钻孔（Drill Hole）对象，用于处理3D模型中的孔洞几何体
 */

import { BaseObject } from './BaseObject';
import { Face } from './Face';
import { FaceGeometry } from './FaceGeometry';
import { DHoleProvider } from './DHoleProvider';
import * as THREE from 'three';

/**
 * 裁剪辅助CSG数据结构
 * 用于布尔运算和碰撞检测
 */
export interface ClipAidCSG {
  /** CSG网格对象 */
  csg: THREE.Mesh;
  /** 包围盒 */
  box: THREE.Box3;
}

/**
 * 裁剪辅助CSG集合
 */
export interface ClipAidCSGs {
  /** CSG对象数组 */
  csgs: ClipAidCSG[];
  /** 3D场景节点 */
  node: THREE.Object3D;
}

/**
 * DHole类 - 钻孔对象
 * 继承自BaseObject，表示3D模型中的孔洞实体
 * 负责管理孔洞的几何体、面对象和裁剪辅助数据
 */
export declare class DHole extends BaseObject {
  /**
   * 数据提供者，用于获取钻孔相关数据
   * @private
   */
  private _dataProvider: DHoleProvider;

  /**
   * 局部变换矩阵
   * @private
   */
  private _matrixLocal: THREE.Matrix4;

  /**
   * 裁剪辅助CSG缓存
   * @private
   */
  private _clipAidCSGs?: ClipAidCSGs;

  /**
   * 子节点映射表，存储面几何体对象
   */
  childNodes?: Map<string, FaceGeometry>;

  /**
   * 构造函数
   * @param entity - HSCore实体对象
   * @param context - 渲染上下文
   * @param options - 可选配置参数
   */
  constructor(entity: any, context: any, options: any);

  /**
   * 更新回调方法
   * 在每帧或实体变化时调用，更新矩阵和世界坐标
   * @param delta - 时间增量或更新参数
   */
  onUpdate(delta: any): void;

  /**
   * 更新局部变换矩阵
   * 从实体的动画矩阵计算并转换单位
   */
  updateMatrix(): void;

  /**
   * 创建面几何体对象
   * 为给定的Face实体创建对应的FaceGeometry对象并添加到子节点
   * @param face - Face实体对象
   */
  createFaceObject(face: Face): void;

  /**
   * 获取裁剪辅助CSG数据
   * 用于布尔运算和碰撞检测，结果会被缓存
   * @returns 裁剪辅助CSG集合，如果无法生成则返回undefined
   */
  getClipAidCSGs(): ClipAidCSGs | undefined;

  /**
   * 创建裁剪辅助CSG数据（内部方法）
   * 根据实体的开口轮廓生成挤出几何体和包围盒
   * @private
   * @returns 新创建的裁剪辅助CSG集合，如果轮廓无效则返回undefined
   */
  private _createClipAidCSGs(): ClipAidCSGs | undefined;
}