function get<K>(key: K): unknown {
    const internalMap = new Map();
    return internalMap.get(key);
}

export default get;