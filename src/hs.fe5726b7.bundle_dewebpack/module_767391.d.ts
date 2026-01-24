/**
 * CSS模块声明
 * 定义link-btn相关样式类的类型
 */

/**
 * 链接按钮样式类名映射接口
 */
interface LinkButtonStyles {
  /**
   * 基础链接按钮样式
   * - 字体大小: 12px
   * - 鼠标样式: 指针
   * - 文本装饰: 无
   * - 颜色: #343A40
   * - 圆角: 2px
   * - 背景色: #FFFFFF
   * - 过渡效果: 背景色 0.1s
   * - 边框: 1px solid #DCDCE1
   * 
   * 悬停状态:
   * - 背景色: #327DFF
   * - 颜色: white
   * - 字重: bold
   */
  'link-btn': string;

  /**
   * 禁用状态样式
   * - 透明度: 0.5
   * - 鼠标样式: 不可操作
   */
  disable: string;
}

/**
 * 导出的CSS模块对象
 */
declare const styles: LinkButtonStyles;

export default styles;

/**
 * CSS类名字面量类型
 */
export type LinkButtonClassName = keyof LinkButtonStyles;