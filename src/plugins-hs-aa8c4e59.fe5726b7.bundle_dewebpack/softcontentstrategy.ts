import { Strategy } from './Strategy';
import { CustomizeContentStrategy } from './CustomizeContentStrategy';

interface Member {
  entityId: string;
  instanceId?: string;
  members?: Member[];
  isCustomModel?: boolean;
  type?: string;
}

interface RoomInfo {
  furniture_info: Member[];
  decorate_info: Member[];
  customizedProducts_info?: CustomizedProductsInfo;
}

interface CustomizedProductsInfo {
  [key: string]: unknown;
}

interface GetMembersParams {
  members: Member[];
  strategies?: Strategy[];
  customizedProductsInfo?: CustomizedProductsInfo;
}

interface GetMembersResult {
  items: string[];
  hasDecorativeContents: boolean;
  reason?: string;
}

interface HandleManualCombinationParams {
  members: Member[];
  strategies?: Strategy[];
  customizedProductsInfo?: CustomizedProductsInfo;
  instanceId: string;
}

interface GetFlatEntityIdsParams {
  instanceId: string;
  room: RoomInfo;
  strategies?: Strategy[];
}

interface GetFlatEntityIdsResult {
  flatEntityIds: string[];
  reason?: string;
}

interface FlatEntityIdsResult {
  flatEntityIds: string[];
  reason?: string;
}

export class SoftContentStrategy extends Strategy {
  constructor() {
    super();
  }

  public getFlatEntityIdsAndCategory(params: GetFlatEntityIdsParams): GetFlatEntityIdsResult {
    const { instanceId, room, strategies } = params;
    const flatEntityIds: string[] = [];
    const allItems = [...room.furniture_info, ...room.decorate_info];
    const customizedProductsInfo = room.customizedProducts_info;

    for (let index = 0; index < allItems.length; index++) {
      const item = allItems[index];

      if (item.entityId === instanceId) {
        if (item.members) {
          const result = this._getMembers({ members: item.members });
          flatEntityIds.push(...result.items);
        } else {
          flatEntityIds.push(item.entityId);
        }
      } else if (item.members) {
        const result = this._handleManualCombinationModel({
          members: item.members,
          strategies,
          customizedProductsInfo,
          instanceId
        });

        if (result.hasDecorativeContents || result.reason) {
          return {
            flatEntityIds: [],
            reason: result.reason
          };
        }

        flatEntityIds.push(...result.items);
      }

      if (flatEntityIds.length > 0) {
        break;
      }
    }

    return { flatEntityIds };
  }

  private _handleManualCombinationModel(params: HandleManualCombinationParams): GetMembersResult {
    const { members, strategies, customizedProductsInfo, instanceId } = params;
    
    const result = this._getMembers({
      members,
      strategies,
      customizedProductsInfo
    });

    const { items, hasDecorativeContents, reason } = result;

    if (hasDecorativeContents) {
      return {
        items: [],
        hasDecorativeContents,
        reason
      };
    }

    const foundItem = items.find(id => id === instanceId);

    if (foundItem) {
      return {
        items,
        hasDecorativeContents,
        reason
      };
    }

    return {
      items: [],
      hasDecorativeContents
    };
  }

  private _getMembers(params: GetMembersParams): GetMembersResult {
    const { members, strategies, customizedProductsInfo } = params;
    const entityIds: string[] = [];
    const decorativeContentsEnum = HSApp.Util.Recommend.getDecorativeContentsEnum();
    let customizeStrategy: CustomizeContentStrategy | undefined;

    for (let index = 0; index < members.length; index++) {
      const member = members[index];

      if (member.members) {
        const nestedResult = this._getMembers({
          members: member.members,
          strategies,
          customizedProductsInfo
        });

        if (nestedResult.hasDecorativeContents) {
          return {
            items: [],
            hasDecorativeContents: true
          };
        }

        entityIds.push(...nestedResult.items);
      } else if (member.isCustomModel && strategies && customizedProductsInfo) {
        if (!customizeStrategy) {
          customizeStrategy = strategies.find(
            strategy => strategy instanceof CustomizeContentStrategy
          ) as CustomizeContentStrategy | undefined;
        }

        if (customizeStrategy) {
          const customResult = customizeStrategy.getFlatEntityIdsByCustomizedProductsInfo(
            member.entityId,
            customizedProductsInfo
          );

          if (customResult.reason) {
            return {
              items: [],
              hasDecorativeContents: false,
              reason: customResult.reason
            };
          }

          entityIds.push(...customResult.flatEntityIds);
        }
      } else {
        if (member.type) {
          const contentType = new HSCatalog.ContentType(member.type);
          const isDecorativeContent = decorativeContentsEnum.some(
            (decorativeType: string) => contentType.isTypeOf(decorativeType)
          );

          if (isDecorativeContent) {
            return {
              items: [],
              hasDecorativeContents: true
            };
          }
        }

        entityIds.push(member.entityId);
      }
    }

    return {
      items: entityIds,
      hasDecorativeContents: false
    };
  }
}