/**
 * 搜索历史组件 - 显示用户的搜索历史记录
 * @module SearchHistoryComponent
 */

import React from 'react';

/**
 * 城市ID映射类型
 */
type CityIdMap = Map<string, string>;

/**
 * 组件属性接口
 */
interface SearchHistoryProps {
  /**
   * 城市ID映射表，用于根据城市名称查找城市ID
   */
  cityIdMap: CityIdMap;
  
  /**
   * 点击搜索项的回调函数
   * @param cityId - 城市ID
   * @param cityName - 城市名称
   * @param neighborName - 街区/邻里名称
   */
  handleClickSearchItem: (cityId: string, cityName: string, neighborName: string) => void;
  
  /**
   * 组件状态类名，用于控制显示/隐藏等状态
   */
  status: string;
}

/**
 * 组件状态接口（当前组件无状态）
 */
interface SearchHistoryState {}

/**
 * 搜索历史组件
 * @description 从本地存储读取并展示用户最近的搜索历史（最多10条）
 */
declare class SearchHistoryComponent extends React.Component<SearchHistoryProps, SearchHistoryState> {
  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: SearchHistoryProps);
  
  /**
   * 从本地存储获取搜索历史列表
   * @description 读取localStorage中的fpIndex0-fpIndex9项，格式为"城市名+街区名"
   * @returns 搜索历史数组，如果没有历史记录则返回空数组
   */
  getListFromLocalStorage(): string[];
  
  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}

export default SearchHistoryComponent;