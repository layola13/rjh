/**
 * PropertyBarHandler 模块
 * 负责处理参数化楼梯的属性栏交互和配置
 */

import type { NCustomizedParametricStairs } from '@/core/model';
import type { App } from '@/app';
import type { CommandManager } from '@/command';
import type { CatalogPlugin } from '@/plugins/catalog';

/**
 * 属性项基础接口
 */
interface PropertyItem {
  id: string;
  parentId?: string;
  type: string;
  order: number;
  label?: string;
}

/**
 * 第一级节点属性项
 */
interface FirstLevelNodeItem extends PropertyItem {
  type: 'FirstLevelNode';
  items: PropertyItem[];
  className?: string;
}

/**
 * 第二级节点属性项
 */
interface SecondLevelNodeItem extends PropertyItem {
  type: 'SecondLevelNode';
  items: PropertyItem[];
  status?: boolean;
  rightStatus?: boolean;
  resetItem?: ResetItem;
  customIcon?: CustomIcon;
  icon?: IconConfig;
  onStatusChange?: (status: boolean) => void;
  onRightStatusChange?: (status: boolean) => void;
  disableStatusClick?: () => void;
}

/**
 * 第三级节点属性项
 */
interface ThirdLevelNodeItem extends PropertyItem {
  type: 'ThirdLevelNode';
  items: PropertyItem[];
}

/**
 * 重置项配置
 */
interface ResetItem {
  text: string;
  onResetClick: () => void;
}

/**
 * 自定义图标配置
 */
interface CustomIcon {
  imgUrl: string;
  onClick: () => void;
}

/**
 * 图标配置
 */
interface IconConfig {
  type: string;
  popover: PopoverConfig;
}

/**
 * 弹出框配置
 */
interface PopoverConfig {
  imgUrl: string;
  className: string;
  placement: string;
  trigger: string;
}

/**
 * 长度输入项配置
 */
interface LengthInputItem extends PropertyItem {
  type: 'LengthInput';
  data: {
    label: string;
    value: number;
    options: LengthInputOptions;
    onValueChange: (event: CustomEvent<{ value: number }>) => void;
  };
}

/**
 * 长度输入选项
 */
interface LengthInputOptions {
  displayDigits: number;
  rules: {
    range: {
      min: number;
      max: number;
    };
    positiveOnly: boolean;
  };
  includeUnit: boolean;
  readOnly: boolean;
  unitType?: string;
}

/**
 * 下拉列表项配置
 */
interface DropdownListItem extends PropertyItem {
  type: 'DropdownList';
  data: {
    title: string;
    defaultKey: string;
    options: DropdownOption[];
    onChange: (value: string) => void;
  };
}

/**
 * 下拉选项
 */
interface DropdownOption {
  id: string;
  label: string;
}

/**
 * 开关项配置
 */
interface SwitchItem extends PropertyItem {
  type: 'Switch';
  data: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  };
}

/**
 * 示意图项配置
 */
interface SchematicDiagramItem extends PropertyItem {
  type: 'SchematicDiagram';
  data: {
    imgUrl: string;
  };
}

/**
 * 图片按钮项配置
 */
interface ImageButtonItem extends PropertyItem {
  type: 'ImageButton';
  data: {
    src: string;
    color?: string;
    meta: MaterialMetaData;
    seekId: string;
    onClick: () => void;
  };
}

/**
 * 材质元数据
 */
interface MaterialMetaData {
  iconSmallURI?: string;
  color?: string;
  [key: string]: unknown;
}

/**
 * 属性变更事件数据
 */
interface PropertyChangeEventData {
  data: PropertyItem[];
}

/**
 * 材质替换参数
 */
interface MaterialReplaceParams {
  part: string;
}

/**
 * 楼梯类型数据
 */
interface StairTypeData {
  seekId: string;
  name: string;
  image: string;
  vipModel: boolean;
}

/**
 * 需要更新的面信息
 */
interface FaceUpdateInfo {
  faceIds: string[];
  material: string;
}

/**
 * 属性值范围
 */
type PropertyValueRange = [number, number];

/**
 * 属性值类型
 */
type PropertyValueType = string | number | boolean | PropertyValueRange | string[];

/**
 * 属性栏处理器类
 * 负责管理参数化楼梯的属性面板交互逻辑
 */
export declare class PropertyBarHandler {
  /**
   * 应用实例
   */
  readonly app: App;

  /**
   * 扶手是否启用
   */
  handrailEnabled: boolean;

