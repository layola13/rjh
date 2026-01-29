function throwPureVirtualError(): never {
  throw new Error("Pure virtual function called!");
}