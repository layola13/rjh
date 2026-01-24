import type { Point, Vector, Line } from '@flatten-js/core';
import type { Tool, ToolType } from './Tool';
import type { EventType } from './EventType';
import type { ShapeType, CirclePoly } from './ShapeTypes';
import type { FrameUtil } from './FrameUtil';
import type { ShapeHelper, Utils } from './Utils';
import type { ShapeActor } from './ShapeActor';

/**
 * 磁性吸附点接口
 * 用于在拖动时自动对齐到临近的点
 */
interface MagneticPoint extends Point {
  /** 是否为吸附点 */
  isMagnetic: boolean;
}

/**
 * 多边形接口
 */
interface Polygon {
  /** 多边形ID信息 */
  polyId: {
    /** 边缘索引 */
    idx: number;
  };
  /** 分割线信息 */
  spLine: {
    /** 几何线对象 */
    line: Line | unknown;
  };
}

/**
 * 圆形多边形接口
 */
interface CirclePolygon extends Polygon {
  /** 圆心点 */
  cpt: Point;
  /** 半径 */
  radius: number;
}

/**
 * 框架关联信息
 */
interface FrameRelation {
  /** 框架索引 */
  frameIdx: number;
}

/**
 * 额外尺寸标注
 */
interface ExtraDimension {
  /** 框架关联关系（长度为2时表示连接两个框架） */
  frameRelation: FrameRelation[];
  /**
   * 更新多边形
   * @param polygon - 多边形对象
   */
  updatePoly(polygon: Polygon): void;
  /**
   * 绘制标注
   * @param view - 视图对象
   */
  draw(view: View): void;
}

/**
 * 额外尺寸管理器
 */
interface ExtraDimManager {
  /** 所有额外尺寸标注 */
  extraDims: ExtraDimension[];
}

/**
 * 形状数据接口
 */
interface ShapeData {
  /** 父级形状 */
  parent?: Shape;
  /** 角连接器信息 */
  cornerJoiner?: {
    /** 顶部视图图形形状 */
    topViewGShape: VirtualShape;
    /**
     * 绘制角连接器
     * @param view - 视图对象
     */
    draw(view: View): void;
    /**
     * 倾斜框架
     * @param view - 视图对象
     */
    skewFrame(view: View): void;
  };
}

/**
 * 虚拟形状（Konva图形对象）
 */
interface VirtualShape {
  /** 形状属性 */
  attrs: {
    /** 关联的机器人/条形对象 */
    robot: Bar;
  };
  /**
   * 设置可拖动状态
   * @param draggable - 是否可拖动
   */
  draggable(draggable: boolean): void;
  /**
   * 获取属性值
   * @param key - 属性键
   */
  getAttr<K extends keyof ShapeData>(key: K): ShapeData[K];
  /**
   * 移动到新的父级容器
   * @param parent - 父级图形对象
   */
  moveTo(parent: VirtualShape): void;
  /** 子元素集合 */
  children: VirtualShape[];
  /** 父级容器 */
  parent?: VirtualShape;
}

/**
 * 多形状容器
 */
interface MultiShape {
  /** 形状ID */
  id: string;
  /** 多边形对象 */
  polygon: Polygon;
  /** 图形形状 */
  gshape: VirtualShape;
  /** 额外尺寸管理器 */
  extraDimManager: ExtraDimManager;
}

/**
 * 条形分割器对象
 */
interface Bar {
  /** 所属位置类型 */
  where: ShapeType;
  /** 顶部框架 */
  top: Frame;
  /** 顶部框架的引用 */
  topFrame: Frame;
  /** 多边形对象 */
  polygon: {
    /** 多边形ID */
    polyId: {
      /** 边缘索引 */
      idx: number;
    };
    /** 分割线 */
    spLine: {
      /** 几何线 */
      line: Line | unknown;
    };
    /** 多形状容器 */
    mulShape: MultiShape;
  };
}

/**
 * 框架对象
 */
interface Frame {
  /** 框架ID */
  id: string;
  /** 多边形（可能是圆形） */
  polygon: Polygon | CirclePolygon;
  /** 图形形状 */
  gshape: VirtualShape;
  /** 所属视图 */
  view: View;
  /** 是否锁定拖动大小 */
  lockDragSize?: boolean;
}

/**
 * 形状管理器
 */
