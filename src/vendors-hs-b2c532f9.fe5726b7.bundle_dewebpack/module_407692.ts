const _cachedApplicationRef = Symbol("_cachedApplicationRef");
const _mixinRef = Symbol("_mixinRef");
const _originalMixin = Symbol("_originalMixin");

interface MixinFunction<T = any> {
  (target: any): T;
  [_cachedApplicationRef]?: symbol;
  [_originalMixin]?: MixinFunction<T>;
}

interface Constructor<T = any> {
  new (...args: any[]): T;
  prototype: T;
  [_mixinRef]?: MixinFunction;
  [_originalMixin]?: MixinFunction;
}

/**
 * Wraps a mixin function to preserve prototype chain and original reference
 */
export function wrap<T>(originalMixin: MixinFunction<T>, wrappedMixin: MixinFunction<T>): MixinFunction<T> {
  Object.setPrototypeOf(wrappedMixin, originalMixin);
  
  if (!originalMixin[_originalMixin]) {
    originalMixin[_originalMixin] = originalMixin;
  }
  
  return wrappedMixin;
}

/**
 * Caches mixin application results per target instance
 */
export function Cached<T>(mixin: MixinFunction<T>): MixinFunction<T> {
  return wrap(mixin, function(target: any): T {
    let cacheSymbol = mixin[_cachedApplicationRef];
    
    if (!cacheSymbol) {
      cacheSymbol = mixin[_cachedApplicationRef] = Symbol(mixin.name);
    }
    
    if (target.hasOwnProperty(cacheSymbol)) {
      return target[cacheSymbol];
    }
    
    const result = mixin(target);
    target[cacheSymbol] = result;
    
    return result;
  });
}

/**
 * Adds custom Symbol.hasInstance behavior for mixin instanceof checks
 */
export function HasInstance<T>(mixin: MixinFunction<T>): MixinFunction<T> {
  if (Symbol.hasInstance && !mixin.hasOwnProperty(Symbol.hasInstance)) {
    Object.defineProperty(mixin, Symbol.hasInstance, {
      value: function(instance: any): boolean {
        const originalMixin = this[_originalMixin];
        let currentPrototype = instance;
        
        while (currentPrototype != null) {
          if (currentPrototype.hasOwnProperty(_mixinRef) && currentPrototype[_mixinRef] === originalMixin) {
            return true;
          }
          currentPrototype = Object.getPrototypeOf(currentPrototype);
        }
        
        return false;
      }
    });
  }
  
  return mixin;
}

/**
 * Creates a basic mixin that marks instances with the mixin reference
 */
export function BareMixin<T>(mixin: MixinFunction<T>): MixinFunction<T> {
  return wrap(mixin, function(target: any): Constructor<T> {
    const result = mixin(target);
    result.prototype[_mixinRef] = mixin[_originalMixin];
    
    return result;
  });
}

/**
 * Applies all mixin enhancements: caching, instanceof support, and reference tracking
 */
export function Mixin<T>(mixin: MixinFunction<T>): MixinFunction<T> {
  return Cached(HasInstance(BareMixin(mixin)));
}

/**
 * Creates a MixinBuilder for fluent mixin composition
 */
export function mix<T>(superclass: Constructor<T>): MixinBuilder<T> {
  return new MixinBuilder(superclass);
}

/**
 * Fluent builder for applying multiple mixins to a base class
 */
export class MixinBuilder<T> {
  constructor(public superclass: Constructor<T>) {}
  
  /**
   * Applies mixins in sequence to the superclass
   */
  with<R>(...mixins: MixinFunction<any>[]): Constructor<T & R> {
    return Array.from(mixins).reduce(
      (base: Constructor, currentMixin: MixinFunction) => currentMixin(base),
      this.superclass
    ) as Constructor<T & R>;
  }
}

export {
  _cachedApplicationRef,
  _mixinRef,
  _originalMixin
};