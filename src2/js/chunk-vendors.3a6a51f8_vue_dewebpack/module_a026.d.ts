/**
 * Vue.js v2.6.14 Type Definitions
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */

/** Empty frozen object for default values */
export const emptyObject: Readonly<Record<string, never>>;

/** Check if value is null or undefined */
export function isUndef(value: unknown): value is null | undefined;

/** Check if value is defined (not null or undefined) */
export function isDef<T>(value: T | null | undefined): value is T;

/** Check if value is a primitive type */
export function isPrimitive(value: unknown): value is string | number | symbol | boolean;

/** Check if value is an object (excluding null) */
export function isObject(value: unknown): value is Record<string, any>;

/** Check if value is a plain object */
export function isPlainObject(value: unknown): value is Record<string, any>;

/** Check if value is a RegExp */
export function isRegExp(value: unknown): value is RegExp;

/** Check if value is a valid array index */
export function isValidArrayIndex(value: unknown): boolean;

/** Check if value is a Promise */
export function isPromise(value: unknown): value is Promise<any>;

/** Convert value to string representation */
export function toString(value: unknown): string;

/** Convert string to number, or return original value if conversion fails */
export function toNumber(value: string): number | string;

/**
 * Create a map function for checking string membership
 * @param str - Comma-separated string of values
 * @param expectsLowerCase - Whether to perform case-insensitive check
 */
export function makeMap(str: string, expectsLowerCase?: boolean): (key: string) => boolean;

/** Check if tag name is a built-in slot or component */
export const isBuiltInTag: (tag: string) => boolean;

/** Check if attribute is reserved (key, ref, slot, slot-scope, is) */
export const isReservedAttribute: (attr: string) => boolean;

/**
 * Remove an item from an array
 * @returns The removed item or undefined
 */
export function remove<T>(arr: T[], item: T): T | undefined;

/** Check if object has own property */
export function hasOwn(obj: object, key: string): boolean;

/**
 * Create a cached version of a function
 * Memoizes the result based on the argument
 */
export function cached<T extends (str: string) => any>(fn: T): T;

/** Convert hyphenated string to camelCase */
export const camelize: (str: string) => string;

/** Capitalize first letter of string */
export const capitalize: (str: string) => string;

/** Convert camelCase to hyphenated string */
export const hyphenate: (str: string) => string;

/**
 * Bind function to context
 * Uses native bind if available, otherwise polyfill
 */
export function bind(fn: Function, ctx: any): Function;

/**
 * Convert array-like object to real array
 * @param list - Array-like object
 * @param start - Starting index
 */
export function toArray(list: ArrayLike<any>, start?: number): any[];

/**
 * Mix properties into target object
 */
export function extend<T, U>(to: T, from: U): T & U;

/**
 * Merge an array of objects into a single object
 */
export function toObject(arr: Array<Record<string, any>>): Record<string, any>;

/** No-operation function */
export function noop(a?: any, b?: any, c?: any): void;

/** Always return false */
export const no: () => false;

/** Identity function - returns the same value passed in */
export const identity: <T>(x: T) => T;

/**
 * Deep equality check between two values
 */
export function looseEqual(a: any, b: any): boolean;

/**
 * Find index of value in array using loose equality
 */
export function looseIndexOf(arr: any[], val: any): number;

/**
 * Ensure a function is called only once
 */
export function once<T extends (...args: any[]) => any>(fn: T): T;

/** Server-side rendering marker attribute */
export const SSR_ATTR = "data-server-rendered";

/** Component asset types */
export const ASSET_TYPES: readonly ["component", "directive", "filter"];

/** Lifecycle hook names */
export const LIFECYCLE_HOOKS: readonly [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
  "activated",
  "deactivated",
  "errorCaptured",
  "serverPrefetch"
];

/**
 * Global configuration object
 */
