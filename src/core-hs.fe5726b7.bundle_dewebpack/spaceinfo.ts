interface Path {
  outer: any[];
  holes: any[];
}

interface Layer {
  floorSlabs: Record<string, FloorSlab>;
}

interface FloorSlab {
  path?: Path;
}

export class SpaceInfo {
  path: Path;
  floors: any[];
  ceilings: any[];
  slabFaces: any[];
  structureFaces: any[];
  beamFaces: any[];
  structures: any[];
  beams: any[];
  private _layer: Layer;

  constructor(layer: Layer) {
    this.path = {
      outer: [],
      holes: []
    };
    this.floors = [];
    this.ceilings = [];
    this.slabFaces = [];
    this.structureFaces = [];
    this.beamFaces = [];
    this.structures = [];
    this.beams = [];
    this._layer = layer;
  }

  containFace(face: any): boolean {
    return !!face && (
      this.floors.includes(face) ||
      this.ceilings.includes(face) ||
      this.beamFaces.includes(face) ||
      this.structureFaces.includes(face) ||
      this.slabFaces.includes(face)
    );
  }

  get allFaces(): any[] {
    return this.structureFaces
      .concat(this.floors)
      .concat(this.ceilings)
      .concat(this.slabFaces)
      .concat(this.beamFaces);
  }

  getBelongSlab(): FloorSlab | undefined {
    const slabs = Object.values(this._layer.floorSlabs);
    return slabs.length === 1
      ? slabs[0]
      : slabs.find(slab => 
          slab.path !== undefined && 
          TgUtil.isPathPathOverlap(slab.path, this.path)
        );
  }
}

// TgUtil is referenced but not defined in the provided code
// You'll need to import it from the appropriate module
declare const TgUtil: {
  isPathPathOverlap(path1: Path, path2: Path): boolean;
};