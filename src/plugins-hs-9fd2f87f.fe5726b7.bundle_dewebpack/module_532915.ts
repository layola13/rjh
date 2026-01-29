interface FloorplanSpan {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface FrameSpan {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface RoomStyleMap {
  LivingRoom: string;
  Hallway: string;
  DiningRoom: string;
  LivingDiningRoom: string;
  None: string;
  Bedroom: string;
  KidsRoom: string;
  MasterBedroom: string;
  SecondBedroom: string;
  ElderlyRoom: string;
  Library: string;
  NannyRoom: string;
  StorageRoom: string;
  CloakRoom: string;
  Balcony: string;
  Courtyard: string;
  Terrace: string;
  Kitchen: string;
  Bathroom: string;
  MasterBathroom: string;
  SecondBathroom: string;
  LaundryRoom: string;
  Stairwell: string;
  Aisle: string;
  Corridor: string;
  Lounge: string;
  Auditorium: string;
  EquipmentRoom: string;
  Garage: string;
  OtherSpace: string;
  Outdoors: string;
}

interface TextSize {
  size: number;
  padding: number;
}

interface AreaTextSize {
  size: number;
  paddingSmall: number;
  paddingBig: number;
}

interface RoomConfig {
  style: RoomStyleMap;
  areaVisible: boolean;
  areaFontSize: number;
  areaTextSize: AreaTextSize;
  fontColor: string;
  fontOutlineColor: string;
  edgeColor: string;
  edgeWidth: number;
  typeFontSize: number;
  typeTextSize: TextSize;
  textStrokeWidth: number;
  textOutlineStrokeWidth: number;
}

interface WallConfig {
  normalColor: string;
  loadBearingColor: string;
}

interface DoorConfig {
  visible: boolean;
  color: string;
  opacity: number;
  entryWidth: number;
  entryHeight: number;
}

interface WindowConfig {
  visible: boolean;
  strokeColor: string;
  glassColor: string;
  glassStrokeColor: string;
  wallColor: string;
}

interface EntryConfig {
  visible: boolean;
}

interface LogoConfig {
  visible: boolean;
  sizeWidth: number;
  sizeHeight: number;
}

interface CompassConfig {
  visible: boolean;
  sizeWidth: number;
  sizeHeight: number;
}

interface DimensionShowLevels {
  first: boolean;
  second: boolean;
  third: boolean;
}

interface DimensionThreshold {
  first: number;
  second: number;
}

interface DimensionConfig {
  showLevels: DimensionShowLevels;
  threshold: DimensionThreshold;
  offsetBase: number;
  levelSpan: number;
  innerExtend: number;
  outerExtend: number;
  showEndPoint: boolean;
  fontSize: number;
  textOffset: number;
  textColor: string;
}

interface FloorplanConfig {
  fullWidth: number;
  fullHeight: number;
  materialTitleHeight: number;
  floorplanSpan: FloorplanSpan;
  frameSpan: FrameSpan;
  room: RoomConfig;
  wall: WallConfig;
  door: DoorConfig;
  window: WindowConfig;
  entry: EntryConfig;
  logo: LogoConfig;
  compass: CompassConfig;
  dimension: DimensionConfig;
}

const floorplanConfig: FloorplanConfig = {
  fullWidth: 4200,
  fullHeight: 2970,
  materialTitleHeight: 60,
  floorplanSpan: {
    left: 200,
    right: 200,
    top: 200,
    bottom: 300
  },
  frameSpan: {
    left: 100,
    right: 1200,
    top: 350,
    bottom: 350
  },
  room: {
    style: {
      LivingRoom: "m1",
      Hallway: "m1",
      DiningRoom: "m1",
      LivingDiningRoom: "m1",
      None: "m1",
      Bedroom: "m2",
      KidsRoom: "m2",
      MasterBedroom: "m2",
      SecondBedroom: "m2",
      ElderlyRoom: "m2",
      Library: "m2",
      NannyRoom: "m2",
      StorageRoom: "m2",
      CloakRoom: "m2",
      Balcony: "m3",
      Courtyard: "m3",
      Terrace: "m3",
      Kitchen: "m4",
      Bathroom: "m4",
      MasterBathroom: "m4",
      SecondBathroom: "m4",
      LaundryRoom: "m4",
      Stairwell: "m5",
      Aisle: "m5",
      Corridor: "m5",
      Lounge: "m5",
      Auditorium: "m5",
      EquipmentRoom: "m5",
      Garage: "m5",
      OtherSpace: "m6",
      Outdoors: "m6"
    },
    areaVisible: true,
    areaFontSize: 24,
    areaTextSize: {
      size: 24,
      paddingSmall: -5,
      paddingBig: -30
    },
    fontColor: "#08090b",
    fontOutlineColor: "#f4f4f4",
    edgeColor: "#000000",
    edgeWidth: 1,
    typeFontSize: 30,
    typeTextSize: {
      size: 30,
      padding: -50
    },
    textStrokeWidth: 0.3,
    textOutlineStrokeWidth: 2
  },
  wall: {
    normalColor: "#7a7a7a",
    loadBearingColor: "#171717"
  },
  door: {
    visible: true,
    color: "#a4a4a4",
    opacity: 0.2,
    entryWidth: 116.4,
    entryHeight: 56.4
  },
  window: {
    visible: true,
    strokeColor: "#ffffff",
    glassColor: "#ffffff",
    glassStrokeColor: "#000000",
    wallColor: "#7a7a7a"
  },
  entry: {
    visible: true
  },
  logo: {
    visible: true,
    sizeWidth: 500,
    sizeHeight: 150
  },
  compass: {
    visible: true,
    sizeWidth: 112,
    sizeHeight: 132
  },
  dimension: {
    showLevels: {
      first: true,
      second: true,
      third: false
    },
    threshold: {
      first: 400,
      second: 250
    },
    offsetBase: 200,
    levelSpan: 60,
    innerExtend: 12,
    outerExtend: 12,
    showEndPoint: true,
    fontSize: 40,
    textOffset: -15,
    textColor: "#08090b"
  }
};

export default floorplanConfig;