/**
 * 省份选择组件的类型声明
 * 
 * 该组件用于展示省份列表和城市列表，支持省份选择和城市面板切换功能
 */

import React from 'react';

/**
 * 地址信息项接口
 */
export interface AddressItem {
  /** 地址项唯一标识 */
  id: string | number;
  /** 地址项名称 */
  name: string;
  /** 子级地址列表（如省份下的城市） */
  children?: AddressItem[];
}

/**
 * 省份选择组件的属性接口
 */
export interface ProvinceBlockProps {
  /** 当前选中的地址ID */
  id?: string | number;
  /** 完整的地址信息树形结构 */
  addressInfo?: AddressItem[];
  /** 是否打开城市面板 */
  openCityPannel?: boolean;
  /** 打开城市面板的处理函数 */
  openCityPannelHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** 城市点击处理函数 */
  clickHandler: (id: string | number, name: string) => void;
}

/**
 * 省份选择组件的状态接口
 */
export interface ProvinceBlockState {
  /** 当前选中的省份ID */
  provinceId: string;
}

/**
 * 省份选择组件类
 * 
 * @remarks
 * 该组件继承自 React.Component，用于渲染省份列表和城市列表。
 * 支持省份选择高亮显示，点击省份后展开对应的城市列表。
 * 
 * @example
 *