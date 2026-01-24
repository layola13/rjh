/**
 * NCPBackgroundWall（背景墙）基础属性栏处理器
 * 负责处理参数化背景墙及其单元的属性面板配置和交互逻辑
 */

import { HSCore } from '635589';
import { PropertyTreeParseUtil } from '104699';
import { IDefaultSizeRange, CircleSelectorColorType } from '555330';
import { ParametricModelPropertyBarUtil } from '853024';
import { MenuBuilder } from '160760';

/**
 * 自定义迭代器辅助函数返回类型
 */
interface IteratorResult<T> {
  /** 迭代是否完成 */
  done: boolean;
  /** 当前迭代值 */
  value?: T;
}

/**
 * 迭代器接口
 */
interface Iterator<T> {
  /** 开始迭代 */
  s: () => void;
  /** 获取下一个值 */
  n: () => IteratorResult<T>;
  /** 错误处理 */
  e: (error: unknown) => void;
  /** 完成清理 */
  f: () => void;
}

/**
 * 材质替换选项配置
 */
interface MaterialReplaceOptions {
  /** 场景类型 */
  sceneType?: string;
  /** 父模型ID */
  parentModelId?: string;
  /** 企业ID */
  eId?: string;
  /** 自定义标签页数据 */
  customizedTabs?: unknown;
}

/**
 * 材质编辑卡片属性配置
 */
interface MaterialEditCardProps {
  /** 材质资源ID */
  seekId: string;
  /** 是否禁用替换功能 */
  replaceDisabled: boolean;
  /** 更新材质信息的回调 */
  updateMaterialInfo: () => unknown;
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
    onOffsetXChangeEnd: (offset: number) => void;
    onOffsetYChangeStart: () => void;
    onOffsetYChange: () => void;
    onOffsetYChangeEnd: (offset: number) => void;
  };
  /** 位置重置回调 */
  onPositionReset: () => void;
  /** 缩放相关回调 */
  scale: {
    onScaleXChangeStart: () => void;
    onScaleXChange: () => void;
    onScaleXChangeEnd: (scale: number, lockRatio: boolean) => void;
    onScaleYChangeStart: () => void;
    onScaleYChange: () => void;
    onScaleYChangeEnd: (scale: number, lockRatio: boolean) => void;
  };
  /** 缩放重置回调 */
  onScaleReset: () => void;
}

/**
 * 属性树解析选项配置
 */
interface PropertyTreeParseOptions {
  /** 标题 */
  title: string;
  /** 基础属性项列表 */
  basicPropertyItems: PropertyBarItem[];
  /** 默认尺寸范围 */
  defaultSizeRange: {
    minSize: number;
    maxSize: number;
  };
  /** 基础属性重置点击回调 */
  onBasicPropertyResetClick: () => void;
  /** 值变化回调 */
  onValueChange: (node: unknown, newValue: unknown) => void;
  /** 获取材质编辑卡片属性 */
  getMaterialEditCardProps: (entity: unknown, node: unknown) => MaterialEditCardProps;
  /** 布尔输入数据变化回调 */
  onBoolInputDataChange: (node: unknown, value: boolean) => boolean;
  /** 钩子属性装饰条 */
  hookPropertyMolding: (node: unknown) => unknown;
  /** 轮廓替换点击回调 */
  onProfileReplaceClick: (node: unknown) => void;
  /** 重置点击回调 */
  onResetClick: (node: unknown) => void;
}

/**
 * 属性栏项配置
 */
interface PropertyBarItem {
  /** 唯一标识 */
  id: string;
  /** 显示标签 */
  label?: string;
  /** 控件类型 */
  type: string;
  /** 右侧状态 */
  rightStatus?: boolean;
  /** UI模式限制 */
  uiMode?: string[];
  /** 右侧状态变化回调 */
  onRightStatusChange?: (status: boolean) => void;
  /** 子项列表 */
  items?: PropertyBarItem[];
  /** 唯一键标识 */
  uniqueKey?: boolean;
  /** 数据配置 */
  data?: unknown;
  /** 是否禁用 */
  disabled?: boolean;
  /** 值 */
  value?: unknown;
  /** 开关状态 */
  status?: boolean;
  /** 状态变化回调 */
  onStatusChange?: (status: boolean) => void;
  /** 值变化开始回调 */
  onValueChangeStart?: () => void;
  /** 值变化回调 */
  onValueChange?: (event: CustomEvent) => void;
  /** 值变化结束回调 */
  onValueChangeEnd?: (event: CustomEvent) => void;
}

/**
 * 限制类型枚举
 */
type LimitType = 'INTERVAL' | 'OPTIONS' | 'NONE' | 'FIXED';

/**
 * 属性节点配置
 */
