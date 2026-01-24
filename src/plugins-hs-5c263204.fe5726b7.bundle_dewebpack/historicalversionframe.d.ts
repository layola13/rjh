/**
 * 历史版本框架组件
 * 用于展示和管理设计文档的历史版本列表
 */

import React from 'react';

/**
 * 版本列表项接口
 */
interface VersionItem {
  /** 版本唯一标识 */
  versionId: string;
  /** 版本类型 */
  versionType?: number;
  /** 保存类型：1-手动保存，0-自动保存 */
  saveType?: 0 | 1;
  /** 版本创建时间 */
  createTime?: number;
  /** 版本描述 */
  description?: string;
}

/**
 * 获取列表数据的请求参数
 */
interface GetListDataParams {
  /** 偏移量，用于分页 */
  offset: number;
  /** 每页数量限制 */
  limit: number;
  /** 版本类型列表，JSON字符串格式 */
  versionTypeList: string;
  /** 保存类型：1-仅手动保存 */
  saveType?: 1;
}

/**
 * 获取列表数据的响应结果
 */
interface GetListDataResponse {
  /** 版本列表 */
  list: VersionItem[];
  /** 总记录数 */
  total: number;
}

/**
 * HistoricalVersionFrame 组件的属性接口
 */
interface HistoricalVersionFrameProps {
  /**
   * 获取版本列表数据的方法
   * @param params 请求参数
   * @returns Promise，包含版本列表和总数
   */
  getListData: (params: GetListDataParams) => Promise<GetListDataResponse>;
  
  /**
   * 打开指定版本的回调
   * @param versionId 版本ID
   */
  onOpen: (versionId: string) => void;
  
  /**
   * 取消操作的回调
   */
  onCancel: () => void;
}

/**
 * HistoricalVersionFrame 组件的状态接口
 */
interface HistoricalVersionFrameState {
  /** 版本列表 */
  list: VersionItem[];
  /** 最新版本ID */
  newestVersionId?: string;
  /** 当前页码 */
  currentPage: number;
  /** 是否显示筛选器 */
  showFilter: boolean;
  /** 总记录数 */
  total: number;
  /** 是否仅显示手动保存的版本 */
  onlyManual: boolean;
  /** 是否禁用提交按钮 */
  disableSubmit: boolean;
  /** 当前选中的版本ID */
  selectedVersionId?: string;
}

/**
 * 历史版本框架组件
 * 提供版本列表展示、筛选、分页和选择功能
 */
export declare class HistoricalVersionFrame extends React.Component<
  HistoricalVersionFrameProps,
  HistoricalVersionFrameState
> {
  /**
   * 构造函数
   * @param props 组件属性
   */
  constructor(props: HistoricalVersionFrameProps);

  /**
   * 组件状态
   */
  state: HistoricalVersionFrameState;

  /**
   * 组件挂载后的生命周期方法
   * 自动加载初始版本列表数据
   */
  componentDidMount(): void;

  /**
   * 获取版本列表数据
   * @param isInitial 是否为初始化加载，默认false。初始化时会重置页码并设置最新版本ID
   * @returns Promise，数据加载完成后更新组件状态
   */
  getListData(isInitial?: boolean): Promise<void>;

  /**
   * 页码变更处理器
   * @param page 新的页码
   */
  onPageChange(page: number): void;

  /**
   * 筛选条件变更处理器
   * @param onlyManual 是否仅显示手动保存的版本
   */
  onFilterChange(onlyManual: boolean): void;

  /**
   * 版本选择处理器
   * @param versionId 选中的版本ID
   */
  onSelectVersion(versionId: string): void;

  /**
   * 打开版本处理器
   * @param versionId 要打开的版本ID
   */
  onOpen(versionId: string): void;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}