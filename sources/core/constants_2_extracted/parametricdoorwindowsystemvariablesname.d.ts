/**
 * 参数化门窗系统变量名称枚举
 */
 * 定义了门窗系统中各类参数的变量名称常量，用于标识不同类型的门窗及其属性。
 * 包括单扇门、普通窗、飘窗、落地窗、转角窗、弧形窗等多种门窗类型的尺寸、材质等参数。
 */
 * @module ParametricDoorWindowSystemVariablesName
 */
export declare enum ParametricDoorWindowSystemVariablesName {
  /**
   * 单扇门宽度
   * @description Width of single door
   */
  SingleDoorWidth = "W",

  /**
   * 单扇门深度
   * @description Depth of single door
   */
  SingleDoorDepth = "D",

  /**
   * 单扇门高度
   * @description Height of single door
   */
  SingleDoorHeight = "H",

  /**
   * 单扇门材质
   * @description Material of single door
   */
  SingleDoorMaterial = "CZ",

  /**
   * 单扇门左右开门方向
   * @description Left/Right opening direction of single door
   */
  SingleDoorLeftRightDoorOpenDirection = "ZYKM",

  /**
   * 单扇门内外开门方向
   * @description Inside/Outside opening direction of single door
   */
  SingleDoorInsideOutsideDoorOpenDirection = "NWKM",

  /**
   * 单扇门离地高度
   * @description Ground clearance of single door
   */
  SingleDoorGroundClearance = "LD",

  /**
   * 普通窗宽度
   * @description Width of ordinary window
   */
  OrdinaryWindowWidth = "W",

  /**
   * 普通窗深度
   * @description Depth of ordinary window
   */
  OrdinaryWindowDepth = "D",

  /**
   * 缩进深度
   * @description Indent depth
   */
  Indent = "d",

  /**
   * 普通窗高度
   * @description Height of ordinary window
   */
  OrdinaryWindowHeight = "H",

  /**
   * 普通窗材质
   * @description Material of ordinary window
   */
  OrdinaryWindowMaterial = "CZ",

  /**
   * 普通窗离地高度
   * @description Ground clearance of ordinary window
   */
  OrdinaryWindowGroundClearance = "LD",

  /**
   * 飘窗宽度
   * @description Width of bay window
   */
  BayWindowWidth = "W",

  /**
   * 飘窗深度
   * @description Depth of bay window
   */
  BayWindowDepth = "D",

  /**
   * 飘窗高度
   * @description Height of bay window
   */
  BayWindowHeight = "H",

  /**
   * 飘窗材质
   * @description Material of bay window
   */
  BayWindowMaterial = "CZ",

  /**
   * 飘窗离地高度
   * @description Ground clearance of bay window
   */
  BayWindowGroundClearance = "LD",

  /**
   * 落地窗宽度
   * @description Width of floor-based window
   */
  FloorBasedWindowWidth = "W",

  /**
   * 落地窗深度
   * @description Depth of floor-based window
   */
  FloorBasedWindowDepth = "D",

  /**
   * 落地窗高度
   * @description Height of floor-based window
   */
  FloorBasedWindowHeight = "H",

  /**
   * 落地窗材质
   * @description Material of floor-based window
   */
  FloorBasedWindowMaterial = "CZ",

  /**
   * 落地窗离地高度
   * @description Ground clearance of floor-based window
   */
  FloorBasedWindowGroundClearance = "LD",

  /**
   * 转角窗左侧宽度
   * @description Left width of corner window
   */
  CornerWindowLeftWidth = "W1",

  /**
   * 转角窗右侧宽度
   * @description Right width of corner window
   */
  CornerWindowRightWidth = "W2",

  /**
   * 转角窗左侧深度
   * @description Left depth of corner window
   */
  CornerWindowLeftDepth = "D1",

  /**
   * 转角窗右侧深度
   * @description Right depth of corner window
   */
  CornerWindowRightDepth = "D2",

  /**
   * 转角窗高度
   * @description Height of corner window
   */
  CornerWindowHeight = "H",

  /**
   * 转角窗材质
   * @description Material of corner window
   */
  CornerWindowMaterial = "CZ",

  /**
   * 转角窗离地高度
   * @description Ground clearance of corner window
   */
  CornerWindowGroundClearance = "LD",

  /**
   * 转角飘窗左侧宽度
   * @description Left width of corner bay window
   */
  CornerBayWindowLeftWidth = "W1",

  /**
   * 转角飘窗右侧宽度
   * @description Right width of corner bay window
   */
  CornerBayWindowRightWidth = "W2",

  /**
   * 转角飘窗左侧深度
   * @description Left depth of corner bay window
   */
  CornerBayWindowLeftDepth = "D1",

  /**
   * 转角飘窗右侧深度
   * @description Right depth of corner bay window
   */
  CornerBayWindowRightDepth = "D2",

