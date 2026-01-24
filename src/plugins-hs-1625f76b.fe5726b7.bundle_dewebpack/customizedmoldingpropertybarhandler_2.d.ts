import type { Signal } from 'HSCore.Util';
import type { CustomizedModel } from 'HSCore.Model';
import type { App } from 'HSApp.App';
import type { CatalogPlugin } from 'HSFPConstants.PluginType';
import type { CommandManager } from 'HSApp';

/**
 * 线条轮廓数据
 */
export interface ProfileData {
  /** 轮廓宽度 */
  profileWidth: number;
  /** 轮廓高度 */
  profileHeight: number;
  /** 缩略图 URL */
  thumbnail: string;
  /** 高清轮廓数据 */
  profileHigh?: string;
  /** 标准轮廓数据 */
  profile: string;
  /** X 方向尺寸 */
  profileSizeX: number;
  /** Y 方向尺寸 */
  profileSizeY: number;
  /** X 方向偏移（厘米） */
  offsetX: number;
  /** Y 方向偏移（厘米） */
  offsetY: number;
  /** 水平翻转 */
  flipHorizontal?: boolean;
}

/**
 * 材质数据
 */
export interface MaterialData {
  /** 材质 SeekId */
  seekId: string;
  /** 颜色值 */
  color?: string;
  /** 旋转角度 */
  rotation?: number;
}

/**
 * 线条实体参数
 */
export interface MoldingParameters {
  /** 轮廓数据 */
  profileData: ProfileData;
  /** 材质数据 */
  materialData: MaterialData;
  /** 法线翻转 */
  flipNormal?: boolean;
  /** 轴向翻转 */
  flip?: boolean;
  /** 错误码（-1 表示有错误） */
  error?: number;
}

/**
 * 属性栏控件项配置
 */
export interface PropertyBarItem {
  /** 控件唯一标识 */
  id: string;
  /** 控件类型 */
  type: PropertyBarControlTypeEnum;
  /** 排序权重 */
  order: number;
  /** 是否唯一键 */
  uniqueKey?: boolean;
  /** 是否有弹出层 */
  hasPopup?: boolean;
  /** 控件数据 */
  data?: PropertyBarItemData;
  /** 获取自定义渲染项 */
  getRenderItem?(): React.ReactElement;
}

/**
 * 属性栏控件数据
 */
export interface PropertyBarItemData {
  /** 图片源 */
  src?: string;
  /** 异步参数 */
  asyncParam?: Promise<{ imgSrc: string }>;
  /** 图标路径 */
  icon?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 提示文本 */
  tooltip?: string;
  /** CSS 类名 */
  className?: string;
  /** 颜色 */
  color?: string;
  /** SeekId */
  seekId?: string;
  /** 标签文本 */
  label?: string;
  /** 控件名称 */
  name?: string;
  /** 值 */
  value?: number;
  /** 单选按钮组 */
  btns?: Array<{ src: [string, string] }>;
  /** 选中索引 */
  selectedIndex?: number;
  /** 元数据 */
  meta?: unknown;
  /** 选项配置 */
  options?: {
    rules?: {
      range?: { min: number; max: number };
      positiveOnly?: boolean;
    };
    includeUnit?: boolean;
    readOnly?: boolean;
  };
  /** 点击事件 */
  onclick?(): void;
  /** 值变化开始事件 */
  onValueChangeStart?(event: CustomEvent): void;
  /** 值变化中事件 */
  onValueChange?(event: CustomEvent<{ value: number }>): void;
  /** 值变化结束事件 */
  onValueChangeEnd?(event: CustomEvent<{ value: number }>): void;
  /** 值改变事件 */
  onchange?(index: number): void;
}

/**
 * 线条字段变化信号数据
 */
export interface MoldingFieldChangeData {
  /** X 偏移（毫米） */
  offsetX?: number;
  /** Y 偏移（毫米） */
  offsetY?: number;
}

/**
 * 自定义线条属性栏处理器
 * 负责处理自定义模型的线条编辑功能，包括材质替换、类型切换、参数调整等
 */
export declare class CustomizedMoldingPropertyBarHandler {
  /** 应用实例 */
  protected app: App;
  
  /** 目录插件 */
  protected catalogPlugin: CatalogPlugin;
  
  /** 命令管理器 */
  protected cmdMgr: CommandManager;
  
  /** 线条字段变化信号 */
  public moldingFieldChangeSignal: Signal<MoldingFieldChangeData>;

  constructor();

  /**
   * 显示独立面板前的准备工作
   * 取消当前命令并关闭独立面板
   * @private
   */
  private _willShowIndependentPanel(): void;

  /**
   * 处理檐口线条材质旋转
   * @private
   * @param profileType - 轮廓类型键名
   * @param model - 自定义模型实例
   */
  private _onCorniceTextureRotation(
    profileType: string,
    model: CustomizedModel
  ): void;

  /**
   * 替换自定义线条材质
   * @param model - 自定义模型实例
   * @param moldingId - 线条实体 ID
   */
  public replaceCustomizedMoldingTexture(
    model: CustomizedModel,
    moldingId: string
  ): void;

  /**
   * 替换自定义线条类型
   * @param model - 自定义模型实例
   * @param moldingId - 线条实体 ID
   */
  public replaceCustomizedMoldingType(
    model: CustomizedModel,
    moldingId: string
  ): void;

  /**
   * 获取自定义线条的属性栏控件项列表
   * @param model - 自定义模型实例
   * @param moldingId - 线条实体 ID
   * @returns 属性栏控件项数组
   */
  public getCustomizedMoldingItems(
    model: CustomizedModel,
    moldingId: string
  ): PropertyBarItem[];
}