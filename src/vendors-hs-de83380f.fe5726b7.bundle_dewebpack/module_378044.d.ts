/**
 * SVG 图标属性接口
 */
interface SvgAttrs {
  /** 填充规则 */
  'fill-rule'?: string;
  /** SVG 视图框 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
}

/**
 * SVG 路径属性接口
 */
interface PathAttrs {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 子元素接口
 */
interface SvgChild {
  /** 标签名称 */
  tag: 'path';
  /** 路径属性 */
  attrs: PathAttrs;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** 标签名称 */
  tag: 'svg';
  /** SVG 属性 */
  attrs: SvgAttrs;
  /** 子元素数组 */
  children: SvgChild[];
}

/**
 * Discord 图标对象接口
 */
interface DiscordIcon {
  /** 图标配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: 'discord';
  /** 图标主题 */
  theme: 'filled';
}

/**
 * Discord 填充风格图标
 * @description 包含 Discord 官方 Logo 的 SVG 路径数据
 */
declare const discordIcon: DiscordIcon;

export default discordIcon;