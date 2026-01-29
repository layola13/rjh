type ReaderResult<T> = {
  value: T;
  done: boolean;
};

interface ReadableStreamLikeReader<T> {
  read(): Promise<ReaderResult<T>>;
  releaseLock(): void;
}

interface ReadableStreamLike<T> {
  getReader(): ReadableStreamLikeReader<T>;
}

function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export async function* readableStreamLikeToAsyncGenerator<T>(
  stream: ReadableStreamLike<T>
): AsyncGenerator<T, void, unknown> {
  const reader = stream.getReader();
  
  try {
    while (true) {
      const result = await reader.read();
      
      if (result.done) {
        return;
      }
      
      yield result.value;
    }
  } finally {
    reader.releaseLock();
  }
}

export function isReadableStreamLike<T = unknown>(
  value: unknown
): value is ReadableStreamLike<T> {
  return isFunction((value as ReadableStreamLike<T>)?.getReader);
}