  /**
   * 转角飘窗高度
   * @description Height of corner bay window
   */
  CornerBayWindowHeight = "H",

  /**
   * 转角飘窗材质
   * @description Material of corner bay window
   */
  CornerBayWindowMaterial = "CZ",

  /**
   * 转角飘窗离地高度
   * @description Ground clearance of corner bay window
   */
  CornerBayWindowGroundClearance = "LD",

  /**
   * 内飘窗宽度
   * @description Width of inner bay window
   */
  InnerBayWindowWidth = "W",

  /**
   * 内飘窗深度
   * @description Depth of inner bay window
   */
  InnerBayWindowDepth = "D",

  /**
   * 内飘窗高度
   * @description Height of inner bay window
   */
  InnerBayWindowHeight = "H",

  /**
   * 内飘窗材质
   * @description Material of inner bay window
   */
  InnerBayWindowMaterial = "CZ",

  /**
   * 内飘窗离地高度
   * @description Ground clearance of inner bay window
   */
  InnerBayWindowGroundClearance = "LD",

  /**
   * 异形内飘窗宽度
   * @description Width of special-shaped inner bay window
   */
  SpecialShapedInnerBayWindowWidth = "W",

  /**
   * 异形内飘窗左侧深度
   * @description Left depth of special-shaped inner bay window
   */
  SpecialShapedInnerBayWindowLeftDepth = "D1",

  /**
   * 异形内飘窗右侧深度
   * @description Right depth of special-shaped inner bay window
   */
  SpecialShapedInnerBayWindowRightDepth = "D2",

  /**
   * 异形内飘窗高度
   * @description Height of special-shaped inner bay window
   */
  SpecialShapedInnerBayWindowHeight = "H",

  /**
   * 异形内飘窗材质
   * @description Material of special-shaped inner bay window
   */
  SpecialShapedInnerBayWindowMaterial = "CZ",

  /**
   * 异形内飘窗离地高度
   * @description Ground clearance of special-shaped inner bay window
   */
  SpecialShapedInnerBayWindowGroundClearance = "LD",

  /**
   * 弧形飘窗宽度
   * @description Width of curved bay window
   */
  CurvedBayWindowWidth = "W",

  /**
   * 弧形飘窗深度
   * @description Depth of curved bay window
   */
  CurvedBayWindowDepth = "D",

  /**
   * 弧形飘窗高度
   * @description Height of curved bay window
   */
  CurvedBayWindowHeight = "H",

  /**
   * 弧形飘窗材质
   * @description Material of curved bay window
   */
  CurvedBayWindowMaterial = "CZ",

  /**
   * 弧形飘窗离地高度
   * @description Ground clearance of curved bay window
   */
  CurvedBayWindowGroundClearance = "LD",

  /**
   * 弧形飘窗弦高
   * @description Chord height of curved bay window
   */
  CurvedBayWindowChordHeight = "XH",

  /**
   * 门窗宽度
   * @description Width of door window
   */
  DoorWindowWidth = "W",

  /**
   * 门窗深度
   * @description Depth of door window
   */
  DoorWindowDepth = "D",

  /**
   * 门窗高度
   * @description Height of door window
   */
  DoorWindowHeight = "H",

  /**
   * 门窗材质
   * @description Material of door window
   */
  DoorWindowMaterial = "CZ",

  /**
   * 门窗离地高度
   * @description Ground clearance of door window
   */
  DoorWindowGroundClearance = "LD",

  /**
   * 门窗左右开门方向
   * @description Left/Right opening direction of door window
   */
  DoorWindowLeftRightDoorOpenDirection = "ZYKM",

  /**
   * 异形窗宽度
   * @description Width of special-shaped window
   */
  SpecialShapedWindowWidth = "W",

  /**
   * 异形窗深度
   * @description Depth of special-shaped window
   */
  SpecialShapedWindowDepth = "D",

  /**
   * 异形窗高度
   * @description Height of special-shaped window
   */
  SpecialShapedWindowHeight = "H",

  /**
   * 异形窗材质
   * @description Material of special-shaped window
   */
  SpecialShapedWindowMaterial = "CZ",

  /**
   * 异形窗离地高度
   * @description Ground clearance of special-shaped window
   */
  SpecialShapedWindowGroundClearance = "LD",

  /**
   * 弧形窗扇宽度
   * @description Width of curved window sash
   */
  CurvedWindowSashWidth = "W",

  /**
   * 弧形窗扇深度
   * @description Depth of curved window sash
   */
  CurvedWindowSashDepth = "D",

  /**
   * 弧形窗扇高度
   * @description Height of curved window sash
   */
  CurvedWindowSashHeight = "H",

  /**
   * 弧形窗扇材质
   * @description Material of curved window sash
   */
  CurvedWindowSashMaterial = "CZ",

  /**
   * 弧形窗扇弦高
   * @description Chord height of curved window sash
   */
  CurvedWindowSashChordHeight = "XH",

