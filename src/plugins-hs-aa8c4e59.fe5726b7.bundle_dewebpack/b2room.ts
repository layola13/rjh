import { B2Processor } from './b2processor';
import { RoomTypeOrderEnum } from './constants';

interface RoomBomData {
  ID: string;
  roomType: string;
  roomTypeDisplayName: string;
  area: number;
  layerId: string;
}

interface Room {
  getInstanceId(): string;
  getParameterValue(key: string): any;
}

interface BuilderContext {
  rooms: Room[];
}

export class B2Room extends B2Processor {
  protected context!: BuilderContext;

  /**
   * Builds BOM2 data from all rooms in the context
   * @returns Array of room BOM data, sorted by room type order and display name
   */
  buildBom2Data(): RoomBomData[] | undefined {
    try {
      const roomData = this.context.rooms.map((room) => {
        return this.buildRoomBomData(room);
      });

      return roomData.sort((a, b) => {
        const indexA = RoomTypeOrderEnum.indexOf(a.roomType);
        const indexB = RoomTypeOrderEnum.indexOf(b.roomType);
        
        return indexA === indexB 
          ? a.roomTypeDisplayName.localeCompare(b.roomTypeDisplayName)
          : indexA - indexB;
      });
    } catch (error) {
      const errorMessage = `DataBuilder getRoomList error:${(error as Error).message}`;
      console.error(`${errorMessage}: ${(error as Error).stack}`);
      
      HSApp.App.getApp().errorLogger.push(errorMessage, {
        errorStack: (error as Error).stack,
        description: errorMessage,
        errorInfo: {
          info: error,
          path: {
            file: "homestyler-tools-web/web/plugin/bom4/sdk/bom2/b2room.ts",
            functionName: "buildBom2Data()"
          }
        }
      }, {});
      
      return undefined;
    }
  }

  /**
   * Builds BOM data for a single room
   * @param room - Room instance to extract data from
   * @returns Room BOM data object
   */
  buildRoomBomData(room: Room): RoomBomData {
    return {
      ID: room.getInstanceId(),
      roomType: room.getParameterValue("type"),
      roomTypeDisplayName: room.getParameterValue("displayNameCustom") || "未命名",
      area: room.getParameterValue("area"),
      layerId: room.getParameterValue("layerId")
    };
  }
}