/**
 * 地址选择组件类型定义
 * Module: module_818984
 * Original ID: 818984
 */

import React from 'react';

/**
 * 地址信息项接口
 */
export interface AddressItem {
  /** 地址ID */
  id: string;
  /** 地址名称 */
  name: string;
  /** 子地址列表 */
  children: AddressItem[];
}

/**
 * 组件属性接口
 */
export interface AddressViewProps {
  /** 地址信息数组 */
  addressInfo: AddressItem[];
  /** 当前城市名称 */
  currentCityName: string;
  /** 省份ID映射表 */
  provinceIdMap: Map<string, AddressItem[]>;
  /** 城市ID映射表 */
  cityIdMap: Map<string, AddressItem>;
  /** 点击事件处理器 */
  clickHandler: (event: React.MouseEvent<HTMLElement> | null, type?: string) => void;
  /** 遮罩层点击处理器 */
  maskClickHandlder: () => void;
}

/**
 * 组件状态接口
 */
export interface AddressViewState {
  /** 显示标识 */
  showFlag: boolean;
  /** 当前选中的省份ID */
  provinceId: string;
  /** 城市面板是否打开 */
  openCityPannel: boolean;
}

/**
 * 地址选择视图组件
 * 用于展示和选择省份、城市等地址信息
 */
export default class AddressView extends React.Component<AddressViewProps, AddressViewState> {
  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: AddressViewProps);

  /**
   * 组件状态
   */
  state: AddressViewState;

  /**
   * 处理省份列表数据
   * 将省份的子地址按行分组
   * @param province - 省份信息
   * @returns 分组后的地址映射表，键为行号，值为该行的地址列表
   */
  provinceListHandler(province: AddressItem): Map<string, AddressItem[]>;

  /**
   * 判断省份是否被选中
   * @param provinceList - 省份列表
   * @param selectedProvinceId - 选中的省份ID
   * @returns 是否选中
   */
  provinceSelected(provinceList: AddressItem[], selectedProvinceId: string): boolean;

  /**
   * 地址列表点击事件处理
   * 处理省份和城市的点击逻辑
   * @param event - React鼠标事件
   */
  clickAddressList(event: React.MouseEvent<HTMLElement>): void;

  /**
   * 遮罩层点击事件处理
   * 关闭地址选择面板
   */
  clickMask(): void;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}