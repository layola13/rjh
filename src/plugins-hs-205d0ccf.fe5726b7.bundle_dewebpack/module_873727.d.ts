/**
 * 搜索页面组件类型定义
 * @module SearchPage
 */

import { PageComponent } from 'react';

/**
 * 分页配置接口
 */
export interface PaginationProps {
  /** 每页显示数量 */
  pageSize: number;
  /** 当前页码 */
  current: number;
  /** 总记录数 */
  total: number;
  /** 页码变化回调 */
  onChange: (page: number) => void;
}

/**
 * 文章数据接口
 */
export interface Article {
  /** 文章唯一标识 */
  id: string;
  /** 文章标题 */
  title?: string;
  /** 文章内容摘要 */
  content?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
  /** 作者信息 */
  author?: string;
  /** 标签ID列表 */
  labelIds?: string[];
  [key: string]: unknown;
}

/**
 * 搜索来源信息接口
 */
export interface SearchSource {
  /** 来源标识 */
  id: string;
  /** 来源名称 */
  name: string;
}

/**
 * 搜索页面组件属性接口
 */
export interface SearchPageProps {
  /** 搜索数据配置 */
  data?: {
    /** 标签ID筛选条件 */
    labelId?: string;
  };
  /** 返回按钮图标 */
  backIcon?: React.ReactNode;
  /** 关闭回调函数 */
  close?: () => void;
}

/**
 * 搜索页面组件状态接口
 */
export interface SearchPageState {
  /** 加载状态 */
  loading: boolean;
  /** 搜索关键词 */
  keyword: string;
  /** 文章列表 */
  articles: Article[];
  /** 是否无搜索结果 */
  isNone: boolean;
  /** 分页配置 */
  paginationProps: PaginationProps;
}

/**
 * 文章查询请求参数接口
 */
export interface QueryArticleParams {
  /** 偏移量（页码） */
  offset: number;
  /** 每页数量限制 */
  limit: number;
  /** 搜索关键词 */
  keyword: string;
  /** 标签ID筛选 */
  labelId?: string;
}

/**
 * 文章查询响应接口
 */
export interface QueryArticleResponse {
  /** 文章列表 */
  items: Article[];
  /** 总记录数 */
  total: number;
}

/**
 * 页面信息元数据接口
 */
export interface PageInfo {
  /** 页面名称标识 */
  name: string;
  /** 页面显示文本 */
  text: string;
}

/**
 * 搜索页面组件类
 * 
 * @description 提供文章搜索、分页展示、空状态处理等功能
 * 
 * @example
 *