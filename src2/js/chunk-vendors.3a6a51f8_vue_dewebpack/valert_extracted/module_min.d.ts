/**
 * Handles input value updates with minimum value validation.
 * Emits an 'input' event only if the parsed value exceeds the current internal value.
 * 
 * @param e - The input value to be parsed and validated (string or number)
 * @remarks
 * This function is typically used in Vue.js components to enforce minimum value constraints.
 * The input value is converted to a float before comparison.
 */
function handleMinValueInput(this: MinValueContext, e: string | number): void {
  const parsedValue = parseFloat(e as string);
  
  if (parsedValue > this.internalValue) {
    this.$emit("input", parsedValue);
  }
}

/**
 * Context interface for minimum value validation component.
 * Represents the component instance that uses minimum value validation.
 */
interface MinValueContext {
  /**
   * The current internal value used for comparison.
   */
  internalValue: number;
  
  /**
   * Vue.js event emitter method.
   * @param event - The event name to emit
   * @param value - The value to pass with the event
   */
  $emit(event: "input", value: number): void;
}