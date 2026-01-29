import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { InteractiveFace } from './InteractiveFace';
import { Face } from './Face';
import { Line } from './Line';
import { Point } from './Point';

interface SVGGroups {
  face: SVGGElement;
  edge: SVGGElement;
  point: SVGGElement;
}

interface EntityDirtyEvent {
  data: {
    type: HSCore.Model.EntityEventType;
  };
}

interface ChildAddedEvent {
  data: {
    entity: HSCore.Model.Entity;
  };
}

interface FieldChangedEvent {
  data: {
    fieldName: string;
    newValue: unknown;
  };
}

interface SketchableEntity {
  roof?: unknown;
  signalFieldChanged: HSCore.Signal;
}

export class RoofDrawingRegionSketch extends HSApp.View.SVG.Base.Display2D {
  private _svgGroups?: SVGGroups;

  constructor(
    context: unknown,
    parent: unknown,
    element: unknown,
    entity: unknown
  ) {
    super(context, parent, element, entity);
  }

  init(sketchableEntity: SketchableEntity, svgGroups: SVGGroups): void {
    this._svgGroups = svgGroups;
    this._initSketchElements(!!sketchableEntity.roof);

    const entity = this.entity;
    this.signalHook
      .listen(entity.signalDirty, this._entityDirtied)
      .listen(entity.signalChildAdded, this.onChildAdded);

    if (sketchableEntity) {
      this._listenFieldChanged(sketchableEntity);
    }
  }

  onCleanup(): void {
    super.onCleanup();
    this._svgGroups = undefined;
  }

  private _listenFieldChanged(sketchableEntity: SketchableEntity): void {
    this.signalHook.listen(
      sketchableEntity.signalFieldChanged,
      (event: FieldChangedEvent) => {
        if (event.data.fieldName === '_sketchData') {
          this._clearAllChild();
          this._updateSketchData(event.data.newValue);
          this._initSketchElements(!!sketchableEntity.roof);
          this.dirtyGraph();
        } else if (event.data.fieldName === '_roofId') {
          const wasSelected = this._unSelectSketches();
          this._clearAllChild();
          this._initSketchElements(!!sketchableEntity.roof);
          if (wasSelected) {
            this._reSelectFace();
          }
          this.dirtyGraph();
        }
      }
    );
  }

  onChildAdded(event: ChildAddedEvent): void {
    const childEntity = event.data.entity;
    const entity = this.entity;
    const builder = entity.builder;
    const interactiveModel = new HSApp.ExtraordinarySketch2d.InteractiveModel(
      childEntity,
      builder,
      entity
    );
    entity.addMapModel(childEntity, interactiveModel);
    this._reCreateChild(interactiveModel);
  }

  private _updateSketchData(newSketchData: unknown): void {
    const entity = this.entity;
    entity.clearMapModel();
    entity.srcModel = newSketchData;
  }

  onEntityDirty(event: EntityDirtyEvent): void {
    switch (event.data.type) {
      case HSCore.Model.EntityEventType.Position:
      case HSCore.Model.EntityEventType.Geometry:
      case HSCore.Model.EntityEventType.Material:
        for (const childItem of this.childItems) {
          childItem.entity.dirty({
            type: event.data.type
          });
        }
        break;
    }
  }

