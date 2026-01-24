/**
 * CSS模块类型定义
 * Module: module_254023
 * Original ID: 254023
 */

/**
 * Webpack模块导出函数类型
 * @param exports - 模块导出对象
 * @param module - 模块元数据对象
 * @param require - 模块加载函数
 */
declare module "module_254023" {
  /**
   * 模块导出对象
   */
  interface ModuleExports {
    /** 模块唯一标识符 */
    id: string | number;
    
    /**
     * 向CSS样式数组推送新的样式规则
     * @param styleRule - 包含模块ID和CSS内容的元组
     */
    push(styleRule: [string | number, string]): void;
  }

  /**
   * Webpack require函数类型
   * @param moduleId - 要加载的模块ID
   * @returns 返回CSS加载器函数
   */
  type WebpackRequire = (moduleId: number) => CssLoaderFunction;

  /**
   * CSS加载器函数类型
   * @param sourceMap - 是否启用source map
   * @returns 返回模块导出对象
   */
  type CssLoaderFunction = (sourceMap: boolean) => ModuleExports;

  /**
   * 属性拖拽面板的CSS类名定义
   */
  interface PropertyDraggableStyles {
    /** 主容器类名：homestyler-ui-components.draggable-modal-container.property-draggable */
    containerClass: "homestyler-ui-components draggable-modal-container property-draggable";
    
    /** hover状态的阴影效果 */
    hoverShadow: "10px 10px 50px 0 rgba(0, 0, 0, 0.2)";
    
    /** 缩放框标题样式 */
    zoomTitle: {
      paddingLeft: "16px";
      fontSize: "15px";
      color: "#33353B";
    };
    
    /** 属性栏标题样式 */
    propertybarTitle: {
      flexShrink: 1;
      flexGrow: 0;
      overflow: "hidden";
    };
    
    /** 详细信息文本样式 */
    detailInfo: {
      color: "#9B9FAB";
      fontSize: "16px";
    };
    
    /** 滚动容器样式 */
    smartScroll: {
      overflowY: "auto";
    };
  }

  /**
   * CSS样式字符串内容
   */
  const cssContent: string;

  export = cssContent;
}

/**
 * 属性拖拽面板CSS模块导出
 * 包含拖拽模态框的样式定义，包括hover效果、标题样式、滚动区域等
 */
declare const propertyDraggableStyles: string;

export default propertyDraggableStyles;