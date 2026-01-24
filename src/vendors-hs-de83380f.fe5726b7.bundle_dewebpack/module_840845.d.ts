/**
 * Ant Design Icon: Backward (Outlined)
 * 
 * 向后/后退图标，包含双箭头指向左侧的SVG路径数据
 * 
 * @module BackwardOutlinedIcon
 */

/**
 * SVG元素的属性接口
 */
interface SvgAttrs {
  /** SVG视图框，定义坐标系统和宽高比 */
  viewBox: string;
  /** 是否可通过键盘获得焦点 */
  focusable: string;
}

/**
 * Path元素的属性接口
 */
interface PathAttrs {
  /** SVG路径数据，定义图形的形状 */
  d: string;
}

/**
 * SVG子元素节点接口
 */
interface SvgChild {
  /** HTML标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttrs;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** 图标的SVG结构 */
  icon: {
    /** 根元素标签 */
    tag: string;
    /** SVG根元素属性 */
    attrs: SvgAttrs;
    /** SVG子元素列表 */
    children: SvgChild[];
  };
  /** 图标名称标识 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Backward图标配置
 * 
 * 双向后退箭头图标，常用于媒体播放器、分页等场景
 */
const BackwardOutlinedIcon: IconConfig = {
  icon: {
    tag: 'svg',
    attrs: {
      viewBox: '0 0 1024 1024',
      focusable: 'false'
    },
    children: [
      {
        tag: 'path',
        attrs: {
          d: 'M485.6 249.9L198.2 498c-8.3 7.1-8.3 20.8 0 27.9l287.4 248.2c10.7 9.2 26.4.9 26.4-14V263.8c0-14.8-15.7-23.2-26.4-13.9zm320 0L518.2 498a18.6 18.6 0 00-6.2 14c0 5.2 2.1 10.4 6.2 14l287.4 248.2c10.7 9.2 26.4.9 26.4-14V263.8c0-14.8-15.7-23.2-26.4-13.9z'
        }
      }
    ]
  },
  name: 'backward',
  theme: 'outlined'
};

export default BackwardOutlinedIcon;