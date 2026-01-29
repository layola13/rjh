import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { ApplyLayoutRequest } from './ApplyLayoutRequest';
import { ApplyMaterialToFacesWithoutMixpaintRequest } from './ApplyMaterialToFacesWithoutMixpaintRequest';
import { ApplyMoodBoardLayoutRequest } from './ApplyMoodBoardLayoutRequest';
import { ConstraintLayout, getFloorRoomTypes, RoomExtractor, ConstraintLayoutApi, destructureRoomId, ContentGroupConstraintObject } from './ConstraintLayout';
import { ContentUtils } from './ContentUtils';
import { getContentsInfoInRoom, determineRoomType } from './RoomTypeUtils';
import { Handler, LogUtil } from './Handler';
import { Loop } from './Loop';
import { CmdApplyMoodBoardLayout } from './CmdApplyMoodBoardLayout';

interface ConstraintLayoutSignalPayload {
  action: string;
  payload: {
    floor?: HSCore.Model.Floor;
    message?: string;
    k?: number;
    area?: number;
    bedroomNum?: number;
    livingroomNum?: number;
    bathroomNum?: number;
    excludedRegion?: unknown;
    [key: string]: unknown;
  };
}

interface DesignSearchResult {
  searchType: string;
  area: number;
  bathroomNum: number;
  bedroomNum: number;
  livingroomNum: number;
  designJsonUrl: string;
  thumbnailUrl: string;
}

interface RoomTypeEstimation {
  floor: HSCore.Model.Floor;
  estimatedRoomType: string;
}

interface ApplyRoomPayload {
  floor: HSCore.Model.Floor;
  id: string;
}

interface PlaceContentsPayload {
  floor: HSCore.Model.Floor;
  options: {
    seekIds?: string[];
    notClearExists?: boolean;
  };
}

interface SearchOptions {
  roomTypes: string[];
  strictMode: boolean;
  completeLayout: boolean;
  origin: 'global' | 'domestic';
}

interface ContentReplaceResult {
  seekIdMap: Map<string, string>;
  seekIdMaterialMap: Map<string, unknown>;
}

interface FakeContentInstance {
  content: HSCore.Model.Content;
}

interface TemplateApplicationOptions {
  targetFloor: HSCore.Model.Floor;
  designId: string;
  floorId: string;
}

export class ConstraintLayoutPlugin extends HSApp.Plugin.IPlugin {
  private app: HSApp.App | undefined;
  private signalHook: HSCore.Util.SignalHook;
  private signal: HSCore.Util.Signal;
  private transManager: HSApp.TransactionManager | undefined;
  private constraintLayout: ConstraintLayout;
  private _handler: Handler | undefined;

  constructor() {
    super({
      name: 'Constraint Layout plugin',
      description: 'Solve the layout problem with search and constraints',
      dependencies: []
    });

    this.signalHook = new HSCore.Util.SignalHook();
    this.signal = new HSCore.Util.Signal();
    this.constraintLayout = new ConstraintLayout(undefined);
    this.signalHook.listen(this.signal, this.handleConstraintLayoutSignal);
    this.transManager = HSApp.App.getApp().transManager;
    this._handler = new Handler();
  }

  get typeOfCompletion(): string {
    return this.constraintLayout.typeOfCompletion;
  }

  private handleConstraintLayoutSignal = async (signalData: { data: ConstraintLayoutSignalPayload }): Promise<void> => {
    const { action, payload } = signalData.data;

    if (payload.floor instanceof HSCore.Model.Floor) {
      this.constraintLayout.targetFloor = payload.floor;
    }

    switch (action) {
      case 'constraint_layout_input_apply_rooms':
        await this.handleApplyRooms(payload as unknown as ApplyRoomPayload[])
          .then(() => {
            this.signal.dispatch({
              action: 'constraint_layout_output_on_success',
              payload: { message: '布局成功' }
            });
          })
          .catch((error: Error) => {
            this.signal.dispatch({
              action: 'constraint_layout_output_on_error',
              payload: { message: error.toString() }
            });
          });
        break;

      case 'constraint_layout_input_place_contents':
        await this.handlePlaceContents(payload as unknown as PlaceContentsPayload[])
          .then(() => {
            this.signal.dispatch({
              action: 'constraint_layout_output_on_success',
              payload: { message: '布局成功' }
            });
          })
          .catch((error: Error) => {
            this.signal.dispatch({
              action: 'constraint_layout_output_on_error',
              payload: { message: error.toString() }
            });
          });
        break;

      case 'constraint_layout_input_search_designs':
        await this.handleSearchDesigns(payload);
        break;

      case 'constraint_layout_input_estimate_room_type':
        await this.handleEstimateRoomType(payload as unknown as ApplyRoomPayload[]);
        break;

      default:
        break;
    }
  };

