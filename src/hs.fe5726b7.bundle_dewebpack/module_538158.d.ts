/**
 * jQuery UI Arrow Widget - 箭头组件
 * 用于在页面上绘制带文本标签的箭头，支持旋转和自定义样式
 */

/// <reference types="jquery" />
/// <reference types="jqueryui" />

declare namespace JQuery {
  /**
   * Arrow Widget 配置选项
   */
  interface ArrowOptions {
    /** 箭头左侧位置（像素） */
    l: number;
    
    /** 箭头顶部位置（像素） */
    t: number;
    
    /** 箭头宽度（像素） */
    w: number;
    
    /** 箭头高度（像素） */
    h: number;
    
    /** 箭头颜色（CSS颜色值） */
    color: string;
    
    /** 旋转角度（度数，0-360） */
    rot: number;
    
    /** 箭头上显示的文本内容 */
    txt: string;
  }

  /**
   * Arrow Widget 实例方法
   */
  interface Arrow extends Widget {
    /** Widget事件前缀 */
    widgetEventPrefix: "arrow";
    
    /** Widget配置选项 */
    options: ArrowOptions;

    /**
     * 更新箭头的位置和尺寸
     * @param left - 新的左侧位置（像素）
     * @param top - 新的顶部位置（像素）
     * @param width - 新的宽度（像素）
     * @param height - 新的高度（像素）
     */
    update(left: number, top: number, width: number, height: number): void;

    /**
     * 创建并初始化箭头组件
     * @internal 由jQuery UI框架自动调用
     */
    _create(): void;
  }

  interface JQuery {
    /**
     * 初始化或操作 Arrow Widget
     * @param options - 配置选项
     * @returns jQuery对象，支持链式调用
     */
    arrow(options?: Partial<ArrowOptions>): JQuery;

    /**
     * 调用 Arrow Widget 的方法
     * @param method - 方法名称
     * @param args - 方法参数
     * @returns 方法返回值或jQuery对象
     */
    arrow(method: "update", left: number, top: number, width: number, height: number): JQuery;
    arrow(method: "option", optionName: string): any;
    arrow(method: "option", optionName: string, value: any): JQuery;
    arrow(method: "option", options: Partial<ArrowOptions>): JQuery;
    arrow(method: "destroy"): void;
    arrow(method: "widget"): JQuery;
    arrow(method: string, ...args: any[]): any;
  }
}

/**
 * 全局 ResourceManager 接口声明
 * 用于注入SVG图像资源
 */
interface ResourceManager {
  /**
   * 将SVG图像注入到指定的DOM选择器匹配的元素中
   * @param selector - CSS选择器
   * @returns Promise，在SVG注入完成后resolve
   */
  injectSVGImage(selector: string): Promise<void>;
}

/**
 * 全局 ResourceManager 实例
 */
declare const ResourceManager: ResourceManager;