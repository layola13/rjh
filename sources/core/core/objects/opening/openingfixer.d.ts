/**
 * OpeningFixer - 修复墙体开口(门窗洞口)的位置、尺寸、旋转等属性
 * 确保开口与墙体曲线、路径对齐，并修复相似开口的尺寸偏差
 */

import { Wall } from './Wall';
import { MathUtil, Vector2, Matrix3, PeriodInterval } from './MathUtil';
import { OpeningHelper } from './OpeningHelper';
import { TgWallUtil } from './TgWallUtil';

/**
 * 墙体路径接口
 */
interface WallPath {
  getStartPt(): Vector2;
  getLength(): number;
}

/**
 * 墙体曲线接口
 */
interface WallCurve {
  getProjectedPtBy(point: Vector2 | WallOpening): Vector2;
  containsPoint(point: Vector2, tolerance?: number): boolean;
  getParamAt(opening: WallOpening): number;
  getTangentAt(param: number): Vector2;
}

/**
 * 墙体开口基础接口
 */
interface WallOpening {
  /** 宿主墙体 */
  host: Wall;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** X方向尺寸 */
  XSize: number;
  /** 厚度 */
  thickness: number;
  /** 旋转角度(度) */
  rotation: number;
  /** X方向长度 */
  XLength: number;
  /** X方向缩放 */
  XScale: number;
  /** 轮廓SVG数据 */
  profile?: string;
  
  /** 是否支持参数化修改 */
  supportPM(): boolean;
  /** 通过参数化修改更新 */
  updateByPM(xSize: number): void;
  /** 刷新前视图轮廓 */
  refreshFrontProfile(svg: string): void;
}

/**
 * 墙体接口
 */
interface Wall {
  /** 墙体中心曲线 */
  curve: WallCurve;
  /** 墙体宽度 */
  width: number;
  /** 左侧路径 */
  leftPaths: WallPath[];
  /** 右侧路径 */
  rightPaths: WallPath[];
  /** 墙体路径 */
  path: WallPath[];
  /** 变换旋转角度 */
  transRotation: number;
  
  /** 是否为弧形墙 */
  isArcWall(): boolean;
}

/**
 * 二维轮廓数据
 */
interface Profile2D {
  outer: any[];
  holes: any[];
}

/** 位置偏差容差(10^-4) */
const POSITION_TOLERANCE = 1e-4;

/** 精确容差(10^-9) */
const EXACT_TOLERANCE = 1e-9;

/**
 * 墙体开口修复器
 * 自动修复开口的位置、尺寸、旋转等属性，确保与墙体几何一致
 */
export class OpeningFixer {
  /** 单例实例 */
  static readonly ins = new OpeningFixer();

  private constructor() {}

  /**
   * 修复所有墙体开口
   * @param contents - 待修复的内容对象数组
   */
  fixOpenings(contents: any[]): void {
    // 过滤出所有墙体开口
    const allOpenings = contents.filter((content) => 
      HSCore.Util.Content.isWallOpening(content)
    ) as WallOpening[];

    // 过滤出有效的墙体开口(在墙体范围内)
    const validOpenings = allOpenings.filter((opening) => {
      if (opening.host instanceof Wall) {
        const projectedPoint = opening.host.curve.getProjectedPtBy(opening);
        if (
          opening.host.curve.containsPoint(projectedPoint) &&
          MathUtil.isNearlySmallerOrEqual(
            projectedPoint.distanceTo(opening as any),
            opening.host.width / 2
          )
        ) {
          return true;
        }
      }
      return false;
    });

    // 修复相似开口的尺寸偏差
    this._fixSimilarOpenings(validOpenings);

    // 依次修复每个开口
    validOpenings.forEach((opening) => {
      this._fixXSize(opening);
      this._fixPositionToWallCurve(opening);
      this._fixRotation(opening);
      this._fixPositionToWallPath(opening);
    });

    // 修复所有开口的轮廓
    allOpenings.forEach((opening) => this._fixOpeningProfile(opening));
  }

