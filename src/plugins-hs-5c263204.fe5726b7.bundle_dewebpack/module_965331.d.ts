/**
 * CSS模块导出的类型定义
 * 
 * 此模块包含反馈复选框块组件的样式定义
 * 包括复选框组布局、容器样式和主题变体
 */

/**
 * Webpack模块函数类型定义
 * 
 * @param e - 模块导出对象，用于导出当前模块的内容
 * @param t - 模块依赖对象（未使用）
 * @param n - Webpack的require函数，用于加载其他模块
 */
declare module 'module_965331' {
  /**
   * 模块导出对象接口
   */
  interface ModuleExports {
    /** 模块唯一标识符 */
    id: string | number;
    /** 导出的内容 */
    exports: CSSModuleExports;
  }

  /**
   * CSS模块加载器函数类型
   * 
   * @param sourceMap - 是否生成source map，false表示不生成
   * @returns CSS加载器实例
   */
  interface CSSLoader {
    /**
     * 添加CSS内容到加载器
     * 
     * @param content - 包含模块ID和CSS内容的数组
     *                  格式: [moduleId, cssString, sourceMap?]
     */
    push(content: [string | number, string, string?]): void;
  }

  /**
   * CSS模块导出接口
   * 包含样式字符串和相关元数据
   */
  interface CSSModuleExports extends CSSLoader {
    /** CSS内容字符串 */
    toString(): string;
  }

  /**
   * Webpack require函数类型
   * 
   * @param moduleId - 要加载的模块ID
   * @returns CSS加载器工厂函数
   */
  type WebpackRequire = (moduleId: number) => (sourceMap: boolean) => CSSLoader;

  /**
   * 模块工厂函数
   * Webpack用于初始化和注册模块的标准函数签名
   */
  export default function (
    moduleExports: ModuleExports,
    moduleContext: unknown,
    webpackRequire: WebpackRequire
  ): void;
}

/**
 * 样式类名定义
 * 此模块定义的CSS类名及其用途
 */
declare module 'module_965331/styles' {
  /**
   * 反馈复选框块的CSS类名
   */
  export interface FeedbackCheckboxBlockStyles {
    /** 主容器类名 */
    'feedback-checkbox-block': string;
    
    /** 复选框组容器类名 */
    'feedback-checkbox-block-checkboxgroup': string;
    
    /** 单个复选框容器类名 */
    'check-box-container': string;
    
    /** 复选框元素类名 */
    'check-box': string;
    
    /** 黑色主题变体类名 */
    'feedback-black': string;
  }

  const styles: FeedbackCheckboxBlockStyles;
  export default styles;
}