import { HSCore } from './HSCore';
import { convertAreaToSettingUnit, shuffleArray, trackLog, getRoomLists, unitMapToSquareUnit } from './utils';
import { markAutomatedCreateInfo } from './automatedCreate';
import { BaseOperation, OperationId } from './BaseOperation';

interface FloorPlanParams {
  subType: string;
  area: number;
  Bedroom: number;
  LivingRoom: number;
  Bathroom: number;
  isAreaExitUnit?: boolean;
}

interface FloorPlanExecuteContext {
  params: FloorPlanParams;
  reply: string;
  isFuncDone: boolean;
  result?: FloorPlanResult;
  recommendedOperationTypes?: string[];
}

interface FloorPlanResult {
  actionType: 'cancel' | 'create' | 'ok';
  thumbnailUrl?: string;
  designJsonUrl?: string;
  area?: number | string;
}

interface TemplateDesign {
  thumbnailUrl: string;
  designJsonUrl: string;
  area: number | string;
}

interface BlockOptionConfig {
  type: 'blockOption';
  options: Array<{ label: string; value: string }>;
  value: string | undefined;
  onClick: (value: string) => void;
}

interface SelectionOption {
  index: number;
  label: string;
}

interface RoomCount {
  bedroomNum: number;
  livingroomNum: number;
  bathroomNum: number;
}

interface SearchDesignsParams {
  k: number;
  area: number;
  bedroomNum: number;
  livingroomNum: number;
  bathroomNum: number;
}

interface PersistencePlugin {
  signalSaveCancel: {
    listen(callback: (data: unknown) => void): void;
    unlisten(callback: (data: unknown) => void): void;
  };
  save(arg1: boolean, arg2: boolean, arg3: boolean): Promise<void>;
}

interface ConstraintLayoutPlugin {
  handleSearchDesigns(params: SearchDesignsParams): Promise<TemplateDesign[]>;
}

export class OpCreateFloorPlan extends BaseOperation {
  private _templateDesign: TemplateDesign[];
  private _templateIndex: number;

  constructor() {
    super();
    this._templateDesign = [];
    this._templateIndex = 0;
  }

  static getId(): OperationId {
    return OperationId.CreateFloorplan;
  }

  static getType(): string {
    return 'Template';
  }

  onExecute(context: FloorPlanExecuteContext): void {
    const { subType, area, Bedroom, LivingRoom, Bathroom } = context.params;
    const currentType = OpCreateFloorPlan.getType();

    if (subType !== currentType || (subType === currentType && area === 0 && Bedroom === 0 && LivingRoom === 0 && Bathroom === 0)) {
      this.onFinish('success', context.reply, context);
    } else {
      context.isFuncDone = true;
      if (this.checkCommandSupport()) {
        this.createFloorPlanProcess(context);
      } else {
        this.onFinish('success', ResourceManager.getString('homegpt_create_floor_plan_env_tip'), context);
      }
    }
  }

  private createFloorPlanProcess(context: FloorPlanExecuteContext): void {
    const { area, Bedroom, LivingRoom, Bathroom, isAreaExitUnit } = context.params;
    let adjustedArea = area;
    const displayAreaUnit = this.app.floorplan.displayAreaUnit;

    if (!isAreaExitUnit && displayAreaUnit !== HSCore.Util.Unit.LengthUnitTypeEnum.meter) {
      adjustedArea = convertAreaToSettingUnit(area, displayAreaUnit);
    }

    const queryStrings = HSApp.Util.Url.getQueryStrings();
    const constraintLayoutPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.ConstraintLayout) as ConstraintLayoutPlugin;

