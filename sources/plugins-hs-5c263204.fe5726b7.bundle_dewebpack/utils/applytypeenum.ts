// @ts-nocheck
import { HSApp } from './HSApp';
import { HSCatalog } from './HSCatalog';
import { HSCore } from './HSCore';
import { NWTK } from './NWTK';

enum ToolInspirationGenerateEnum {
  All = "ToolInspirationGenerateAll",
  SoftDecoration = "ToolInspirationGenerateFurnishingLayout",
  HardDecoration = "ToolInspirationGenerateInteriorFinishLayout"
}

export enum ApplyTypeEnum {
  All = "all",
  SoftDecoration = "softDecoration",
  HardDecoration = "hardDecoration"
}

interface StylerTemplateInfo {
  room: HSCore.Model.Room;
  stylerTemplate: StylerTemplate;
}

interface StylerTemplate {
  id: string;
  roomId?: string;
  designId: string;
  apply: ApplyTypeEnum;
  contentType: {
    isTypeOf(type: HSCatalog.ContentTypeEnum): boolean;
  };
  customizedRoom: {
    roomType: HSCore.Model.RoomTypeEnum;
  };
}

interface RoomData {
  [key: string]: unknown;
}

interface ReplacedOpenings {
  [key: string]: unknown;
}

interface Materials {
  [key: string]: unknown;
}

interface Metas {
  [key: string]: unknown;
}

interface DesignData {
  roomData?: RoomData;
  replacedOpenings?: ReplacedOpenings;
  materials?: Materials;
  metas?: Metas;
  templateDesignId?: string;
  cabinetStyles?: unknown;
  version?: string;
}

interface CeilingAndFeatureWallData {
  ceilingAndFeatureWallData: Record<string, unknown>;
  featureWallIds: string[];
}

interface HSImportData {
  furnishingLayout: Record<string, unknown>;
  interiorFinishLayout: Record<string, unknown>;
}

interface AlgorithmResult {
  result: {
    furnishingLayout: Record<string, { statusCode: number }>;
    interiorFinishLayout: Record<string, unknown>;
  };
}

interface Storage {
  proxyObjectsMap?: Map<string, unknown>;
  redoData?: unknown;
}

export class CmdHomeGptSmartLayout extends HSApp.Cmd.Command {
  private _app: HSApp.App;
  private _storage: Storage;
  private _session?: HSApp.TransactionSession;
  private _wholeHouseFlag: boolean;
  private _infos: StylerTemplateInfo[];
  private _applyType: ApplyTypeEnum;
  private _completeCount: number;
  public existFailRooms?: boolean;
  public failRooms: string[];

  constructor(
    app: HSApp.App,
    applyType: ApplyTypeEnum,
    storage: Storage,
    infos: StylerTemplateInfo[]
  ) {
    super();
    this._app = app;
    this._applyType = applyType;
    this._storage = storage;
    this._infos = infos;
    this._wholeHouseFlag =
      infos.length === 1 &&
      !!infos[0].stylerTemplate.contentType.isTypeOf(
        HSCatalog.ContentTypeEnum.FullRoom
      );
    this._completeCount = 0;
    this.failRooms = [];
  }

  public onExecute(): void {
    this._session = this.context.transManager.startSession();
    if (this._wholeHouseFlag) {
      this.wholeHouseToDesign();
    } else {
      this._infos.forEach((info) => {
        this.applyRoomDesign(info);
      });
    }
  }

  private applyRoomDesign(info: StylerTemplateInfo): void {
    const roomType = info.room.roomType;
    const templateId = info.stylerTemplate.designId;
    const designId = HSApp.App.getApp().designMetadata.get("designId");
    const eventTrack = HSApp.Util.EventTrack.instance();
    const queryEnv = HSApp.Util.Url.getQueryStrings().env;
    const env = queryEnv || "shejijia";

    eventTrack.track(
      HSApp.Util.EventGroupEnum.Catalog,
      "import_styler_template_event",
      {
        designID: `${designId}`,
        roomType: `${roomType}`,
        templateId: templateId,
        env: env,
        timestamp: Date.now()
      }
    );

    HSApp.UI.FullScreenLoading.show(
      ResourceManager.getString("autostyler_importing")
    );
    this._addToDesign(info);
  }

  private wholeHouseToDesign(): void {
    const roomTypes: HSCore.Model.RoomTypeEnum[] = [];
    Object.values(this._app.floorplan.rooms).forEach((room) => {
      if (room.roomType) {
        roomTypes.push(room.roomType);
      }
    });

    if (this._infos.length === 0) {
      this.layoutFailed(
        ResourceManager.getString("livehint_autotyler_apply_design_noroomtype")
      );
      return;
    }

    const templateId = this._infos[0].stylerTemplate.designId;
    const designId = HSApp.App.getApp().designMetadata.get("designId");
    const eventTrack = HSApp.Util.EventTrack.instance();
    const queryEnv = HSApp.Util.Url.getQueryStrings().env;
    const env = queryEnv || "shejijia";

    eventTrack.track(
      HSApp.Util.EventGroupEnum.Catalog,
      "import_styler_template_event",
      {
        designID: `${designId}`,
        roomType: `${roomTypes}`,
        templateId: templateId,
        env: env,
        timestamp: Date.now()
      }
    );

    HSApp.UI.FullScreenLoading.show(
      ResourceManager.getString("autostyler_importing")
    );
    this._addToDesign(this._infos[0]);
  }

