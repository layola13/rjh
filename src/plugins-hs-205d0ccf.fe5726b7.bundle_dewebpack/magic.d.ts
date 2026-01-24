/**
 * Magic模块类型定义
 * 提供页面配置、模块定义和领域列表等核心类型
 */

/**
 * 页面尺寸配置
 */
export interface PageSizeConfig {
  /** 宽度（像素） */
  width: number;
  /** 高度（像素） */
  height: number;
  /** 水平位置 */
  positionX: 'left' | 'right' | 'center';
}

/**
 * 缩放配置
 */
export interface ZoomableConfig {
  /** 是否启用缩放 */
  used: boolean;
}

/**
 * 默认拖拽模型配置
 */
export interface DefaultDragModel {
  /** 页面尺寸配置 */
  pageSize: PageSizeConfig;
  /** 缩放配置 */
  zoomable: ZoomableConfig;
}

/**
 * Magic标识符
 */
export interface Magic {
  /** 新版本标识 */
  new: string;
  /** 旧版本标识 */
  old: string;
}

/**
 * 模块信息
 */
export interface ModuleInfo {
  /** 模块名称 */
  name: string;
}

/**
 * 环境类型枚举
 */
export type EnvironmentType =
  | 'Default'
  | 'CustomizedCeilingModel'
  | 'CustomizedBackgroundWall'
  | 'CustomizedPlatform'
  | 'MixPaint'
  | 'CustomizedPM'
  | 'Render'
  | 'atlas-render'
  | 'upload-model'
  | 'ConcealedWorkV2'
  | 'other';

/**
 * 模块映射表
 */
export type Modules = Record<EnvironmentType, ModuleInfo>;

/**
 * 领域列表项
 */
export interface DomainItem {
  /** 领域键值 */
  key: string;
  /** 领域名称 */
  name: string;
}

/**
 * 页面组件类型
 */
export interface PageComponent {
  (...args: any[]): any;
}

/**
 * 页面集合
 */
export interface Pages {
  /** 首页组件 */
  HomePage: PageComponent;
  /** 搜索页组件 */
  SearchPage: PageComponent;
  /** 周期页组件 */
  PeriodPage: PageComponent;
  /** 文章页组件 */
  ArticlePage: PageComponent;
}

/**
 * 模块定义映射表
 * 将环境类型映射到对应的模块信息
 */
export const modules: Modules;

/**
 * 领域列表
 * 包含所有可用的业务领域配置
 */
export const domainList: ReadonlyArray<DomainItem>;

/**
 * 默认拖拽模型配置
 * 定义拖拽交互的默认行为和尺寸
 */
export const defaultDragModel: DefaultDragModel;

/**
 * 分页大小常量
 */
export const PageSize: 50;

/**
 * Magic版本标识
 * 包含新旧两个版本的唯一标识符
 */
export const Magic: Magic;

/**
 * 页面组件集合
 * 包含所有核心页面的组件引用
 */
export const PAGES: Pages;