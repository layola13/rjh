import { Point, Segment, Vector, Line, Polygon } from 'geometrylib';
import { WinPolygon, ShapeType, AlignTypeEnum, Sash } from './shapes';
import { DragDrawTool, ToolType } from './tools';
import { EventType } from './events';
import { ccTypeEnum } from './enums';

/**
 * 剖面结构分析项
 */
export interface ProfileStructItem {
  /** 项目在剖切线上的位置点 */
  position: Point;
  /** 构件类型（框、扇、玻璃等） */
  type: ccTypeEnum | string;
  /** 对齐方式（左、中、右） */
  align?: AlignTypeEnum;
  /** 嵌套的子项（用于复杂结构如区域、扇） */
  items?: ProfileStructItem[];
}

/**
 * 剖面结构分析工具
 * 
 * 用于沿指定方向（水平或垂直）剖切门窗，生成剖面结构信息。
 * 继承自DragDrawTool，支持拖拽绘制剖切线。
 * 
 * @example
 *