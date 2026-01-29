function testPrototypeConstructor(): boolean {
  function TestClass() {}
  TestClass.prototype.constructor = null;
  return Object.getPrototypeOf(new (TestClass as any)()) !== TestClass.prototype;
}

export default !testPrototypeConstructor();