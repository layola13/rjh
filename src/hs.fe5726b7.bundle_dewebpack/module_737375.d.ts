/**
 * CSS模块类型定义
 * 该模块导出webpack css-loader处理后的CSS样式
 */

/**
 * CSS-loader模块导出函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS模块实例，包含push方法用于注册样式
 */
type CSSLoaderModule = (sourceMap: boolean) => {
  /**
   * 注册CSS样式到模块系统
   * @param entry - 包含模块ID和CSS内容的元组
   */
  push(entry: [string, string]): void;
};

/**
 * Webpack模块参数
 */
interface WebpackModuleParams {
  /** 当前模块的导出对象 */
  exports: {
    /** CSS模块实例 */
    [key: string]: unknown;
  };
  /** 模块ID */
  id: string;
}

/**
 * 下拉列表组件样式模块
 * 
 * 包含的主要CSS类：
 * - .dropdownlist: 下拉列表容器基础样式
 * - .dropdownul: 下拉菜单列表样式
 * - .dropdownli: 下拉菜单项样式
 * - .roomTypeDropdown: 房间类型下拉框样式
 * - .wallthickness: 墙厚度选择器样式
 * - .updownDropdown: 上下柜下拉框样式
 * - .caretContainer: 箭头容器样式
 * - .highlight: 高亮状态样式
 * - .selectDropdownli: 选中项样式
 * 
 * 响应式断点：
 * - max-height: 720px
 * - min-height: 721px and max-height: 900px
 * - min-height: 901px
 */
declare module 'module_737375' {
  const styles: {
    /** CSS内容字符串 */
    readonly content: string;
    /** 模块ID */
    readonly id: string;
  };
  
  export default styles;
}

/**
 * CSS类名导出（如果使用CSS Modules）
 */
export interface DropdownListStyles {
  /** 下拉列表主容器 (210px宽, 12px字体) */
  readonly dropdownlist: string;
  /** 下拉菜单列表容器 (绝对定位, 带阴影) */
  readonly dropdownul: string;
  /** 列布局变体 */
  readonly 'dropdownul.column': string;
  /** 可编辑下拉菜单 */
  readonly dropdowneditul: string;
  /** 下拉菜单项 (22px高, 12px字体) */
  readonly dropdownli: string;
  /** 隐藏状态 */
  readonly hide: string;
  /** 高亮状态 (浅蓝色背景) */
  readonly highlight: string;
  /** 选中的下拉项 (蓝色渐变背景) */
  readonly selectDropdownli: string;
  /** 房间类型下拉框 */
  readonly roomTypeDropdown: string;
  /** 墙厚度选择器 */
  readonly wallthickness: string;
  /** 箭头容器 */
  readonly caretContainer: string;
  /** 带边框的箭头容器 */
  readonly caretContainerBorder: string;
  /** 下拉项图标区域 */
  readonly dropdownitemspan: string;
  /** 视图选择器图标 */
  readonly viewsel: string;
  /** 上下柜下拉框 (45px高, 60px宽) */
  readonly updownDropdown: string;
  /** 柜体标签文字 */
  readonly cabinetLabel: string;
}

export default {} as DropdownListStyles;