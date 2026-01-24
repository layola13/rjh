/**
 * VMessages 组件模块
 * 提供消息展示相关功能
 */

/**
 * VMessages 组件类型定义
 * 用于展示和管理消息列表
 */
export interface VMessages {
  // 组件的具体类型定义需要根据实际的 VMessages.ts 实现来补充
  // 以下是常见的消息组件可能包含的属性和方法示例：
  
  /**
   * 消息列表数据
   */
  messages?: Array<Message>;
  
  /**
   * 是否显示消息
   */
  visible?: boolean;
  
  /**
   * 消息的颜色主题
   */
  color?: string;
  
  /**
   * 是否可关闭
   */
  closable?: boolean;
}

/**
 * 单条消息的类型定义
 */
export interface Message {
  /**
   * 消息内容
   */
  content: string;
  
  /**
   * 消息类型
   */
  type?: 'info' | 'success' | 'warning' | 'error';
  
  /**
   * 消息唯一标识
   */
  id?: string | number;
}

/**
 * VMessages 组件
 * @description 默认导出的消息组件
 */
export { VMessages as default };