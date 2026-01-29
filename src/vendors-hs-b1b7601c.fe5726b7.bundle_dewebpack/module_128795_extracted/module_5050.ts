function getDataContainer<K>(entry: DataEntry, key: K): Map<K, any> | StringContainer | HashContainer {
  const data = entry.__data__;
  return isPrimitive(key) 
    ? data[typeof key === "string" ? "string" : "hash"] 
    : data.map;
}

interface DataEntry {
  __data__: {
    string: StringContainer;
    hash: HashContainer;
    map: Map<any, any>;
  };
}

type StringContainer = Record<string, any>;
type HashContainer = Record<string | number, any>;

function isPrimitive(value: unknown): value is string | number | boolean | symbol | null | undefined {
  const type = typeof value;
  return value === null || value === undefined || 
    type === "string" || type === "number" || 
    type === "boolean" || type === "symbol";
}

export default getDataContainer;