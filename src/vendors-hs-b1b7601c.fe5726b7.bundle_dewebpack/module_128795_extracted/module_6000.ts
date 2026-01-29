function get<K>(key: K): unknown {
    const internalGet = require('./module_5050');
    return internalGet(this, key).get(key);
}

export default get;