/**
 * 定制线条属性栏处理器
 * 负责处理定制模型中线条(踢脚线、顶角线等)的属性编辑和交互逻辑
 */

import type { App } from 'HSApp';
import type { CustomizedModel } from 'HSCore.Model';
import type { Signal } from 'HSCore.Util';
import type { CommandManager, Command } from 'HSApp.Commands';
import type { CatalogPlugin } from 'HSApp.Plugins';

/**
 * 线条轮廓数据
 */
interface ProfileData {
  /** 轮廓宽度(米) */
  profileWidth: number;
  /** 轮廓高度(米) */
  profileHeight: number;
  /** X方向尺寸(米) */
  profileSizeX: number;
  /** Y方向尺寸(米) */
  profileSizeY: number;
  /** X方向偏移(厘米) */
  offsetX: number;
  /** Y方向偏移(厘米) */
  offsetY: number;
  /** 缩略图URL */
  thumbnail: string;
  /** 高精度轮廓数据 */
  profileHigh?: string;
  /** 标准轮廓数据 */
  profile?: string;
  /** 是否水平翻转 */
  flipHorizontal?: boolean;
}

/**
 * 材质数据
 */
interface MaterialData {
  /** 材质目录ID */
  seekId: string;
  /** 材质颜色 */
  color?: string;
  /** 纹理旋转角度(度) */
  rotation?: number;
}

/**
 * 线条参数
 */
interface MoldingParameters {
  /** 轮廓数据 */
  profileData: ProfileData;
  /** 材质数据 */
  materialData: MaterialData;
  /** 是否法向翻转 */
  flipNormal?: boolean;
  /** 是否轴向翻转 */
  flip?: boolean;
  /** 错误码(-1表示有错误) */
  error?: number;
}

/**
 * 参数化吊顶元数据
 */
interface ParametricCeilingMetadata {
  parameters: {
    /** 吊顶类型枚举值 */
    parametricCeilingType: number;
    /** 线条轮廓数据字典(按ID索引) */
    [moldingId: string]: {
      profileSizeX: number;
      profileSizeY: number;
      profileWidth: number;
      profileHeight: number;
      offsetX: number;
      offsetY: number;
      materialData: MaterialData;
    };
    /** 翻转线条轮廓数据(用于矩形吊顶) */
    flippedMoldingProfileData?: any;
    /** 标准线条轮廓数据 */
    moldingProfileData?: any;
  };
}

/**
 * 扩展的定制模型接口
 */
interface ExtendedCustomizedModel extends CustomizedModel {
  /** 元数据 */
  metadata: ParametricCeilingMetadata;
  /** 材质管理器 */
  materialManager: {
    setMoldingMaterialDirty(moldingId: string): void;
  };
  /**
   * 根据ID获取线条实体
   */
  getMoldingEntityById(moldingId: string): {
    getParameters(): MoldingParameters;
  };
}

/**
 * 属性栏配置项
 */
interface PropertyBarItem {
  /** 唯一标识 */
  id: string;
  /** 父节点ID */
  parentId?: string;
  /** 显示标签 */
  label?: string;
  /** 属性类型 */
  type: string;
  /** 子项列表 */
  items?: PropertyBarItem[];
  /** 排序权重 */
  order: number;
  /** 具体数据 */
  data?: any;
  /** 自定义渲染函数 */
  getRenderItem?: () => React.ReactElement;
}

/**
 * 滑块输入配置
 */
interface SliderInputData {
  /** 标签文本 */
  label: string;
  /** 当前值 */
  value: number;
  /** 配置选项 */
  options: {
    /** 验证规则 */
    rules: {
      /** 数值范围 */
      range: { min: number; max: number };
      /** 是否仅允许正数 */
      positiveOnly?: boolean;
    };
    /** 是否包含单位显示 */
    includeUnit: boolean;
    /** 是否只读 */
    readOnly: boolean;
  };
  /** 是否双向绑定 */
  twoWays?: boolean;
  /** 值改变开始回调 */
  onValueChangeStart?: (event: any) => void;
  /** 值改变中回调 */
  onValueChange?: (event: { detail: { value: number } }) => void;
  /** 值改变结束回调 */
  onValueChangeEnd?: (event: { detail: { value: number } }) => void;
}

/**
 * 图片按钮配置
 */
interface ImageButtonData {
  /** 图片源 */
  src?: string;
  /** 异步参数(返回图片信息的Promise) */
  asyncParam?: Promise<{ imgSrc: string }>;
  /** 颜色 */
  color?: string;
  /** 材质目录ID */
  seekId?: string;
  /** 元数据 */
  meta?: any;
  /** 点击回调 */
  onClick: () => void;
  /** 是否禁用图标按钮 */
  disableIcon?: boolean;
  /** 图标类名 */
  icon?: string;
  /** 图标点击回调 */
  onIconClick?: () => void;
}

/**
 * 复选块配置
 */
interface CheckBlockData {
  /** 标签文本 */
  label: string;
  /** 复选块列表 */
  blocks: Array<{
    /** 图标类名 */
    icon: string;
    /** 是否选中 */
    checked: boolean;
  }>;
  /** 改变回调 */
  onChange: (index: number, checked: boolean) => void;
}

/**
 * 线条字段变更信号载荷
 */
interface MoldingFieldChangePayload {
  /** X方向偏移(毫米) */
  offsetX?: number;
  /** Y方向偏移(毫米) */
  offsetY?: number;
}

/**
 * 定制线条属性栏处理器
 * 管理定制模型中线条组件的属性面板交互
 */
export declare class CustomizedMoldingPropertyBarHandler {
  /** 应用实例 */
  private readonly app: App;
  
  /** 目录插件 */
  private readonly catalogPlugin: CatalogPlugin;
  
  /** 命令管理器 */
  private readonly cmdMgr: CommandManager;
  
  /** 线条字段变更信号 */
  readonly moldingFieldChangeSignal: Signal<MoldingFieldChangePayload>;

  constructor();

  /**
   * 即将显示独立面板前的准备工作
   * - 取消当前命令
   * - 关闭独立面板
   * @private
   */
  private _willShowIndependentPanel(): void;

  /**
   * 处理顶角线纹理旋转
   * @param moldingId - 线条ID
   * @param model - 定制模型实例
   * @private
   */
  private _onCorniceTextureRotation(
    moldingId: string,
    model: ExtendedCustomizedModel
  ): void;

  /**
   * 替换定制线条的材质纹理
   * @param model - 定制模型实例
   * @param moldingId - 线条ID
   */
  replaceCustomizedMoldingTexture(
    model: ExtendedCustomizedModel | null,
    moldingId: string
  ): void;

  /**
   * 替换定制线条的类型(轮廓形状)
   * @param model - 定制模型实例
   * @param moldingId - 线条ID
   */
  replaceCustomizedMoldingType(
    model: ExtendedCustomizedModel | null,
    moldingId: string
  ): void;

  /**
   * 获取定制线条的属性栏配置项列表
   * @param model - 定制模型实例
   * @param moldingId - 线条ID
   * @returns 属性栏配置项数组
   * @description
   * 构建包含以下功能模块的属性面板:
   * - 尺寸设置(宽度、高度调节)
   * - 位置设置(翻转、偏移调整)
   * - 样式设置(轮廓选择、材质替换)
   */
  getCustomizedMoldingItems(
    model: ExtendedCustomizedModel | null,
    moldingId: string
  ): PropertyBarItem[];
}