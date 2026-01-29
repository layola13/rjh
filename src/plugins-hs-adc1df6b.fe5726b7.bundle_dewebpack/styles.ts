export interface StyleProperties {
  fill?: string;
  stroke?: string;
  "stroke-width"?: number;
  "stroke-dasharray"?: string;
  "vector-effect"?: string;
  "pointer-events"?: string;
}

export interface StylesConfig {
  intersectIndicatorStyle: StyleProperties;
  previewPathStyle: StyleProperties;
  invalidPreviewPathStyle: StyleProperties;
}

export const Styles: StylesConfig = {
  intersectIndicatorStyle: {
    fill: "#eb5d46",
    stroke: "black",
    "stroke-width": 1,
    "vector-effect": "non-scaling-stroke",
    "pointer-events": "none"
  },
  previewPathStyle: {
    "stroke-dasharray": "none",
    "stroke-width": 1,
    stroke: "#1C1C1C",
    fill: "#EDF1E8",
    "vector-effect": "non-scaling-stroke",
    "pointer-events": "none"
  },
  invalidPreviewPathStyle: {
    "stroke-dasharray": "none",
    "stroke-width": 1,
    stroke: "#eb5d46",
    fill: "#EDF1E8",
    "vector-effect": "non-scaling-stroke",
    "pointer-events": "none"
  }
};