/**
 * 参数化吊顶属性栏处理器
 * 负责为参数化吊顶实体生成属性栏配置项
 */
export declare class NCPCeilingPropertyBarHandler {
  /** 应用实例 */
  private app: HSApp.App;
  
  /** 目录插件实例 */
  private catalogPlugin: unknown;
  
  /** 命令管理器 */
  private cmdMgr: HSApp.CommandManager;
  
  /** 当前处理的实体 */
  private entity: ParametricCeilingEntity | undefined;

  constructor();

  /**
   * 获取属性栏配置项列表
   * @param entity - 参数化吊顶实体
   * @returns 属性栏配置项数组
   */
  getPropertyBarItems(entity: ParametricCeilingEntity): PropertyBarItem[];

  /**
   * 处理属性树项
   * @param propertyTree - 属性树根节点
   * @returns 属性栏配置项数组
   */
  private hookPropertyItem(propertyTree: PropertyTreeNode): PropertyBarItem[];

  /**
   * 处理属性树子项
   * @param childNode - 子节点
   * @param parentNode - 父节点
   * @returns 属性栏配置项或undefined
   */
  private hookPropertyChildItem(
    childNode: PropertyTreeNode,
    parentNode: PropertyTreeNode
  ): PropertyBarItem | undefined;

  /**
   * 处理二级属性节点
   * @param node - 二级节点
   * @param parentNode - 父节点
   * @returns 一级节点配置项
   */
  private _hookPropertyLevelTwo(
    node: PropertyTreeNode,
    parentNode: PropertyTreeNode
  ): FirstLevelNodeItem;

  /**
   * 处理三级属性节点
   * @param node - 三级节点
   * @param parentNode - 父节点
   * @returns 二级节点配置项
   */
  private _hookPropertyLevelThree(
    node: PropertyTreeNode,
    parentNode: PropertyTreeNode
  ): SecondLevelNodeItem;

  /**
   * 设置下拉列表选项
   * @param options - 选项数组
   * @returns 下拉列表项数组
   */
  private _setDropdownList(options: string[]): DropdownOption[];

  /**
   * 处理浮点数类型属性
   * @param node - 浮点数属性节点
   * @returns 对应的属性栏控件配置
   */
  private _hookPropertyFLOAT(node: FloatPropertyNode): PropertyBarItem;

  /**
   * 处理整数类型属性
   * @param node - 整数属性节点
   * @returns 对应的属性栏控件配置
   */
  private _hookPropertyINTEGER(node: IntegerPropertyNode): PropertyBarItem;

  /**
   * 处理布尔类型属性
   * @param node - 布尔属性节点
   * @returns 对应的属性栏控件配置
   */
  private _hookPropertyBOOLEAN(node: BooleanPropertyNode): PropertyBarItem;

  /**
   * 处理旋转属性
   * @param node - 旋转属性节点
   * @returns 旋转控件配置项
   */
  private _hookPropertyRotate(node: PropertyTreeNode): CheckBlockItem;

  /**
   * 处理字符串类型属性
   * @param node - 字符串属性节点
   * @returns 对应的属性栏控件配置
   */
  private _hookPropertySTRING(node: StringPropertyNode): PropertyBarItem;

  /**
   * 处理标签类型属性
   * @param node - 标签属性节点
   * @returns 标签渲染配置项
   */
  private _hookPropertyLabel(node: LabelPropertyNode): LabelItem;

  /**
   * 创建重置点击回调
   * @param node - 当前节点
   * @param rootNode - 根节点
   * @returns 重置回调函数
   */
  private onResetClick(
    node: PropertyTreeNode,
    rootNode: PropertyTreeNode
  ): () => void;

  /**
   * 属性值变更回调
   * @param node - 属性节点
   * @param newValue - 新值
   */
  private onValueChange(node: PropertyTreeNode, newValue: unknown): void;
}

/**
 * 参数化吊顶实体
 */
interface ParametricCeilingEntity {
  /** 实体参数 */
  parameters: {
    /** 属性树 */
    propertytree: PropertyTreeNode;
    /** 旋转角度（可选） */
    rotation?: number;
  };
}

/**
 * 属性树节点
 */
interface PropertyTreeNode {
  /** 节点唯一键 */
  reactKey: string;
  /** 节点类型 */
  type?: PropertyNodeType;
  /** 节点标题 */
  title: string;
  /** 显示名称 */
  friendlyName?: string;
  /** 层级 */
  level?: number;
  /** 子节点 */
  children?: PropertyTreeNode[];
  /** 是否只读 */
  readonly?: boolean;
  /** 限制类型 */
  limitType?: LimitType;
  /** 数值范围 */
  minMax?: [number, number];
  /** 当前值 */
  value?: unknown;
  /** 步长 */
  step?: number;
  /** 选项列表 */
  options?: string[];
  /** 布尔输入数据 */
  boolInputData?: BoolInputData;
}

/**
 * 属性节点类型
 */
type PropertyNodeType =
  | "FLOAT"
  | "INTEGER"
  | "BOOLEAN"
  | "STRING"
  | "label"
  | "ddc8aaa2-1b65-4321-8393-373b42f666db"; // 旋转类型UUID

/**
 * 限制类型
 */
type LimitType = "NONE" | "INTERVAL" | "OPTIONS" | "INCREMENT" | "FIXED";

/**
 * 浮点数属性节点
 */
interface FloatPropertyNode extends PropertyTreeNode {
  type: "FLOAT";
  value: number;
  minMax: [number, number];
}

/**
 * 整数属性节点
 */
interface IntegerPropertyNode extends PropertyTreeNode {
  type: "INTEGER";
  value: number;
  minMax: [number, number];
}

