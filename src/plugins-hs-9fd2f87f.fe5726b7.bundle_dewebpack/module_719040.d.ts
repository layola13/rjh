/**
 * Room type and wall type identifier constants
 * Module: module_719040
 * Original ID: 719040
 */

/**
 * Enum-like constant object defining room types and wall types used in architectural/interior design applications
 */
export interface RoomAndWallTypeIdentifiers {
  /** Unnamed/unspecified room type */
  none: "Unnamed";
  
  /** Bathroom space */
  Bathroom: "Bathroom";
  
  /** Bedroom space */
  Bedroom: "Bedroom";
  
  /** Dining room space */
  DiningRoom: "DiningRoom";
  
  /** Children's room space */
  KidsRoom: "KidsRoom";
  
  /** Kitchen space */
  Kitchen: "Kitchen";
  
  /** Living room space */
  LivingRoom: "LivingRoom";
  
  /** Office space */
  Office: "Office";
  
  /** Generic other room type */
  OtherRoom: "OtherRoom";
  
  /** Outdoor space */
  Outdoors: "Outdoors";
  
  /** Public building exterior */
  PublicExterior: "PublicExterior";
  
  /** Public building interior */
  PublicInterior: "PublicInterior";
  
  /** Residential building exterior */
  ResidentialExterior: "ResidentialExterior";
  
  /** Entrance or hallway area */
  EntranceHallway: "EntranceHallway";
  
  /** Product display/showcase area */
  ProductShowcase: "ProductShowcase";
  
  /** Floor plan view */
  FloorPlan: "FloorPlan";
  
  /** Studio space */
  Studio: "Studio";
  
  /** Basement level */
  Basement: "Basement";
  
  /** Home cinema/theater room */
  HomeCinema: "HomeCinema";
  
  /** Library space */
  Library: "Library";
  
  /** Den/study room */
  Den: "Den";
  
  /** Sketch/draft view */
  Sketch: "Sketch";
  
  /** Combined living and dining room */
  LivingDiningRoom: "LivingDiningRoom";
  
  /** Hallway passage */
  Hallway: "Hallway";
  
  /** Balcony space */
  Balcony: "Balcony";
  
  /** Master/primary bedroom */
  MasterBedroom: "MasterBedroom";
  
  /** Secondary bedroom */
  SecondBedroom: "SecondBedroom";
  
  /** Elderly person's room */
  ElderlyRoom: "ElderlyRoom";
  
  /** Lounge area */
  Lounge: "Lounge";
  
  /** Auditorium space */
  Auditorium: "Auditorium";
  
  /** Nanny/caregiver room */
  NannyRoom: "NannyRoom";
  
  /** Laundry room */
  LaundryRoom: "LaundryRoom";
  
  /** Storage room */
  StorageRoom: "StorageRoom";
  
  /** Cloak room/coat room */
  CloakRoom: "CloakRoom";
  
  /** Master/primary bathroom */
  MasterBathroom: "MasterBathroom";
  
  /** Secondary bathroom */
  SecondBathroom: "SecondBathroom";
  
  /** Stairwell area */
  Stairwell: "Stairwell";
  
  /** Aisle passage */
  Aisle: "Aisle";
  
  /** Corridor passage */
  Corridor: "Corridor";
  
  /** Porch or balcony area */
  PorchBalcony: "PorchBalcony";
  
  /** Equipment/utility room */
  EquipmentRoom: "EquipmentRoom";
  
  /** Courtyard area */
  Courtyard: "Courtyard";
  
  /** Garage space */
  Garage: "Garage";
  
  /** Terrace space */
  Terrace: "Terrace";
  
  /** Generic wall type model */
  model_walltype_generic: "model_walltype_generic";
  
  /** Gypsum wall type model */
  model_walltype_gypsum_generic: "model_walltype_gypsum_generic";
  
  /** Brick wall type model */
  model_walltype_brick_generic: "model_walltype_brick_generic";
  
  /** Concrete wall type model */
  model_walltype_concrete: "model_walltype_concrete";
}

/**
 * Room type literal union for type-safe room identification
 */
export type RoomType = 
  | "Unnamed"
  | "Bathroom"
  | "Bedroom"
  | "DiningRoom"
  | "KidsRoom"
  | "Kitchen"
  | "LivingRoom"
  | "Office"
  | "OtherRoom"
  | "Outdoors"
  | "PublicExterior"
  | "PublicInterior"
  | "ResidentialExterior"
  | "EntranceHallway"
  | "ProductShowcase"
  | "FloorPlan"
  | "Studio"
  | "Basement"
  | "HomeCinema"
  | "Library"
  | "Den"
  | "Sketch"
  | "LivingDiningRoom"
  | "Hallway"
  | "Balcony"
  | "MasterBedroom"
  | "SecondBedroom"
  | "ElderlyRoom"
  | "Lounge"
  | "Auditorium"
  | "NannyRoom"
  | "LaundryRoom"
  | "StorageRoom"
  | "CloakRoom"
  | "MasterBathroom"
  | "SecondBathroom"
  | "Stairwell"
  | "Aisle"
  | "Corridor"
  | "PorchBalcony"
  | "EquipmentRoom"
  | "Courtyard"
  | "Garage"
  | "Terrace";

/**
 * Wall type literal union for type-safe wall material identification
 */
export type WallType =
  | "model_walltype_generic"
  | "model_walltype_gypsum_generic"
  | "model_walltype_brick_generic"
  | "model_walltype_concrete";

/**
 * Default export: constant object containing room and wall type identifiers
 */
declare const roomAndWallTypes: RoomAndWallTypeIdentifiers;

export default roomAndWallTypes;