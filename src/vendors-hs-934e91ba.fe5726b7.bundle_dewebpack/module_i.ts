interface ProxyState {
  t: 4 | 5;
  A: unknown;
  g: boolean;
  R: boolean;
  N: Record<string, unknown>;
  l: ProxyState | undefined;
  u: unknown;
  k: unknown;
  i: null;
  O: boolean;
  C: boolean;
}

interface PropertyDescriptorMap {
  [key: string]: PropertyDescriptor;
}

const PROXY_STATE_SYMBOL = Symbol('proxyState');

function createPropertyDescriptor(key: string | number, enumerable: boolean): PropertyDescriptor {
  return {
    configurable: true,
    enumerable,
    get() {
      return (this as any)[key];
    },
    set(value: unknown) {
      (this as any)[key] = value;
    }
  };
}

function getOwnPropertyDescriptors(obj: object): PropertyDescriptorMap {
  const descriptors: PropertyDescriptorMap = {};
  const keys = Object.getOwnPropertyNames(obj);
  
  for (const key of keys) {
    descriptors[key] = Object.getOwnPropertyDescriptor(obj, key)!;
  }
  
  return descriptors;
}

function createDefaultScope(): unknown {
  return {};
}

function createProxy(target: unknown, parentState?: ProxyState): unknown {
  const isArray = Array.isArray(target);
  
  const proxy = createProxyObject(isArray, target);
  
  const state: ProxyState = {
    t: isArray ? 5 : 4,
    A: parentState?.A ?? createDefaultScope(),
    g: false,
    R: false,
    N: {},
    l: parentState,
    u: target,
    k: proxy,
    i: null,
    O: false,
    C: false
  };
  
  Object.defineProperty(proxy, PROXY_STATE_SYMBOL, {
    value: state,
    writable: true
  });
  
  return proxy;
}

function createProxyObject(isArray: boolean, target: unknown): any {
  if (isArray && Array.isArray(target)) {
    const length = target.length;
    const descriptors: PropertyDescriptorMap = {};
    
    for (let i = 0; i < length; i++) {
      Object.defineProperty(descriptors, String(i), createPropertyDescriptor(i, true));
    }
    
    return descriptors;
  }
  
  const descriptors = getOwnPropertyDescriptors(target as object);
  delete descriptors[PROXY_STATE_SYMBOL as any];
  
  const keys = Object.keys(descriptors);
  
  for (const key of keys) {
    descriptors[key] = createPropertyDescriptor(key, isArray || !!descriptors[key].enumerable);
  }
  
  return Object.create(Object.getPrototypeOf(target), descriptors);
}