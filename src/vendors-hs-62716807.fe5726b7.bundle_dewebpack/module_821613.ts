type SpecPolicy = 
  | "DEFINE_MANY" 
  | "DEFINE_MANY_MERGED" 
  | "DEFINE_ONCE" 
  | "OVERRIDE_BASE";

interface ReactClassSpec {
  mixins?: any[];
  statics?: Record<string, any>;
  propTypes?: Record<string, any>;
  contextTypes?: Record<string, any>;
  childContextTypes?: Record<string, any>;
  getDefaultProps?: () => Record<string, any>;
  getInitialState?: () => Record<string, any> | null;
  getChildContext?: () => Record<string, any>;
  render?: () => any;
  componentWillMount?: () => void;
  componentDidMount?: () => void;
  componentWillReceiveProps?: (nextProps: any) => void;
  shouldComponentUpdate?: (nextProps: any, nextState: any) => boolean;
  componentWillUpdate?: (nextProps: any, nextState: any) => void;
  componentDidUpdate?: (prevProps: any, prevState: any) => void;
  componentWillUnmount?: () => void;
  UNSAFE_componentWillMount?: () => void;
  UNSAFE_componentWillReceiveProps?: (nextProps: any) => void;
  UNSAFE_componentWillUpdate?: (nextProps: any, nextState: any) => void;
  updateComponent?: () => void;
  autobind?: boolean;
  displayName?: string;
  [key: string]: any;
}

interface ReactComponent {
  props: any;
  context: any;
  refs: Record<string, any>;
  updater: any;
  state: any;
  __isMounted?: boolean;
  __reactAutoBindPairs: any[];
  displayName?: string;
  getInitialState?: () => Record<string, any> | null;
  getDefaultProps?: () => Record<string, any>;
  replaceState?: (state: any, callback?: () => void) => void;
  isMounted?: () => boolean;
  render?: () => any;
  [key: string]: any;
}

interface ReactClass {
  prototype: ReactComponent;
  defaultProps?: Record<string, any>;
  displayName?: string;
  childContextTypes?: Record<string, any>;
  contextTypes?: Record<string, any>;
  propTypes?: Record<string, any>;
  getDefaultProps?: () => Record<string, any>;
  [key: string]: any;
}

type TypeOfValue = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";

function typeOf(value: any): TypeOfValue {
  return typeof value as TypeOfValue;
}

function invariant(condition: boolean, message?: string, ...args: any[]): asserts condition {
  if (!condition) {
    let error: Error;
    
    if (message === undefined) {
      error = new Error(
        "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
      );
    } else {
      const replacementArgs = [message, ...args];
      let argIndex = 0;
      error = new Error(
        message.replace(/%s/g, () => replacementArgs[argIndex++])
      );
      error.name = "Invariant Violation";
    }
    
    (error as any).framesToPop = 1;
    throw error;
  }
}

const MIXINS_KEY = "mixins";

const EMPTY_REFS: Record<string, any> = {};

const SpecPolicy: Record<string, SpecPolicy> = {
  mixins: "DEFINE_MANY",
  statics: "DEFINE_MANY",
  propTypes: "DEFINE_MANY",
  contextTypes: "DEFINE_MANY",
  childContextTypes: "DEFINE_MANY",
  getDefaultProps: "DEFINE_MANY_MERGED",
  getInitialState: "DEFINE_MANY_MERGED",
  getChildContext: "DEFINE_MANY_MERGED",
  render: "DEFINE_ONCE",
  componentWillMount: "DEFINE_MANY",
  componentDidMount: "DEFINE_MANY",
  componentWillReceiveProps: "DEFINE_MANY",
  shouldComponentUpdate: "DEFINE_ONCE",
  componentWillUpdate: "DEFINE_MANY",
  componentDidUpdate: "DEFINE_MANY",
  componentWillUnmount: "DEFINE_MANY",
  UNSAFE_componentWillMount: "DEFINE_MANY",
  UNSAFE_componentWillReceiveProps: "DEFINE_MANY",
  UNSAFE_componentWillUpdate: "DEFINE_MANY",
  updateComponent: "OVERRIDE_BASE"
};

const StaticSpecPolicy: Record<string, SpecPolicy> = {
  getDerivedStateFromProps: "DEFINE_MANY_MERGED"
};

