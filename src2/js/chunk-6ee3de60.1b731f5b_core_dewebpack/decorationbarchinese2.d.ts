import { DecorationBar, DecorationBarType, DecorationBarCreator } from './DecorationBarModule';

/**
 * 中式装饰条组件2
 * 继承自DecorationBar基类，提供中式风格的装饰条功能
 */
export class DecorationBarChinese2 extends DecorationBar {
  /**
   * 装饰条的组件集合
   */
  components: unknown[];

  /**
   * 构造函数
   * @param components - 初始化的组件数组
   */
  constructor(components: unknown[]) {
    super(components, DecorationBarType.decorationChinese2);
    this.components = components;
  }

  /**
   * 将装饰条对象序列化为JSON格式
   * @returns 序列化后的JSON对象
   */
  toJSON(): Record<string, unknown> {
    return super._toJSON();
  }

  /**
   * 从JSON数据反序列化装饰条对象
   * @param data - 要反序列化的JSON数据
   */
  deserialize(data: Record<string, unknown>): void {
    super._deserialize(data);
  }

  /**
   * 触发事件（当前为空实现）
   * @param eventName - 事件名称
   * @param target - 事件目标
   * @param data - 事件数据
   */
  emitEvent(eventName: string, target: unknown, data: unknown): void {
    // 空实现 - 子类可以覆盖此方法来处理事件
  }

  /**
   * 重新创建装饰条的组件
   * 使用DecorationBarCreator单例创建中式风格2的组件
   */
  recreateComponents(): void {
    this.components = DecorationBarCreator.Instance.createChinese2Components();
  }
}