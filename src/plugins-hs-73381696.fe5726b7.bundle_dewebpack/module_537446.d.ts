/**
 * 户型平面图数据导出模块
 * 提供户型结构数据的提取和格式化功能
 */

/**
 * 二维点坐标（带高度）
 */
export type Point3D = [number, number, number];

/**
 * 曲线类型定义
 */
export interface CurveData {
  /** 曲线类型（Line2d/Arc2d等） */
  type: string;
  /** 起点坐标 */
  start: Point3D;
  /** 终点坐标 */
  end: Point3D;
  /** 圆心坐标（仅Arc2d） */
  center?: Point3D;
  /** 半径（仅Arc2d） */
  radius?: number;
  /** 是否逆时针（仅Arc2d） */
  isCCW?: boolean;
}

/**
 * 门窗类别配置
 */
export interface CategoryConfig {
  /** 类别ID */
  categoryId: string;
  /** 类别名称 */
  name: string;
}

/**
 * 柱子类别配置
 */
export interface ColumnCategoryConfig {
  /** 内容类型字符串 */
  contentType: string;
  /** 类别名称 */
  name: string;
}

/**
 * 立管/出水口类别配置
 */
export interface RiserCategoryConfig {
  /** 类别ID */
  categoryId: string;
  /** 类别名称 */
  name: string;
}

/**
 * 导出配置选项
 */
export interface ExportOptions {
  /** 门类别列表 */
  doorCategories?: CategoryConfig[];
  /** 窗类别列表 */
  windowCategories?: CategoryConfig[];
  /** 墙洞类别配置 */
  wallOpeningCategory?: CategoryConfig;
  /** 立管类别配置 */
  riserCategory?: RiserCategoryConfig;
  /** 出水口类别配置 */
  outletCategory?: RiserCategoryConfig;
  /** 方形柱子类别配置 */
  squareColumnCategory?: ColumnCategoryConfig;
  /** 圆形柱子类别配置 */
  roundColumnCategory?: ColumnCategoryConfig;
  /** 外部门seekId列表 */
  EXT_DOOR_SEEKIDS?: string[];
  /** 外部窗seekId列表 */
  EXT_WINDOW_SEEKIDS?: string[];
}

/**
 * 门数据结构
 */
export interface DoorData {
  /** 门ID */
  id: string;
  /** 门类型名称 */
  type: string;
  /** 门子类型ID */
  subType: string | null;
  /** 宽度 */
  width: number;
  /** 厚度 */
  thickness: number;
  /** 高度 */
  height: number;
  /** 是否为入户门 */
  is_entrance: boolean;
  /** 开启方向 */
  swing: unknown;
  /** 所属墙体ID */
  host: string | undefined;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
  /** X方向长度 */
  XLength: number;
  /** Y方向长度 */
  YLength: number;
  /** Z方向长度 */
  ZLength: number;
  /** X方向缩放 */
  XScale: number;
  /** Y方向缩放 */
  YScale: number;
  /** Z方向缩放 */
  ZScale: number;
  /** 轮廓坐标点列表 */
  coords: Point3D[];
}

/**
 * 窗数据结构
 */
export interface WindowData {
  /** 窗ID */
  id: string;
  /** 窗类型名称 */
  type: string;
  /** 所属墙体ID */
  host: string | undefined;
  /** 厚度 */
  thickness: number | undefined;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
  /** X方向长度 */
  XLength: number;
  /** Y方向长度 */
  YLength: number;
  /** Z方向长度 */
  ZLength: number;
  /** X方向缩放 */
  XScale: number;
  /** Y方向缩放 */
  YScale: number;
  /** Z方向缩放 */
  ZScale: number;
  /** 轮廓坐标点列表 */
  coords: Point3D[];
}

/**
 * 墙体数据结构
 */
export interface WallData {
  /** 墙体ID */
  id: string;
  /** 厚度 */
  thickness: number;
  /** 宽度 */
  width: number;
  /** 3D高度 */
  height: number;
  /** 墙体类型 */
  type: string;
  /** 起点坐标 */
  from: Point3D;
  /** 终点坐标 */
  to: Point3D;
  /** 墙体曲线数据 */
  curve: CurveData;
  /** 墙体截面坐标点列表 */
  coords: Point3D[];
  /** 是否为承重墙 */
  is_bearing: boolean;
}

