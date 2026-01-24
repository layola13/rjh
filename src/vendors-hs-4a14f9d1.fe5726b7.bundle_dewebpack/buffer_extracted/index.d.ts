/**
 * Module Set - 设置功能模块
 */
export declare function set<T>(key: string, value: T): void;

/**
 * Module Get - 获取功能模块
 */
export declare function get<T>(key: string): T | undefined;

/**
 * Module Foo - Foo功能模块
 */
export declare function foo(): void;

/**
 * Date/Time Format Modules - 日期时间格式化模块
 */

/** 周相关格式化 - Week day name (e.g., Sunday) */
export declare const W: (date: Date, locale?: string) => string;

/** 周相关格式化 - Week day name short (e.g., Sun) */
export declare const w: (date: Date, locale?: string) => string;

/** 日期格式化 - Day of month (01-31) */
export declare const d: (date: Date) => string;

/** 日期格式化 - Day of month without leading zero (1-31) */
export declare const j: (date: Date) => number;

/** 时区格式化 - Timezone abbreviation (e.g., EST) */
export declare const Z: (date: Date) => string;

/** 时区格式化 - Timezone offset in minutes */
export declare const z: (date: Date) => number;

/** 时区格式化 - Timezone name */
export declare const e: (date: Date) => string;

/** 时区格式化 - Timezone in ISO format */
export declare const t: (date: Date) => string;

/** 纳秒/毫秒格式化 - Nanoseconds */
export declare const n: (date: Date) => number;

/** 小时格式化 - Hour 24-hour format (00-23) */
export declare const H: (date: Date) => string;

/** 小时格式化 - Hour 12-hour format (01-12) */
export declare const I: (date: Date) => string;

/** 小时格式化 - Hour 24-hour without leading zero (0-23) */
export declare const G: (date: Date) => number;

/** 小时格式化 - Hour 12-hour without leading zero (1-12) */
export declare const g: (date: Date) => number;

/** 秒格式化 - Seconds (00-59) */
export declare const S: (date: Date) => string;

/** 分钟格式化 - Minutes (00-59) */
export declare const M: (date: Date) => string;

/** 分钟格式化 - Minutes without leading zero (0-59) */
export declare const m: (date: Date) => number;

/** 年份格式化 - Full year (e.g., 2024) */
export declare const Y: (date: Date) => number;

/** 年份格式化 - Two digit year (e.g., 24) */
export declare const y: (date: Date) => string;

/** AM/PM格式化 - Uppercase (AM/PM) */
export declare const A: (date: Date) => 'AM' | 'PM';

/** AM/PM格式化 - Lowercase (am/pm) */
export declare const a: (date: Date) => 'am' | 'pm';

/** 月份格式化 - Month name (e.g., January) */
export declare const B: (date: Date, locale?: string) => string;

/** 月份格式化 - Month name abbreviated (e.g., Jan) */
export declare const b: (date: Date, locale?: string) => string;

/** 月份格式化 - Month as number (01-12) */
export declare const V: (date: Date) => string;

/** Unix时间戳 - Unix timestamp in seconds */
export declare const U: (date: Date) => number;

/** Unix时间戳 - Unix timestamp in milliseconds */
export declare const u: (date: Date) => number;

/** 世纪格式化 - Century (e.g., 20 for 2024) */
export declare const C: (date: Date) => number;

/** AM/PM格式化 - Period indicator (upper/lower) */
export declare const p: (date: Date, uppercase?: boolean) => string;

/**
 * 主模块 - 百分号转义
 * Literal percent sign
 */
export declare const PERCENT: '%';

/**
 * Type Definitions - 类型定义
 */

/** 日期格式化器类型 */
export type DateFormatter = (date: Date, locale?: string) => string | number;

/** 格式化选项 */
export interface FormatOptions {
  locale?: string;
  timezone?: string;
  use24Hour?: boolean;
}

/** 模块导出映射 */
export interface ModuleMap {
  set: typeof set;
  get: typeof get;
  foo: typeof foo;
  '%W': typeof W;
  '%w': typeof w;
  '%d': typeof d;
  '%j': typeof j;
  '%Z': typeof Z;
  '%z': typeof z;
  '%e': typeof e;
  '%t': typeof t;
  '%n': typeof n;
  '%H': typeof H;
  '%I': typeof I;
  '%G': typeof G;
  '%g': typeof g;
  '%S': typeof S;
  '%M': typeof M;
  '%m': typeof m;
  '%Y': typeof Y;
  '%y': typeof y;
  '%A': typeof A;
  '%a': typeof a;
  '%B': typeof B;
  '%b': typeof b;
  '%V': typeof V;
  '%U': typeof U;
  '%u': typeof u;
  '%C': typeof C;
  '%p': typeof p;
  '%%': typeof PERCENT;
}