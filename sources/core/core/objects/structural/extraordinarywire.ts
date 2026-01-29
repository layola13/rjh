import { Loop } from './Loop';

interface Coedge {
  edge: Edge;
  isRev: boolean;
  topoName: string;
}

interface Edge {
  curve: Curve;
}

interface Curve {
  toMathCurve(): MathCurve;
}

interface MathCurve {
  reversed(): MathCurve;
}

interface Face {
  // Add face properties as needed
}

interface BuilderCurve {
  curve: MathCurve;
  topo: string;
}

export class ExtraordinaryWire {
  private _coedges: Coedge[];
  public face: Face;

  constructor(coedges: Coedge[], face: Face) {
    this._coedges = coedges;
    this.face = face;
  }

  get coedges(): Coedge[] {
    return this._coedges;
  }

  setCoedges(coedges: Coedge[]): void {
    this._coedges = coedges;
  }

  /**
   * Converts coedges to builder curves, optionally filtering out specific edges
   * @param excludedEdges - Optional array of edges to exclude from the result
   * @returns Array of builder curves with their topology names
   */
  toBuilderCurves(excludedEdges?: Edge[]): BuilderCurve[] {
    return this.coedges.reduce((result, coedge) => {
      if (excludedEdges && excludedEdges.includes(coedge.edge)) {
        return result;
      }

      const curve = coedge.isRev 
        ? coedge.edge.curve.toMathCurve().reversed() 
        : coedge.edge.curve.toMathCurve();

      result.push({
        curve,
        topo: `${coedge.topoName}`
      });

      return result;
    }, [] as BuilderCurve[]);
  }

  /**
   * Converts the wire's coedges to a mathematical loop
   * @returns Loop constructed from the coedges' curves
   */
  toMathLoop(): Loop {
    const curves = this.coedges.reduce((result, coedge) => {
      const mathCurve = coedge.isRev 
        ? coedge.edge.curve.toMathCurve().reversed() 
        : coedge.edge.curve.toMathCurve();

      result.push(mathCurve);
      return result;
    }, [] as MathCurve[]);

    return new Loop(curves);
  }
}