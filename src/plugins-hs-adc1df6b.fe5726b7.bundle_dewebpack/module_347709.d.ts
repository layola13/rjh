/**
 * CSS模块导出类型定义
 * 
 * 此模块为webpack样式加载器生成的CSS模块类型声明。
 * 原始模块ID: 347709
 */

/**
 * Webpack require函数类型
 * @param moduleId - 模块标识符
 */
type WebpackRequire = (moduleId: number) => CssLoader;

/**
 * CSS加载器接口
 * 负责处理和导出CSS模块内容
 */
interface CssLoader {
  /**
   * 推送CSS规则到样式表
   * @param rule - CSS规则数组，包含模块ID、CSS内容和sourceMap标志
   */
  (sourceMap: boolean): {
    push(rule: [string | number, string]): void;
  };
}

/**
 * Webpack模块导出对象
 */
interface WebpackModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: CssLoader;
}

/**
 * 属性栏单选按钮组件样式模块
 * 
 * @param exports - Webpack模块导出对象
 * @param _module - 模块上下文（未使用）
 * @param require - Webpack require函数
 * 
 * @remarks
 * 该模块导出以下CSS类：
 * - `.property-bar-radio-button` - 主容器，使用flexbox布局
 * - `.radio-button-label` - 单选按钮标签样式
 * - `.radio-group` - 单选按钮组容器
 * - `.radio-container` - 单选按钮包装器
 * - `.homestyler-ui-components` - Homestyler UI组件特定样式
 * - `.homestyler-smart-text` - 智能文本组件样式
 */
declare function cssModule(
  exports: WebpackModuleExports,
  _module: unknown,
  require: WebpackRequire
): void;

export default cssModule;

/**
 * CSS类名常量定义
 */
export const CSS_CLASSES: {
  /** 主容器类名 */
  readonly PROPERTY_BAR_RADIO_BUTTON: 'property-bar-radio-button';
  /** 标签类名 */
  readonly RADIO_BUTTON_LABEL: 'radio-button-label';
  /** 单选组类名 */
  readonly RADIO_GROUP: 'radio-group';
  /** 单选容器类名 */
  readonly RADIO_CONTAINER: 'radio-container';
  /** Homestyler UI组件类名 */
  readonly HOMESTYLER_UI_COMPONENTS: 'homestyler-ui-components';
  /** 智能文本类名 */
  readonly HOMESTYLER_SMART_TEXT: 'homestyler-smart-text';
};

/**
 * 样式规则接口
 * 描述该模块应用的完整CSS样式结构
 */
export interface PropertyBarRadioButtonStyles {
  /** 容器样式 */
  container: {
    display: 'flex';
    flexWrap: 'wrap';
    justifyContent: 'space-between';
    fontSize: '12px';
    color: '#888888';
  };
  /** 标签样式 */
  label: {
    lineHeight: '36px';
  };
  /** 单选组样式 */
  group: {
    display: 'flex';
    flexWrap: 'wrap';
    alignItems: 'center';
    lineHeight: '20px';
  };
  /** 单选项样式 */
  item: {
    marginRight: '8px';
    minWidth: '60px';
  };
}