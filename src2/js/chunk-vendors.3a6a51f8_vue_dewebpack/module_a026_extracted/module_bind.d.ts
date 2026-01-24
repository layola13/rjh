/**
 * Vue模板编译器 - v-bind指令代码生成模块
 * 
 * 该模块负责为v-bind指令生成运行时代码字符串，用于将数据绑定到DOM元素的属性或property上。
 */

/**
 * 编译上下文对象，包含当前处理的AST元素信息
 */
interface CompilerContext {
  /**
   * 当前HTML元素的标签名（如 'div', 'input' 等）
   */
  tag: string;

  /**
   * 包装数据的函数，用于生成最终的代码字符串
   * @param dataExpression - 数据表达式字符串
   */
  wrapData: (dataExpression: string) => string;
}

/**
 * v-bind指令的配置对象
 */
interface BindDirective {
  /**
   * 绑定的值表达式（可能是变量名、对象路径等）
   */
  value: string;

  /**
   * 指令修饰符配置
   */
  modifiers?: {
    /**
     * .prop修饰符 - 强制绑定为DOM property而非attribute
     * 例如: v-bind:text-content.prop="message"
     */
    prop?: boolean;

    /**
     * .sync修饰符 - 实现双向绑定的语法糖
     * 例如: v-bind:title.sync="doc.title"
     */
    sync?: boolean;
  };
}

/**
 * v-bind指令代码生成器
 * 
 * 生成形如 `_b(data, 'div', bindingValue, false, true)` 的运行时代码
 * 
 * @param context - 编译上下文，包含元素信息
 * @param directive - v-bind指令的配置信息
 * 
 * @example
 *