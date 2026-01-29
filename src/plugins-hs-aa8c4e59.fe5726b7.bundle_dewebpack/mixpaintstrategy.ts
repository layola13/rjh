import { Strategy } from './Strategy';
import { ENUM_SINGLE_SELECT_CATEGORY } from './constants';

interface GetFlatEntityIdsParams {
  instanceId: string;
  room: Room;
}

interface Room {
  pave_info?: PaveInfo[];
}

interface PaveInfo {
  faceId: string;
}

interface FlatEntityResult {
  flatEntityIds: string[];
  category?: ENUM_SINGLE_SELECT_CATEGORY;
}

export class MixPaintStrategy extends Strategy {
  constructor() {
    super();
  }

  getFlatEntityIdsAndCategory(params: GetFlatEntityIdsParams): FlatEntityResult {
    const { instanceId, room } = params;
    
    let normalizedId = instanceId;
    if (instanceId?.includes('/')) {
      normalizedId = instanceId.split('/')[0];
    }

    const paveInfo = room.pave_info ?? [];
    
    for (let i = 0; i < paveInfo.length; i++) {
      if (paveInfo[i].faceId === normalizedId) {
        return {
          flatEntityIds: [instanceId],
          category: ENUM_SINGLE_SELECT_CATEGORY.Ceiling
        };
      }
    }

    return {
      flatEntityIds: []
    };
  }
}