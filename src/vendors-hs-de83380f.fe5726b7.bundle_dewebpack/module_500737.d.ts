/**
 * Iconfont 图标组件配置选项
 */
export interface IconfontOptions {
  /**
   * 图标脚本的 URL 地址，支持单个 URL 或 URL 数组
   * @example 'https://example.com/iconfont.js'
   * @example ['https://example.com/iconfont1.js', 'https://example.com/iconfont2.js']
   */
  scriptUrl?: string | string[];

  /**
   * 传递给图标组件的额外通用属性
   * @default {}
   */
  extraCommonProps?: Record<string, unknown>;
}

/**
 * Iconfont 图标组件的 Props
 */
export interface IconfontProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标类型/名称，对应 symbol 的 id
   * @example 'icon-home'
   */
  type?: string;

  /**
   * 自定义子元素，会覆盖默认的 <use> 元素
   */
  children?: React.ReactNode;
}

/**
 * Iconfont 图标组件类型
 */
export type IconfontComponent = React.ForwardRefExoticComponent<
  IconfontProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 创建 Iconfont 图标组件
 * 
 * @description
 * 根据提供的配置选项创建一个可复用的图标组件。
 * 自动加载指定的图标脚本文件，支持服务端渲染环境检测。
 * 
 * @param options - 配置选项
 * @returns 返回一个支持 ref 转发的 React 图标组件
 * 
 * @example
 *