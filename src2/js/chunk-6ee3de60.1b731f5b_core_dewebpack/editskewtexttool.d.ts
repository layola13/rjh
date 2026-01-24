import { Point } from 'konva/lib/shapes/Shape';
import { EventType } from './EventType';
import { DrawParams } from './DrawParams';
import { SystemParam } from './SystemParam';
import { Tool, ToolType } from './Tool';
import { SkewPartEnum } from './SkewPartEnum';

/**
 * 角部连接器接口
 * 定义斜角文本的属性和方法
 */
interface ICornerJoiner {
  /** 斜角角度（度数） */
  skewAngle: number;
  
  /**
   * 更新斜角角度
   * @param angle - 新的角度值
   * @param view - 视图实例
   * @param part - 斜角部位枚举
   */
  updateSkewAngle(angle: number, view: IView, part: SkewPartEnum): void;
}

/**
 * 视图形状接口
 */
interface IVShape {
  /** 形状属性 */
  attrs: {
    /** 关联的角部连接器 */
    robot: ICornerJoiner;
  };
}

/**
 * 历史管理器接口
 */
interface IMomentoManager {
  /** 创建历史检查点 */
  checkPoint(): void;
}

/**
 * 事件总线接口
 */
interface IEventBus {
  /**
   * 发射事件
   * @param event - 事件对象
   */
  emit(event: IEditSkewTextEvent): void;
}

/**
 * 编辑斜角文本事件
 */
interface IEditSkewTextEvent {
  /** 事件类型 */
  type: EventType.edit_skew_text;
  /** 事件负载 */
  payload: {
    /** 原始事件 */
    event: IKonvaEvent;
    /** 初始值 */
    initValue: number;
    /** 确认回调 */
    onConfirm: (value: number) => void;
  };
}

/**
 * Konva事件接口
 */
interface IKonvaEvent {
  /** 事件目标 */
  target: IVShape;
}

/**
 * 视图接口
 */
interface IView {
  /** 事件总线 */
  eventBus: IEventBus;
  /** 历史管理器 */
  mometoManager: IMomentoManager;
  
  /** 刷新视图 */
  refresh(): void;
}

/**
 * 编辑斜角文本工具
 * 用于编辑和调整角部连接器的斜角角度
 */
export declare class EditSkewTextTool extends Tool {
  /** 视图实例 */
  private view: IView;
  
  /** 前一个点位置 */
  private prevPt: Point;
  
  /** 当前操作的视图形状 */
  private vshape: IVShape;
  
  /**
   * 构造函数
   * @param view - 视图实例
   */
  constructor(view: IView);
  
  /**
   * 获取角部连接器
   * @returns 当前形状关联的角部连接器
   */
  get cornerJoiner(): ICornerJoiner;
  
  /**
   * 双击事件处理
   * 显示角度编辑器或触发自定义编辑事件
   * @param event - Konva事件对象
   */
  dbclick(event: IKonvaEvent): void;
  
  /**
   * 发射角部连接器编辑事件
   * 用于移动设备或自定义编辑器场景
   * @param event - Konva事件对象
   */
  private emitCornerJoiner(event: IKonvaEvent): void;
  
  /**
   * 确认角度修改
   * 验证角度范围（0° < angle < 360°）并更新
   * @param angle - 新的角度值
   */
  private onConfirm(angle: number): void;
}