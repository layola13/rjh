/**
 * DSweep 模块 - 3D扫描建模类
 * 该模块负责将2D轮廓沿着3D路径进行扫描（sweep）操作，生成3D几何体
 */

import { CabinetBase } from './CabinetBase';
import { SVGParser, Vector2, Vector3, Polygon, Loop, Coordinate3, MathAlg, Line2d } from './math';
import { alg } from './geometry';
import { RoomUtil } from './room';
import { Util } from './util';
import * as THREE from 'three';

/** 材质配置接口 */
interface MaterialConfig {
  /** X轴偏移量 */
  offsetX?: number;
  /** Y轴偏移量 */
  offsetY?: number;
  /** X轴翻转 */
  flipX?: boolean;
  /** Y轴翻转 */
  flipY?: boolean;
  /** X轴平铺尺寸 */
  tileSize_x?: number;
  /** Y轴平铺尺寸 */
  tileSize_y?: number;
  /** 旋转角度（度数） */
  rotation?: number;
}

/** 平面网格数据接口 */
interface FlatMesh {
  /** 顶点坐标数组 */
  vertices: number[];
  /** 法线向量数组 */
  normals: number[];
  /** UV纹理坐标数组 */
  uvs: number[];
  /** 面索引数组 */
  faces: number[];
}

/** 图形对象接口 */
interface GraphicsObject {
  /** 实体ID */
  entityId: string;
  /** 图形对象类型 */
  type: string;
  /** 可见性 */
  visible: boolean;
  /** 位置坐标 */
  position: Float32Array;
  /** 旋转四元数 */
  rotation: Float32Array;
  /** 缩放系数 */
  scale: Float32Array;
  /** 自定义属性 */
  customAttrs: {
    /** 房间类型 */
    roomType: string;
    /** 房间面积 */
    roomArea: number;
    /** 对象类型 */
    type: string;
  };
  /** 材质对象 */
  material?: unknown;
  /** 搜索ID */
  seekId?: string;
  /** 网格键 */
  mesh?: string;
  /** 图形路径 */
  graphicsPath?: string;
}

/** 网格定义接口 */
interface MeshDefinition {
  /** 网格唯一键 */
  meshKey: string;
  /** 顶点位置数组 */
  vertexPositions: Float32Array;
  /** 顶点法线数组 */
  vertexNormals: Float32Array;
  /** 顶点UV坐标数组 */
  vertexUVs: Float32Array;
  /** 顶点数量 */
  vertexCount: number;
  /** 面索引数组 */
  faceIndices: Uint32Array;
  /** 索引数量 */
  indexCount: number;
}

/** 图形数据接口 */
interface GraphicsData {
  /** 图形对象列表 */
  objects: GraphicsObject[];
  /** 网格定义列表 */
  meshDefs: MeshDefinition[];
}

/** DSweep模型接口 */
interface DSweepModel {
  /** SVG轮廓路径字符串 */
  profile?: string;
  /** 轮廓变换矩阵 */
  profileTransform?: unknown;
  /** 轮廓参考Y轴方向 */
  profileRefYDir?: [number, number, number];
  /** 3D扫描路径数组 */
  paths: Array<{
    getStartTangent(): Vector3;
    getStartPt(): Vector3;
    isLine3d(): boolean;
    isParallelTo(other: unknown): boolean;
    getLength(): number;
  }>;
  /** 裁剪平面列表 */
  modelCutPlanes: unknown[];
  /** 材质配置 */
  material: MaterialConfig;
}

/**
 * DSweep 类 - 3D扫描建模核心类
 * 继承自 CabinetBase，负责将2D轮廓沿3D路径扫描生成3D几何体
 */
export declare class DSweep extends CabinetBase {
  /** 内部存储的平面网格数据 */
  private _flatMesh?: FlatMesh;

  /**
   * 获取DSweep模型实体
   * @returns DSweep模型对象
   */
  get modelDSweep(): DSweepModel;

  /**
   * 更新方法 - 执行扫描操作生成3D几何体
   * 核心步骤：
   * 1. 解析SVG轮廓为2D曲线
   * 2. 闭合轮廓（如果未闭合）
   * 3. 应用轮廓变换
   * 4. 沿3D路径执行扫描操作
   * 5. 应用裁剪平面
   */
  onUpdate(): void;

  /**
   * 转换为图形数据
   * 将内部网格数据转换为渲染引擎所需的图形数据格式
   * @returns 包含网格定义和图形对象的数据结构
   */
  toGraphicsData(): GraphicsData;

  /**
   * 获取扫描材质配置
   * 处理材质的UV变换、平铺、翻转等属性
   * @returns 配置完成的材质对象
   * @private
   */
  private _getSweepMaterial(): unknown;
}

/**
 * 常量定义
 */
declare namespace HSConstants {
  /** 图形对象类型枚举 */
  enum GraphicsObjectType {
    Mesh = 'Mesh'
  }
}

/**
 * 核心模型命名空间
 */
declare namespace HSCore {
  namespace Model {
    /** 实体标志枚举 */
    enum EntityFlagEnum {
      /** 隐藏标志 */
      hidden = 'hidden',
      /** 移除标志 */
      removed = 'removed'
    }
  }

  namespace Util {
    /** 矩阵3D处理器 */
    class Matrix3DHandler {
      /**
       * 获取4x4变换矩阵
       * @param entity 实体对象
       * @returns THREE.js Matrix4对象
       */
      static getMatrix4(entity: unknown): THREE.Matrix4;
    }
  }
}

/**
 * 辅助工具函数
 */

/**
 * 将3D线段转换为点数组
 * @param segments 3D线段数组
 * @returns 点坐标数组
 */
declare function segment3dToPoints(segments: unknown[]): unknown[];

/**
 * 将点数组转换为3D线段数组
 * @param points 点坐标数组
 * @returns 3D线段数组
 */
declare function pointsToLine3ds(points: unknown[]): unknown[];