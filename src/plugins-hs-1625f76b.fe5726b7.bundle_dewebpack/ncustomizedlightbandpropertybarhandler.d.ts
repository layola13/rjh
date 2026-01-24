/**
 * 自定义灯带属性栏处理器
 * 用于管理和配置自定义灯带的属性面板项
 * Original Module ID: 659560
 */

import type { App } from 'HSApp';
import type { CatalogPlugin } from 'HSFPConstants';
import type { CommandManager, Command } from 'HSFPConstants';

/**
 * 灯带实体参数
 */
interface LightBandParameters {
  /** 是否翻转 */
  flip: boolean;
}

/**
 * 灯带实体
 */
interface LightBandEntity {
  /** 灯带唯一标识 */
  lightBandId: string;
  /** 轮廓宽度（米） */
  profileWidth: number;
  /** 灯带参数 */
  parameters?: LightBandParameters;
}

/**
 * 父级实体（包含子灯带）
 */
interface ParentEntity {
  /** 子实体集合 */
  children: Record<string, LightBandEntity>;
}

/**
 * 重置项配置
 */
interface ResetItemConfig {
  /** 重置按钮点击回调 */
  onResetClick: () => void;
}

/**
 * 滑块输入控件值变更事件
 */
interface SliderInputChangeEvent {
  detail: {
    /** 变更后的值 */
    value: number;
  };
}

/**
 * 属性栏项配置
 */
interface PropertyBarItem {
  /** 项唯一标识 */
  id: string;
  /** 父级项ID */
  parentId: string;
  /** 显示标签 */
  label?: string;
  /** 项类型 */
  type: string;
  /** 重置项配置（可选） */
  resetItem?: ResetItemConfig;
  /** 子项列表（可选） */
  items?: PropertyBarItem[];
  /** 排序权重（可选） */
  order?: number;
  /** 数据配置（可选） */
  data?: PropertyBarItemData;
}

/**
 * 属性栏项数据配置
 */
interface PropertyBarItemData {
  /** 显示标签 */
  label: string;
  /** 字段名称 */
  name?: string;
  /** 控件选项 */
  options?: SliderInputOptions | CheckBlockOptions;
  /** 当前值 */
  value?: number;
  /** 复选块配置 */
  blocks?: CheckBlock[];
  /** 值变更开始回调 */
  onValueChangeStart?: () => void;
  /** 值变更中回调 */
  onValueChange?: (event: SliderInputChangeEvent) => void;
  /** 值变更结束回调 */
  onValueChangeEnd?: () => void;
  /** 变更回调 */
  onChange?: (index: number, checked: boolean) => void;
}

/**
 * 滑块输入控件选项
 */
interface SliderInputOptions {
  /** 验证规则 */
  rules: {
    /** 范围限制 */
    range: {
      /** 最小值 */
      min: number;
      /** 最大值 */
      max: number;
    };
    /** 仅允许正数 */
    positiveOnly: boolean;
  };
  /** 是否包含单位 */
  includeUnit: boolean;
}

/**
 * 复选块选项
 */
interface CheckBlockOptions {
  // 扩展字段根据实际需求定义
}

/**
 * 复选块配置
 */
interface CheckBlock {
  /** 图标名称 */
  icon: string;
  /** 是否选中 */
  checked: boolean;
}

/**
 * 自定义灯带属性栏处理器
 * 负责生成和管理自定义灯带的属性面板项
 */
export declare class NCustomizedLightBandPropertyBarHandler {
  /** 应用实例 */
  private app: App;
  
  /** 目录插件实例 */
  private catalogPlugin: CatalogPlugin;
  
  /** 命令管理器 */
  private cmdMgr: CommandManager;

  /**
   * 构造函数
   * 初始化应用、插件和命令管理器
   */
  constructor();

  /**
   * 获取自定义灯带属性栏项列表
   * @param parentEntity - 父级实体对象
   * @param lightBandId - 灯带唯一标识
   * @returns 属性栏项配置数组
   */
  getCustomizedLightBandItems(
    parentEntity: ParentEntity | null | undefined,
    lightBandId: string
  ): PropertyBarItem[];

  /**
   * 根据ID获取灯带实体
   * @param parentEntity - 父级实体对象
   * @param lightBandId - 灯带唯一标识
   * @returns 匹配的灯带实体，如果未找到则返回 undefined
   */
  private getMoldingEntityById(
    parentEntity: ParentEntity,
    lightBandId: string
  ): LightBandEntity | undefined;
}