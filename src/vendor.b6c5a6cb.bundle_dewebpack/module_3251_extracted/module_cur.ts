interface PropHook {
  get?(tween: Tween): unknown;
  set?(tween: Tween): void;
}

interface PropHooks {
  [key: string]: PropHook;
  _default: PropHook;
}

interface TweenRegistry {
  propHooks: PropHooks;
}

interface Tween {
  prop: string;
}

declare const rr: TweenRegistry;

function getCurrentValue(this: Tween): unknown {
  const propHook = rr.propHooks[this.prop];
  return propHook && propHook.get 
    ? propHook.get(this) 
    : rr.propHooks._default.get(this);
}

export { getCurrentValue };