  private async handleApplyRooms(payloads: ApplyRoomPayload[]): Promise<(void | string)[]> {
    const promises = payloads.map(({ floor }) => {
      const processFloor = async (): Promise<void | string> => {
        try {
          const layoutInstance = new ConstraintLayout(floor);
          const searchOptions: SearchOptions = {
            roomTypes: getFloorRoomTypes(floor),
            strictMode: true,
            completeLayout: false,
            origin: HSApp.Config.TENANT === 'fp' ? 'global' : 'domestic'
          };

          await layoutInstance.search(floor, searchOptions);
          const applyResult = await layoutInstance.apply(0, 'full');
          const { targetCOs, roomEntityObject } = applyResult;

          const allContents = targetCOs
            .map((co) => {
              if (co instanceof ContentGroupConstraintObject) {
                return co.children.map((child) => child.targetContent || child.content);
              }
              return [co.targetContent || co.content];
            })
            .flat();

          const replaceResult: ContentReplaceResult = await ContentUtils.replaceContentsOrMaterial(allContents, layoutInstance);
          const { seekIdMap, seekIdMaterialMap } = replaceResult;

          const fakeContentInstances: FakeContentInstance[] = await ContentUtils.instantiateFakeContents(allContents, seekIdMap);

          await Promise.all(
            fakeContentInstances.map(async (instance) => {
              const material = seekIdMaterialMap.get(instance.content?.seekId);
              if (material) {
                await ContentUtils.replaceMainMaterial(instance.content, material);
              }
            })
          );

          await this.constraintLayout.postProcess(fakeContentInstances, targetCOs, roomEntityObject);
          await this._postProcess(
            fakeContentInstances.map((instance) => instance.content),
            layoutInstance
          );

          return undefined;
        } catch (error) {
          return floor.id;
        }
      };

      return processFloor();
    });

    return Promise.all(promises);
  }

  private async _postProcess(contents: HSCore.Model.Content[], layoutInstance: ConstraintLayout): Promise<void> {
    const targetFloor = layoutInstance.targetFloor;
    const parentLayer = targetFloor.getUniqueParent();

    contents.forEach((content) => {
      const isOutsideFloor = layoutInstance.targetFloor && !content.isContentInRoom(layoutInstance.targetFloor);
      const exceedsHeight = parentLayer && content.z + content.ZSize > parentLayer.height;

      if (isOutsideFloor || exceedsHeight) {
        HSCore.Util.Content.removeContent(content);
      }
    });
  }

  private async handleSearchDesigns(payload: ConstraintLayoutSignalPayload['payload']): Promise<DesignSearchResult[]> {
    const { k, area, bedroomNum, livingroomNum, bathroomNum, excludedRegion } = payload;

    const apiResults = await ConstraintLayoutApi.designSearch({
      k,
      area,
      bedroomNum,
      livingroomNum,
      bathroomNum,
      excludedRegion
    });

    return apiResults.map((result: any) => ({
      searchType: result.search_type,
      area: result.area,
      bathroomNum: result.bathroomnum,
      bedroomNum: result.bedroomnum,
      livingroomNum: result.livingroomnum,
      designJsonUrl: result.design_url,
      thumbnailUrl: result.thumbnail_url
    }));
  }