  /**
   * 直窗扇宽度
   * @description Width of straight window sash
   */
  StraightWindowSashWidth = "W",

  /**
   * 直窗扇深度
   * @description Depth of straight window sash
   */
  StraightWindowSashDepth = "D",

  /**
   * 直窗扇高度
   * @description Height of straight window sash
   */
  StraightWindowSashHeight = "H",

  /**
   * 直窗扇材质
   * @description Material of straight window sash
   */
  StraightWindowSashMaterial = "CZ",

  /**
   * L形窗扇左侧宽度
   * @description Left width of L-shaped window sash
   */
  LShapedWindowSashLeftWidth = "W1",

  /**
   * L形窗扇右侧宽度
   * @description Right width of L-shaped window sash
   */
  LShapedWindowSashRightWidth = "W2",

  /**
   * L形窗扇左侧深度
   * @description Left depth of L-shaped window sash
   */
  LShapedWindowSashLeftDepth = "D1",

  /**
   * L形窗扇右侧深度
   * @description Right depth of L-shaped window sash
   */
  LShapedWindowSashRightDepth = "D2",

  /**
   * L形窗扇高度
   * @description Height of L-shaped window sash
   */
  LShapedWindowSashHeight = "H",

  /**
   * L形窗扇材质
   * @description Material of L-shaped window sash
   */
  LShapedWindowSashMaterial = "CZ",

  /**
   * L形窗扇角度
   * @description Angle of L-shaped window sash
   */
  LShapedWindowSashAngle = "A1",

  /**
   * U形窗扇宽度
   * @description Width of U-shaped window sash
   */
  UShapedWindowSashWidth = "W",

  /**
   * U形窗扇左侧宽度
   * @description Left width of U-shaped window sash
   */
  UShapedWindowSashLeftWidth = "W1",

  /**
   * U形窗扇右侧宽度
   * @description Right width of U-shaped window sash
   */
  UShapedWindowSashRightWidth = "W2",

  /**
   * U形窗扇深度
   * @description Depth of U-shaped window sash
   */
  UShapedWindowSashDepth = "D",

  /**
   * U形窗扇左侧深度
   * @description Left depth of U-shaped window sash
   */
  UShapedWindowSashLeftDepth = "D1",

  /**
   * U形窗扇右侧深度
   * @description Right depth of U-shaped window sash
   */
  UShapedWindowSashRightDepth = "D2",

  /**
   * U形窗扇高度
   * @description Height of U-shaped window sash
   */
  UShapedWindowSashHeight = "H",

  /**
   * U形窗扇材质
   * @description Material of U-shaped window sash
   */
  UShapedWindowSashMaterial = "CZ",

  /**
   * U形窗扇左侧角度
   * @description Left angle of U-shaped window sash
   */
  UShapedWindowSashLeftAngle = "A1",

  /**
   * U形窗扇右侧角度
   * @description Right angle of U-shaped window sash
   */
  UShapedWindowSashRightAngle = "A2",

  /**
   * 多边形窗扇左侧宽度
   * @description Left width of polygonal window sash
   */
  PolygonalWindowSashLeftWidth = "W1",

  /**
   * 多边形窗扇右侧宽度
   * @description Right width of polygonal window sash
   */
  PolygonalWindowSashRightWidth = "W2",

  /**
   * 多边形窗扇宽度1
   * @description Width 1 of polygonal window sash
   */
  PolygonalWindowSashWidth1 = "W3",

  /**
   * 多边形窗扇宽度2
   * @description Width 2 of polygonal window sash
   */
  PolygonalWindowSashWidth2 = "W4",

  /**
   * 多边形窗扇左侧深度
   * @description Left depth of polygonal window sash
   */
  PolygonalWindowSashLeftDepth = "D1",

  /**
   * 多边形窗扇右侧深度
   * @description Right depth of polygonal window sash
   */
  PolygonalWindowSashRightDepth = "D2",

  /**
   * 多边形窗扇深度1
   * @description Depth 1 of polygonal window sash
   */
  PolygonalWindowSashDepth1 = "D3",

  /**
   * 多边形窗扇深度2
   * @description Depth 2 of polygonal window sash
   */
  PolygonalWindowSashDepth2 = "D4",

  /**
   * 多边形窗扇高度
   * @description Height of polygonal window sash
   */
  PolygonalWindowSashHeight = "H",

  /**
   * 多边形窗扇材质
   * @description Material of polygonal window sash
   */
  PolygonalWindowSashMaterial = "CZ",

  /**
   * 多边形窗扇左侧角度
   * @description Left angle of polygonal window sash
   */
  PolygonalWindowSashLeftAngle = "A1",

  /**
   * 多边形窗扇右侧角度
   * @description Right angle of polygonal window sash
   */
  PolygonalWindowSashRightAngle = "A2",

  /**
   * 多边形窗扇角度
   * @description Angle of polygonal window sash
   */
  PolygonalWindowSashAngle = "A3"
}