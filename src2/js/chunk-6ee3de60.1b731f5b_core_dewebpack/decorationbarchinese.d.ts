/**
 * 中式装饰栏模块
 * 提供中式风格的装饰栏组件，支持垂直和水平条的组合配置
 */

import { ShapeType } from './ShapeType';
import { Param } from './Param';
import { EventType, DecorationBarChineseSettings } from './EventTypes';
import { DecorationBar, DecorationBarType, DecorationBarCreator } from './DecorationBar';

/**
 * 序列化数据接口
 * 定义装饰栏持久化时的数据结构
 */
interface SerializedDecorationBarChinese {
  /** 垂直条数量 */
  vc: number;
  /** 水平条数量 */
  hc: number;
  /** 间隙大小 */
  gp: number;
  /** 水平分隔距离 */
  hsp: number;
  /** 垂直分隔距离 */
  vsp: number;
  /** 半条宽度 */
  sbw?: number;
  // 继承自父类的其他属性
  [key: string]: unknown;
}

/**
 * 组件接口
 * 装饰栏内部组件的通用接口
 */
interface DecorationComponent {
  /** 半条宽度 */
  semiBarWidth: number;
  // 其他组件属性
  [key: string]: unknown;
}

/**
 * 事件上下文接口
 * 事件触发时的上下文信息
 */
interface EventContext {
  /** 事件总线，用于发布事件 */
  eventBus: {
    emit(event: { type: EventType; payload: DecorationBarChineseSettings }): void;
  };
}

/**
 * 中式装饰栏类
 * 扩展自基础装饰栏，提供中式风格的装饰效果
 * 支持自定义垂直条、水平条数量及间距配置
 */
export class DecorationBarChinese extends DecorationBar {
  /** 装饰栏内部组件集合 */
  public components: DecorationComponent[];
  
  /** 垂直条数量 */
  public verticalBarCount: number;
  
  /** 水平条数量 */
  public horizontalBarCount: number;
  
  /** 条之间的间隙 */
  public gap: number;
  
  /** 水平方向的分隔距离 */
  public hSep: number;
  
  /** 垂直方向的分隔距离 */
  public vSep: number;
  
  /** 单条的半宽度（总宽度的一半） */
  public semiBarWidth: number;

  /**
   * 构造函数
   * @param components - 初始化的装饰组件数组
   */
  constructor(components: DecorationComponent[]) {
    super(components, DecorationBarType.decorationChinese);
    this.components = components;
    this.verticalBarCount = 0;
    this.horizontalBarCount = 0;
    this.gap = 0;
    this.hSep = 0;
    this.vSep = 0;
    this.semiBarWidth = 0;
  }

  /**
   * 序列化为JSON对象
   * 将当前实例转换为可持久化的数据结构
   * @returns 序列化后的数据对象
   */
  public toJSON(): SerializedDecorationBarChinese {
    const json = super._toJSON() as SerializedDecorationBarChinese;
    json.vc = this.verticalBarCount;
    json.hc = this.horizontalBarCount;
    json.gp = this.gap;
    json.hsp = this.hSep;
    json.vsp = this.vSep;
    json.sbw = this.semiBarWidth;
    return json;
  }

  /**
   * 从JSON数据反序列化
   * 从持久化数据恢复实例状态
   * @param data - 序列化的数据对象
   */
  public deserialize(data: SerializedDecorationBarChinese): void {
    super._deserialize(data);
    this.verticalBarCount = data.vc;
    this.horizontalBarCount = data.hc;
    this.gap = data.gp;
    this.hSep = data.hsp;
    this.vSep = data.vsp;
    
    // 如果未指定半条宽度，使用默认参数值的一半
    this.semiBarWidth = data.sbw ?? new Param().get(ShapeType.DecorationBar) / 2;
  }

  /**
   * 触发装饰栏变更事件
   * 通过事件总线发布中式装饰栏配置变更
   * @param param1 - 事件参数1
   * @param param2 - 事件参数2
   * @param context - 事件上下文，包含事件总线
   */
  public emitEvent(
    param1: unknown,
    param2: unknown,
    context: EventContext
  ): void {
    context.eventBus.emit({
      type: EventType.decoration_bar_chinese,
      payload: new DecorationBarChineseSettings(param1, param2, context)
    });
  }

  /**
   * 重新创建装饰组件
   * 根据当前配置参数重新生成所有装饰组件
   * 使用单例工厂创建中式风格的组件集合
   */
  public recreateComponents(): void {
    this.components = DecorationBarCreator.Instance.createChineseComponents(
      this.verticalBarCount,
      this.horizontalBarCount,
      this.gap,
      this.hSep,
      this.vSep,
      this.semiBarWidth
    );
    
    // 同步半条宽度到所有组件
    this.components.forEach((component) => {
      component.semiBarWidth = this.semiBarWidth;
    });
  }
}