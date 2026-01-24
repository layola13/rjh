import { ShapeType } from './ShapeType';
import { Param } from './Param';
import { EventType, DecorationBarChinese4Settings } from './EventTypes';
import { DecorationBar, DecorationBarType, DecorationBarCreator } from './DecorationBar';

/**
 * 中式装饰条样式4
 * 包含垂直和水平装饰条组件的组合装饰元素
 */
export interface DecorationBarChinese4JSON {
  /** 垂直条数量 */
  vc: number;
  /** 水平条数量 */
  hc: number;
  /** 间隙 */
  gp: number;
  /** 水平分隔距离 */
  hsp: number;
  /** 垂直分隔距离 */
  vsp: number;
  /** 半条宽度 */
  sbw: number;
}

/**
 * 装饰条组件接口
 */
export interface DecorationBarComponent {
  /** 半条宽度 */
  semiBarWidth: number;
}

/**
 * 事件总线接口
 */
export interface EventBus {
  emit(event: DecorationBarEvent): void;
}

/**
 * 装饰条事件
 */
export interface DecorationBarEvent {
  type: EventType;
  payload: DecorationBarChinese4Settings;
}

/**
 * 中式装饰条4 - 组合型装饰条组件
 * 支持自定义垂直/水平条数量、间距和分隔距离
 */
export class DecorationBarChinese4 extends DecorationBar {
  /** 装饰条组件集合 */
  components: DecorationBarComponent[];
  
  /** 垂直条数量 */
  verticalBarCount: number;
  
  /** 水平条数量 */
  horizontalBarCount: number;
  
  /** 组件间隙 */
  gap: number;
  
  /** 水平分隔距离 */
  hSep: number;
  
  /** 垂直分隔距离 */
  vSep: number;
  
  /** 半条宽度 */
  semiBarWidth: number;

  /**
   * 构造函数
   * @param components - 初始装饰条组件数组
   */
  constructor(components: DecorationBarComponent[]) {
    super(components, DecorationBarType.decorationChinese4);
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
   * @returns 包含所有属性的JSON对象
   */
  toJSON(): DecorationBarChinese4JSON {
    const json = super._toJSON();
    return {
      ...json,
      vc: this.verticalBarCount,
      hc: this.horizontalBarCount,
      gp: this.gap,
      hsp: this.hSep,
      vsp: this.vSep,
      sbw: this.semiBarWidth
    };
  }

  /**
   * 从JSON对象反序列化
   * @param data - 序列化的数据对象
   */
  deserialize(data: DecorationBarChinese4JSON): void {
    super._deserialize(data);
    this.verticalBarCount = data.vc;
    this.horizontalBarCount = data.hc;
    this.gap = data.gp;
    this.hSep = data.hsp;
    this.vSep = data.vsp;
    
    // 如果未提供半条宽度，使用默认参数值的一半
    this.semiBarWidth = data.sbw ?? new Param().get(ShapeType.DecorationBar) / 2;
  }

  /**
   * 发射装饰条配置变更事件
   * @param param1 - 第一个事件参数
   * @param param2 - 第二个事件参数
   * @param context - 包含事件总线的上下文对象
   */
  emitEvent(param1: unknown, param2: unknown, context: { eventBus: EventBus }): void {
    context.eventBus.emit({
      type: EventType.decoration_bar_chinese4,
      payload: new DecorationBarChinese4Settings(param1, param2, context)
    });
  }

  /**
   * 重新创建装饰条组件
   * 根据当前配置参数重新生成所有子组件
   */
  recreateComponents(): void {
    this.components = DecorationBarCreator.Instance.createChinese4Components(
      this.verticalBarCount,
      this.horizontalBarCount,
      this.gap,
      this.hSep,
      this.vSep,
      this.semiBarWidth
    );
    
    // 同步半条宽度到所有组件
    this.components.forEach(component => {
      component.semiBarWidth = this.semiBarWidth;
    });
  }
}