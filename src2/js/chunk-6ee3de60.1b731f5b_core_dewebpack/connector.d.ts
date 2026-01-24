/**
 * 连接器模块
 * 用于在窗框之间创建和管理连接器组件
 */

import { Vector, Segment, Line, Utils as GeometryUtils } from '@/geometry';
import { WinPolygon, ShapeType } from '@/shapes';
import { Couple, CoupleSettings } from '@/components';
import { Utils } from '@/utils';
import { ToolType } from '@/tools';
import { PolyParser } from '@/parsers';
import { ConnectorRobot } from '@/robots';
import { Direction, FrameUtil } from '@/frame-utils';
import { EventType } from '@/events';
import type { View } from '@/view';
import type { ColorManager } from '@/color-manager';
import type { Dimension } from '@/dimension';

/**
 * 连接器序列化数据接口
 */
interface ConnectorData {
  /** 唯一标识符 */
  uid?: number;
  /** 连接器尺寸 */
  size?: number;
  /** 颜色管理器数据 */
  cm: unknown;
  /** 多边形数据 */
  polygon: unknown;
  /** 宽度尺寸标注数据 */
  dimW?: unknown;
  /** 螺丝数量 */
  st?: number;
  /** 自定义属性 */
  attrs?: Record<string, unknown>;
}

/**
 * 连接组件接口
 */
interface ConnectedComponent {
  /** 组件对应的框架 */
  frame: { id: string };
  /** 平移组件 */
  translate(offset: Vector): void;
}

/**
 * 角连接器接口
 */
interface CornerJoiner {
  /** 倾斜框架 */
  skewFrame(view: View): void;
}

/**
 * 连接器类
 * 继承自Couple基类,用于在框架之间创建物理连接
 */
export class Connector extends Couple {
  /** 视图引用 */
  private view: View;
  
  /** 连接器尺寸 */
  private size: number;
  
  /** 连接器机器人辅助工具 */
  private robot?: ConnectorRobot;
  
  /** 颜色管理器 */
  private colorManager!: ColorManager;
  
  /** 多边形形状 */
  public polygon!: WinPolygon;
  
  /** 形状数组 */
  private shapes: WinPolygon[] = [];
  
  /** 宽度方向尺寸标注 */
  private dimForWidth!: Dimension;
  
  /** 螺丝数量 */
  private screwTimes?: number;
  
  /** 自定义属性 */
  private attrs?: Record<string, unknown>;
  
  /** 唯一标识符 */
  public uid: number = 0;

  /**
   * 构造函数
   * @param polygon - 连接器的多边形形状
   * @param view - 视图实例
   */
  constructor(polygon: WinPolygon, view: View) {
    super(polygon, ShapeType.Connector, view);
    this.view = view;
    this.size = view.params.connector;
  }

  /**
   * 轮廓尺寸(兼容属性)
   */
  get profileSize(): number {
    return this.size;
  }

  set profileSize(value: number) {
    this.size = value;
  }

  /**
   * 工具类型
   */
  get toolType(): ToolType {
    return ToolType.editConnector;
  }

  /**
   * 外部边缘数组
   * @returns 返回多边形的第4条和第2条边
   */
  get outerEdges(): Segment[] {
    return [this.shapes[0].edge(3), this.shapes[0].edge(1)];
  }

  /**
   * 中间边缘
   * @returns 连接第1条和第3条边中点的线段
   */
  get middleEdge(): Segment {
    return GeometryUtils.segment(
      this.shapes[0].edge(0).middle(),
      this.shapes[0].edge(2).middle()
    );
  }

  /**
   * 中心边缘
   * @returns 第4条边
   */
  get centerEdge(): Segment {
    return this.shapes[0].edge(3);
  }

  /**
   * 所有边缘
   */
  get edges(): Segment[] {
    return this.polygon.edges;
  }

  /**
   * T角边缘
   */
  get tCornerEdge(): Segment {
    return this.middleEdge;
  }

  /**
   * T角框架
   * @returns 包含T角边缘的框架形状
   */
  get tCornerFrame(): unknown | undefined {
    const edge = this.tCornerEdge;
    return this.view.shapeManager.shapem.find((shape: unknown) =>
      Utils.polyConcideSeg((shape as any).polygon, edge)
    );
  }

  /**
   * 反序列化连接器数据
   * @param data - 序列化的连接器数据
   * @param view - 视图实例
   * @returns 当前实例
   */
  deserialize(data: ConnectorData, view: View): this {
    this.uid = data.uid ?? 0;

    if (data.size !== undefined) {
      this.size = data.size;
    }

    this.colorManager.deserialize(data.cm, view, (context?: unknown) => {
      if (context) {
        this.draw(context);
        (context as any).activeLayer.draw();
      }
    });

    this.polygon = PolyParser.parse(data.polygon);
    this.updatePoly(this.polygon);

    if (data.dimW) {
      this.dimForWidth.deserialize(data.dimW);
      this.dimForWidth.forHeight = GeometryUtils.EQ_0(
        this.polygon.mulShape.tangentInStart().y
      );
      this.dimForWidth.updatePoly();
    }

    if (data.st !== undefined) {
      this.screwTimes = data.st;
    }

    if (data.attrs) {
      this.attrs = data.attrs;
    }

    this.draw(view);
    return this;
  }

