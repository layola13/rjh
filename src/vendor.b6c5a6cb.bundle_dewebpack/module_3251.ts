interface JQueryStatic {
  (selector: string, context?: Document | Element): JQuery;
  (element: Element): JQuery;
  (callback: (jq: JQueryStatic) => void): JQuery;
  fn: JQuery;
  prototype: JQuery;
  extend(...args: any[]): any;
  find: SizzleStatic;
  expr: SizzleSelectors;
  uniqueSort(array: Element[]): Element[];
  unique(array: Element[]): Element[];
  text(element: Element): string;
  isXMLDoc(node: Node): boolean;
  contains(container: Element, contained: Element): boolean;
  escapeSelector(selector: string): string;
  isFunction(obj: any): obj is Function;
  isWindow(obj: any): obj is Window;
  isNumeric(value: any): boolean;
  isPlainObject(obj: any): boolean;
  isEmptyObject(obj: any): boolean;
  type(obj: any): string;
  globalEval(code: string): void;
  camelCase(str: string): string;
  each<T>(obj: T[], callback: (index: number, value: T) => boolean | void): T[];
  each<T>(obj: Record<string, T>, callback: (key: string, value: T) => boolean | void): Record<string, T>;
  trim(str: string): string;
  makeArray<T>(obj: any, results?: T[]): T[];
  inArray<T>(value: T, array: T[], fromIndex?: number): number;
  merge<T>(first: T[], second: T[]): T[];
  grep<T>(array: T[], callback: (value: T, index: number) => boolean, invert?: boolean): T[];
  map<T, U>(array: T[], callback: (value: T, index: number, extra?: any) => U | null): U[];
  guid: number;
  proxy<T extends Function>(fn: T, context: any, ...args: any[]): T;
  now(): number;
  support: Record<string, boolean>;
  Callbacks(flags?: string): JQueryCallbacks;
  Deferred<T = any>(beforeStart?: (deferred: JQueryDeferred<T>) => void): JQueryDeferred<T>;
  when<T>(...deferreds: any[]): JQueryPromise<T>;
  readyException(error: Error): void;
  fn: JQuery;
  isReady: boolean;
  readyWait: number;
  ready(handler?: (jq: JQueryStatic) => void): void;
  hasData(element: Element): boolean;
  data(element: Element, key: string, value?: any): any;
  removeData(element: Element, key?: string): void;
  queue(element: Element, queueName?: string, newQueue?: any[]): any[];
  dequeue(element: Element, queueName?: string): void;
  css(element: Element, propertyName: string): string;
  style(element: Element, propertyName: string, value: string | number, priority?: string): void;
  Tween: typeof Tween;
  fx: {
    tick(): void;
    interval: number;
    step: Record<string, (tween: Tween) => void>;
  };
  easing: Record<string, (percent: number) => number>;
  event: JQueryEventStatic;
  Event: JQueryEventConstructor;
  removeEvent(element: Element, type: string, handler: EventListener): void;
  cssHooks: Record<string, CSSHook>;
  cssNumber: Record<string, boolean>;
  cssProps: Record<string, string>;
}

