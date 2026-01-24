/**
 * EditGlassHoleDimTool - 玻璃孔洞尺寸标注编辑工具
 * 
 * 该工具用于编辑玻璃孔洞的尺寸标注,支持拖拽调整标注位置、双击编辑数值等交互操作
 */

import type { Point } from './geometry';
import type { Tool, ToolType, EditorStyle } from './tool-system';
import type { EventType } from './event-bus';

/**
 * 视图接口 - 提供绘图和事件总线功能
 */
interface IView {
  /** 刷新视图 */
  refresh(): void;
  /** 事件总线实例 */
  eventBus: IEventBus;
  /** 备忘录管理器,用于撤销重做操作 */
  mometoManager: IMomentoManager;
}

/**
 * 事件总线接口
 */
interface IEventBus {
  /**
   * 触发事件
   * @param event - 事件对象
   */
  emit(event: IEvent): void;
}

/**
 * 备忘录管理器接口 - 用于管理撤销重做
 */
interface IMomentoManager {
  /**
   * 记录检查点
   */
  checkPoint(): void;
}

/**
 * 事件对象接口
 */
interface IEvent {
  /** 事件类型 */
  type: EventType;
  /** 事件载荷数据 */
  payload: IDimEditPayload;
}

/**
 * 尺寸编辑事件载荷接口
 */
interface IDimEditPayload {
  /** 原始DOM事件 */
  event: Event;
  /** 初始数值 */
  initValue: number;
  /** 确认回调函数 */
  onConfirm: (value: number) => void;
  /** 编辑器样式 */
  style: EditorStyle;
  /** 是否垂直显示 */
  isVertical: boolean;
}

/**
 * 形状属性接口
 */
interface IShapeAttrs {
  /** 关联的尺寸标注对象 */
  robot: IDimension;
  [key: string]: unknown;
}

/**
 * 可视化形状接口
 */
interface IVShape {
  /** 形状属性 */
  attrs: IShapeAttrs;
  [key: string]: unknown;
}

/**
 * 向量接口
 */
interface IVector {
  /**
   * 在另一个向量上的投影
   * @param vector - 目标向量
   * @returns 投影向量
   */
  projectionOn(vector: IVector): IVector;
  
  /**
   * 逆时针旋转90度
   * @returns 旋转后的向量
   */
  rotate90CW(): IVector;
  
  /**
   * 向量加法
   * @param vector - 要相加的向量
   * @returns 相加后的向量
   */
  add(vector: IVector): IVector;
}

/**
 * 尺寸标注接口
 */
interface IDimension {
  /** 父级对象(孔洞) */
  parent: IHole;
  /** 标注起点 */
  from: Point;
  /** 标注终点 */
  to: Point;
  /** 标注偏移向量 */
  offset: IVector;
  /** 标注数值 */
  value: number;
  
  /**
   * 更新多边形
   */
  updatePoly(): void;
  
  /**
   * 绘制标注
   * @param view - 视图实例
   */
  draw(view: IView): void;
}

/**
 * 约束接口
 */
interface IConstraint {
  /** 约束距离 */
  distance: number;
}

/**
 * 孔洞接口
 */
interface IHole {
  /** 水平边距标注 */
  hMarginDim: IDimension;
  /** 约束数组 [水平约束, 垂直约束] */
  constraint: [IConstraint, IConstraint];
  /** 所属玻璃对象 */
  glass: IGlass;
  
  /**
   * 更新多边形
   */
  updatePoly(): void;
}

/**
 * 玻璃对象接口
 */
interface IGlass {
  /**
   * 绘制玻璃
   * @param view - 视图实例
   */
  draw(view: IView): void;
}

/**
 * Konva事件接口
 */
interface IKonvaEvent {
  /** 事件目标 */
  target: IVShape;
  /** 原始DOM事件 */
  evt: Event;
}

/**
 * 玻璃孔洞尺寸标注编辑工具类
 * 
 * 功能:
 * - 双击标注可编辑数值
 * - 拖拽标注可调整位置
 * - 支持移动端自定义编辑器
 * - 自动更新相关约束和视图
 * 
 * @extends Tool
 */
export declare class EditGlassHoleDimTool extends Tool {
  /** 视图实例 */
  private readonly view: IView;
  
  /** 当前操作的可视化形状 */
  private vshape?: IVShape;
  
  /** 上一个鼠标位置 */
  private prevPt: Point;

  /**
   * 构造函数
   * @param view - 视图实例
   */
  constructor(view: IView);

  /**
   * 获取形状属性
   * @returns 形状属性对象
   */
  get attrs(): IShapeAttrs;

  /**
   * 获取尺寸标注对象
   * @returns 尺寸标注实例
   */
  get dim(): IDimension;

  /**
   * 获取孔洞对象
   * @returns 孔洞实例
   */
  get hole(): IHole;

  /**
   * 双击事件处理
   * @param event - Konva事件对象
   */
  dbclick(event: IKonvaEvent): void;

  /**
   * 拖拽开始事件处理
   * @param event - Konva事件对象
   */
  dragstart(event: IKonvaEvent): void;

  /**
   * 拖拽移动事件处理
   * @param event - Konva事件对象
   */
  dragmove(event: IKonvaEvent): void;

  /**
   * 鼠标操作完成事件处理
   * @param event - Konva事件对象
   */
  mousedone(event: IKonvaEvent): void;

  /**
   * 数值确认回调
   * @param value - 新的尺寸数值
   */
  private onConfirm(value: number): void;

  /**
   * 触发尺寸编辑事件
   * @param event - 原始DOM事件
   */
  private emitDimEdit(event: Event): void;
}