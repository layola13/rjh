import { Point, vector } from './Point';
import { ShapeHelper } from './ShapeHelper';
import { Tool, ToolType } from './Tool';

/**
 * 形状属性接口
 */
interface ShapeAttrs {
  /** 机器人/额外人物图像数据 */
  robot?: ExtraPersonImage;
  /** 形状数据 */
  data: {
    /** 多边形坐标点数组 */
    poly: number[][];
  };
}

/**
 * 可视化形状接口
 */
interface VShape {
  /** 形状属性 */
  attrs: ShapeAttrs;
}

/**
 * 额外人物图像接口
 */
interface ExtraPersonImage {
  /**
   * 平移图像
   * @param offset - 偏移向量
   */
  translate(offset: Point): void;
}

/**
 * 视图管理器接口
 */
interface View {
  /** 备忘录管理器，用于撤销/重做操作 */
  mometoManager: {
    /** 创建检查点，保存当前状态 */
    checkPoint(): void;
  };
}

/**
 * 鼠标事件接口
 */
interface MouseEvent {
  /** 事件目标元素 */
  target: VShape;
}

/**
 * 额外人物图像编辑工具
 * 用于拖拽和编辑场景中的额外人物图像
 */
export class EditExtraPersonImageTool extends Tool {
  /** 视图实例引用 */
  private readonly view: View;
  
  /** 当前操作的可视化形状 */
  private vshape?: VShape;
  
  /** 上一个鼠标位置点 */
  private prevPt: Point;
  
  /** 当前鼠标位置点（继承自Tool基类） */
  protected curPt!: Point;

  /**
   * 构造函数
   * @param view - 视图管理器实例
   */
  constructor(view: View) {
    super(ToolType.editExtraPersonImage, view);
    this.view = view;
    this.prevPt = new Point();
  }

  /**
   * 获取当前形状的属性
   */
  private get attrs(): ShapeAttrs {
    return this.vshape!.attrs;
  }

  /**
   * 获取额外人物图像对象
   */
  private get extraPersonImage(): ExtraPersonImage | undefined {
    return this.attrs.robot;
  }

  /**
   * 获取多边形坐标数据
   */
  private get poly(): number[][] {
    return this.attrs.data.poly;
  }

  /**
   * 拖拽开始事件处理
   * @param event - 鼠标事件对象
   */
  dragstart(event: MouseEvent): void {
    super.dragstart(event);
    this.vshape = event.target;
    this.prevPt = this.curPt;
  }

  /**
   * 拖拽移动事件处理
   * @param event - 鼠标事件对象
   */
  dragmove(event: MouseEvent): void {
    super.dragmove(event);
    
    if (this.vshape) {
      ShapeHelper.restoreShapeMatrix(this.vshape);
    }

    requestAnimationFrame(() => {
      if (this.extraPersonImage) {
        const offset = vector(this.prevPt, this.curPt);
        this.extraPersonImage.translate(offset);
      }
      this.prevPt = this.curPt;
    });
  }

  /**
   * 鼠标操作完成事件处理
   * @param event - 鼠标事件对象
   */
  mousedone(event: MouseEvent): void {
    // 创建检查点以支持撤销/重做
    this.view.mometoManager.checkPoint();
    this.vshape = undefined;
    super.mousedone(event);
  }
}