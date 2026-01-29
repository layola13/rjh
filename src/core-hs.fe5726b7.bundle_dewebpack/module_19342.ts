function testPrototypeConstructor(): boolean {
  class TestClass {}
  
  TestClass.prototype.constructor = null;
  
  return Object.getPrototypeOf(new TestClass()) === TestClass.prototype;
}

export default testPrototypeConstructor();