  /**
   * 命令管理器
   */
  readonly cmdMgr: CommandManager;

  /**
   * 目录插件实例
   */
  readonly catalogplugin: CatalogPlugin;

  /**
   * 混合绘制插件辅助工具
   */
  private readonly _mixPaintPluginHelper: unknown;

  /**
   * 图片资源根路径
   */
  private readonly _imageRoot: string;

  /**
   * 构造函数
   */
  constructor();

  /**
   * 获取属性配置
   * @param event - 属性变更事件数据
   */
  getProperty(event: PropertyChangeEventData): void;

  /**
   * 获取参数设置项
   * @param entity - 楼梯实体对象
   * @param parentId - 父节点 ID
   * @returns 参数设置项数组
   */
  getParameterSettingItems(
    entity: NCustomizedParametricStairs,
    parentId: string
  ): PropertyItem[];

  /**
   * 获取示意图配置
   * @param entity - 楼梯实体对象
   * @param parentId - 父节点 ID
   * @param order - 排序号
   * @returns 示意图配置项
   */
  private _getSchematicDiagram(
    entity: NCustomizedParametricStairs,
    parentId: string,
    order: number
  ): ThirdLevelNodeItem | undefined;

  /**
   * 获取楼梯主体设置项
   * @param entity - 楼梯实体对象
   * @param parentId - 父节点 ID
   * @param order - 排序号
   * @returns 主体设置项配置
   */
  private _getStairsMainSettingItems(
    entity: NCustomizedParametricStairs,
    parentId: string,
    order: number
  ): ThirdLevelNodeItem | undefined;

  /**
   * 获取台阶设置项
   * @param entity - 楼梯实体对象
   * @param parentId - 父节点 ID
   * @param order - 排序号
   * @returns 台阶设置项配置
   */
  private _getStepSettingItems(
    entity: NCustomizedParametricStairs,
    parentId: string,
    order: number
  ): ThirdLevelNodeItem | undefined;

  /**
   * 获取边缘和灯带设置项
   * @param entity - 楼梯实体对象
   * @param parentId - 父节点 ID
   * @param order - 排序号
   * @returns 边缘和灯带设置项配置
   */
  private _getEdgeAndLightBandItems(
    entity: NCustomizedParametricStairs,
    parentId: string,
    order: number
  ): ThirdLevelNodeItem | undefined;

  /**
   * 获取扶手设置项
   * @param entity - 楼梯实体对象
   * @param parentId - 父节点 ID
   * @param order - 排序号
   * @returns 扶手设置项配置
   */
  private _getHandrailItems(
    entity: NCustomizedParametricStairs,
    parentId: string,
    order: number
  ): SecondLevelNodeItem | undefined;

  /**
   * 替换材质
   * @param entity - 楼梯实体对象
   * @param params - 材质替换参数
   */
  replaceMaterial(
    entity: NCustomizedParametricStairs,
    params: MaterialReplaceParams
  ): void;

  /**
   * 获取样式设置项
   * @param entity - 楼梯实体对象
   * @returns 样式设置项数组
   */
  getStyleSettingItems(entity: NCustomizedParametricStairs): PropertyItem[];

  /**
   * 设置扶手参数启用状态
   * @param enabled - 是否启用
   */
  setHandrailParamEnable(enabled: boolean): void;

  /**
   * 获取属性值
   * @param entity - 楼梯实体对象
   * @param propertyType - 属性类型
   * @param key - 属性键名（默认为 'value'）
   * @returns 属性值
   */
  private _getPropertyValue(
    entity: NCustomizedParametricStairs,
    propertyType: string,
    key?: string
  ): PropertyValueType | undefined;

  /**
   * 执行命令
   * @param commandType - 命令类型
   * @param entity - 楼梯实体对象
   * @param propertyType - 属性类型
   * @param value - 属性值
   * @param skipTransaction - 是否跳过事务（默认 false）
   */
  executeCmd(
    commandType: string,
    entity: NCustomizedParametricStairs,
    propertyType: string,
    value: PropertyValueType,
    skipTransaction?: boolean
  ): void;

  /**
   * 重置参数
   * @param propertyTypes - 需要重置的属性类型数组
   */
  resetParams(propertyTypes: string[]): void;

  /**
   * 获取楼梯类型列表
   * @param entity - 楼梯实体对象
   * @returns 楼梯类型配置项
   */
  getStairsType(entity: NCustomizedParametricStairs): PropertyItem;
}