/**
 * ExportSVG Plugin - 户型图导出插件
 * 提供多种格式的户型图导出功能，包括SVG、PNG等格式
 */

import { IPlugin } from 'HSApp.Plugin';
import { DesignInfoExtractor } from './DesignInfoExtractor';
import { convertDesignMeta } from './designMetaConverter';

/**
 * 导出配置接口
 */
interface ExportConfig {
  /** 输出格式 */
  output: 'svg' | 'png';
  /** 是否使用外部图片 */
  externalImg: boolean;
  /** 是否生成2D缩略图 */
  thumbnail2D: boolean;
  /** 是否清除文档 */
  clearDoc: boolean;
  /** 样式（可选） */
  style?: string;
  /** 是否不包含内容 */
  isNoContent?: boolean;
  /** 是否包含铺贴图 */
  withPaint?: boolean;
  /** 模板配置（可选） */
  template?: ExportTemplate;
}

/**
 * 导出模板配置
 */
interface ExportTemplate {
  /** 完整宽度 */
  fullWidth: number;
  /** 完整高度 */
  fullHeight: number;
  /** 背景颜色（可选） */
  backgroundColor?: string;
  /** 是否省略尺寸 */
  isOmitSize?: boolean;
  /** 户型图边距 */
  floorplanSpan: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  /** Logo配置 */
  logo: {
    visible: boolean;
  };
  /** 指南针配置 */
  compass: {
    visible: boolean;
  };
  /** 房间样式配置（可选） */
  room?: RoomStyle;
  /** 墙体样式配置（可选） */
  wall?: WallStyle;
  /** 门样式配置（可选） */
  door?: DoorStyle;
  /** 窗户样式配置（可选） */
  window?: WindowStyle;
  /** 开口样式覆盖（可选） */
  openingStyleOverrides?: Record<string, OpeningStyleOverride>;
  /** 入口配置（可选） */
  entry?: {
    visible: boolean;
  };
  /** 尺寸标注配置（可选） */
  dimension?: DimensionStyle;
}

/**
 * 房间样式配置
 */
interface RoomStyle {
  style: string | null;
  fontColor?: string;
  fontOutlineColor?: string;
  drawGroundImg?: boolean;
  edgeColor?: string;
  areaVisible?: boolean;
  isHideRoomName?: boolean;
  typeTextSize?: {
    size: number;
  };
}

/**
 * 墙体样式配置
 */
interface WallStyle {
  normalColor: string;
  loadBearingColor: string;
}

/**
 * 门样式配置
 */
interface DoorStyle {
  visible?: boolean;
  lineColor: string;
}

/**
 * 窗户样式配置
 */
interface WindowStyle {
  lineColor: string;
  strokeColor: string;
  glassColor: string;
  glassStrokeColor: string;
  wallsMaskStrokeWidth: number | string;
  wallColor: string;
}

/**
 * 开口样式覆盖配置
 */
interface OpeningStyleOverride {
  base?: CSSStyleDeclaration;
  background?: CSSStyleDeclaration;
  swing?: CSSStyleDeclaration;
  swingPath?: CSSStyleDeclaration;
}

/**
 * 尺寸标注样式配置
 */
interface DimensionStyle {
  showLevels?: {
    first: boolean;
    second: boolean;
    third: boolean;
  };
  lineColor?: string;
  textColor?: string;
  threshold?: {
    first: number;
    second: number;
  };
  showTextThreshold?: number;
  isIgnoreDimensionOffset?: boolean;
}

/**
 * 工具栏项接口
 */
interface ToolbarItem {
  setData(data: { onclick: () => void }): void;
}

/**
 * 工具栏插件接口
 */
interface ToolbarPlugin {
  getItem(id: string): ToolbarItem | null;
}

/**
 * 持久化插件接口
 */
interface PersistencePlugin {
  ensureSaved(): Promise<boolean>;
  save(): Promise<void>;
}

/**
 * 通用UI插件接口
 */
interface CommonUIPlugin {
  createPopupwindow(config: PopupConfig): React.ReactElement;
}

/**
 * 弹窗配置
 */
interface PopupConfig {
  title: string;
  contents: React.ReactElement;
  width: number;
  height: number;
  submitcall: () => void;
}

/**
 * 插件依赖集合
 */
interface PluginDependencies {
  'hsw.plugin.persistence.Plugin': PersistencePlugin;
  [HSFPConstants.PluginType.Toolbar]: ToolbarPlugin;
  [HSFPConstants.PluginType.CommonUI]: CommonUIPlugin;
  [key: string]: unknown;
}

/**
 * 应用事件参数
 */
interface AppEventParams {
  app: HSApp.Application;
}

/**
 * 用户跟踪日志条目
 */
interface TrackLogEntry {
  description: string;
  group: string;
  type: string;
  withPaint?: boolean;
  hasFurniture?: boolean;
  validOperation?: boolean;
}

/**
 * 渲染快照信息
 */
interface RenderSnapshot {
  /** 相机位置信息，格式："x, y, z" */
  camera: string;
  /** 新房间ID（处理后生成） */
  newRoomId?: string;
}

