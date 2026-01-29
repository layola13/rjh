interface CacheModule {
  expando: string;
}

function getCache(this: CacheModule, t: any): Record<string, any> {
  let cache = t[this.expando];
  
  if (!cache) {
    cache = {};
    
    if (isValidCacheTarget(t)) {
      if (t.nodeType) {
        t[this.expando] = cache;
      } else {
        Object.defineProperty(t, this.expando, {
          value: cache,
          configurable: true
        });
      }
    }
  }
  
  return cache;
}

function isValidCacheTarget(target: any): boolean {
  return target != null && typeof target === 'object';
}