/**
 * 立管/出水口数据结构
 */
export interface TubeData {
  /** 立管ID */
  id: string;
  /** 立管类型名称 */
  type: string;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
  /** X方向长度 */
  XLength: number;
  /** Y方向长度 */
  YLength: number;
  /** Z方向长度 */
  ZLength: number;
  /** X方向缩放 */
  XScale: number;
  /** Y方向缩放 */
  YScale: number;
  /** Z方向缩放 */
  ZScale: number;
  /** 轮廓坐标点列表 */
  coords: Point3D[];
}

/**
 * 柱子数据结构
 */
export interface PillarData {
  /** 柱子ID */
  id: string;
  /** 柱子类型名称 */
  type: string;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
  /** X方向长度 */
  XLength: number;
  /** Y方向长度 */
  YLength: number;
  /** Z方向长度 */
  ZLength: number;
  /** X方向缩放 */
  XScale: number;
  /** Y方向缩放 */
  YScale: number;
  /** Z方向缩放 */
  ZScale: number;
  /** 轮廓坐标点列表 */
  coords: Point3D[];
}

/**
 * 房间数据结构
 */
export interface RoomData {
  /** 房间ID */
  id: string;
  /** 房间类型 */
  type: string;
  /** 房间面积 */
  area: number;
  /** 房间轮廓坐标点列表 */
  coords: Point3D[];
  /** 墙体ID列表 */
  wall_list: string[];
  /** 门ID列表 */
  door_list: string[];
  /** 窗ID列表 */
  win_list: string[];
  /** 柱子ID列表 */
  pillar_list: string[];
  /** 立管ID列表 */
  tube_list: string[];
}

/**
 * 内容物数据结构
 */
export interface ContentData {
  /** 内容物seekId */
  seekId: string;
  /** 内容类型字符串 */
  contentType: string;
  /** 类别ID列表 */
  categories: string[];
  /** X方向长度 */
  XLength: number;
  /** Y方向长度 */
  YLength: number;
  /** Z方向长度 */
  ZLength: number;
  /** X方向缩放 */
  XScale: number;
  /** Y方向缩放 */
  YScale: number;
  /** Z方向缩放 */
  ZScale: number;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
  /** 内容物ID */
  id: string;
  /** 翻转状态 */
  flip: unknown;
  /** 所属房间ID */
  roomId: string | undefined;
}

/**
 * 户型平面图完整导出数据
 */
export interface FloorplanExportData {
  /** 门列表 */
  doors: DoorData[];
  /** 窗列表 */
  windows: WindowData[];
  /** 墙体列表 */
  walls: WallData[];
  /** 柱子列表 */
  pillars: PillarData[];
  /** 立管/出水口列表 */
  tubes: TubeData[];
  /** 房间列表 */
  rooms: RoomData[];
  /** 内容物列表 */
  contents: ContentData[];
  /** 内部空间边界坐标列表（墙体内轮廓） */
  inner_space_coords: Point3D[][];
}

/**
 * 元素绝对位置
 */
export interface ElementPosition {
  /** 距左边距离 */
  left: number;
  /** 距顶部距离 */
  top: number;
}

/**
 * 导出户型平面图的结构化数据
 * 
 * @param layer - 可选的楼层图层对象，未提供时自动从HSApp获取activeLayer
 * @param options - 导出配置选项，包含门窗类别、立管类别等配置
 * @returns 包含门、窗、墙体、柱子、房间等完整户型数据的对象
 * @throws 当无法获取目标楼层时抛出错误
 */
export function exportFloorplanModificationTarget(
  layer?: unknown,
  options?: ExportOptions
): FloorplanExportData;

/**
 * 获取DOM元素相对于文档的绝对位置
 * 
 * @param element - 目标DOM元素
 * @returns 包含left和top属性的位置对象
 */
export function getElementAbsolutePosition(element: HTMLElement): ElementPosition;