/**
 * Vue template compiler - v-bind directive code generator
 * Generates runtime helper code for the v-bind directive
 */

/**
 * Modifiers configuration for v-bind directive
 */
interface VBindModifiers {
  /** Bind as a DOM property instead of an attribute */
  prop?: boolean;
  /** Enable two-way binding with .sync modifier */
  sync?: boolean;
}

/**
 * Directive binding metadata
 */
interface DirectiveBinding {
  /** The bound expression value */
  value: string;
  /** Directive modifiers */
  modifiers?: VBindModifiers;
}

/**
 * Code generation element context
 */
interface CodegenElement {
  /** HTML tag name of the element */
  tag: string;
  
  /**
   * Wraps data expression with v-bind runtime helper call
   * @param dataExpression - The data expression to bind
   * @returns Generated code string invoking the _b() runtime helper
   */
  wrapData(dataExpression: string): string;
}

/**
 * Configures v-bind directive code generation for an element
 * @param element - The element context to configure
 * @param binding - The v-bind directive binding metadata
 */
export function bindDirectiveCodegen(
  element: CodegenElement,
  binding: DirectiveBinding
): void {
  element.wrapData = function(dataExpression: string): string {
    const isProp = binding.modifiers?.prop === true;
    const isSync = binding.modifiers?.sync === true;
    
    return `_b(${dataExpression}, '${element.tag}', ${binding.value}, ${isProp}${isSync ? ', true' : ''})`;
  };
}