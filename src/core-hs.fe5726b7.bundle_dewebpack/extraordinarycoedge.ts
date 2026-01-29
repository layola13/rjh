interface Edge {
  coedges: ExtraordinaryCoedge[];
  topoName: string;
  curve: {
    toMathCurve(): MathCurve;
  };
}

interface MathCurve {
  reversed(): MathCurve;
}

interface DecodedTopoName {
  edgeId: number;
  edgeTopoName: string | undefined;
  isRev: boolean;
}

export class ExtraordinaryCoedge {
  private _isRev: boolean;
  private _edge: Edge;

  constructor(isRev: boolean, edge: Edge) {
    this._isRev = isRev;
    this._edge = edge;
  }

  get isRev(): boolean {
    return this._isRev;
  }

  setIsRev(isRev: boolean): void {
    this._isRev = isRev;
  }

  get edge(): Edge {
    return this._edge;
  }

  get another(): ExtraordinaryCoedge | undefined {
    return this._edge.coedges.find((coedge) => coedge !== this);
  }

  get topoName(): string {
    return `${this.edge.topoName}_${this.isRev ? "true" : "false"}`;
  }

  toMathCurve(): MathCurve {
    return this._isRev 
      ? this.edge.curve.toMathCurve().reversed() 
      : this.edge.curve.toMathCurve();
  }

  static decodeTopoName(topoName: string): DecodedTopoName {
    const parts = topoName.split("_");
    
    if (topoName.startsWith("background")) {
      return {
        edgeId: -1,
        edgeTopoName: "background",
        isRev: false
      };
    }

    return {
      edgeId: parseInt(parts[0]),
      edgeTopoName: parts[1] === "null" ? undefined : parts[1],
      isRev: parts[2] === "true"
    };
  }
}