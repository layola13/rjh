/**
 * Webpack Bundle Type Definitions
 * 自动生成的类型声明文件
 */

// ==================== 命名模块导出 ====================

/** 求和工具函数模块 */
export declare function sum(...numbers: number[]): number;

/** 数组平均值计算模块 */
export declare function avg(numbers: number[]): number;

/** 百分比计算模块 */
export declare function percent(value: number, total: number): number;

/** 数值加法模块 */
export declare function add(a: number, b: number): number;

/** 对象属性获取模块 */
export declare function get<T, K extends keyof T>(obj: T, key: K): T[K];

/** 对象属性设置模块 */
export declare function set<T, K extends keyof T>(obj: T, key: K, value: T[K]): void;

/** Getter工厂函数 */
export declare function getterFor<T>(key: string): (obj: any) => T;

/** 性能监控模块 */
export declare namespace performance {
  function mark(name: string): void;
  function measure(name: string, startMark: string, endMark: string): void;
}

/** 速度计算模块 */
export declare function speed(distance: number, time: number): number;

/** 值处理模块 */
export declare function value<T>(input: T): T;

// ==================== 事件处理模块 ====================

/** 点击事件处理器类型 */
export declare type OnClickHandler = (event: MouseEvent) => void;

/** 点击事件模块 */
export declare const onClick: OnClickHandler;

/** 错误处理器类型 */
export declare type OnErrorHandler = (error: Error) => void;

/** 错误处理模块 */
export declare const onError: OnErrorHandler;

/** 选择事件处理器类型 */
export declare type OnSelectHandler = (selectedValue: any) => void;

/** 选择事件处理模块 */
export declare const onSelect: OnSelectHandler;

/** 关闭后回调类型 */
export declare type AfterCloseCallback = () => void;

/** 关闭后回调模块 */
export declare const afterClose: AfterCloseCallback;

/** 通用事件模块 */
export declare namespace event {
  function emit(eventName: string, ...args: any[]): void;
  function on(eventName: string, handler: Function): void;
  function off(eventName: string, handler: Function): void;
}

// ==================== 浏览器前缀模块 ====================

/** Webkit浏览器前缀工具 */
export declare const Webkit: string;

/** Mozilla浏览器前缀工具 */
export declare const Moz: string;

/** O浏览器前缀工具 */
export declare const O: string;

// ==================== UI组件模块 ====================

/** 字符渲染器接口 */
export declare interface CharacterRenderOptions {
  text: string;
  fontSize?: number;
  color?: string;
}

/** 字符渲染模块 */
export declare function characterRender(options: CharacterRenderOptions): HTMLElement;

/** 消息提示模块 */
export declare namespace msg {
  function info(content: string): void;
  function success(content: string): void;
  function warning(content: string): void;
  function error(content: string): void;
}

/** 行为配置接口 */
export declare interface BehaviorConfig {
  type: string;
  action: Function;
}

/** 行为模块 */
export declare const behavior: BehaviorConfig;

// ==================== 资源管理模块 ====================

/** 资源加载器接口 */
export declare interface ResourceLoader {
  load(url: string): Promise<any>;
  unload(url: string): void;
}

/** 资源管理模块 */
export declare const resource: ResourceLoader;

// ==================== API模块 ====================

/** API请求配置接口 */
export declare interface ApiConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/** API响应接口 */
export declare interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

/** API模块 */
export declare namespace api {
  function get<T = any>(url: string, config?: ApiConfig): Promise<ApiResponse<T>>;
  function post<T = any>(url: string, data?: any, config?: ApiConfig): Promise<ApiResponse<T>>;
  function put<T = any>(url: string, data?: any, config?: ApiConfig): Promise<ApiResponse<T>>;
  function delete<T = any>(url: string, config?: ApiConfig): Promise<ApiResponse<T>>;
}

// ==================== 工具模块 ====================

/** 毫秒时间工具 */
export declare const ms: number;

/** 错误对象 */
export declare const error: Error;

/** 强制执行模块 */
export declare function enforce(condition: boolean, message?: string): void;

/** 引用对象类型 */
export declare interface Ref<T> {
  current: T;
}

/** 引用创建函数 */
export declare function ref<T>(initialValue: T): Ref<T>;

/** 全部完成工具 */
export declare function all<T>(promises: Promise<T>[]): Promise<T[]>;

/** Foo模块（待明确用途） */
export declare const foo: any;

// ==================== 数字模块（需要实际代码确定用途） ====================

/** 数字模块映射表 - 需要实际实现才能提供准确类型 */
declare module 'module_246912' { export default any; }
declare module 'module_404814' { export default any; }
declare module 'module_432166' { export default any; }
// ... (其他数字模块需要实际代码才能定义)

// ==================== 模块声明 ====================

/** 支持从数字ID导入模块 */
declare module '*' {
  const content: any;
  export default content;
}