  private async handleEstimateRoomType(payloads: ApplyRoomPayload[]): Promise<RoomTypeEstimation[]> {
    const results: RoomTypeEstimation[] = [];

    for (const { floor } of payloads) {
      const contentsInfo = getContentsInfoInRoom(floor);
      let estimatedType = '';

      if (contentsInfo.length >= 3) {
        estimatedType = determineRoomType(contentsInfo);
      }

      if (!estimatedType) {
        const extractor = new RoomExtractor(floor, { floorPolygonWKT: true });
        const floorPolygonWKT = extractor.extractRoom()[0].floorPolygonWKT;

        const apiResponse = await ConstraintLayoutApi.estimateRoomType({
          floorOuterWKT: floorPolygonWKT,
          source: 'domestic'
        });

        const roomId = apiResponse[0]?.room_id;
        if (roomId) {
          estimatedType = destructureRoomId(roomId).roomType;
        }
      }

      results.push({
        floor,
        estimatedRoomType: estimatedType
      });
    }

    return results;
  }

  private async handlePlaceContents(payloads: PlaceContentsPayload[]): Promise<void[]> {
    const promises = payloads.map(({ floor, options }) => {
      const processPlacement = async (): Promise<void> => {
        const { seekIds, notClearExists } = options;

        if (!notClearExists) {
          const parentLayer = floor.getUniqueParent();
          if (parentLayer instanceof HSCore.Model.Layer) {
            const existingContents: HSCore.Model.Content[] = [];
            parentLayer.forEachContent((content: HSCore.Model.Content) => {
              if (content.isContentInRoom(floor)) {
                existingContents.push(content);
              }
            });
            existingContents.forEach((content) => HSCore.Util.Content.removeContent(content));
          }
        }

        if (!seekIds?.length) {
          return;
        }

        const centroid = new Loop(floor.worldRawPath2d.outer).getCentroidPoint();
        const contentPositions = seekIds.map((seekId) => ({
          seekId,
          position: {
            x: centroid.x,
            y: centroid.y,
            z: 0
          }
        }));

        await ContentUtils.addContentsToFloor(contentPositions);
      };

      return processPlacement();
    });

    return Promise.all(promises);
  }

  unListenFloorSignals(): void {
    this.signalHook?.unlistenAll();
    this.signalHook?.dispose();
    this.signalHook = undefined as any;
  }

  dispose(): void {
    this.unListenFloorSignals();
  }

  onActive(pluginContext: HSApp.Plugin.PluginContext, options: unknown): void {
    super.onActive(pluginContext, options);
    this.app = pluginContext.app;
    this.registerCommands();
    this.registerRequests();
    this._handler?.init(pluginContext);
  }

  private registerCommands(): void {
    this.app?.cmdManager.register([
      [HSFPConstants.CommandType.ApplyMoodBoardLayout, CmdApplyMoodBoardLayout]
    ]);
  }

  private registerRequests(): void {
    this.app?.transManager.register([
      [HSFPConstants.RequestType.ConstraintLayout.ApplyLayout, ApplyLayoutRequest],
      [HSFPConstants.RequestType.ConstraintLayout.ApplyMaterialToFacesWithoutMixpaint, ApplyMaterialToFacesWithoutMixpaintRequest],
      [HSFPConstants.RequestType.ConstraintLayout.ApplyMoodBoardLayout, ApplyMoodBoardLayoutRequest]
    ]);
  }

  async applyTemplateToWholeHouse(template: unknown, clearExisting: boolean = true, strictMode: boolean = false): Promise<unknown> {
    return this._handler!.applyTemplateToWholeHouse(template, clearExisting, strictMode);
  }

  async applyTemplateToSingleRoom(options: TemplateApplicationOptions): Promise<unknown> {
    const result = await this._handler!.applyTemplateToSingleRoom(options);

    LogUtil.info({
      argInfo: {
        name: 'apply success or not',
        applySuccess: !!result,
        targetId: options.targetFloor.id,
        targetType: options.targetFloor.roomType,
        targetArea: options.targetFloor.getArea(),
        templateDesignId: options.designId,
        templateFloorId: options.floorId
      }
    });

    return result;
  }

  isSupportableRoomType(roomType: string, designId: string, checkStrict: boolean = true): boolean {
    return this._handler!.isSupportableRoomType(roomType, designId, checkStrict);
  }

  getUseConstraintLayoutFlag(): boolean {
    return this._handler!.useConstraintLayoutForInspiration;
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.ConstraintLayout, ConstraintLayoutPlugin);