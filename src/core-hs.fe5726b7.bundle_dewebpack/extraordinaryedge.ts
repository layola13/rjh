export interface EdgeTopoInfo {
  edgeId: number;
  edgeTopoName?: string;
}

export class ExtraordinaryEdge extends ExtraordinarySketchBase {
  private _curve: unknown;
  private _coedges: ExtraordinaryCoedge[];
  public topos: string[];

  constructor(curve: unknown, sketchBase: unknown, topos?: string[]) {
    super(sketchBase);
    this._curve = curve;
    this.topos = topos || [];
    this._coedges = [
      new ExtraordinaryCoedge(true, this),
      new ExtraordinaryCoedge(false, this)
    ];
  }

  get curve(): unknown {
    return this._curve;
  }

  setCurve(curve: unknown): void {
    this._curve = curve;
  }

  get coedges(): ExtraordinaryCoedge[] {
    return this._coedges;
  }

  setCoedges(coedges: ExtraordinaryCoedge[]): void {
    this._coedges = coedges;
  }

  get isBackground(): boolean {
    return this.topos.includes("background");
  }

  get topoName(): string {
    const filteredTopos = this.topos.filter((topo) => topo !== "background");
    return `${this.id}_${filteredTopos.length ? filteredTopos.join(":") : "null"}`;
  }

  static decodeTopoName(name: string): EdgeTopoInfo | undefined {
    const parts = name.split("_");
    if (!name.startsWith("background")) {
      return {
        edgeId: parseInt(parts[0]),
        edgeTopoName: parts[1] === "null" ? undefined : parts[1]
      };
    }
  }
}