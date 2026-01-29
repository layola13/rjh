import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

interface SVGGroups {
  dimension: SVGGElement;
  [key: string]: SVGElement;
}

interface EntityDirtyEvent {
  data: {
    type: HSCore.Model.EntityEventType;
  };
}

interface FieldChangedEvent {
  data: {
    fieldName: string;
    newValue: any;
  };
}

interface ChildAddedEvent {
  data: {
    entity: HSCore.Model.Entity;
  };
}

export class RoofsDrawingBkgSketch extends HSApp.View.SVG.Base.Display2D {
  private _svgGroups?: SVGGroups;

  constructor(
    context: any,
    parent: any,
    canvas: any,
    entity: any
  ) {
    super(context, parent, canvas, entity);
  }

  public init(field: any | null, svgGroups: SVGGroups): void {
    this._svgGroups = svgGroups;
    this._initSketchElements();

    const entity = this.entity;
    this.signalHook
      .listen(entity.signalDirty, this._entityDirtied)
      .listen(entity.signalChildAdded, this.onChildAdded);

    if (field) {
      this._listenFieldChanged(field);
    }
  }

  public onCleanup(): void {
    super.onCleanup();
    this._svgGroups = undefined;
  }

  private _listenFieldChanged(field: any): void {
    this.signalHook.listen(field.signalFieldChanged, (event: FieldChangedEvent) => {
      if (event.data.fieldName === 'bkgSketchData') {
        this._clearAllChild();
        this._updateSketchData(event.data.newValue);
        this._initSketchElements();
        this.dirtyGraph();
      }
    });
  }

  public onChildAdded(event: ChildAddedEvent): void {
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

  private _updateSketchData(newData: any): void {
    const entity = this.entity;
    entity.clearMapModel();
    entity.srcModel = newData;
  }

  public onEntityDirty(event: EntityDirtyEvent): void {
    const eventType = event.data.type;
    
    switch (eventType) {
      case HSCore.Model.EntityEventType.Position:
      case HSCore.Model.EntityEventType.Geometry:
      case HSCore.Model.EntityEventType.Material:
        for (const childItem of this.childItems) {
          childItem.entity.dirty({ type: eventType });
        }
        break;
    }
  }

  private _initSketchElements(): void {
    const entity = this.entity;
    const srcModel = entity.srcModel;
    const builder = entity.builder;

    srcModel.guidelines.forEach((guideline: HSCore.Model.ExtraordinaryGuideline) => {
      const interactiveModel = new HSApp.ExtraordinarySketch2d.InteractiveModel(
        guideline,
        builder,
        entity
      );
      entity.addMapModel(guideline, interactiveModel);
      this._reCreateChild(interactiveModel);
    });
  }

  private _reCreateChild(model: HSApp.ExtraordinarySketch2d.InteractiveModel): void {
    let childDisplay = this.getChildItem(model.id);

    if (childDisplay) {
      this.removeChild(childDisplay);
      this.canvas.removeDisplayObject(childDisplay);
      childDisplay = undefined;
    }

    if (!childDisplay) {
      childDisplay = this._createChildDisplay(model);
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
    model: HSApp.ExtraordinarySketch2d.InteractiveModel
  ): HSApp.View.SVG.ExtraordinarySketch2d.GuideLine2d | undefined {
    if (model.srcModel instanceof HSCore.Model.ExtraordinaryGuideline) {
      return new HSApp.View.SVG.ExtraordinarySketch2d.GuideLine2d(
        this.context,
        this,
        this._svgGroups!.dimension,
        model
      );
    }
    return undefined;
  }
}