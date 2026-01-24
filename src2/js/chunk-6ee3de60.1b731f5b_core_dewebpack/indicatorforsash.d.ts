import { Point, Segment, Arc } from './geometry';
import { DrawParams } from './draw-params';
import { EdgeFinder } from './edge-finder';
import { Utils } from './utils';
import { Indicator, WinPolygon, HardwareOnFrame, PushSash } from './base';
import { OpenToward, OpenDirection, CirclePushSashHardwareManager } from './hardware';

/**
 * 窗扇指示器的形状数据
 */
interface IndicatorShape {
  /** 多边形路径 */
  poly: WinPolygon;
  /** 是否使用虚线渲染 */
  dashed: boolean;
}

/**
 * 窗扇开启方向指示器
 * 用于在图纸上绘制窗扇的开启方向标识线
 */
export class IndicatorForSash extends Indicator {
  /** 硬件管理器实例 */
  private readonly manager: CirclePushSashHardwareManager;

  /**
   * 构造函数
   * @param manager - 硬件管理器实例
   */
  constructor(manager: CirclePushSashHardwareManager) {
    super(manager);
    this.manager = manager;
  }

  /**
   * 判断推拉指示器是否应使用虚线
   * 根据欧洲标准和开启方向决定
   */
  private get pushableIndicatorDashed(): boolean {
    const isOutward = this.manager.openToward === OpenToward.Outward;
    return DrawParams.Ins.reverseOpenTowardIndicator ? !isOutward : isOutward;
  }

  /**
   * 创建指示器形状
   * 根据不同的开启方式创建对应的指示线
   */
  createShapes(): this {
    // 悬浮开启方式
    if (this.manager.openDirection === OpenDirection.Float) {
      this.createFloatIndicator();
      return this;
    }

    // 旋转开启方式
    if (this.manager.openDirection.indexOf('Rotate') !== -1) {
      this.createRotateIndicator();
      return this;
    }

    const hingeEdgeIndex = this.manager.hingeEdgeIndex;
    const handleEdgeIndex = this.manager.handleEdgeIndex;

    // 圆形推拉窗或无开启方向
    if (
      this.manager instanceof CirclePushSashHardwareManager ||
      this.manager.openDirection === OpenDirection.None
    ) {
      return this;
    }

    let hingeIndex = hingeEdgeIndex;
    let handleIndex = handleEdgeIndex;

    // 计算合适的铰链和把手边索引
    if (hingeIndex === -1 && handleIndex === -1) {
      // 两者都未定义，根据开启方向查找
      hingeIndex = EdgeFinder.Instance.findIndex(
        HardwareOnFrame.directionByOpenDirection(this.manager.openDirection),
        this.polygon
      );
      handleIndex = EdgeFinder.Instance.findIndex(
        HardwareOnFrame.directionByOpenDirection(this.manager.openDirection, true),
        this.polygon
      );
    } else if (
      this.manager.sash instanceof PushSash &&
      this.manager.sash.slide !== OpenDirection.None
    ) {
      // 推拉窗且有滑动方向
      hingeIndex = EdgeFinder.Instance.findIndex(
        HardwareOnFrame.directionByOpenDirection(this.manager.openDirection),
        this.polygon
      );
      handleIndex = EdgeFinder.Instance.findIndex(
        HardwareOnFrame.directionByOpenDirection(this.manager.openDirection, true),
        this.polygon
      );
    } else if (hingeIndex === -1 && handleIndex !== -1) {
      // 只有把手索引，计算铰链索引
      const properHingeIndex = this.manager.properHingeIndexByHandle(handleIndex);
      if (properHingeIndex !== undefined) {
        hingeIndex = properHingeIndex;
      }
    } else if (hingeIndex !== -1 && handleIndex === -1) {
      // 只有铰链索引，计算把手索引
      const properHandleIndex = this.manager.properHandleIndexByHinge(hingeIndex);
      if (properHandleIndex !== undefined) {
        handleIndex = properHandleIndex;
      }
    }

    // 创建指示器
    if (hingeIndex !== -1 && handleIndex !== -1) {
      const hingeEdge = this.polygon.edge(hingeIndex);
      const handleEdge = this.polygon.edge(handleIndex);
      this.createNormalIndicator(hingeEdge, handleEdge);
      this.createAdditionalIndicator(hingeEdge, handleEdge);
    }

    return this;
  }

