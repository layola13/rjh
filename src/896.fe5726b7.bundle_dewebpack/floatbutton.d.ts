/**
 * FloatButton 组件的类型定义
 * @module FloatButton
 */

/**
 * 用户VIP信息接口
 */
export interface UserVipInfo {
  /** VIP类型标识 */
  vipType: string | number;
  /** 其他VIP相关属性 */
  [key: string]: unknown;
}

/**
 * 悬浮按钮配置信息接口
 */
export interface FloatButtonInfo {
  /** 按钮图标URL */
  icon: string;
  /** 按钮文本内容 */
  text: string;
  /** 右侧图标颜色 */
  rightIconColor: string;
  /** 背景样式，可以是单色字符串或渐变色数组 */
  background?: string | [string, string];
}

/**
 * FloatButton 组件属性接口
 */
export interface FloatButtonProps {
  /** 用户VIP信息 */
  userVipInfo: UserVipInfo;
  /** 点击事件处理函数 */
  onClick?: () => void;
  /** 是否展开状态 */
  isExpand?: boolean;
}

/**
 * 悬浮按钮组件
 * 根据用户VIP信息动态显示悬浮按钮，支持展开/收起状态
 * 
 * @param props - 组件属性
 * @returns React元素或null（当配置不存在时）
 */
export declare const FloatButton: React.FC<FloatButtonProps>;

/**
 * 默认导出
 */
export default FloatButton;