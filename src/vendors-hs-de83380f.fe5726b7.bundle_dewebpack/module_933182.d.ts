/**
 * SVG 图标属性接口
 */
interface IconAttrs {
  /** SVG viewBox 属性，定义 SVG 的可视区域 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** 路径数据，用于绘制 SVG 图形 */
  d?: string;
}

/**
 * SVG 子元素节点接口
 */
interface IconChild {
  /** 标签名称 */
  tag: string;
  /** 标签属性 */
  attrs: IconAttrs;
}

/**
 * 图标配置接口
 */
interface IconDefinition {
  /** 图标主体配置 */
  icon: {
    /** SVG 标签名 */
    tag: string;
    /** SVG 根元素属性 */
    attrs: IconAttrs;
    /** SVG 子元素列表 */
    children: IconChild[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 感叹号圆圈图标（轮廓风格）
 * 用于显示警告、提示或信息类消息
 */
declare const exclamationCircleOutlined: IconDefinition;

export default exclamationCircleOutlined;

/**
 * 模块导出的图标配置对象
 */
export const icon: {
  /** SVG 标签名 */
  tag: "svg";
  /** SVG 根元素属性 */
  attrs: {
    /** 定义 SVG 坐标系统，范围为 64-960 */
    viewBox: "64 64 896 896";
    /** 禁用键盘聚焦 */
    focusable: "false";
  };
  /** 子元素列表 */
  children: [
    {
      /** 路径标签，绘制外圆 */
      tag: "path";
      attrs: {
        /** 外圆路径数据：绘制一个居中的空心圆 */
        d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z";
      };
    },
    {
      /** 路径标签，绘制感叹号 */
      tag: "path";
      attrs: {
        /** 感叹号路径数据：包含上方的竖线和下方的圆点 */
        d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z";
      };
    }
  ];
};

/** 图标名称标识 */
export const name: "exclamation-circle";

/** 图标主题风格 */
export const theme: "outlined";