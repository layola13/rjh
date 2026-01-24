/**
 * 教学能力插件 - 首页组件类型定义
 * @module HomePage
 */

import { Component, ReactNode, RefObject } from 'react';

/**
 * 标签数据结构
 */
export interface Label {
  /** 标签名称 */
  labelName: string;
  /** 标签唯一标识码 */
  labelCode: string;
  /** 标签ID */
  labelId: string;
}

/**
 * 文章数据结构
 */
export interface Article {
  /** 文章唯一标识 */
  id: string;
  /** 文章标题 */
  title?: string;
  /** 文章所属期数 */
  period?: string;
  /** 文章内容摘要 */
  summary?: string;
  /** 发布时间 */
  publishTime?: number;
  /** 标签ID */
  labelId?: string;
}

/**
 * 期刊数据结构
 */
export interface Period {
  /** 期刊号/期数标识 */
  period: string;
  /** 该期包含的文章列表 */
  articles: Article[];
}

/**
 * 分页查询结果
 */
export interface QueryResult<T> {
  /** 数据项列表 */
  items: T[];
  /** 数据总数 */
  total: number;
}

/**
 * 用户引导配置
 */
export interface UserGuideConfig {
  /** 用户引导完成回调 */
  userGuideCallback?: () => void;
}

/**
 * 页面路由数据
 */
export interface PageData {
  /** 当前选中的模块代码 */
  module?: string;
  /** 用户引导配置 */
  userGuide?: UserGuideConfig;
  /** 其他透传数据 */
  [key: string]: unknown;
}

/**
 * 页面导航参数
 */
export interface NavigationParams {
  /** 目标页面组件 */
  Page: Component;
  /** 传递给目标页面的数据 */
  data?: Record<string, unknown>;
}

/**
 * 分页器属性
 */
export interface PaginationProps {
  /** 每页显示数量 */
  pageSize: number;
  /** 当前页码（从1开始） */
  current: number;
  /** 数据总数 */
  total: number;
  /** 页码变化回调 */
  onChange: (page: number) => void;
}

/**
 * HomePage 组件的 Props
 */
export interface HomePageProps {
  /** 页面初始化数据 */
  data?: PageData;
  /** 关闭当前页面 */
  close: () => void;
  /** 导航到其他页面 */
  push: (params: NavigationParams) => void;
}

/**
 * HomePage 组件的 State
 */
export interface HomePageState {
  /** 页面顶部左侧渲染节点 */
  topLeftNode: ReactNode;
  /** 页面加载状态 */
  loading: boolean;
  /** 当前选中的标签代码 */
  selectLabel: string;
  /** 是否隐藏期刊区域 */
  hiddenPeriod: boolean;
  /** 当前分页页码 */
  pageCurrent: number;
  /** 文章总数 */
  articlesTotal: number;
  /** 每页显示的文章数量 */
  pageSize: number;
  /** 是否在顶部显示标签选择器 */
  showTopSelect: boolean;
  /** 是否在内容区显示标签选择器 */
  showContentSelect: boolean;
  /** 期刊数据（仅在default模块时有值） */
  period?: Period;
  /** 当前标签下的文章列表 */
  labelArticles?: Article[];
  /** 所有可用标签列表 */
  labels?: Label[];
  /** 默认选中的标签代码 */
  defaultSelectLabel?: string;
}

/**
 * 标签选择器组件的 Props
 */
export interface LabelSelectorProps {
  /** 标签选项列表 */
  labels?: Label[];
  /** 默认选中的模块代码 */
  defaultModule: string;
  /** 选中项变化回调 */
  onChange?: (labelCode: string) => void;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 图标节点 */
  icon?: ReactNode;
  /** 下拉选项配置 */
  options?: Array<{ label: string; value: string }>;
}

/**
 * 初始化参数
 */
export interface InitParams {
  /** 要选中的标签代码 */
  selectLabelCode: string;
}

/**
 * 页面信息元数据
 */
export interface PageInfo {
  /** 页面组件名称 */
  name: string;
  /** 页面显示文本 */
  text: string;
}

/**
 * HomePage 主组件类
 * 
 * 教学能力插件的首页，展示文章列表、期刊推荐、标签筛选等功能
 */
export declare class HomePage extends Component<HomePageProps, HomePageState> {
  /**
   * 页面元信息
   */
  static pageInfo: PageInfo;

  /**
   * React Context 类型声明
   */
  static contextType: React.Context<string>;

  /**
   * 标签选择器的 DOM 引用
   */
  selectRef: RefObject<HTMLDivElement>;

  /**
   * 标签选择器的位置尺寸信息
   */
  selectRect?: DOMRect;

  /**
   * 标签选择器渲染节点
   */
  LabelSelectNode?: ReactNode;

  /**
   * 内容容器的 DOM 元素
   */
  container?: HTMLElement;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: HomePageProps);

  /**
   * 组件挂载后的生命周期钩子
   * 初始化页面数据
   */
  componentDidMount(): void;

  /**
   * 初始化页面数据
   * @param params - 初始化参数
   */
  init(params: InitParams): Promise<void>;

  /**
   * 查询指定标签下的文章列表
   * @param labelId - 标签ID
   * @param page - 页码（从1开始）
   * @param pageSize - 每页数量
   * @returns 文章查询结果
   */
  getLabelArticles(
    labelId: string,
    page: number,
    pageSize: number
  ): Promise<QueryResult<Article>>;

  /**
   * 跳转到搜索页面
   */
  toSearch(): void;

  /**
   * 跳转到期刊详情页
   */
  toPeriod(): void;

  /**
   * 计算标签选择器的显示位置
   * 根据滚动位置决定在顶部或内容区显示选择器
   */
  computerSelectLocation(): void;

  /**
   * 标签选择器变化事件处理
   * @param labelCode - 选中的标签代码
   */
  onSelectModuleChange(labelCode: string): Promise<void>;

  /**
   * 分页器页码变化事件处理
   * @param page - 新的页码
   */
  paginationChange(page: number): void;

  /**
   * 内容区向下滚动事件处理
   * @param container - 滚动容器元素
   */
  onContentScrollDown(container: HTMLElement): void;

  /**
   * 内容区向上滚动事件处理
   * @param container - 滚动容器元素
   */
  onContentScrollUp(container: HTMLElement): void;

  /**
   * 跳转到设计课程页面
   * 处理不同环境（ea版本）的URL跳转逻辑
   */
  jumpToDesignCurose(): void;

  /**
   * 渲染组件
   */
  render(): ReactNode;
}