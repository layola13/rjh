/**
 * 智能推荐搭配对话框组件
 * 用于展示装修推荐、自动推荐和饰品推荐功能
 */

import { Component, ReactElement, CSSProperties } from 'react';

/**
 * 自动推荐数据配置
 */
export interface AutoRecommendData {
  /** 是否显示自动推荐项 */
  isShowAutoRecommendItem: boolean;
  /** 楼层信息 */
  floor: any;
  /** 实体对象 */
  entity: Entity;
}

/**
 * 推荐装饰数据配置
 */
export interface RecommendDecorationsData {
  /** 是否显示推荐装饰项 */
  isShowRecommendDecorationsItem: boolean;
  /** 实体对象 */
  entity: Entity;
}

/**
 * 模型数据项
 */
export interface ModelDataItem {
  /** 模型唯一标识 */
  id: string;
  /** 其他模型属性 */
  [key: string]: any;
}

/**
 * 模型数据配置
 */
export interface ModelData {
  /** 模型列表 */
  items: ModelDataItem[];
  /** 其他配置 */
  [key: string]: any;
}

/**
 * 实体元数据
 */
export interface EntityMetadata {
  /** 模型分类 */
  categories: string[];
  /** 产品风格 */
  productStyle?: string;
  /** 其他元数据 */
  [key: string]: any;
}

/**
 * 实体对象
 */
export interface Entity {
  /** 实体ID */
  id: string;
  /** 实体元数据 */
  metadata: EntityMetadata;
  /** 其他属性 */
  [key: string]: any;
}

/**
 * 推荐对话框数据配置
 */
export interface RecommendDialogData {
  /** 自动推荐数据 */
  autoRecommendData: AutoRecommendData;
  /** 推荐装饰数据 */
  recommendDecorationsData: RecommendDecorationsData;
  /** 模型数据 */
  modelData: ModelData;
  /** 实体对象 */
  entity?: Entity;
  /** 隐藏对话框回调 */
  hideDialogCallback?: () => void;
}

/**
 * 推荐对话框组件属性
 */
export interface RecommendDialogProps {
  /** 对话框数据配置 */
  data: RecommendDialogData;
}

/**
 * 推荐对话框组件状态
 */
export interface RecommendDialogState {
  /** 对话框数据 */
  data: RecommendDialogData;
  /** 是否显示对话框 */
  showDialog: boolean;
}

/**
 * 推荐模型插件接口
 */
export interface RecommendModelsPlugin {
  /**
   * 设置是否不再显示对话框
   * @param noShow - 是否不再显示
   */
  setNoShowDialog(noShow: boolean): void;
  
  /**
   * 获取是否不再显示对话框的设置
   * @returns 是否不再显示
   */
  getNoShowDialog(): boolean;
}

/**
 * 自动推荐插件接口
 */
export interface AutoRecommendPlugin {
  /**
   * 从推荐弹窗启动推荐流程
   * @param floor - 楼层信息
   * @param entity - 实体对象
   */
  startRecommendFromRecommendPopup(floor: any, entity: Entity): void;
}

/**
 * 推荐饰品插件接口
 */
export interface RecommendAccessoriesPlugin {
  /**
   * 启动推荐流程
   * @param entity - 实体对象
   */
  startRecommendProcess(entity: Entity): void;
}

/**
 * 智能推荐搭配对话框组件
 * 展示自动推荐、推荐装饰和模型推荐功能
 */
export default class RecommendDialog extends Component<RecommendDialogProps, RecommendDialogState> {
  /** 组件属性 */
  props: RecommendDialogProps;
  
  /** 推荐模型插件实例 */
  recommendModelsPlugin?: RecommendModelsPlugin;
  
  /** 应用实例 */
  _app: any;
  
  /** 组件状态 */
  state: RecommendDialogState;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: RecommendDialogProps);

  /**
   * 隐藏对话框
   * @param shouldTrack - 是否进行用户行为追踪
   */
  hideDialog(shouldTrack: boolean): void;

  /**
   * 显示对话框
   */
  showDialog(): void;

  /**
   * 点击自动推荐按钮
   * 启动自动推荐流程
   */
  _clickAutoRecommend(): void;

  /**
   * 组件接收新属性时的生命周期方法
   * @param nextProps - 新的组件属性
   */
  componentWillReceiveProps(nextProps: RecommendDialogProps): void;

  /**
   * 点击推荐饰品按钮
   * 启动推荐饰品流程并追踪用户行为
   */
  _clickRecommendAccessories(): void;

  /**
   * 本次会话中隐藏推荐对话框
   * 设置不再显示标记并追踪用户行为
   */
  _sessionHideRecommendForSessionn(): void;

  /**
   * 渲染组件
   * @returns React元素或null
   */
  render(): ReactElement | null;
}