/**
 * 设计样式配置模块
 * 提供橱柜设计样式的获取和管理功能
 */

/**
 * 样式元数据，包含ID、计数和元数据信息
 */
export interface StyleMetadata {
  /** 唯一标识符 */
  seekId: string;
  /** 使用次数 */
  count: number;
  /** 关联的元数据对象 */
  meta: unknown;
}

/**
 * 样式配置项
 */
export interface StyleConfig {
  /** 样式唯一标识 */
  id: string;
  /** 分类ID（可选） */
  categoryId?: string;
  /** 样式显示名称 */
  name: string;
  /** 当前选中的值 */
  value: string;
  /** 可选值列表（用于下拉选择） */
  options?: string[];
  /** 是否显示复选框 */
  showCheckBox?: boolean;
  /** 复选框是否选中 */
  checked?: boolean;
  /** 是否可下拉选择 */
  dropDownable?: boolean;
}

/**
 * 设计样式返回结构
 */
export interface DesignStyles {
  /** 品牌标识 */
  brandId: string;
  /** 设计ID */
  id: string;
  /** 样式配置列表 */
  styles: StyleConfig[];
  /** 版本号 */
  version: number;
}

/**
 * 样式元数据映射表
 * 键为样式ID，值为该样式的元数据列表（按使用频率降序排列）
 */
export type StylesMetaMap = Record<string, StyleMetadata[]>;

/**
 * 场景类型
 */
export type SceneType = 'cabinet' | 'wardrobe';

/**
 * 获取完整的设计样式配置
 * @param floorplan - 平面图对象（可选）
 * @param sceneType - 场景类型，默认为 'cabinet'（橱柜）
 * @returns 包含品牌、样式列表和版本信息的设计样式对象
 */
export declare function getDesignStyles(
  floorplan?: unknown,
  sceneType?: SceneType
): DesignStyles;

/**
 * 获取样式配置列表
 * @param floorplan - 平面图对象（可选）
 * @param sceneType - 场景类型，默认为 'cabinet'（橱柜）
 * @returns 样式配置数组，包含材质、样式、尺寸等配置项
 */
export declare function getStyles(
  floorplan?: unknown,
  sceneType?: SceneType
): StyleConfig[];

/**
 * 获取样式元数据映射表
 * 分析场景中各类型元素的使用情况，统计材质、样式等的使用频率
 * @param floorplan - 平面图对象（可选）
 * @returns 样式元数据映射表，键为样式ID，值为按使用频率排序的元数据列表
 */
export declare function getStylesMetaMap(floorplan?: unknown): StylesMetaMap;