  private _initSketchElements(hasRoof: boolean): void {
    const entity = this.entity;
    const srcModel = entity.srcModel;
    const builder = entity.builder;

    srcModel.faces.forEach((face: HSCore.Model.ExtraordinaryFace2d) => {
      const interactiveFace = new InteractiveFace(face, builder, entity);
      if (hasRoof) {
        interactiveFace.setFlagOn(HSCore.Model.EntityFlagEnum.freezed);
      }
      entity.addMapModel(face, interactiveFace);
      this._reCreateChild(interactiveFace);
    });

    if (!hasRoof) {
      HSCore.Util.ExtraordinarySketch2d.getAllEdgesFromFaces(srcModel.faces).forEach(
        (edge: HSCore.Model.ExtraordinaryEdge) => {
          const interactiveModel = new HSApp.ExtraordinarySketch2d.InteractiveModel(
            edge,
            builder,
            entity
          );
          entity.addMapModel(edge, interactiveModel);
          this._reCreateChild(interactiveModel);
        }
      );

      HSCore.Util.ExtraordinarySketch2d.getAllPointsFromFaces(srcModel.faces).forEach(
        (point: HSCore.Model.ExtraordinaryPoint2d) => {
          const interactiveModel = new HSApp.ExtraordinarySketch2d.InteractiveModel(
            point,
            builder,
            entity
          );
          entity.addMapModel(point, interactiveModel);
          this._reCreateChild(interactiveModel);
        }
      );
    }
  }

  private _reCreateChild(entityModel: HSApp.ExtraordinarySketch2d.InteractiveModel | InteractiveFace): void {
    let childDisplay = this.getChildItem(entityModel.id);
    if (childDisplay) {
      this.removeChild(childDisplay);
      this.canvas.removeDisplayObject(childDisplay);
      childDisplay = undefined;
    }

    if (!childDisplay) {
      childDisplay = this._createChildDisplay(entityModel);
      if (childDisplay) {
        childDisplay.init();
      }
    }

    if (childDisplay) {
      this.addChild(childDisplay);
      childDisplay.dirty = true;
    }
  }

  private _clearAllChild(): void {
    for (const childItem of this.childItems) {
      this.removeChild(childItem);
      this.canvas.removeDisplayObject(childItem);
    }
  }

  private _createChildDisplay(
    entityModel: HSApp.ExtraordinarySketch2d.InteractiveModel | InteractiveFace
  ): Face | Line | Point | undefined {
    if (!this._svgGroups) {
      return undefined;
    }

    if (entityModel.srcModel instanceof HSCore.Model.ExtraordinaryFace2d) {
      return new Face(this.context, this, this._svgGroups.face, entityModel);
    }

    if (
      entityModel.srcModel instanceof HSCore.Model.ExtraordinaryEdge &&
      entityModel.srcModel.curve instanceof HSCore.Model.ExtraordinaryLine2d
    ) {
      return new Line(this.context, this, this._svgGroups.edge, entityModel);
    }

    if (entityModel.srcModel instanceof HSCore.Model.ExtraordinaryPoint2d) {
      return new Point(this.context, this, this._svgGroups.point, entityModel);
    }

    return undefined;
  }

  private _unSelectSketches(): boolean {
    const selectionManager = HSApp.App.getApp().selectionManager;
    let hasUnselected = false;

    for (const childItem of this.childItems) {
      if (
        childItem.entity instanceof HSApp.ExtraordinarySketch2d.InteractiveModel &&
        selectionManager.hasSelected(childItem.entity)
      ) {
        selectionManager.unselect(childItem.entity);
        hasUnselected = true;
      }
    }

    return hasUnselected;
  }

  private _reSelectFace(): void {
    const selectionManager = HSApp.App.getApp().selectionManager;

    for (const childItem of this.childItems) {
      const entity = childItem.entity;
      if (entity.srcModel instanceof HSCore.Model.ExtraordinaryFace2d) {
        const sketchable = entity.builder.sketchable;
        if (sketchable.roof) {
          selectionManager.select([entity, sketchable.roof]);
        } else {
          selectionManager.select(entity);
        }
      }
    }
  }

  getFaceInteractiveModel(): HSApp.ExtraordinarySketch2d.InteractiveModel | undefined {
    for (const childItem of this.childItems) {
      if (
        childItem.entity instanceof HSApp.ExtraordinarySketch2d.InteractiveModel &&
        childItem.entity.srcModel instanceof HSCore.Model.ExtraordinaryFace2d
      ) {
        return childItem.entity;
      }
    }
    return undefined;
  }
}