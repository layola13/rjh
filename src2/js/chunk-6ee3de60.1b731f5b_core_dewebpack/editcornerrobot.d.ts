import { Point, Vector, Line } from 'paper';
import { ShapeHelper } from './ShapeHelper';
import { Tool, ToolType } from './Tool';

/**
 * 编辑角点机器人工具
 * 用于拖拽和调整形状的角点位置
 */
export class EditCornerRobot extends Tool {
  /** 当前视图实例 */
  private readonly view: any;
  
  /** 上一个鼠标位置点 */
  private prevPt: Point;
  
  /** 当前操作的虚拟形状对象 */
  private vshape?: any;
  
  /** 磁吸点位置（用于智能对齐） */
  private magneticPoint?: Point;

  /**
   * 创建编辑角点机器人工具实例
   * @param view - 视图对象，包含形状管理器和撤销重做管理器
   */
  constructor(view: any) {
    super(ToolType.editCornerRobot, view);
    this.view = view;
    this.prevPt = new Point();
  }

  /**
   * 拖拽开始事件处理
   * @param event - 鼠标事件对象
   */
  dragstart(event: any): void {
    super.dragstart(event);
    this.prevPt = this.curPt;
    this.vshape = event.target;
  }

  /**
   * 拖拽移动事件处理
   * 计算移动向量并更新形状位置，支持中间点和角点的拖拽
   * @param event - 鼠标事件对象
   */
  dragmove(event: any): void {
    super.dragmove(event);
    
    const currentPoint = this.curPt;
    const deltaVector = new Vector(
      currentPoint.x - this.prevPt.x,
      currentPoint.y - this.prevPt.y
    );
    const previousPoint = this.prevPt.clone();
    
    this.prevPt = this.curPt;
    ShapeHelper.restoreShapeMatrix(this.vshape);

    requestAnimationFrame(() => {
      if (this.vshape === undefined) return;

      if (this.vshape.attrs.data.isMiddleShape) {
        // 中间点拖拽：直接应用移动向量
        this.vshape.attrs.robot.drag(deltaVector, this.view);
      } else {
        // 角点拖拽：检测磁吸点并执行任务
        const hostShape = this.vshape.attrs.robot.hostShape;
        const cornerEdgeIndex = this.vshape.attrs.data.cornerEdgeIndex;
        const edge = hostShape.polygon.edge(cornerEdgeIndex);
        
        this.magneticPoint = this.detectSnaps(edge, hostShape);
        this.doTask(false, previousPoint, this.curPt);
      }
    });
  }

  /**
   * 执行拖拽任务
   * 计算拖拽长度并更新形状多边形，刷新视图尺寸
   * @param applyMagnetic - 是否应用磁吸效果
   * @param startPoint - 起始点
   * @param endPoint - 结束点
   */
  private doTask(
    applyMagnetic: boolean = false,
    startPoint: Point,
    endPoint: Point
  ): void {
    if (this.vshape === undefined) return;

    const hostShape = this.vshape.attrs.robot.hostShape;
    const cornerEdgeIndex = this.vshape.attrs.data.cornerEdgeIndex;
    const edge = hostShape.polygon.edge(cornerEdgeIndex);
    const edgeLine = new Line(edge.start, edge.end);
    
    let dragVector = new Vector(startPoint, endPoint);

    // 应用磁吸效果：从投影点到磁吸点的向量
    if (applyMagnetic && this.magneticPoint) {
      const projection = this.magneticPoint.projectionOn(edgeLine);
      dragVector = new Vector(projection, this.magneticPoint);
    }

    const polygon = this.vshape.attrs.data.poly;
    this.vshape.attrs.robot.dragLength(
      polygon,
      cornerEdgeIndex,
      dragVector,
      this.view
    );

    // 刷新视图的总高度和总宽度
    this.view.shapeManager.refreshTotalHeight();
    this.view.shapeManager.refreshTotalWidth();
  }

  /**
   * 鼠标操作完成事件处理
   * 隐藏磁吸辅助线，应用最终变换，记录撤销点
   * @param event - 鼠标事件对象
   */
  mousedone(event: any): void {
    this.hideSnaps();

    if (this.vshape !== undefined) {
      if (!this.vshape.attrs.data.isMiddleShape) {
        // 角点拖拽完成：应用磁吸点并执行最终任务
        if (this.magneticPoint) {
          this.curPt = this.magneticPoint;
        }
        this.doTask(true, this.prevPt, this.curPt);
      }

      this.vshape = undefined;
      this.view.mometoManager.checkPoint(); // 记录撤销/重做检查点
    }

    super.mousedone(event);
  }
}