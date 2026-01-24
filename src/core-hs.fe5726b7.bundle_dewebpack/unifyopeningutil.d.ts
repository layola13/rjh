/**
 * 统一开口工具模块
 * 提供用于处理建筑构件（墙体、定制结构）开口的实用功能
 * @module UnifyOpeningUtil
 */

import { NCustomizedStructure } from './73858';
import { FaceHoleType } from './82625';
import { Wall } from './41464';
import { Interval } from './55256';

/**
 * 檐口切割信息
 */
interface CorniceCutterInfo {
  /** 切割路径曲线数组 */
  cutPath: Curve[];
  /** 替换的扫掠曲线（可选） */
  replaceSweepCurves: Curve[] | undefined;
}

/**
 * 三维点坐标
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 曲线接口
 */
interface Curve {
  /**
   * 获取曲线起点
   */
  getStartPt(): Point3D;
  
  /**
   * 获取曲线终点
   */
  getEndPt(): Point3D;
  
  /**
   * 获取曲线中点
   */
  getMidPt(): Point3D;
  
  /**
   * 获取起点切线方向
   */
  getStartTangent(): Vector3D;
}

/**
 * 三维向量接口
 */
interface Vector3D {
  x: number;
  y: number;
  z: number;
  
  /**
   * 判断是否与另一向量垂直
   */
  isPerpendicular(other: Vector3D): boolean;
}

/**
 * 表面对象接口
 */
interface SurfaceObject {
  surface: Surface;
}

/**
 * 表面接口
 */
interface Surface {
  /**
   * 判断表面是否包含指定曲线
   * @param curve - 待检测曲线
   * @param tolerance - 容差值
   */
  containsCurve(curve: Curve, tolerance: number): boolean;
}

/**
 * 面孔洞接口
 */
interface FaceHole {
  /** 孔洞类型 */
  type: FaceHoleType;
  /** 外轮廓曲线数组 */
  outer: Curve[];
}

/**
 * 构件实体接口
 */
interface ComponentEntity {
  /** 表面对象 */
  surfaceObj: SurfaceObject;
  /** 孔洞数组 */
  holes: FaceHole[];
  
  /**
   * 获取主构件对象
   */
  getMaster(): NCustomizedStructure | Wall | unknown;
}

/**
 * 主构件基类（墙体或定制结构）
 */
interface MasterComponent {
  /** 构件内容数组 */
  contents: unknown[];
}

/**
 * 统一开口处理工具类
 * 提供获取檐口切割信息等功能
 */
export const UnifyOpeningUtil = {
  /**
   * 获取檐口切割器信息
   * 根据构件实体、内容索引和曲线数组，计算出用于切割的路径信息
   * 
   * @param entity - 构件实体对象
   * @param contentIndex - 内容索引
   * @param curves - 二维曲线数组
   * @returns 包含切割路径和替换曲线的信息对象
   */
  getCorniceCutterInfo(
    entity: ComponentEntity,
    contentIndex: number,
    curves: Curve[][]
  ): CorniceCutterInfo {
    const SURFACE_TOLERANCE = 1e-4;
    const INTERVAL_MIN_LENGTH = 1e-5;
    const VERTICAL_VECTOR: Point3D = { x: 0, y: 0, z: 1 };

    // 获取主构件对象
    const master = entity.getMaster();

    // 验证主构件类型和内容有效性
    if (
      !(master instanceof NCustomizedStructure || master instanceof Wall) ||
      !master.contents[contentIndex]
    ) {
      return {
        cutPath: [],
        replaceSweepCurves: undefined
      };
    }

    // 查找符合条件的基准曲线：
    // 1. 曲线被表面包含（容差内）
    // 2. 起点切线垂直于Z轴
    const baseCurve = curves.flat().find((curve) => {
      const isContainedInSurface = entity.surfaceObj.surface.containsCurve(
        curve,
        SURFACE_TOLERANCE
      );
      const isStartTangentVertical = curve
        .getStartTangent()
        .isPerpendicular(VERTICAL_VECTOR);

      return isContainedInSurface && isStartTangentVertical;
    });

    if (!baseCurve) {
      return {
        cutPath: [],
        replaceSweepCurves: undefined
      };
    }

    // 获取基准曲线中点作为参考点
    const midPoint = baseCurve.getMidPt();

    // 查找包含该参考点的开口孔洞
    const matchingHole = entity.holes.find((hole) => {
      if (hole.type !== FaceHoleType.OpeningHole) {
        return false;
      }

      // 检查孔洞的外轮廓是否包含参考点
      return hole.outer.some((outerCurve) => {
        const xCoords = [outerCurve.getStartPt().x, outerCurve.getEndPt().x];
        const yCoords = [outerCurve.getStartPt().y, outerCurve.getEndPt().y];

        xCoords.sort((a, b) => a - b);
        yCoords.sort((a, b) => a - b);

        const xInterval = new Interval(xCoords[0], xCoords[1]);
        const yInterval = new Interval(yCoords[0], yCoords[1]);

        const xContainsMidPoint =
          xInterval.getLength() > INTERVAL_MIN_LENGTH &&
          xInterval.containsPoint(midPoint.x);

        const yContainsMidPoint =
          yInterval.getLength() > INTERVAL_MIN_LENGTH &&
          yInterval.containsPoint(midPoint.y);

        return xContainsMidPoint || yContainsMidPoint;
      });
    });

    // 返回匹配孔洞的外轮廓作为切割路径
    if (matchingHole) {
      return {
        cutPath: matchingHole.outer,
        replaceSweepCurves: undefined
      };
    }

    return {
      cutPath: [],
      replaceSweepCurves: undefined
    };
  }
};