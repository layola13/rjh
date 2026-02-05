// @ts-nocheck
enum HomeGptStateEnum {
  None = 0,
  Running = 1,
  Finished = 2,
  AllFinished = 3,
}

interface RoomInfo {
  roomId: string;
  roomType: string;
  aera: number;
}

interface TemplateInfo {
  id: string;
  name: string;
  image: string;
  designId: string;
  customizedRoom: string;
}

interface LayoutInfo {
  layOutType: 'singleRoom' | 'whole';
  roomInfo: RoomInfo;
  templateInfo: TemplateInfo;
}

interface InputLayoutTemplates {
  layoutType: string;
  query: string;
  templates: unknown[];
}

interface ExternalParams {
  createUrl?: string;
  inputLayoutTemplates?: InputLayoutTemplates;
  outputCurrentLayout?: LayoutInfo | null;
  outputLayoutInfos?: LayoutInfo[] | null;
}

interface HomeGptAutomatedInfo {
  state: HomeGptStateEnum;
  resultJson: string;
  externalParams: ExternalParams;
  roomId: string;
  cameraMoveToRoom: () => void;
}

interface StylerTemplate {
  id: string;
  name: string;
  image: string;
  designId: string;
  customizedRoom: string;
}

interface Room {
  id: string;
  roomType: string;
  getArea(): number;
}

interface LayoutItem {
  room: Room | null;
  stylerTemplate: StylerTemplate;
}

declare global {
  interface Window {
    homeGptAutomatedInfo: HomeGptAutomatedInfo;
    getHomeGptState(): HomeGptStateEnum | undefined;
    getHomeGptResult(): string | undefined;
  }
}

const cameraMoveToRoom = (): void => {
  HSApp.App.getApp().switchPrimaryViewMode(HSApp.View.ViewModeEnum.OrbitView);
};

const isAICopilotTestEnabled: boolean = HSApp.Util.Url.getQueryStrings().AICopilotTest === 'true';

if (isAICopilotTestEnabled) {
  window.homeGptAutomatedInfo = {
    state: HomeGptStateEnum.None,
    resultJson: '',
    externalParams: {},
    roomId: '',
    cameraMoveToRoom,
  };
}

export function markAutomatedStart(): void {
  if (isAICopilotTestEnabled) {
    window.homeGptAutomatedInfo = {
      state: HomeGptStateEnum.None,
      resultJson: '',
      externalParams: {},
      roomId: '',
      cameraMoveToRoom,
    };
  }
}

export function markAutomatedInfo(state: HomeGptStateEnum, params: unknown): void {
  if (!isAICopilotTestEnabled) return;

  try {
    const resultJson = JSON.stringify({
      params,
      externalParams: window.homeGptAutomatedInfo?.externalParams,
    });

    window.homeGptAutomatedInfo = {
      ...window.homeGptAutomatedInfo,
      state,
      resultJson,
    };
  } catch (error) {
    console.error(error);
  }
}

export function markAutomatedCreateInfo(createUrl: string): void {
  if (!isAICopilotTestEnabled) return;

  const externalParams: ExternalParams = {
    createUrl,
  };

  window.homeGptAutomatedInfo = {
    ...window.homeGptAutomatedInfo,
    externalParams,
  };
}

export function markAutomatedMatchTemplate(
  layoutType: string,
  templates: unknown[],
  query: string
): void {
  if (!isAICopilotTestEnabled) return;

  try {
    if (window.homeGptAutomatedInfo.externalParams) {
      const externalParams = window.homeGptAutomatedInfo.externalParams;
      externalParams.inputLayoutTemplates = {
        layoutType,
        query,
        templates,
      };
      externalParams.outputCurrentLayout = null;
      externalParams.outputLayoutInfos = null;
    } else {
      window.homeGptAutomatedInfo.externalParams = {
        inputLayoutTemplates: {
          layoutType,
          query,
          templates,
        },
      };
    }
  } catch (error) {
    console.error(error);
  }
}

export function markAutomatedLayoutInfo(layoutItems: LayoutItem[]): void {
  if (!isAICopilotTestEnabled) return;

  try {
    const layoutInfos: LayoutInfo[] = [];

    layoutItems.forEach((layoutItem) => {
      const roomId = layoutItem.room ? layoutItem.room.id : 'whole';
      const roomType = layoutItem.room ? layoutItem.room.roomType : 'whole';

      let totalArea = 0;
      HSApp.App.getApp().floorplan.scene.activeLayer.forEachFloor((floor: { getArea(): number }) => {
        totalArea += floor.getArea();
      });

      layoutInfos.push({
        layOutType: layoutItem.room ? 'singleRoom' : 'whole',
        roomInfo: {
          roomId,
          roomType,
          aera: layoutItem.room ? layoutItem.room.getArea() : totalArea,
        },
        templateInfo: {
          id: layoutItem.stylerTemplate.id,
          name: layoutItem.stylerTemplate.name,
          image: layoutItem.stylerTemplate.image,
          designId: layoutItem.stylerTemplate.designId,
          customizedRoom: layoutItem.stylerTemplate.customizedRoom,
        },
      });
    });

    if (!window.homeGptAutomatedInfo.externalParams) {
      window.homeGptAutomatedInfo.externalParams = {
        outputCurrentLayout: layoutInfos[0],
        outputLayoutInfos: [...layoutInfos],
      };
      return;
    }

    const externalParams = window.homeGptAutomatedInfo.externalParams;
    if (externalParams.outputLayoutInfos) {
      externalParams.outputLayoutInfos.push(...layoutInfos);
    } else {
      externalParams.outputLayoutInfos = [...layoutInfos];
    }
    externalParams.outputCurrentLayout = layoutInfos[0];
  } catch (error) {
    console.error(error);
  }
}

export function markAutomatedRoomId(roomId: string): void {
  if (isAICopilotTestEnabled) {
    window.homeGptAutomatedInfo.roomId = roomId;
  }
}

window.getHomeGptState = function (): HomeGptStateEnum | undefined {
  return window.homeGptAutomatedInfo?.state;
};

window.getHomeGptResult = function (): string | undefined {
  return window.homeGptAutomatedInfo?.resultJson;
};

export { HomeGptStateEnum };