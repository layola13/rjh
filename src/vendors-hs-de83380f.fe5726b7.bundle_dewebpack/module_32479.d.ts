/**
 * SVG 图标属性接口
 */
interface SvgAttributes {
  /** SVG 视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG 路径属性接口
 */
interface PathAttributes {
  /** SVG 路径数据 */
  d: string;
  /** 填充颜色 */
  fill: string;
}

/**
 * SVG 子元素接口
 */
interface SvgChild {
  /** 标签名称 */
  tag: 'path';
  /** 路径属性 */
  attrs: PathAttributes;
}

/**
 * SVG 图标返回值接口
 */
interface IconSvg {
  /** 标签名称 */
  tag: 'svg';
  /** SVG 属性 */
  attrs: SvgAttributes;
  /** SVG 子元素数组 */
  children: SvgChild[];
}

/**
 * 图标生成函数类型
 * @param primaryColor - 主要颜色
 * @param secondaryColor - 次要颜色
 * @returns SVG 图标对象
 */
type IconFunction = (primaryColor: string, secondaryColor: string) => IconSvg;

/**
 * 医药箱图标配置接口
 */
interface MedicineBoxIcon {
  /** 图标生成函数 */
  icon: IconFunction;
  /** 图标名称 */
  name: 'medicine-box';
  /** 图标主题 */
  theme: 'twotone';
}

/**
 * 医药箱图标模块
 * 导出双色调主题的医药箱图标
 */
declare const medicineBoxIcon: MedicineBoxIcon;

export default medicineBoxIcon;