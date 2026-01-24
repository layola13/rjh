/**
 * CSS模块导出的类型定义
 * 该模块包含屋顶对话框(roof-dialog)相关的样式定义
 */

/**
 * Webpack CSS加载器模块导出函数类型
 * @param e - 模块导出对象
 * @param t - 模块依赖项(未使用)
 * @param n - Webpack require函数，用于加载依赖模块
 */
type CSSModuleExport = (
  e: { id: string; exports: CSSExports },
  t: unknown,
  n: WebpackRequire
) => void;

/**
 * Webpack require函数接口
 * @param moduleId - 模块ID
 * @returns CSS加载器实例
 */
interface WebpackRequire {
  (moduleId: number): CSSLoader;
}

/**
 * CSS加载器接口
 * @param hotReload - 是否启用热重载
 * @returns CSS加载器实例，支持push方法添加样式
 */
interface CSSLoader {
  (hotReload: boolean): CSSLoaderInstance;
}

/**
 * CSS加载器实例接口
 */
interface CSSLoaderInstance {
  /**
   * 添加CSS样式到加载器
   * @param entry - 样式条目 [模块ID, CSS内容字符串, 源映射(可选)]
   */
  push(entry: [string, string, string?]): void;
}

/**
 * 模块导出对象类型
 */
interface CSSExports {
  /** CSS加载器实例 */
  [key: string]: unknown;
}

/**
 * 屋顶对话框样式类名常量
 */
declare const RoofDialogClassNames: {
  /** 对话框包装器 */
  readonly wrapper: 'roof-dialog-wrapper';
  /** 对话框主体 */
  readonly main: 'roof-dialog-main';
  /** 对话框标题 */
  readonly title: 'roof-dialog-title';
  /** 关闭按钮 */
  readonly closeBtn: 'roof-dialog-close-btn';
  /** 头部容器 */
  readonly head: 'roof-dialog-head';
  /** 选择容器 */
  readonly chooseContainer: 'roof-choose-container';
  /** 子标题 */
  readonly subTitle: 'roof-sub-title';
  /** 选择项名称 */
  readonly chooseName: 'roof-choose-name';
  /** 复选框容器 */
  readonly checkboxContainer: 'roof-checkbox-container';
  /** 复选框项 */
  readonly checkboxItem: 'checkbox-item';
  /** 复选框 */
  readonly checkbox: 'roof-checkbox';
  /** 底部栏 */
  readonly footer: 'roof-dialog-footer';
  /** 保存按钮 */
  readonly saveButton: 'roof-dialog-save-button';
  /** 遮罩层 */
  readonly overlay: 'roof-dialog-overLay';
  /** 绘制屋顶容器 */
  readonly drawContainer: 'draw-roof-container';
};

/**
 * CSS样式字符串内容
 * 包含完整的屋顶对话框组件样式定义
 */
declare const cssContent: string;

export type { CSSModuleExport, CSSLoader, CSSLoaderInstance, CSSExports, WebpackRequire };
export { RoofDialogClassNames, cssContent };