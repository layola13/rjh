interface PropHook {
  get?: (context: any) => any;
}

interface PropHooks {
  [key: string]: PropHook;
  _default: PropHook;
}

interface AnimationContext {
  prop: string;
}

const propHooks: PropHooks = {} as PropHooks;

function getCurrentPropertyValue(this: AnimationContext): any {
  const hook: PropHook | undefined = propHooks[this.prop];
  return hook?.get ? hook.get(this) : propHooks._default.get!(this);
}