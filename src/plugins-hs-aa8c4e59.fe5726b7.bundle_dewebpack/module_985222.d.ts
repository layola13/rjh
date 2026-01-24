/**
 * CSS 模块声明文件
 * 用于设计风格对话框的样式定义
 * 
 * @module DesignStyleDialogStyles
 * @description 该模块导出设计风格对话框相关的CSS样式，包括对话框主体、头部、内容区域和底部按钮等样式定义
 */

/**
 * CSS 模块加载器函数类型
 * @param insertAt - CSS 插入位置配置（false 表示默认插入）
 * @returns CSS 模块管理器实例
 */
declare function cssLoader(insertAt: boolean): CSSModuleManager;

/**
 * CSS 模块管理器接口
 * 用于管理和注入 CSS 样式到文档中
 */
interface CSSModuleManager {
  /**
   * 推送 CSS 内容到样式管理器
   * @param entry - CSS 模块条目 [模块ID, CSS内容字符串, 源映射(可选)]
   */
  push(entry: [string, string, string?]): void;
}

/**
 * Webpack 模块导出接口
 */
interface ModuleExports {
  /** 模块导出对象 */
  exports: CSSModuleManager;
  /** 模块唯一标识符 */
  id: string;
}

/**
 * CSS 样式内容常量
 * 包含设计风格对话框的完整样式定义
 */
declare const CSS_CONTENT: string;

/**
 * 设计风格对话框样式类名命名空间
 * @description 定义对话框组件使用的所有 CSS 类名
 */
declare namespace DesignStyleDialogClassNames {
  /** 对话框包装器根类名 */
  const WRAPPER: '.design-style-dialog-wrapper';
  
  /** 对话框主容器类名 */
  const MAIN: '.design-style-dialog-main';
  
  /** 对话框头部区域类名 */
  const HEADER: '.design-style-header';
  
  /** 标题文本类名 */
  const TITLE: '.design-style-title';
  
  /** 关闭按钮类名 */
  const CLOSE: '.design-style-close';
  
  /** 对话框主体内容区域类名 */
  const BODY: '.design-style-body';
  
  /** 样式项列表容器类名 */
  const ITEMS: '.design-style-items';
  
  /** 单个样式项类名 */
  const ITEM: '.design-style-item';
  
  /** 选中状态的样式项类名 */
  const ITEM_SELECTED: '.design-style-item-selected';
  
  /** 对话框底部操作区域类名 */
  const FOOT: '.design-style-foot';
  
  /** 按钮基础类名 */
  const BUTTON: '.design-style-button';
  
  /** 取消按钮类名 */
  const CANCEL_BUTTON: '.design-style-cancel-button';
  
  /** 确认按钮类名 */
  const CONFIRM_BUTTON: '.design-style-confirm-button';
  
  /** 禁用状态按钮类名 */
  const DISABLED_BUTTON: '.design-style-disabled-button';
}

/**
 * 设计风格对话框样式规范
 * @description 定义对话框各部分的样式属性和布局规则
 */
declare namespace DesignStyleDialogStyles {
  /**
   * 对话框主容器样式属性
   */
  interface MainContainer {
    /** 垂直居中定位 */
    top: '50%';
    /** 水平居中定位 */
    left: '50%';
    /** 绝对定位 */
    position: 'absolute';
    /** 层级索引 */
    zIndex: 3050;
    /** 居中变换 */
    transform: 'translate(-50%, -50%)';
    /** 盒模型 */
    boxSizing: 'border-box';
    /** 宽度 */
    width: '500px';
    /** 背景色 */
    backgroundColor: 'white';
    /** 圆角半径 */
    borderRadius: '8px';
    /** 内边距 */
    padding: '0 46px 0 54px';
  }

  /**
   * 头部区域样式属性
   */
  interface Header {
    /** 高度 */
    height: '72px';
  }

  /**
   * 标题文本样式属性
   */
  interface Title {
    /** 字重 */
    fontWeight: 'bold';
    /** 文字颜色 */
    color: '#19191E';
    /** 字体大小 */
    fontSize: '20px';
  }

  /**
   * 样式项尺寸
   */
  interface Item {
    /** 宽度 */
    width: '70px';
    /** 高度 */
    height: '28px';
    /** 字体大小 */
    fontSize: '12px';
  }

  /**
   * 按钮尺寸
   */
  interface Button {
    /** 宽度 */
    width: '146px';
    /** 高度 */
    height: '30px';
    /** 字体大小 */
    fontSize: '12px';
  }
}

/**
 * 模块导出
 * 将 CSS 内容注入到页面样式管理器中
 */
export {};