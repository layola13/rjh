import { Strategy } from './Strategy';

interface Room {
  diy_info?: DiyInfo[];
}

interface DiyInfo {
  id: string | number;
}

interface GetFlatEntityIdsParams {
  instanceId: string | number;
  room: Room;
}

interface FlatEntityIdsResult {
  flatEntityIds: Array<string | number>;
}

export class DiyStrategy extends Strategy {
  constructor() {
    super();
  }

  getFlatEntityIdsAndCategory(params: GetFlatEntityIdsParams): FlatEntityIdsResult {
    const { instanceId, room } = params;
    const diyInfoList = room.diy_info ?? [];

    for (let index = 0; index < diyInfoList.length; index++) {
      const diyInfo = diyInfoList[index];
      
      if (diyInfo.id === instanceId) {
        return {
          flatEntityIds: [diyInfo.id]
        };
      }
    }

    return {
      flatEntityIds: []
    };
  }
}