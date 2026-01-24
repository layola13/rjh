/**
 * 图标配置对象接口
 * 定义了Ant Design图标的完整结构
 */
interface IconDefinition {
  /**
   * 图标的SVG配置
   */
  icon: {
    /**
     * SVG标签名
     */
    tag: string;
    /**
     * SVG根元素属性
     */
    attrs: {
      /**
       * SVG视图框坐标和尺寸
       */
      viewBox: string;
      /**
       * 是否可聚焦
       */
      focusable: string;
    };
    /**
     * SVG子元素列表
     */
    children: Array<{
      /**
       * 子元素标签名
       */
      tag: string;
      /**
       * 子元素属性
       */
      attrs: {
        /**
         * SVG路径数据
         */
        d: string;
      };
    }>;
  };
  /**
   * 图标名称
   */
  name: string;
  /**
   * 图标主题类型
   */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * 过滤器图标（填充样式）
 * Filter图标的Ant Design定义，包含漏斗形状的矢量路径
 */
declare const filterFilledIcon: IconDefinition;

export default filterFilledIcon;