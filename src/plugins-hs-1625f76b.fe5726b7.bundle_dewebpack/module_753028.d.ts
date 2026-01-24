/**
 * CSS模块导出类型定义
 * 该模块用于加载和导出样式表内容，主要涉及右侧属性栏的样式定义
 * @module StyleModule
 */

/**
 * Webpack模块加载器函数类型
 */
type WebpackRequire = (moduleId: number) => any;

/**
 * CSS模块导出接口
 * 表示一个CSS模块的导出结构
 */
interface CSSModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  /** CSS内容字符串 */
  toString(): string;
  /** 将CSS内容推送到样式数组 */
  push(data: [string | number, string]): void;
}

/**
 * 样式加载器工厂函数类型
 * @param insertType - 是否为插入类型（true为插入模式，false为普通模式）
 * @returns 返回一个CSS模块导出对象
 */
type CSSLoaderFactory = (insertType: boolean) => CSSModuleExports;

/**
 * 图片资源URL处理函数类型
 * 用于处理图片资源路径，通常在CSS中引用的图片需要通过此函数转换为正确的URL
 * @param resourcePath - 资源模块ID或路径
 * @returns 处理后的图片URL字符串
 */
type AssetUrlProcessor = (resourcePath: number | string) => string;

/**
 * Webpack模块定义函数签名
 * @param moduleExports - 当前模块的导出对象
 * @param moduleDefinition - 模块定义对象（包含id、exports等）
 * @param webpackRequire - Webpack的require函数，用于加载其他模块
 */
type WebpackModuleFunction = (
  moduleExports: any,
  moduleDefinition: { id: string | number; exports: any },
  webpackRequire: WebpackRequire
) => void;

/**
 * 样式模块内容
 * 包含右侧属性栏相关的CSS样式定义，涵盖以下功能区域：
 * - 内容操作区 (.contentmanipulation)
 * - 2D翻转按钮 (#Content2DFlipButtons)
 * - 右侧属性栏各种分隔线和间距
 * - 锁定状态图标
 * - 自定义瓷砖旋转
 * - 模型尺寸解锁
 * - 面板主体样式（线框模式、灯槽模式等）
 * - 自定义装饰线和灯槽的翻转控制
 */
declare const styleContent: string;

/**
 * 模块资源ID常量
 */
declare const enum ModuleIds {
  /** 资源URL处理器模块ID */
  ASSET_URL_PROCESSOR = 992716,
  /** CSS加载器工厂模块ID */
  CSS_LOADER_FACTORY = 986380,
  /** 锁定图标（非激活状态）资源ID */
  LOCK_INACTIVE_ICON = 530758,
  /** 锁定图标（激活状态）资源ID */
  LOCK_ACTIVE_ICON = 188440,
}

/**
 * CSS样式类名定义
 * 该模块导出的样式类包含以下主要部分：
 */
declare namespace StyleClasses {
  /** 内容操作容器 */
  const contentmanipulation: string;
  
  /** 2D翻转按钮容器 */
  const Content2DFlipButtons: string;
  
  /** 右侧属性栏 */
  namespace rightpropertybar {
    /** 高度分隔线 */
    const elevation_divider: string;
    /** 房间属性第一行水平分隔线 */
    const roomproperty_firstRowhdivider: string;
    /** 房间属性第二行水平分隔线 */
    const roomproperty_secondRowhdivider: string;
    /** 宽度-厚度垂直分隔线 */
    const width_thick_vdivider: string;
    /** 厚度-高度垂直分隔线 */
    const thick_height_vdivider: string;
    /** 长度-厚度垂直分隔线 */
    const length_thick_vdivider: string;
    /** 宽度-高度垂直分隔线 */
    const width_height_vdivider: string;
    /** 宽度-长度-高度默认垂直分隔线 */
    const width_length_height_default_vdivider: string;
    /** 正交模式分隔线 */
    const orthoMode_divider: string;
    /** 锁定图标（非激活状态） */
    const lock_inactive: string;
    /** 锁定图标（激活状态） */
    const lock_active: string;
    /** 自定义瓷砖旋转分隔线 */
    const customized_tiles_rotate_divider: string;
    /** 模型解锁尺寸 */
    const model_unlock_dimension: string;
    /** 面板主体 */
    const panel_body: string;
    /** 灯槽面板主体 */
    const light_slot_panel_body: string;
    /** 自定义装饰线翻转 */
    const customized_molding_flip: string;
    /** 自定义灯槽翻转 */
    const customized_light_slot_flip: string;
  }
  
  /** 全局英文样式 */
  namespace global_en {
    namespace rightpropertybar {
      const model_unlock_dimension: string;
    }
  }
}

export {};