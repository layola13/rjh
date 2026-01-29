import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

interface SVGGroups {
  bkg: SVGGElement;
  face: SVGGElement;
  edge: SVGGElement;
  point: SVGGElement;
  dimension: SVGGElement;
}

export class Sketch extends HSApp.View.SVG.Base.Display2D {
  private _svgGroups?: SVGGroups;

  constructor(
    context: unknown,
    parent: unknown,
    group: SVGGElement,
    entity: unknown
  ) {
    super(context, parent, group, entity);
  }

  init(layer?: unknown): void {
    const context = this.context;
    this.node = context.group();
    
    if (HSApp.DEBUG) {
      this.node.attr('name', 'sketch');
    }
    
    this.group.appendChild(this.node);
    this._initGroups();
    this._initSketchElements();

    const entity = this.entity;
    this.signalHook
      .listen(entity.signalDirty, this._entityDirtied)
      .listen(entity.signalChildAdded, this.onChildAdded);

    if (layer) {
      this._listenLayer(layer);
    }
    
    this._listenStateChanged();
  }

  private _listenLayer(layer: unknown): void {
    this.signalHook.listen(layer.signalFieldChanged, (event: unknown) => {
      if (event.data.fieldName === 'slabeditor') {
        this._clearAllChild();
        this._updateSketchData(event.data.newValue);
        this._initSketchElements();
        this.dirtyGraph();
      }
    });
  }

  private _listenStateChanged(): void {
    const transManager = this.context.application.transManager;
    
    const handleStateChange = (event: unknown): void => {
      if (event.data.request instanceof HSApp.ExtraordinarySketch2d.Request.SketchBaseRequest) {
        HSApp.ExtraordinarySketch2d.Util.reselectInteractiveModel();
      }
    };

    this.signalHook
      .listen(transManager.signalCommitted, handleStateChange)
      .listen(transManager.signalUndone, handleStateChange)
      .listen(transManager.signalRedone, handleStateChange);
  }

  onChildAdded(event: unknown): void {
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

  private _updateSketchData(data: unknown): void {
    const entity = this.entity;
    entity.clearMapModel();
    entity.srcModel = data;
  }

  onEntityDirty(event: unknown): void {
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

  private _initGroups(): void {
    const context = this.context;
    const groups: Partial<SVGGroups> = {};
    const groupNames: Array<keyof SVGGroups> = ['bkg', 'face', 'edge', 'point', 'dimension'];

    for (const groupName of groupNames) {
      const svgGroup = context.group();
      
      if (HSApp.DEBUG) {
        svgGroup.attr('name', groupName);
      }
      
      this.node.appendChild(svgGroup);
      groups[groupName] = svgGroup;
    }

    this._svgGroups = groups as SVGGroups;
  }

  private _initSketchElements(): void {
    const entity = this.entity;
    const srcModel = entity.srcModel;
    const builder = entity.builder;

    // Background
    const backgroundModel = new HSApp.ExtraordinarySketch2d.InteractiveModel(
      srcModel.background,
      builder,
      entity
    );
    entity.addMapModel(srcModel.background, backgroundModel);
    this._reCreateChild(backgroundModel);

    // Faces
    for (const face of srcModel.faces) {
      const faceModel = new HSApp.ExtraordinarySketch2d.InteractiveModel(face, builder, entity);
      entity.addMapModel(face, faceModel);
      this._reCreateChild(faceModel);
    }

    // Edges
    const allEdges = HSCore.Util.ExtraordinarySketch2d.getAllEdgesFromFaces(srcModel.faces);
    for (const edge of allEdges) {
      const edgeModel = new HSApp.ExtraordinarySketch2d.InteractiveModel(edge, builder, entity);
      entity.addMapModel(edge, edgeModel);
      this._reCreateChild(edgeModel);
    }

    // Points
    const allPoints = HSCore.Util.ExtraordinarySketch2d.getAllPointsFromFaces(srcModel.faces);
    for (const point of allPoints) {
      const pointModel = new HSApp.ExtraordinarySketch2d.InteractiveModel(point, builder, entity);
      entity.addMapModel(point, pointModel);
      this._reCreateChild(pointModel);
    }

    // Guidelines
    for (const guideline of srcModel.guidelines) {
      const guidelineModel = new HSApp.ExtraordinarySketch2d.InteractiveModel(
        guideline,
        builder,
        entity
      );
      entity.addMapModel(guideline, guidelineModel);
      this._reCreateChild(guidelineModel);
    }
  }

  private _reCreateChild(interactiveModel: unknown): void {
    let childDisplay = this.getChildItem(interactiveModel.id);

    if (childDisplay) {
      this.removeChild(childDisplay);
      this.canvas.removeDisplayObject(childDisplay);
      childDisplay = undefined;
    }

    if (!childDisplay) {
      childDisplay = this._createChildDisplay(interactiveModel);
      childDisplay?.init();
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

  private _createChildDisplay(interactiveModel: unknown): unknown {
    const srcModel = interactiveModel.srcModel;

    if (srcModel instanceof HSCore.Model.ExtraordinaryBackground) {
      return new HSApp.View.SVG.ExtraordinarySketch2d.Background(
        this.context,
        this,
        this._svgGroups!.bkg,
        interactiveModel,
        this._svgGroups!.dimension
      );
    }

    if (srcModel instanceof HSCore.Model.ExtraordinaryFace2d) {
      return new HSApp.View.SVG.ExtraordinarySketch2d.Face(
        this.context,
        this,
        this._svgGroups!.face,
        interactiveModel
      );
    }

    if (srcModel instanceof HSCore.Model.ExtraordinaryEdge) {
      const curve = srcModel.curve;

      if (curve instanceof HSCore.Model.ExtraordinaryLine2d) {
        return new HSApp.View.SVG.ExtraordinarySketch2d.Line(
          this.context,
          this,
          this._svgGroups!.edge,
          interactiveModel
        );
      }

      if (curve instanceof HSCore.Model.ExtraordinaryCircle2d) {
        return new HSApp.View.SVG.ExtraordinarySketch2d.Circle(
          this.context,
          this,
          this._svgGroups!.edge,
          interactiveModel
        );
      }

      if (curve instanceof HSCore.Model.ExtraordinaryCircleArc2d) {
        return new HSApp.View.SVG.ExtraordinarySketch2d.CircleArc(
          this.context,
          this,
          this._svgGroups!.edge,
          interactiveModel
        );
      }
    }

    if (srcModel instanceof HSCore.Model.ExtraordinaryPoint2d) {
      return new HSApp.View.SVG.ExtraordinarySketch2d.Point(
        this.context,
        this,
        this._svgGroups!.point,
        interactiveModel
      );
    }

    if (srcModel instanceof HSCore.Model.ExtraordinaryGuideline) {
      return new HSApp.View.SVG.ExtraordinarySketch2d.GuideLine2d(
        this.context,
        this,
        this._svgGroups!.dimension,
        interactiveModel
      );
    }

    return undefined;
  }
}