export interface VueConfiguration {
  /** Merge strategies for options */
  optionMergeStrategies: Record<string, Function>;
  /** Suppress all Vue logs and warnings */
  silent: boolean;
  /** Show production mode tip on startup */
  productionTip: boolean;
  /** Enable devtools */
  devtools: boolean;
  /** Enable performance tracking */
  performance: boolean;
  /** Handler for errors during component render and watchers */
  errorHandler: ((err: Error, vm: any, info: string) => void) | null;
  /** Handler for warnings */
  warnHandler: ((msg: string, vm: any, trace: string) => void) | null;
  /** Ignore certain custom elements */
  ignoredElements: Array<string | RegExp>;
  /** Custom key codes for v-on */
  keyCodes: Record<string, number | number[]>;
  /** Check if tag is reserved */
  isReservedTag: (tag: string) => boolean;
  /** Check if attribute is reserved */
  isReservedAttr: (attr: string) => boolean;
  /** Check if tag is an unknown element */
  isUnknownElement: (tag: string) => boolean;
  /** Get namespace of tag */
  getTagNamespace: (tag: string) => string | undefined;
  /** Parse platform-specific tag name */
  parsePlatformTagName: (tag: string) => string;
  /** Check if attribute must be bound using property */
  mustUseProp: (tag: string, type?: string, name?: string) => boolean;
  /** Asynchronous update queue */
  async: boolean;
  /** Internal lifecycle hooks */
  _lifecycleHooks: typeof LIFECYCLE_HOOKS;
}

export const config: VueConfiguration;

/**
 * Define a reactive property on an object
 */
export function defineReactive(
  obj: object,
  key: string,
  val?: any,
  customSetter?: Function,
  shallow?: boolean
): void;

/**
 * Set a property on an object. Adds the new property and triggers change notification if the property doesn't exist.
 */
export function set<T>(target: any, key: string | number, val: T): T;

/**
 * Delete a property and trigger change if necessary
 */
export function del(target: any, key: string | number): void;

/**
 * Observer class that attaches to each observed object
 */
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number;
  constructor(value: any);
  walk(obj: Record<string, any>): void;
  observeArray(items: any[]): void;
}

/**
 * Dependency collection class
 */
export class Dep {
  static target: Watcher | null;
  id: number;
  subs: Watcher[];
  constructor();
  addSub(sub: Watcher): void;
  removeSub(sub: Watcher): void;
  depend(): void;
  notify(): void;
}

/**
 * Watcher class for reactive dependencies
 */
export class Watcher {
  vm: any;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Dep[];
  newDeps: Dep[];
  depIds: Set<number>;
  newDepIds: Set<number>;
  before?: Function;
  getter: Function;
  value: any;
  
  constructor(
    vm: any,
    expOrFn: string | Function,
    cb: Function,
    options?: {
      deep?: boolean;
      user?: boolean;
      lazy?: boolean;
      sync?: boolean;
      before?: Function;
    },
    isRenderWatcher?: boolean
  );
  
  get(): any;
  addDep(dep: Dep): void;
  cleanupDeps(): void;
  update(): void;
  run(): void;
  evaluate(): void;
  depend(): void;
  teardown(): void;
}

/**
 * Virtual Node (VNode) class
 */
export class VNode {
  tag?: string;
  data?: VNodeData;
  children?: VNode[];
  text?: string;
  elm?: Node;
  ns?: string;
  context?: Vue;
  key?: string | number;
  componentOptions?: VNodeComponentOptions;
  componentInstance?: Vue;
  parent?: VNode;
  raw: boolean;
  isStatic: boolean;
  isRootInsert: boolean;
  isComment: boolean;
  isCloned: boolean;
  isOnce: boolean;
  asyncFactory?: Function;
  asyncMeta?: object;
  isAsyncPlaceholder: boolean;
  
  constructor(
    tag?: string,
    data?: VNodeData,
    children?: VNode[],
    text?: string,
    elm?: Node,
    context?: Vue,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  );
}

export interface VNodeData {
  key?: string | number;
  slot?: string;
  scopedSlots?: Record<string, Function>;
  ref?: string;
  refInFor?: boolean;
  tag?: string;
  staticClass?: string;
  class?: any;
  staticStyle?: Record<string, any>;
  style?: any;
  props?: Record<string, any>;
  attrs?: Record<string, any>;
  domProps?: Record<string, any>;
  hook?: Record<string, Function>;
  on?: Record<string, Function | Function[]>;
  nativeOn?: Record<string, Function | Function[]>;
  transition?: object;
  show?: boolean;
  inlineTemplate?: {
    render: Function;
    staticRenderFns: Function[];
  };
  directives?: VNodeDirective[];
  keepAlive?: boolean;
}

export interface VNodeDirective {
  name: string;
  value?: any;
  oldValue?: any;
  expression?: string;
  arg?: string;
  oldArg?: string;
  modifiers?: Record<string, boolean>;
}

export interface VNodeComponentOptions {
  Ctor: typeof Vue;
  propsData?: object;
  listeners?: object;
  children?: VNode[];
  tag?: string;
}

/**
 * Vue constructor and main class
 */
export default class Vue {
  constructor(options?: ComponentOptions);
  
