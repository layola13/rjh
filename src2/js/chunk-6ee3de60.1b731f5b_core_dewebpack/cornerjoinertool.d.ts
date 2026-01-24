import { DragDrawTool } from './DragDrawTool';

/**
 * 角落连接器工具类型枚举
 * 定义不同类型的角落连接形状
 */
export enum CornerJoinerShapeType {
  // 根据实际业务补充具体类型
}

/**
 * 视图管理器接口
 * 负责工具和形状的管理
 */
interface IView {
  /** 工具管理器，负责工具的生命周期控制 */
  toolManager: {
    /** 释放当前激活的工具 */
    releaseTool(): void;
  };
  
  /** 形状管理器，负责图形元素的创建和管理 */
  shapeManager: {
    /**
     * 添加角落连接器
     * @param point - 连接器放置的坐标点
     * @param shapeType - 连接器的形状类型
     */
    addCornerJoiner(point: IPoint, shapeType: CornerJoinerShapeType): void;
  };
}

/**
 * 坐标点接口
 */
interface IPoint {
  x: number;
  y: number;
}

/**
 * 角落连接器工具
 * 用于在画布上拖拽绘制角落连接元素的工具类
 * 继承自 DragDrawTool，提供拖拽绘制基础能力
 */
export class CornerJoinerTool extends DragDrawTool {
  /** 当前操作的视图实例 */
  private readonly view: IView;
  
  /** 当前选中的形状类型 */
  private readonly shapeType: CornerJoinerShapeType;
  
  /** 当前鼠标/触摸点的坐标（继承自父类） */
  protected curPt: IPoint;

  /**
   * 构造函数
   * @param context - 绘图上下文或配置对象
   * @param view - 视图管理器实例
   * @param shapeType - 要创建的角落连接器类型
   */
  constructor(context: unknown, view: IView, shapeType: CornerJoinerShapeType) {
    super(context, view);
    this.view = view;
    this.shapeType = shapeType;
  }

  /**
   * 重启工具
   * 调用父类重启逻辑后释放当前工具
   * @override
   */
  public restart(): void {
    super.restart();
    this.view.toolManager.releaseTool();
  }

  /**
   * 完成拖拽操作
   * 在当前位置添加角落连接器元素
   * @param event - 鼠标/触摸事件对象
   * @override
   */
  protected finishDrag(event: MouseEvent | TouchEvent): void {
    this.view.shapeManager.addCornerJoiner(this.curPt, this.shapeType);
  }
}