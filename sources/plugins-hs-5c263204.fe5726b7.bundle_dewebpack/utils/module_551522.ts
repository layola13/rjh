import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSCatalog } from './HSCatalog';
import { OpeningCalculatedDimension } from './OpeningCalculatedDimension';
import { NewFurnitureDimension } from './NewFurnitureDimension';
import { LightDimension } from './LightDimension';
import { FurnitureDimension } from './FurnitureDimension';
import { RoofObstacleDimension } from './RoofObstacleDimension';
import { LightingLocationDimension } from './LightingLocationDimension';
import { NewConcealedworkDimension } from './NewConcealedworkDimension';
import { ParametricOpeningDimension } from './ParametricOpeningDimension';
import { ParametricOpeningCalculatedDimension } from './ParametricOpeningCalculatedDimension';
import { WFASelectBound } from './WFASelectBound';
import { ArcArrayGizmo } from './ArcArrayGizmo';
import { 
  envNeedDealCookSinkDimension, 
  DContentIsCookSink, 
  ContentisCookSink, 
  envDisabledDimension 
} from './utils';
import BayWindowDimension from './BayWindowDimension';
import CornerWindowDimension from './CornerWindowDimension';
import CornerFlatWindowDimension from './CornerFlatWindowDimension';
import POrdinaryWindowDimension from './POrdinaryWindowDimension';
import VertexDimension from './VertexDimension';
import ExportImageGizmo from './ExportImageGizmo';
import CustomizedDimension from './CustomizedDimension';
import ResizeContentGizmo from './ResizeContentGizmo';

interface SelectionEntity {
  entity?: HSCore.Model.Entity;
}

interface Command {
  type: string;
}

interface View2D {
  context: any;
  displayLayers: {
    temp: any;
  };
}

interface DimensionGizmo {
  // Base interface for dimension gizmos
}

const DIMENSION_GIZMO_REGISTRY: Record<string, new (...args: any[]) => DimensionGizmo> = Object.freeze({
  LinearDimension: HSApp.View.SVG.LinearDimension,
  CurveDimension: HSApp.View.SVG.CurveDimension
});