const PropertyDescriptors = {
  displayName(Constructor: ReactClass, value: string): void {
    Constructor.displayName = value;
  },

  mixins(Constructor: ReactClass, mixins: any[]): void {
    if (mixins) {
      for (let i = 0; i < mixins.length; i++) {
        mixSpecIntoClass(Constructor, mixins[i]);
      }
    }
  },

  childContextTypes(Constructor: ReactClass, value: Record<string, any>): void {
    Constructor.childContextTypes = {
      ...Constructor.childContextTypes,
      ...value
    };
  },

  contextTypes(Constructor: ReactClass, value: Record<string, any>): void {
    Constructor.contextTypes = {
      ...Constructor.contextTypes,
      ...value
    };
  },

  getDefaultProps(Constructor: ReactClass, value: () => Record<string, any>): void {
    if (Constructor.getDefaultProps) {
      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, value);
    } else {
      Constructor.getDefaultProps = value;
    }
  },

  propTypes(Constructor: ReactClass, value: Record<string, any>): void {
    Constructor.propTypes = {
      ...Constructor.propTypes,
      ...value
    };
  },

  statics(Constructor: ReactClass, statics: Record<string, any>): void {
    mixStaticSpecIntoComponent(Constructor, statics);
  },

  autobind(): void {
    // No-op
  }
};

function mixStaticSpecIntoComponent(Constructor: ReactClass, statics: Record<string, any>): void {
  if (!statics) {
    return;
  }

  for (const name in statics) {
    const property = statics[name];
    
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    invariant(
      !(name in PropertyDescriptors),
      `ReactClass: You are attempting to define a reserved property, \`${name}\`, that shouldn't be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.`
    );

    if (name in Constructor) {
      const policy = StaticSpecPolicy.hasOwnProperty(name) 
        ? StaticSpecPolicy[name] 
        : null;
        
      invariant(
        policy === "DEFINE_MANY_MERGED",
        `ReactClass: You are attempting to define \`${name}\` on your component more than once. This conflict may be due to a mixin.`
      );
      
      Constructor[name] = createMergedResultFunction(Constructor[name], property);
      continue;
    }

    Constructor[name] = property;
  }
}

function validateMethodOverride(isAlreadyDefined: boolean, name: string): void {
  const policy = SpecPolicy.hasOwnProperty(name) ? SpecPolicy[name] : null;

  invariant(
    !ReservedMethods.hasOwnProperty(name) || policy === "OVERRIDE_BASE",
    `ReactClassInterface: You are attempting to override \`${name}\` from your class specification. Ensure that your method names do not overlap with React methods.`
  );

  if (isAlreadyDefined) {
    invariant(
      policy === "DEFINE_MANY" || policy === "DEFINE_MANY_MERGED",
      `ReactClassInterface: You are attempting to define \`${name}\` on your component more than once. This conflict may be due to a mixin.`
    );
  }
}

function mixSpecIntoClass(Constructor: ReactClass, spec: ReactClassSpec): void {
  if (!spec) {
    return;
  }

  invariant(
    typeOf(spec) !== "function",
    "ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."
  );

  invariant(
    !isReactComponent(spec),
    "ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object."
  );

  const proto = Constructor.prototype;
  const autoBindPairs = proto.__reactAutoBindPairs;

  if (spec.hasOwnProperty(MIXINS_KEY)) {
    PropertyDescriptors.mixins(Constructor, spec.mixins);
  }

  for (const name in spec) {
    if (!spec.hasOwnProperty(name) || name === MIXINS_KEY) {
      continue;
    }

    const property = spec[name];
    const isAlreadyDefined = proto.hasOwnProperty(name);

    validateMethodOverride(isAlreadyDefined, name);

    if (PropertyDescriptors.hasOwnProperty(name)) {
      PropertyDescriptors[name](Constructor, property);
    } else {
      const isReactClassMethod = SpecPolicy.hasOwnProperty(name);
      const isFunction = typeOf(property) === "function";
      const shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        autoBindPairs.push(name, property);
        proto[name] = property;
      } else if (isAlreadyDefined) {
        const policy = SpecPolicy[name];

        invariant(
          isReactClassMethod && (policy === "DEFINE_MANY_MERGED" || policy === "DEFINE_MANY"),
          `ReactClass: Unexpected spec policy ${policy} for key ${name} when mixing in component specs.`
        );

        if (policy === "DEFINE_MANY_MERGED") {
          proto[name] = createMergedResultFunction(proto[name], property);
        } else if (policy === "DEFINE_MANY") {
          proto[name] = createChainedFunction(proto[name], property);
        }
      } else {
        proto[name] = property;
      }
    }
  }
}

