/**
 * React组件的属性接口
 * 用于渲染一个带有条件样式的分割线元素
 */
interface SeparatorLineProps {
  /**
   * 是否为顶层元素
   * @default false
   */
  isTopLevel?: boolean;

  /**
   * 是否可见
   * @default true
   */
  visible?: boolean;
}

/**
 * 分割线组件
 * 根据 isTopLevel 属性渲染不同方向的分割线（右侧线或底部线）
 * 
 * @param props - 组件属性
 * @returns React 列表项元素
 */
declare function SeparatorLine(props: SeparatorLineProps): React.ReactElement<'li'>;

export default SeparatorLine;