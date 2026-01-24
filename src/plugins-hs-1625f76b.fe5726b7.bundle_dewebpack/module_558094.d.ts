/**
 * 颜色配置模块
 * 定义不同状态下的颜色方案
 */

/**
 * 颜色方案接口
 * 定义单个颜色主题的结构
 */
interface ColorScheme {
  /** 主颜色 */
  color: string;
  /** 高亮颜色 */
  lightColor: string;
  /** 填充颜色 */
  fillColor: string;
}

/**
 * 颜色配置接口
 * 包含所有可用的颜色主题
 */
interface ColorConfig {
  /** 模板默认配色 */
  Template: ColorScheme;
  /** 正常状态配色 */
  Normal: ColorScheme;
  /** 悬停状态配色 */
  NormalHover: ColorScheme;
  /** 替换状态配色 */
  Replace: ColorScheme;
}

/**
 * 导出的冻结颜色配置对象
 * 只读，不可修改
 */
declare const colorConfig: Readonly<ColorConfig>;

export default colorConfig;