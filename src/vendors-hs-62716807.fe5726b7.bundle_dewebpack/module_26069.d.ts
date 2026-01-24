import { Component, Context, ReactNode } from 'react';

/**
 * 本地化配置的泛型类型
 */
export type LocaleConfig<T = Record<string, any>> = T | (() => T);

/**
 * 默认语言环境映射
 */
export interface DefaultLocaleMap {
  global?: LocaleConfig;
  [componentName: string]: LocaleConfig | undefined;
}

/**
 * 语言环境上下文类型
 */
export interface LocaleContextType {
  /** 当前语言代码（如 'en-US', 'zh-CN'） */
  locale?: string;
  /** 语言环境是否存在 */
  exist?: boolean;
  /** 组件级别的语言环境配置 */
  [componentName: string]: any;
}

/**
 * LocaleReceiver 组件的 props 类型
 */
export interface LocaleReceiverProps<T = Record<string, any>> {
  /** 组件名称，用于从上下文中获取对应的语言配置 */
  componentName?: string;
  /** 默认语言配置 */
  defaultLocale?: LocaleConfig<T>;
  /** 
   * 渲染函数，接收合并后的语言配置、语言代码和完整上下文
   * @param locale 合并后的语言配置对象
   * @param localeCode 当前语言代码
   * @param context 完整的语言环境上下文
   */
  children: (
    locale: T,
    localeCode: string | undefined,
    context: LocaleContextType | undefined
  ) => ReactNode;
}

/**
 * 语言环境接收器组件类
 * 用于在组件树中接收和处理国际化配置
 */
export default class LocaleReceiver<T = Record<string, any>> extends Component<
  LocaleReceiverProps<T>
> {
  static defaultProps: {
    componentName: string;
  };

  static contextType: Context<LocaleContextType | undefined>;

  context: LocaleContextType | undefined;

  /**
   * 获取合并后的语言配置
   * 将默认配置与上下文中的配置合并
   */
  getLocale(): T;

  /**
   * 获取当前语言代码
   * 如果上下文存在但没有 locale，返回默认语言代码
   */
  getLocaleCode(): string | undefined;

  render(): ReactNode;
}

/**
 * 语言环境接收器 Hook
 * 用于在函数组件中获取国际化配置
 * 
 * @param componentName 组件名称，用于获取特定组件的语言配置
 * @param defaultLocale 默认语言配置，当上下文中没有配置时使用
 * @returns 返回包含合并后语言配置的数组，格式为 [locale]
 * 
 * @example
 *