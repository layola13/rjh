import { WinPolygon, Shape, ShapeType, HardwareOnFrame } from './shapes';
import { EdgeFinder } from './edge-finder';
import { DrawParams, Artisan } from './drawing';
import { ShutterOrientation, OpenDirection } from './enums';
import { Utils, ShapeColor } from './utils';
import segment from './geometry';

/**
 * 形状数据接口，用于描述指示器的多边形及其样式
 */
interface ShapeData {
  /** 多边形对象 */
  poly: WinPolygon;
  /** 是否使用虚线样式 */
  dashed: boolean;
}

/**
 * 主机对象接口，定义了指示器所依赖的主机属性
 */
interface IndicatorHost {
  /** 是否带有窗扇 */
  withSash: boolean;
  /** 是否可开启 */
  openable: boolean;
  /** 快门管理器 */
  shutManager: {
    /** 快门方向 */
    orientation: ShutterOrientation;
  };
  /** 主机多边形 */
  polygon: WinPolygon;
  /** 添加子元素 */
  add(child: IndicatorForAntiTheft): void;
}

/**
 * 绘图上下文接口
 */
interface DrawContext {
  /** 上下文特定属性 */
  [key: string]: unknown;
}

/**
 * 可视化形状接口
 */
interface VisualShape {
  /** 设置属性 */
  setAttr(name: string, value: unknown): void;
  /** 隐藏形状 */
  hide(): void;
  /** 移动到指定图层 */
  moveTo(layer: unknown): void;
  /** 获取当前图层 */
  getLayer(): unknown;
}

/**
 * 防盗指示器类
 * 用于在垂直方向可开启且无窗扇的窗户上绘制防盗指示标记
 * 
 * @extends Shape
 */
export class IndicatorForAntiTheft extends Shape {
  /** 指示器的主机对象 */
  private host: IndicatorHost;
  
  /** 可视化形状数组，用于实际渲染 */
  private vshape: VisualShape[] = [];
  
  /** 形状数据数组，存储多边形和样式信息 */
  private shapes: ShapeData[] = [];

  /**
   * 构造函数
   * @param host - 指示器所附加的主机对象
   */
  constructor(host: IndicatorHost) {
    super(ShapeType.Indicator, host.polygon);
    this.host = host;
    this.vshape = [];
    this.shapes = [];
  }

  /**
   * 创建指示器
   * 仅在满足以下条件时创建：无窗扇、可开启、垂直方向
   * @returns 当前实例（链式调用）
   */
  create(): this {
    const shouldCreate = !this.host.withSash 
      && this.host.openable 
      && this.host.shutManager.orientation === ShutterOrientation.vertical;

    if (shouldCreate) {
      this.host.add(this);
      this.shapes = [];
      this.createShapes();
    }

    return this;
  }

  /**
   * 更新多边形
   * 清空现有形状并重新创建
   */
  updatePoly(): void {
    this.shapes = [];
    this.create();
  }

  /**
   * 平移所有形状
   * @param offset - 平移向量
   */
  translate(offset: unknown): void {
    this.shapes.forEach((shape) => {
      shape.poly.translate(offset);
    });
  }

  /**
   * 创建指示器形状
   * 根据开启方向找到对应的边缘并创建指示器
   * @returns 当前实例（链式调用）
   */
  private createShapes(): this {
    const downDirection = HardwareOnFrame.directionByOpenDirection(OpenDirection.Down);
    const downDirectionReverse = HardwareOnFrame.directionByOpenDirection(OpenDirection.Down, true);

    let leftEdgeIndex = EdgeFinder.Instance.findIndex(downDirection, this.host.polygon);
    let rightEdgeIndex = EdgeFinder.Instance.findIndex(downDirectionReverse, this.host.polygon);

    const leftEdge = this.host.polygon.edge(leftEdgeIndex);
    const rightEdge = this.host.polygon.edge(rightEdgeIndex);

    this.createNormalIndicator(leftEdge, rightEdge);
    return this;
  }

  /**
   * 创建标准指示器
   * 根据欧洲标准选择基准边和参考边，生成V形指示标记
   * 
   * @param leftEdge - 左侧边缘
   * @param rightEdge - 右侧边缘
   */
  private createNormalIndicator(leftEdge: unknown, rightEdge: unknown): void {
    const isEuropeanStandard = DrawParams.Ins.europeanStandard;
    
    // 根据标准选择基准边和参考边
    const baseEdge = isEuropeanStandard ? rightEdge : leftEdge;
    const referenceEdge = isEuropeanStandard ? leftEdge : rightEdge;

    const middlePoint = (baseEdge as any).middle();

    // 计算指示器的两个端点
    const indicatorPoints = [(referenceEdge as any).start, (referenceEdge as any).end].map((point) => {
      const isAtBaseEdgeStart = point.equalTo((baseEdge as any).start);
      const isAtBaseEdgeEnd = point.equalTo((baseEdge as any).end);

      if (isAtBaseEdgeStart || isAtBaseEdgeEnd) {
        const EDGE_DIVISION_FACTOR = 3;
        const direction = isAtBaseEdgeStart ? -1 : 1;
        const offset = ((referenceEdge as any).length / EDGE_DIVISION_FACTOR) * direction;
        return Utils.edgeDirPt(referenceEdge, offset, point);
      }

      return point;
    });

    // 创建V形多边形
    const indicatorPolygon = new WinPolygon();
    indicatorPolygon.add(segment(indicatorPoints[0], middlePoint));
    indicatorPolygon.add(segment(middlePoint, indicatorPoints[1]));
    indicatorPolygon.done();

    this.shapes.push({
      poly: indicatorPolygon,
      dashed: false
    });
  }

  /**
   * 绘制指示器
   * 将形状数据转换为可视化图形并渲染到画布
   * 
   * @param context - 绘图上下文
   */
  draw(context: DrawContext): void {
    // 回收多余的可视化形状
    const excessShapes = this.vshape.splice(this.shapes.length);
    excessShapes.forEach((shape) => {
      shape.moveTo(shape.getLayer());
      shape.hide();
    });

    // 更新或创建可视化形状
    this.shapes.forEach((shapeData, index) => {
      const isNewShape = index >= this.vshape.length;
      
      let visualShape: VisualShape;
      if (isNewShape) {
        visualShape = Artisan.recycleShape(shapeData.poly, context);
      } else {
        visualShape = this.vshape[index];
      }

      // 设置形状属性
      visualShape.setAttr('data', {
        poly: shapeData.poly,
        fcolor: 'none',
        dashed: shapeData.dashed,
        strokeWidth: DrawParams.Ins.windowStrokeWidth,
        stroke: ShapeColor.windowStrokeColor
      });

      visualShape.setAttr('robot', this);

      // 新形状加入管理
      if (isNewShape) {
        this.vshape.push(visualShape);
        this.addToGroup([visualShape]);
      }
    });
  }

  /**
   * 回收资源
   * 清理所有可视化形状并释放资源
   * 
   * @param force - 是否强制回收（默认false）
   */
  recycle(force: boolean = false): void {
    super.recycle(true);

    if (this.vshape.length === 0) {
      return;
    }

    this.vshape.forEach((shape) => {
      shape.hide();
      shape.moveTo(shape.getLayer());
    });

    this.recycleFromGroup(this.vshape);
    this.vshape = [];
  }
}