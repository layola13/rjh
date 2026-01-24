import Point from './Point';
import { Segment } from './Segment';
import { Tool, ToolType } from './Tool';
import { Utils } from './Utils';
import { Direction } from './Direction';
import { Frame } from './Frame';
import { Connector } from './Connector';
import { Shape } from './Shape';
import { View } from './View';
import { DragRobot } from './DragRobot';

/**
 * 捕捉选项接口
 * 描述边缘捕捉时的相关信息
 */
interface SnapOption {
  /** 源边缘 */
  edgeFrom: Segment;
  /** 捕捉目标对象 */
  snapTarget: Shape | Connector;
  /** 捕捉到的边缘 */
  snapEdge: Segment;
  /** 源点（可选） */
  ptFrom?: Point;
  /** 捕捉点（可选） */
  snapPt?: Point;
  /** 捕捉距离 */
  distance: number;
}

/**
 * 捕捉点对信息
 */
interface SnapPoints {
  /** 源点 */
  ptFrom?: Point;
  /** 捕捉点 */
  snapPt?: Point;
}

/**
 * 编辑拖拽机器人工具
 * 用于在编辑模式下拖拽机器人对象，支持智能捕捉功能
 */
export class EditDragRobotTool extends Tool {
  /** 视图引用 */
  private readonly view: View;
  
  /** 上一个鼠标位置点 */
  private prevPt: Point;
  
  /** 捕捉距离阈值（像素） */
  private readonly snapDistance: number = 80;
  
  /** 当前捕捉选项 */
  private currSnapOption?: SnapOption;

  /**
   * 构造函数
   * @param view - 视图对象
   */
  constructor(view: View) {
    super(ToolType.editDragRobot, view);
    this.view = view;
    this.prevPt = new Point();
  }

  /**
   * 获取拖拽机器人对象
   */
  get rob(): DragRobot {
    return this.view.dragRob;
  }

  /**
   * 获取宿主形状对象
   */
  get host(): Shape | undefined {
    return this.rob.hostShape;
  }

  /**
   * 拖拽开始事件处理
   * @param event - 鼠标事件
   */
  dragstart(event: MouseEvent): void {
    super.dragstart(event);
    this.prevPt = this.curPt;
    
    // 如果宿主是Frame，清除角落样式
    if (this.host instanceof Frame) {
      this.host.clearCornerStyle();
    }
  }

  /**
   * 拖拽移动事件处理
   * @param event - 鼠标事件
   */
  dragmove(event: MouseEvent): void {
    super.dragmove(event);
    
    const currentPoint = this.curPt;
    const dragVector = Point.vector(
      currentPoint.x - this.prevPt.x,
      currentPoint.y - this.prevPt.y
    );
    
    // 执行拖拽
    this.rob.drag(dragVector);
    this.prevPt = currentPoint;

    // 如果存在宿主，处理捕捉逻辑
    if (!this.host) {
      return;
    }

    this.hideSnaps();
    this.currSnapOption = undefined;

    // 收集所有可能的捕捉目标（排除自身）
    const allShapes = [
      ...this.view.shapeManager.shapem,
      ...this.view.shapeManager.walls,
      ...this.view.shapeManager.cornerJoiners,
      ...this.view.shapeManager.connectors
    ];
    const snapTargets = allShapes.filter(shape => shape !== this.host);

    // 获取宿主的所有边缘段
    const hostEdges = this.host.polygon.edges.filter(
      (edge): edge is Segment => edge instanceof Segment
    );

    // 为每条边缘计算所有可能的捕捉选项
    const allSnapOptions: SnapOption[] = [];
    hostEdges.forEach(edge => {
      const options = this.snapOptions(edge, snapTargets);
      allSnapOptions.push(...options);
    });

    // 按距离排序，选择最近的捕捉选项
    allSnapOptions.sort((a, b) => a.distance - b.distance);
    const bestSnapOption = allSnapOptions.shift();

    if (bestSnapOption && bestSnapOption.distance <= this.snapDistance) {
      // 显示捕捉辅助线
      this.displaySnap(bestSnapOption.edgeFrom.start, bestSnapOption.edgeFrom.end);
      this.displaySnap(bestSnapOption.snapEdge.start, bestSnapOption.snapEdge.end);
      
      if (bestSnapOption.snapPt) {
        this.displayCircleSnap(bestSnapOption.snapPt);
      }
      
      this.currSnapOption = bestSnapOption;
    }
  }

  /**
   * 鼠标操作完成事件处理
   * @param event - 鼠标事件
   */
  mousedone(event: MouseEvent): void {
    super.mousedone(event);

    // 清除Frame的角落样式
    if (this.host instanceof Frame) {
      this.host.clearCornerStyle();
    }

    this.hideSnaps();

    let cornerConnector: Connector | undefined;

    // 如果存在捕捉选项，执行捕捉
    if (this.currSnapOption) {
      this.snap(this.currSnapOption);
      
      if (this.host instanceof Frame) {
        cornerConnector = this.host.tCornerConnector;
        if (cornerConnector) {
          this.host.tCornerStyle();
        }
      }
    }

    // 刷新墙体和尺寸标注
    this.view.shapeManager.refreshWalls();
    this.refreshDim(cornerConnector);
    this.view.mometoManager.checkPoint();
  }

