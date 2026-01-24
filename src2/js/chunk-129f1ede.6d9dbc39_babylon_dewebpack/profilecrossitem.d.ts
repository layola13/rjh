/**
 * Profile cross-section item configuration module
 * Defines types and classes for window/door profile components
 */

/**
 * Collection of profile items
 */
export declare class Profiles {
  /**
   * Array of profile data
   */
  data: Array<any>;

  constructor();
}

/**
 * Collection of profile cross-section items
 */
export declare class ProfileCrosss {
  /**
   * Array of profile cross-section data
   */
  data: Array<any>;

  constructor();
}

/**
 * Single profile item configuration
 */
export declare class ProfileItem {}

/**
 * Profile display configuration
 */
export declare class ProfileShow {}

/**
 * Profile cross-section item configuration
 */
export declare class ProfileCrossItem {}

/**
 * Enum defining all component types used in window/door profiles
 * Includes frame, sash, screen, track, and accessory components
 */
export declare enum ccTypeEnum {
  /** Frame component */
  frame = "frame",
  
  /** Mullion (vertical divider) */
  mullion = "mullion",
  
  /** Corner joiner component */
  cornerJoiner = "cornerJoiner",
  
  /** Connector component */
  connector = "connector",
  
  /** Fixed bead component */
  fixedBead = "fixedBead",
  
  /** Fixed glass component */
  fixedGlass = "fixedGlass",
  
  /** Sash mullion component */
  sashMullion = "sashMullion",
  
  /** Sash glass component */
  sashGlass = "sashGlass",
  
  /** Sash bead component */
  sashBead = "sashBead",
  
  /** Screen mullion component */
  screenMullion = "screenMullion",
  
  /** Screen net component */
  screenNet = "screenNet",
  
  /** Screen bead component */
  screenBead = "screenBead",
  
  /** Double sash mullion component */
  doubleSashMullion = "doubleSashMullion",
  
  /** Double sash glass component */
  doubleSashGlass = "doubleSashGlass",
  
  /** Double sash bead component */
  doubleSashBead = "doubleSashBead",
  
  /** Double screen mullion component */
  doubleScreenMullion = "doubleScreenMullion",
  
  /** Double screen net component */
  doubleScreenNet = "doubleScreenNet",
  
  /** Double screen bead component */
  doubleScreenBead = "doubleScreenBead",
  
  /** Fold sash mullion component */
  foldSashMullion = "foldSashMullion",
  
  /** Fold sash glass component */
  foldSashGlass = "foldSashGlass",
  
  /** Fold sash bead component */
  foldSashBead = "foldSashBead",
  
  /** Fold screen mullion component */
  foldScreenMullion = "foldScreenMullion",
  
  /** Fold screen net component */
  foldScreenNet = "foldScreenNet",
  
  /** Fold screen bead component */
  foldScreenBead = "foldScreenBead",
  
  /** Slide sash mullion component */
  slideSashMullion = "slideSashMullion",
  
  /** Slide sash glass component */
  slideSashGlass = "slideSashGlass",
  
  /** Slide sash bead component */
  slideSashBead = "slideSashBead",
  
  /** Track bar component */
  trackBar = "trackBar",
  
  /** Turning frame component */
  turningFrame = "turningFrame",
  
  /** Fixed side track component */
  sideTrackFixed = "sideTrackFixed",
  
  /** Sliding side track component */
  sideTrackSlide = "sideTrackSlide",
  
  /** Coupled side track component */
  sideTrackCouple = "sideTrackCouple",
  
  /** Anti-theft mullion component */
  antitheftMullion = "antitheftMullion",
  
  /** Sash component */
  Sash = "Sash",
  
  /** Screen component */
  Screen = "Screen",
  
  /** Anti-theft component */
  Antitheft = "AntiTheft",
  
  /** Guard sash component */
  GuardSash = "GuardSash",
  
  /** Upper track component */
  UpTrack = "UpTrack",
  
  /** Fixed upper track component */
  FixedUpTrack = "FixedUpTrack",
  
  /** Lower track component */
  DownTrack = "DownTrack",
  
  /** Fixed lower track component */
  FixedDownTrack = "FixedDownTrack",
  
  /** Combined upper and lower track component */
  UpDownTrack = "UpDownTrack",
  
  /** Double-sided track component */
  DoubleSideTrack = "DoubleSideTrack",
  
  /** Side track component */
  SideTrack = "SideTrack",
  
  /** Sliding sash upper bar component */
  SlideSashUpBar = "SlideSashUpBar",
  
  /** Sliding sash lower bar component */
  SlideSashDownBar = "SlideSashDownBar",
  
  /** Sliding sash left collision bar component */
  SlideSashCollisionLeftBar = "SlideSashCollisionLeftBar",
  
  /** Sliding sash right collision bar component */
  SlideSashCollisionRightBar = "SlideSashCollisionRightBar",
  
  /** Sliding sash edge bar component */
  SlideSashEdgeBar = "SlideSashEdgeBar",
  
  /** Sliding sash single bar component */
  SlideSashSingleBar = "SlideSashSingleBar",
  
  /** Sliding sash double bar component */
  SlideSashDoubleBar = "SlideSashDoubleBar",
  
  /** Sliding sash no bar component */
  SlideSashNoneBar = "SlideSashNoneBar",
  
  /** KFC sash upper bar component */
  KfcSashUpBar = "KfcSashUpBar",
  
  /** KFC sash lower bar component */
  KfcSashDownBar = "KfcSashDownBar",
  
  /** KFC sash left bar component */
  KfcSashLeftBar = "KfcSashLeftBar",
  
  /** KFC sash right bar component */
  KfcSashRightBar = "KfcSashRightBar",
  
  /** Guard upper component */
  gdUp = "gdUp",
  
  /** Guard lower high component */
  gdDownHigh = "gdDownHigh",
  
  /** Guard lower low component */
  gdDownLow = "gdDownLow",
  
  /** Fixed side track component (duplicate entry) */
  SideTrackFixed = "SideTrackFixed",
  
  /** Sash turning frame component */
  sashTurningFrame = "sashTurningFrame",
  
  /** Fixed turning frame component */
  fixedTurningFrame = "fixedTurningFrame"
}