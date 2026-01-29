import { OperationId, BaseOperation } from './BaseOperation';
import { OperationParamType } from './OperationParamType';
import ProductService from './ProductService';

interface Floor {
  id: string;
  roomType?: string;
}

interface RoomListItem {
  floor: Floor;
  options: RoomOptions;
}

interface RoomOptions {
  seekIds?: string[];
  notClearExists?: boolean;
}

interface ModelInfo {
  type: string;
  brand: string;
  roomId: string;
  roomType: string;
}

interface OperationParams {
  subType: OperationParamType;
  roomId: string;
  roomType: string;
  modelInfos: ModelInfo[];
}

interface OperationContext {
  operationType?: string;
  isQuestionTone: number;
  reply: string;
  params: OperationParams;
  recommendedOperationTypes?: string[];
}

interface SearchProductParams {
  limit: number;
  branch: string;
  currentRoom: {
    roomId: string;
  };
  text: string;
  treeId: string;
  filterShowAuth: string;
  order: string;
}

interface ProductItem {
  id: string;
}

interface SearchProductResponse {
  data?: {
    items?: ProductItem[];
  };
}

interface ConstraintLayoutPlugin {
  handleApplyRooms(rooms: RoomListItem[]): Promise<void>;
}

interface Plugin {
  constraintLayoutPlugin: ConstraintLayoutPlugin;
  signal: {
    dispatch(payload: { action: string; payload: RoomListItem[] }): void;
  };
}

interface TransactionSession {
  commit(): void;
}

interface App {
  floorplan: {
    scene: {
      activeLayer: {
        forEachFloor(callback: (floor: Floor) => void): void;
      };
    };
  };
  transManager: {
    startSession(): TransactionSession;
  };
  pluginManager: {
    getPlugin(pluginType: string): Plugin;
  };
}

declare const HSFPConstants: {
  PluginType: {
    ConstraintLayout: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

export class OpModel extends BaseOperation {
  private app!: App;

  constructor() {
    super();
  }

  static getId(): OperationId {
    return OperationId.ModelOperation;
  }

  private getRoomLists(): RoomListItem[] {
    const roomLists: RoomListItem[] = [];
    this.app.floorplan.scene.activeLayer.forEachFloor((floor: Floor) => {
      roomLists.push({
        floor,
        options: {}
      });
    });
    return roomLists;
  }

  onExecute(context: OperationContext): void {
    const roomLists = this.getRoomLists();

    if (roomLists.length === 0 && ['Model_Operation'].includes(context?.operationType ?? '')) {
      this.onFinish('fail', ResourceManager.getString('homegpt_layout_room_empty_rooms'), context);
      return;
    }

    switch (context.params.subType) {
      case OperationParamType.Layout:
        if (context.isQuestionTone === 0) {
          this.layoutRooms(context, roomLists);
        } else {
          this.onFinish('success', context.reply, context);
        }
        break;

      case OperationParamType.Place:
        if (context.params.modelInfos.length > 0) {
          this.placeModels(context.params.modelInfos ?? [], roomLists, context);
        } else {
          this.onFinish('success', context.reply, context);
        }
        break;

      default:
        this.onFinish('success', context.reply, context);
    }
  }

  private layoutRooms(context: OperationContext, roomLists: RoomListItem[]): void {
    const { roomId, roomType } = context.params;

    let targetRooms = roomId
      .split(', ')
      .map((id: string) => roomLists.find((item) => item.floor.id === id.replace(/\s/g, '')))
      .filter((room): room is RoomListItem => !!room);

    if (targetRooms.length === 0) {
      targetRooms = roomType
        .split(', ')
        .map((type: string) =>
          roomLists.find(
            (item) =>
              item.floor.roomType?.toLowerCase() === type.replace(/\s/g, '')?.toLowerCase()
          )
        )
        .filter((room): room is RoomListItem => !!room);
    }

    const session = this.app.transManager.startSession();
    const plugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.ConstraintLayout);

    plugin.constraintLayoutPlugin
      .handleApplyRooms(targetRooms)
      .then(() => {
        session.commit();
        const recommendedTypes = OpModel.getRecommendedOperationTypes(OpModel.getId());
        context.recommendedOperationTypes = recommendedTypes;
        this.onFinish('success', context.reply, context);
      })
      .catch(() => {
        session.commit();
        this.onFinish('fail', ResourceManager.getString('homegpt_layout_room_error'), context);
      });
  }

  private placeModels(modelInfos: ModelInfo[], roomLists: RoomListItem[], context: OperationContext): void {
    const searchPromises = modelInfos.map((modelInfo: ModelInfo) => {
      const searchParams: SearchProductParams = {
        limit: 1,
        branch: modelInfo.brand,
        currentRoom: {
          roomId: modelInfo.roomId
        },
        text: modelInfo.type,
        treeId: 'f5a8155d-3340-35e4-9f57-68572d392bbd',
        filterShowAuth: 'size, recommend',
        order: 'desc'
      };

      return ProductService.searchProducts(searchParams).then((response: SearchProductResponse) => {
        const items = response?.data?.items;
        if ((items?.length ?? 0) > 0) {
          const matchingRoom = roomLists.find(
            (item) =>
              item.floor.roomType?.toLowerCase() === modelInfo.roomType?.toLowerCase()
          );

          if (matchingRoom && items) {
            matchingRoom.options = {
              seekIds: [items[0].id],
              notClearExists: true
            };
          }

          return matchingRoom;
        }
        return undefined;
      });
    });

    const plugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.ConstraintLayout);

    Promise.all(searchPromises)
      .then((results) => {
        const validRooms = results.filter((room): room is RoomListItem => !!room);

        if (validRooms.length !== 0) {
          const action = validRooms.length > 0
            ? 'constraint_layout_input_place_contents'
            : 'constraint_layout_input_apply_rooms';

          plugin.signal.dispatch({
            action,
            payload: validRooms
          });

          const recommendedTypes = OpModel.getRecommendedOperationTypes(OpModel.getId());
          context.recommendedOperationTypes = recommendedTypes;
          this.onFinish('success', context.reply, context);
        } else {
          this.onFinish('fail', ResourceManager.getString('homegpt_place_furniture_empty'), context);
        }
      })
      .catch(() => {
        this.onFinish('fail', context.reply, context);
      });
  }

  private deleteModels(): void {
    // Implementation pending
  }

  private ResizeModels(): void {
    // Implementation pending
  }

  private static getRecommendedOperationTypes(operationId: OperationId): string[] {
    // Implementation pending
    return [];
  }

  private onFinish(status: string, message: string, context: OperationContext): void {
    // Implementation pending
  }
}