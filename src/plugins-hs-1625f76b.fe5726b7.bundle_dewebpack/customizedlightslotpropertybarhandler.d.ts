/**
 * 自定义灯槽属性栏处理器
 * 负责管理灯槽的尺寸、位置和灯带属性配置
 */

import type { Signal } from 'HSCore.Util';

/**
 * 灯槽参数接口
 */
interface LightSlotParameters {
  /** 宽度（单位：米） */
  width: number;
  /** 高度（单位：米） */
  height: number;
  /** 是否翻转 */
  flip: boolean;
  /** 是否包含灯带 */
  hasLightBand: boolean;
}

/**
 * 灯槽实体参数响应
 */
interface LightSlotEntityParameters {
  /** API路径 */
  path: string;
  /** 灯槽参数 */
  parameters: LightSlotParameters;
  /** 配置选项 */
  options: Record<string, unknown>;
  /** 错误码（-1表示无错误） */
  error?: number;
}

/**
 * 灯槽实体接口
 */
interface LightSlotEntity {
  /**
   * 根据ID获取灯槽实体参数
   * @param id - 灯槽ID
   */
  getLightSlotEntityById(id: string): {
    getParameters(): LightSlotEntityParameters;
  };
}

/**
 * 属性栏项配置
 */
interface PropertyBarItem {
  /** 唯一标识 */
  id: string;
  /** 父级ID */
  parentId?: string;
  /** 显示标签 */
  label?: string;
  /** 属性栏类型 */
  type: string;
  /** 排序顺序 */
  order?: number;
  /** 子项列表 */
  items?: PropertyBarSubItem[];
  /** 配置数据 */
  data?: unknown;
  /** 自定义渲染函数 */
  getRenderItem?(): React.ReactElement;
}

/**
 * 属性栏子项配置
 */
interface PropertyBarSubItem {
  id: string;
  parentId?: string;
  type: string;
  order?: number;
  data: SliderInputData | CheckBlockData | SwitchData;
}

/**
 * 滑块输入配置
 */
interface SliderInputData {
  label: string;
  options: {
    /** 显示小数位数 */
    displayDigits: number;
    /** 是否包含单位 */
    includeUnit: boolean;
    /** 验证规则 */
    rules: {
      range: {
        min: number;
        max: number;
      };
      positiveOnly: boolean;
    };
  };
  /** 当前值 */
  value: number;
  /** 值变化开始回调 */
  onValueChangeStart(value: number): void;
  /** 值变化中回调 */
  onValueChange(event: { detail: { value: number } }): void;
  /** 值变化结束回调 */
  onValueChangeEnd(event: { detail: { value: number } }): void;
}

/**
 * 复选框组配置
 */
interface CheckBlockData {
  label: string;
  blocks: Array<{
    icon: string;
    checked: boolean;
  }>;
  onChange(index: number, checked: boolean): void;
}

/**
 * 开关配置
 */
interface SwitchData {
  label: string;
  checkedChildren: string;
  unCheckedChildren: string;
  checked: boolean;
  onChange(checked: boolean): void;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  createCommand(type: string, args: unknown[]): unknown;
  execute(command: unknown): void;
  receive(event: string, data?: unknown): void;
  complete(): void;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  getPlugin(type: string): unknown;
}

/**
 * 应用实例接口
 */
interface App {
  pluginManager: PluginManager;
  cmdManager: CommandManager;
}

/**
 * 灯槽尺寸变化事件数据
 */
interface LightSlotSizeChangeData {
  width?: number;
  height?: number;
}

/**
 * 自定义灯槽属性栏处理器类
 * 管理灯槽的所有属性配置项，包括尺寸调整、位置翻转和灯带开关
 */
export declare class CustomizedLightSlotPropertyBarHandler {
  /** 应用实例 */
  private app: App;
  
  /** 目录插件 */
  private catalogPlugin: unknown;
  
  /** 命令管理器 */
  private cmdMgr: CommandManager;
  
  /** 灯槽尺寸变化信号 */
  lightSlotSizeChangeSignal: Signal<LightSlotSizeChangeData>;

  constructor();

  /**
   * 获取自定义灯槽的属性栏项列表
   * @param entity - 灯槽实体对象
   * @param lightSlotId - 灯槽唯一标识
   * @returns 属性栏配置项数组
   * 
   * @remarks
   * 返回的属性项包括：
   * - 尺寸设置（宽度/高度滑块）
   * - 位置设置（翻转开关，仅手动添加时显示）
   * - 灯带开关
   * - 预览面板
   */
  getCustomizedLightSlotItems(
    entity: LightSlotEntity | null,
    lightSlotId: string
  ): PropertyBarItem[];
}