import React from 'react';

/**
 * 搜索结果中的产品/小区数据项
 */
export interface SearchProductItem {
  /** 城市标识符 */
  city: string;
  /** 小区名称 */
  neighborName: string;
  /** 社区字符串描述（括号包裹的别名列表） */
  communityStr: string | null;
  /** 悬停时显示的完整字符串 */
  hoverStr: string;
  /** 该小区的户型数量 */
  count: number;
}

/**
 * 模板搜索建议API返回的数据项
 */
export interface TemplateSuggestionItem {
  /** 小区名称 */
  neighborName: string;
  /** 小区别名列表 */
  neighborAlias?: string[];
  /** 户型数量 */
  apartmentCount: number;
}

/**
 * 组件内部状态
 */
export interface SearchResultState {
  /** 搜索结果产品列表 */
  products: SearchProductItem[];
  /** 是否正在搜索中 */
  searchStart: boolean;
}

/**
 * 组件属性接口
 */
export interface SearchResultProps {
  /** 搜索文本 */
  searchText: string;
  /** 目标城市（格式：cityName_cityId） */
  targetCity: string;
  /** 目标城市名称 */
  targetCityName: string;
  /** 城市ID映射表 */
  cityIdMap: Map<string, string | number>;
  /** 点击搜索结果项的回调函数 */
  handleClickSearchItem: (
    cityId: string | number,
    cityName: string,
    neighborName: string
  ) => void;
}

/**
 * 搜索结果组件
 * 
 * 提供实时搜索小区/户型模板的功能，支持：
 * - 实时搜索防抖（350ms）
 * - 最多显示15条搜索结果
 * - 显示小区名称、别名、户型数量
 * - 支持工具提示显示完整信息
 */
export default class SearchResultComponent extends React.Component<
  SearchResultProps,
  SearchResultState
> {
  /**
   * 组件状态
   */
  state: SearchResultState;

  /**
   * 防抖处理的实时搜索方法
   * @param searchText - 搜索关键词
   */
  onRealTimeSearch: (searchText: string) => void;

  /**
   * 执行实时搜索
   * @param searchText - 搜索关键词
   * @returns Promise，成功时更新组件状态
   */
  realTimeSearch(searchText: string): void;

  /**
   * 渲染搜索结果列表
   * @returns 搜索结果容器元素
   */
  render(): React.ReactElement;
}

/**
 * 全局API命名空间（假设为第三方库）
 */
declare global {
  const NWTK: {
    api: {
      design: {
        /**
         * 搜索模板建议列表
         * @param keyword - 搜索关键词
         * @param cityId - 城市ID
         * @returns Promise，返回建议列表
         */
        searchTemplatesSuggestionsList(
          keyword: string,
          cityId: string
        ): Promise<TemplateSuggestionItem[]>;
      };
    };
  };
}