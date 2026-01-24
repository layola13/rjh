/**
 * 参数化门窗属性栏处理器
 * 负责处理参数化开口（门窗）的属性栏展示和交互逻辑
 */

import type { HSCore } from '@/core';
import type { HSApp } from '@/app';
import type { IPropertybarUIComponent, IPropertybarEditParametricopeingHoldAction } from '@/types/propertybar';

/**
 * 属性栏UI组件限制类型
 */
export enum PropertybarUIComponentLimitType {
  NONE = 'NONE',
  INTERVAL = 'INTERVAL',
  OPTIONS = 'OPTIONS',
  INCREMENT = 'INCREMENT',
  FIXED = 'FIXED',
  EXPRESSION = 'EXPRESSION'
}

/**
 * 属性栏UI组件类型
 */
export enum PropertybarUIComponentType {
  FLOAT = 'FLOAT',
  INTEGER = 'INTEGER',
  BOOLEAN = 'BOOLEAN',
  MATERIIAL = 'MATERIIAL',
  WIN_SUB_PART = 'WIN_SUB_PART',
  PROFILE = 'PROFILE',
  CONTENT_PART = 'CONTENT_PART',
  LABEL = 'LABEL',
  CHECKBOX = 'CHECKBOX'
}

/**
 * 参数化开口编辑动作类型
 */
export enum PropertybarEditParametricopeingHoldAction {
  SplitFaceSwitch = 'SplitFaceSwitch',
  AFaceMaterialSwitch = 'AFaceMaterialSwitch',
  BFaceMaterialSwitch = 'BFaceMaterialSwitch',
  AllFaceMaterialReplace = 'AllFaceMaterialReplace',
  AFaceMaterialReplace = 'AFaceMaterialReplace',
  BFaceMaterialReplace = 'BFaceMaterialReplace'
}

/**
 * 属性栏节点配置
 */
export interface PropertyBarNode {
  id: string;
  type: string;
  label?: string;
  items?: PropertyBarNode[];
  data?: Record<string, unknown>;
  order?: number;
  reactKey?: string;
  level?: number;
  eId?: number;
  friendlyName?: string;
  name?: string;
  value?: unknown;
  minMax?: [number, number];
  limitType?: PropertybarUIComponentLimitType;
  readonly?: boolean;
  options?: unknown[];
  step?: number;
  children?: PropertyBarNode[];
  title?: string;
  boolInputData?: BoolInputData;
  onRightTitleClick?: () => void;
}

/**
 * 布尔输入数据
 */
export interface BoolInputData {
  name?: string;
  value: boolean;
}

/**
 * 属性树结构
 */
export interface PropertyTree {
  title?: string;
  children: PropertyBarNode[];
}

/**
 * 面分割对信息
 */
export interface SplitABFacePairs {
  aFaces: HSCore.Model.Face[];
  bFaces: HSCore.Model.Face[];
}

/**
 * 材质UI信息
 */
export interface MaterialUIInfo {
  displayName: string;
  detailSeekId?: string;
  src?: string;
  color?: string;
}

/**
 * 目录查询配置
 */
export interface CatalogQueryConfig {
  query?: unknown;
  excludeType?: string;
  mydata?: {
    types: string;
    modelSearchFilter: {
      sceneType: string;
    };
  };
  notFilter?: boolean;
  optionFilters?: Array<{
    categoryType: string;
    filters: Record<string, unknown>;
  }>;
}

/**
 * 事件数据
 */
export interface EventData {
  data?: {
    keepOpening?: boolean;
    meta?: unknown;
  };
}

/**
 * 值变化事件详情
 */
export interface ValueChangeDetail {
  detail: {
    value: number;
  };
}

/**
 * 移动命令选项
 */
export interface MoveCommandOptions {
  wallSnapEnable: boolean;
  ceilingSnapEnable: boolean;
  autoFitDirectionEnable: boolean;
  floorSnapEnable: boolean;
  contentSnapEnable: boolean;
  contentFaceSnappingEnable: boolean;
  constraintInRoom: boolean;
}

/**
 * 初始化配置
 */
export interface InitializationConfig {
  app: HSApp.Application;
}

/**
 * 属性栏填充事件参数
 */
