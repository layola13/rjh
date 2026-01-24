/**
 * 参数化内容基础属性栏处理器
 * 用于管理参数化模型（如参数化窗帘、浴室柜等）的属性面板交互
 */

import { HSCore } from './HSCore';
import { PropertyBarControlTypeEnum } from './PropertyBarControlTypeEnum';
import { CircleSelectorColorType } from './CircleSelectorColorType';

/** 尺寸范围配置 */
interface SizeRange {
  /** 最小尺寸（米） */
  minSize: number;
  /** 最大尺寸（米） */
  maxSize: number;
}

/** 默认尺寸范围 */
const DEFAULT_SIZE_RANGE: SizeRange = {
  minSize: 0.001,
  maxSize: 9.999,
};

/** 属性树节点 */
interface PropertyNode {
  /** 节点唯一标识 */
  id: string;
  /** 显示标签 */
  label: string;
  /** 节点类型 */
  type: string;
  /** 适用的UI模式 */
  uiMode?: string[];
  /** 子节点列表 */
  children?: PropertyNode[];
  /** 节点数据 */
  data?: unknown;
  /** 是否只读 */
  readonly?: boolean;
  /** 限制类型：'FIXED' | 'INTERVAL' | 'OPTIONS' | 'NONE' */
  limitType?: string;
  /** 材质变量名 */
  name?: string;
  /** 材质值/模型ID */
  value?: string | number;
  /** 企业ID */
  eId?: string;
  /** 产品搜索ID */
  seekId?: string;
  /** 布尔输入数据 */
  boolInputData?: unknown;
}

/** 材质替换选项 */
interface MaterialReplaceOptions {
  /** 场景类型 */
  sceneType?: string;
  /** 父模型ID */
  parentModelId?: string;
  /** 企业ID */
  eId?: string;
  /** 自定义标签页数据 */
  customizedTabs?: unknown[];
  /** 分类ID */
  categoryId?: string;
}

/** 材质编辑卡片属性 */
interface MaterialEditCardProps {
  /** 产品搜索ID */
  seekId?: string | number;
  /** 是否禁用替换 */
  replaceDisabled: boolean;
  /** 材质旋转角度 */
  rotation?: number;
  /** 更新材质信息回调 */
  updateMaterialInfo: () => MaterialInfo;
  /** 替换按钮点击回调 */
  onReplaceBtnClick: () => void;
  /** 旋转图标点击回调 */
  onRotateIconClick: () => void;
  /** 位置相关回调 */
  position: {
    onRotateChangeStart: () => void;
    onRotateChange: () => void;
    onRotateChangeEnd: (rotation: number) => void;
    onOffsetXChangeStart: () => void;
    onOffsetXChange: () => void;
    onOffsetXChangeEnd: (offsetX: number) => void;
    onOffsetYChangeStart: () => void;
    onOffsetYChange: () => void;
    onOffsetYChangeEnd: (offsetY: number) => void;
  };
  /** 位置重置回调 */
  onPositionReset: () => void;
  /** 缩放相关回调 */
  scale: {
    onScaleXChangeStart: () => void;
    onScaleXChange: () => void;
    onScaleXChangeEnd: (scaleX: number, lockRatio: boolean) => void;
    onScaleYChangeStart: () => void;
    onScaleYChange: () => void;
    onScaleYChangeEnd: (scaleY: number, lockRatio: boolean) => void;
  };
  /** 缩放重置回调 */
  onScaleReset: () => void;
}

/** 材质信息 */
interface MaterialInfo {
  /** 材质旋转角度 */
  rotation: number;
  /** 其他材质属性 */
  [key: string]: unknown;
}

