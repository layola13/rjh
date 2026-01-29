import { HSCore } from './HSCore';
import { SvgBase } from './SvgBase';
import { SvgDoorStone } from './SvgDoorStone';
import { MixPaintCapture } from './MixPaintCapture';
import { SvgCommon } from './SvgCommon';

interface IApp {
  floorplan: {
    scene: {
      activeLayer: ILayer;
    };
  };
}

interface ILayer {
  forEachOpening(callback: (opening: IOpening) => void): void;
}

interface IOpening {
  getDoorStoneFace(): unknown;
}

interface ISvgContext {
  _withPaint: boolean;
}

interface ISvgNode {
  layers(): {
    openings: unknown;
  };
}

interface IDrawImageParams {
  unitScale: number;
  image: unknown;
  box2d: unknown;
  svgContext: ISvgContext;
  svgNode: unknown;
}

interface ICaptureResult {
  capture: unknown;
  modelBox: unknown;
}

declare const HSApp: {
  View: {
    SVG: {
      PixiGroupTypeEnum: {
        DoorStone: unknown;
      };
    };
  };
};

export class SvgDoorStones extends SvgBase {
  private _openings: HSCore.Model.Opening[];
  private _svgDoorStones: SvgDoorStone[];
  private _node: unknown;
  private _app: IApp;
  private _ctx: ISvgContext;

  constructor(app: IApp, context: ISvgNode) {
    super(app, context);
    this._openings = [];
    this._node = context.layers().openings;
    this._svgDoorStones = [];
    this._app = app;
    this._ctx = context as unknown as ISvgContext;
  }

  public build(): void {
    const validOpenings: HSCore.Model.Opening[] = [];

    this._app.floorplan.scene.activeLayer.forEachOpening((opening: IOpening) => {
      if (this.isItemValid(opening) && opening instanceof HSCore.Model.Opening && opening.getDoorStoneFace()) {
        validOpenings.push(opening);
        const svgDoorStone = new SvgDoorStone(this._app, this._ctx, opening);
        svgDoorStone.build();
        this._svgDoorStones.push(svgDoorStone);
      }
    });

    this._openings = validOpenings;
  }

  public draw(): void {
    if (this._openings.length === 0) {
      return;
    }

    this._svgDoorStones.forEach((doorStone: SvgDoorStone) => {
      doorStone.draw();
    });

    if (this._ctx._withPaint) {
      const activeLayer = this._app.floorplan.scene.activeLayer;
      this._drawDoorStonesCapture(activeLayer);
    }
  }

  private _drawDoorStonesCapture(layer: ILayer): void {
    const pixiGroupType = HSApp.View.SVG.PixiGroupTypeEnum;
    const captureResult: ICaptureResult | null = new MixPaintCapture(layer).getCapture([pixiGroupType.DoorStone]);

    if (!captureResult) {
      return;
    }

    const drawParams: IDrawImageParams = {
      unitScale: this.unitScale(),
      image: captureResult.capture,
      box2d: captureResult.modelBox,
      svgContext: this._ctx,
      svgNode: this._node
    };

    new SvgCommon().drawImage(drawParams);
  }
}