  /**
   * 刷新尺寸标注
   * @param cornerConnector - 角落连接器（可选）
   */
  private refreshDim(cornerConnector?: Connector): void {
    // 更新所有形状的尺寸标注
    this.view.shapeManager.shapem.forEach(shape => {
      shape.dim.updatePoly();
      shape.dim.draw(this.view);
    });

    // 如果存在角落连接器，更新其尺寸标注
    if (cornerConnector) {
      cornerConnector.dimForWidth.position = Direction.Up;
      cornerConnector.updatePoly();
      cornerConnector.draw(this.view);
    }

    this.view.shapeManager.refreshTotalWidth();
  }

  /**
   * 执行捕捉操作
   * @param option - 捕捉选项
   */
  private snap(option: SnapOption): void {
    if (option.ptFrom && option.snapPt) {
      // 点对点捕捉
      const snapVector = Point.vector(option.ptFrom, option.snapPt);
      this.rob.drag(snapVector);
    } else {
      // 边缘对边缘捕捉
      const [, closestSegment] = option.edgeFrom.distanceTo(option.snapEdge);
      const snapVector = Point.vector(closestSegment.start, closestSegment.end);
      this.rob.drag(snapVector);
    }
  }

  /**
   * 计算给定边缘相对于目标列表的所有捕捉选项
   * @param edge - 源边缘
   * @param targets - 捕捉目标列表
   * @returns 捕捉选项数组
   */
  private snapOptions(edge: Segment, targets: Array<Shape | Connector>): SnapOption[] {
    const options: SnapOption[] = [];

    targets.forEach(target => {
      const targetEdges = target.polygon.edges;

      // 特殊处理Connector的T角边缘
      if (target instanceof Connector) {
        const tCornerEdge = target.tCornerEdge;
        
        if (Utils.isParallel(tCornerEdge, edge) && 
            target.polygon.intersect(edge).length > 0) {
          const snapPoints = this.tCornerSnapPt(edge, tCornerEdge);
          options.push({
            edgeFrom: edge,
            snapTarget: target,
            snapEdge: target.tCornerEdge,
            ...snapPoints,
            distance: 0
          });
          return;
        }
      }

      // 处理普通边缘
      targetEdges.forEach(targetEdge => {
        if (targetEdge instanceof Segment && Utils.isParallel(targetEdge, edge)) {
          const snapPoints = this.findSnapPt(edge, targetEdge);
          const [distance] = edge.distanceTo(targetEdge);
          
          options.push({
            edgeFrom: edge,
            snapTarget: target,
            snapEdge: targetEdge,
            ...snapPoints,
            distance
          });
        }
      });
    });

    return options;
  }

  /**
   * 计算T角的捕捉点
   * @param edgeFrom - 源边缘
   * @param tCornerEdge - T角边缘
   * @returns 捕捉点对
   */
  private tCornerSnapPt(edgeFrom: Segment, tCornerEdge: Segment): SnapPoints {
    const fromPoints = [edgeFrom.start, edgeFrom.end];
    const toPoints = [tCornerEdge.start, tCornerEdge.end];

    // 按Y坐标排序，选择最上方的点
    const sortedFromPoints = fromPoints.sort((a, b) => a.y - b.y);
    const sortedToPoints = toPoints.sort((a, b) => a.y - b.y);

    return {
      ptFrom: sortedFromPoints[0],
      snapPt: sortedToPoints[0]
    };
  }

  /**
   * 查找两条边缘之间的最佳捕捉点对
   * @param edgeFrom - 源边缘
   * @param edgeTo - 目标边缘
   * @returns 捕捉点对
   */
  private findSnapPt(edgeFrom: Segment, edgeTo: Segment): SnapPoints {
    // 计算所有可能的点对连接段
    const candidateSegments = [
      Segment.segment(edgeFrom.start, edgeTo.start),
      Segment.segment(edgeFrom.start, edgeTo.end),
      Segment.segment(edgeFrom.end, edgeTo.start),
      Segment.segment(edgeFrom.end, edgeTo.end)
    ];

    // 按长度排序，选择最短的
    candidateSegments.sort((a, b) => a.length - b.length);
    const shortestSegment = candidateSegments[0];

    let ptFrom: Point | undefined;
    let snapPt: Point | undefined;

    if (shortestSegment && shortestSegment.length < this.snapDistance) {
      ptFrom = shortestSegment.start;
      snapPt = shortestSegment.end;
    }

    return { ptFrom, snapPt };
  }

  /**
   * 显示捕捉辅助线
   * @param start - 起点
   * @param end - 终点
   */
  private displaySnap(start: Point, end: Point): void {
    // 实现由基类或视图提供
  }

  /**
   * 显示圆形捕捉点
   * @param point - 捕捉点
   */
  private displayCircleSnap(point: Point): void {
    // 实现由基类或视图提供
  }

  /**
   * 隐藏所有捕捉辅助图形
   */
  private hideSnaps(): void {
    // 实现由基类或视图提供
  }
}