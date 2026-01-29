export function assign<T extends object>(target: T, ...sources: Array<Partial<T> | null | undefined>): T {
  for (const source of sources) {
    if (source) {
      if (typeof source !== "object") {
        throw new TypeError(`${source} must be non-object`);
      }
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key] as T[Extract<keyof T, string>];
        }
      }
    }
  }
  return target;
}

export function flattenChunks(chunks: Uint8Array[]): Uint8Array {
  let totalLength = 0;
  for (let i = 0; i < chunks.length; i++) {
    totalLength += chunks[i].length;
  }

  const result = new Uint8Array(totalLength);
  let offset = 0;
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}