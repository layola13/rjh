/**
 * AI页面可拖拽模态框组件模块
 * 提供AI心情板、AI建模器、AI材质等页面的可拖拽容器
 */

import { ReactElement } from 'react';

/**
 * AI页面面板标识符枚举
 */
export enum AIPagePanelId {
  /** AI心情板页面 */
  AiMoodboard = 'AiMoodboard',
  /** AI建模器页面 */
  AiModeler = 'AiModeler',
  /** AI材质页面 */
  AiMaterial = 'AiMaterial',
}

/**
 * 企业文件夹类型
 */
export type EnterpriseFolderType = 'ai' | 'aimaterial';

/**
 * 审核状态枚举
 * 0: 待审核, 1: 审核通过, 2: 审核拒绝
 */
export type AuditStatus = 0 | 1 | 2;

/**
 * 企业文件夹查询参数
 */
export interface EnterpriseFolderQuery {
  /** 文件夹类型 */
  type: EnterpriseFolderType;
}

/**
 * 企业文件夹查询结果
 */
export interface EnterpriseFolderResult {
  result: Array<{
    /** 文件夹ID */
    id: string;
  }>;
}

/**
 * 预配置参数
 */
export interface PreConfig {
  /** 是否启用分类聚合 */
  categoryAgg: boolean;
  /** 是否包含全部 */
  all: boolean;
  /** 资源池ID列表 */
  poolIds: string[];
  /** 审核状态列表 */
  auditStatusList: AuditStatus[];
}

/**
 * 可拖拽模态框配置
 */
export interface DraggableModalConfig {
  /** 初始宽度（像素） */
  initialWidth: number;
  /** 初始高度（像素） */
  initialHeight: number;
  /** 可拖拽配置 */
  draggable: Record<string, unknown>;
  /** 边界限制 */
  bounds: {
    /** 顶部边界 */
    top: number;
  };
}

/**
 * AI页面共享属性（除pageId外的其他属性）
 */
export interface MyAiPageSharedProps {
  /** 获取预配置函数（可选） */
  getPreConfig?: () => Promise<PreConfig>;
  /** 分类ID（可选） */
  categoryId?: string;
  [key: string]: unknown;
}

/**
 * MyAiPageDraggable组件属性
 */
export interface MyAiPageDraggableProps extends MyAiPageSharedProps {
  /** 页面标识符，决定渲染哪个AI页面 */
  pageId: AIPagePanelId;
}

/**
 * AI心情板页面组件属性
 */
export interface MyAiMoodboardPageProps extends MyAiPageSharedProps {}

/**
 * AI建模器/材质页面组件属性
 */
export interface MyAiModelerPageProps extends MyAiPageSharedProps {
  /** 获取预配置函数 */
  getPreConfig?: () => Promise<PreConfig>;
  /** 分类ID */
  categoryId: string;
}

/**
 * 数据管理器接口
 */
export interface DataManager {
  /**
   * 获取企业文件夹
   * @param query - 查询参数
   * @returns 包含文件夹列表的Promise
   */
  getEnterpriseFolders(query: EnterpriseFolderQuery): Promise<EnterpriseFolderResult>;
}

/**
 * 基础API管理器接口
 */
export interface BaseApiManager {
  /** 数据管理器实例 */
  dataManager: DataManager;
}

/**
 * 全局HSApp目录接口
 */
declare global {
  const HSApp: {
    Catalog: {
      BaseApiManager: {
        /**
         * 获取BaseApiManager单例实例
         */
        getInstance(): BaseApiManager;
      };
    };
  };

  /**
   * 全局用户信息
   */
  const adskUser: {
    /** 企业ID，存在时表示企业用户 */
    enterpriseId?: string;
  };
}

/**
 * AI页面可拖拽容器组件
 * 
 * 根据pageId渲染对应的AI功能页面，支持：
 * - AI心情板 (AiMoodboard)
 * - AI建模器 (AiModeler)
 * - AI材质 (AiMaterial)
 * 
 * @param props - 组件属性
 * @returns React元素
 * 
 * @example
 *