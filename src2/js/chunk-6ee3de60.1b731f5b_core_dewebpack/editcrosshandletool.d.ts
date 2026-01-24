import { ToolType } from './ToolType';
import { EditHardwareTool } from './EditHardwareTool';
import { DoubleKfcSash } from './DoubleKfcSash';
import type { View } from './View';
import type { Hardware } from './Hardware';
import type { Point } from './Point';
import type { Sash } from './Sash';
import type { HardwareManager } from './HardwareManager';

/**
 * 编辑十字把手工具
 * 用于编辑和更新门窗五金件中的十字形把手位置
 */
export declare class EditCrossHandleTool extends EditHardwareTool {
  /**
   * 视图引用
   */
  protected view: View;

  /**
   * 当前操作的五金件
   */
  protected hardware?: Hardware;

  /**
   * 当前鼠标点位置
   */
  protected curPt?: Point;

  /**
   * 构造函数
   * @param view - 关联的视图对象
   */
  constructor(view: View);

  /**
   * 执行编辑任务
   * 更新把手的偏移点并重绘
   * - 如果父级是双开扇(DoubleKfcSash)，则更新所有关联扇的把手
   * - 否则只更新当前五金件的把手
   */
  protected doTask(): void;
}

/**
 * 扇类型接口扩展
 */
interface SashWithHandle extends Sash {
  /**
   * 五金件管理器
   */
  hardwareManager: HardwareManager;
  
  /**
   * 父级扇对象
   */
  parent?: DoubleKfcSash | Sash;
}

/**
 * 五金件接口扩展
 */
interface HardwareWithHandle extends Hardware {
  /**
   * 偏移点坐标
   */
  offsetPoint?: Point;
  
  /**
   * 关联的管理器
   */
  manager: {
    /**
     * 所属的扇对象
     */
    sash: SashWithHandle;
  };
  
  /**
   * 更新多边形几何数据
   */
  updatePoly(): void;
  
  /**
   * 绘制到视图
   * @param view - 目标视图
   */
  draw(view: View): void;
}

/**
 * 双开扇接口扩展
 */
interface DoubleKfcSashExtended extends DoubleKfcSash {
  /**
   * 包含的所有扇对象列表
   */
  sashes: SashWithHandle[];
}