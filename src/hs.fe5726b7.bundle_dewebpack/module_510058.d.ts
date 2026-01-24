/**
 * jQuery依赖声明
 */
declare global {
  interface JQuery {
    /**
     * 初始化或调用clabel widget方法
     * @param options - 配置选项或方法名
     */
    clabel(options?: CLabelOptions): JQuery;
    clabel(method: "destroy"): void;
  }

  interface Window {
    /**
     * CLabel组件构造函数
     */
    CLabel: typeof CLabel;
  }
}

/**
 * CLabel组件配置选项
 */
interface CLabelOptions {
  /**
   * 标签唯一标识符
   */
  id?: string;
  
  /**
   * 标签显示文本内容
   */
  text: string;
}

/**
 * CLabel组件类
 * 用于创建和管理基于jQuery UI Widget的标签组件
 */
declare class CLabel {
  /**
   * jQuery容器元素
   */
  container: JQuery;
  
  /**
   * 组件配置参数
   */
  param: CLabelOptions;
  
  /**
   * jQuery widget实例
   */
  instance: JQuery;

  /**
   * 构造函数
   * @param element - DOM元素选择器或元素对象
   * @param options - 组件配置选项
   */
  constructor(element: string | HTMLElement, options: CLabelOptions);

  /**
   * 静态工厂方法：创建CLabel实例
   * @param element - DOM元素选择器或元素对象
   * @param options - 组件配置选项
   * @returns 新的CLabel实例
   */
  static create(element: string | HTMLElement, options: CLabelOptions): CLabel;

  /**
   * 更新标签内容
   * 如果文本内容发生变化，会销毁旧实例并重新创建
   * @param options - 新的配置选项（支持部分更新）
   */
  update(options: Partial<CLabelOptions>): void;

  /**
   * 销毁组件实例
   * 清理DOM和事件监听器
   */
  destroy(): void;
}

/**
 * jQuery UI Widget扩展：custom.clabel
 */
interface JQueryUI {
  custom: {
    clabel: {
      /**
       * Widget事件前缀
       */
      widgetEventPrefix: "clabel";
      
      /**
       * 默认配置选项
       */
      options: CLabelOptions;
      
      /**
       * 创建widget时的内部方法
       * 生成标签HTML并插入容器
       * @private
       */
      _create(): void;
      
      /**
       * 销毁widget时的内部方法
       * 清空容器HTML内容
       * @private
       */
      _destroy(): void;
    };
  };
}

export {};