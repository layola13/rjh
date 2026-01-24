/**
 * 渲染页脚额外内容区域
 * @param prefixCls - 组件样式前缀
 * @param locale - 国际化语言配置对象
 * @param renderExtra - 渲染函数，接收locale并返回React节点
 * @returns 渲染的页脚额外内容元素，如果renderExtra不存在则返回null
 */
declare function renderFooterExtra(
  prefixCls: string,
  locale: Record<string, unknown>,
  renderExtra?: ((locale: Record<string, unknown>) => React.ReactNode) | null
): React.ReactElement | null;

export default renderFooterExtra;