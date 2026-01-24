/**
 * CSS模块类型定义
 * 该模块导出相机控制栏的样式定义
 * 
 * @module CameraBarStyles
 * @description 定义相机控制栏组件的CSS类名和样式
 */

/**
 * 相机控制栏样式类名
 */
export interface CameraBarStyles {
  /**
   * 相机控制栏容器样式
   * - 绝对定位在右下角
   * - 包含半透明深色背景
   * - 使用圆角边框
   */
  'camera-bar-container': string;
  
  /**
   * 相机适配按钮样式
   * - 支持鼠标交互
   * - 悬停时图标变白色
   */
  'camera-fit': string;
}

/**
 * CSS模块默认导出
 */
declare const styles: CameraBarStyles;
export default styles;

/**
 * 样式规则详细说明：
 * 
 * .camera-bar-container
 * - position: absolute - 绝对定位
 * - right: 252px - 距离右侧252像素
 * - bottom: 27px - 距离底部27像素
 * - display: flex - 弹性布局
 * - align-items: center - 垂直居中对齐
 * - justify-content: center - 水平居中对齐
 * - background: #2B2C2E - 深灰色背景
 * - opacity: 0.6 - 60%透明度
 * - height: 30px - 高度30像素
 * - border-radius: 15px - 圆角半径15像素
 * - padding: 0 15px - 左右内边距15像素
 * 
 * .camera-bar-container .camera-fit
 * - pointer-events: auto - 启用鼠标事件
 * - cursor: pointer - 鼠标悬停时显示手型指针
 * 
 * .camera-bar-container .camera-fit:hover .anticon
 * - color: #fff !important - 悬停时图标颜色变为白色（强制优先级）
 */