  /**
   * 倾斜T角
   * 调整T角框架样式并更新尺寸标注位置
   */
  skewTCorner(): void {
    const frame = this.tCornerFrame;
    if (frame && typeof (frame as any).tCornerStyle === 'function') {
      (frame as any).tCornerStyle();
      this.dimForWidth.position = Direction.Up;
    }
  }

  /**
   * 调整连接器尺寸
   * @param newSize - 新尺寸
   * @param isReverse - 是否反向调整(默认false)
   */
  resize(newSize: number, isReverse: boolean = false): void {
    const edgeIndex = isReverse ? 3 : 1;
    const oppositeEdgeIndex = isReverse ? 1 : 3;
    const targetEdge = this.edges[edgeIndex];

    const frameUtil = new FrameUtil(this.view);
    const connectedComponents = frameUtil.getCoupleEdgeConnectedComponents(
      this,
      targetEdge
    );
    const oppositeComponents = frameUtil.getConnectedComponentsOnce(
      this.edges[oppositeEdgeIndex],
      this
    );

    // 计算偏移向量
    const tangent = targetEdge.tangentInStart();
    const orientation = this.polygon.orientation === -1 ? 1 : -1;
    const normal = orientation === 1
      ? tangent.rotate90CW()
      : tangent.rotate90CCW();
    const offset = normal.multiply(newSize - this.size);

    // 更新多边形
    this.updatePoly(this.polygon.dragEdge(edgeIndex, offset));
    this.draw(this.view);
    this.size = newSize;

    // 过滤并平移相关组件
    const componentsToTranslate = connectedComponents.filter(
      (component: ConnectedComponent) =>
        oppositeComponents.length === 0 ||
        !oppositeComponents.some(
          (oppComp: ConnectedComponent) =>
            oppComp.frame.id === component.frame.id
        )
    );

    componentsToTranslate.forEach((component: ConnectedComponent) => {
      component.translate(offset);
    });

    // 处理角连接器
    componentsToTranslate.forEach((component: unknown) => {
      if (this.isCornerJoiner(component)) {
        component.skewFrame(this.view);
      }
    });

    this.view.shapeManager.refreshDimStatus();
    this.view.refresh();
  }

  /**
   * 类型守卫:检查是否为角连接器
   */
  private isCornerJoiner(obj: unknown): obj is CornerJoiner {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof (obj as CornerJoiner).skewFrame === 'function'
    );
  }

  /**
   * 点击栏处理
   * @param point - 点击点
   * @param view - 视图实例
   * @returns 是否命中
   */
  hitBar(point: Vector, view: View): boolean {
    const isHit = super.hitBar(point, view);
    if (isHit) {
      view.eventBus.emit({
        type: EventType.connector_settings,
        payload: new CoupleSettings(this, view),
      });
    }
    return isHit;
  }

  /**
   * 更新多边形
   * @param polygon - 新多边形
   */
  updatePoly(polygon: WinPolygon): void {
    super.updatePoly(polygon);
    this.shapes = [this.polygon.clone()];
    this.polygon.mulShape = this.polygon.edge(1);
  }

  /**
   * 显示机器人辅助工具
   * @param view - 视图实例
   */
  showRobot(view: View): void {
    if (this.robot === undefined) {
      this.robot = new ConnectorRobot(view);
    }
    if (this.highlighted) {
      this.robot.attachTo(this);
    } else {
      this.robot.hide();
    }
  }

  /**
   * 删除连接器
   * @param view - 视图实例
   * @returns 是否成功删除
   */
  delete(view: View): boolean {
    if (!this.highlighted) {
      return false;
    }
    this.hideAssist();
    this.remove();
    return true;
  }

  /**
   * 静态工厂方法:创建连接器
   * @param point - 基准点
   * @param segment - 连接线段
   * @param view - 视图实例
   * @returns 新连接器实例
   */
  static create(point: Vector, segment: Segment, view: View): Connector {
    const projection = point.projectionOn(Line.fromSegment(segment.start, segment.end));
    const direction = GeometryUtils.vector(point, projection).normalize();

    const startOffset = Utils.vecDirPt(
      direction,
      view.params.connector,
      segment.start
    );
    const endOffset = Utils.vecDirPt(
      direction,
      view.params.connector,
      segment.end
    );

    const polygon = new WinPolygon([
      GeometryUtils.segment(segment.end, endOffset),
      GeometryUtils.segment(endOffset, startOffset),
      GeometryUtils.segment(startOffset, segment.start),
      GeometryUtils.segment(segment.start, segment.end),
    ]);

    const connector = new Connector(polygon, view);
    connector.polygon.mulShape = connector.polygon.edge(1);
    connector.shapes.push(polygon.clone());
    connector.dimForWidth.forHeight = GeometryUtils.EQ_0(
      connector.polygon.mulShape.tangentInStart().y
    );
    connector.dimForWidth.updatePoly();

    return connector;
  }

  /**
   * 静态工厂方法:从最近的形状创建连接器
   * @param point - 参考点
   * @param view - 视图实例
   * @returns 新连接器实例或undefined
   */
  static createFromNearest(point: Vector, view: View): Connector | undefined {
    const frameUtil = new FrameUtil(view);
    const [nearestShape, centerPoint] = frameUtil.getNearestShape(point);

    if (!nearestShape || !centerPoint) {
      return undefined;
    }

    const center = (centerPoint as any).polygon.box.center;
    return Connector.create(center, nearestShape, view);
  }
}