  /**
   * 修复开口位置使其对齐到墙体中心曲线
   * @param opening - 待修复的开口
   */
  private _fixPositionToWallCurve(opening: WallOpening): void {
    const wall = opening.host;
    
    // 壁龛不需要修复
    if (HSCore.Util.Content.isWallNiche(opening)) {
      return;
    }

    const openingPosition = new Vector2(opening as any);
    
    // 如果不在曲线上，投影到曲线
    if (!wall.curve.containsPoint(openingPosition, EXACT_TOLERANCE)) {
      const projectedPoint = wall.curve.getProjectedPtBy(openingPosition);
      opening.x = projectedPoint.x;
      opening.y = projectedPoint.y;
    }
  }

  /**
   * 修复开口X方向尺寸，使其与墙体路径长度对齐
   * @param opening - 待修复的开口
   */
  private _fixXSize(opening: WallOpening): void {
    const wall = opening.host;
    
    // 壁龛和弧形墙不需要修复
    if (HSCore.Util.Content.isWallNiche(opening) || wall.isArcWall()) {
      return;
    }

    const leftPaths = wall.leftPaths;
    const rightPaths = wall.rightPaths;

    // 计算左右路径总长度
    const leftTotalLength = leftPaths.reduce(
      (sum, path) => sum + path.getLength(),
      0
    );
    const rightTotalLength = rightPaths.reduce(
      (sum, path) => sum + path.getLength(),
      0
    );

    let targetSize: number | undefined;
    const currentXSize = opening.XSize;

    // 检查是否近似等于左侧长度
    if (
      MathUtil.isNearlyEqual(currentXSize, leftTotalLength, POSITION_TOLERANCE) &&
      !MathUtil.isNearlyEqual(currentXSize, leftTotalLength, EXACT_TOLERANCE)
    ) {
      targetSize = leftTotalLength;
    }
    // 检查是否近似等于右侧长度
    else if (
      MathUtil.isNearlyEqual(currentXSize, rightTotalLength, POSITION_TOLERANCE) &&
      !MathUtil.isNearlyEqual(currentXSize, rightTotalLength, EXACT_TOLERANCE)
    ) {
      targetSize = rightTotalLength;
    }

    if (targetSize !== undefined) {
      this._editOpeningXSize(opening, targetSize);
    }
  }

  /**
   * 修复开口位置使其对齐到墙体路径顶点
   * @param opening - 待修复的开口
   */
  private _fixPositionToWallPath(opening: WallOpening): void {
    // 壁龛不需要修复
    if (HSCore.Util.Content.isWallNiche(opening)) {
      return;
    }

    const wall = opening.host;
    let openingPosition = new Vector2(opening as any);

    // 仅处理直墙
    if (!wall.isArcWall()) {
      openingPosition = new Vector2(opening as any);

      // 计算开口的四个角点
      const halfXSize = Vector2.X(opening.XSize / 2);
      const halfThickness = Vector2.Y(opening.thickness / 2);
      const corners = [
        openingPosition.added(halfXSize).add(halfThickness),
        openingPosition.added(halfXSize).subtract(halfThickness),
        openingPosition.subtracted(halfXSize).subtract(halfXSize),
        openingPosition.subtracted(halfXSize).add(halfThickness),
      ];

      // 应用旋转变换
      const rotationMatrix = Matrix3.makeRotate(
        openingPosition,
        MathUtil.degreeToRadius(-opening.rotation)
      );
      corners.forEach((corner) => corner.transform(rotationMatrix));

      // 查找与墙体路径顶点近似重合的角点
      const wallPathStartPoints = wall.path.map((path) => path.getStartPt());
      let offset: Vector2 | undefined;

      wallPathStartPoints.forEach((startPoint) => {
        if (!offset) {
          const matchingCorner = corners.find(
            (corner) =>
              corner.equals(startPoint, POSITION_TOLERANCE) &&
              !corner.equals(startPoint, EXACT_TOLERANCE)
          );
          if (matchingCorner) {
            offset = startPoint.subtracted(matchingCorner);
          }
        }
      });

      // 应用偏移
      if (offset) {
        const newPosition = openingPosition.added(offset);
        opening.x = newPosition.x;
        opening.y = newPosition.y;
      }
    }
  }

