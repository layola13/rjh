/**
 * Custom Gizmo Factory for creating selection and entity manipulation gizmos
 * Extends the base HSApp GizmoFactory to provide specialized gizmo creation logic
 */

import { HSCore } from 'hs-core';
import { HSApp } from 'hs-app';
import { HSConstants } from 'hs-constants';
import { HSCatalog } from 'hs-catalog';
import { HSFPConstants } from 'hs-floorplan-constants';

/**
 * Selection item interface representing a selected entity with its view object and position
 */
interface SelectionItem {
  /** The selected model entity */
  entity: HSCore.Model.Entity;
  /** The corresponding view object representation */
  viewObject?: HSApp.View.ViewObject;
  /** The model space position of the selection */
  modelPos?: HSCore.Math.Vector3;
}

/**
 * Gizmo factory context interface
 */
interface GizmoFactoryContext {
  /** The canvas instance containing display layers */
  hscanvas: {
    displayLayers: {
      /** Layer for rendering gizmos */
      gizmo: HSApp.View.DisplayLayer;
      /** Layer for camera controls */
      cameraControl: HSApp.View.DisplayLayer;
    };
  };
  /** Additional context properties */
  context?: unknown;
}

/**
 * Base gizmo interface
 */
interface Gizmo {
  /** Dispose of gizmo resources */
  dispose(): void;
  /** Update gizmo state */
  update(): void;
}

/**
 * Custom gizmo factory class for creating specialized selection and entity gizmos
 * Handles various entity types including models, lights, cameras, and assemblies
 */
export default class CustomGizmoFactory extends HSApp.View.Base.GizmoFactory {
  private readonly _context: GizmoFactoryContext;

  /**
   * Creates a new custom gizmo factory instance
   * @param config - Factory configuration containing the context
   */
  constructor(config: { context: GizmoFactoryContext }) {
    super(config);
    this._context = config.context;
  }

