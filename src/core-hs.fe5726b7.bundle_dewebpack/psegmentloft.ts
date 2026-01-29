import { PModel } from './PModel';
import { WebCadDocument } from './WebCadDocument';
import { Logger } from './Logger';

interface PathData {
  paths: GeLib.Polygon[];
  plane: GeLib.Plane;
  xRay: GeLib.Vector3;
  targetNormal: GeLib.Vector3;
}

interface ExtrusionConfig {
  pathData: PathData;
  value: number;
}

interface Plane {
  xRay: GeLib.Vector3;
  normal: GeLib.Vector3;
}

export class PSegmentLoft extends PModel {
  private _webCadDocument: WebCadDocument;
  private _cache?: string;
  protected originalPaths?: GeLib.Polygon[];
  protected snappingFaceKeys?: string[];

  constructor(
    entity: unknown,
    param2: unknown,
    param3: unknown
  ) {
    super(entity, param2, param3);
    this._webCadDocument = new WebCadDocument();
  }

  onUpdate(): void {
    const profilePath = this.entity.getProfilePath();
    const length = this.entity.length;
    const paths: GeLib.Polygon[] = [profilePath];

    let plane: Plane | undefined;

    if (paths.length !== 0) {
      plane = GeLib.PolygonUtils.getPlaneFromPolygon(paths[0]);
    }

    if (!plane) {
      Logger.console.error('Invalid PExtruding paths.');
      return;
    }

    const xRay = plane.xRay;
    const normal = plane.normal;

    this.originalPaths = paths;
    this.snappingFaceKeys = ['extrudedface'];

    const config: ExtrusionConfig = {
      pathData: {
        paths,
        plane,
        xRay,
        targetNormal: normal
      },
      value: length
    };

    const configJson = JSON.stringify(config);

    if (this._cache && this._cache === configJson) {
      return;
    }

    this._cache = configJson;
    this._webCadDocument = new WebCadDocument();
    this._webCadDocument.addExtrudedBody(config.pathData, config.value);
  }
}