import { DecorationBar, DecorationBarType, DecorationBarCreator } from './decoration-bar-module';

/**
 * 中式装饰条组件类型3
 * 继承自DecorationBar基类，实现特定的中式装饰风格
 */
export declare class DecorationBarChinese3 extends DecorationBar {
  /**
   * 装饰条的组件集合
   */
  components: unknown[];

  /**
   * 构造函数
   * @param components - 初始化的组件数组
   */
  constructor(components: unknown[]);

  /**
   * 将装饰条对象序列化为JSON格式
   * @returns 序列化后的JSON对象
   */
  toJSON(): Record<string, unknown>;

  /**
   * 从JSON数据反序列化还原装饰条对象
   * @param data - 要反序列化的数据对象
   */
  deserialize(data: Record<string, unknown>): void;

  /**
   * 发送事件（当前为空实现）
   * @param eventName - 事件名称
   * @param data - 事件数据
   * @param context - 事件上下文
   */
  emitEvent(eventName: string, data: unknown, context: unknown): void;

  /**
   * 重新创建装饰条组件
   * 使用DecorationBarCreator单例创建中式风格3的组件集合
   */
  recreateComponents(): void;
}