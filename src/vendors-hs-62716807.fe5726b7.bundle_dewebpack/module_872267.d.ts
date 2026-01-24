/**
 * 描述列表项组件的属性接口
 */
export interface DescriptionItemProps {
  /** 项目前缀类名 */
  itemPrefixCls: string;
  /** 渲染的HTML元素类型（如 'td', 'div' 等） */
  component: keyof JSX.IntrinsicElements;
  /** 跨列数（用于表格布局） */
  span?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 标签样式 */
  labelStyle?: React.CSSProperties;
  /** 内容样式 */
  contentStyle?: React.CSSProperties;
  /** 是否显示边框（表格模式） */
  bordered: boolean;
  /** 标签内容 */
  label?: React.ReactNode;
  /** 描述内容 */
  content?: React.ReactNode;
  /** 是否显示冒号 */
  colon?: boolean;
}

/**
 * 描述列表项渲染函数
 * 
 * @description
 * 根据 bordered 属性决定渲染模式：
 * - bordered=true: 渲染为表格单元格（td）模式，标签和内容在同一个单元格内
 * - bordered=false: 渲染为容器（div）模式，标签和内容分离布局
 * 
 * @param props - 描述项属性
 * @returns React 元素
 */
export default function renderDescriptionItem(props: DescriptionItemProps): React.ReactElement;