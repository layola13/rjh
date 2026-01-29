/**
 * Enum representing different types of rooms and interior spaces.
 * This enum covers residential, commercial, and public space classifications.
 */
export enum RoomTypeEnum {
  /** Entrance hallway or corridor */
  Hallway = "Hallway",
  
  /** Main living area */
  LivingRoom = "LivingRoom",
  
  /** Dedicated dining area */
  DiningRoom = "DiningRoom",
  
  /** Combined living and dining space */
  LivingDiningRoom = "LivingDiningRoom",
  
  /** Outdoor balcony attached to residence */
  Balcony = "Balcony",
  
  /** Generic bedroom */
  Bedroom = "Bedroom",
  
  /** Primary/master bedroom */
  MasterBedroom = "MasterBedroom",
  
  /** Secondary bedroom */
  SecondBedroom = "SecondBedroom",
  
  /** Children's bedroom */
  KidsRoom = "KidsRoom",
  
  /** Bedroom designed for elderly residents */
  ElderlyRoom = "ElderlyRoom",
  
  /** Small room for storing coats and outerwear */
  CloakRoom = "CloakRoom",
  
  /** General storage space */
  StorageRoom = "StorageRoom",
  
  /** Room dedicated to laundry activities */
  LaundryRoom = "LaundryRoom",
  
  /** Servant or helper's room */
  NannyRoom = "NannyRoom",
  
  /** Kitchen and cooking area */
  Kitchen = "Kitchen",
  
  /** Generic bathroom */
  Bathroom = "Bathroom",
  
  /** Dry area of a bathroom (separated from wet area) */
  BathroomDryArea = "BathroomDryArea",
  
  /** Bathroom attached to master bedroom */
  MasterBathroom = "MasterBathroom",
  
  /** Secondary bathroom */
  SecondBathroom = "SecondBathroom",
  
  /** Study or library room */
  Library = "Library",
  
  /** Relaxation or waiting area */
  Lounge = "Lounge",
  
  /** Performance or presentation space */
  Auditorium = "Auditorium",
  
  /** Room for mechanical or technical equipment */
  EquipmentRoom = "EquipmentRoom",
  
  /** Long hallway or passage */
  Corridor = "Corridor",
  
  /** Narrow passage between spaces */
  Aisle = "Aisle",
  
  /** Open outdoor platform or patio */
  Terrace = "Terrace",
  
  /** Staircase area */
  Stairwell = "Stairwell",
  
  /** Generic outdoor space */
  Outdoors = "Outdoors",
  
  /** Enclosed outdoor courtyard */
  Courtyard = "Courtyard",
  
  /** Vehicle parking space */
  Garage = "Garage",
  
  /** Entry point or foyer */
  Entrance = "Entrance",
  
  /** Undesignated open space */
  Openspace = "Openspace",
  
  /** Miscellaneous room type */
  OtherRoom = "OtherRoom",
  
  /** Work office space */
  Office = "Office",
  
  /** Creative workspace or studio */
  Studio = "Studio",
  
  /** Public indoor space */
  PublicInterior = "PublicInterior",
  
  /** Public outdoor space */
  PublicExterior = "PublicExterior",
  
  /** Residential exterior area */
  ResidentialExterior = "ResidentialExterior",
  
  /** Main entrance hallway */
  EntranceHallway = "EntranceHallway",
  
  /** Below-ground level space */
  Basement = "Basement",
  
  /** Small private room or study */
  Den = "Den",
  
  /** Combined porch and balcony area */
  PorchBalcony = "PorchBalcony",
  
  /** Dedicated home theater room */
  HomeCinema = "HomeCinema",
  
  /** Architectural floor plan view */
  FloorPlan = "FloorPlan",
  
  /** Conceptual sketch or drawing */
  Sketch = "Sketch",
  
  /** Space for product display */
  ProductShowcase = "ProductShowcase",
  
  /** No specific room type assigned */
  none = "none"
}

/**
 * Enum representing outdoor space classifications.
 */
export enum OutdoorSpaceTypeEnum {
  /** Generic outdoor space not fitting other categories */
  OtherSpace = "OtherSpace",
  
  /** No specific outdoor space type assigned */
  none = "none"
}