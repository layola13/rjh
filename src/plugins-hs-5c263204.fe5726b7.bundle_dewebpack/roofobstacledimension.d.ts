/**
 * 屋顶障碍物尺寸标注类
 * 用于计算和显示屋顶障碍物与墙体之间的尺寸关系
 * @module RoofObstacleDimension
 */

import { FurnitureDimension } from './FurnitureDimension';
import type * as THREE from 'three';

/**
 * 线性尺寸标注数据接口
 */
interface LinearDimensionGizmoData {
  /** 起始点坐标 */
  startPoint: { x: number; y: number };
  /** 结束点坐标 */
  endPoint: { x: number; y: number };
}

/**
 * 墙体实体接口
 */
interface WallEntity {
  /** 起点坐标 */
  from: { x: number; y: number };
  /** 终点坐标 */
  to: { x: number; y: number };
  /** 旋转角度（度） */
  rotation: number;
  /** 3D高度 */
  height3d: number;
  /** 墙体宽度 */
  width: number;
}

/**
 * 障碍物实体接口
 */
interface ObstacleEntity {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标（高度） */
  z: number;
  /** 旋转角度（度） */
  rotation: number;
  /** X方向尺寸 */
  XSize: number;
}

/**
 * 屋顶障碍物尺寸标注类
 * 继承自家具尺寸标注基类，专门处理屋顶障碍物的尺寸计算和显示
 */
export declare class RoofObstacleDimension extends FurnitureDimension {
  /**
   * 是否启用尺寸标注
   * @default true
   */
  isEnable: boolean;

  /**
   * 角度容差值，用于判断角度是否近似相等
   */
  protected angle_tolerance: number;

  /**
   * 当前障碍物实体
   */
  protected entity: ObstacleEntity;

  /**
   * 线性尺寸标注数据集合
   */
  protected linearDimensionGizmoDatas: LinearDimensionGizmoData[];

  /**
   * 构造函数
   * @param arg1 - 第一个参数（具体类型由基类定义）
   * @param arg2 - 第二个参数（具体类型由基类定义）
   * @param arg3 - 第三个参数（具体类型由基类定义）
   */
  constructor(arg1: unknown, arg2: unknown, arg3: unknown);

  /**
   * 判断障碍物与墙体是否平行
   * @param obstacle - 障碍物实体
   * @param wall - 墙体实体
   * @returns 如果平行返回true，否则返回false
   */
  protected _isParallel(obstacle: ObstacleEntity, wall: WallEntity): boolean;

  /**
   * 判断障碍物与墙体是否垂直
   * @param obstacle - 障碍物实体
   * @param wall - 墙体实体
   * @returns 如果垂直返回true，否则返回false
   */
  protected _isPerpendicular(obstacle: ObstacleEntity, wall: WallEntity): boolean;

  /**
   * 计算障碍物与平行墙体之间的尺寸标注
   * 遍历所有墙体，计算障碍物到平行墙体的垂直距离并生成标注数据
   * @param walls - 墙体实体数组
   */
  protected _computeParallelWallDimension(walls: WallEntity[]): void;

  /**
   * 验证尺寸值是否合法（由基类定义）
   * @param value - 待验证的数值
   * @returns 如果合法返回true，否则返回false
   */
  protected _isLegalValue(value: number): boolean;
}

/**
 * 全局HSCore工具类型声明（假设存在于全局作用域）
 */
declare global {
  namespace HSCore {
    namespace Util {
      namespace Math {
        /**
         * 判断两个数值是否在容差范围内近似相等
         */
        function nearlyEquals(a: number, b: number, tolerance: number): boolean;
        
        /**
         * 获取点到线段的垂直投影点
         */
        function getPerpendicularIntersect(
          point: { x: number; y: number },
          lineStart: { x: number; y: number },
          lineEnd: { x: number; y: number }
        ): { x: number; y: number };
        
        /**
         * 判断点是否在线段上
         */
        function isPointInLineSegment(
          point: { x: number; y: number },
          lineStart: { x: number; y: number },
          lineEnd: { x: number; y: number }
        ): boolean;
        
        /**
         * 判断两个点是否为同一点
         */
        function isSamePoint(
          point1: { x: number; y: number },
          point2: { x: number; y: number }
        ): boolean;
      }
    }
  }
}