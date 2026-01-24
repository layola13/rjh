import { ShapeType } from './ShapeType';
import { Param } from './Param';
import { EventType, DecorationBarSemiArcSettings } from './EventType';
import { DecorationBar, DecorationBarType, DecorationBarCreator } from './DecorationBar';

/**
 * 半圆弧装饰条组件
 * 用于创建和管理由多个半圆弧组成的装饰条
 */
export declare class DecorationBarSemiArc extends DecorationBar {
  /**
   * 组件数组，存储所有半圆弧组件实例
   */
  components: Array<DecorationBarComponent>;

  /**
   * 半圆弧组件的数量
   */
  count: number;

  /**
   * 单个半圆弧的宽度（像素）
   */
  semiBarWidth: number;

  /**
   * 构造函数
   * @param components - 初始化的半圆弧组件数组
   */
  constructor(components: Array<DecorationBarComponent>);

  /**
   * 将装饰条对象序列化为JSON格式
   * @returns 包含装饰条配置的JSON对象
   */
  toJSON(): DecorationBarSemiArcJSON;

  /**
   * 从JSON对象反序列化装饰条配置
   * @param jsonData - 包含装饰条配置的JSON对象
   */
  deserialize(jsonData: DecorationBarSemiArcJSON): void;

  /**
   * 触发装饰条相关事件
   * @param param1 - 事件参数1
   * @param param2 - 事件参数2
   * @param context - 包含事件总线的上下文对象
   */
  emitEvent(param1: unknown, param2: unknown, context: EventContext): void;

  /**
   * 重新创建所有半圆弧组件
   * 根据当前count和semiBarWidth配置重新生成组件数组
   */
  recreateComponents(): void;
}

/**
 * 装饰条序列化后的JSON结构
 */
interface DecorationBarSemiArcJSON {
  /** 基础装饰条属性 */
  [key: string]: unknown;
  
  /** 组件数量 (count) */
  c: number;
  
  /** 半圆弧宽度 (semiBarWidth) */
  sbw: number;
}

/**
 * 单个半圆弧装饰组件
 */
interface DecorationBarComponent {
  /** 半圆弧宽度 */
  semiBarWidth: number;
}

/**
 * 事件上下文，包含事件总线
 */
interface EventContext {
  /** 事件总线，用于发布事件 */
  eventBus: EventBus;
}

/**
 * 事件总线接口
 */
interface EventBus {
  /**
   * 发布事件
   * @param event - 要发布的事件对象
   */
  emit(event: DecorationType): void;
}

/**
 * 装饰条事件对象
 */
interface DecorationType {
  /** 事件类型 */
  type: EventType;
  
  /** 事件负载数据 */
  payload: DecorationBarSemiArcSettings;
}