interface DataContainer<T = unknown> {
  __data__: Record<string, T> | null;
  size: number;
}

function createDataContainer<T = unknown>(createMethod: ((arg: null) => Record<string, T> | null) | null): DataContainer<T> {
  return {
    __data__: createMethod ? createMethod(null) : {},
    size: 0
  };
}

export default createDataContainer;