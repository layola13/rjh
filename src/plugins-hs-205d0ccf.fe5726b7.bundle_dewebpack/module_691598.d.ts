/**
 * 数据模型类，用于管理带有类型、处理器和位置信息的数据对象
 */
export default class DataModel {
  /**
   * 存储的数据对象
   */
  data: DataObject;

  /**
   * 数据类型标识
   */
  type: string;

  /**
   * 内部处理器，用于控制显示逻辑
   */
  private _handler: Handler;

  /**
   * 显示位置，默认为 "left"
   */
  position: Position;

  /**
   * 构造函数
   * @param data - 数据对象
   * @param type - 数据类型
   * @param handler - 处理器实例
   * @param position - 可选的显示位置，默认使用 data.position 或传入值或 "left"
   */
  constructor(data: DataObject, type: string, handler: Handler, position?: Position);

  /**
   * 更新数据并触发显示
   * @param updates - 要更新的数据对象，如果提供则合并到现有数据并调用处理器显示
   */
  update(updates?: Partial<DataObject>): void;
}

/**
 * 数据对象接口
 */
interface DataObject {
  /**
   * 可选的位置属性
   */
  position?: Position;
  
  /**
   * 其他动态属性
   */
  [key: string]: unknown;
}

/**
 * 处理器接口
 */
interface Handler {
  /**
   * 显示方法
   */
  show(): void;
}

/**
 * 位置类型，表示元素的显示位置
 */
type Position = "left" | "right" | "top" | "bottom" | "center" | string;