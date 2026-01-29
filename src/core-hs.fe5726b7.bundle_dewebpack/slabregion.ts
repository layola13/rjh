import { Region } from './Region';
import { SlabTopoFace } from './SlabTopoFace';
import { TopoName } from './TopoName';

export enum SlabExtrudeType {
  Side = "side"
}

interface CoEdge {
  curve: Curve;
  clone(): CoEdge;
}

interface Curve {
  transform(matrix: Matrix3): void;
  reverse(): void;
  translate(vector: Vector): void;
}

interface Matrix3 {
  // Matrix transformation interface
}

interface Vector {
  // Vector interface for translation
}

interface CoEdgePath {
  outer: CoEdge[];
  holes: CoEdge[][];
}

interface MirrorTransform {
  matrix3: Matrix3;
}

interface Layer {
  slabThickness: number;
}

interface ShellWrapper {
  sideFaces: Face[][];
}

interface Face {
  // Face interface
}

export class SlabRegion extends Region {
  private _layer: Layer;
  public coEdgePath!: CoEdgePath;
  public linkWallIds!: string[];
  public shellWrapper!: ShellWrapper;
  public topoFaces: SlabTopoFace[] = [];

  constructor(id: string, layer: Layer) {
    super(id);
    this._layer = layer;
  }

  static create(
    id: string,
    coEdgePath: CoEdgePath,
    layer: Layer,
    linkWallIds: string[]
  ): SlabRegion {
    const region = new SlabRegion(id, layer);
    region.coEdgePath = coEdgePath;
    region.linkWallIds = linkWallIds;
    return region;
  }

  extrudeBody(): void {
    const thickness = this._layer.slabThickness;
    super.extrudeBody(-thickness, 0);

    let faceIndex = 0;
    this.shellWrapper.sideFaces.forEach((faceGroup) =>
      faceGroup.forEach((face) => {
        faceIndex++;
        const topoFace = new SlabTopoFace(
          face,
          new TopoName("", SlabExtrudeType.Side, faceIndex),
          this.linkWallIds
        );
        this.topoFaces.push(topoFace);
      })
    );
  }

  clone(): SlabRegion {
    const clonedRegion = SlabRegion.create(
      this.id,
      {
        outer: this.coEdgePath.outer.map((edge) => edge.clone()),
        holes: this.coEdgePath.holes.map((hole) =>
          hole.map((edge) => edge.clone())
        )
      },
      this._layer,
      this.linkWallIds.slice()
    );

    clonedRegion.shellWrapper = this.shellWrapper;
    clonedRegion.topoFaces = this.topoFaces.slice();
    return clonedRegion;
  }

  mirror(transform: MirrorTransform): void {
    this.coEdgePath.outer.forEach((edge) => {
      edge.curve.transform(transform.matrix3);
      edge.curve.reverse();
    });
    this.coEdgePath.outer.reverse();

    this.coEdgePath.holes.forEach((hole) => {
      hole.forEach((edge) => {
        edge.curve.transform(transform.matrix3);
        edge.curve.reverse();
      });
      hole.reverse();
    });
  }

  translate(vector: Vector): void {
    this.coEdgePath.outer.forEach((edge) => {
      edge.curve.translate(vector);
    });

    this.coEdgePath.holes.forEach((hole) => {
      hole.forEach((edge) => {
        edge.curve.translate(vector);
      });
    });
  }
}