  private async _addToDesign(info: StylerTemplateInfo): Promise<void> {
    const stylerTemplate = info.stylerTemplate;
    const templateRoomId = stylerTemplate.id;
    const roomId = stylerTemplate.roomId ? stylerTemplate.roomId : "";
    let roomMapping: Array<{ templateRoom: HSCore.Model.Room; designRoom: StylerTemplate }> | null = null;
    let designRoom: HSCore.Model.Room | undefined = undefined;

    if (!this._wholeHouseFlag) {
      roomMapping = [
        {
          templateRoom: info.room,
          designRoom: stylerTemplate
        }
      ];
      designRoom = info.room;
    }

    try {
      const middleDataJsonUrl = await NWTK.mtop.TemplateRoom.getTemplateDesignMiddleDataJsonUrl({
        data: { roomId: templateRoomId }
      }).then((response) => response.data.result);

      const customRoomType = stylerTemplate.customizedRoom.roomType;

      if (this._getBathroomTypes().includes(customRoomType)) {
        this._applyToDesignV2(info, middleDataJsonUrl, roomId);
      } else {
        const algorithmData = await HSApp.Util.TemplateDesignUtil.getAlgorithmSoftDecorationData(
          templateRoomId,
          designRoom,
          middleDataJsonUrl,
          roomId
        );
        const autostylerData = await HSApp.Util.ImportUtil.getNewAutostylerData(
          templateRoomId,
          roomMapping,
          stylerTemplate,
          algorithmData,
          middleDataJsonUrl
        );
        await this._applyToDesign(info, autostylerData, algorithmData);
      }
    } catch (error) {
      this.layoutFailed(
        ResourceManager.getString("livehint_autotyler_apply_design_failed")
      );
    }
  }

  private async _applyToDesign(
    info: StylerTemplateInfo,
    designData: DesignData,
    algorithmData: unknown
  ): Promise<unknown> {
    const roomData = designData.roomData ?? {};
    const replacedOpenings = designData.replacedOpenings ?? {};
    const materials = designData.materials ?? {};
    const metas = designData.metas ?? {};
    const templateDesignId = designData.templateDesignId ?? "";

    if (Object.keys(roomData).length === 0) {
      this.layoutFailed(null, info.room?.id);
      return;
    }

    let ceilingWallData: CeilingAndFeatureWallData = {
      ceilingAndFeatureWallData: {},
      featureWallIds: []
    };

    const metaData = metas;
    const roomKeys = Object.keys(roomData) || [];

    try {
      ceilingWallData = HSApp.Util.ImportUtil.handleCeilingAndFeatureWallData(
        roomKeys,
        roomData
      );
    } catch (error) {
      // Handle error silently
    }

    const seekIds = HSApp.Util.ImportUtil.collectSeekIds(
      info.stylerTemplate.apply,
      algorithmData,
      ceilingWallData,
      replacedOpenings,
      metaData
    );

    await HSApp.Util.ImportUtil.getProductBySeekIds(seekIds, metaData);

    const provider = new HSApp.Util.SudaDefaultProvider(info.stylerTemplate);
    const importPromise = provider.importToFloorplan(
      roomData,
      metas,
      this._wholeHouseFlag,
      replacedOpenings,
      materials,
      info.room,
      templateDesignId,
      algorithmData,
      metaData || {},
      ceilingWallData.ceilingAndFeatureWallData,
      designData.cabinetStyles,
      designData.version,
      undefined,
      undefined
    );

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.AutoStyler,
      "apply_styler_template_event",
      { sampleRoomID: templateDesignId }
    );