    constraintLayoutPlugin
      .handleSearchDesigns({
        k: 20,
        area: adjustedArea < 1 ? 40 * Bedroom : adjustedArea,
        bedroomNum: Bedroom,
        livingroomNum: LivingRoom,
        bathroomNum: Bathroom,
      })
      .then((designs: TemplateDesign[]) => {
        const maxDesigns = queryStrings.AICopilotTest === 'true' ? 20 : 8;
        this._templateDesign = shuffleArray(designs.slice(0, maxDesigns));
      })
      .catch(() => {
        this.errorMessage(context);
      })
      .then(() => {
        if (this._templateDesign.length > 1) {
          this.createFloorPlanMessage(context);
        } else {
          this.createFloorPlanAction(context);
        }
      });
  }

  private createFloorPlanMessage(context: FloorPlanExecuteContext): void {
    const selectionOptions: SelectionOption[] = [
      {
        index: 1,
        label: ResourceManager.getString('homegpt_create_room_recreate'),
      },
      {
        index: 0,
        label: ResourceManager.getString('plugin_cadunderlay_mld_cancel'),
      },
    ];

    const blockOptionConfig: BlockOptionConfig = {
      type: 'blockOption',
      options: this._templateDesign.map((design) => ({
        label: design.thumbnailUrl,
        value: design.thumbnailUrl,
      })),
      value: this._templateDesign[this._templateIndex]?.thumbnailUrl,
      onClick: (selectedValue: string) => {
        this._templateIndex = this._templateDesign.findIndex((design) => design.thumbnailUrl === selectedValue);
      },
    };

    this.onQuerySelection(
      ResourceManager.getString('homegpt_create_floor_plan_choose_tip'),
      selectionOptions,
      (selectedIndex: number) => {
        if (selectedIndex === 1) {
          this.createFloorPlanAction(context);
        } else {
          context.result = { actionType: 'cancel' };
          this.onFinish('success', ResourceManager.getString('homegpt_create_room_save_cancel'), context);
          trackLog('Home.Copilot.CreateFloorPlan.Cancel', '点击取消创建户型');
        }
      },
      blockOptionConfig
    );
  }

  private createFloorPlanAction(context: FloorPlanExecuteContext): void {
    const hasExistingDesign = this.app.designMetadata.get('designId') || getRoomLists().length > 0;

    if (hasExistingDesign) {
      this.onProcess(ResourceManager.getString('homegpt_create_floor_plan_save_current_design'));
      const persistencePlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence) as PersistencePlugin;

      const saveCancelHandler = (data: unknown): void => {
        persistencePlugin.signalSaveCancel.unlisten(saveCancelHandler);
        this.onFinish('fail', ResourceManager.getString('userStrings_saveEtext'), context);
      };

      persistencePlugin.signalSaveCancel.listen(saveCancelHandler);
      persistencePlugin.save(false, true, true).then(() => {
        persistencePlugin.signalSaveCancel.unlisten(saveCancelHandler);
        context.result = { actionType: 'create' };
        this.createFloorplan(context);
      });
    } else {
      context.result = { actionType: 'create' };
      this.createFloorplan(context);
    }
  }

  private async createFloorplan(context: FloorPlanExecuteContext): Promise<void> {
    const selectedDesign = this._templateDesign[this._templateIndex];

    if (selectedDesign?.designJsonUrl?.startsWith('http')) {
      try {
        markAutomatedCreateInfo(selectedDesign.designJsonUrl);
        this.onProcess(ResourceManager.getString('homegpt_create_floor_plan_doing'));

        const designJsonData = await NWTK.ajax.get(selectedDesign.designJsonUrl, {
          dataType: 'text',
        });

        const newUrl = HSApp.Util.Url.replaceParamsInUrl({ assetId: '' });
        HSApp.Util.Url.addWindowHistoryState('assetId', '', newUrl);

        const designData = JSON.parse(designJsonData as string);
        await this.app.openDocument(designData);

        const persistencePlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence) as PersistencePlugin;
        await persistencePlugin.save(false, true, true);

        this.successMessage(selectedDesign, context);
      } catch (error) {
        this.errorMessage(context);
      }
    } else {
      this.errorMessage(context);
    }

    trackLog('Home.Copilot.CreateFloorPlan.Confirm', '点击创建户型', {
      floorInfo: selectedDesign,
    });
  }

  private successMessage(design: TemplateDesign, context: FloorPlanExecuteContext): void {
    const recommendedOperationTypes = OpCreateFloorPlan.getRecommendedOperationTypes(OpCreateFloorPlan.getId());
    context.recommendedOperationTypes = recommendedOperationTypes;

    const successMessage = this.getSuccessMsg(design.area);
    context.result = { ...design, actionType: 'ok' };
    this.onFinish('success', successMessage, context);
  }

  private getSuccessMsg(area: number | string): string {
    const { bedroomNum, livingroomNum, bathroomNum } = this.rectifyRoomsCount();
    const formattedArea = typeof area === 'string' ? parseFloat(area).toFixed(2) : area.toFixed(2);
    const areaWithUnit = unitMapToSquareUnit(Number.parseFloat(formattedArea), this.app.floorplan.displayAreaUnit);

    let message = ResourceManager.getString('homegpt_create_floor_plan_success').replace(/{AreaPlaceholder}/g, areaWithUnit);

    if (bedroomNum > 0) {
      message += ResourceManager.getString('homegpt_create_floor_plan_success_bedRoom_num').replace(/{BedroomNumPlaceholder}/g, String(bedroomNum));
    }

    if (livingroomNum > 0) {
      message += ResourceManager.getString('homegpt_create_floor_plan_success_livingRoom_num').replace(/{LivingroomNumPlaceholder}/g, String(livingroomNum));
    }

    if (bathroomNum > 0) {
      message += ResourceManager.getString('homegpt_create_floor_plan_success_BathbedRoom_num').replace(/{BathroomNumPlaceholder}/g, String(bathroomNum));
    }

    return message.substring(0, message.length - 1) + ResourceManager.getString('size_limit_content_3');
  }

  private errorMessage(context: FloorPlanExecuteContext): void {
    this.onFinish('fail', ResourceManager.getString('homegpt_create_floor_plan_fail'), context);
  }

  private rectifyRoomsCount(): RoomCount {
    let bedroomNum = 0;
    let livingroomNum = 0;
    let bathroomNum = 0;

    this.app.floorplan.scene.activeLayer.forEachFloor((floor: unknown) => {
      const roomType = (floor as { roomType: HSCore.Model.RoomTypeEnum }).roomType;

      switch (roomType) {
        case HSCore.Model.RoomTypeEnum.LivingDiningRoom:
        case HSCore.Model.RoomTypeEnum.LivingRoom:
          livingroomNum++;
          break;
        case HSCore.Model.RoomTypeEnum.Bedroom:
        case HSCore.Model.RoomTypeEnum.MasterBedroom:
        case HSCore.Model.RoomTypeEnum.SecondBedroom:
          bedroomNum++;
          break;
        case HSCore.Model.RoomTypeEnum.Bathroom:
        case HSCore.Model.RoomTypeEnum.MasterBathroom:
        case HSCore.Model.RoomTypeEnum.SecondBathroom:
          bathroomNum++;
          break;
      }
    });

    return { bedroomNum, livingroomNum, bathroomNum };
  }
}