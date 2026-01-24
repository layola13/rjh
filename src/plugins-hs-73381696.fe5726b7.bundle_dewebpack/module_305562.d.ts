/**
 * CSS样式模块类型定义
 * 用于楼层列表组件的样式导出
 */

/**
 * CSS模块导入函数类型
 */
type CSSModuleLoader = (useSourceMap: boolean) => Array<[string, string]>;

/**
 * 模块导出函数签名
 * @param e - Webpack模块导出对象
 * @param t - 模块依赖对象
 * @param n - Webpack require函数，用于加载其他模块
 */
declare function moduleExports(
  e: { id: string; exports: any },
  t: any,
  n: (moduleId: number) => any
): void;

/**
 * 楼层列表容器样式类名映射
 */
interface LayerListStyleClasses {
  /** 楼层列表容器主样式 */
  'layer-list-container': string;
  
  /** 暗色主题样式 */
  'dark': string;
  
  /** 楼层列表项样式 */
  'layer-list-item': string;
  
  /** 可悬停状态样式 */
  'hover-able': string;
  
  /** 楼层编号样式 */
  'floor-number': string;
  
  /** 激活状态样式 */
  'active': string;
  
  /** 楼层名称容器样式 */
  'floor-name': string;
  
  /** 楼层名称显示区域样式 */
  'floor-name-display': string;
  
  /** 楼层名称文本样式 */
  'floor-name-text': string;
  
  /** 扩展状态样式 */
  'extended': string;
  
  /** 操作按钮区域样式 */
  'operations': string;
  
  /** 操作图标样式 */
  'operation-icon': string;
  
  /** 抓取光标样式 */
  'grab': string;
  
  /** 禁用状态样式 */
  'disabled': string;
  
  /** 楼层名称输入框样式 */
  'floor-name-input': string;
  
  /** 错误状态样式 */
  'error': string;
  
  /** 拖放指示器样式 */
  'drag-drop-indicator': string;
  
  /** 智能滚动容器样式 */
  'homestyler-smart-scroll': string;
}

/**
 * CSS模块导出对象
 * 包含所有样式类名和CSS内容
 */
interface CSSModuleExports {
  /** 样式类名映射对象 */
  locals?: LayerListStyleClasses;
  
  /** 模块ID */
  id: string;
  
  /** CSS源代码字符串 */
  toString(): string;
  
  /** 推送方法，用于添加CSS规则 */
  push(rule: [string, string]): void;
}

export = CSSModuleExports;