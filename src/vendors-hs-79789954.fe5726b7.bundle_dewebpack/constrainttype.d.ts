/**
 * Module: ConstraintType
 * Original ID: 288839
 * Exports: ConstraintType, RegionType, BaseRegionType
 */

/**
 * Base region types representing fundamental furniture and fixture categories
 * Used for basic classification of spatial elements in interior design
 */
export enum BaseRegionType {
  /** Sofa or couch furniture */
  Sofa = "Sofa",
  /** Wardrobe or closet furniture */
  Armoire = "Armoire",
  /** Window curtain or drape */
  Curtain = "Curtain",
  /** Shower fixture or area */
  Shower = "Shower",
  /** Ceiling-mounted fixtures (lights, fans, etc.) */
  CeilingAttached = "CeilingAttached",
  /** Table furniture of any type */
  Table = "Table"
}

/**
 * Detailed region types with specific subcategories
 * Extends base types with fine-grained classifications for precise spatial analysis
 */
export enum RegionType {
  /** Bed furniture */
  Bed = "Bed",
  /** Television display */
  TV = "TV",
  /** Generic wardrobe without specific positioning */
  ArmoireGeneric = "Armoire_Generic",
  /** Corner-positioned wardrobe */
  ArmoireCorner = "Armoire_Corner",
  /** Side-positioned wardrobe */
  ArmoireSide = "Armoire_Side",
  /** Wardrobe that cannot be classified into specific subtypes */
  ArmoireUnClassified = "Armoire_UnClassified",
  /** Dining table */
  TableDining = "Table_Dining",
  /** Desk or work table */
  TableDesk = "Table_Desk",
  /** Dresser or vanity table */
  TableDresser = "Table_Dresser",
  /** Bar table or counter */
  TableBar = "Table_Bar",
  /** Table of unknown or unclassified type */
  TableUnknown = "Table_Unknown",
  /** Generic curtain without specific classification */
  CurtainGeneric = "Curtain_Generic",
  /** Single panel curtain */
  CurtainSingle = "Curtain_Single",
  /** Background wall surface */
  BackgroundWall = "Backgroundwall",
  /** Single-seat sofa */
  SofaSingle = "Sofa_Single",
  /** Multi-seat sofa */
  SofaMultiple = "Sofa_Multiple",
  /** L-shaped sectional sofa */
  SofaLShape = "Sofa_LShape",
  /** U-shaped sectional sofa */
  SofaUShape = "Sofa_UShape",
  /** Chair furniture */
  Chair = "Chair",
  /** Drinking fountain or water dispenser */
  Drinking = "Drinking",
  /** Toilet fixture */
  Toilet = "Toilet",
  /** Shower head fixture */
  ShowerHead = "Shower_Head",
  /** Shower area or enclosure */
  ShowerRegion = "Shower_Region",
  /** Shower screen or glass partition */
  ShowerScreen = "Shower_Screen",
  /** Sink or washbasin */
  Basin = "Basin",
  /** Washing machine */
  Washer = "Washer",
  /** Floor rug or carpet */
  Rug = "Rug",
  /** Clothing or garment items */
  Clothes = "Clothes",
  /** Floor-standing lamp */
  FloorLight = "FloorLight",
  /** Electrical socket or outlet */
  Socket = "Socket",
  /** Plants or greenery */
  Plants = "Plants",
  /** Generic ceiling-attached fixture */
  CeilingAttachedGeneric = "CeilingAttached_Generic",
  /** Ceiling-mounted light fixture */
  CeilingAttachedLight = "CeilingAttached_Light",
  /** Element that cannot be classified into any category */
  UnClassified = "UnClassified"
}

/**
 * Constraint types for spatial layout and positioning rules
 * Defines relationships between objects in terms of distance, alignment, and justification
 */
export enum ConstraintType {
  /** Maintain current distance between objects */
  distanceAsIs = "distance",
  /** Use a fixed specified distance */
  distanceSpecified = "fixed",
  /** Align to the start edge */
  alignStart = "alignStart",
  /** Align to the end edge */
  alignEnd = "alignEnd",
  /** Align to the center */
  alignCenter = "alignCenter",
  /** Maintain current alignment */
  alignAsIs = "alignAsIs",
  /** Justify to the start position */
  justifyStart = "justifyStart",
  /** Justify to the end position */
  justifyEnd = "justifyEnd",
  /** Justify to the center position */
  justifyCenter = "justifyCenter",
  /** Maintain current justification */
  justifyAsIs = "justifyAsIs",
  /** Host or parent element constraint */
  host = "host"
}