interface JQuery {
  jquery: string;
  constructor: JQueryStatic;
  length: number;
  toArray(): Element[];
  get(index?: number): Element | Element[];
  pushStack(elements: Element[]): JQuery;
  each(callback: (index: number, element: Element) => boolean | void): JQuery;
  map(callback: (index: number, element: Element) => any): JQuery;
  slice(start?: number, end?: number): JQuery;
  first(): JQuery;
  last(): JQuery;
  eq(index: number): JQuery;
  end(): JQuery;
  push: typeof Array.prototype.push;
  sort: typeof Array.prototype.sort;
  splice: typeof Array.prototype.splice;
  find(selector: string): JQuery;
  filter(selector: string | ((index: number) => boolean)): JQuery;
  not(selector: string | Element | ((index: number) => boolean)): JQuery;
  is(selector: string): boolean;
  has(selector: string | Element): JQuery;
  closest(selector: string, context?: Element): JQuery;
  index(element?: string | Element | JQuery): number;
  add(selector: string | Element | JQuery, context?: Element): JQuery;
  addBack(selector?: string): JQuery;
  parent(selector?: string): JQuery;
  parents(selector?: string): JQuery;
  parentsUntil(selector?: string, filter?: string): JQuery;
  next(selector?: string): JQuery;
  prev(selector?: string): JQuery;
  nextAll(selector?: string): JQuery;
  prevAll(selector?: string): JQuery;
  nextUntil(selector?: string, filter?: string): JQuery;
  prevUntil(selector?: string, filter?: string): JQuery;
  siblings(selector?: string): JQuery;
  children(selector?: string): JQuery;
  contents(): JQuery;
  ready(handler: (jq: JQueryStatic) => void): JQuery;
  data(key: string, value?: any): any;
  removeData(key?: string): JQuery;
  queue(queueName?: string, newQueue?: any[]): any;
  dequeue(queueName?: string): JQuery;
  clearQueue(queueName?: string): JQuery;
  promise(type?: string, target?: any): JQueryPromise<any>;
  show(): JQuery;
  hide(): JQuery;
  toggle(showOrHide?: boolean): JQuery;
  on(events: string, selector?: string, data?: any, handler?: EventListener, one?: number): JQuery;
  one(events: string, selector?: string, data?: any, handler?: EventListener): JQuery;
  off(events?: string, selector?: string, handler?: EventListener): JQuery;
  detach(selector?: string): JQuery;
  remove(selector?: string): JQuery;
  text(text?: string | ((index: number, text: string) => string)): string | JQuery;
  append(...content: any[]): JQuery;
  prepend(...content: any[]): JQuery;
  before(...content: any[]): JQuery;
  after(...content: any[]): JQuery;
  empty(): JQuery;
  clone(withDataAndEvents?: boolean, deepWithDataAndEvents?: boolean): JQuery;
  html(html?: string | ((index: number, oldHtml: string) => string)): string | JQuery;
  replaceWith(newContent: any): JQuery;
  appendTo(target: string | Element | JQuery): JQuery;
  prependTo(target: string | Element | JQuery): JQuery;
  insertBefore(target: string | Element | JQuery): JQuery;
  insertAfter(target: string | Element | JQuery): JQuery;
  replaceAll(target: string | Element | JQuery): JQuery;
  css(propertyName: string): string;
  css(propertyName: string, value: string | number): JQuery;
  css(properties: Record<string, string | number>): JQuery;
  [index: number]: Element;
}

interface JQueryCallbacks {
  add(callback: Function | Function[]): JQueryCallbacks;
  remove(callback: Function | Function[]): JQueryCallbacks;
  has(callback?: Function): boolean;
  empty(): JQueryCallbacks;
  disable(): JQueryCallbacks;
  disabled(): boolean;
  lock(): JQueryCallbacks;
  locked(): boolean;
  fireWith(context: any, args?: any[]): JQueryCallbacks;
  fire(...args: any[]): JQueryCallbacks;
  fired(): boolean;
}

interface JQueryDeferred<T = any> {
  state(): string;
  always(callback: (...args: any[]) => any): JQueryDeferred<T>;
  then(doneFilter?: (value: T) => any, failFilter?: (reason: any) => any, progressFilter?: (progress: any) => any): JQueryPromise<any>;
  promise(target?: any): JQueryPromise<T>;
  pipe(doneFilter?: (value: T) => any, failFilter?: (reason: any) => any, progressFilter?: (progress: any) => any): JQueryPromise<any>;
  done(callback: (value: T, ...args: any[]) => any): JQueryDeferred<T>;
  fail(callback: (reason: any, ...args: any[]) => any): JQueryDeferred<T>;
  progress(callback: (progress: any, ...args: any[]) => any): JQueryDeferred<T>;
  notify(...args: any[]): JQueryDeferred<T>;
  notifyWith(context: any, args?: any[]): JQueryDeferred<T>;
  resolve(...args: any[]): JQueryDeferred<T>;
  resolveWith(context: any, args?: any[]): JQueryDeferred<T>;
  reject(...args: any[]): JQueryDeferred<T>;
  rejectWith(context: any, args?: any[]): JQueryDeferred<T>;
  catch(failFilter: (reason: any) => any): JQueryPromise<any>;
}

