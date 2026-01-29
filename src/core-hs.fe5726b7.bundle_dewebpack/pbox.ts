import { PModel } from './PModel';
import { WebCadDocument } from './WebCadDocument';

interface Point2D {
  x: number;
  y: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Plane {
  normal: THREE.Vector3;
  xRay: THREE.Vector3;
}

interface ExtrudeOptions {
  paths: THREE.Vector3[][];
  plane: Plane;
  xRay: THREE.Vector3;
  targetNormal: THREE.Vector3;
  zlength: number;
}

interface BoxEntity {
  XLength: number;
  YLength: number;
  ZLength: number;
}

export class PBox extends PModel {
  private _webCadDocument: WebCadDocument;
  private _cache?: string;
  protected entity: BoxEntity;

  constructor(entity: BoxEntity, t: unknown, o: unknown) {
    super(entity, t, o);
    this._webCadDocument = new WebCadDocument();
  }

  /**
   * Gets the 2D profile points of the box in counter-clockwise order
   */
  getProfile(): Point2D[] {
    const halfXLength = this.entity.XLength / 2;
    const halfYLength = this.entity.YLength / 2;

    let profile: Point2D[] = [
      { x: -halfXLength, y: -halfYLength },
      { x: halfXLength, y: -halfYLength },
      { x: halfXLength, y: halfYLength },
      { x: -halfXLength, y: halfYLength }
    ];

    if (HSCore.Util.Math.isClockwise(profile)) {
      profile = profile.slice(0).reverse();
    }

    return profile;
  }

  /**
   * Updates the 3D geometry by extruding the profile
   */
  onUpdate(): void {
    const profilePoints = this.getProfile().map(
      (point) => new THREE.Vector3(point.x, point.y, 0)
    );

    const plane = GeLib.PolygonUtils.getPlaneFromPolygon(profilePoints);
    if (!plane) {
      return;
    }

    const extrudeOptions: ExtrudeOptions = {
      paths: [profilePoints],
      plane: plane,
      xRay: plane.xRay,
      targetNormal: plane.normal,
      zlength: this.entity.ZLength
    };

    const optionsCache = JSON.stringify(extrudeOptions);

    if (this._cache !== optionsCache) {
      this._cache = optionsCache;
      this._webCadDocument = new WebCadDocument();
      this._webCadDocument.addExtrudedBody(extrudeOptions, this.entity.ZLength);
    }
  }
}