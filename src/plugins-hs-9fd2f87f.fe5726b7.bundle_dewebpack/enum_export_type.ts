export enum ENUM_EXPORT_TYPE {
  FullPage = 0,
  Thumbnail2DPage = 1,
  Minimap = 2
}

export enum OpeningName {
  DoubleSwingingDoor1 = "double_swinging_door1.svg",
  SlidingDoubleDoor = "sliding_double_door.svg",
  SwingingDoor = "swinging_door.svg",
  FoldingDoor2_2 = "folding_door2-2.svg",
  DoubleSwingingDoor2 = "double_swinging_door2.svg",
  DoorWindow = "door_window.svg",
  SingleWindow = "single_window.svg",
  BayWindow = "bay_window.svg",
  BayWindowTransparent = "bay_window_transparent.svg",
  SlidingTripleDoor = "sliding_triple_door.svg",
  SlidingQuadDoor = "sliding_quad_door.svg",
  HSCoreModelHole = "HSCore.Model.Hole"
}

interface TypeTextSize {
  sizelist: number[];
}

interface RoomConfig {
  typeTextSize: TypeTextSize;
}

interface LineConfig {
  lineWidth: number;
}

interface WallConfig {
  innerWidth: number;
  outerWidth: number;
}

interface ExportSetting {
  fullWidth: number;
  fullHeight: number;
  room: RoomConfig;
  wall: WallConfig;
  window: LineConfig;
  entry: LineConfig;
  door: LineConfig;
}

import _ from 'lodash';
import fullPageDefault from './fullPageDefault';
import thumbnail2DPageDefault from './thumbnail2DPageDefault';
import minimapDefault from './minimapDefault';

const MINIMAP_SCALE_FACTOR = 4;

function scaleMinimapSettings(config: ExportSetting): ExportSetting {
  const scaled = _.cloneDeep(config);
  
  scaled.fullWidth *= MINIMAP_SCALE_FACTOR;
  scaled.fullHeight *= MINIMAP_SCALE_FACTOR;
  scaled.room.typeTextSize.sizelist = scaled.room.typeTextSize.sizelist.map(
    (size: number) => MINIMAP_SCALE_FACTOR * size
  );
  scaled.wall.innerWidth *= MINIMAP_SCALE_FACTOR;
  scaled.wall.outerWidth *= MINIMAP_SCALE_FACTOR;
  scaled.window.lineWidth *= MINIMAP_SCALE_FACTOR;
  scaled.entry.lineWidth *= MINIMAP_SCALE_FACTOR;
  scaled.door.lineWidth *= MINIMAP_SCALE_FACTOR;
  
  return scaled;
}

export function getExportSetting(exportType: ENUM_EXPORT_TYPE): ExportSetting {
  let setting: ExportSetting;
  
  switch (exportType) {
    case ENUM_EXPORT_TYPE.FullPage:
      setting = fullPageDefault;
      break;
    case ENUM_EXPORT_TYPE.Thumbnail2DPage:
      setting = thumbnail2DPageDefault;
      break;
    case ENUM_EXPORT_TYPE.Minimap:
      setting = scaleMinimapSettings(minimapDefault);
      break;
  }
  
  return _.cloneDeep(setting);
}