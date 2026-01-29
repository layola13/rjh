interface Selection {
  entity: HSCore.Model.Entity;
}

interface DisplayLayers {
  temp: unknown;
}

interface View2D {
  context: unknown;
  displayLayers: DisplayLayers;
}

interface App {
  getActive2DView(): View2D;
  activeEnvironmentId: string;
  activeEnvironment: {
    face: {
      roomInfo: {
        floors: Array<{ id: string }>;
      };
    };
  };
  is3DViewActive(): boolean;
  is2DViewActive(): boolean;
  viewMode2D: string;
}

class SingleSelectGizmo {
  constructor(context: unknown, layer: unknown, entity: HSCore.Model.Entity);
}

class Rotate2DGizmo {
  constructor(context: unknown, layer: unknown, entity: HSCore.Model.Entity, helper: unknown);
}

class RotationHelper {
  constructor(entity: HSCore.Model.Entity, context: unknown);
}

class MultiSelectGizmo {
  constructor(context: unknown, layer: unknown, entities: HSCore.Model.Entity[]);
}

export default class GizmoFactory extends HSApp.View.Base.GizmoFactory {
  private readonly _app: App;

  constructor(element: unknown, app: App) {
    super(element);
    this._app = app;
  }

  /**
   * Creates selection gizmos based on the current selection
   */
  createSelectionGizmo(selections: Selection[]): unknown[] {
    const gizmos: unknown[] = [];
    const activeView = this._app.getActive2DView();
    const context = activeView.context;
    const tempLayer = activeView.displayLayers.temp;

    if (selections.length === 1) {
      const entity = selections[0].entity;
      
      if (!(entity instanceof HSCore.Model.Entity)) {
        return [];
      }

      if (this.shouldCreateSingleSelectGizmo(entity) && !entity.isCountertop) {
        gizmos.push(new SingleSelectGizmo(context, tempLayer, entity));
      }

      const entityClass = entity.Class;
      const modelClass = HSConstants.ModelClass;

      switch (entityClass) {
        case modelClass.NgContent:
        case modelClass.NgSoftCloth:
        case modelClass.NgPAssembly:
        case modelClass.NgGroup:
        case modelClass.NgCurtain:
        case modelClass.NgCustomizedModel:
        case modelClass.NgFlue:
        case modelClass.NgBeam:
        case modelClass.NgColumn:
        case modelClass.NgSewerPipe:
        case modelClass.DAssembly:
        case modelClass.DContent:
        case modelClass.NCustomizedSquareColumn:
        case modelClass.NCustomizedCircleColumn:
        case modelClass.NCustomizedFlue:
        case modelClass.NCustomizedRiser:
        case modelClass.NCustomizedOutlet:
        case modelClass.NCustomizedBeam:
        case modelClass.ParametricCurtain:
        case modelClass.ParametricBathroomCabinet:
        case modelClass.NCustomizedParametricStairs:
          if (this.shouldCreateRotationGizmo(entity) && !entity.isCountertop) {
            gizmos.push(new Rotate2DGizmo(context, tempLayer, entity, new RotationHelper(entity, context)));
          }
          break;

        case modelClass.NgHole:
          if (this.shouldCreateRotationGizmo(entity) && HSCore.Util.Content.isSlabOpening(entity)) {
            gizmos.push(new Rotate2DGizmo(context, tempLayer, entity, new RotationHelper(entity, context)));
          }
          break;

        case modelClass.CustomizedPMInstanceModel:
          if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) {
            break;
          }
          gizmos.push(new Rotate2DGizmo(context, tempLayer, entity, new RotationHelper(entity, context)));
          break;

        case modelClass.NgDoor:
        case modelClass.NgWindow:
          break;
      }
    } else if (selections.length > 1 && selections.every((selection) => {
      const selectionType = HSApp.Util.Selection.getSelectionType(selection.entity);
      return selectionType === HSApp.Util.Selection.SelectionTypeEnum.CONTENT ||
             selectionType === HSApp.Util.Selection.SelectionTypeEnum.VIRTUALLIGHT;
    })) {
      const entities = selections.map((selection) => selection.entity);
      gizmos.push(new MultiSelectGizmo(context, tempLayer, entities));
    }

