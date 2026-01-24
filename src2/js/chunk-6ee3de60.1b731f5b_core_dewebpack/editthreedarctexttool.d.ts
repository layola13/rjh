import type { Point, Vector } from 'konva/lib/types';
import type { KonvaEventObject } from 'konva/lib/Node';
import type { View } from './View';
import type { VShape } from './VShape';
import type { Frame } from './Frame';
import type { TextData } from './TextData';

/**
 * 3D圆弧文本编辑工具
 * 用于编辑3D圆弧标注文本的数值和位置
 */
export declare class EditThreedArcTextTool extends Tool {
  /** 视图实例 */
  private readonly view: View;
  
  /** 上一个点的位置 */
  private prevPt: Point;
  
  /** 当前操作的虚拟形状 */
  private vshape?: VShape;

  /**
   * 构造函数
   * @param view - 编辑器视图实例
   */
  constructor(view: View);

  /**
   * 获取关联的机器人框架对象
   */
  get frame(): Frame;

  /**
   * 获取文本数据对象
   */
  get text(): TextData;

  /**
   * 获取文本显示的数值
   * @returns 解析后的数字值
   * @example
   * // 文本内容为 "radius:100"
   * getTextValue() // 返回 100
   */
  getTextValue(): number;

  /**
   * 获取文本类型（标注类型）
   * @returns 文本类型字符串（如 "radius"、"angle" 等）
   * @example
   * // 文本内容为 "radius:100"
   * getTextType() // 返回 "radius"
   */
  getTextType(): string;

  /**
   * 双击事件处理
   * 弹出数值编辑器或触发自定义编辑器
   * @param event - Konva事件对象
   */
  dbclick(event: KonvaEventObject<MouseEvent>): void;

  /**
   * 触发3D圆弧编辑事件
   * 在移动设备或启用自定义编辑器时使用
   * @param event - Konva事件对象
   */
  private emitThreedArc(event: KonvaEventObject<MouseEvent>): void;

  /**
   * 确认编辑回调
   * 更新标注数值并刷新视图
   * @param newValue - 新的数值
   */
  private onConfirm(newValue: number): void;

  /**
   * 拖拽开始事件处理
   * @param event - Konva事件对象
   */
  dragstart(event: KonvaEventObject<DragEvent>): void;

  /**
   * 拖拽移动事件处理
   * 实时更新文本偏移位置
   * @param event - Konva事件对象
   */
  dragmove(event: KonvaEventObject<DragEvent>): void;
}

/**
 * 虚拟形状接口
 * 包含机器人框架和文本数据
 */
interface VShape {
  attrs: {
    /** 机器人框架对象 */
    robot: Frame;
    data: {
      /** 多边形/文本数据 */
      poly: TextData;
    };
  };
}

/**
 * 文本数据接口
 */
interface TextData {
  /** 文本内容（格式：类型:数值） */
  content: string;
  
  /** 文本相对原始位置的偏移向量 */
  offVec: Vector;
}

/**
 * 框架对象接口
 */
interface Frame {
  /**
   * 更新标注文本
   * @param type - 标注类型
   * @param value - 新数值
   */
  updateDimText(type: string, value: number): void;
  
  /**
   * 重新绘制框架
   * @param view - 视图实例
   */
  draw(view: View): void;
}

/**
 * 工具基类
 */
declare class Tool {
  constructor(toolType: ToolType, view: View);
  
  /** 当前鼠标/触摸点位置 */
  protected curPt: Point;
  
  /**
   * 显示数值编辑器
   * @param event - 事件对象
   * @param initialValue - 初始值
   * @param onConfirm - 确认回调
   */
  protected showNumberEditor(
    event: KonvaEventObject<MouseEvent>,
    initialValue: number,
    onConfirm: (value: number) => void
  ): void;
  
  dbclick(event: KonvaEventObject<MouseEvent>): void;
  dragstart(event: KonvaEventObject<DragEvent>): void;
  dragmove(event: KonvaEventObject<DragEvent>): void;
}

/**
 * 工具类型枚举
 */
declare enum ToolType {
  editExtraDim = 'editExtraDim'
}