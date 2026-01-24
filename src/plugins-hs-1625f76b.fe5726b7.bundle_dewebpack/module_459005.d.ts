import React from 'react';
import { IconfontView } from './IconfontView';

/**
 * 摄像头对象接口
 */
interface Camera {
  /**
   * 获取摄像头属性值
   * @param key - 属性键名
   * @returns 属性值
   */
  get(key: 'name' | 'thumbnail'): string;
}

/**
 * 摄像头项组件的属性接口
 */
interface CameraItemProps {
  /**
   * 摄像头数据对象
   */
  camera: Camera;
  
  /**
   * 摄像头被点击时的回调函数
   * @param index - 摄像头索引
   */
  onCameraClicked?: (index: number) => void;
  
  /**
   * 删除按钮被点击时的回调函数
   * @param index - 摄像头索引
   */
  onDeleteClicked?: (index: number) => void;
  
  /**
   * 摄像头名称改变时的回调函数
   * @param index - 摄像头索引
   * @param name - 新名称
   */
  onNameChange?: (index: number, name: string) => void;
  
  /**
   * 摄像头在列表中的索引
   */
  index: number;
  
  /**
   * 是否为激活状态的CSS类名
   */
  isActive: string;
  
  /**
   * 是否跳转到下一页
   */
  goToNextPage?: boolean;
  
  /**
   * 是否为只读模式
   */
  isReadonly?: boolean;
  
  /**
   * 下一页处理函数
   * @param index - 摄像头索引
   */
  nextpageHandler?: (index: number) => void;
}

/**
 * 摄像头列表项组件
 * 用于展示单个摄像头的缩略图，支持点击选择和删除操作
 */
declare class CameraItem extends React.Component<CameraItemProps> {
  /**
   * 默认属性值
   */
  static defaultProps: Partial<CameraItemProps>;
  
  /**
   * 处理删除按钮点击事件
   * @param event - 鼠标事件对象
   * @private
   */
  private _onDelete(event?: MouseEvent | Event): void;
  
  /**
   * 处理摄像头点击事件
   * @param index - 摄像头索引
   * @param shouldGoToNextPage - 是否跳转到下一页
   */
  clickCamera(index: number, shouldGoToNextPage?: boolean): void;
  
  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}

export default CameraItem;