export default class GizmoFactory extends HSApp.View.Base.GizmoFactory {
  createSelectionGizmo(selection: SelectionEntity[]): DimensionGizmo[] {
    let gizmo: DimensionGizmo | undefined;
    const gizmos: DimensionGizmo[] = [];
    const activeView = HSApp.App.getApp().getActive2DView();
    const context = activeView.context;
    const tempLayer = activeView.displayLayers.temp;

    if (selection.length === 1) {
      const entity = selection[0].entity;
      if (!entity) {
        return [];
      }

      if (entity instanceof HSCore.Model.Light) {
        const environment = HSApp.App.getApp().environmentManager.getEnvironment();
        if (environment?.id === HSFPConstants.Environment.ManualLighting) {
          return this._createLightDimension(context, tempLayer, entity);
        }
      }

      const modelClass = HSConstants.ModelClass;
      
      switch (entity.Class) {
        case modelClass.NgWindow:
        case modelClass.NgDoor:
        case modelClass.NgOpening:
        case modelClass.DOpening:
          gizmo = new OpeningCalculatedDimension(context, tempLayer, entity);
          break;

        case modelClass.NgHole:
          gizmo = entity.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ext_slabOpening)
            ? new NewFurnitureDimension(context, tempLayer, entity)
            : new OpeningCalculatedDimension(context, tempLayer, entity);
          break;

        case modelClass.NgBayWindow:
          gizmo = new BayWindowDimension(context, tempLayer, entity);
          break;

        case modelClass.NgCornerWindow:
          gizmo = new CornerWindowDimension(context, tempLayer, entity);
          break;

        case modelClass.NgCornerFlatWindow:
          gizmo = new CornerFlatWindowDimension(context, tempLayer, entity);
          break;

        case modelClass.NgPOrdinaryWindow:
          gizmo = new POrdinaryWindowDimension(context, tempLayer, entity);
          break;

        case modelClass.NgVertex:
          if (!HSCore.Util.Slab.isSlabProfileVertex(entity)) {
            gizmo = new VertexDimension(context, tempLayer, entity);
          }
          break;

        case modelClass.ParametricOpening:
        case modelClass.ParametricDoor:
          gizmos.push(new ParametricOpeningDimension(context, tempLayer, entity));
          if (entity.getWallType() === 'L') {
            gizmos.push(new ParametricOpeningCalculatedDimension(context, tempLayer, entity, false));
          }
          break;

        case modelClass.DAssembly:
        case modelClass.DContent:
          const environment = HSApp.App.getApp().environmentManager.getEnvironment();
          if (environment?.id === HSFPConstants.Environment.MoldingEnv) {
            return [];
          }
          if (envNeedDealCookSinkDimension() && DContentIsCookSink(entity)) {
            break;
          }
          // Fall through

        case modelClass.MeshContent:
        case modelClass.NgContent:
        case modelClass.NgSoftCloth:
        case modelClass.NgCurtain:
        case modelClass.NgPAssembly:
        case modelClass.NgCustomizedModel:
        case modelClass.NCustomizedParametricCeiling:
        case modelClass.NCustomizedParametricBackgroundWall:
        case modelClass.NCPBackgroundWallUnit:
        case modelClass.NgFlue:
        case modelClass.NgBeam:
        case modelClass.NgSewerPipe:
        case modelClass.NgColumn:
        case modelClass.NgGroup:
        case modelClass.NCustomizedSquareColumn:
        case modelClass.NCustomizedCircleColumn:
        case modelClass.NCustomizedFlue:
        case modelClass.NCustomizedRiser:
        case modelClass.NCustomizedOutlet:
        case modelClass.NCustomizedBeam:
          if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) {
            break;
          }
          if (envNeedDealCookSinkDimension() && ContentisCookSink(entity) || envDisabledDimension()) {
            break;
          }

          if (entity.contentType && !entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Countertop)) {
            if (HSCore.Util.Content.isCWUniqueContent(entity)) {
              gizmo = new NewConcealedworkDimension(context, tempLayer, entity);
            } else if (
              entity.contentType.isTypeOf(/customized feature wall/) ||
              entity.contentType.isTypeOf(/customized floor/) ||
              entity.contentType.isTypeOf(/customized fixed furniture/)
            ) {
              gizmo = new CustomizedDimension(context, tempLayer, entity);
            } else if (HSCore.Util.Content.isCeiling(entity)) {
              if (
                !entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedCeiling) &&
                !entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedPMCeiling)
              ) {
                gizmo = new NewFurnitureDimension(context, tempLayer, entity);
              }
            } else if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CustomizedFurniture)) {
              if (!HSCore.Util.PAssembly.isUnitWardrobeInFrame(entity)) {
                gizmo = new FurnitureDimension(context, tempLayer, entity);
              }
            } else if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttachedLighting)) {
              gizmo = new LightingLocationDimension(context, tempLayer, entity);
            } else if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Beam)) {
              gizmo = new RoofObstacleDimension(context, tempLayer, entity);
            } else if (!entity.getProxyObject()) {
              gizmo = new NewFurnitureDimension(context, tempLayer, entity);
            }
          }
          break;

        case modelClass.WallFaceAssembly:
          gizmo = new WFASelectBound(context, tempLayer, entity);
          break;

        case modelClass.NCustomizedParametricStairs:
          gizmo = new NewFurnitureDimension(context, tempLayer, entity);
          break;
      }
    }

    return gizmo ? [gizmo] : gizmos.length > 0 ? gizmos : [];
  }

  private _createLightDimension(
    context: any, 
    tempLayer: any, 
    light: HSCore.Model.Light
  ): DimensionGizmo[] {
    const gizmos: DimensionGizmo[] = [];

    if (light instanceof HSCore.Model.Light) {
      if (
        !HSCore.Model.Light.isPhysicalAndMeshLight(light) &&
        !(light instanceof HSCore.Model.LightSubGroup && HSCore.Model.Light.isPhysicalAndMeshLight(light.memberProxy))
      ) {
        gizmos.push(new LightDimension(context, tempLayer, light));
      }
    }

    return gizmos;
  }

  createCommandGizmo(command?: Command): DimensionGizmo[] {
    if (!command) {
      return [];
    }

    let gizmo: DimensionGizmo | undefined;
    const activeView = HSApp.App.getApp().getActive2DView();
    const context = activeView.context;
    const tempLayer = activeView.displayLayers.temp;

    if (command.type === HSFPConstants.CommandType.ExportImage) {
      gizmo = new ExportImageGizmo(context, tempLayer, command);
    } else if (command.type === HSFPConstants.CommandType.ResizeContent) {
      gizmo = new ResizeContentGizmo(context, tempLayer, command);
    } else if (command.type === HSFPConstants.CommandType.CmdContentArcArray) {
      gizmo = new ArcArrayGizmo(context, tempLayer, command);
    }

    return gizmo ? [gizmo] : [];
  }

  createEntityGizmo(entity: HSCore.Model.Entity): DimensionGizmo[] {
    return [];
  }

  createGizmoByName(
    gizmoName: string, 
    context?: any, 
    tempLayer?: any, 
    param1?: any, 
    param2?: any
  ): DimensionGizmo | undefined {
    const activeView = HSApp.App.getApp().getActive2DView();
    context = context ?? activeView.context;
    tempLayer = tempLayer ?? activeView.displayLayers.temp;

    const GizmoConstructor = DIMENSION_GIZMO_REGISTRY[gizmoName];
    if (GizmoConstructor) {
      return new GizmoConstructor(context, tempLayer, param1, param2);
    }

    return undefined;
  }
}