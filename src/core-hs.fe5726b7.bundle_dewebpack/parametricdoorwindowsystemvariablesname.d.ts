/**
 * Parametric door and window system variable names enumeration.
 * This module defines standard variable name constants used in parametric door and window systems.
 * Each constant represents a specific dimension, material, or configuration parameter.
 * 
 * @module ParametricDoorWindowSystemVariablesName
 * @remarks
 * Variable naming conventions:
 * - W/W1/W2/W3/W4: Width dimensions
 * - D/D1/D2/D3/D4: Depth dimensions
 * - H: Height dimension
 * - CZ: Material (材质)
 * - LD: Ground clearance (离地)
 * - ZYKM: Left/Right door open direction (左右开门)
 * - NWKM: Inside/Outside door open direction (内外开门)
 * - XH: Chord height (弦高)
 * - A1/A2/A3: Angle parameters
 * - d: Indent
 */
export declare enum ParametricDoorWindowSystemVariablesName {
  // ==================== Single Door Parameters ====================
  
  /** Single door width dimension */
  SingleDoorWidth = "W",
  
  /** Single door depth dimension */
  SingleDoorDepth = "D",
  
  /** Single door height dimension */
  SingleDoorHeight = "H",
  
  /** Single door material type */
  SingleDoorMaterial = "CZ",
  
  /** Single door left/right opening direction */
  SingleDoorLeftRightDoorOpenDirection = "ZYKM",
  
  /** Single door inside/outside opening direction */
  SingleDoorInsideOutsideDoorOpenDirection = "NWKM",
  
  /** Single door ground clearance height */
  SingleDoorGroundClearance = "LD",

  // ==================== Ordinary Window Parameters ====================
  
  /** Ordinary window width dimension */
  OrdinaryWindowWidth = "W",
  
  /** Ordinary window depth dimension */
  OrdinaryWindowDepth = "D",
  
  /** Window indent dimension */
  Indent = "d",
  
  /** Ordinary window height dimension */
  OrdinaryWindowHeight = "H",
  
  /** Ordinary window material type */
  OrdinaryWindowMaterial = "CZ",
  
  /** Ordinary window ground clearance height */
  OrdinaryWindowGroundClearance = "LD",

  // ==================== Bay Window Parameters ====================
  
  /** Bay window width dimension */
  BayWindowWidth = "W",
  
  /** Bay window depth dimension */
  BayWindowDepth = "D",
  
  /** Bay window height dimension */
  BayWindowHeight = "H",
  
  /** Bay window material type */
  BayWindowMaterial = "CZ",
  
  /** Bay window ground clearance height */
  BayWindowGroundClearance = "LD",

  // ==================== Floor-Based Window Parameters ====================
  
  /** Floor-based window width dimension */
  FloorBasedWindowWidth = "W",
  
  /** Floor-based window depth dimension */
  FloorBasedWindowDepth = "D",
  
  /** Floor-based window height dimension */
  FloorBasedWindowHeight = "H",
  
  /** Floor-based window material type */
  FloorBasedWindowMaterial = "CZ",
  
  /** Floor-based window ground clearance height */
  FloorBasedWindowGroundClearance = "LD",

  // ==================== Corner Window Parameters ====================
  
  /** Corner window left side width dimension */
  CornerWindowLeftWidth = "W1",
  
  /** Corner window right side width dimension */
  CornerWindowRightWidth = "W2",
  
  /** Corner window left side depth dimension */
  CornerWindowLeftDepth = "D1",
  
  /** Corner window right side depth dimension */
  CornerWindowRightDepth = "D2",
  
  /** Corner window height dimension */
  CornerWindowHeight = "H",
  
  /** Corner window material type */
  CornerWindowMaterial = "CZ",
  
  /** Corner window ground clearance height */
  CornerWindowGroundClearance = "LD",

  // ==================== Corner Bay Window Parameters ====================
  
  /** Corner bay window left side width dimension */
  CornerBayWindowLeftWidth = "W1",
  
