/**
 * Scene Decorators - 场景装饰器
 * 提供字段装饰器、可观察装饰器等
 */

/**
 * Field decorator - 标记实体字段
 */
export function field(target: any, propertyKey: string): void;
export function field(options?: any): (target: any, propertyKey: string) => void;

/**
 * Observable decorator - 标记可观察属性
 */
export function observable(target: any, propertyKey: string): void;
export function observable(options?: any): (target: any, propertyKey: string) => void;

/**
 * Computed decorator - 标记计算属性
 */
export function computed(target: any, propertyKey: string): void;
export function computed(options?: any): (target: any, propertyKey: string) => void;

/**
 * Action decorator - 标记动作方法
 */
export function action(target: any, propertyKey: string): void;
export function action(options?: any): (target: any, propertyKey: string) => void;