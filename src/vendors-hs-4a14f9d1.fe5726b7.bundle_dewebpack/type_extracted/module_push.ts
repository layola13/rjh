function push(value: unknown): string {
  const stackPointer = ++this.sp;
  const code = `${s(stackPointer)} = ${value};\n`;
  
  if (this.sp > this.maxSp) {
    this.maxSp = this.sp;
  }
  
  return code;
}