  // Instance properties
  $data: Record<string, any>;
  $props: Record<string, any>;
  $el: Element;
  $options: ComponentOptions;
  $parent: Vue;
  $root: Vue;
  $children: Vue[];
  $refs: Record<string, Vue | Element | Array<Vue | Element>>;
  $slots: Record<string, VNode[]>;
  $scopedSlots: Record<string, () => VNode | VNode[]>;
  $isServer: boolean;
  $ssrContext: any;
  $vnode: VNode;
  
  // Instance methods - Data
  $watch(
    expOrFn: string | Function,
    callback: Function,
    options?: {
      deep?: boolean;
      immediate?: boolean;
    }
  ): () => void;
  $set: typeof set;
  $delete: typeof del;
  
  // Instance methods - Events
  $on(event: string | string[], callback: Function): this;
  $once(event: string, callback: Function): this;
  $off(event?: string | string[], callback?: Function): this;
  $emit(event: string, ...args: any[]): this;
  
  // Instance methods - Lifecycle
  $mount(elementOrSelector?: Element | string, hydrating?: boolean): this;
  $forceUpdate(): void;
  $destroy(): void;
  $nextTick(callback?: () => void): Promise<void>;
  
  // Instance methods - Rendering
  _render(): VNode;
  
  // Static properties
  static config: VueConfiguration;
  static version: string;
  
  // Static methods
  static extend(options: ComponentOptions): typeof Vue;
  static nextTick(callback?: () => void, context?: any): Promise<void>;
  static set: typeof set;
  static delete: typeof del;
  static directive(id: string, definition?: any): any;
  static filter(id: string, definition?: Function): any;
  static component(id: string, definition?: any): any;
  static use(plugin: any, ...options: any[]): typeof Vue;
  static mixin(mixin: ComponentOptions): typeof Vue;
  static compile(template: string): {
    render: Function;
    staticRenderFns: Function[];
  };
  static observable<T>(obj: T): T;
}

export interface ComponentOptions {
  data?: object | ((this: Vue) => object);
  props?: string[] | Record<string, PropOptions | PropType>;
  propsData?: object;
  computed?: Record<string, Function | { get: Function; set?: Function }>;
  methods?: Record<string, Function>;
  watch?: Record<string, string | Function | { handler: string | Function; deep?: boolean; immediate?: boolean }>;
  
  el?: Element | string;
  template?: string;
  render?(createElement: CreateElement): VNode;
  renderError?(createElement: CreateElement, error: Error): VNode;
  staticRenderFns?: Function[];
  
  beforeCreate?(): void;
  created?(): void;
  beforeMount?(): void;
  mounted?(): void;
  beforeUpdate?(): void;
  updated?(): void;
  activated?(): void;
  deactivated?(): void;
  beforeDestroy?(): void;
  destroyed?(): void;
  errorCaptured?(err: Error, vm: Vue, info: string): boolean | void;
  serverPrefetch?(): Promise<any>;
  
  directives?: Record<string, DirectiveOptions>;
  components?: Record<string, typeof Vue | ComponentOptions>;
  filters?: Record<string, Function>;
  
  provide?: object | (() => object);
  inject?: string[] | Record<string, string | { from?: string; default?: any }>;
  
  model?: {
    prop?: string;
    event?: string;
  };
  
  parent?: Vue;
  mixins?: ComponentOptions[];
  extends?: ComponentOptions | typeof Vue;
  name?: string;
  delimiters?: [string, string];
  comments?: boolean;
  inheritAttrs?: boolean;
  
  [key: string]: any;
}

export interface PropOptions {
  type?: PropType | PropType[];
  required?: boolean;
  default?: any;
  validator?(value: any): boolean;
}

export type PropType = 
  | typeof String
  | typeof Number
  | typeof Boolean
  | typeof Array
  | typeof Object
  | typeof Date
  | typeof Function
  | typeof Symbol;

export interface DirectiveOptions {
  bind?(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode): void;
  inserted?(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode): void;
  update?(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode): void;
  componentUpdated?(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode): void;
  unbind?(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode): void;
}

export interface DirectiveBinding {
  name: string;
  value: any;
  oldValue: any;
  expression: string;
  arg: string;
  modifiers: Record<string, boolean>;
}

export interface CreateElement {
  (tag: string | typeof Vue, data?: VNodeData, children?: VNodeChildren): VNode;
  (tag: string | typeof Vue, children?: VNodeChildren): VNode;
}

export type VNodeChildren = VNodeChildrenArrayContents | string | number;
export interface VNodeChildrenArrayContents {
  [x: number]: VNode | string | number | VNodeChildren;
}