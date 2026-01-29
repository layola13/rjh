import React from 'react';

/**
 * 历史版本数据项
 */
export interface HistoricalVersionData {
  /** 版本ID */
  versionId: string;
  /** 版本预览图 */
  image?: string;
  /** 创建时间 */
  createdAt: string;
  /** 保存类型：1-手动保存，2-自动保存，3-自动保存 */
  saveType: 1 | 2 | 3;
  /** 最新版本ID */
  newestVersionId?: string;
  /** 模型标签（系统更新标记） */
  modelTag?: boolean;
  /** 审单标签 */
  auditTag?: boolean;
  /** 魔法标识 */
  magic?: string;
}

/**
 * ListViewFrame 组件属性
 */
export interface ListViewFrameProps {
  /** 当前选中的版本ID */
  selectedVersionId: string;
  /** 历史版本数据列表 */
  data: HistoricalVersionData[];
  /** 最新版本ID */
  newestVersionId: string;
  /** 是否显示7天期限提示 */
  isSevenDayDeadLine: boolean;
  /** 设置选中项的回调函数 */
  setItem: (versionId: string) => void;
}

/**
 * 历史版本列表视图框架组件
 * 
 * 用于展示和选择设计的历史版本，支持：
 * - 版本预览图悬浮显示
 * - 版本时间和保存类型标识
 * - 最新版本标记
 * - VIP用户7天期限提示
 */
export declare class ListViewFrame extends React.Component<ListViewFrameProps> {
  /** 历史版本容器DOM引用 */
  private _historicalVersionContainer: HTMLElement | null;

  /**
   * 处理版本项点击事件
   * @param versionId - 被点击的版本ID
   */
  handleClick(versionId: string): void;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}