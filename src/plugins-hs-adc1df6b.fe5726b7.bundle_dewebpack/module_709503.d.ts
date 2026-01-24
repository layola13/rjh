import React from 'react';
import { Row, Button } from 'antd'; // 假设使用 antd 组件库

/**
 * 相机视图弹出菜单项配置
 */
export interface CameraViewPopupItem {
  /** 菜单项显示文本 */
  label: string;
  /** 点击事件处理函数 */
  onClick: () => void;
}

/**
 * 相机视图弹出菜单组件属性
 */
export interface CameraViewPopupProps {
  /** 位置和尺寸数据 */
  data: {
    /** 距离顶部的距离（像素） */
    top: number;
    /** 距离左侧的距离（像素） */
    left: number;
  };
  /** 菜单项列表 */
  items: CameraViewPopupItem[];
}

/**
 * 相机视图弹出菜单组件
 * 
 * 在指定位置渲染一个包含多个操作按钮的弹出菜单
 * 位置会根据窗口高度自动调整，确保菜单在视口内显示
 */
declare class CameraViewPopup extends React.Component<CameraViewPopupProps> {
  /**
   * 渲染组件
   * @returns React 元素
   */
  render(): React.ReactElement;
}

export default CameraViewPopup;