export interface PopulatePropertyBarEvent {
  data: PropertyBarNode[];
}

/**
 * 尺寸属性栏钩子参数
 */
export interface SizePropertyBarHookParams {
  propertytree: PropertyTree;
  parent?: HSCore.Model.Layer;
  host?: HSCore.Model.NCustomizedParametricRoof;
}

/**
 * 参数化门窗属性栏处理器类
 */
export default class ParametricOpeningPropertyBarHandler {
  /** 应用实例 */
  app: HSApp.Application;
  
  /** 目录插件 */
  catalogPlugin: HSApp.Plugin.CatalogPlugin;
  
  /** 门槛石插件 */
  doorStonePlugin: HSApp.Plugin.DoorStonePlugin;
  
  /** 混合材质工具 */
  MixPaintUtil: typeof HSApp.PaintPluginHelper.Util.MixPaintUtil;
  
  /** 命令管理器 */
  cmdMgr: HSApp.CommandManager;
  
  /** 窗台石数据 */
  sillStoneData?: HSApp.Catalog.CatalogItem;
  
  /** 请求类型 */
  requestType: typeof HSFPConstants.RequestType;
  
  /** 命令类型 */
  commandType: typeof HSFPConstants.CommandType;

  /**
   * 构造函数
   * @param config - 初始化配置
   */
  constructor(config: InitializationConfig);

  /**
   * 填充属性栏
   * @param event - 属性栏事件
   */
  onPopulatePropertyBar(event: PopulatePropertyBarEvent): void;

  /**
   * 钩子尺寸属性栏
   * @param params - 参数
   * @returns 属性栏节点数组
   */
  hookSizePropertyBar(params: SizePropertyBarHookParams): PropertyBarNode[];

  /**
   * 钩子属性项
   * @param propertyTree - 属性树
   * @returns 属性栏节点数组
   */
  hookPropertyItem(propertyTree: PropertyTree): PropertyBarNode[];

  /**
   * 钩子属性子项
   * @param node - 节点
   * @param tree - 属性树
   * @returns 属性栏节点
   */
  hookPropertyChildItem(node: PropertyBarNode, tree: PropertyTree): PropertyBarNode;

  /**
   * 根据标签获取节点
   * @param node - 根节点
   * @param label - 标签
   * @returns 匹配的节点或undefined
   */
  getNodeByLabel(node: PropertyBarNode, label: string): PropertyBarNode | undefined;

  /**
   * 钩子浮点数属性
   * @param property - 属性配置
   * @returns 属性栏节点
   */
  private _hookPropertyFLOAT(property: PropertyBarNode): PropertyBarNode;

  /**
   * 钩子整数属性
   * @param property - 属性配置
   * @returns 属性栏节点
   */
  private _hookPropertyINTEGER(property: PropertyBarNode): PropertyBarNode;

  /**
   * 钩子布尔属性
   * @param property - 属性配置
   * @returns 属性栏节点
   */
  private _hookPropertyBOOLEAN(property: PropertyBarNode): PropertyBarNode;

  /**
   * 钩子材质属性
   * @param property - 属性配置
   * @returns 属性栏节点
   */
  private _hookPropertyMATERIAL(property: PropertyBarNode): PropertyBarNode;

  /**
   * 钩子产品元数据属性
   * @param property - 属性配置
   * @returns 属性栏节点
   */
  private _hookPropertyProductMeta(property: PropertyBarNode): PropertyBarNode;

  /**
   * 钩子旋转属性
   * @param property - 属性配置
   * @returns 属性栏节点
   */
  private _hookPropertyRotate(property: PropertyBarNode): PropertyBarNode;

  /**
   * 钩子离地高度属性
   * @param property - 属性配置
   * @returns 属性栏节点
   */
  hookPropertyLD(property: PropertyBarNode): PropertyBarNode;

  /**
   * 钩子标签属性
   * @param property - 属性配置
   * @returns 属性栏节点
   */
  private _hookPropertyLabel(property: PropertyBarNode): PropertyBarNode;

  /**
   * 钩子复选框属性
   * @param property - 属性配置
   * @returns 属性栏节点
   */
  private _hookPropertyCheckBox(property: PropertyBarNode): PropertyBarNode;

