/**
 * CSS模块导出的类型定义
 * 
 * 该模块导出VIP用户信息卡片相关的CSS样式
 * @module UserVipInfoStyles
 */

/**
 * Webpack模块加载器函数签名
 * 
 * @param exports - 模块导出对象
 * @param module - 模块元数据对象
 * @param require - 模块加载函数
 */
declare function webpackModule(
  exports: ModuleExports,
  module: Module,
  require: RequireFunction
): void;

/**
 * 模块导出对象接口
 */
interface ModuleExports {
  /** 模块ID */
  id: string | number;
  /** 导出的内容 */
  exports: CSSExport;
}

/**
 * 模块元数据接口
 */
interface Module {
  /** 唯一模块标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: CSSExport;
}

/**
 * 模块加载函数类型
 * 
 * @param moduleId - 要加载的模块ID
 * @returns 加载的模块导出对象
 */
type RequireFunction = (moduleId: number) => CSSLoaderFunction;

/**
 * CSS加载器函数类型
 * 
 * @param sourceMap - 是否启用源码映射
 * @returns CSS推送接口
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSPushable;

/**
 * CSS可推送接口
 */
interface CSSPushable {
  /**
   * 推送CSS模块内容
   * 
   * @param entry - CSS模块条目 [模块ID, CSS内容字符串, 可选的源码映射]
   */
  push(entry: [string | number, string, string?]): void;
}

/**
 * CSS导出对象类型
 */
type CSSExport = CSSPushable;

/**
 * VIP用户信息卡片样式类名映射
 */
interface UserVipInfoStyleClasses {
  /** 
   * VIP信息卡片容器样式
   * - 圆角卡片设计
   * - 白色文字
   * - 内边距和尺寸定义
   */
  'user-vip-info-item': string;
  
  /** 
   * 卡片顶部区域样式
   * - Flexbox布局
   * - 垂直居中对齐
   */
  'item-top': string;
  
  /** 
   * 顶部图标样式
   * - 固定尺寸20x20px
   * - 右侧间距
   */
  icon: string;
  
  /** 
   * 主文本样式
   * - 使用阿里巴巴普惠体粗体
   * - 自动增长填充空间
   */
  text: string;
  
  /** 
   * 右侧图标样式
   * - 固定尺寸不伸缩
   */
  'right-icon': string;
  
  /** 
   * 卡片底部区域样式
   * - 顶部和右侧外边距
   */
  'item-bottom': string;
  
  /** 
   * 新用户促销标签样式
   * - 绝对定位在右上角
   * - 红色背景
   * - 特殊圆角设计(左上、左下、右上圆角)
   */
  'new-user-sale': string;
}

export type { 
  UserVipInfoStyleClasses, 
  CSSExport, 
  ModuleExports, 
  Module, 
  RequireFunction 
};