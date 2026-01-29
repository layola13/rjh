import { HSCatalog } from './HSCatalog';
import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { HSConstants } from './HSConstants';
import { executeCmd } from './executeCmd';

interface CatalogHelperConfig {
  app: any;
  catalogPlugin: CatalogPlugin;
}

interface CatalogPlugin {
  signalItemMouseOver: Signal<CatalogItemEvent>;
  signalItemMouseOut: Signal<void>;
  signalItemClicked: Signal<CatalogItemEvent>;
}

interface Signal<T> {
  listen(handler: (data: T) => void): void;
  unlisten(handler: (data: T) => void): void;
  dispatch(data?: T): void;
}

interface CatalogItemEvent {
  data?: MaterialMetaData;
  event?: any;
}

interface MaterialMetaData {
  seekId: string;
  iconSmallURI: string;
  productType: string;
  contentType: ContentType;
  templateData?: any;
}

interface ContentType {
  isTypeOf(type: string): boolean;
}

interface Handler {
  isEditMaterial: boolean;
  isEditSeamMaterial: boolean;
  entity?: Entity;
  cmdMgr: CommandManager;
  contextualToolsPlugin: any;
  faceType?: string;
  signalTextureLoadSuccess: any;
  catalogPlugin: CatalogPlugin;
  onSeamParamsChanged(params: { metaData: MaterialMetaData }): void;
  updateCeilingMaterialMeta(): void;
}

interface Entity {
  ID: string;
  faceList?: Face[];
  instanceOf(className: string): boolean;
  contentType?: ContentType;
  getUniqueParent?(): Entity | null;
}

interface Face extends Entity {
  getUniqueParent(): Entity | null;
}

interface CommandManager {
  current?: Command;
  createCommand(type: string, args?: any[]): Command;
  execute(command: Command): void;
  receive(message: string, data?: any): void;
  complete(command?: Command): void;
}

interface Command {
  type: string;
}

interface View3D {
  displayList: Record<string, DisplayItem>;
}

interface DisplayItem {
  startPreviewMaterial?(material: MaterialMetaData, shouldContinue: () => boolean): void;
  stopPreviewMaterial?(): void;
}

export class CatalogHelper {
  private handler: Handler;
  private app: any;
  private catalogPlugin: CatalogPlugin;
  private _isPreviewMaterial: boolean = false;
  private PaintCmdMessageEnum: any;
  private PatternUtil: any;
  private MixPaintUtil: any;

  constructor(config: CatalogHelperConfig) {
    this.handler = config as unknown as Handler;
    this.app = config.app;
    this.catalogPlugin = config.catalogPlugin;

    this.catalogPlugin.signalItemMouseOver.listen(this._onMaterialMouseEntered);
    this.catalogPlugin.signalItemMouseOut.listen(this._onMaterialMouseLeaved);
    this.catalogPlugin.signalItemClicked.listen(this._onCatalogItemClick);

    this.PaintCmdMessageEnum = HSApp.PaintPluginHelper.Enum.PaintCmdMessageEnum;
    this.PatternUtil = HSApp.PaintPluginHelper.Util.PatternUtil;
    this.MixPaintUtil = HSApp.PaintPluginHelper.Util.MixPaintUtil;
  }

  public dispose = (): void => {
    this.catalogPlugin.signalItemMouseOver.unlisten(this._onMaterialMouseEntered);
    this.catalogPlugin.signalItemMouseOut.unlisten(this._onMaterialMouseLeaved);
    this.catalogPlugin.signalItemClicked.unlisten(this._onCatalogItemClick);
  };

  private _onMaterialMouseEntered = (event: CatalogItemEvent): void => {
    const { isEditMaterial, entity } = this.handler;

    if (!isEditMaterial || !entity) {
      return;
    }

    const materialData = event.data;
    if (!materialData) {
      return;
    }

    const hasPattern = this.PatternUtil.getPatternTypeFromMaterial(materialData);
    const isParamPaintTemplate = materialData.productType === 'ParamPaintTemplate';
    const isKitchenCeilingNotCeiling =
      materialData.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.KitchenCeiling) &&
      !this._isCeiling(entity);