  /**
   * Creates selection gizmos for the given selected entities
   * @param selections - Array of selected items to create gizmos for
   * @param parameter - Additional parameter for gizmo creation
   * @returns Array of created gizmos
   */
  createSelectionGizmo(
    selections: SelectionItem[],
    parameter?: unknown
  ): Gizmo[] {
    const context = this._context;
    const gizmoLayer = context.hscanvas.displayLayers.gizmo;
    let gizmo: Gizmo | undefined;

    // Handle single selection
    if (selections.length === 1) {
      const entity = selections[0].entity;
      const entityClass = entity.Class;
      const modelClass = HSConstants.ModelClass;

      switch (entityClass) {
        // Content models, soft cloth, curtains, groups
        case modelClass.NgContent:
        case modelClass.NgSoftCloth:
        case modelClass.NgCurtain:
        case modelClass.NgGroup:
          if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) break;

          const environment = HSApp.App.getApp().environmentManager.getEnvironment();
          if (
            environment &&
            (environment.id === 'ElevationEnv' ||
              environment.id === 'MoldingEnv' ||
              environment.id === 'GenerateSlidingDoorEnv')
          ) {
            return [];
          }

        // Customized models and parametric elements
        case modelClass.NgCustomizedModel:
        case modelClass.NgSewerPipe:
        case modelClass.NCustomizedParametricStairs:
          if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) break;
          if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.DoorCore)) break;

          // Handle wainscot content type
          if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Wainscot)) {
            if (entityClass === modelClass.NgGroup) break;
            gizmo = new HSApp.View.Gizmo.WainscotSelectionGizmo(context, gizmoLayer, entity);
            break;
          }

          if (HSCore.Util.Content.isCeiling(entity)) break;
          if (this._shouldSkipCookSinkDimension(entity)) break;

          gizmo = new HSApp.View.Gizmo.ContentSelectionGizmo(context, gizmoLayer, entity);
          break;

        // Parametric models and background walls
        case modelClass.CustomizedPMInstanceModel:
        case modelClass.NCustomizedParametricBackgroundWall:
        case modelClass.NCPBackgroundWallUnit:
        case modelClass.ParametricCurtain:
        case modelClass.ParametricBathroomCabinet:
          if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) break;

          const wallFaceAssemblyParent = new HSCore.Model.WallFaceAssemblyDecorator().getWallFaceAssemblyParent(
            entity
          );
          gizmo = wallFaceAssemblyParent
            ? new HSApp.View.Gizmo.WFASelection(context, gizmoLayer, entity)
            : new HSApp.View.Gizmo.ContentSelectionGizmo(context, gizmoLayer, entity);
          break;

        // Light entities
        case modelClass.NgSpotLight:
        case modelClass.NgFlatLight:
        case modelClass.NgPointLight:
        case modelClass.NgAttenuatedSpotLight:
        case modelClass.NgEllipseLight:
          gizmo = new HSApp.View.Gizmo.LightSelectionGizmo(
            context,
            gizmoLayer,
            entity,
            selections[0].viewObject
          );
          break;

        case modelClass.NgLightSubGroup:
          if (!HSCore.Model.Light.isPhysicalAndMeshLight(entity.memberProxy)) {
            gizmo = new HSApp.View.Gizmo.LightSelectionGizmo(
              context,
              gizmoLayer,
              entity,
              selections[0].viewObject
            );
          }
          break;

        case modelClass.NgSpotPhysicalLight:
          if (selections[0].viewObject instanceof HSApp.View.T3d.LightTarget) {
            gizmo = new HSApp.View.Gizmo.LightSelectionGizmo(
              context,
              gizmoLayer,
              entity,
              selections[0].viewObject
            );
          }
          break;

        // Parametric assemblies
        case modelClass.NgPAssembly:
          gizmo = this._createPAssemblyGizmo(entity, gizmoLayer, parameter);
          break;

        // Door assemblies, openings, and content
        case modelClass.DAssembly:
        case modelClass.DOpening:
        case modelClass.DContent:
        case modelClass.MeshContent:
          if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) break;
          if (this._shouldSkipDContentCookSink(entity)) break;

          const currentEnv = HSApp.App.getApp().environmentManager.getEnvironment();
          const excludedEnvironments = [
            HSFPConstants.Environment.Elevation,
            HSFPConstants.Environment.MoldingEnv,
            HSFPConstants.Environment.SlidingDoor,
            HSFPConstants.Environment.ExportDWGEnv,
            HSFPConstants.Environment.HandleInstallEnv,
          ];

          if (currentEnv && excludedEnvironments.includes(currentEnv.id)) {
            return [];
          }

          if (HSApp.Util.Entity.isRootEntity(entity)) {
            const isFunctionComponent = entity.isFunctionComponent;
            const hasImodelParent = entity.imodelParentId;
            const isCountertop = entity.isCountertop;

            if (!isFunctionComponent && !hasImodelParent && !isCountertop) {
              gizmo = new HSApp.View.Gizmo.ContentSelectionGizmo(context, gizmoLayer, entity, parameter);
            }
          }
          break;

        // Parametric extruding and box
        case modelClass.NgPExtruding:
        case modelClass.NgPBox:
          gizmo = new HSApp.View.Gizmo.ParametricShapeGizmo(context, gizmoLayer, entity, parameter);
          break;

        // Concealed work tube
        case modelClass.ConcealedWorkTube:
          gizmo = new HSApp.View.Gizmo.ConcealedTubeGizmo(
            context,
            gizmoLayer,
            entity,
            selections[0].viewObject,
            selections[0].modelPos
          );
          break;

        // Openings (doors, windows, holes)
        case modelClass.NgDoor:
        case modelClass.NgWindow:
        case modelClass.NgHole:
          if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) break;
          if (!(entity.host instanceof HSCore.Model.Wall)) break;

          gizmo = new HSApp.View.Gizmo.OpeningDimension(context, gizmoLayer, entity);
          break;

        // Wall face assembly
        case modelClass.WallFaceAssembly:
          const selectionType =
            HSApp.App.getApp().getActive3DView().gizmoManager.getSelectionType() ?? 0;
          const gizmoSelectionType = HSApp.View.GizmoSelectionType;
          const hasTransformGizmo =
            (selectionType & gizmoSelectionType.Move) !== 0 ||
            (selectionType & gizmoSelectionType.Scale) !== 0 ||
            (selectionType & gizmoSelectionType.Rotation) !== 0;

          gizmo = hasTransformGizmo
            ? new HSApp.View.Gizmo.WFASelection(context, gizmoLayer, entity.backgroundWalls)
            : new HSApp.View.Gizmo.WFASelection(context, gizmoLayer, entity);
          break;
      }
    } else if (selections.length > 1) {
      // Handle multiple selections
      return this._createMultiSelectionGizmo(selections, parameter);
    }

    return gizmo ? [gizmo] : [];
  }

  /**
   * Creates entity-specific gizmos (e.g., camera gizmos)
   * @param entity - The entity to create a gizmo for
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
   * @param selections - Array of selected items
   * @param parameter - Additional parameter for gizmo creation
   * @returns Array of created gizmos
   */
  private _createMultiSelectionGizmo(selections: SelectionItem[], parameter?: unknown): Gizmo[] {
    const gizmos: Gizmo[] = [];
    const context = this._context;
    const gizmoLayer = context.hscanvas.displayLayers.gizmo;
    const environment = HSApp.App.getApp().environmentManager.getEnvironment();

    // Skip multi-selection in certain environments
    if (!environment || (environment.id !== 'tpzz' && environment.id !== 'tpzz-cabinet')) {
      selections.forEach((selection) => {
        if (selection.entity instanceof HSCore.Model.WallFaceAssembly) {
          gizmos.push(new HSApp.View.Gizmo.WFASelection(context, gizmoLayer, selection.entity));
        } else if (
          selection.entity instanceof HSCore.Model.NCPBackgroundWallBase &&
          !selection.entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)
        ) {
          gizmos.push(new HSApp.View.Gizmo.ContentSelectionGizmo(context, gizmoLayer, selection.entity));
        }
      });
    } else {
      // Handle tpzz environment multi-selection
      const modelClass = HSConstants.ModelClass;
      const allowedClasses = [
        modelClass.NgContent,
        modelClass.DAssembly,
        modelClass.DContent,
        modelClass.DMolding,
      ];

      const allValidForMultiSelection = selections.every((selection) => {
        const entity = selection.entity;
        if (!entity) return false;
        if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) return false;

        const entityClass = entity.Class;
        if (entityClass === modelClass.NgContent) return true;
        if (allowedClasses.includes(entityClass) && HSApp.Util.Entity.isRootEntity(entity)) {
          return true;
        }

        return false;
      });

      if (allValidForMultiSelection) {
        const entities = selections.map((selection) => selection.entity);
        gizmos.push(new HSApp.View.Gizmo.MultiContentselection(context, gizmoLayer, entities, parameter));
      }
    }

    return gizmos;
  }

  /**
   * Creates a gizmo for parametric assembly entities
   * @param entity - The assembly entity
   * @param gizmoLayer - The display layer for the gizmo
   * @param parameter - Additional parameter for gizmo creation
   * @returns The created gizmo or undefined
   */
  private _createPAssemblyGizmo(
    entity: HSCore.Model.PAssembly,
    gizmoLayer: HSApp.View.DisplayLayer,
    parameter?: unknown
  ): Gizmo | undefined {
    const contentType = entity.contentType;
    const context = this._context;

    if (
      !contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CustomizedFurniture) &&
      !contentType.isTypeOf([
        HSCatalog.ContentTypeEnum.ParamSwingDoorLeaf,
        HSCatalog.ContentTypeEnum.ParamDrawer,
      ])
    ) {
      return undefined;
    }

    // Handle cabinet boards
    if (
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.CabinetVerticalBoard) ||
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.CabinetHorizontalBoard)
    ) {
      if (entity.detectedObjs) {
        return new HSApp.View.Gizmo.ParametricShapeGizmo(context, gizmoLayer, entity, parameter);
      }
      return undefined;
    }

    // Handle drawers
    if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamDrawer)) {
      const hasDetectedObjs = entity.detectedObjs;
      const hasAssemblyParent = Object.values(entity.parents)[0] instanceof HSCore.Model.PAssembly;

      if (hasDetectedObjs || hasAssemblyParent) {
        return new HSApp.View.Gizmo.DrawerGizmo(context, gizmoLayer, entity, parameter);
      }
      return undefined;
    }

    // Handle swing doors and wardrobes
    if (
      contentType.isTypeOf([
        HSCatalog.ContentTypeEnum.ParamSwingDoorLeaf,
        HSCatalog.ContentTypeEnum.UnitWardrobe,
      ]) ||
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamSwingDoor)
    ) {
      return undefined;
    }

    // Handle cabinet boards with lights
    if (contentType.isTypeOf([HSCatalog.ContentTypeEnum.CabinetBoardWithLights])) {
      const uniqueParent = entity.getUniqueParent();

      if (uniqueParent instanceof HSCore.Model.Floorplan) {
        if (entity.detectedObjs) {
          return new HSApp.View.Gizmo.ParametricShapeGizmo(context, gizmoLayer, entity, parameter);
        }
      } else if (uniqueParent instanceof HSCore.Model.PAssembly) {
        return new HSApp.View.Gizmo.ParametricShapeGizmo(context, gizmoLayer, entity, parameter);
      }

      return undefined;
    }

    // Default case
    return new HSApp.View.Gizmo.ContentSelectionGizmo(context, gizmoLayer, entity);
  }

  /**
   * Checks if cook sink dimension handling should be skipped for content entities
   * @param entity - The entity to check
   * @returns True if should skip, false otherwise
   */
  private _shouldSkipCookSinkDimension(entity: HSCore.Model.Entity): boolean {
    return (
      HSApp.Util.Environment.envNeedDealCookSinkDimension() &&
      HSApp.Util.Content.ContentisCookSink(entity)
    );
  }

  /**
   * Checks if cook sink dimension handling should be skipped for DContent entities
   * @param entity - The entity to check
   * @returns True if should skip, false otherwise
   */
  private _shouldSkipDContentCookSink(entity: HSCore.Model.Entity): boolean {
    return (
      HSApp.Util.Environment.envNeedDealCookSinkDimension() &&
      HSApp.Util.Content.DContentIsCookSink(entity)
    );
  }
}