interface JQueryPromise<T = any> {
  state(): string;
  always(callback: (...args: any[]) => any): JQueryPromise<T>;
  then(doneFilter?: (value: T) => any, failFilter?: (reason: any) => any, progressFilter?: (progress: any) => any): JQueryPromise<any>;
  promise(target?: any): JQueryPromise<T>;
  done(callback: (value: T, ...args: any[]) => any): JQueryPromise<T>;
  fail(callback: (reason: any, ...args: any[]) => any): JQueryPromise<T>;
  progress(callback: (progress: any, ...args: any[]) => any): JQueryPromise<T>;
  catch(failFilter: (reason: any) => any): JQueryPromise<any>;
  pipe(doneFilter?: (value: T) => any, failFilter?: (reason: any) => any, progressFilter?: (progress: any) => any): JQueryPromise<any>;
}

interface JQueryEventStatic {
  global: Record<string, boolean>;
  add(element: Element, types: string, handler: EventListener, data?: any, selector?: string): void;
  remove(element: Element, types?: string, handler?: EventListener, selector?: string, mappedTypes?: boolean): void;
  dispatch(nativeEvent: Event): any;
  handlers(event: Event, handlers: EventHandler[]): EventHandler[];
  addProp(name: string, hook: (event: Event) => any): void;
  fix(nativeEvent: Event): JQueryEvent;
  special: Record<string, SpecialEventHooks>;
}

interface JQueryEventConstructor {
  new (type: string, eventProperties?: any): JQueryEvent;
  (type: string, eventProperties?: any): JQueryEvent;
}

interface JQueryEvent extends Event {
  type: string;
  isDefaultPrevented(): boolean;
  isPropagationStopped(): boolean;
  isImmediatePropagationStopped(): boolean;
  isSimulated: boolean;
  originalEvent?: Event;
  timeStamp: number;
  delegateTarget?: Element;
  currentTarget?: Element;
  target?: Element;
  relatedTarget?: Element;
  handleObj?: EventHandler;
  data?: any;
  namespace?: string;
  result?: any;
  rnamespace?: RegExp;
}

interface EventHandler {
  type: string;
  origType: string;
  data?: any;
  handler: EventListener;
  guid: number;
  selector?: string;
  needsContext?: boolean;
  namespace: string;
}

interface SpecialEventHooks {
  noBubble?: boolean;
  bindType?: string;
  delegateType?: string;
  trigger?(event: Event): boolean | void;
  _default?(event: Event): boolean | void;
  setup?(data: any, namespaces: string[], eventHandle: EventListener): boolean | void;
  teardown?(namespaces: string[], eventHandle: EventListener): boolean | void;
  add?(handleObj: EventHandler): void;
  remove?(handleObj: EventHandler): void;
  handle?(event: Event, ...args: any[]): any;
  preDispatch?(event: Event): boolean | void;
  postDispatch?(event: Event): void;
}

interface SizzleStatic {
  (selector: string, context?: Element | Document, results?: Element[], seed?: Element[]): Element[];
  matches(selector: string, elements: Element[]): Element[];
  matchesSelector(element: Element, selector: string): boolean;
  contains(container: Element, contained: Element): boolean;
  attr(element: Element, name: string): string | null;
  escape(selector: string): string;
  error(message: string): never;
  uniqueSort(results: Element[]): Element[];
  getText(element: Element | Element[]): string;
  selectors: SizzleSelectors;
}

interface SizzleSelectors {
  cacheLength: number;
  createPseudo(fn: Function): Function;
  match: Record<string, RegExp>;
  attrHandle: Record<string, (element: Element, name: string, isXML: boolean) => string>;
  find: Record<string, (match: string, context: Element, isXML: boolean) => Element[] | undefined>;
  relative: Record<string, RelativeSelector>;
  preFilter: Record<string, (match: RegExpMatchArray) => RegExpMatchArray>;
  filter: Record<string, (match: string) => (element: Element) => boolean>;
  pseudos: Record<string, Function>;
  setFilters: Record<string, Function>;
}

interface RelativeSelector {
  dir: string;
  first?: boolean;
  next?: string;
}

interface CSSHook {
  get?(element: Element, computed: boolean, extra?: any): any;
  set?(element: Element, value: any): void;
}

interface Tween {
  elem: Element;
  prop: string;
  easing: string;
  options: TweenOptions;
  start: number;
  now: number;
  end: number;
  unit: string;
  cur(): number;
  run(percent: number): Tween;
}

interface TweenOptions {
  duration: number;
  step?: (now: number, tween: Tween) => void;
  specialEasing?: Record<string, string>;
  easing?: string;
}

declare const jQuery: JQueryStatic;
declare const $: JQueryStatic;

export default jQuery;
export { jQuery, $ };