    if (hasPattern || isParamPaintTemplate || isKitchenCeilingNotCeiling) {
      return;
    }

    const view3D = this.app.getActive3DView() as View3D | null;
    if (!view3D) {
      return;
    }

    const entities = HSCore.Util.Entity.isStructureBody(entity)
      ? entity.faceList ?? []
      : [entity];

    this._isPreviewMaterial = true;

    entities.forEach((targetEntity: Entity) => {
      const displayItem = view3D.displayList[targetEntity.ID];
      if (displayItem?.startPreviewMaterial) {
        displayItem.startPreviewMaterial(materialData, () => this._isPreviewMaterial);
      }
    });
  };

  private _onMaterialMouseLeaved = (): void => {
    const { isEditMaterial, entity } = this.handler;

    if (!isEditMaterial || !entity) {
      return;
    }

    const view3D = this.app.getActive3DView() as View3D | null;
    if (!view3D) {
      return;
    }

    const entities = HSCore.Util.Entity.isStructureBody(entity)
      ? entity.faceList ?? []
      : [entity];

    this._isPreviewMaterial = false;

    entities.forEach((targetEntity: Entity) => {
      const displayItem = view3D.displayList[targetEntity.ID];
      if (displayItem?.stopPreviewMaterial) {
        displayItem.stopPreviewMaterial();
      }
    });
  };

  private _isCeiling = (entity: Entity): boolean => {
    if (!(entity instanceof HSCore.Model.Face)) {
      return false;
    }

    const parent = entity.getUniqueParent();
    if (!parent || !(parent instanceof HSCore.Model.Slab)) {
      return false;
    }

    return parent.getFaceType(entity) === HSCore.Model.WallFaceType.bottom;
  };

  private notNeedEnvironment = (): boolean => {
    const excludedEnvironments = [
      HSFPConstants.Environment.NCustomizedBackgroundWall,
      HSFPConstants.Environment.NCustomizedCeilingModel,
      HSFPConstants.Environment.NCustomizedPlatform,
    ];

    return excludedEnvironments.includes(this.app.activeEnvironmentId);
  };

  private _onCatalogItemClick = (event: CatalogItemEvent): void => {
    const app = this.app;

    if (this.notNeedEnvironment()) {
      return;
    }

    const {
      entity,
      cmdMgr,
      contextualToolsPlugin,
      faceType,
      signalTextureLoadSuccess,
      catalogPlugin,
    } = this.handler;

    if (
      entity instanceof HSCore.Model.NCustomizedParametricRoof ||
      entity instanceof HSApp.ExtraordinarySketch2d.InteractiveModel
    ) {
      return;
    }

    const materialData = event.data;
    if (!materialData) {
      return;
    }

    if (
      materialData.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedTiles) &&
      materialData.templateData &&
      this.handler.isEditMaterial
    ) {
      LiveHint.show(
        ResourceManager.getString('liveHint_not_pinhua'),
        2000,
        undefined,
        { canclose: false }
      );
      return;
    }

    if (materialData.contentType.isTypeOf(HSCatalog.ContentTypeEnum.MixPaintPlan)) {
      this._onClickMixPaintPlan(materialData);
      return;
    }

    const materialManager = HSCore.Material.Manager.instance();
    if (!materialManager.getMetaData(materialData.seekId)) {
      materialManager.setMetaData(materialData);
    }

    const isValidMaterialType =
      materialData.productType === HSCatalog.ProductTypeEnum.Material ||
      materialData.productType === HSCatalog.ProductTypeEnum.ParamPaintTemplate;

    const isSpecialEntity =
      entity?.instanceOf(HSConstants.ModelClass.NgBeam) ||
      entity?.instanceOf(HSConstants.ModelClass.NgObstacle) ||
      entity?.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ext_Wainscot);

    const isSpecialEnvironment =
      app.activeEnvironmentId === 'contentmaterialreplace' ||
      app.activeEnvironmentId === HSFPConstants.Environment.MixPaint;

    const shouldProcess =
      isValidMaterialType &&
      !isSpecialEntity &&
      !isSpecialEnvironment &&
      (app.appSettings.svgColorModel === 0 || (app.switchTo3DView(), app.getActive3DView()));

    if (!shouldProcess) {
      return;
    }

    const currentCommand = cmdMgr.current;
    const moldingCommandTypes = [
      HSFPConstants.CommandType.ChangeMoldingTexture,
      HSFPConstants.CommandType.ChangeFaceMoldingTexture,
      HSFPConstants.CommandType.ApplyNCustomizedModelMoldingMaterial,
    ];

    if (currentCommand && moldingCommandTypes.includes(currentCommand.type)) {
      app.signalContextualtoolRefresh.dispatch();
      cmdMgr.complete();
      return;
    }

    if (materialData.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_all_seamfiller)) {
      if (this.handler.isEditSeamMaterial) {
        this.handler.onSeamParamsChanged({ metaData: materialData });
      }
      return;
    }

    if (!this.handler.isEditMaterial) {
      app.selectionManager.selected().forEach((selectedEntity: Entity) => {
        if (selectedEntity instanceof HSCore.Model.Face) {
          app.selectionManager.unselect(selectedEntity);
        }
      });
    }

    if (HSCore.Util.Entity.isStructureBody(entity)) {
      let faces = entity.faceList ?? [];

      if (entity instanceof HSCore.Model.NCustomizedStructure) {
        faces = faces.filter((face: Face) => {
          const excludedTypes = [
            HSCore.Model.StructureFaceType.top,
            HSCore.Model.StructureFaceType.bottom,
          ];
          return !excludedTypes.includes(entity.getFaceType(face));
        });
      }

      const command = cmdMgr.createCommand(
        HSFPConstants.CommandType.MixPaint.ReplaceFacesMaterial,
        [faces]
      );
      cmdMgr.execute(command);
      cmdMgr.receive(HSFPConstants.CommandMessage.Content, materialData);
      cmdMgr.complete(command);
      return;
    }

    if (this.MixPaintUtil.needConvertPattern(materialData)) {
      const params: any = { materialMeta: materialData };

      if (this.handler.isEditMaterial) {
        params.entity = entity;
        params.faceType = faceType;
        params.isEditMaterial = this.handler.isEditMaterial;
      }

      executeCmd(cmdMgr, HSFPConstants.CommandType.MixPaint.MixDecoration, params);

      if (this.handler.isEditMaterial) {
        cmdMgr.receive('click', params);
      } else {
        cmdMgr.receive('dragStart', {
          event,
          icon: materialData.iconSmallURI,
        });
      }
    } else {
      if (this.handler.isEditMaterial) {
        executeCmd(
          cmdMgr,
          HSFPConstants.CommandType.EditMaterial,
          entity,
          faceType,
          contextualToolsPlugin,
          signalTextureLoadSuccess
        );
        cmdMgr.receive(this.PaintCmdMessageEnum.material, materialData);
        cmdMgr.complete();
      } else {
        executeCmd(cmdMgr, HSFPConstants.CommandType.Decoration, materialData, catalogPlugin);
      }
    }

    if (this._isCeiling(entity)) {
      this.handler.updateCeilingMaterialMeta();
    }
  };

  private _onClickMixPaintPlan(materialData: MaterialMetaData): void {
    const commandManager = HSApp.App.getApp().cmdManager;
    const command = commandManager.createCommand(
      HSFPConstants.CommandType.MixPaint.ApplyMixPaintPlanToFaces,
      [materialData]
    );
    commandManager.execute(command);
  }
}