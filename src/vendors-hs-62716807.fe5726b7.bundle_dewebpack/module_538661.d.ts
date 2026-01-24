/**
 * 标题组件属性接口
 * 定义了一个简单的h3标题元素的配置选项
 */
export interface HeadingProps {
  /**
   * CSS类名前缀，用于BEM命名规范
   * @example 'ant-skeleton'
   */
  prefixCls?: string;

  /**
   * 附加的CSS类名
   * 会与prefixCls合并生成最终的className
   */
  className?: string;

  /**
   * 标题宽度
   * 可以是数字(像素值)或字符串(如 '100%', '200px')
   */
  width?: number | string;

  /**
   * 自定义内联样式
   * 会与width属性合并生成最终的style对象
   */
  style?: React.CSSProperties;
}

/**
 * 骨架屏标题组件
 * 
 * 渲染一个h3元素，通常用于骨架屏(Skeleton)加载状态显示
 * 组件会合并prefixCls和className作为CSS类，合并width和style作为内联样式
 * 
 * @param props - 组件属性
 * @returns React h3元素
 * 
 * @example
 *