interface PropertyNode {
  /** 节点名称 */
  name: string;
  /** 节点类型 */
  type: string;
  /** 限制类型 */
  limitType?: LimitType;
  /** 企业ID */
  eId?: string;
  /** 值 */
  value?: string;
  /** 是否只读 */
  readonly?: boolean;
  /** 子节点列表 */
  children?: PropertyNode[];
  /** React唯一键 */
  reactKey?: string;
  /** 布尔输入数据 */
  boolInputData?: unknown;
}

/**
 * 自身装饰条类型
 */
type SelfMoldingType = 'left' | 'right';

/**
 * 装饰条状态变化参数
 */
interface MoldingStatusChangeParams {
  /** 是否选中 */
  checked: boolean;
  /** 装饰条类型 */
  selfMoldingType: SelfMoldingType;
}

/**
 * 面标签信息
 */
interface FaceTag {
  // 具体结构根据实际使用定义
  [key: string]: unknown;
}

/**
 * NCPBackgroundWall基础属性栏处理器类
 * 负责管理参数化背景墙的属性面板交互逻辑
 */
export declare class NCPBackgroundWallBasePropertyBarHandler {
  /** 应用实例 */
  private app: unknown;
  
  /** 目录插件实例 */
  private catalogPlugin: unknown;
  
  /** 命令管理器 */
  private cmdMgr: unknown;
  
  /** 当前实体对象 */
  private entity: HSCore.Model.NCustomizedParametricBackgroundWall | HSCore.Model.NCPBackgroundWallUnit | undefined;
  
  /** 模型数据 */
  private modelData: unknown;
  
  /** 命令类型 */
  private commandType: string;

  constructor();

  /**
   * 获取属性栏项列表
   * @param entity - 实体对象
   * @returns 属性栏项数组
   */
  getPropertyBarItems(entity: HSCore.Model.NCustomizedParametricBackgroundWall | HSCore.Model.NCPBackgroundWallUnit): PropertyBarItem[];

  /**
   * 获取属性树解析选项配置
   * @returns 属性树解析选项
   * @private
   */
  private _getPropertyTreeParseOptions(): PropertyTreeParseOptions;

  /**
   * 获取基础属性项列表
   * @returns 基础属性项数组
   * @private
   */
  private _getBasicPropertyItems(): PropertyBarItem[];

  /**
   * 获取实体到墙面的距离
   * @returns 距离值（米）
   */
  getDistanceToFace(): number;

  /**
   * 判断内容是否正在移动
   * @returns 是否在移动中
   */
  isMovingContent(): boolean;

  /**
   * 基础属性重置点击处理
   * @private
   */
  private _onBasicPropertyResetClick(): void;

  /**
   * 值变化处理
   * @param node - 属性节点
   * @param newValue - 新值
   * @private
   */
  private _onValueChange(node: unknown, newValue: unknown): void;

  /**
   * 显示独立面板前的准备工作
   * @private
   */
  private _willShowIndependentPanel(): void;

  /**
   * 获取材质替换选项
   * @param entity - 实体对象
   * @param node - 属性节点
   * @returns 材质替换选项配置
   * @private
   */
  private _getMaterialReplaceOptions(
    entity: HSCore.Model.NCustomizedParametricBackgroundWall | HSCore.Model.NCPBackgroundWallUnit,
    node: PropertyNode
  ): MaterialReplaceOptions;

  /**
   * 获取材质编辑卡片属性配置
   * @param entity - 实体对象
   * @param node - 属性节点
   * @returns 材质编辑卡片属性
   * @private
   */
  private _getMaterialEditCardProps(
    entity: HSCore.Model.NCustomizedParametricBackgroundWall | HSCore.Model.NCPBackgroundWallUnit,
    node: PropertyNode
  ): MaterialEditCardProps;

  /**
   * 布尔输入数据变化处理
   * @param node - 属性节点
   * @param value - 新的布尔值
   * @returns 处理结果
   * @private
   */
  private _onBoolInputDataChange(node: PropertyNode, value: boolean): boolean;

  /**
   * 钩子属性装饰条（用于背景墙单元左右装饰条）
   * @param node - 属性节点
   * @returns 装饰条属性项数组
   * @private
   */
  private _hookPropertyMolding(node: PropertyNode): PropertyBarItem[];

  /**
   * 单元自身装饰条状态变化处理
   * @param params - 装饰条状态变化参数
   */
  unitSelfMoldingStatusChange(params: MoldingStatusChangeParams): void;

  /**
   * 轮廓替换点击处理
   * @param node - 属性节点
   * @private
   */
  private _onProfileReplaceClick(node: PropertyNode): void;

  /**
   * 重置点击处理
   * @param node - 属性节点
   * @private
   */
  private _onResetClick(node: PropertyNode): void;
}