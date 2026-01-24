/**
 * 多边形类型枚举
 * 定义了各种几何形状和装饰性多边形类型
 * @module PolyType
 */
export enum PolyType {
  /** 多边形 */
  polygon = "polygon",
  
  /** 圆形 */
  circle = "circle",
  
  /** 菱形 */
  diamond = "diamond",
  
  /** 倾斜五边形 */
  angledPentagon = "angledPentagon",
  
  /** 倾斜六边形 */
  angledHexagon = "angledHexagon",
  
  /** 倾斜六边形（变体2） */
  angledHexagon2 = "angledHexagon2",
  
  /** 圆角矩形多边形 */
  roundedRectanglePolygon = "roundedRectanglePolygon",
  
  /** 梯形 */
  trapezoid = "trapezoid",
  
  /** 空心尺寸 */
  hollowSize = "hollowSize",
  
  /** 空心 */
  hollow = "hollow",
  
  /** 空心（变体2） */
  hollow2 = "hollow2",
  
  /** 凸面 */
  convex = "convex",
  
  /** 哥特式 */
  gothic = "gothic",
  
  /** 等腰三角形 */
  isoscelesTriangle = "isoscelesTriangle",
  
  /** 四分之一圆 */
  quarterCircle = "quarterCircle",
  
  /** 半圆 */
  halfCircle = "halfCircle",
  
  /** 四叶形 */
  quatrefoil = "quatrefoil",
  
  /** 规则形状 */
  regular = "regular",
  
  /** 弹簧线 */
  springline = "springline",
  
  /** 三维弧形 */
  threeDimensionalArc = "threeDimensionalArc",
  
  /** 平行四边形 */
  parallelogram = "parallelogram",
  
  /** 耳朵形 */
  ear = "ear",
  
  /** 耳朵形（变体2） */
  ear2 = "ear2",
  
  /** 尖耳形 */
  pointedEar = "pointedEar",
  
  /** 单轨形 */
  singleTrack = "singleTrack",
  
  /** 双耳形 */
  doubleEars = "doubleEars",
  
  /** 波浪形 */
  wave = "wave",
  
  /** 洋葱形 */
  onion = "onion",
  
  /** 清真寺形 */
  mosque = "mosque",
  
  /** 半KFC形 */
  halfKfc = "halfKfc",
  
  /** KFC形 */
  kfc = "kfc",
  
  /** KFC形（变体2） */
  kfc2 = "kfc2",
  
  /** KFC形（变体3） */
  kfc3 = "kfc3",
  
  /** KFC形（变体4） */
  kfc4 = "kfc4",
  
  /** 半KFC形（变体2） */
  halfKfc2 = "halfKfc2",
  
  /** 门形 */
  door = "door",
  
  /** 尖顶五边形 */
  peakPentagon = "peakPentagon"
}