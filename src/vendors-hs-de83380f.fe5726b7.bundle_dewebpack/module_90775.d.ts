/**
 * SVG 元素属性接口
 */
interface SVGAttributes {
  /** SVG viewBox 属性，定义 SVG 视口的位置和尺寸 */
  viewBox?: string;
  /** 指示元素是否可以获得焦点 */
  focusable?: string;
  /** SVG path 元素的 d 属性，定义路径数据 */
  d?: string;
}

/**
 * SVG 元素节点接口
 */
interface SVGNode {
  /** SVG 标签名称 */
  tag: string;
  /** SVG 元素属性 */
  attrs: SVGAttributes;
  /** 子元素节点数组 */
  children?: SVGNode[];
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** 图标名称 - 用户切换图标 */
  name: 'user-switch';
  /** 图标主题类型 - outlined（轮廓风格） */
  theme: 'outlined';
  /** SVG 图标元素配置 */
  icon: {
    /** 根 SVG 标签名 */
    tag: 'svg';
    /** SVG 根元素属性 */
    attrs: {
      /** SVG 视口坐标系统，定义为 64 64 896 896 */
      viewBox: '64 64 896 896';
      /** 禁用键盘焦点 */
      focusable: 'false';
    };
    /** SVG 子元素数组 */
    children: [
      {
        /** 定义部分标签 */
        tag: 'defs';
        /** 定义元素属性 */
        attrs: Record<string, never>;
        /** 样式子元素 */
        children: [
          {
            /** 样式标签 */
            tag: 'style';
            /** 样式元素属性 */
            attrs: Record<string, never>;
          }
        ];
      },
      {
        /** 路径标签 */
        tag: 'path';
        /** 路径属性 */
        attrs: {
          /** 
           * SVG 路径数据，定义用户切换图标的几何形状
           * 包含用户头像轮廓和双向箭头切换符号
           */
          d: 'M759 335c0-137-111-248-248-248S263 198 263 335c0 82.8 40.6 156.2 103 201.2-.4.2-.7.3-.9.4-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 00-80.4 119.5A373.6 373.6 0 00136 874.8a8 8 0 008 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C356 614.2 431 583 511 583c137 0 248-111 248-248zM511 507c-95 0-172-77-172-172s77-172 172-172 172 77 172 172-77 172-172 172zm105 221h264c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H703.5l47.2-60.1a8.1 8.1 0 001.7-4.9c0-4.4-3.6-8-8-8h-72.6c-4.9 0-9.5 2.3-12.6 6.1l-68.5 87.1c-4.4 5.6-6.8 12.6-6.8 19.8.1 17.7 14.4 32 32.1 32zm240 64H592c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h176.5l-47.2 60.1a8.1 8.1 0 00-1.7 4.9c0 4.4 3.6 8 8 8h72.6c4.9 0 9.5-2.3 12.6-6.1l68.5-87.1c4.4-5.6 6.8-12.6 6.8-19.8-.1-17.7-14.4-32-32.1-32z';
        };
      }
    ];
  };
}

/**
 * 用户切换图标定义
 * @description Ant Design 的 UserSwitch 轮廓风格图标，表示用户切换或账户切换功能
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;