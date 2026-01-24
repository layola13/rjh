/**
 * SVG 图标配置对象
 */
interface IconAttrs {
  /** SVG viewBox 属性，定义可视区域 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG 路径元素属性
 */
interface PathAttrs {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 子元素配置
 */
interface IconChild {
  /** HTML 标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttrs;
}

/**
 * 图标配置对象
 */
interface IconConfig {
  /** SVG 根元素标签 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: IconAttrs;
  /** SVG 子元素列表 */
  children: IconChild[];
}

/**
 * Profile 图标定义
 * 包含图标的完整配置信息
 */
interface ProfileIconDefinition {
  /** 图标 SVG 结构配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题风格 */
  theme: string;
}

/**
 * Profile 图标 - 轮廓风格
 * 
 * 该图标展示一个带有方框边框和列表项的轮廓图标，
 * 通常用于表示用户配置、个人资料或列表视图。
 * 
 * @remarks
 * - 主题: outlined（轮廓）
 * - 尺寸: 896x896 (viewBox)
 * - 包含: 方形边框 + 3个圆点列表项 + 对应的文本行
 */
declare const profileIcon: ProfileIconDefinition;

export default profileIcon;