  /** Corner bay window right side width dimension */
  CornerBayWindowRightWidth = "W2",
  
  /** Corner bay window left side depth dimension */
  CornerBayWindowLeftDepth = "D1",
  
  /** Corner bay window right side depth dimension */
  CornerBayWindowRightDepth = "D2",
  
  /** Corner bay window height dimension */
  CornerBayWindowHeight = "H",
  
  /** Corner bay window material type */
  CornerBayWindowMaterial = "CZ",
  
  /** Corner bay window ground clearance height */
  CornerBayWindowGroundClearance = "LD",

  // ==================== Inner Bay Window Parameters ====================
  
  /** Inner bay window width dimension */
  InnerBayWindowWidth = "W",
  
  /** Inner bay window depth dimension */
  InnerBayWindowDepth = "D",
  
  /** Inner bay window height dimension */
  InnerBayWindowHeight = "H",
  
  /** Inner bay window material type */
  InnerBayWindowMaterial = "CZ",
  
  /** Inner bay window ground clearance height */
  InnerBayWindowGroundClearance = "LD",

  // ==================== Special-Shaped Inner Bay Window Parameters ====================
  
  /** Special-shaped inner bay window width dimension */
  SpecialShapedInnerBayWindowWidth = "W",
  
  /** Special-shaped inner bay window left side depth dimension */
  SpecialShapedInnerBayWindowLeftDepth = "D1",
  
  /** Special-shaped inner bay window right side depth dimension */
  SpecialShapedInnerBayWindowRightDepth = "D2",
  
  /** Special-shaped inner bay window height dimension */
  SpecialShapedInnerBayWindowHeight = "H",
  
  /** Special-shaped inner bay window material type */
  SpecialShapedInnerBayWindowMaterial = "CZ",
  
  /** Special-shaped inner bay window ground clearance height */
  SpecialShapedInnerBayWindowGroundClearance = "LD",

  // ==================== Curved Bay Window Parameters ====================
  
  /** Curved bay window width dimension */
  CurvedBayWindowWidth = "W",
  
  /** Curved bay window depth dimension */
  CurvedBayWindowDepth = "D",
  
  /** Curved bay window height dimension */
  CurvedBayWindowHeight = "H",
  
  /** Curved bay window material type */
  CurvedBayWindowMaterial = "CZ",
  
  /** Curved bay window ground clearance height */
  CurvedBayWindowGroundClearance = "LD",
  
  /** Curved bay window chord height (arc measurement) */
  CurvedBayWindowChordHeight = "XH",

  // ==================== Door Window Parameters ====================
  
  /** Door window width dimension */
  DoorWindowWidth = "W",
  
  /** Door window depth dimension */
  DoorWindowDepth = "D",
  
  /** Door window height dimension */
  DoorWindowHeight = "H",
  
  /** Door window material type */
  DoorWindowMaterial = "CZ",
  
  /** Door window ground clearance height */
  DoorWindowGroundClearance = "LD",
  
  /** Door window left/right opening direction */
  DoorWindowLeftRightDoorOpenDirection = "ZYKM",

  // ==================== Special-Shaped Window Parameters ====================
  
  /** Special-shaped window width dimension */
  SpecialShapedWindowWidth = "W",
  
  /** Special-shaped window depth dimension */
  SpecialShapedWindowDepth = "D",
  
  /** Special-shaped window height dimension */
  SpecialShapedWindowHeight = "H",
  
  /** Special-shaped window material type */
  SpecialShapedWindowMaterial = "CZ",
  
  /** Special-shaped window ground clearance height */
  SpecialShapedWindowGroundClearance = "LD",

  // ==================== Curved Window Sash Parameters ====================
  
  /** Curved window sash width dimension */
  CurvedWindowSashWidth = "W",
  
  /** Curved window sash depth dimension */
  CurvedWindowSashDepth = "D",
  
  /** Curved window sash height dimension */
  CurvedWindowSashHeight = "H",
  
