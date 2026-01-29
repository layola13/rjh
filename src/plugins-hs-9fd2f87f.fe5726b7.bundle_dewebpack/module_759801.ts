interface FloorplanSpan {
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
  paddingSmall?: number;
  paddingBig?: number;
  padding?: number;
}

interface RoomConfig {
  style: RoomStyleMap;
  areaVisible: boolean;
  areaFontSize: number;
  areaTextSize: TextSize;
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

interface EntryConfig {
  visible: boolean;
}

interface WindowConfig {
  visible: boolean;
  strokeColor: string;
  glassColor: string;
  glassStrokeColor: string;
  wallColor: string;
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

interface FloorplanConfig {
  fullWidth: number;
  fullHeight: number;
  floorplanSpan: FloorplanSpan;
  room: RoomConfig;
  wall: WallConfig;
  door: DoorConfig;
  entry: EntryConfig;
  window: WindowConfig;
  logo: LogoConfig;
  compass: CompassConfig;
}

const floorplanConfig: FloorplanConfig = {
  fullWidth: 2120,
  fullHeight: 2120,
  floorplanSpan: {
    left: 190,
    right: 190,
    top: 190,
    bottom: 190
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
      size: 33,
      paddingSmall: -15,
      paddingBig: -40
    },
    fontColor: "#08090b",
    fontOutlineColor: "#f4f4f4",
    edgeColor: "#000000",
    edgeWidth: 1,
    typeFontSize: 30,
    typeTextSize: {
      size: 42,
      padding: -70
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
  entry: {
    visible: true
  },
  window: {
    visible: true,
    strokeColor: "#ffffff",
    glassColor: "#ffffff",
    glassStrokeColor: "#000000",
    wallColor: "#7a7a7a"
  },
  logo: {
    visible: false,
    sizeWidth: 466,
    sizeHeight: 128
  },
  compass: {
    visible: true,
    sizeWidth: 86,
    sizeHeight: 100
  }
};

export default floorplanConfig;