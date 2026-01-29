function testArrayMethod(methodName: string, callbackOrValue?: () => number): boolean {
  const method = ([] as any[])[methodName];
  
  if (!method) {
    return false;
  }
  
  try {
    method.call(
      null, 
      callbackOrValue || function(): number { return 1; }, 
      1
    );
    return false;
  } catch {
    return true;
  }
}

export default testArrayMethod;