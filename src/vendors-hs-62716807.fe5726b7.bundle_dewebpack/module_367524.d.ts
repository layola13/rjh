import type { FC, ReactNode } from 'react';
import type { Locale } from './locale';
import type { ValidateMessages } from './form';

/**
 * ConfigProvider 组件可配置的消费者属性列表
 */
export const configConsumerProps: readonly [
  'getTargetContainer',
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'locale',
  'pageHeader'
];

/**
 * 内容安全策略配置
 */
export interface CSPConfig {
  /** nonce 值，用于内联样式和脚本 */
  nonce?: string;
}

/**
 * 组件尺寸类型
 */
export type SizeType = 'small' | 'middle' | 'large';

/**
 * 方向类型
 */
export type DirectionType = 'ltr' | 'rtl';

/**
 * 渲染空状态的函数类型
 */
export type RenderEmptyHandler = (componentName?: string) => ReactNode;

/**
 * 获取容器元素的函数类型
 */
export type GetContainer = () => HTMLElement;

/**
 * 获取前缀类名的函数类型
 */
export type GetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => string;

/**
 * PageHeader 配置
 */
export interface PageHeaderConfig {
  /** 是否显示返回按钮的幽灵模式 */
  ghost?: boolean;
}

/**
 * Form 组件配置
 */
export interface FormConfig {
  /** 表单验证提示信息模板 */
  validateMessages?: ValidateMessages;
  /** 必填标记位置 */
  requiredMark?: 'optional' | boolean;
  /** 冒号显示配置 */
  colon?: boolean;
}

/**
 * Input 组件配置
 */
export interface InputConfig {
  /** 自动完成配置 */
  autoComplete?: string;
}

/**
 * Space 组件配置
 */
export interface SpaceConfig {
  /** 间距大小 */
  size?: SizeType | number;
}

/**
 * 虚拟滚动配置
 */
export interface VirtualConfig {
  /** 是否启用虚拟滚动 */
  disabled?: boolean;
}

/**
 * ConfigProvider 组件的配置属性
 */
export interface ConfigProviderProps {
  /** 子组件 */
  children?: ReactNode;
  
  /** 获取目标容器的函数 */
  getTargetContainer?: GetContainer;
  
  /** 获取弹出层容器的函数 */
  getPopupContainer?: GetContainer;
  
  /** 设置统一前缀类名 */
  prefixCls?: string;
  
  /** 获取前缀类名的函数（内部使用） */
  getPrefixCls?: GetPrefixCls;
  
  /** 自定义空状态渲染 */
  renderEmpty?: RenderEmptyHandler;
  
  /** 内容安全策略配置 */
  csp?: CSPConfig;
  
  /** 是否在按钮中自动插入空格 */
  autoInsertSpaceInButton?: boolean;
  
  /** 国际化语言配置 */
  locale?: Locale;
  
  /** PageHeader 组件配置 */
  pageHeader?: PageHeaderConfig;
  
  /** 组件尺寸配置 */
  componentSize?: SizeType;
  
  /** 文字方向配置 */
  direction?: DirectionType;
  
  /** Space 组件配置 */
  space?: SpaceConfig;
  
  /** 虚拟滚动配置 */
  virtual?: VirtualConfig;
  
  /** 下拉菜单是否与选择器同宽 */
  dropdownMatchSelectWidth?: boolean | number;
  
  /** Form 组件配置 */
  form?: FormConfig;
  
  /** Input 组件配置 */
  input?: InputConfig;
}

/**
 * ConfigContext 的值类型
 */
export interface ConfigContextValue extends Required<Omit<ConfigProviderProps, 'children'>> {
  getPrefixCls: GetPrefixCls;
}

/**
 * ConfigConsumer 的渲染函数类型
 */
export type ConfigConsumerRenderer = (
  config: ConfigContextValue,
  locale?: Locale,
  localeCode?: string
) => ReactNode;

/**
 * ConfigConsumer 组件属性
 */
export interface ConfigConsumerProps {
  /** 渲染函数 */
  children: ConfigConsumerRenderer;
}

/**
 * ConfigContext 上下文对象
 */
export const ConfigContext: React.Context<ConfigContextValue>;

/**
 * ConfigConsumer 消费者组件
 */
export const ConfigConsumer: FC<ConfigConsumerProps>;

/**
 * 全局配置组件，用于统一配置 antd 组件的行为
 * 
 * @example
 *