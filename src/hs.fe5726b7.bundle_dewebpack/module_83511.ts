export type ShadingMode = "shading" | "shadingWithEdges" | "edgesOnly" | "wireframe";

export interface ShadingModeLabels {
  shading: string;
  shadingWithEdges: string;
  edgesOnly: string;
  wireframe: string;
}

const SHADING_MODE_LABELS: ShadingModeLabels = {
  shading: "材质模式",
  shadingWithEdges: "线框+材质模式",
  edgesOnly: "线框模式",
  wireframe: "线框+透明模式"
};

export default SHADING_MODE_LABELS;