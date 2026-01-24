/**
 * 字体连字替换处理模块
 * 
 * 该模块用于处理OpenType字体的连字（ligature）特性，
 * 将多个字形组件替换为单个连字字形
 */

/**
 * 字形状态标签类型
 * - 'deleted': 标记为已删除的字形
 * - 其他字符串值可能表示特定的字形标签
 */
type GlyphStateTag = 'deleted' | string;

/**
 * 字形对象接口
 * 表示字体渲染过程中的单个字形
 */
interface Glyph {
  /**
   * 设置字形的状态
   * @param tag - 状态标签
   * @param value - 状态值（可以是布尔值或其他类型）
   */
  setState(tag: GlyphStateTag, value: boolean | unknown): void;
}

/**
 * 连字替换配置接口
 * 定义如何将多个字形组件替换为单个连字字形
 */
interface LigatureSubstitution {
  /**
   * 连字字形的标识符
   * 用于替换组件字形的目标连字
   */
  ligGlyph: string | number;

  /**
   * 组成连字的组件字形列表
   * 这些组件将被标记为删除
   */
  components: unknown[];
}

/**
 * 连字替换事件接口
 * 描述一个完整的连字替换操作
 */
interface LigatureReplacementEvent {
  /**
   * 替换操作的标签或类型
   */
  tag: string;

  /**
   * 连字替换的具体配置
   */
  substitution: LigatureSubstitution;
}

/**
 * 处理字体连字替换
 * 
 * 将指定位置的多个字形组件替换为单个连字字形，
 * 并将原组件字形标记为已删除状态
 * 
 * @param event - 连字替换事件，包含标签和替换配置信息
 * @param glyphs - 字形数组，包含所有待处理的字形对象
 * @param startIndex - 替换操作的起始索引位置
 * 
 * @example
 *