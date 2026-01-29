/**
 * 反馈状态配置模块
 * 提供不同反馈状态对应的图标、标题和描述信息
 */

/**
 * 消息通知参数接口
 */
interface MessageParams {
  /** 消息数量，默认为0 */
  msgNumber?: number;
}

/**
 * 状态描述参数接口
 */
interface StatusParams {
  /** 状态描述文本 */
  description?: string;
}

/**
 * 状态配置返回结果接口
 */
interface StatusConfig {
  /** 图标名称 */
  iconName: string;
  /** 标题文本 */
  title: string;
  /** 描述文本（可选） */
  description?: string;
}

/**
 * 反馈状态配置对象
 * 包含消息、已提交、已关闭、处理中、已完成等状态的配置
 */
declare const FeedbackStatusConfig: {
  /**
   * 消息通知状态配置
   * @param params - 消息参数
   * @returns 包含图标和标题的配置对象
   */
  MESSAGE(params: MessageParams): StatusConfig;

  /**
   * 问题已提交状态配置
   * @param params - 状态参数
   * @returns 包含图标、标题和描述的配置对象
   */
  SUBMITTED(params: StatusParams): StatusConfig;

  /**
   * 问题已关闭状态配置
   * @param params - 状态参数
   * @returns 包含图标、标题和描述的配置对象
   */
  CLOSED(params: StatusParams): StatusConfig;

  /**
   * 问题处理中状态配置
   * @param params - 状态参数
   * @returns 包含图标、标题和描述的配置对象
   */
  PROCESSING(params: StatusParams): StatusConfig;

  /**
   * 问题已完成状态配置
   * @param params - 状态参数
   * @returns 包含图标、标题和描述的配置对象
   */
  COMPLETED(params: StatusParams): StatusConfig;
};

export default FeedbackStatusConfig;