  /** Curved window sash material type */
  CurvedWindowSashMaterial = "CZ",
  
  /** Curved window sash chord height (arc measurement) */
  CurvedWindowSashChordHeight = "XH",

  // ==================== Straight Window Sash Parameters ====================
  
  /** Straight window sash width dimension */
  StraightWindowSashWidth = "W",
  
  /** Straight window sash depth dimension */
  StraightWindowSashDepth = "D",
  
  /** Straight window sash height dimension */
  StraightWindowSashHeight = "H",
  
  /** Straight window sash material type */
  StraightWindowSashMaterial = "CZ",

  // ==================== L-Shaped Window Sash Parameters ====================
  
  /** L-shaped window sash left segment width dimension */
  LShapedWindowSashLeftWidth = "W1",
  
  /** L-shaped window sash right segment width dimension */
  LShapedWindowSashRightWidth = "W2",
  
  /** L-shaped window sash left segment depth dimension */
  LShapedWindowSashLeftDepth = "D1",
  
  /** L-shaped window sash right segment depth dimension */
  LShapedWindowSashRightDepth = "D2",
  
  /** L-shaped window sash height dimension */
  LShapedWindowSashHeight = "H",
  
  /** L-shaped window sash material type */
  LShapedWindowSashMaterial = "CZ",
  
  /** L-shaped window sash connection angle */
  LShapedWindowSashAngle = "A1",

  // ==================== U-Shaped Window Sash Parameters ====================
  
  /** U-shaped window sash overall width dimension */
  UShapedWindowSashWidth = "W",
  
  /** U-shaped window sash left segment width dimension */
  UShapedWindowSashLeftWidth = "W1",
  
  /** U-shaped window sash right segment width dimension */
  UShapedWindowSashRightWidth = "W2",
  
  /** U-shaped window sash overall depth dimension */
  UShapedWindowSashDepth = "D",
  
  /** U-shaped window sash left segment depth dimension */
  UShapedWindowSashLeftDepth = "D1",
  
  /** U-shaped window sash right segment depth dimension */
  UShapedWindowSashRightDepth = "D2",
  
  /** U-shaped window sash height dimension */
  UShapedWindowSashHeight = "H",
  
  /** U-shaped window sash material type */
  UShapedWindowSashMaterial = "CZ",
  
  /** U-shaped window sash left connection angle */
  UShapedWindowSashLeftAngle = "A1",
  
  /** U-shaped window sash right connection angle */
  UShapedWindowSashRightAngle = "A2",

  // ==================== Polygonal Window Sash Parameters ====================
  
  /** Polygonal window sash left segment width dimension */
  PolygonalWindowSashLeftWidth = "W1",
  
  /** Polygonal window sash right segment width dimension */
  PolygonalWindowSashRightWidth = "W2",
  
  /** Polygonal window sash third segment width dimension */
  PolygonalWindowSashWidth1 = "W3",
  
  /** Polygonal window sash fourth segment width dimension */
  PolygonalWindowSashWidth2 = "W4",
  
  /** Polygonal window sash left segment depth dimension */
  PolygonalWindowSashLeftDepth = "D1",
  
  /** Polygonal window sash right segment depth dimension */
  PolygonalWindowSashRightDepth = "D2",
  
  /** Polygonal window sash third segment depth dimension */
  PolygonalWindowSashDepth1 = "D3",
  
  /** Polygonal window sash fourth segment depth dimension */
  PolygonalWindowSashDepth2 = "D4",
  
  /** Polygonal window sash height dimension */
  PolygonalWindowSashHeight = "H",
  
  /** Polygonal window sash material type */
  PolygonalWindowSashMaterial = "CZ",
  
  /** Polygonal window sash first connection angle */
  PolygonalWindowSashLeftAngle = "A1",
  
  /** Polygonal window sash second connection angle */
  PolygonalWindowSashRightAngle = "A2",
  
  /** Polygonal window sash third connection angle */
  PolygonalWindowSashAngle = "A3",
}