/**
 * Vue 3 核心库类型定义
 * 
 * 这是一个外部模块声明，用于将 Vue 运行时库暴露给不同的模块系统。
 * 支持 CommonJS、AMD 和全局变量等多种模块加载方式。
 */

/**
 * Vue 应用实例接口
 */
export interface App<HostElement = any> {
  version: string;
  config: AppConfig;
  use<Options extends unknown[]>(
    plugin: Plugin<Options>,
    ...options: Options
  ): this;
  mixin(mixin: ComponentOptions): this;
  component(name: string): Component | undefined;
  component(name: string, component: Component): this;
  directive(name: string): Directive | undefined;
  directive(name: string, directive: Directive): this;
  mount(
    rootContainer: HostElement | string,
    isHydrate?: boolean,
    isSVG?: boolean
  ): ComponentPublicInstance;
  unmount(): void;
  provide<T>(key: InjectionKey<T> | string, value: T): this;
}

/**
 * 应用配置选项
 */
export interface AppConfig {
  readonly isNativeTag?: (tag: string) => boolean;
  performance: boolean;
  optionMergeStrategies: Record<string, OptionMergeFunction>;
  globalProperties: Record<string, any>;
  errorHandler?: (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => void;
  warnHandler?: (
    msg: string,
    instance: ComponentPublicInstance | null,
    trace: string
  ) => void;
  compilerOptions: RuntimeCompilerOptions;
}

/**
 * 组件选项对象
 */
export interface ComponentOptions<
  Props = Record<string, any>,
  Data = Record<string, any>,
  Methods = Record<string, Function>
> {
  name?: string;
  props?: Props;
  data?: () => Data;
  computed?: Record<string, ComputedGetter<any> | WritableComputedOptions<any>>;
  methods?: Methods;
  watch?: Record<string, WatchOptions | WatchCallback | string>;
  emits?: string[] | Record<string, ValidationFunction | null>;
  setup?: SetupFunction<Props>;
  [key: string]: any;
}

/**
 * 组件公共实例接口
 */
export interface ComponentPublicInstance<
  Props = Record<string, any>,
  Data = Record<string, any>,
  Methods = Record<string, any>
> {
  $: ComponentInternalInstance;
  $data: Data;
  $props: Props;
  $attrs: Record<string, unknown>;
  $refs: Record<string, any>;
  $slots: Slots;
  $root: ComponentPublicInstance | null;
  $parent: ComponentPublicInstance | null;
  $emit: EmitFn;
  $el: any;
  $options: ComponentOptions;
  $forceUpdate: () => void;
  $nextTick: typeof nextTick;
  $watch: WatchMethod;
}

/**
 * 响应式引用类型
 */
export interface Ref<T = any> {
  value: T;
  [RefSymbol]: true;
}

/**
 * 计算属性类型
 */
export interface ComputedRef<T = any> extends WritableComputedRef<T> {
  readonly value: T;
}

/**
 * 可写计算属性类型
 */
export interface WritableComputedRef<T> extends Ref<T> {
  readonly effect: ReactiveEffect<T>;
}

/**
 * 虚拟节点类型
 */
export interface VNode<HostNode = any, HostElement = any> {
  __v_isVNode: true;
  type: VNodeTypes;
  props: VNodeProps | null;
  key: string | number | symbol | null;
  ref: VNodeNormalizedRef | null;
  children: VNodeNormalizedChildren;
  component: ComponentInternalInstance | null;
  el: HostNode | null;
  [key: string]: any;
}

/**
 * 创建 Vue 应用实例
 * @param rootComponent - 根组件
 * @param rootProps - 根组件属性
 * @returns Vue 应用实例
 */
export function createApp(
  rootComponent: Component,
  rootProps?: Record<string, any> | null
): App;

/**
 * 创建响应式引用
 * @param value - 初始值
 * @returns 响应式引用对象
 */
export function ref<T>(value: T): Ref<T>;

/**
 * 创建响应式对象
 * @param target - 目标对象
 * @returns 响应式代理对象
 */
export function reactive<T extends object>(target: T): T;

/**
 * 创建计算属性
 * @param getter - getter 函数或配置对象
 * @returns 计算属性引用
 */
export function computed<T>(getter: ComputedGetter<T>): ComputedRef<T>;
export function computed<T>(
  options: WritableComputedOptions<T>
): WritableComputedRef<T>;

/**
 * 侦听数据源变化
 * @param source - 数据源
 * @param callback - 回调函数
 * @param options - 侦听选项
 * @returns 停止侦听函数
 */
export function watch<T>(
  source: WatchSource<T>,
  callback: WatchCallback<T>,
  options?: WatchOptions
): WatchStopHandle;

/**
 * 下一个 DOM 更新周期后执行回调
 * @param callback - 回调函数
 * @returns Promise
 */
export function nextTick(callback?: () => void): Promise<void>;

/**
 * 定义组件
 * @param options - 组件选项
 * @returns 组件对象
 */
export function defineComponent<Props, Data = Record<string, any>>(
  options: ComponentOptions<Props, Data>
): Component;

// ============================================================================
// 类型别名
// ============================================================================

export type Component = ComponentOptions | FunctionalComponent;
export type VNodeTypes = string | Component | symbol;
export type VNodeProps = Record<string, any>;
export type VNodeNormalizedChildren = string | VNode[] | null;
export type VNodeNormalizedRef = Function | Ref | null;
export type ComputedGetter<T> = () => T;
export type WatchSource<T = any> = Ref<T> | (() => T);
export type WatchCallback<T = any> = (
  value: T,
  oldValue: T,
  onCleanup: (fn: () => void) => void
) => void;
export type WatchStopHandle = () => void;
export type EmitFn = (event: string, ...args: any[]) => void;
export type SetupFunction<Props = any> = (
  props: Props,
  ctx: SetupContext
) => object | (() => VNode);
export type ValidationFunction = (...args: any[]) => boolean;
export type OptionMergeFunction = (to: any, from: any) => any;
export type Plugin<Options = any[]> = {
  install: (app: App, ...options: Options) => void;
};
export type Directive = ObjectDirective | FunctionDirective;
export type Slots = Record<string, Slot>;
export type Slot = (...args: any[]) => VNode[];

/**
 * 组件内部实例（内部使用）
 */
export interface ComponentInternalInstance {
  uid: number;
  type: Component;
  parent: ComponentInternalInstance | null;
  appContext: AppContext;
  vnode: VNode;
  next: VNode | null;
  subTree: VNode;
  proxy: ComponentPublicInstance | null;
  [key: string]: any;
}

export interface AppContext {
  app: App;
  config: AppConfig;
  mixins: ComponentOptions[];
  components: Record<string, Component>;
  directives: Record<string, Directive>;
  provides: Record<string | symbol, any>;
}

export interface SetupContext {
  attrs: Record<string, unknown>;
  slots: Slots;
  emit: EmitFn;
  expose: (exposed: Record<string, any>) => void;
}

export interface WatchOptions {
  immediate?: boolean;
  deep?: boolean;
  flush?: 'pre' | 'post' | 'sync';
  onTrack?: (event: DebuggerEvent) => void;
  onTrigger?: (event: DebuggerEvent) => void;
}

export interface WritableComputedOptions<T> {
  get: () => T;
  set: (value: T) => void;
}

export interface ObjectDirective<T = any, V = any> {
  created?: DirectiveHook<T, V>;
  beforeMount?: DirectiveHook<T, V>;
  mounted?: DirectiveHook<T, V>;
  beforeUpdate?: DirectiveHook<T, V>;
  updated?: DirectiveHook<T, V>;
  beforeUnmount?: DirectiveHook<T, V>;
  unmounted?: DirectiveHook<T, V>;
}

export interface RuntimeCompilerOptions {
  isCustomElement?: (tag: string) => boolean;
  whitespace?: 'preserve' | 'condense';
  comments?: boolean;
  delimiters?: [string, string];
}

export type FunctionDirective<T = any, V = any> = DirectiveHook<T, V>;
export type DirectiveHook<T = any, V = any> = (
  el: T,
  binding: DirectiveBinding<V>,
  vnode: VNode,
  prevVNode: VNode | null
) => void;
export type FunctionalComponent<Props = any> = (
  props: Props,
  ctx: SetupContext
) => VNode | VNode[];
export type WatchMethod = <T>(
  source: WatchSource<T>,
  callback: WatchCallback<T>,
  options?: WatchOptions
) => WatchStopHandle;
export type InjectionKey<T> = symbol & { __type?: T };
export type ReactiveEffect<T = any> = () => T;

export interface DirectiveBinding<V = any> {
  instance: ComponentPublicInstance | null;
  value: V;
  oldValue: V | null;
  arg?: string;
  modifiers: Record<string, boolean>;
  dir: ObjectDirective<any, V>;
}

export interface DebuggerEvent {
  effect: ReactiveEffect;
  target: object;
  type: 'get' | 'set' | 'add' | 'delete' | 'clear';
  key: any;
  newValue?: any;
  oldValue?: any;
}

declare const RefSymbol: unique symbol;