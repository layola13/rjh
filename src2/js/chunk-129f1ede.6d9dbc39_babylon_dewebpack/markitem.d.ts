/**
 * Module: MarkItem
 * Original ID: 111
 * 
 * This module contains all the core classes and types for the WebCC (Web Configuration & Calculation) system,
 * including architectural elements, hardware components, and structural elements for door/window configurations.
 */

/**
 * Base class for WebCC system components
 */
export declare class WebCCClass {}

/**
 * Represents a background wall element in the configuration
 */
export declare class BackgroundWall {}

/**
 * Represents a corner connection point or joint in the structure
 */
export declare class Corner {}

/**
 * Represents a connector component used to join multiple elements
 */
export declare class Connector {}

/**
 * Represents the main frame structure of a door or window
 */
export declare class Frame {}

/**
 * Represents a fixed side track component for sliding systems
 */
export declare class SideTrackFixed {}

/**
 * Represents a frame that can rotate or turn
 */
export declare class TurningFrame {}

/**
 * Represents a color configuration in the WebCC system
 */
export declare class WebCCColor {}

/**
 * Represents a security box container
 */
export declare class SecurityBox {}

/**
 * Represents an individual item within a security box
 */
export declare class SecurityBoxItem {}

/**
 * Represents a glass panel element
 */
export declare class Glass {}

/**
 * Represents a decorative bar element
 */
export declare class DecBar {}

/**
 * Represents a hole or opening in a panel or structure
 */
export declare class Hole {}

/**
 * Represents a solid panel element
 */
export declare class Panel {}

/**
 * Represents a shutter component
 */
export declare class Shutter {}

/**
 * Represents a fly screen (insect screen) component
 */
export declare class FlyScreen {}

/**
 * Represents a wall element in the configuration
 */
export declare class Wall {}

/**
 * Represents a leaf (movable panel) in a door or window system
 */
export declare class Leaf {}

/**
 * Represents a hardware component (handles, hinges, locks, etc.)
 */
export declare class Hardware {}

/**
 * Enumeration of available hardware shape types
 */
export declare enum HardwareShape {
  /** Standard hinge */
  Hinge = "Hinge",
  /** Hinge mounted on a circular profile */
  HingeOnCircle = "HingeOnCircle",
  /** Professional-grade hinge */
  HingePro = "HingePro",
  /** Standard handle */
  Handle = "Handle",
  /** Alternative handle design */
  Handle2 = "Handle2",
  /** Commercial handle variant 1 */
  CommercialHandle = "CommercialHandle",
  /** Commercial handle variant 2 */
  CommercialHandle2 = "CommercialHandle2",
  /** Commercial handle variant 3 */
  CommercialHandle3 = "CommercialHandle3",
  /** Commercial handle variant 4 */
  CommercialHandle4 = "CommercialHandle4",
  /** Commercial handle variant 5 */
  CommercialHandle5 = "CommercialHandle5",
  /** Commercial handle variant 6 */
  CommercialHandle6 = "CommercialHandle6",
  /** Commercial handle variant 7 */
  CommercialHandle7 = "CommercialHandle7",
  /** Commercial handle variant 8 */
  CommercialHandle8 = "CommercialHandle8",
  /** Commercial handle variant 9 */
  CommercialHandle9 = "CommercialHandle9",
  /** Commercial handle variant 10 */
  CommercialHandle10 = "CommercialHandle10",
  /** Commercial handle variant 11 */
  CommercialHandle11 = "CommercialHandle11",
  /** Commercial handle variant 12 */
  CommercialHandle12 = "CommercialHandle12",
  /** Handle designed for folding door systems */
  HandleForFold = "HandleForFold",
  /** Handle designed for sliding door systems */
  HandleForSlide = "HandleForSlide",
  /** KFC-style handle (specific commercial design) */
  KfcHandle = "KfcHandle",
  /** Cross-shaped handle */
  CrossHandle = "CrossHandle",
  /** Standard lock mechanism */
  Lock = "Lock",
  /** Alternative lock mechanism */
  Lock2 = "Lock2",
  /** Hinge positioned at the endpoint */
  EndpointHinge = "EndpointHinge"
}

/**
 * Represents a sliding door or window system
 */
export declare class Slide {}

/**
 * Represents a leaf (panel) in a sliding system
 */
export declare class SlideLeaf {}

/**
 * Represents the pathway or track for sliding components
 */
export declare class SlidePathWay {}

/**
 * Base class for closeable objects (doors, windows, etc.)
 */
export declare class CloseObjectBase {}

/**
 * Represents a polygon-shaped item in the configuration
 */
export declare class PolygonItem {}

/**
 * Represents a mullion (vertical or horizontal divider) in a frame
 */
export declare class Mullion {}

/**
 * Represents a leaf in a folding door system
 */
export declare class foldLeaf {}

/**
 * Represents a marking or annotation item in the configuration
 */
export declare class MarkItem {}