/**
 * 事件消息类型枚举
 * 用于定义系统中不同事件的消息类型标识
 */
export enum EventMessageType {
  /**
   * 选择模型事件
   * 当用户选择或切换模型时触发
   */
  SelectModel = "SelectModel",

  /**
   * 更新模型尺寸事件
   * 当模型的尺寸属性发生变化时触发
   */
  UpdataModelSize = "UpdataModelSize",

  /**
   * 材质完成事件
   * 当材质加载或应用完成时触发
   */
  MateFinish = "MateFinish"
}

/**
 * 更新模型尺寸事件类型别名
 * @deprecated 建议直接使用 EventMessageType.UpdataModelSize
 */
export type UpdataModelSize = EventMessageType.UpdataModelSize;

/**
 * 材质完成事件类型别名
 * @deprecated 建议直接使用 EventMessageType.MateFinish
 */
export type MateFinish = EventMessageType.MateFinish;