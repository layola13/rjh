interface SmartLayoutData {
  id: string;
  type: string;
  style: unknown;
  area: number;
  furniture_info: unknown[];
}

interface LayoutEntity {
  entityId: string;
  id: string;
  hostType: string;
  materials: Record<string, unknown>;
  rotation: [number, number, number];
  scale: [number, number, number];
  position: [number, number, number];
  sub_list: unknown[];
}

interface MockDataResult {
  cabinet: {
    [key: number]: {
      contents: LayoutEntity[][];
    };
  };
  countertop: Record<string, unknown>;
  desktop: Record<string, unknown>;
  resultTag: string;
  resultMsg: string;
}

interface Room {
  roomType: string;
  id: string | number;
  [key: string]: unknown;
}

interface SeekableItem {
  seekId: string;
}

interface DModel {
  id: string;
  getFirstParent(): unknown;
  [key: string]: unknown;
}

interface Group extends DModel {
  members: DModel[];
}

export class SmartLayoutUtil {
  static prepareSmartLayoutData(room: Room, style: unknown): SmartLayoutData {
    return {
      id: `${room.roomType}-${room.id}`,
      type: room.roomType || "",
      style: style,
      area: HSCore.Util.Room.getArea(room),
      furniture_info: []
    };
  }

  static collectJids(items: SeekableItem[]): string[] {
    const jids: string[] = [];
    items.forEach((item: SeekableItem) => {
      jids.push(item.seekId);
    });
    return jids;
  }

  static isTopLevelCustomizedProduct(model: DModel): boolean {
    const customizedTypes = [
      HSCore.Model.DAssembly,
      HSCore.Model.DContent,
      HSCore.Model.DExtruding,
      HSCore.Model.DSweep,
      HSCore.Model.DMolding
    ];

    const isCustomizedType = customizedTypes.some((type) => model instanceof type);
    const isGroupWithCustomized = 
      model instanceof HSCore.Model.Group &&
      (model as Group).members.some((member) => 
        SmartLayoutUtil.isTopLevelCustomizedProduct(member)
      );

    return (isCustomizedType || isGroupWithCustomized) && SmartLayoutUtil.isToplevel(model);
  }

  static isToplevel(model: DModel): boolean {
    return model.getFirstParent() instanceof HSCore.Model.Layer;
  }

  static mockData(): MockDataResult {
    return {
      cabinet: {
        1498: {
          contents: [
            [
              {
                entityId: "0",
                id: "608a9936-3d12-4e8c-aecb-1b55b4c2d610",
                hostType: "others",
                materials: {},
                rotation: [0, 0, 0],
                scale: [1, 1, 1],
                position: [0.3944224990058098, 0.08855621973310943, 0.11800000000000001],
                sub_list: []
              }
            ],
            [
              {
                entityId: "0",
                id: "608a9936-3d12-4e8c-aecb-1b55b4c2d610",
                hostType: "others",
                materials: {},
                rotation: [0, 0, 0],
                scale: [1, 1, 1],
                position: [0.34442249900580973, 0.08855621973310943, 0.11800000000000001],
                sub_list: []
              }
            ],
            [],
            [
              {
                entityId: "0",
                id: "608a9936-3d12-4e8c-aecb-1b55b4c2d610",
                hostType: "others",
                materials: {},
                rotation: [0, 0, 0],
                scale: [1, 1, 1],
                position: [0.29442249900580975, 0.08855621973310943, 0.11800000000000001],
                sub_list: []
              }
            ],
            [],
            []
          ]
        }
      },
      countertop: {},
      desktop: {},
      resultTag: "succeed",
      resultMsg: "Run successfully"
    };
  }

  static isSmartLayoutContent(model: unknown): boolean {
    if (!(model instanceof HSCore.Model.Content)) {
      return false;
    }
    
    const targetSpace = HSApp.Util.Recommend.getTargetSpace(model);
    if (!targetSpace) {
      return false;
    }
    
    return HSApp.Util.Recommend.isRecommendAccessoriesAnchorContent(model);
  }

  static getDModelById(id: string): DModel | undefined {
    let foundModel: DModel | undefined;
    
    HSApp.App.getApp().floorplan.forEachContent((content: DModel) => {
      if (content.id === id) {
        foundModel = content;
      }
    });
    
    return foundModel;
  }
}