/**
 * 布尔属性节点
 */
interface BooleanPropertyNode extends PropertyTreeNode {
  type: "BOOLEAN";
  value: boolean;
}

/**
 * 字符串属性节点
 */
interface StringPropertyNode extends PropertyTreeNode {
  type: "STRING";
  value: string;
}

/**
 * 标签属性节点
 */
interface LabelPropertyNode extends PropertyTreeNode {
  type: "label";
  value: string;
}

/**
 * 布尔输入数据
 */
interface BoolInputData {
  /** 当前值 */
  value: boolean;
}

/**
 * 属性栏配置项基类型
 */
type PropertyBarItem =
  | PropertyBarHeader
  | FirstLevelNodeItem
  | SecondLevelNodeItem
  | SliderInputItem
  | DropdownInputItem
  | LengthInputItem
  | SwitchItem
  | CheckBlockItem
  | LabelItem;

/**
 * 属性栏头部
 */
interface PropertyBarHeader {
  type: typeof HSFPConstants.PropertyBarType.PropertyBar;
  label: string;
}

/**
 * 一级节点配置
 */
interface FirstLevelNodeItem {
  id: string;
  label: string;
  type: typeof HSFPConstants.PropertyBarType.FirstLevelNode;
  items: PropertyBarItem[];
}

/**
 * 二级节点配置
 */
interface SecondLevelNodeItem {
  id: string;
  label: string;
  type: typeof HSFPConstants.PropertyBarType.SecondLevelNode;
  status?: boolean;
  onStatusChange?: (newStatus: boolean) => void;
  disableShow?: boolean;
  resetItem: {
    onResetClick: () => void;
  };
  items: PropertyBarItem[];
}

/**
 * 滑块输入控件
 */
interface SliderInputItem {
  id: string;
  type: typeof PropertyBarControlTypeEnum.sliderInput;
  uniqueKey: boolean;
  data: {
    label: string;
    name: string;
    options: {
      rules: {
        range: {
          min: number;
          max: number;
        };
      };
      includeUnit: boolean;
      readOnly: boolean;
    };
    disabled: boolean;
    value: number;
    onValueChangeEnd: (event: { detail: { value: number } }) => void;
  };
}

/**
 * 下拉框控件
 */
interface DropdownInputItem {
  id: string;
  type: typeof HSFPConstants.PropertyBarType.DropdownInput;
  data: {
    title: string;
    defaultValue: string;
    editable: boolean;
    disabled: boolean;
    options: DropdownOption[];
    onChange: (value: string) => void;
  };
}

/**
 * 下拉选项
 */
interface DropdownOption {
  id: string;
  title: string;
}

/**
 * 长度输入控件
 */
interface LengthInputItem {
  id: string;
  type: typeof HSFPConstants.PropertyBarType.LengthInput;
  data: {
    name: string;
    label: string;
    value: number;
    disabled: boolean;
    lengthStep?: number;
    options: {
      rules: {
        range: {
          min: number;
          max: number;
        };
      };
      includeUnit: boolean;
      displayDigits: number;
      readOnly: boolean;
    };
    onValueChange: (event: { detail: { value: number } }) => void;
  };
}

/**
 * 开关控件
 */
interface SwitchItem {
  id: string;
  type: typeof HSFPConstants.PropertyBarType.Switch;
  data: {
    label: string;
    name: string;
    checked: boolean;
    disabled: boolean;
    onChange: (checked: boolean) => void;
  };
}

/**
 * 复选块控件
 */
interface CheckBlockItem {
  id: string;
  type: typeof HSFPConstants.PropertyBarType.CheckBlock;
  data: {
    label: string;
    blocks: Array<{
      icon: string;
      checked: boolean | undefined;
    }>;
    onChange: () => void;
    disabled: boolean;
  };
}

/**
 * 标签渲染项
 */
interface LabelItem {
  id: string;
  getRenderItem: () => unknown;
}

/**
 * 应用命名空间（HSApp全局对象）
 */
declare namespace HSApp {
  /** 应用主类 */
  class App {
    /** 插件管理器 */
    pluginManager: PluginManager;
    /** 命令管理器 */
    cmdManager: CommandManager;
    /** 选择管理器 */
    selectionManager: SelectionManager;

    /** 获取应用单例 */
    static getApp(): App;
  }

  /** 插件管理器 */
  interface PluginManager {
    getPlugin(pluginType: string): unknown;
  }

  /** 命令管理器 */
  interface CommandManager {
    createCommand(commandType: string, entities: unknown[]): Command;
    execute(command: Command): void;
    receive(eventName: string, data: unknown): void;
    complete(): void;
  }

  /** 命令对象 */
  interface Command {}

  /** 选择管理器 */
  interface SelectionManager {
    selected(includeDetails?: boolean): ParametricCeilingEntity[];
  }
}

/**
 * 资源管理器全局对象
 */
declare namespace ResourceManager {
  /**
   * 获取本地化字符串
   * @param key - 字符串键
   */
  function getString(key: string): string;
}

/**
 * 常量定义
 */
declare namespace HSFPConstants {
  namespace PluginType {
    const Catalog: string;
  }

  namespace CommandType {
    const NEditParametricCeiling: string;
  }

  namespace PropertyBarType {
    const PropertyBar: string;
    const FirstLevelNode: string;
    const SecondLevelNode: string;
    const DropdownInput: string;
    const LengthInput: string;
    const Switch: string;
    const CheckBlock: string;
  }
}

/**
 * 属性栏控件类型枚举
 */
declare enum PropertyBarControlTypeEnum {
  sliderInput = "sliderInput",
}