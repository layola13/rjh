/**
 * 木材颜色配置项接口
 * 用于定义订单中可选的木材颜色规格
 */
export interface WoodColorItem {
  /** 唯一标识符 */
  id: string;
  /** 是否处于激活状态 */
  is_active: boolean;
  /** 木材颜色名称 */
  name: string;
  /** 木材颜色预览图片URL */
  pic: string;
  /** 是否为默认选项 */
  is_default: boolean;
}

/**
 * 纯色色块配置项接口
 * 用于定义纯色材质选项
 */
export interface PureColorBlockItem {
  /** 十六进制颜色值 */
  value: string;
  /** 颜色名称 */
  name: string;
  /** 是否为默认选项 */
  is_default: boolean;
}

/**
 * 材质色块配置项接口
 * 用于定义带纹理的材质选项
 */
export interface MaterialColorBlockItem {
  /** 材质纹理图片URL */
  value: string;
  /** 材质名称 */
  name: string;
  /** 是否为默认选项 */
  is_default: boolean;
}

/**
 * 颜色配置模块接口
 * 包含订单系统中所有可用的颜色和材质选项
 */
export interface ColorConfiguration {
  /** 订单木材颜色列表 - 包含各种木材饰面选项 */
  orderWoodColor: WoodColorItem[];
  /** 纯色色块列表 - 包含单一颜色选项 */
  pureColorBlock: PureColorBlockItem[];
  /** 材质色块列表 - 包含木材纹理材质选项 */
  materialColorBlock: MaterialColorBlockItem[];
}

/**
 * 颜色配置数据
 * 导出包含所有预定义颜色和材质选项的配置对象
 */
declare const colorConfiguration: ColorConfiguration;

export default colorConfiguration;