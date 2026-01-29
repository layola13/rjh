import { HSCore } from '../path/to/HSCore';
import { HSApp } from '../path/to/HSApp';
import { HSConstants } from '../path/to/HSConstants';
import { HSCatalog } from '../path/to/HSCatalog';
import { HSFPConstants } from '../path/to/HSFPConstants';
import { MultiContentselection } from './MultiContentSelection';
import { WFASelection } from './WFASelection';
import * as React from 'react';

interface EntitySelection {
  entity: HSCore.Model.Entity;
  viewObject?: HSApp.View.T3d.ViewObject;
  modelPos?: HSCore.Math.Vector3;
}

interface GizmoContext {
  hscanvas: {
    displayLayers: {
      gizmo: unknown;
      cameraControl: unknown;
    };
  };
  context?: unknown;
}

interface GizmoFactoryProps {
  context: GizmoContext;
}

type Gizmo = unknown;

/**
 * Factory class for creating selection and entity gizmos based on entity types and selection states
 */
export default class GizmoFactory extends HSApp.View.Base.GizmoFactory {
  private readonly _context: GizmoContext;

  constructor(props: GizmoFactoryProps) {
    super(props);
    this._context = props.context;
  }

  /**
   * Creates appropriate selection gizmo(s) based on selected entities
   * @param selections - Array of selected entities with their view objects
   * @param additionalParam - Additional parameter for gizmo configuration
   * @returns Array of created gizmos
   */
  createSelectionGizmo(selections: EntitySelection[], additionalParam?: unknown): Gizmo[] {
    const context = this._context;
    const gizmoLayer = context.hscanvas.displayLayers.gizmo;

    if (selections.length === 1) {
      let gizmo: Gizmo | undefined;
      const entity = selections[0].entity;
      const entityClass = entity.Class;
      const modelClasses = HSConstants.ModelClass;

      switch (entityClass) {
        case modelClasses.NgContent:
        case modelClasses.NgSoftCloth:
        case modelClasses.NgCurtain:
        case modelClasses.NgGroup:
          if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) break;
          
          const environment = HSApp.App.getApp().environmentManager.getEnvironment();
          if (environment && (
            environment.id === 'ElevationEnv' || 
            environment.id === 'MoldingEnv' || 
            environment.id === 'GenerateSlidingDoorEnv'
          )) {
            return [];
          }

        case modelClasses.NgCustomizedModel:
        case modelClasses.NgSewerPipe:
        case modelClasses.NCustomizedParametricStairs:
          if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) break;
          if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.DoorCore)) break;
          
          if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Wainscot)) {
            if (entityClass === modelClasses.NgGroup) break;
            gizmo = new HSApp.View.Gizmo.ContentGizmo(context, gizmoLayer, entity);
            break;
          }

          if (HSCore.Util.Content.isCeiling(entity)) break;
          if (this.envNeedDealCookSinkDimension() && this.isContentCookSink(entity)) break;
          
          gizmo = new HSApp.View.Gizmo.StandardSelectionGizmo(context, gizmoLayer, entity);
          break;

        case modelClasses.CustomizedPMInstanceModel:
        case modelClasses.NCustomizedParametricBackgroundWall:
        case modelClasses.NCPBackgroundWallUnit:
        case modelClasses.ParametricCurtain:
        case modelClasses.ParametricBathroomCabinet:
          if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) break;
          
          const wallFaceParent = new HSCore.Model.WallFaceAssemblyDecorator().getWallFaceAssemblyParent(entity);
          gizmo = wallFaceParent 
            ? new WFASelection(context, gizmoLayer, entity)
            : new HSApp.View.Gizmo.StandardSelectionGizmo(context, gizmoLayer, entity);
          break;

        case modelClasses.NgSpotLight:
        case modelClasses.NgFlatLight:
        case modelClasses.NgPointLight:
        case modelClasses.NgAttenuatedSpotLight:
        case modelClasses.NgEllipseLight:
          gizmo = new HSApp.View.Gizmo.LightGizmo(context, gizmoLayer, entity, selections[0].viewObject);
          break;

        case modelClasses.NgLightSubGroup:
          if (!HSCore.Model.Light.isPhysicalAndMeshLight(entity.memberProxy)) {
            gizmo = new HSApp.View.Gizmo.LightGizmo(context, gizmoLayer, entity, selections[0].viewObject);
          }
          break;

        case modelClasses.NgSpotPhysicalLight:
          if (selections[0].viewObject instanceof HSApp.View.T3d.LightTarget) {
            gizmo = new HSApp.View.Gizmo.LightGizmo(context, gizmoLayer, entity, selections[0].viewObject);
          }
          break;

        case modelClasses.NgPAssembly:
          if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CustomizedFurniture) ||
              entity.contentType.isTypeOf([
                HSCatalog.ContentTypeEnum.ParamSwingDoorLeaf, 
                HSCatalog.ContentTypeEnum.ParamDrawer
              ])) {
            
            if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CabinetVerticalBoard) ||
                entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CabinetHorizontalBoard)) {
              if (entity.detectedObjs) {
                gizmo = new HSApp.View.Gizmo.BoardGizmo(context, gizmoLayer, entity, additionalParam);
              }
            } else if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamDrawer)) {
              if (entity.detectedObjs || Object.values(entity.parents)[0] instanceof HSCore.Model.PAssembly) {
                gizmo = new HSApp.View.Gizmo.DrawerGizmo(context, gizmoLayer, entity, additionalParam);
              }
            } else if (!entity.contentType.isTypeOf([
              HSCatalog.ContentTypeEnum.ParamSwingDoorLeaf, 
              HSCatalog.ContentTypeEnum.UnitWardrobe
            ]) && !entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamSwingDoor)) {
              
              if (entity.contentType.isTypeOf([HSCatalog.ContentTypeEnum.CabinetBoardWithLights])) {
                const uniqueParent = entity.getUniqueParent();
                if (uniqueParent instanceof HSCore.Model.Floorplan) {
                  if (entity.detectedObjs) {
                    gizmo = new HSApp.View.Gizmo.BoardGizmo(context, gizmoLayer, entity, additionalParam);
                  }
                } else if (uniqueParent instanceof HSCore.Model.PAssembly) {
                  gizmo = new HSApp.View.Gizmo.BoardGizmo(context, gizmoLayer, entity, additionalParam);
                }
              } else {
                gizmo = new HSApp.View.Gizmo.StandardSelectionGizmo(context, gizmoLayer, entity);
              }
            }
          }
          break;

        case modelClasses.DAssembly:
        case modelClasses.DOpening:
        case modelClasses.DContent:
        case modelClasses.MeshContent:
          if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) break;
          if (this.envNeedDealCookSinkDimension() && this.isDContentCookSink(entity)) break;

          const currentEnv = HSApp.App.getApp().environmentManager.getEnvironment();
          const restrictedEnvironments = [
            HSFPConstants.Environment.Elevation,
            HSFPConstants.Environment.MoldingEnv,
            HSFPConstants.Environment.SlidingDoor,
            HSFPConstants.Environment.ExportDWGEnv,
            HSFPConstants.Environment.HandleInstallEnv
          ];

          if (currentEnv && restrictedEnvironments.includes(currentEnv.id)) {
            return [];
          }

          if (HSApp.Util.Entity.isRootEntity(entity)) {
            const isFunctionComponent = entity.isFunctionComponent;
            const imodelParentId = entity.imodelParentId;
            
            if (!isFunctionComponent && !imodelParentId && !entity.isCountertop) {
              gizmo = new HSApp.View.Gizmo.StandardSelectionGizmo(context, gizmoLayer, entity, additionalParam);
            }
          }
          break;

        case modelClasses.NgPExtruding:
        case modelClasses.NgPBox:
          gizmo = new HSApp.View.Gizmo.BoardGizmo(context, gizmoLayer, entity, additionalParam);
          break;

        case modelClasses.ConcealedWorkTube:
          gizmo = new HSApp.View.Gizmo.WorkTubeGizmo(
            context, 
            gizmoLayer, 
            entity, 
            selections[0].viewObject, 
            selections[0].modelPos
          );
          break;

        case modelClasses.NgDoor:
        case modelClasses.NgWindow:
        case modelClasses.NgHole:
          if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) break;
          if (!(entity.host instanceof HSCore.Model.Wall)) break;
          
          gizmo = new React.OpeningDimension(context, gizmoLayer, entity);
          break;

        case modelClasses.WallFaceAssembly:
          const selectionType = HSApp.App.getApp().getActive3DView().gizmoManager.getSelectionType() || 0;
          const gizmoTypes = HSApp.View.GizmoSelectionType;
          const isTransformMode = 
            (selectionType & gizmoTypes.Move) ||
            (selectionType & gizmoTypes.Scale) ||
            (selectionType & gizmoTypes.Rotation);
          
          gizmo = isTransformMode
            ? new WFASelection(context, gizmoLayer, entity.backgroundWalls)
            : new WFASelection(context, gizmoLayer, entity);
          break;
      }

      return gizmo ? [gizmo] : [];
    } else if (selections.length > 1) {
      return this._createMultiSelectionGizmo(selections, additionalParam);
    }

    return [];
  }

  /**
   * Creates entity-specific gizmos (e.g., camera controls)
   * @param entity - The entity to create gizmo for
   * @returns Array of created gizmos
   */
  createEntityGizmo(entity: HSCore.Model.Entity): Gizmo[] {
    let gizmo: Gizmo | undefined;
    const context = this._context;
    const cameraControlLayer = context.hscanvas.displayLayers.cameraControl;

    if (entity.Class === HSConstants.ModelClass.NgCamera) {
      if (entity.type === HSCore.Model.CameraTypeEnum.FirstPerson) {
        gizmo = new HSApp.View.Gizmo.CameraGizmo(context, cameraControlLayer, entity);
      }
    }

    return gizmo ? [gizmo] : [];
  }

  /**
   * Creates gizmos for multiple selected entities
   * @param selections - Array of selected entities
   * @param additionalParam - Additional parameter for gizmo configuration
   * @returns Array of created gizmos
   */
  private _createMultiSelectionGizmo(selections: EntitySelection[], additionalParam?: unknown): Gizmo[] {
    const gizmos: Gizmo[] = [];
    const context = this._context;
    const gizmoLayer = context.hscanvas.displayLayers.gizmo;
    const environment = HSApp.App.getApp().environmentManager.getEnvironment();

    if (!environment || (environment.id !== 'tpzz' && environment.id !== 'tpzz-cabinet')) {
      selections.forEach((selection) => {
        if (selection.entity instanceof HSCore.Model.WallFaceAssembly) {
          gizmos.push(new WFASelection(context, gizmoLayer, selection.entity));
        } else if (
          selection.entity instanceof HSCore.Model.NCPBackgroundWallBase &&
          !selection.entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)
        ) {
          gizmos.push(new HSApp.View.Gizmo.StandardSelectionGizmo(context, gizmoLayer, selection.entity));
        }
      });
    } else {
      const modelClasses = HSConstants.ModelClass;
      const allowedClasses = [
        modelClasses.NgContent,
        modelClasses.DAssembly,
        modelClasses.DContent,
        modelClasses.DMolding
      ];

      const allEntitiesValid = selections.every((selection) => {
        const entity = selection.entity;
        if (!entity) return false;
        if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) return false;

        const entityClass = entity.Class;
        return (
          modelClasses.NgContent === entityClass ||
          (allowedClasses.includes(entityClass) && HSApp.Util.Entity.isRootEntity(entity))
        );
      });

      if (allEntitiesValid) {
        const entities = selections.map((selection) => selection.entity);
        gizmos.push(new MultiContentselection(context, gizmoLayer, entities, additionalParam));
      }
    }

    return gizmos;
  }

  private envNeedDealCookSinkDimension(): boolean {
    // Implementation from imported utility
    return false; // Placeholder
  }

  private isContentCookSink(entity: HSCore.Model.Entity): boolean {
    // Implementation from imported utility
    return false; // Placeholder
  }

  private isDContentCookSink(entity: HSCore.Model.Entity): boolean {
    // Implementation from imported utility
    return false; // Placeholder
  }
}