  /**
   * 修复开口轮廓，简化并规范化SVG数据
   * @param opening - 待修复的开口
   * @returns 是否成功修复
   */
  private _fixOpeningProfile(opening: WallOpening): boolean {
    const profileSvg = opening.profile;
    if (!profileSvg) {
      return false;
    }

    // 解析SVG曲线
    let curves = OpeningHelper.getCurvesBySvg(profileSvg);
    
    // 简化曲线
    const simplified = TgWallUtil.PTInstance().simplfy([curves]);
    if (!simplified[0]?.[0]?.length) {
      return false;
    }
    curves = simplified[0][0];

    // 获取前视图轮廓
    const frontProfile = new OpeningHelper(opening).getFrontProfile();

    // 检查是否相同，相同则使用前视图轮廓
    const isSameProfile = TgWallUtil.isSame2D(
      [{ outer: frontProfile, holes: [] }],
      [{ outer: curves, holes: [] }]
    );
    if (isSameProfile) {
      curves = frontProfile;
    }

    if (!curves.length) {
      return false;
    }

    // 重新生成SVG并更新
    const newSvg = OpeningHelper.getSvgByCurves(curves);
    opening.refreshFrontProfile(newSvg);
    return true;
  }

  /**
   * 修复开口旋转角度
   * - 弧形墙：根据切线方向计算角度
   * - 直墙：与墙体变换旋转对齐
   * @param opening - 待修复的开口
   */
  private _fixRotation(opening: WallOpening): void {
    const wall = opening.host;

    if (wall.isArcWall()) {
      // 弧形墙：根据曲线切线计算旋转角度
      const param = wall.curve.getParamAt(opening);
      const tangent = wall.curve.getTangentAt(param);
      
      let angle1 = (180 * tangent.angleTo(Vector2.X())) / Math.PI;
      let angle2 = angle1 + 180;

      // 规范化到 [-180, 180)
      angle1 = PeriodInterval.RegularizeParam(angle1, 360, -180);
      if (MathUtil.isNearlyEqual(angle1, -180)) {
        angle1 = 0;
      }

      angle2 = PeriodInterval.RegularizeParam(angle2, 360, -180);
      if (MathUtil.isNearlyEqual(angle2, -180)) {
        angle2 = 0;
      }

      // 选择最接近当前旋转的角度
      const closestAngle = [angle1, angle2].sort(
        (a, b) => Math.abs(a - opening.rotation) - Math.abs(b - opening.rotation)
      )[0];

      opening.rotation = closestAngle;
    } else {
      // 直墙：对齐到墙体变换旋转
      if (
        MathUtil.isNearlyEqual(opening.rotation, wall.transRotation, POSITION_TOLERANCE) &&
        !MathUtil.isNearlyEqual(opening.rotation, wall.transRotation, EXACT_TOLERANCE)
      ) {
        opening.rotation = wall.transRotation;
      }
    }
  }

  /**
   * 修复相似开口的尺寸偏差
   * 相似开口定义：位置相同且X尺寸近似相等
   * @param openings - 待修复的开口数组
   */
  private _fixSimilarOpenings(openings: WallOpening[]): void {
    const workList = openings.slice();

    for (let i = 0; i < workList.length; i++) {
      const baseOpening = workList[i];
      const basePosition = new Vector2(baseOpening as any);

      for (let j = i + 1; j < workList.length; j++) {
        const compareOpening = workList[j];
        const comparePosition = new Vector2(compareOpening as any);

        // 检查位置是否相同且尺寸近似
        if (
          comparePosition.equals(basePosition, POSITION_TOLERANCE) &&
          MathUtil.isNearlyEqual(compareOpening.XSize, baseOpening.XSize, POSITION_TOLERANCE) &&
          !MathUtil.isNearlyEqual(compareOpening.XSize, baseOpening.XSize, EXACT_TOLERANCE)
        ) {
          // 统一尺寸
          this._editOpeningXSize(compareOpening, baseOpening.XSize);
          workList.splice(j, 1);
          j -= 1;
        }
      }
    }
  }

  /**
   * 编辑开口X方向尺寸
   * - 支持参数化：调用updateByPM
   * - 不支持参数化：修改XScale缩放比例
   * @param opening - 待修复的开口
   * @param targetXSize - 目标X尺寸
   */
  private _editOpeningXSize(opening: WallOpening, targetXSize: number): void {
    if (opening.supportPM()) {
      opening.updateByPM(targetXSize);
    } else {
      opening.XScale = targetXSize / opening.XLength;
    }
  }
}