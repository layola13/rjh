/**
 * CSS模块导出类型定义
 * 该模块导出相机UI组件的样式表
 * @module CameraUIStyles
 */

/**
 * Webpack CSS加载器导出的样式模块接口
 */
interface CSSModuleExports {
  /**
   * CSS模块的唯一标识符
   */
  id: string | number;
  
  /**
   * 将CSS内容推送到样式集合
   * @param content - 包含模块ID和CSS字符串的元组
   */
  push(content: [string | number, string]): void;
}

/**
 * Webpack模块工厂函数类型
 * @param module - 当前模块对象
 * @param exports - 模块导出对象
 * @param require - Webpack require函数，用于加载依赖模块
 */
type WebpackModuleFactory = (
  module: { exports: unknown; id: string | number },
  exports: unknown,
  require: (moduleId: number) => CSSModuleExports
) => void;

/**
 * 相机UI样式类名定义
 * 对应.cameraUI组件的CSS类名
 */
interface CameraUIClassNames {
  /** 主容器类名 */
  cameraUI: string;
  
  /** 侧边遮罩1类名 */
  sideMask1: string;
  
  /** 侧边遮罩2类名 */
  sideMask2: string;
  
  /** 中间遮罩容器类名 */
  midMask: string;
  
  /** 分割线类名 */
  line: string;
  
  /** 关闭按钮类名 */
  closeBtn: string;
  
  /** 尺寸文本显示类名 */
  sizeText: string;
  
  /** 类型提示图标类名 */
  typeHint: string;
  
  /** 垂直方向布局修饰类 */
  vertical: string;
  
  /** 水平方向布局修饰类 */
  horizon: string;
  
  /** 通用遮罩类名 */
  mask: string;
  
  /** 仪表板按钮遮罩类名 */
  dashboardBtnMask: string;
  
  /** 画布截图层类名 */
  canvasScreenShot: string;
}

/**
 * CSS-in-JS样式对象类型
 * 描述相机UI组件的完整样式结构
 */
interface CameraUIStyles {
  /** 
   * 主容器样式
   * 绝对定位在左上角，覆盖整个视口
   */
  cameraUI: {
    position: 'absolute';
    top: 0;
    left: 0;
  };
  
  /**
   * 侧边遮罩样式（通用）
   * 半透明黑色背景，用于突出中间区域
   */
  sideMask: {
    position: 'absolute';
    background: 'rgba(0, 0, 0, 0.2)';
  };
  
  /**
   * 分割线样式
   * 使用主题蓝色(#297bb7)
   */
  line: {
    background: '#297bb7';
    position: 'absolute';
  };
  
  /**
   * 关闭按钮样式
   * 带内边距的可点击按钮
   */
  closeBtn: {
    position: 'absolute';
    background: '#297bb7';
    color: 'white';
    cursor: 'pointer';
    padding: '12px 15px';
  };
  
  /**
   * 尺寸文本显示样式
   * 居中显示，固定宽度300px，高度30px
   */
  sizeText: {
    display: 'block';
    position: 'absolute';
    width: '300px';
    textAlign: 'center';
    height: '30px';
    lineHeight: '30px';
    fontSize: '30px';
  };
  
  /**
   * 类型提示图标样式
   * 32x32像素，固定在左上角
   */
  typeHint: {
    position: 'absolute';
    width: '32px';
    height: '32px';
    left: '8px';
    top: '8px';
  };
}

/**
 * 模块导出
 * 该模块通过Webpack CSS加载器(moduleId: 986380)处理样式内容
 */
declare const cameraUIStyleModule: CSSModuleExports;

export default cameraUIStyleModule;
export type { CameraUIClassNames, CameraUIStyles, WebpackModuleFactory, CSSModuleExports };