/**
 * 选择器图标配置模块
 * 
 * 该模块用于处理选择器组件的各种图标配置，包括后缀图标、清除图标、
 * 选中项图标和移除图标等。支持加载状态、多选模式等场景。
 */

/**
 * 选择器图标配置参数接口
 */
export interface SelectIconConfig {
  /** 后缀图标（下拉箭头等） */
  suffixIcon?: React.ReactNode;
  
  /** 清除按钮图标 */
  clearIcon?: React.ReactNode;
  
  /** 菜单项选中状态图标 */
  menuItemSelectedIcon?: React.ReactNode;
  
  /** 移除标签图标（多选模式） */
  removeIcon?: React.ReactNode;
  
  /** 是否处于加载状态 */
  loading?: boolean;
  
  /** 是否多选模式 */
  multiple?: boolean;
  
  /** 组件样式类名前缀 */
  prefixCls?: string;
}

/**
 * 后缀图标渲染函数参数接口
 */
export interface SuffixIconProps {
  /** 下拉菜单是否展开 */
  open: boolean;
  
  /** 是否显示搜索功能 */
  showSearch: boolean;
}

/**
 * 后缀图标渲染函数类型
 */
export type SuffixIconRender = (props: SuffixIconProps) => React.ReactNode;

/**
 * 选择器图标结果接口
 */
export interface SelectIconResult {
  /** 清除图标节点 */
  clearIcon: React.ReactNode;
  
  /** 后缀图标节点或渲染函数 */
  suffixIcon: React.ReactNode | SuffixIconRender;
  
  /** 菜单项选中图标节点 */
  itemIcon: React.ReactNode | null;
  
  /** 移除标签图标节点 */
  removeIcon: React.ReactNode | null;
}

/**
 * 获取选择器组件的图标配置
 * 
 * 根据传入的配置参数，返回选择器组件所需的各种图标节点。
 * 会根据不同的状态（加载中、展开、搜索等）返回相应的图标。
 * 
 * @param config - 图标配置参数对象
 * @returns 包含各类图标节点的结果对象
 * 
 * @example
 *