/**
 * 渲染信息
 */
interface RenderInfo {
  snapshots: RenderSnapshot[];
}

/**
 * 导出数据结构
 */
interface ExportData {
  /** 文档数据 */
  data?: unknown;
  /** 元数据 */
  meta?: unknown;
  /** 渲染信息 */
  renderInfo?: RenderInfo;
}

/**
 * 设计元数据
 */
interface DesignMeta {
  [key: string]: unknown;
}

/**
 * 设计信息
 */
interface DesignInfo {
  room: Array<{
    face_info?: unknown;
    pave_info?: unknown;
    ceiling_info?: unknown;
    struct_info?: unknown;
    diy_info?: unknown;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

/**
 * BOM提取结果
 */
interface BomExtractResult {
  designMeta: DesignMeta;
  designInfo: DesignInfo;
}

/**
 * 导出设计信息结果
 */
interface ExportDesignInfoResult {
  designMeta: DesignMeta;
  renderInfo?: RenderInfo;
  convertedDesignMeta: unknown;
}

/**
 * ExportSVG插件类
 * 负责处理户型图的各种导出需求，包括原始SVG、移动端SVG、天猫/抖音等平台特定格式
 */
declare class ExportSVGPlugin extends IPlugin {
  /** 导出处理器实例 */
  private _handler: unknown;
  
  /** 持久化插件引用 */
  private _persistPlugin: PersistencePlugin;
  
  /** 应用实例 */
  private _app: HSApp.Application;
  
  /** 通用UI插件引用 */
  private commonUI: CommonUIPlugin;
  
  /** 当前激活的窗口实例 */
  private activeWindow: React.Component | null;

  constructor();

  /**
   * 插件激活时调用
   * @param event - 应用事件参数
   * @param dependencies - 插件依赖集合
   */
  onActive(event: AppEventParams, dependencies: PluginDependencies): void;

  /**
   * 插件停用时调用
   */
  onDeactive(): void;

  /**
   * 导出原始SVG格式
   * 不包含外部图片，用于生成2D缩略图
   */
  exportSVGRaw(): void;

  /**
   * 导出移动端SVG格式
   * 使用黑色样式，适配移动端显示
   */
  exportSVGMobile(): void;

  /**
   * 导出天猫正方形SVG（4200x4200）
   * 适用于天猫平台的标准展示格式
   */
  exportTMailSquareSVG(): void;

  /**
   * 导出抖音常规SVG（2970x4200）
   * 适用于抖音平台的标准户型图展示
   */
  exportDmyNormalSVG(): void;

  /**
   * 导出抖音小地图SVG（2970x4200）
   * 透明背景，白色线条，适用于叠加显示
   */
  exportDmyMinimapSVG(): void;

  /**
   * 导出天猫房产户型图（3060x3060）
   * 高度定制化的样式，包含详细的开口样式覆盖
   */
  exportTmallHousingFloorplan(): void;

  /**
   * 导出天猫房产小地图（600x600）
   * 缩略版户型图，用于导航或预览
   */
  exportTmalHousingMiniMap(): void;

  /**
   * 替换工具栏的导出按钮点击事件
   * @param toolbar - 工具栏插件实例
   */
  private _replaceToolbarClick(toolbar: ToolbarPlugin): void;

  /**
   * 显示导出选项弹窗
   */
  private _showPopup(): void;

  /**
   * 显示进度提示
   */
  showProgressHint(): void;

  /**
   * 在渲染前检查是否需要保存
   * @returns 是否已保存
   */
  checkSaveBeforeRender(): Promise<boolean>;

  /**
   * 关闭弹窗
   */
  close(): void;

  /**
   * 生成2D户型图
   * @param excludeFurniture - 是否排除家具
   * @param withPaint - 是否包含铺贴图
   * @returns 生成Promise
   */
  generate2DImg(excludeFurniture: boolean, withPaint?: boolean): Promise<void>;

  /**
   * 生成2D缩略图URL
   * @returns 缩略图URL
   */
  generate2DThumbnailURL(): Promise<string>;

  /**
   * 内部方法：生成2D缩略图
   * @param excludeFurniture - 是否排除家具
   * @param withPaint - 是否包含铺贴图
   * @returns 生成Promise
   */
  private _generate2DThumbnail(
    excludeFurniture: boolean,
    withPaint?: boolean
  ): Promise<void>;

  /**
   * 生成铺贴捕获图
   * @param format - 输出格式，默认"png"
   * @param size - 图片尺寸，默认1024
   * @returns 生成的图片数据
   */
  generatePaveCapture(format?: 'png' | 'svg', size?: number): Promise<unknown>;

  /**
   * 处理导出设计信息
   * @param exportData - 导出数据配置
   * @returns 导出结果
   */
  handleExportDesignInfo(exportData?: ExportData): Promise<ExportDesignInfoResult>;
}

/**
 * 注册ExportSVG插件到插件系统
 */
export function registerExportSVGPlugin(): void;

export default ExportSVGPlugin;