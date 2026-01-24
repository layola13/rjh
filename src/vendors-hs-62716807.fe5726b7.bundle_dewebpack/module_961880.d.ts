/**
 * LocaleProvider 组件类型定义
 * @deprecated 已弃用。请使用 ConfigProvider 的 locale 属性代替
 * @see http://u.ant.design/locale
 */

/**
 * 内部标记，用于识别 Ant Design 组件
 */
export const ANT_MARK = "internalMark";

/**
 * Modal 模态框的国际化配置
 */
interface ModalLocale {
  okText?: string;
  cancelText?: string;
  justOkText?: string;
}

/**
 * LocaleProvider 的国际化配置接口
 */
interface Locale {
  locale?: string;
  Modal?: ModalLocale;
  [key: string]: unknown;
}

/**
 * LocaleProvider 组件的属性接口
 */
interface LocaleProviderProps {
  /**
   * 国际化语言配置对象
   * @default {}
   */
  locale?: Locale;
  
  /**
   * 子组件
   */
  children?: React.ReactNode;
  
  /**
   * 内部标记，用于验证组件来源
   * @internal
   */
  _ANT_MARK__?: string;
}

/**
 * LocaleProvider 组件类
 * 
 * 提供全局国际化配置的 React 组件
 * 
 * @deprecated 此组件已弃用，建议使用 ConfigProvider 的 locale 属性
 * @example
 *