/**
 * 解析并计算字体大小
 * @param element - 用于计算相对单位（如em、rem等）的上下文元素
 * @returns 解析后的字体大小像素值，默认为12px
 */
declare function parseFontSize(element: unknown): number;

/**
 * 字体属性相关类型定义
 */
declare namespace FontTypes {
  /**
   * 长度单位值，支持转换为像素
   */
  interface Length {
    /**
     * 将长度值转换为像素单位
     * @param context - 计算上下文元素
     * @returns 像素值
     */
    toPixels(context: unknown): number;
  }

  /**
   * 属性类，用于封装CSS属性值
   */
  interface Property {
    /**
     * 创建属性实例
     * @param name - 属性名称（如 'fontSize'）
     * @param value - 属性值
     */
    new (name: string, value: Font): Property;

    /**
     * 检查属性是否有有效值
     * @returns 如果属性值有效则返回 true
     */
    hasValue(): boolean;

    /**
     * 属性的长度值
     */
    Length: Length;
  }

  /**
   * 字体解析结果
   */
  interface FontParseResult {
    /**
     * 解析出的字体大小
     */
    fontSize: Font;
  }

  /**
   * 字体类型（可能是字符串或数字）
   */
  type Font = string | number | Length;

  /**
   * 字体解析器
   */
  interface FontParser {
    /**
     * 解析字体字符串
     * @param fontString - CSS font 属性字符串
     * @returns 解析结果对象
     */
    Parse(fontString: string): FontParseResult;
  }

  /**
   * 全局上下文对象
   */
  interface Context {
    /**
     * 当前字体设置
     */
    font: string;

    /**
     * 字体解析工具
     */
    Font: FontParser;

    /**
     * 属性类
     */
    Property: Property;
  }
}

/**
 * 默认字体大小（像素）
 */
declare const DEFAULT_FONT_SIZE: 12;

export { parseFontSize, FontTypes, DEFAULT_FONT_SIZE };