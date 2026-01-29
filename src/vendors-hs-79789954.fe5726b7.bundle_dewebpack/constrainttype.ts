export enum BaseRegionType {
  Sofa = "Sofa",
  Armoire = "Armoire",
  Curtain = "Curtain",
  Shower = "Shower",
  CeilingAttached = "CeilingAttached",
  Table = "Table"
}

export enum RegionType {
  Bed = "Bed",
  TV = "TV",
  ArmoireGeneric = "Armoire_Generic",
  ArmoireCorner = "Armoire_Corner",
  ArmoireSide = "Armoire_Side",
  ArmoireUnClassified = "Armoire_UnClassified",
  TableDining = "Table_Dining",
  TableDesk = "Table_Desk",
  TableDresser = "Table_Dresser",
  TableBar = "Table_Bar",
  TableUnknown = "Table_Unknown",
  CurtainGeneric = "Curtain_Generic",
  CurtainSingle = "Curtain_Single",
  BackgroundWall = "Backgroundwall",
  SofaSingle = "Sofa_Single",
  SofaMultiple = "Sofa_Multiple",
  SofaLShape = "Sofa_LShape",
  SofaUShape = "Sofa_UShape",
  Chair = "Chair",
  Drinking = "Drinking",
  Toilet = "Toilet",
  ShowerHead = "Shower_Head",
  ShowerRegion = "Shower_Region",
  ShowerScreen = "Shower_Screen",
  Basin = "Basin",
  Washer = "Washer",
  Rug = "Rug",
  Clothes = "Clothes",
  FloorLight = "FloorLight",
  Socket = "Socket",
  Plants = "Plants",
  CeilingAttachedGeneric = "CeilingAttached_Generic",
  CeilingAttachedLight = "CeilingAttached_Light",
  UnClassified = "UnClassified"
}

export enum ConstraintType {
  distanceAsIs = "distance",
  distanceSpecified = "fixed",
  alignStart = "alignStart",
  alignEnd = "alignEnd",
  alignCenter = "alignCenter",
  alignAsIs = "alignAsIs",
  justifyStart = "justifyStart",
  justifyEnd = "justifyEnd",
  justifyCenter = "justifyCenter",
  justifyAsIs = "justifyAsIs",
  host = "host"
}