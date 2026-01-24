/**
 * 墙体SVG属性配置模块
 * 定义了墙体绘制、端点、标注、辅助线等各种视觉状态的样式属性
 */

/**
 * 墙体填充颜色配置
 */
interface WallFillColors {
  /** 普通墙体颜色 */
  normal: string;
  /** 承重墙颜色 */
  bearing: string;
  /** 未闭合墙体颜色 */
  unclosed: string;
  /** 低墙颜色 */
  low: string;
}

/**
 * 激活状态填充颜色配置
 */
interface ActiveFillColors {
  /** 操作中颜色 */
  operate: string;
  /** 悬停颜色 */
  hover: string;
  /** 选中颜色 */
  selected: string;
}

/**
 * 墙体SVG完整属性配置
 */
export interface WallSvgAttr {
  /** 填充颜色配置 */
  fill: {
    /** 普通状态颜色 */
    normal: WallFillColors;
    /** 激活状态颜色 */
    active: ActiveFillColors;
  };
  /** 填充透明度 */
  fillOpacity: {
    /** 普通状态透明度 */
    normal: string;
    /** 激活状态透明度 */
    active: string;
  };
  /** 描边颜色 */
  stroke: {
    /** 普通状态描边颜色 */
    normal: string;
    /** 激活状态描边颜色 */
    active: string;
  };
  /** 描边宽度 */
  strokeWidth: string;
}

/**
 * 图层样式配置
 */
interface LayerStyleConfig {
  /** 填充颜色 */
  fill: {
    /** 普通状态 */
    normal: string;
    /** 激活状态 */
    active: string;
    /** 非激活状态 */
    deActive: string;
  };
  /** 填充透明度 */
  fillOpacity: {
    normal: string;
    active: string;
  };
  /** 描边颜色 */
  stroke: {
    normal: string;
    active: string;
  };
  /** 描边宽度 */
  strokeWidth: string;
}

/**
 * AL墙体属性配置（多图层支持）
 */
export interface ALWallAttr {
  /** 目标图层样式 */
  targetLayer: LayerStyleConfig;
  /** 激活图层样式 */
  acitveLayer: Record<string, unknown>;
}

/**
 * SVG基础样式属性
 */
interface BaseSvgStyle {
  /** 描边颜色 */
  stroke: string;
  /** 描边宽度 */
  'stroke-width': string;
  /** 填充颜色 */
  fill: string;
  /** 填充透明度 */
  'fill-opacity': string;
  /** 矢量效果（保持描边不缩放） */
  'vector-effect': string;
}

/**
 * 普通墙体SVG属性
 */
export type NormalWallAttr = BaseSvgStyle;

/**
 * 贴合墙体SVG属性（吸附状态）
 */
export type FitWallAttr = BaseSvgStyle;

/**
 * 激活切割线属性
 */
export interface ActiveCutLineAttr {
  stroke: string;
  'stroke-width': string;
  'fill-opacity': string;
}

/**
 * 尺寸标注基础属性
 */
interface BaseDimensionAttr {
  stroke: string;
  'stroke-width': string;
  'vector-effect': string;
}

/**
 * 尺寸标注属性（正常状态）
 */
export type DimensionAttr = BaseDimensionAttr;

/**
 * 无效尺寸标注属性
 */
export type InvalidDimensionAttr = BaseDimensionAttr;

/**
 * 尺寸标注阴影属性
 */
export type DimensionShadowAttr = BaseDimensionAttr;

/**
 * 辅助线属性
 */
export interface AuxiAttr {
  stroke: string;
  'stroke-width': string;
  'vector-effect': string;
  /** 禁用鼠标事件 */
  'pointer-events': string;
}

/**
 * 虚线属性
 */
export interface DashAttr {
  /** 虚线样式 */
  'stroke-dasharray': string;
  stroke: string;
  'vector-effect': string;
}

/**
 * 辅助线属性（带虚线）
 */
export type AuxiliaryLineAttr = DashAttr;

/**
 * 激活状态辅助线属性
 */
export type ActiveAuxiliaryLineAttr = DashAttr;

/**
 * 吸附线属性
 */
export interface SnapAttr {
  stroke: string;
  'stroke-width': string;
  'vector-effect': string;
  'pointer-events': string;
}

/**
 * 端点基础属性
 */
interface BaseEndPointAttr {
  'stroke-width': string;
  'vector-effect': string;
  fill: string;
  stroke?: string;
}

/**
 * 激活端点属性
 */
export type ActiveEndPointAttr = BaseEndPointAttr;

/**
 * 静态端点属性
 */
export type StaticEndPointAttr = BaseEndPointAttr;

/**
 * 吸附端点属性
 */
export type SnapEndPointAttr = BaseEndPointAttr;

/**
 * 错误端点属性
 */
export type ErrorEndPointAttr = BaseEndPointAttr;

/**
 * 辅助端点属性
 */
export type AuxiEndPointAttr = Required<BaseEndPointAttr>;

/**
 * 文本样式属性
 */
export interface TextAttr {
  /** 文本颜色 */
  fill: string;
  /** 文本锚点 */
  'text-anchor': string;
  /** 基线对齐方式 */
  'alignment-baseline': string;
  /** 描边（无） */
  stroke: string;
  /** 字体大小 */
  'font-size': number;
}

/**
 * 无效文本属性
 */
export type InvalidTextAttr = TextAttr;

/** 墙体SVG属性常量 */
export declare const WallSvgAttr: WallSvgAttr;

/** AL墙体属性常量 */
export declare const ALWallAttr: ALWallAttr;

/** 普通墙体属性常量 */
export declare const NormalWallAttr: NormalWallAttr;

/** 贴合墙体属性常量 */
export declare const FitWallAttr: FitWallAttr;

/** 激活切割线属性常量 */
export declare const ActiveCutLineAttr: ActiveCutLineAttr;

/** 尺寸标注属性常量 */
export declare const DimensionAttr: DimensionAttr;

/** 无效尺寸标注属性常量 */
export declare const InvalidDimensionAttr: InvalidDimensionAttr;

/** 尺寸标注阴影属性常量 */
export declare const DimensionShadowAttr: DimensionShadowAttr;

/** 辅助线属性常量 */
export declare const AuxiAttr: AuxiAttr;

/** 虚线属性常量 */
export declare const DashAttr: DashAttr;

/** 辅助线属性常量（带虚线） */
export declare const AuxiliaryLineAttr: AuxiliaryLineAttr;

/** 激活辅助线属性常量 */
export declare const ActiveAuxiliaryLineAttr: ActiveAuxiliaryLineAttr;

/** 吸附线属性常量 */
export declare const SnapAttr: SnapAttr;

/** 激活端点属性常量 */
export declare const ActiveEndPointAttr: ActiveEndPointAttr;

/** 静态端点属性常量 */
export declare const StaticEndPointAttr: StaticEndPointAttr;

/** 吸附端点属性常量 */
export declare const SnapEndPointAttr: SnapEndPointAttr;

/** 错误端点属性常量 */
export declare const ErrorEndPointAttr: ErrorEndPointAttr;

/** 辅助端点属性常量 */
export declare const AuxiEndPointAttr: AuxiEndPointAttr;

/** 文本属性常量 */
export declare const TextAttr: TextAttr;

/** 无效文本属性常量 */
export declare const InvalidTextAttr: InvalidTextAttr;