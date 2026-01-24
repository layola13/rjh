/**
 * Module: PhotoMeshMate
 * 用于处理照片网格配准和用户交互的核心类
 */

import { Plane, Vector3, Ray, MeshBuilder, StandardMaterial, Color3, PointerDragBehavior, Matrix, Quaternion, Camera, AbstractMesh, Scene } from '@babylonjs/core';

/**
 * 目标网格配准点信息
 */
export interface TargetMeshMatePoint {
  /** 网格的唯一标识符 */
  uniqueId: number;
  /** 配准点的三维坐标 */
  matePoint: Vector3;
}

/**
 * 二维点坐标
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * 二维线段
 */
export interface Segment2D {
  /** 获取线段中点 */
  middle(): Point2D;
  /** 获取线段长度 */
  length: number;
}

/**
 * 几何工具类型定义
 */
export interface GeometryUtils {
  /** 创建二维点 */
  point(x: number, y: number): Point2D;
  /** 创建线段 */
  segment(start: Point2D, end: Point2D): Segment2D;
}

/**
 * 三维场景上下文接口
 */
export interface ThreeScene {
  /** Babylon.js 场景实例 */
  scene: Scene;
  /** 画布元素 */
  canvas: HTMLCanvasElement;
  /** 拍照节点的变换节点 */
  tankePhotoNode: {
    position: Vector3;
  };
  /** 目标网格的配准点列表 */
  targetMeshMatePoints: TargetMeshMatePoint[];
}

/**
 * 照片网格配准类
 * 负责处理照片与3D网格的空间配准，包括点击事件处理、配准点创建和最终配准计算
 */
export declare class PhototMeshMate {
  /** 照片相机副本 */
  private readonly photoCamera: Camera;
  
  /** 目标配准网格 */
  private readonly targetMesh: AbstractMesh;
  
  /** 三维场景上下文 */
  private readonly threeScene: ThreeScene;
  
  /** 拍照平面（用于射线相交计算） */
  private readonly takePhotoPlane: Plane;

  /**
   * 构造函数
   * @param camera - 原始照片相机
   * @param targetMesh - 需要配准的目标网格
   * @param threeScene - 三维场景上下文
   */
  constructor(camera: Camera, targetMesh: AbstractMesh, threeScene: ThreeScene);

  /**
   * 处理点击事件
   * 在照片上点击以创建配准点（最多4个）
   * @param event - 鼠标或触摸事件
   */
  DoClickEvent(event: MouseEvent | TouchEvent): void;

  /**
   * 执行配准计算
   * 根据4个配准点计算目标网格的位置、旋转和缩放
   * 使用透视变换和四点对应关系进行空间配准
   */
  DoMate(): void;

  /**
   * 为配准点网格附加拖拽行为
   * 允许用户在平面上拖动配准点以调整位置
   * @param mesh - 需要附加拖拽行为的网格
   */
  private AttachOwnPointerDragBehavior(mesh: AbstractMesh): void;
}