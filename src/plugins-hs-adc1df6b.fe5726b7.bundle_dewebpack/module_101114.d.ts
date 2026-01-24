/**
 * CSS样式模块定义
 * 
 * 该模块导出包含块对齐组件样式的CSS字符串。
 * 支持9宫格对齐方式（左上、中上、右上、左中、中中、右中、左下、中下、右下）
 * 提供小尺寸和大尺寸两种变体。
 * 
 * @module BlockAlignStyles
 * @originalId 101114
 */

/**
 * 模块加载器函数签名
 * 
 * @param exports - 当前模块的导出对象
 * @param module - 当前模块对象
 * @param require - 模块加载函数，用于引入其他模块
 */
declare function moduleLoader(
  exports: ModuleExports,
  module: Module,
  require: RequireFunction
): void;

/**
 * CSS加载器返回值接口
 * 表示由Webpack css-loader处理后的样式模块
 */
interface CSSLoaderResult {
  /**
   * 将CSS规则推入样式集合
   * 
   * @param rule - CSS规则数组，格式为 [模块ID, CSS字符串内容]
   */
  push(rule: [string, string]): void;
}

/**
 * 模块导出对象接口
 */
interface ModuleExports {
  /** 模块的唯一标识符 */
  id?: string;
  
  /** 模块导出的内容 */
  [key: string]: unknown;
}

/**
 * 模块对象接口
 */
interface Module {
  /** 模块的唯一标识符 */
  id: string;
  
  /** 模块的导出对象 */
  exports: ModuleExports;
  
  /** 模块是否已加载 */
  loaded?: boolean;
}

/**
 * Require函数接口
 * 用于在模块系统中加载其他模块
 */
interface RequireFunction {
  /**
   * 根据模块ID加载模块
   * 
   * @param moduleId - 要加载的模块ID
   * @returns 加载的模块的导出对象
   */
  (moduleId: number): CSSLoaderResult;
}

/**
 * 块对齐组件的CSS类名定义
 */
declare namespace BlockAlignStyles {
  /**
   * 块对齐容器的根类名
   * 使用Flexbox布局，子元素在主轴和交叉轴上居中对齐
   */
  const blockAlignContainer: "block-align-container";
  
  /**
   * 块对齐标签的类名
   * 文本颜色为灰色 (#888888)，字体大小为12px
   */
  const blockAlignLabel: "block-align-label";
  
  /**
   * 块对齐网格的类名
   * 作为9宫格对齐点的容器，使用相对定位
   */
  const blockAlign: "block-align";
  
  /**
   * 单个对齐块的类名
   * 表示9宫格中的一个对齐点
   */
  const block: "block";
  
  /**
   * 禁用状态的类名
   * 设置透明度为0.3
   */
  const disabled: "disabled";
  
  /**
   * 左上角对齐块的类名
   */
  const leftTop: "leftTop";
  
  /**
   * 中上对齐块的类名
   */
  const centerTop: "centerTop";
  
  /**
   * 右上角对齐块的类名
   */
  const rightTop: "rightTop";
  
  /**
   * 左中对齐块的类名
   */
  const leftMiddle: "leftMiddle";
  
  /**
   * 中心对齐块的类名
   */
  const centerMiddle: "centerMiddle";
  
  /**
   * 右中对齐块的类名
   */
  const rightMiddle: "rightMiddle";
  
  /**
   * 左下角对齐块的类名
   */
  const leftBottom: "leftBottom";
  
  /**
   * 中下对齐块的类名
   */
  const centerBottom: "centerBottom";
  
  /**
   * 右下角对齐块的类名
   */
  const rightBottom: "rightBottom";
  
  /**
   * 中心框的类名
   * 填充整个容器，背景色为主题蓝色 (#396EFE)
   */
  const centerBox: "center-box";
  
  /**
   * 小尺寸变体的修饰类名
   * 对齐网格尺寸为 40x40px
   */
  const blockAlignContainerSmall: "block-align-container__small";
  
  /**
   * 大尺寸变体的修饰类名
   * 对齐网格尺寸为 64x64px，容器高度为72px
   */
  const blockAlignContainerLarge: "block-align-container__large";
}

export = BlockAlignStyles;