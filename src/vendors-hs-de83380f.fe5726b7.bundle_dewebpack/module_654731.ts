/**
 * Checks if Reflect.construct is available and works correctly.
 * Tests whether the engine supports calling Reflect.construct with a newTarget parameter.
 */
function isNativeReflectConstruct(): boolean {
  try {
    const result = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function() {})
    );
    return result;
  } catch (error) {
    return false;
  }
}

export default isNativeReflectConstruct;