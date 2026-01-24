/**
 * 视图类型枚举
 * 定义系统支持的各种渲染视图类型
 */
export enum Ss {
  /** SVG 2D渲染 */
  SVG = "svg",
  /** WebGL 3D渲染 */
  WebGL3d = "webgl3d",
  /** NGM SVG渲染 */
  ngmSVG = "ngmsvg",
  /** NGM WebGL 3D渲染 */
  ngmWebGL3d = "ngmwebgl3d",
  /** 辅助3D视图 */
  Aux3d = "aux3d",
  /** 辅助2D视图 */
  Aux2d = "aux2d"
}

/**
 * 相机视角模式枚举
 * 定义不同的相机观察模式
 */
export enum Qs {
  /** 平面视图 */
  Plane = "plane",
  /** 顶视图 */
  RCP = "rcp",
  /** 立面视图 */
  Elevation = "elevation",
  /** 第一人称视角 */
  FirstPerson = "firstperson",
  /** 轨道环绕视图 */
  OrbitView = "orbitview"
}

/**
 * 视角模式中文名称映射
 * 将英文视角模式映射为中文显示名称
 */
export declare const cb: Readonly<{
  /** 平面 */
  plane: "平面";
  /** 顶图 */
  rcp: "顶图";
  /** 立面 */
  elevation: "立面";
  /** 漫游 */
  firstperson: "漫游";
  /** 3D视图 */
  orbitview: "3D";
}>;