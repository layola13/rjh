import { ExtrudedBody } from './ExtrudedBody';

interface EdgeProfile {
  profile: unknown;
  XSize: number;
  YSize: number;
}

interface WindowSillParameters {
  points?: THREE.Vector2[];
  edgeProfile?: EdgeProfile;
  moldingIndices?: number[];
  secondMoldingIndices?: number[];
  moldingFlip?: boolean;
}

interface Entity {
  parameters?: WindowSillParameters;
}

interface MoldingData {
  profile: unknown;
  profileSizeX: number;
  profileSizeY: number;
}

interface WebCADDocument {
  addMolding(
    guid: string,
    paths1: THREE.Vector2[][],
    paths2: THREE.Vector2[][],
    options: { data: MoldingData },
    offset: number,
    flip?: boolean
  ): void;
}

export class WindowSill extends ExtrudedBody {
  protected entity: Entity;
  protected originalPoints: THREE.Vector2[];
  protected _webCADDocument: WebCADDocument;

  constructor(
    entity: Entity,
    originalPoints: THREE.Vector2[],
    webCADDocument: WebCADDocument,
    additionalParam: unknown
  ) {
    super(entity, originalPoints, webCADDocument, additionalParam);
  }

  onUpdate(): void {
    const parameters = this.entity.parameters;
    if (!parameters) {
      return;
    }

    const { points, edgeProfile, moldingIndices, secondMoldingIndices } = parameters;
    
    if (!points) {
      return;
    }

    if (points && THREE.ShapeUtils.isClockWise(points)) {
      parameters.points.reverse();
    }

    super.onUpdate();

    const addMoldingForIndices = (indices?: number[]): void => {
      if (indices && indices.length > 1 && edgeProfile) {
        const selectedPoints = indices.map(index => this.originalPoints[index]);
        
        const moldingData: MoldingData = {
          profile: edgeProfile.profile,
          profileSizeX: edgeProfile.XSize,
          profileSizeY: edgeProfile.YSize
        };

        this._webCADDocument.addMolding(
          HSCore.Util.String.randomGUID(),
          [selectedPoints],
          [selectedPoints],
          { data: moldingData },
          0,
          this.entity.parameters.moldingFlip
        );
      }
    };

    addMoldingForIndices(moldingIndices);
    addMoldingForIndices(secondMoldingIndices);
  }
}