export enum ViewportType {
  SVG = "svg",
  WebGL3d = "webgl3d",
  ngmSVG = "ngmsvg",
  ngmWebGL3d = "ngmwebgl3d",
  Aux3d = "aux3d",
  Aux2d = "aux2d"
}

export enum ViewMode {
  Plane = "plane",
  RCP = "rcp",
  Elevation = "elevation",
  FirstPerson = "firstperson",
  OrbitView = "orbitview"
}

export const ViewModeLabels: Record<string, string> = {
  plane: "平面",
  rcp: "顶图",
  elevation: "立面",
  firstperson: "漫游",
  orbitview: "3D"
};

export const Ss = ViewportType;
export const Qs = ViewMode;
export const cb = ViewModeLabels;