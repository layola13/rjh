import { HSApp } from './HSApp';
import { RoofsDrawingBkgSketch } from './RoofsDrawingBkgSketch';
import { RoofDrawingRegion } from './RoofDrawingRegion';

interface SVGGroups {
  face: SVGGElement;
  edge: SVGGElement;
  point: SVGGElement;
  dimension: SVGGElement;
}

interface DrawingEntity {
  drawingRegions: DrawingRegion[];
  getSketch(): unknown;
  getBuilder(): unknown;
}

interface DrawingRegion {
  // Add specific properties as needed
}

interface Context {
  group(): SVGGElement;
}

export class RoofsDrawing extends HSApp.View.SVG.Base.Display2D {
  private _svgGroups?: SVGGroups;
  protected node!: SVGGElement;
  protected entity!: DrawingEntity;

  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ) {
    super(param1, param2, param3, param4);
    this._svgGroups = undefined;
  }

  init(): void {
    const context = this.context as Context;
    this.node = context.group();
    
    if ((globalThis as any).g?.DEBUG) {
      this.node.setAttribute('name', 'RoofsDrawing');
    }
    
    this.group.appendChild(this.node);
    this._initGroups();
    this._initBkgSketch();
    
    this.entity.drawingRegions.forEach((region) => {
      this._addChildRegion(region);
    });
  }

  onCleanup(): void {
    super.onCleanup?.();
    this._svgGroups = undefined;
  }

  private _initGroups(): void {
    const context = this.context as Context;
    const groups: Partial<SVGGroups> = {};
    const groupNames: Array<keyof SVGGroups> = ['face', 'edge', 'point', 'dimension'];

    groupNames.forEach((groupName) => {
      const groupElement = context.group();
      
      if ((globalThis as any).g?.DEBUG) {
        groupElement.setAttribute('name', groupName);
      }
      
      this.node.appendChild(groupElement);
      groups[groupName] = groupElement;
    });

    this._svgGroups = groups as SVGGroups;
  }

  private _initBkgSketch(): void {
    const entity = this.entity;
    const sketch = new HSApp.ExtraordinarySketch2d.InteractiveSketch(
      entity.getSketch(),
      entity.getBuilder()
    );
    
    const bkgSketch = new RoofsDrawingBkgSketch(
      this.context,
      this,
      this.group,
      sketch
    );
    
    bkgSketch.init(entity, this._svgGroups!);
    this.addChild(bkgSketch);
    bkgSketch.dirtyGraph();
  }

  onChildAdded(event: { data: { entity: DrawingRegion } }): void {
    const entity = event.data.entity;
    this._addChildRegion(entity);
  }

  private _addChildRegion(region: DrawingRegion): void {
    const roofRegion = new RoofDrawingRegion(
      this.context,
      this,
      this.group,
      region
    );
    
    roofRegion.init(this._svgGroups!);
    this.addChild(roofRegion);
  }
}