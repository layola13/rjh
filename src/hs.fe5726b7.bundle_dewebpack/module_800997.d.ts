/**
 * CSS模块类型定义
 * 该模块导出一个包含下拉列表相关样式的CSS字符串
 * @module DropdownListStyles
 */

/**
 * Webpack CSS加载器导出函数类型
 * @param insertStylesAtTop - 是否在顶部插入样式
 * @returns CSS加载器实例
 */
type CSSLoaderFunction = (insertStylesAtTop: boolean) => CSSLoader;

/**
 * CSS加载器接口
 * 用于处理CSS模块的加载和注入
 */
interface CSSLoader {
  /**
   * 添加CSS模块到加载队列
   * @param moduleData - 包含模块ID和CSS内容的元组数组
   */
  push(moduleData: Array<[string, string]>): void;
}

/**
 * Webpack模块导出对象
 */
interface ModuleExports {
  /** CSS加载器实例 */
  exports: CSSLoader;
  /** 当前模块ID */
  id: string;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 加载的模块导出对象
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFunction;

/**
 * 下拉列表样式模块
 * 包含以下组件的样式定义：
 * - .dropdownlist: 下拉列表容器（宽度210px，字体12px）
 * - .dropdownlist button: 下拉按钮（高度22px，宽度157px）
 * - .roomTypeDropdown: 房间类型下拉（按钮宽度80px）
 * - .dropdownul: 下拉菜单列表（最大高度136px，带阴影和边框）
 * - .dropdownli: 下拉菜单项（高度22px，悬停时背景色变化）
 * - .selectDropdownli: 选中的下拉项（蓝色渐变背景）
 * - .updownDropdown: 上下方向下拉（高度45px，宽度60px）
 * 
 * @param moduleExports - 模块导出对象
 * @param moduleExports.exports - 导出的CSS加载器
 * @param moduleExports.id - 模块ID
 * @param webpackRequire - Webpack require函数
 */
declare module 'module_800997' {
  /**
   * CSS样式内容常量
   * 包含完整的下拉列表组件样式定义
   */
  const styles: string;
  
  export default styles;
}

/**
 * 下拉列表CSS类名映射接口
 */
export interface DropdownListClasses {
  /** 下拉列表容器类 */
  dropdownlist: string;
  /** 房间类型下拉类 */
  roomTypeDropdown: string;
  /** 墙厚度类 */
  wallthickness: string;
  /** 隐藏元素类 */
  hide: string;
  /** 下拉菜单列表类 */
  dropdownul: string;
  /** 可编辑下拉列表类 */
  dropdowneditul: string;
  /** 下拉菜单项类 */
  dropdownli: string;
  /** 视图选择器类 */
  viewsel: string;
  /** 高亮类 */
  highlight: string;
  /** 选中的下拉项类 */
  selectDropdownli: string;
  /** 箭头容器类 */
  caretContainer: string;
  /** 带边框的箭头容器类 */
  caretContainerBorder: string;
  /** 下拉项图标容器类 */
  dropdownitemspan: string;
  /** 上下方向下拉类 */
  updownDropdown: string;
}

/**
 * 导出的CSS类名集合
 */
export const classes: Readonly<DropdownListClasses>;