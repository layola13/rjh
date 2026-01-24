import { ExtraDimVertical } from './ExtraDimVertical';
import { ExtraDimArbitraryTool } from './ExtraDimArbitraryTool';

/**
 * 垂直标注工具类
 * 用于创建和管理垂直方向的额外标注
 */
export class ExtraDimVerticalTool extends ExtraDimArbitraryTool {
  /** 工具实例引用 */
  protected tool: unknown;
  
  /** 视图实例引用 */
  protected view: unknown;
  
  /** 当前创建的垂直标注对象 */
  protected extraDim?: ExtraDimVertical;

  /**
   * 构造函数
   * @param tool - 工具实例
   * @param view - 视图实例
   */
  constructor(tool: unknown, view: unknown) {
    super(tool, view);
    this.tool = tool;
    this.view = view;
  }

  /**
   * 创建垂直标注
   * @param points - 标注点数组，至少包含两个点
   *                 points[0]: 标注起点和终点的位置
   *                 points[1]: 标注偏移距离或其他参数
   */
  protected createDim(points: Array<{ clone: () => unknown }>): void {
    // 创建垂直标注实例，使用第一个点的克隆作为起点和终点
    this.extraDim = new ExtraDimVertical(
      points[0].clone(),
      points[0].clone(),
      points[1]
    );
    
    // 在视图中绘制标注
    this.extraDim.draw(this.view);
  }
}