/**
 * 网络检测反馈组件类型定义
 * 用于展示和管理网络质量检测结果
 */

// ==================== 枚举和常量 ====================

/**
 * 网络质量等级
 */
export type NetworkGrade = 'excellent' | 'good' | 'poor' | 'offLine' | 'others';

// ==================== 接口定义 ====================

/**
 * 网络状态项
 */
export interface NetworkStatus {
  /** 状态类型 */
  type: string;
  /** 显示名称 */
  name: string;
  /** 副标题 */
  subTitle: string;
}

/**
 * 网络状态映射
 */
export interface NetworkStatuses {
  [key: string]: NetworkStatus;
}

/**
 * 网络检测结果
 */
export interface NetworkDetectionResult {
  /** 网络等级 */
  grade: NetworkGrade;
  /** 等级名称 */
  gradeName: string;
  /** 各项状态详情 */
  statuses: NetworkStatuses;
}

/**
 * 主题样式配置
 */
export interface ThemeConfig {
  /** 字体颜色 */
  fontColor: string;
  /** 背景颜色 */
  bgColor: string;
  /** 大图标路径 */
  icon: string;
  /** 小图标路径 */
  smallIcon: string;
}

/**
 * 主题配置映射
 */
export interface ThemeConfigs {
  excellent: ThemeConfig;
  good: ThemeConfig;
  poor: ThemeConfig;
  offLine: ThemeConfig;
  others: ThemeConfig;
}

/**
 * 语言映射表
 */
export interface LanguageMap {
  [key: string]: string;
}

// ==================== 组件 Props ====================

/**
 * 网络反馈列表组件 Props
 */
export interface FeedbackListProps {
  /** 网络状态数据 */
  data: NetworkStatuses;
  /** 主题名称 */
  theme: string;
  /** 主题颜色配置 */
  color: ThemeConfig;
  /** 显示文本 */
  text: string;
  /** 设置文本信息的回调 */
  setTextInfo: (text: string) => void;
  /** 设置颜色信息的回调 */
  setColorInfo: (grade: NetworkGrade) => void;
  /** 执行网络检测的函数 */
  detectToolNetwork: () => Promise<NetworkDetectionResult>;
  /** 设置网络概览信息的回调 */
  setNetworkOverviewInfo: (result: NetworkDetectionResult) => void;
}

/**
 * 检测工具数据配置
 */
export interface DetectToolData {
  /** 执行网络检测 */
  detectToolNetwork: () => Promise<NetworkDetectionResult>;
  /** 语言映射表 */
  languageMap?: LanguageMap;
  /** 自定义类名 */
  className?: string;
}

/**
 * 网络反馈主组件 Props
 */
export interface NetworkFeedbackProps {
  /** 检测工具配置数据 */
  data: DetectToolData;
  /** 主题名称 */
  theme?: string;
  /** 设置值的回调 */
  setValue: (value: NetworkFeedbackValue) => void;
}

/**
 * 网络反馈值
 */
export interface NetworkFeedbackValue {
  /** 内部网络检测结果 */
  internalNetwork: NetworkDetectionResult;
}

// ==================== 组件声明 ====================

/**
 * 网络反馈列表组件
 * 显示详细的网络状态列表和重新检测按钮
 */
declare const FeedbackList: React.FC<FeedbackListProps>;

/**
 * 网络反馈主组件
 * 显示网络检测结果摘要，点击可展开详情
 * 
 * @example
 *