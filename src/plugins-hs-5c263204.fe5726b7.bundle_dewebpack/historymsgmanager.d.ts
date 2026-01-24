/**
 * 历史消息管理器
 * 用于管理和缓存历史消息记录的单例类
 * @module HistoryMsgManager
 */

/**
 * 历史消息管理器类
 * 使用单例模式确保全局只有一个实例
 * 内部使用 Map 存储消息，支持按键存取
 */
export declare class HistoryMsgManager {
  /**
   * 单例实例
   * @private
   * @static
   */
  private static instance?: HistoryMsgManager;

  /**
   * 历史消息存储容器
   * @private
   */
  private historyMsg: Map<string, unknown>;

  /**
   * 私有构造函数，防止外部直接实例化
   * @private
   */
  private constructor();

  /**
   * 获取单例实例
   * 如果实例不存在则创建新实例
   * @static
   * @returns {HistoryMsgManager} 历史消息管理器的唯一实例
   */
  static getInstance(): HistoryMsgManager;

  /**
   * 设置历史消息
   * @param {string} key - 消息的唯一标识键
   * @param {unknown} value - 要存储的消息内容
   * @returns {void}
   */
  setHistoryMsg(key: string, value: unknown): void;

  /**
   * 获取历史消息
   * @param {string} key - 消息的唯一标识键
   * @returns {unknown | undefined} 返回对应的消息内容，若不存在则返回 undefined
   */
  getHistoryMsg(key: string): unknown | undefined;

  /**
   * 清空所有历史消息
   * @returns {void}
   */
  clearHistoryMsg(): void;
}