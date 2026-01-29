interface FloorplanSpan {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface RoomStyle {
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

interface AreaTextSize {
  size: number;
  paddingSmall: number;
  paddingBig: number;
}

interface TypeTextSize {
  sizelist: number[];
  padding: number;
}

interface RoomConfig {
  style: RoomStyle;
  areaVisible: boolean;
  areaTextSize: AreaTextSize;
  fontColor: string;
  fontOutlineColor: string;
  edgeColor: string;
  edgeWidth: number;
  typeTextSize: TypeTextSize;
  textStrokeWidth: number;
  textOutlineStrokeWidth: number;
  drawGroundImg: boolean;
}

interface WallConfig {
  normalColor: string;
  loadBearingColor: string;
  innerWidth: number;
  outerWidth: number;
}

interface DoorConfig {
  visible: boolean;
  color: string;
  opacity: number;
  entryWidth: number;
  entryHeight: number;
  lineWidth: number;
  lineColor: string;
}

interface WindowConfig {
  visible: boolean;
  lineWidth: number;
  lineColor: string;
  strokeColor: string;
  glassColor: string;
  glassStrokeColor: string;
  wallColor: string;
}

interface EntryConfig {
  lineWidth: number;
  lineColor: string;
}

interface FloorplanConfig {
  backgroundColor: string;
  fullWidth: number;
  fullHeight: number;
  floorplanSpan: FloorplanSpan;
  room: RoomConfig;
  wall: WallConfig;
  door: DoorConfig;
  window: WindowConfig;
  entry: EntryConfig;
}

const floorplanConfig: FloorplanConfig = {
  backgroundColor: "#FFFFFF",
  fullWidth: 150,
  fullHeight: 150,
  floorplanSpan: {
    left: 5,
    right: 5,
    top: 5,
    bottom: 5
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
    areaTextSize: {
      size: 4,
      paddingSmall: 0,
      paddingBig: 0
    },
    fontColor: "#444444",
    fontOutlineColor: "#444444",
    edgeColor: "#000000",
    edgeWidth: 1,
    typeTextSize: {
      sizelist: [6, 4],
      padding: 0
    },
    textStrokeWidth: 0.3,
    textOutlineStrokeWidth: 2,
    drawGroundImg: false
  },
  wall: {
    normalColor: "#444444",
    loadBearingColor: "#171717",
    innerWidth: 1,
    outerWidth: 2
  },
  door: {
    visible: true,
    color: "#a4a4a4",
    opacity: 0.2,
    entryWidth: 116.4,
    entryHeight: 56.4,
    lineWidth: 0.5,
    lineColor: "#444444"
  },
  window: {
    visible: true,
    lineWidth: 0.5,
    lineColor: "#444444",
    strokeColor: "#ffffff",
    glassColor: "#ffffff",
    glassStrokeColor: "#000000",
    wallColor: "#444444"
  },
  entry: {
    lineWidth: 0.5,
    lineColor: "#444444"
  }
};

export default floorplanConfig;