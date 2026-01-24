import { RadioGroup, Radio, IconfontView, Modal } from 'your-ui-library';
import { Pagination } from 'antd';
import React, { useState } from 'react';

/**
 * 单个选项配置
 */
export interface BlockOption {
  /** 选项的唯一标识值 */
  value: string;
  /** 其他可能的选项属性 */
  [key: string]: any;
}

/**
 * BlockOptionsComponent 组件的属性接口
 */
export interface BlockOptionsComponentProps {
  /** 可选项列表 */
  options: BlockOption[];
  
  /** 当前选中的值 */
  value: string;
  
  /** 点击选项时的回调函数 */
  onClick: (value: string) => void;
  
  /** OSS 图片处理参数，默认为 "image/resize,w_100,m_lfit" */
  ossImageParam?: string;
  
  /** 是否隐藏水印 */
  isHiddenWatermark?: boolean;
}

/**
 * 块选项组件
 * 
 * 展示分页的图片选项列表，支持单选和图片预览功能
 * 
 * @param props - 组件属性
 * @returns React 组件
 */
export declare function BlockOptionsComponent(
  props: BlockOptionsComponentProps
): React.ReactElement;