    return importPromise
      .then(() => {
        this._storage.proxyObjectsMap = provider.proxyObjectsMap;
        this.layoutTerminate();
      })
      .catch(() => {
        this.layoutFailed(null, info.room?.id);
      });
  }

  private _getBathroomTypes(): HSCore.Model.RoomTypeEnum[] {
    return [
      HSCore.Model.RoomTypeEnum.Bathroom,
      HSCore.Model.RoomTypeEnum.MasterBathroom,
      HSCore.Model.RoomTypeEnum.SecondBathroom,
      HSCore.Model.RoomTypeEnum.BathroomDryArea
    ];
  }

  private _isRoomTypeMatched(
    sourceRoomType: HSCore.Model.RoomTypeEnum,
    targetRoomType: HSCore.Model.RoomTypeEnum
  ): boolean {
    switch (sourceRoomType) {
      case HSCore.Model.RoomTypeEnum.BathroomDryArea:
        return sourceRoomType === targetRoomType;
      case HSCore.Model.RoomTypeEnum.Bathroom:
      case HSCore.Model.RoomTypeEnum.MasterBathroom:
      case HSCore.Model.RoomTypeEnum.SecondBathroom:
        return [
          HSCore.Model.RoomTypeEnum.Bathroom,
          HSCore.Model.RoomTypeEnum.MasterBathroom,
          HSCore.Model.RoomTypeEnum.SecondBathroom
        ].includes(targetRoomType);
      default:
        return false;
    }
  }

  private _getHSImportData(data?: { 
    furnishingLayout: Record<string, unknown>; 
    interiorFinishLayout: Record<string, unknown> 
  }): HSImportData | undefined {
    if (!data) {
      return undefined;
    }

    const result: HSImportData = {
      furnishingLayout: {},
      interiorFinishLayout: {}
    };

    switch (this._applyType) {
      case ApplyTypeEnum.SoftDecoration:
        result.furnishingLayout = data.furnishingLayout;
        result.interiorFinishLayout = {};
        break;
      case ApplyTypeEnum.HardDecoration:
        result.furnishingLayout = {};
        result.interiorFinishLayout = data.interiorFinishLayout;
        break;
      case ApplyTypeEnum.All:
        result.furnishingLayout = data.furnishingLayout;
        result.interiorFinishLayout = data.interiorFinishLayout;
        break;
    }

    return result;
  }

  private _isValidFurnishingLayout(
    furnishingLayout: Record<string, { statusCode: number }>,
    info: StylerTemplateInfo
  ): boolean {
    const errorCodeEnum = HSApp.Util.HSImportErrorCodeEnum;
    const validResults = Object.values(furnishingLayout).map((layout) => {
      const statusCode = layout.statusCode;

      if (statusCode === errorCodeEnum.Success) {
        return true;
      }

      const errorRange = [
        errorCodeEnum.AlgFurnitureLoss - errorCodeEnum.AlgSuccess,
        errorCodeEnum.AlgSampleUnsupportedVersion - errorCodeEnum.AlgSuccess
      ];

      if (statusCode >= errorRange[0] && statusCode <= errorRange[1]) {
        const errorMessage = ResourceManager.getString(
          `hs_import_alg_tip_${statusCode}`
        );
        this.layoutFailed(errorMessage, info.room?.id);
      }

      return false;
    });

    return validResults.filter((result) => !!result).length > 0;
  }

  private async _applyToDesignV2(
    info: StylerTemplateInfo,
    middleDataJsonUrl: string,
    roomId: string
  ): Promise<void> {
    if (this._wholeHouseFlag) {
      return;
    }

    const templateRoomType = info.stylerTemplate.customizedRoom.roomType;
    if (!this._isRoomTypeMatched(info.room.roomType, templateRoomType)) {
      this.layoutFailed(null, info.room?.id);
      return;
    }

    try {
      const applyType = info.stylerTemplate.apply;
      let generateType: ToolInspirationGenerateEnum;

      switch (applyType) {
        case ApplyTypeEnum.SoftDecoration:
          generateType = ToolInspirationGenerateEnum.SoftDecoration;
          break;
        case ApplyTypeEnum.HardDecoration:
          generateType = ToolInspirationGenerateEnum.HardDecoration;
          break;
        case ApplyTypeEnum.All:
        default:
          generateType = ToolInspirationGenerateEnum.All;
          break;
      }

      const algorithmResult = await HSApp.Util.TemplateDesignUtil.getAlgorithmSoftDecorationDataV2(
        info.room,
        middleDataJsonUrl,
        roomId,
        generateType
      );

      const resultData = algorithmResult?.result;
      const importData = this._getHSImportData(resultData);

      if (!importData || !this._isValidFurnishingLayout(resultData.furnishingLayout, info)) {
        this.layoutFailed(null, info.room?.id);
        return;
      }

      const provider = new HSApp.Util.HomeStylerImportProvider(info.stylerTemplate);
      await provider.cleanHouse(this._wholeHouseFlag, info.room);
      await provider.import(importData);

      this.layoutTerminate();
    } catch (error) {
      this.layoutFailed(
        `${info.room.roomTypeDisplayName} ${ResourceManager.getString("livehint_autotyler_apply_design_failed")}`,
        info.room?.id
      );
    }
  }

  public layoutFailed(errorMessage?: string | null, roomId?: string): void {
    this.existFailRooms = true;

    if (roomId) {
      if (!this.failRooms.includes(roomId)) {
        this.failRooms.push(roomId);
      }
    } else {
      this._infos.forEach((info) => {
        if (info.room) {
          this.failRooms.push(info.room.id);
        }
      });
    }

    this.layoutTerminate();
  }

  public layoutTerminate(): void {
    this._completeCount++;

    if (this._completeCount < this._infos.length) {
      return;
    }

    if (this._wholeHouseFlag) {
      this._storage.redoData = HSApp.Util.ImportUtil.collectRestoreData([]);
    } else {
      const roomIds = this._infos.map((info) => info.room.id);
      this._storage.redoData = HSApp.Util.ImportUtil.collectRestoreData(roomIds);
    }

    if (this._session) {
      this._session.end();
    }

    if (HSApp.UI.FullScreenLoading.isShowing()) {
      HSApp.UI.FullScreenLoading.hide();
    }

    this.mgr.complete(this);
  }
}