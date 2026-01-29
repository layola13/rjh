import { Polygon } from '../geometry/polygon';
import { ExtraordinarySketchBase } from './extraordinary-sketch-base';
import { ExtraordinaryWire } from './extraordinary-wire';

interface BuilderCurve {
  curve: any;
  topo: string;
}

interface BuilderRegion {
  outer: BuilderCurve[];
  holes: BuilderCurve[][];
  topo: string;
}

interface PolygonData {
  outer: any[];
  holes: any[][];
}

interface DecodedTopoName {
  faceId: number;
  topoName?: string;
}

export class ExtraordinaryFace2d extends ExtraordinarySketchBase {
  private _outerLoop: ExtraordinaryWire;
  private _innerLoops: ExtraordinaryWire[];
  public topos: string[];

  constructor(id: any) {
    super(id);
    this._outerLoop = new ExtraordinaryWire([], this);
    this._innerLoops = [];
    this.topos = [];
  }

  get outerLoop(): ExtraordinaryWire {
    return this._outerLoop;
  }

  setOuterLoop(wire: ExtraordinaryWire): void {
    wire.face = this;
    this._outerLoop = wire;
  }

  get innerLoops(): ExtraordinaryWire[] {
    return this._innerLoops;
  }

  setInnerLoops(loops: ExtraordinaryWire[]): void {
    loops.forEach((loop) => {
      loop.face = this;
    });
    this._innerLoops = loops;
  }

  toBuilderRegion(context: any): BuilderRegion {
    const outerCurves = this.outerLoop.toBuilderCurves(context);
    const holeCurves = this.innerLoops.map((loop) => loop.toBuilderCurves(context));

    return {
      outer: this.outerLoop.toMathLoop().isAnticlockwise() 
        ? outerCurves 
        : this._reverseBuilderCurve(outerCurves),
      holes: holeCurves.map((curves, index) => 
        this.innerLoops[index].toMathLoop().isAnticlockwise() 
          ? this._reverseBuilderCurve(curves) 
          : curves
      ),
      topo: `${this.id}_${this.topoName ?? 'null'}`
    };
  }

  toMathPolygon(): Polygon {
    const outerMathLoop = this.outerLoop.toMathLoop();
    if (!outerMathLoop.isAnticlockwise()) {
      outerMathLoop.reverse();
    }

    const innerMathLoops = this.innerLoops.map((loop) => {
      const mathLoop = loop.toMathLoop();
      if (mathLoop.isAnticlockwise()) {
        mathLoop.reverse();
      }
      return mathLoop;
    });

    return new Polygon([outerMathLoop, ...innerMathLoops]);
  }

  toPolygon(): PolygonData {
    const outerMathLoop = this.outerLoop.toMathLoop();
    if (!outerMathLoop.isAnticlockwise()) {
      outerMathLoop.reverse();
    }

    return {
      outer: outerMathLoop.getAllCurves(),
      holes: this.innerLoops.map((loop) => {
        const mathLoop = loop.toMathLoop();
        if (mathLoop.isAnticlockwise()) {
          mathLoop.reverse();
        }
        return mathLoop.getAllCurves();
      })
    };
  }

  get topoName(): string | undefined {
    return this.topos.length ? this.topos.join(':') : undefined;
  }

  replaceTopoName(oldName: string, newName: string): void {
    const updatedTopos: string[] = [];
    const uniqueNames = new Set<string>();

    this.topos.forEach((name) => {
      let finalName = name;
      if (name === oldName) {
        finalName = newName;
      }
      if (!uniqueNames.has(finalName)) {
        uniqueNames.add(finalName);
        updatedTopos.push(finalName);
      }
    });

    this.topos = updatedTopos;
  }

  private _reverseBuilderCurve(curves: BuilderCurve[]): BuilderCurve[] {
    const reversed: BuilderCurve[] = [];
    for (let i = curves.length - 1; i >= 0; --i) {
      const curve = curves[i];
      reversed.push({
        curve: curve.curve.reversed(),
        topo: curve.topo
      });
    }
    return reversed;
  }

  static decodeTopoName(encodedName: string): DecodedTopoName {
    if (encodedName === 'background') {
      return {
        faceId: -1,
        topoName: 'background'
      };
    }

    const parts = encodedName.split('_');
    return {
      faceId: parseInt(parts[0]),
      topoName: parts[1] === 'null' ? undefined : parts[1]
    };
  }
}