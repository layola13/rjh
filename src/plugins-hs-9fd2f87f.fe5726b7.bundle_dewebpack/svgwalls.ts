import { SvgBase } from './SvgBase';
import { Util } from './Util';

interface Wall {
  ID: string;
  crossPath?: number[][];
}

interface PageSetting {
  wall: {
    loadBearingColor: string;
  };
  room: {
    edgeWidth: number;
  };
}

interface Layer {
  forEachWall(callback: (wall: Wall) => void): void;
}

interface Scene {
  activeLayer: Layer;
}

interface Floorplan {
  scene: Scene;
}

interface App {
  floorplan: Floorplan;
}

interface SVGElement {
  id(value: string): SVGElement;
  fill(color: string): SVGElement;
  stroke(options: { width: number; color: number }): SVGElement;
  maskWith(mask: unknown): SVGElement;
}

interface LoadBearingsLayer {
  path(data: string): SVGElement;
}

interface Layers {
  loadbearings: LoadBearingsLayer;
}

interface Context {
  pageSetting(): PageSetting;
  layers(): Layers;
  getWallsMask(): unknown;
}

export class SvgWalls extends SvgBase {
  private _bearwalls: Wall[];
  private _loadbearing?: LoadBearingsLayer;
  protected _app: App;
  protected _ctx: Context;

  constructor(app: App, context: Context) {
    super(app, context);
    this._bearwalls = [];
  }

  public build(): void {
    this._app.floorplan.scene.activeLayer.forEachWall((wall: Wall) => {
      this._bearwalls.push(wall);
    });
  }

  public draw(): void {
    const pageSetting = this._ctx.pageSetting();
    this._loadbearing = this._ctx.layers().loadbearings;
    const wallsMask = this._ctx.getWallsMask();

    this._bearwalls.forEach((wall: Wall) => {
      if (wall.crossPath && wall.crossPath.length > 0) {
        const svgPath = Util.loop2SVG(wall.crossPath, this.unitScale());
        this._loadbearing!
          .path(svgPath)
          .id(`${wall.ID}`)
          .fill(pageSetting.wall.loadBearingColor)
          .stroke({
            width: pageSetting.room.edgeWidth,
            color: pageSetting.room.edgeWidth
          })
          .maskWith(wallsMask);
      }
    });
  }
}