    return gizmos;
  }

  /**
   * Determines if a single select gizmo should be created for the entity
   */
  shouldCreateSingleSelectGizmo(entity: HSCore.Model.Entity): boolean {
    const activeEnvironmentId = this._app.activeEnvironmentId;

    if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed) && 
        activeEnvironmentId !== HSFPConstants.Environment.Bom) {
      return false;
    }

    if (!entity.instanceOf(HSConstants.ModelClass.NgContent) && 
        !entity.instanceOf(HSConstants.ModelClass.NgCornerWindow)) {
      return false;
    }

    if (entity instanceof HSCore.Model.CustomizedFeatureModel || 
        entity instanceof HSCore.Model.NCustomizedSketchModel) {
      return false;
    }

    if ((entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedPMCeiling) || 
         entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedCeiling)) &&
        activeEnvironmentId !== HSFPConstants.Environment.NCustomizedCeilingModel &&
        activeEnvironmentId !== HSFPConstants.Environment.CustomizedCeilingModel) {
      return false;
    }

    if (entity instanceof HSCore.Model.PAssembly &&
        (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CabinetZipBoardI) ||
         entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CabinetZipBoardL) ||
         entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CabinetLightBoard))) {
      return false;
    }

    if (this._app.is3DViewActive() && HSCore.Util.Content.isCeiling(entity)) {
      return false;
    }

    if (this._app.is3DViewActive() && 
        this._app.viewMode2D === HSApp.View.ViewModeEnum.Plane) {
      if (entity.getHost?.() instanceof HSCore.Model.NCustomizedParametricRoof) {
        return false;
      }

      if (!(HSCore.Util.Content.isFurniture(entity) ||
            HSCore.Util.Content.isOpening(entity) ||
            HSCore.Util.Content.isWindow(entity) ||
            HSCore.Util.Content.isConcealedWorkContent(entity) ||
            HSCore.Util.Content.isRoofObstacle(entity))) {
        return false;
      }
    }

    if (this._app.is3DViewActive() && 
        this._app.viewMode2D === HSApp.View.ViewModeEnum.RCP &&
        !(HSCore.Util.Content.isCeiling(entity) ||
          HSCore.Util.Content.isCeilingLight(entity) ||
          HSCore.Util.Content.isRoofObstacle(entity) ||
          HSCore.Util.Content.isWindow(entity) ||
          HSCore.Util.Content.isOpening(entity))) {
      return false;
    }

    if (this._app.is2DViewActive() && 
        this._app.viewMode2D === HSApp.View.ViewModeEnum.Plane &&
        entity.getHost?.() instanceof HSCore.Model.NCustomizedParametricRoof) {
      return false;
    }

    if (HSCore.Util.PAssembly.isUnitWardrobeInFrame(entity)) {
      return false;
    }

    if ((entity instanceof HSCore.Model.DAssembly || entity instanceof HSCore.Model.DContent) &&
        !HSApp.Util.Entity.isRootEntity(entity)) {
      return false;
    }

    if (activeEnvironmentId === HSFPConstants.Environment.CustomizedCeilingModel ||
        activeEnvironmentId === HSFPConstants.Environment.NCustomizedCeilingModel) {
      const face = this._app.activeEnvironment.face;
      const roomContent = HSCore.Util.Room.getRoomContentIn(entity);
      const floors = face.roomInfo.floors;

      if (roomContent) {
        for (const floor of floors) {
          if (roomContent.id === floor.id) {
            return true;
          }
        }
      }
      return false;
    }

    return (activeEnvironmentId !== HSFPConstants.Environment.CustomizedPlatform &&
            activeEnvironmentId !== HSFPConstants.Environment.NCustomizedPlatform ||
            !entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedCeiling) &&
            !entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedPMCeiling)) &&
           activeEnvironmentId !== HSFPConstants.Environment.MoldingEnv;
  }

  /**
   * Determines if a rotation gizmo should be created for the entity
   */
  shouldCreateRotationGizmo(entity: HSCore.Model.Entity): boolean {
    if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) {
      return false;
    }

    if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Wainscot)) {
      return false;
    }

    if (HSCore.Util.Content.isCeiling(entity) &&
        (this._app.is3DViewActive() ||
         ((this._app.activeEnvironmentId === HSFPConstants.Environment.CustomizedCeilingModel ||
           this._app.activeEnvironmentId === HSFPConstants.Environment.NCustomizedCeilingModel) &&
          entity instanceof HSCore.Model.CustomizedModel))) {
      return false;
    }

    if (this._app.is3DViewActive() &&
        this._app.viewMode2D === HSApp.View.ViewModeEnum.Plane &&
        !(HSCore.Util.Content.isFurniture(entity) ||
          HSCore.Util.Content.isOpening(entity) ||
          HSCore.Util.Content.isWindow(entity) ||
          HSCore.Util.Content.isConcealedWorkContent(entity) ||
          HSCore.Util.Content.isRoofObstacle(entity))) {
      return false;
    }

    if (this._app.is3DViewActive() &&
        this._app.viewMode2D === HSApp.View.ViewModeEnum.RCP &&
        !(HSCore.Util.Content.isCeiling(entity) ||
          HSCore.Util.Content.isCeilingLight(entity) ||
          HSCore.Util.Content.isRoofObstacle(entity) ||
          HSCore.Util.Content.isWindow(entity) ||
          HSCore.Util.Content.isOpening(entity))) {
      return false;
    }

    if (HSCore.Util.PAssembly.isUnitWardrobeInFrame(entity)) {
      return false;
    }

    if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedProductsAlloyDoorWindow)) {
      return false;
    }

    if ((entity instanceof HSCore.Model.DAssembly || entity instanceof HSCore.Model.DContent) &&
        (!HSApp.Util.Entity.isRootEntity(entity) || isCustomDoor(entity))) {
      return false;
    }

    if ((this._app.activeEnvironmentId === HSFPConstants.Environment.CustomizedBackgroundWall ||
         this._app.activeEnvironmentId === HSFPConstants.Environment.CustomizedPlatform) &&
        entity?.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedCeiling)) {
      return false;
    }

    if (this._app.activeEnvironmentId === HSFPConstants.Environment.MoldingEnv) {
      return false;
    }

    return true;
  }
}