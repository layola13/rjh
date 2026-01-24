import { Point, Vector } from 'svg.js';
import { Tool, ToolType } from './Tool';
import { ShapeHelper } from './ShapeHelper';

/**
 * 表示可编辑的目标对象接口
 */
interface EditableTarget {
  /** 父级对象 */
  parent: Sash;
  /** 偏移向量是否启用 */
  offvecEnabled: boolean;
  /** 当前偏移向量 */
  offvec: Vector;
  /** 关联的多边形 */
  polygon: any;
  
  /**
   * 平移操作
   * @param vector 平移向量
   */
  translate(vector: Vector): void;
  
  /**
   * 更新多边形
   * @param polygon 新的多边形数据
   */
  updatePoly(polygon: any): void;
  
  /**
   * 绘制到视图
   * @param view 目标视图
   */
  draw(view: any): void;
}

/**
 * 表示形状对象的属性接口
 */
interface ShapeAttributes {
  /** 关联的机器人/对象引用 */
  robot: EditableTarget;
}

/**
 * 表示可视化形状对象
 */
interface VShape {
  /** 形状属性 */
  attrs: ShapeAttributes;
}

/**
 * 拖拽事件接口
 */
interface DragEvent {
  /** 事件目标 */
  target: VShape;
}

/**
 * 视图接口，包含历史管理器
 */
interface View {
  /** 时刻管理器，用于撤销/重做 */
  mometoManager: {
    /** 创建历史检查点 */
    checkPoint(): void;
  };
}

/**
 * Sash对象接口（窗框/分隔条）
 */
interface Sash {
  /** 偏移向量是否启用 */
  offvecEnabled: boolean;
  /** 当前偏移向量 */
  offvec: Vector;
  /** 关联的多边形 */
  polygon: any;
  
  /**
   * 平移操作
   * @param vector 平移向量
   */
  translate(vector: Vector): void;
  
  /**
   * 更新多边形
   * @param polygon 新的多边形数据
   */
  updatePoly(polygon: any): void;
  
  /**
   * 绘制到视图
   * @param view 目标视图
   */
  draw(view: View): void;
}

/**
 * 编辑窗框工具类
 * 继承自基础工具类，用于处理窗框的拖拽编辑操作
 */
export declare class EditSashTool extends Tool {
  /** 关联的视图对象 */
  private view: View;
  
  /** 前一个鼠标位置点 */
  private prevPt: Point;
  
  /** 当前编辑的窗框对象 */
  private sash?: Sash;
  
  /** 当前操作的可视化形状 */
  private vshape?: VShape;
  
  /**
   * 构造函数
   * @param view 关联的视图对象
   */
  constructor(view: View);
  
  /**
   * 获取当前编辑目标
   * @returns 返回当前编辑的窗框对象，如果存在的话
   */
  get editTarget(): Sash | undefined;
  
  /**
   * 拖拽开始事件处理
   * @param event 拖拽事件对象
   */
  dragstart(event: DragEvent): void;
  
  /**
   * 拖拽移动事件处理
   * @param event 拖拽事件对象
   */
  dragmove(event: DragEvent): void;
  
  /**
   * 鼠标操作完成事件处理
   * @param event 拖拽事件对象
   */
  mousedone(event: DragEvent): void;
  
  /**
   * 执行编辑任务
   * @param finalize 是否为最终确认操作，默认为false
   */
  private doTask(finalize?: boolean): void;
}