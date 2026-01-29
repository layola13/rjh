function deleteProperty<T extends object>(target: { u: T; N: Record<string, boolean>; i?: Record<string, unknown> }, property: string): boolean {
  if (m(target.u, property) !== undefined || property in target.u) {
    target.N[property] = false;
    K(target);
    U(target);
  } else {
    delete target.N[property];
  }
  
  if (target.i) {
    delete target.i[property];
  }
  
  return true;
}