  /**
   * 创建标准指示器（基本开启线）
   * @param hingeEdge - 铰链边
   * @param handleEdge - 把手边
   */
  private createNormalIndicator(hingeEdge: Segment, handleEdge: Segment): void {
    // 根据欧洲标准决定固定边和活动边
    const fixedEdge = DrawParams.Ins.europeanStandard ? handleEdge : hingeEdge;
    const movableEdge = DrawParams.Ins.europeanStandard ? hingeEdge : handleEdge;

    const middlePoint = fixedEdge.middle();

    // 计算活动边的端点，如果与固定边相交则向内缩进
    const endpoints = [movableEdge.start, movableEdge.end].map((point) => {
      if (point.equalTo(fixedEdge.start) || point.equalTo(fixedEdge.end)) {
        const offset = (movableEdge.length / 3) * (point.equalTo(fixedEdge.start) ? -1 : 1);
        return Utils.edgeDirPt(movableEdge, offset, point);
      }
      return point;
    });

    // 构建指示线多边形
    const indicatorPolygon = new WinPolygon();
    indicatorPolygon.add(Segment.segment(endpoints[0], middlePoint));
    indicatorPolygon.add(Segment.segment(middlePoint, endpoints[1]));
    indicatorPolygon.done();

    this.shapes[this.shapes.length] = {
      poly: indicatorPolygon,
      dashed: this.pushableIndicatorDashed,
    };
  }

  /**
   * 创建附加指示器（联动上下开启的辅助线）
   * @param hingeEdge - 铰链边
   * @param handleEdge - 把手边
   */
  private createAdditionalIndicator(hingeEdge: Segment, handleEdge: Segment): void {
    const edges = this.polygon.edges;

    // 仅处理矩形窗且有联动开启方向
    if (
      edges.length !== 4 ||
      edges.some((edge) => edge instanceof Arc) ||
      this.manager.openDirection.indexOf('with') === -1
    ) {
      return;
    }

    const hingeTop = this.topOfEdge(hingeEdge);
    const hingeBottom = this.bottomOfEdge(hingeEdge);
    const handleTop = this.topOfEdge(handleEdge);
    const handleBottom = this.bottomOfEdge(handleEdge);

    // 向上联动的辅助线生成函数
    const createUpwardLines = (): Segment[] => {
      const midPoint = Segment.segment(hingeTop, handleTop).middle();
      return [
        Segment.segment(hingeBottom, midPoint),
        Segment.segment(midPoint, handleBottom),
      ];
    };

    // 向下联动的辅助线生成函数
    const createDownwardLines = (): Segment[] => {
      const midPoint = Segment.segment(handleBottom, hingeBottom).middle();
      return [
        Segment.segment(hingeTop, midPoint),
        Segment.segment(midPoint, handleTop),
      ];
    };

    let additionalLines: Segment[] = [];

    if (this.manager.openDirection.indexOf('with_up') > -1) {
      additionalLines = DrawParams.Ins.europeanStandard
        ? createDownwardLines()
        : createUpwardLines();
    } else if (this.manager.openDirection.indexOf('with_down') > -1) {
      additionalLines = DrawParams.Ins.europeanStandard
        ? createUpwardLines()
        : createDownwardLines();
    }

    if (additionalLines.length > 0) {
      const additionalPolygon = new WinPolygon();
      additionalLines.forEach((line) => additionalPolygon.add(line));
      additionalPolygon.done();

      this.shapes[this.shapes.length] = {
        poly: additionalPolygon,
        dashed: this.pushableIndicatorDashed,
      };
    }
  }

