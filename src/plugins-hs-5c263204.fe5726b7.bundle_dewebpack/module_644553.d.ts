/**
 * CSS模块导出类型定义
 * 用于Webpack css-loader生成的CSS模块
 */

/**
 * CSS模块导出函数类型
 * @param useSourceMap - 是否使用source map
 * @returns CSS模块数组，包含模块ID和CSS内容
 */
type CssLoaderExport = (useSourceMap: boolean) => {
  push: (entry: [string, string, string?]) => void;
};

/**
 * Webpack模块导出接口
 */
interface ModuleExports {
  /** 模块ID */
  id: string;
  /** 模块导出内容 */
  exports: {
    push: (entry: [string, string, string?]) => void;
  };
}

/**
 * CSS样式类名映射接口
 */
interface GuideLoadingStyles {
  /** 引导加载外层包裹容器类名 */
  guideloadingWrapper: string;
  /** 引导加载内容容器类名 */
  guideloading: string;
  /** 图片容器类名 */
  image: string;
}

/**
 * 默认导出：CSS模块样式对象
 */
declare const styles: GuideLoadingStyles;

export default styles;

/**
 * CSS模块内容常量
 * 包含引导加载相关的样式定义：
 * - .guideloadingWrapper: 全屏固定定位容器（z-index: 1030）
 * - .guideloadingWrapper .guideloading: 居中弹窗容器（840x560布局中的600x250白色背景区域）
 * - .guideloadingWrapper .guideloading .image: 居中显示的148px宽度图片容器
 */
export const CSS_CONTENT: string;