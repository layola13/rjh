import { ExtraDimHorizontal } from './ExtraDimHorizontal';
import { ExtraDimArbitraryTool } from './ExtraDimArbitraryTool';

/**
 * 水平标注工具类
 * 继承自任意标注工具，专门用于创建水平方向的标注
 */
export class ExtraDimHorizontalTool extends ExtraDimArbitraryTool {
  /** 当前使用的工具实例 */
  protected tool: unknown;
  
  /** 视图实例，用于渲染标注 */
  protected view: unknown;
  
  /** 当前创建的额外标注对象 */
  protected extraDim?: ExtraDimHorizontal;

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
   * 创建水平标注
   * @param points - 标注点数组，points[0]用于起点和终点的克隆，points[1]为附加参数
   */
  createDim(points: Array<{ clone(): unknown }>): void {
    this.extraDim = new ExtraDimHorizontal(
      points[0].clone(),
      points[0].clone(),
      points[1]
    );
    this.extraDim.draw(this.view);
  }
}