  /**
   * 加载面分割配置
   * @param nodes - 属性栏节点数组
   */
  private _loadFaceSplit(nodes: PropertyBarNode[]): void;

  /**
   * 加载子部件配置
   * @param nodes - 属性栏节点数组
   */
  private _loadSubpart(nodes: PropertyBarNode[]): void;

  /**
   * 加载离地高度配置
   * @param nodes - 属性栏节点数组
   * @param model - 参数化开口模型
   */
  private _loadFrontLD(nodes: PropertyBarNode[], model: HSCore.Model.ParametricOpening): void;

  /**
   * 加载门槛石配置
   * @param nodes - 属性栏节点数组
   * @param model - 参数化开口模型
   */
  private _loadDoorStone(nodes: PropertyBarNode[], model: HSCore.Model.ParametricOpening): void;

  /**
   * 填充参数化开口属性栏
   * @param event - 属性栏事件
   */
  private _onPopulateParametricOpeningPropertyBar(event: PopulatePropertyBarEvent): void;

  /**
   * 值变化处理器
   * @param property - 属性节点
   * @param newValue - 新值
   */
  private _onChangeHandler(property: PropertyBarNode, newValue: unknown): void;

  /**
   * 值变化开始
   * @param model - 模型
   */
  private _onValueChangeBegin(model: HSCore.Model.ParametricOpening): void;

  /**
   * 值变化中
   * @param property - 属性节点
   * @param newValue - 新值
   */
  private _onValueChanging(property: PropertyBarNode, newValue: unknown): void;

  /**
   * 值变化结束
   * @param property - 属性节点
   * @param newValue - 新值
   */
  private _onValueChangeEnd(property: PropertyBarNode, newValue: unknown): void;

  /**
   * 重置点击回调
   * @param node - 属性节点
   * @param tree - 属性树
   * @returns 重置处理函数
   */
  private _onResetClick(node: PropertyBarNode, tree: PropertyTree): () => void;

  /**
   * 设置下拉列表选项
   * @param options - 选项数组
   * @returns 格式化的下拉选项
   */
  private _setDropdownList(options: unknown[]): Array<{ id: unknown; title: unknown }>;

  /**
   * 刷新属性栏
   */
  private _refreshPropertybar(): void;

  /**
   * 编辑参数化开口
   * @param actionName - 动作名称
   * @param value - 值
   */
  private _editParametricopeninghole(actionName: string, value: unknown): void;

  /**
   * 面分割开关回调
   * @param actionName - 动作名称
   * @param value - 开关值
   */
  private _splitFaceSwitchCallBack(actionName: string, value: boolean): void;

  /**
   * A侧面材质开关回调
   * @param actionName - 动作名称
   * @param value - 开关值
   */
  private _aFaceMaterialSwitchCallBack(actionName: string, value: boolean): void;

  /**
   * B侧面材质开关回调
   * @param actionName - 动作名称
   * @param value - 开关值
   */
  private _bFaceMaterialSwitchCallBack(actionName: string, value: boolean): void;

  /**
   * 独立面板隐藏回调
   * @param event - 事件数据
   */
  private _onIndependentHidden(event?: EventData): void;

  /**
   * 全部面材质替换回调
   */
  private _faceMaterialReplaceCallBack(): void;

  /**
   * A侧面材质替换回调
   */
  private _aFaceMaterialReplaceCallBack(): void;

  /**
   * B侧面材质替换回调
   */
  private _bFaceMaterialReplaceCallBack(): void;

  /**
   * 即将显示独立面板
   */
  private _willShowIndependentPanel(): void;

  /**
   * 获取选中的模型
   * @returns 参数化开口模型或undefined
   */
  private _getSelectedModel(): HSCore.Model.ParametricOpening | undefined;

  /**
   * 显示替换材质面板
   * @param material - 材质对象
   */
  private _showReplaceMaterialPanel(material: HSCore.Model.Material): void;

  /**
   * 创建替换面材质命令
   * @param model - 参数化开口模型
   * @param faces - 面数组
   */
  private _createReplaceFacesMaterialCmd(
    model: HSCore.Model.ParametricOpening,
    faces: HSCore.Model.Face[]
  ): void;
}