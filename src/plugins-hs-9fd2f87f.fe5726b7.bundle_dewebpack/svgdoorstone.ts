import { SvgBase } from './SvgBase';
import { SvgPaints } from './SvgPaints';

interface Application {
  // Define application interface properties as needed
}

interface RenderContext {
  _withPaint: boolean;
}

interface RawGeometry {
  outer: unknown;
}

interface DoorStoneFace {
  rawGeometry: RawGeometry;
}

interface Opening {
  getDoorStoneFace(): DoorStoneFace | null | undefined;
}

export class SvgDoorStone extends SvgBase {
  private readonly _opening: Opening;
  private _svgPaints?: SvgPaints;

  constructor(app: Application, ctx: RenderContext, opening: Opening) {
    super(app, ctx);
    this._opening = opening;
  }

  public build(): void {
    if (!this._ctx._withPaint) {
      return;
    }

    const doorStoneFace = this._opening.getDoorStoneFace();
    if (!doorStoneFace) {
      return;
    }

    const outerGeometry = doorStoneFace.rawGeometry.outer;
    this._svgPaints = new SvgPaints(
      this._app,
      this._ctx,
      doorStoneFace,
      outerGeometry,
      []
    );
    this._svgPaints.build();
  }

  public draw(): void {
    if (this._ctx._withPaint && this._svgPaints) {
      this._svgPaints.draw();
    }
  }
}