function mergeIntoWithNoDuplicateKeys(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  invariant(
    target && source && typeOf(target) === "object" && typeOf(source) === "object",
    "mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects."
  );

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      invariant(
        target[key] === undefined,
        `mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: \`${key}\`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.`
      );
      target[key] = source[key];
    }
  }

  return target;
}

function createMergedResultFunction(firstFunction: Function, secondFunction: Function): Function {
  return function mergedResult(this: any): any {
    const firstResult = firstFunction.apply(this, arguments);
    const secondResult = secondFunction.apply(this, arguments);

    if (firstResult == null) {
      return secondResult;
    }
    
    if (secondResult == null) {
      return firstResult;
    }

    const mergedResult: Record<string, any> = {};
    mergeIntoWithNoDuplicateKeys(mergedResult, firstResult);
    mergeIntoWithNoDuplicateKeys(mergedResult, secondResult);
    
    return mergedResult;
  };
}

function createChainedFunction(firstFunction: Function, secondFunction: Function): Function {
  return function chainedFunction(this: any): void {
    firstFunction.apply(this, arguments);
    secondFunction.apply(this, arguments);
  };
}

function bindAutoBindMethod(component: ReactComponent, method: Function): Function {
  return method.bind(component);
}

function bindAutoBindMethods(component: ReactComponent): void {
  const pairs = component.__reactAutoBindPairs;
  
  for (let i = 0; i < pairs.length; i += 2) {
    const methodName = pairs[i];
    const method = pairs[i + 1];
    component[methodName] = bindAutoBindMethod(component, method);
  }
}

const ComponentLifecycleMixin = {
  componentDidMount(this: ReactComponent): void {
    this.__isMounted = true;
  }
};

const UnmountLifecycleMixin = {
  componentWillUnmount(this: ReactComponent): void {
    this.__isMounted = false;
  }
};

const ReservedMethods = {
  replaceState(this: ReactComponent, state: any, callback?: () => void): void {
    this.updater.enqueueReplaceState(this, state, callback);
  },

  isMounted(this: ReactComponent): boolean {
    return !!this.__isMounted;
  }
};

function isReactComponent(value: any): boolean {
  // Placeholder for actual React component detection logic
  return false;
}

class ReactClassComponent {
  props: any;
  context: any;
  refs: Record<string, any>;
  updater: any;
  state: any;
  __reactAutoBindPairs: any[];

  constructor(props: any, context: any, updater: any) {
    this.props = props;
    this.context = context;
    this.refs = EMPTY_REFS;
    this.updater = updater;
    this.state = null;
    this.__reactAutoBindPairs = [];
  }
}

export default function createReactClass(
  baseComponentPrototype: any,
  isReactComponentFn: (value: any) => boolean,
  defaultUpdater: any
): (spec: ReactClassSpec) => ReactClass {
  const mixins: any[] = [];

  class ComponentConstructor extends ReactClassComponent {
    static displayName?: string;
    static defaultProps?: Record<string, any>;

    constructor(props: any, context: any, updater?: any) {
      super(props, context, updater || defaultUpdater);

      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.state = null;
      const initialState = (this as any).getInitialState?.();

      invariant(
        typeOf(initialState) === "object" && !Array.isArray(initialState),
        `${ComponentConstructor.displayName || "ReactCompositeComponent"}.getInitialState(): must return an object or null`
      );

      this.state = initialState;
    }
  }

  Object.assign(ComponentConstructor.prototype, baseComponentPrototype, ReservedMethods);

  return function createClass(spec: ReactClassSpec): ReactClass {
    const Constructor = ComponentConstructor as any as ReactClass;
    Constructor.prototype.__reactAutoBindPairs = [];

    mixins.forEach(mixin => mixSpecIntoClass(Constructor, mixin));
    mixSpecIntoClass(Constructor, ComponentLifecycleMixin);
    mixSpecIntoClass(Constructor, spec);
    mixSpecIntoClass(Constructor, UnmountLifecycleMixin);

    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    invariant(
      Constructor.prototype.render,
      "createClass(...): Class specification must implement a `render` method."
    );

    for (const methodName in SpecPolicy) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  };
}