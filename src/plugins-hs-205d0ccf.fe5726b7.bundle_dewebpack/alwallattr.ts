export interface ColorConfig {
  normal: string;
  bearing: string;
  unclosed: string;
  low: string;
}

export interface ActiveColorConfig {
  operate: string;
  hover: string;
  selected: string;
}

export interface FillConfig {
  normal: ColorConfig;
  active: ActiveColorConfig;
}

export interface WallSvgAttrType {
  fill: FillConfig;
  fillOpacity: {
    normal: string;
    active: string;
  };
  stroke: {
    normal: string;
    active: string;
  };
  strokeWidth: string;
}

export const WallSvgAttr: WallSvgAttrType = {
  fill: {
    normal: {
      normal: "#bebfc3",
      bearing: "#1c1c1c",
      unclosed: "#fce29b",
      low: "#ffffff"
    },
    active: {
      operate: "#135eff",
      hover: "#c0d1ff",
      selected: "#5f91ff"
    }
  },
  fillOpacity: {
    normal: "100%",
    active: "60%"
  },
  stroke: {
    normal: "#1c1c1c",
    active: "#396efe"
  },
  strokeWidth: "1.3px"
};

export interface LayerAttrType {
  fill: {
    normal: string;
    active: string;
    deActive: string;
  };
  fillOpacity: {
    normal: string;
    active: string;
  };
  stroke: {
    normal: string;
    active: string;
  };
  strokeWidth: string;
}

export interface ALWallAttrType {
  targetLayer: LayerAttrType;
  acitveLayer: Record<string, never>;
}

export const ALWallAttr: ALWallAttrType = {
  targetLayer: {
    fill: {
      normal: "#bebfc3",
      active: "#a9c4ff",
      deActive: "#E6e8ef"
    },
    fillOpacity: {
      normal: "100%",
      active: "60%"
    },
    stroke: {
      normal: "#1c1c1c",
      active: "#396efe"
    },
    strokeWidth: "1.3px"
  },
  acitveLayer: {}
};

export interface SVGAttributeConfig {
  stroke: string;
  "stroke-width": string;
  fill: string;
  "fill-opacity": string;
  "vector-effect": string;
}

export const NormalWallAttr: SVGAttributeConfig = {
  stroke: "#396EFE",
  "stroke-width": "1.3px",
  fill: "#135EFF",
  "fill-opacity": "60%",
  "vector-effect": "non-scaling-stroke"
};

export const FitWallAttr: SVGAttributeConfig = {
  stroke: "#3DFFC5",
  "stroke-width": "2px",
  fill: "#3DFFC5",
  "fill-opacity": "50%",
  "vector-effect": "non-scaling-stroke"
};

export interface CutLineAttrType {
  stroke: string;
  "stroke-width": string;
  "fill-opacity": string;
}

export const ActiveCutLineAttr: CutLineAttrType = {
  stroke: "#1c1c1c ",
  "stroke-width": "1px ",
  "fill-opacity": "50%"
};

export interface DimensionAttrType {
  stroke: string;
  "stroke-width": string;
  "vector-effect": string;
}

export const DimensionAttr: DimensionAttrType = {
  stroke: "#444444",
  "stroke-width": "1px ",
  "vector-effect": "non-scaling-stroke"
};

export const InvalidDimensionAttr: DimensionAttrType = {
  stroke: "#CDCFD5",
  "stroke-width": "1px ",
  "vector-effect": "non-scaling-stroke"
};

export const DimensionShadowAttr: DimensionAttrType = {
  stroke: "#ffffff",
  "stroke-width": "1.6px ",
  "vector-effect": "non-scaling-stroke"
};

export interface AuxiAttrType {
  stroke: string;
  "stroke-width": string;
  "vector-effect": string;
  "pointer-events": string;
}

export const AuxiAttr: AuxiAttrType = {
  stroke: "#1c1c1c",
  "stroke-width": "1.3px",
  "vector-effect": "non-scaling-stroke",
  "pointer-events": "none"
};

export interface DashAttrType {
  "stroke-dasharray": string;
  stroke: string;
  "vector-effect": string;
}

export const DashAttr: DashAttrType = {
  "stroke-dasharray": "- ",
  stroke: "#A8A8A8",
  "vector-effect": "non-scaling-stroke"
};

export const AuxiliaryLineAttr: DashAttrType = {
  "stroke-dasharray": "- ",
  stroke: "#666666",
  "vector-effect": "non-scaling-stroke"
};

export const ActiveAuxiliaryLineAttr: DashAttrType = {
  "stroke-dasharray": "- ",
  stroke: "#396EFE",
  "vector-effect": "non-scaling-stroke"
};

export interface SnapAttrType {
  stroke: string;
  "stroke-width": string;
  "vector-effect": string;
  "pointer-events": string;
}

export const SnapAttr: SnapAttrType = {
  stroke: "#3dfcc3",
  "stroke-width": "1.3px",
  "vector-effect": "non-scaling-stroke",
  "pointer-events": "none"
};

interface BaseEndPointAttrType {
  "stroke-width": string;
  "vector-effect": string;
  fill: string;
}

interface EndPointAttrWithStroke extends BaseEndPointAttrType {
  stroke: string;
}

const baseEndPointAttr: Omit<BaseEndPointAttrType, "fill"> = {
  "stroke-width": "1px",
  "vector-effect": "non-scaling-stroke"
};

export const ActiveEndPointAttr: BaseEndPointAttrType = {
  ...baseEndPointAttr,
  fill: "#396efe"
};

export const StaticEndPointAttr: BaseEndPointAttrType = {
  ...baseEndPointAttr,
  fill: "#ffffff"
};

export const SnapEndPointAttr: BaseEndPointAttrType = {
  ...baseEndPointAttr,
  fill: "#3dfcc3"
};

export const ErrorEndPointAttr: BaseEndPointAttrType = {
  ...baseEndPointAttr,
  fill: "#eb5e46"
};

export const AuxiEndPointAttr: EndPointAttrWithStroke = {
  ...baseEndPointAttr,
  fill: "#1c1c1c",
  stroke: "#ffffff"
};

export interface TextAttrType {
  fill: string;
  "text-anchor": string;
  "alignment-baseline": string;
  stroke: string;
  "font-size": number;
}

export const TextAttr: TextAttrType = {
  fill: "#33353b",
  "text-anchor": "middle",
  "alignment-baseline": "middle",
  stroke: "none",
  "font-size": 12
};

export const InvalidTextAttr: TextAttrType = {
  fill: "#CDCFD5",
  "text-anchor": "middle",
  "alignment-baseline": "middle",
  stroke: "none",
  "font-size": 12
};