/** 属性树解析选项 */
interface PropertyTreeParseOptions {
  /** 标题 */
  title: string;
  /** 基础属性项 */
  basicPropertyItems: PropertyNode[];
  /** 默认尺寸范围 */
  defaultSizeRange: SizeRange;
  /** 基础属性重置点击回调 */
  onBasicPropertyResetClick: () => void;
  /** 值变化回调 */
  onValueChange: (node: PropertyNode, newValue: unknown) => void;
  /** 获取材质编辑卡片属性 */
  getMaterialEditCardProps: (entity: HSCore.Model.ParametricContentBase, node: PropertyNode) => MaterialEditCardProps;
  /** 替换子部件点击回调 */
  onReplaceSubpartClick: (entity: HSCore.Model.ParametricContentBase, node: PropertyNode) => Promise<void>;
  /** 布尔输入数据变化回调 */
  onBoolInputDataChange: (node: PropertyNode, newValue: boolean) => void;
  /** 轮廓替换点击回调 */
  onProfileReplaceClick: (node: PropertyNode) => void;
  /** 重置点击回调 */
  onResetClick: (node: PropertyNode) => void;
}

/** 产品信息 */
interface ProductInfo {
  /** 分类列表 */
  categories?: string[];
  /** 其他产品属性 */
  [key: string]: unknown;
}

/**
 * 参数化内容基础属性栏处理器类
 * 负责处理参数化模型的属性面板生成和交互逻辑
 */
export declare class ParametricContentBasePropertyBarHandler {
  /** 应用实例 */
  private app: HSApp.App;
  
  /** 目录插件 */
  private catalogPlugin: unknown;
  
  /** 命令管理器 */
  private cmdMgr: unknown;
  
  /** 当前实体 */
  private entity?: HSCore.Model.ParametricContentBase;
  
  /** 模型数据 */
  private modelData?: unknown;
  
  /** 命令类型 */
  private readonly commandType: string;

  constructor();

  /**
   * 获取属性栏项列表
   * @param entity - 参数化模型实体
   * @returns 属性项数组
   */
  getPropertyBarItems(entity: HSCore.Model.ParametricContentBase): PropertyNode[];

  /**
   * 获取属性树解析选项
   * @returns 解析选项配置
   * @private
   */
  private _getPropertyTreeParseOptions(): PropertyTreeParseOptions;

  /**
   * 获取基础属性项
   * @returns 基础属性项数组（包含尺寸和位置设置）
   * @private
   */
  private _getBasicPropertyItems(): PropertyNode[];

  /**
   * 基础属性重置点击处理
   * @private
   */
  private _onBasicPropertyResetClick(): void;

  /**
   * 属性值变化处理
   * @param node - 变化的节点
   * @param newValue - 新值
   * @private
   */
  private _onValueChange(node: PropertyNode, newValue: unknown): void;

  /**
   * 显示独立面板前的准备工作
   * @private
   */
  private _willShowIndependentPanel(): void;

  /**
   * 获取材质替换选项
   * @param entity - 参数化模型实体
   * @param node - 属性节点
   * @returns 材质替换配置选项
   * @private
   */
  private _getMaterialReplaceOptions(
    entity: HSCore.Model.ParametricContentBase,
    node: PropertyNode
  ): MaterialReplaceOptions;

  /**
   * 获取材质编辑卡片属性
   * @param entity - 参数化模型实体
   * @param node - 属性节点
   * @returns 材质编辑卡片配置
   * @private
   */
  private _getMaterialEditCardProps(
    entity: HSCore.Model.ParametricContentBase,
    node: PropertyNode
  ): MaterialEditCardProps;

  /**
   * 布尔输入数据变化处理
   * @param node - 属性节点
   * @param newValue - 新布尔值
   * @private
   */
  private _onBoolInputDataChange(node: PropertyNode, newValue: boolean): void;

  /**
   * 轮廓替换点击处理
   * @param node - 属性节点
   * @private
   */
  private _onProfileReplaceClick(node: PropertyNode): void;

  /**
   * 重置点击处理
   * @param node - 属性节点（递归查找材质类型子节点）
   * @private
   */
  private _onResetClick(node: PropertyNode): void;

  /**
   * 获取场景类型（异步）
   * @param product - 产品信息
   * @returns 场景类型字符串，默认为 'hardcover_params_backdrop_inner'
   */
  getSceneType(product?: ProductInfo): Promise<string>;

  /**
   * 替换子部件点击处理（异步）
   * @param entity - 参数化模型实体
   * @param node - 属性节点
   * @private
   */
  private _onReplaceSubpartClick(
    entity: HSCore.Model.ParametricContentBase,
    node: PropertyNode
  ): Promise<void>;
}