interface ShapeManager {
  /** 所有形状列表 */
  shapem: MultiShape[];
  /**
   * 拖动形状
   * @param bar - 条形分割器
   * @param offset - 偏移向量
   * @param prevPoint - 上一个点
   * @param isPreview - 是否为预览模式
   */
  drag(bar: Bar, offset: Vector, prevPoint: Point, isPreview: boolean): void;
}

/**
 * 事件载荷
 */
interface DragEventPayload {
  /** 是否正在移动 */
  moving: boolean;
}

/**
 * 拖动事件
 */
interface DragEvent {
  /** 事件类型 */
  type: EventType;
  /** 事件载荷 */
  payload: DragEventPayload;
}

/**
 * 事件总线
 */
interface EventBus {
  /**
   * 触发事件
   * @param event - 事件对象
   */
  emit(event: DragEvent): void;
}

/**
 * 撤销/重做管理器
 */
interface MomentoManager {
  /**
   * 创建检查点
   */
  checkPoint(): void;
  /**
   * 撤销操作
   * @param silent - 是否静默撤销
   */
  undo(silent: boolean): void;
}

/**
 * 鼠标/拖动事件
 */
interface DragMouseEvent {
  /** 目标形状 */
  target: VirtualShape;
}

/**
 * 形状对象
 */
interface Shape {
  /** 图形形状 */
  gshape: VirtualShape;
}

/**
 * 视图对象
 */
interface View {
  /** 形状管理器 */
  shapeManager: ShapeManager;
  /** 事件总线 */
  eventBus: EventBus;
  /** 撤销/重做管理器 */
  mometoManager: MomentoManager;
}

/**
 * 编辑分割器工具
 * 用于编辑和调整框架之间的分割线
 */
export declare class EditSplitterTool extends Tool {
  /** 视图引用 */
  private readonly view: View;
  
  /** 当前操作的虚拟形状 */
  private vshape?: VirtualShape;
  
  /** 上一个点位置 */
  private prevPt: Point;
  
  /** 当前点位置 */
  private curPt: Point;
  
  /** 拖动偏移量 */
  private dragOffset: Vector;
  
  /** 初始偏移量（用于投影计算） */
  private initOffset: Vector;
  
  /** 操作的框架对象 */
  private frame?: Frame;
  
  /** 条形边缘索引 */
  private barEdgeIdx: number;
  
  /** 磁性吸附点 */
  private magneticPoint?: MagneticPoint;
  
  /** 框架工具辅助类 */
  private readonly viewUtil: FrameUtil;

  /**
   * 构造函数
   * @param view - 视图对象
   */
  constructor(view: View);

  /**
   * 获取当前操作的条形分割器
   */
  get bar(): Bar;

  /**
   * 拖动开始事件处理
   * @param event - 拖动事件
   */
  dragstart(event: DragMouseEvent): void;

  /**
   * 拖动移动事件处理
   * @param event - 拖动事件
   */
  dragmove(event: DragMouseEvent): void;

  /**
   * 鼠标完成事件处理
   * @param event - 鼠标事件
   */
  mousedone(event: DragMouseEvent): void;

  /**
   * 执行拖动任务
   * @param isFinal - 是否为最终操作（非预览）
   */
  private doTask(isFinal?: boolean): void;

  /**
   * 对拖动偏移量进行四舍五入
   */
  private roundDragOffset(): void;

  /**
   * 普通情况下的偏移量四舍五入
   */
  private roundDragOffsetForNormal(): void;

  /**
   * 圆形多边形的偏移量四舍五入
   */
  private roundDragOffsetForCircle(): void;

  /**
   * 处理额外的尺寸标注
   * @param frame - 框架对象
   * @param view - 视图对象
   */
  static handleExtraDim(frame: Frame | undefined, view: View): void;

  /**
   * 处理角连接器
   * @param isFinal - 是否为最终操作
   */
  private handleCornerJoiner(isFinal: boolean): void;

  /**
   * 检测并显示吸附点
   * @param shape - 多形状对象
   * @param bar - 条形分割器
   * @returns 磁性吸附点（如果存在）
   */
  private detectSnaps(shape: MultiShape, bar: Bar): MagneticPoint | undefined;

  /**
   * 隐藏吸附点提示
   */
  private hideSnaps(): void;
}