/**
 * 国际化文案模块
 * 包含智能版和克隆功能的文本标签
 */
declare module 'module_8d71' {
  /**
   * 国际化文案配置对象
   */
  interface I18nLabels {
    /**
     * 智能版切换公式的标签文本
     */
    openToggleFormula: string;

    /**
     * 克隆全部功能的标签文本
     */
    cloneAll: string;
  }

  /**
   * 导出的国际化文案对象
   */
  const labels: I18nLabels;

  export default labels;
}