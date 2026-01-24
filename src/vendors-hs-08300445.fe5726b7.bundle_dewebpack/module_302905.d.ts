/**
 * 树形结构缩进组件的类型定义
 * 用于在Tree组件中渲染层级缩进线
 */

/**
 * 缩进组件的属性接口
 */
export interface IndentProps {
  /**
   * 组件样式类名前缀
   * @example 'rc-tree'
   */
  prefixCls: string;

  /**
   * 缩进层级深度
   * @description 表示当前节点在树中的嵌套深度
   */
  level: number;

  /**
   * 每一层级是否为起始位置的标记数组
   * @description 用于控制缩进线的起始样式
   * @example [true, false, false] 表示第一层是起始位置
   */
  isStart: boolean[];

  /**
   * 每一层级是否为结束位置的标记数组
   * @description 用于控制缩进线的结束样式
   * @example [false, false, true] 表示最后一层是结束位置
   */
  isEnd: boolean[];
}

/**
 * 树形缩进渲染函数
 * @description 根据节点层级和位置信息，渲染对应的缩进占位元素和连接线
 * @param props - 缩进组件属性
 * @returns React元素，包含层级缩进的视觉表现
 */
declare function Indent(props: IndentProps): React.ReactElement;

export default Indent;