/**
 * CSS模块类型定义
 * 该模块导出Ant Design布局组件的CSS样式
 */

/**
 * Webpack模块加载器参数
 * @param e - 导出对象，用于挂载模块导出内容
 * @param t - 模块依赖映射表
 * @param n - require函数，用于加载其他模块
 */
declare module 'module_106355' {
  /**
   * CSS样式模块导出
   * 该模块包含Spark图片布局相关的CSS样式定义
   */
  export interface CSSModuleExports {
    /**
     * 主布局类名
     * 全屏固定定位的布局容器，带有背景图片
     */
    spark_pic_image_Layout: string;

    /**
     * 禁用状态的布局类名
     * 应用后隐藏布局
     */
    layout_disable: string;

    /**
     * 相册Logo类名
     * 绝对定位在顶部居中的Logo容器
     */
    spark_pic_album_logo: string;
  }

  /**
   * CSS类名选择器定义
   */
  export interface CSSClasses {
    /** 主布局容器 - 全屏固定定位，z-index: 1002 */
    '.ant-layout.spark_pic_image_Layout': CSSStyleDeclaration;

    /** 内容区域 - 相对定位，水平padding: 30px */
    '.ant-layout.spark_pic_image_Layout .ant-layout .ant-layout-content': CSSStyleDeclaration;

    /** 头部区域 - 透明背景 */
    '.ant-layout.spark_pic_image_Layout .header_area': CSSStyleDeclaration;

    /** 内容头部 - Flex布局，高度30px */
    '.ant-layout.spark_pic_image_Layout .content-header': CSSStyleDeclaration;

    /** 左侧部分 - Flex布局，垂直居中 */
    '.ant-layout.spark_pic_image_Layout .content-header .left-part': CSSStyleDeclaration;

    /** 标签页容器 - 宽度196px */
    '.ant-layout.spark_pic_image_Layout .content-header .left-part .tabs': CSSStyleDeclaration;

    /** 优惠券剩余提示 - 白色半透明文字 */
    '.ant-layout.spark_pic_image_Layout .content-header .left-part .coupon-left-tips': CSSStyleDeclaration;

    /** 图片数量统计 - 灰色文字，14px */
    '.ant-layout.spark_pic_image_Layout .content-header .left-part .left .pic-count': CSSStyleDeclaration;

    /** 复选框包装器 - 白色文字，左边距20px */
    '.ant-layout.spark_pic_image_Layout .content-header .left-part .left .ant-checkbox-wrapper': CSSStyleDeclaration;

    /** 图片浏览器底部门户 - Flex布局 */
    '.ant-layout.spark_pic_image_Layout .content-header .image-browser-bottom-portal': CSSStyleDeclaration;

    /** 全选图片区域 - 内联Flex布局 */
    '.ant-layout.spark_pic_image_Layout .content-header .image-browser-bottom-portal .right .select-all-images': CSSStyleDeclaration;

    /** 图片操作按钮 - 圆角按钮，深色背景 */
    '.ant-layout.spark_pic_image_Layout .content-header .image-browser-bottom-portal .right .select-all-images .images-btn': CSSStyleDeclaration;

    /** 水印按钮标签 - 渐变背景 */
    '.ant-layout.spark_pic_image_Layout .content-header .image-browser-bottom-portal .right .select-all-images .tag': CSSStyleDeclaration;

    /** 禁用状态的布局 - 隐藏显示 */
    '.spark_pic_image_Layout.layout_disable': CSSStyleDeclaration;

    /** 相册Logo - 居中定位，尺寸206x37px */
    '.spark_pic_album_logo': CSSStyleDeclaration;
  }

  /**
   * CSS样式属性值常量
   */
  export const enum CSSConstants {
    /** 布局z-index层级 */
    Z_INDEX = 1002,

    /** 内容区域水平padding */
    CONTENT_PADDING = 30,

    /** 头部高度 */
    HEADER_HEIGHT = 30,

    /** 标签页宽度 */
    TABS_WIDTH = 196,

    /** 按钮高度 */
    BUTTON_HEIGHT = 30,

    /** 按钮圆角半径 */
    BUTTON_BORDER_RADIUS = 15,

    /** Logo宽度 */
    LOGO_WIDTH = 206,

    /** Logo高度 */
    LOGO_HEIGHT = 37,

    /** 背景图片宽度 */
    BACKGROUND_IMAGE_WIDTH = 468,

    /** 背景图片高度 */
    BACKGROUND_IMAGE_HEIGHT = 112,
  }

  /**
   * 颜色主题定义
   */
  export interface ColorTheme {
    /** 主背景色 - 黑色 */
    readonly background: '#000';

    /** 主文字色 - 白色 */
    readonly text: '#fff';

    /** 次要文字色 - 白色66%透明度 */
    readonly textSecondary: 'rgba(255, 255, 255, 0.66)';

    /** 三级文字色 - 白色96%透明度 */
    readonly textTertiary: 'rgba(255, 255, 255, 0.96)';

    /** 禁用文字色 - 白色10%透明度 */
    readonly textDisabled: 'rgba(255, 255, 255, 0.1)';

    /** 按钮背景色 */
    readonly buttonBackground: '#222222';

    /** 按钮悬停背景色 */
    readonly buttonHoverBackground: '#396efe';

    /** 复选框背景色 */
    readonly checkboxBackground: '#323232';

    /** 复选框选中背景色 */
    readonly checkboxCheckedBackground: '#1890ff';

    /** 标签背景色 */
    readonly tabBackground: '#494A4C';

    /** 渐变背景 - 从金色到蓝色 */
    readonly gradientBackground: 'linear-gradient(to right, #FEDE9D, #81ADFF)';
  }

  const cssModule: CSSModuleExports;
  export default cssModule;
}