import { Strategy } from './Strategy';
import { ENUM_SINGLE_SELECT_CATEGORY } from './constants';

interface CeilingInfo {
  id: string;
}

interface RoomCeilingInfo {
  ceilings?: CeilingInfo[];
  model_ceiling_info?: CeilingInfo[];
}

interface Room {
  ceiling_info?: RoomCeilingInfo;
}

interface GetFlatEntityIdsParams {
  instanceId: string;
  room: Room;
}

interface FlatEntityResult {
  flatEntityIds: string[];
  category: ENUM_SINGLE_SELECT_CATEGORY | undefined;
}

export class CeilingStrategy extends Strategy {
  constructor() {
    super();
  }

  getFlatEntityIdsAndCategory(params: GetFlatEntityIdsParams): FlatEntityResult {
    const { instanceId, room } = params;
    
    const result: FlatEntityResult = {
      flatEntityIds: [],
      category: undefined
    };

    const ceilings = room.ceiling_info?.ceilings ?? [];
    const modelCeilingInfo = room.ceiling_info?.model_ceiling_info ?? [];

    for (let i = 0; i < ceilings.length; i++) {
      const ceiling = ceilings[i];
      if (ceiling.id === instanceId) {
        result.flatEntityIds.push(ceiling.id);
        result.category = ENUM_SINGLE_SELECT_CATEGORY.Ceiling;
        return result;
      }
    }

    for (let j = 0; j < modelCeilingInfo.length; j++) {
      const modelCeiling = modelCeilingInfo[j];
      if (modelCeiling.id === instanceId) {
        result.flatEntityIds.push(modelCeiling.id);
        result.category = ENUM_SINGLE_SELECT_CATEGORY.Ceiling;
        return result;
      }
    }

    return result;
  }
}