/**
 * CSS模块加载器的类型定义
 * 用于处理beginner-steps-dialog组件的样式
 */

/**
 * Webpack模块导出函数
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数
 */
declare function cssModuleLoader(
  exports: CSSModuleExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * CSS模块导出接口
 */
interface CSSModuleExports {
  /** 模块ID */
  id: string | number;
  /** 模块导出内容 */
  exports: unknown;
  /** 标识此模块是否已加载 */
  loaded?: boolean;
}

/**
 * Webpack模块对象接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: unknown;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出内容
 */
interface WebpackRequire {
  (moduleId: string | number): unknown;
}

/**
 * CSS加载器工厂函数返回类型
 * @param sourceMap - 是否启用source map
 * @returns CSS加载器实例
 */
interface CSSLoaderFactory {
  (sourceMap: boolean): CSSLoader;
}

/**
 * CSS加载器接口
 */
interface CSSLoader {
  /**
   * 推送CSS内容到加载器
   * @param entry - CSS条目 [模块ID, CSS内容字符串, 可选的source map]
   */
  push(entry: [string | number, string, string?]): void;
}

/**
 * 图片URL处理函数类型
 * @param imagePath - 图片模块路径或ID
 * @returns 处理后的图片URL
 */
type ImageUrlResolver = (imagePath: string | number) => string;

/**
 * 新手引导步骤对话框的CSS类名常量
 */
declare const enum BeginnerStepsDialogClasses {
  /** 弹窗容器 - 固定定位的全屏遮罩层 */
  Popup = 'beginner-steps-dialog .popup',
  /** 弹窗叠加层 - z-index: 4100 */
  PopupOverlay = 'beginner-steps-dialog .popupoverlay',
  /** 引导弹窗主容器 - 居中显示，尺寸500x550px */
  GuidePop = 'beginner-steps-dialog .guide-pop',
  /** 引导弹窗顶部区域 */
  GuidePopTop = 'beginner-steps-dialog .guide-pop-top',
  /** 顶部背景图 - 使用阿里云CDN图片 */
  GuidePopTopBackground = 'beginner-steps-dialog .guide-pop-top-background',
  /** 顶部Logo - 96x120px，右上角定位 */
  GuidePopTopLogo = 'beginner-steps-dialog .guide-pop-top-logo',
  /** 顶部标题标签 - 30px加粗黑色字体 */
  GuidePopTopHeaderLabel = 'beginner-steps-dialog .guide-pop-top-header-label',
  /** 关闭按钮 - 右上角圆形按钮 */
  GuidePopTopDialogClose = 'beginner-steps-dialog .guide-pop-top-dialog-close',
  /** 关闭按钮hover状态 */
  GuidePopTopDialogCloseHover = 'beginner-steps-dialog .guide-pop-top-dialog-close:hover',
  /** 关闭按钮图标 */
  GuidePopTopDialogCloseIcon = 'beginner-steps-dialog .guide-pop-top-dialog-close .hs-iconfont-view',
  /** 二维码容器 - 居中显示，200px宽度 */
  GuidePopTopQrcode = 'beginner-steps-dialog .guide-pop-top-qrcode',
  /** 引导弹窗底部区域 - 300px高度 */
  GuidePopBottom = 'beginner-steps-dialog .guide-pop-bottom',
  /** 底部推荐列表容器 */
  GuidePopBottomRecommendations = 'beginner-steps-dialog .guide-pop-bottom-recommendations',
  /** 推荐项 - 网格布局，116px高度，8px圆角 */
  GuidePopBottomRecommendationsItem = 'beginner-steps-dialog .guide-pop-bottom-recommendations-item',
  /** 推荐项箭头图标 */
  GuidePopBottomRecommendationsItemArrow = 'beginner-steps-dialog .guide-pop-bottom-recommendations-item-arrow',
  /** 推荐项信息区域 */
  GuidePopBottomRecommendationsItemInfo = 'beginner-steps-dialog .guide-pop-bottom-recommendations-item-info',
  /** 推荐项图片 - 167x116px圆角 */
  GuidePopBottomRecommendationsItemImg = 'beginner-steps-dialog .guide-pop-bottom-recommendations-item-img',
  /** 帮助中心推荐项图片 */
  GuidePopBottomRecommendationsItemHelp = 'beginner-steps-dialog .guide-pop-bottom-recommendations-item .help',
  /** 设计资源推荐项图片 */
  GuidePopBottomRecommendationsItemDesign = 'beginner-steps-dialog .guide-pop-bottom-recommendations-item .design',
  /** 推荐项标题 - 18px加粗黑色 */
  GuidePopBottomRecommendationsItemTitle = 'beginner-steps-dialog .guide-pop-bottom-recommendations-item-title',
  /** 推荐项描述 - 14px灰色 */
  GuidePopBottomRecommendationsItemDesc = 'beginner-steps-dialog .guide-pop-bottom-recommendations-item-desc',
  /** 底部聊天文本 - 16px */
  GuidePopBottomChat = 'beginner-steps-dialog .guide-pop-bottom-chat',
  /** 确认按钮 - 蓝色圆角按钮，底部居中 */
  GuidePopBottomOk = 'beginner-steps-dialog .guide-pop-bottom-ok',
  /** 确认按钮hover状态 */
  GuidePopBottomOkHover = 'beginner-steps-dialog .guide-pop-bottom-ok:hover'
}

/**
 * 模块依赖的资源ID
 */
declare const enum ModuleDependencies {
  /** 图片URL解析器模块ID */
  ImageUrlResolver = 992716,
  /** CSS加载器工厂模块ID */
  CSSLoaderFactory = 986380,
  /** 帮助中心图片资源ID */
  HelpImage = 974126,
  /** 设计资源图片资源ID */
  DesignImage = 507221
}

export {};