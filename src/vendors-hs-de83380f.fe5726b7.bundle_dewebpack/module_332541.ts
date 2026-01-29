function objectAssign<T extends object, U extends object[]>(target: T, ...sources: U): T & U[number] {
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    
    if (source != null) {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          (target as any)[key] = (source as any)[key];
        }
      }
    }
  }
  
  return target as T & U[number];
}

export default objectAssign;