  /**
   * 创建悬浮窗指示器（对角交叉线）
   */
  private createFloatIndicator(): void {
    const boundingBox = this.polygon.box;
    const polygon = new WinPolygon();

    const bottomLeft = Point.point(boundingBox.xmin, boundingBox.ymin);
    const topRight = Point.point(boundingBox.xmax, boundingBox.ymax);
    const topLeft = Point.point(boundingBox.xmin, boundingBox.ymax);
    const bottomRight = Point.point(boundingBox.xmax, boundingBox.ymin);

    polygon.add(Segment.segment(bottomLeft, topRight));
    polygon.add(Segment.segment(topRight, topLeft));
    polygon.add(Segment.segment(topLeft, bottomRight));
    polygon.done();

    this.shapes.push({
      poly: polygon,
      dashed: this.pushableIndicatorDashed,
    });
  }

  /**
   * 创建旋转窗指示器
   */
  private createRotateIndicator(): void {
    const shouldReverse = !!DrawParams.Ins.reverseOpenTowardIndicator;
    const boundingBox = this.polygon.box;
    const center = boundingBox.center;

    const leftCenter = Point.point(boundingBox.xmin, center.y);
    const rightCenter = Point.point(boundingBox.xmax, center.y);
    const topCenter = Point.point(center.x, boundingBox.ymax);
    const bottomCenter = Point.point(center.x, boundingBox.ymin);

    // 实线部分
    const solidPolygon = new WinPolygon();
    if (this.manager.openDirection === OpenDirection.Left_Rotate) {
      solidPolygon.add(Segment.segment(bottomCenter, rightCenter));
      solidPolygon.add(Segment.segment(rightCenter, topCenter));
    } else if (this.manager.openDirection === OpenDirection.Right_Rotate) {
      solidPolygon.add(Segment.segment(bottomCenter, leftCenter));
      solidPolygon.add(Segment.segment(leftCenter, topCenter));
    } else if (this.manager.openDirection === OpenDirection.Up_Rotate) {
      solidPolygon.add(Segment.segment(leftCenter, topCenter));
      solidPolygon.add(Segment.segment(topCenter, rightCenter));
    } else {
      solidPolygon.add(Segment.segment(leftCenter, bottomCenter));
      solidPolygon.add(Segment.segment(bottomCenter, rightCenter));
    }
    solidPolygon.done();

    this.shapes.push({
      poly: solidPolygon,
      dashed: shouldReverse,
    });

    // 虚线部分
    const dashedPolygon = new WinPolygon();
    if (this.manager.openDirection === OpenDirection.Left_Rotate) {
      dashedPolygon.add(Segment.segment(bottomCenter, leftCenter));
      dashedPolygon.add(Segment.segment(leftCenter, topCenter));
    } else if (this.manager.openDirection === OpenDirection.Right_Rotate) {
      dashedPolygon.add(Segment.segment(bottomCenter, rightCenter));
      dashedPolygon.add(Segment.segment(rightCenter, topCenter));
    } else if (this.manager.openDirection === OpenDirection.Up_Rotate) {
      dashedPolygon.add(Segment.segment(leftCenter, bottomCenter));
      dashedPolygon.add(Segment.segment(bottomCenter, rightCenter));
    } else {
      dashedPolygon.add(Segment.segment(leftCenter, topCenter));
      dashedPolygon.add(Segment.segment(topCenter, rightCenter));
    }
    dashedPolygon.done();

    this.shapes.push({
      poly: dashedPolygon,
      dashed: !shouldReverse,
    });
  }

  /**
   * 获取边的顶部端点（Y值较小的点）
   * @param edge - 边对象
   */
  private topOfEdge(edge: Segment): Point {
    return edge.start.y > edge.end.y ? edge.end : edge.start;
  }

  /**
   * 获取边的底部端点（Y值较大的点）
   * @param edge - 边对象
   */
  private bottomOfEdge(edge: Segment): Point {
    return edge.start.y > edge.end.y ? edge.start : edge.end;
  }
}