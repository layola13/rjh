import { Line2d, Vector2, Matrix3, Loop, Tolerance, MathAlg } from './math-library';
import { 
  CircleSnapGeometry, 
  ArcSnapGeometry, 
  LineSnapGeometry, 
  PointSnapGeometry,
  SnapGeomType,
  SnapGeometry 
} from './snap-geometry';

export enum SnapResultType {
  Colline = 1,
  Overlap = 2,
  CollineRotation = 3,
  Tangent = 4
}

export enum SnapBreakMode {
  first = 1,
  second = 2
}

interface SnapResultData {
  _master: SnapGeometry;
  _client: SnapGeometry;
  _dx: number;
  _dy: number;
  _drotation?: number;
  _center?: Vector2;
  _loop?: Loop;
  _type: SnapResultType;
}

export class SnapResult {
  private readonly _master: SnapGeometry;
  private readonly _client: SnapGeometry;
  private readonly _dx: number;
  private readonly _dy: number;
  private readonly _drotation?: number;
  private readonly _center?: Vector2;
  private readonly _loop?: Loop;
  private readonly _type: SnapResultType;

  constructor(data: SnapResultData) {
    this._master = data._master;
    this._client = data._client;
    this._dx = data._dx;
    this._dy = data._dy;
    this._drotation = data._drotation;
    this._center = data._center;
    this._loop = data._loop;
    this._type = data._type;
  }

  get master(): SnapGeometry {
    return this._master;
  }

  get client(): SnapGeometry {
    return this._client;
  }

  get dx(): number {
    return this._dx;
  }

  get dy(): number {
    return this._dy;
  }

  get drotation(): number | undefined {
    return this._drotation;
  }

  get center(): Vector2 | undefined {
    return this._center;
  }

  get loop(): Loop | undefined {
    return this._loop;
  }

  get type(): SnapResultType {
    return this._type;
  }

  get id(): string {
    return `${this._master.getID()}/${this._client.getID()}`;
  }

  getJSON(): { dx: number; dy: number; drotation?: number; center?: Vector2 } {
    return {
      dx: this.dx,
      dy: this.dy,
      drotation: this.drotation,
      center: this.center
    };
  }
}

export class SnapStrategy {
  private static _instance?: SnapStrategy;
  static pixelIntensity?: number;

  static getInstance(): SnapStrategy {
    if (!this._instance) {
      this._instance = new SnapStrategy();
      this.pixelIntensity = 7;
    }
    return this._instance;
  }

  get intensity(): number {
    return HSApp.App.getApp().getActive2DView().canvasLengthToModel(SnapStrategy.pixelIntensity!);
  }

  get breakIntensity(): number {
    return 2 * this.intensity;
  }

  execute(masterGeometries: SnapGeometry[], clientGeometries: SnapGeometry[]): SnapResult[] {
    const results: SnapResult[] = [];
    
    if (masterGeometries.length === 0 || clientGeometries.length === 0) {
      return results;
    }

    for (const master of masterGeometries) {
      for (const client of clientGeometries) {
        let snapResult: SnapResult | undefined;

        if (master instanceof CircleSnapGeometry && client instanceof CircleSnapGeometry) {
          snapResult = this.doSnapC2C(master, client);
        } else if (master instanceof CircleSnapGeometry && client instanceof ArcSnapGeometry) {
          snapResult = this.doSnapC2A(master, client);
        } else if (master instanceof CircleSnapGeometry && client instanceof LineSnapGeometry) {
          snapResult = this.doSnapC2L(master, client);
        } else if (master instanceof LineSnapGeometry && client instanceof CircleSnapGeometry) {
          snapResult = this.doSnapL2C(master, client);
        } else if (master instanceof LineSnapGeometry && client instanceof ArcSnapGeometry) {
          snapResult = this.doSnapL2A(master, client);
        } else if (master instanceof LineSnapGeometry && client instanceof LineSnapGeometry) {
          snapResult = this.doSnapL2L(master, client);
        } else if (master instanceof PointSnapGeometry && client instanceof LineSnapGeometry) {
          snapResult = this.doSnapP2L(master, client);
        } else if (master instanceof PointSnapGeometry && client instanceof PointSnapGeometry) {
          snapResult = this.doSnapP2P(master, client);
        }

        if (snapResult) {
          results.push(snapResult);
        }
      }
    }

    return results.filter(result => result.master !== result.client);
  }

  exeBreakCalc(master: SnapGeometry, client: SnapGeometry, mode: SnapBreakMode): SnapResult | undefined {
    const intensityValue = mode === SnapBreakMode.first ? this.breakIntensity : this.breakIntensity / 4;
    let snapResult: SnapResult | undefined;

    if (master instanceof CircleSnapGeometry && client instanceof CircleSnapGeometry) {
      snapResult = this.doSnapC2C(master, client, intensityValue);
    } else if (master instanceof CircleSnapGeometry && client instanceof ArcSnapGeometry) {
      snapResult = this.doSnapC2A(master, client, intensityValue);
    } else if (master instanceof CircleSnapGeometry && client instanceof LineSnapGeometry) {
      snapResult = this.doSnapC2L(master, client, intensityValue);
    } else if (master instanceof LineSnapGeometry && client instanceof CircleSnapGeometry) {
      snapResult = this.doSnapL2C(master, client, intensityValue);
    } else if (master instanceof LineSnapGeometry && client instanceof ArcSnapGeometry) {
      snapResult = this.doSnapL2A(master, client, intensityValue);
    } else if (master instanceof LineSnapGeometry && client instanceof LineSnapGeometry) {
      snapResult = this.doSnapL2L(master, client, intensityValue);
    } else if (master instanceof PointSnapGeometry && client instanceof LineSnapGeometry) {
      snapResult = this.doSnapP2L(master, client, intensityValue);
    } else if (master instanceof PointSnapGeometry && client instanceof PointSnapGeometry) {
      snapResult = this.doSnapP2P(master, client, intensityValue);
    }

    return snapResult;
  }

  private doSnapC2C(
    master: CircleSnapGeometry, 
    client: CircleSnapGeometry, 
    intensity: number = this.intensity
  ): SnapResult | undefined {
    const distance = master.geo.getCenter().distanceTo(client.geo.getCenter()) 
      - master.geo.getRadius() 
      - client.geo.getRadius();

    if (Math.abs(distance) < intensity) {
      const offset = client.geo.getCenter()
        .clone()
        .subtracted(master.geo.getCenter().clone())
        .normalize()
        .multiply(distance);

      const data: SnapResultData = {
        _master: master,
        _client: client,
        _dx: offset.x,
        _dy: offset.y,
        _type: SnapResultType.Tangent
      };

      return new SnapResult(data);
    }

    return undefined;
  }

  private doSnapC2A(
    master: CircleSnapGeometry, 
    client: ArcSnapGeometry, 
    intensity: number = this.intensity
  ): SnapResult | undefined {
    const masterCenter = master.geo.getCenter().clone();
    const clientCenter = client.geo.getCenter().clone();
    const masterRadius = master.geo.getRadius();
    const clientRadius = client.geo.getRadius();
    
    const outerDistance = masterCenter.distanceTo(clientCenter) - masterRadius - clientRadius;

    if (Math.abs(outerDistance) < intensity) {
      const testLine = new Line2d(masterCenter, clientCenter);
      
      if (MathAlg.PositionJudge.curveToCurve(testLine, client.geo) === MathAlg.CurveCuvePositonType.NOT_INTERSECT) {
        return undefined;
      }

      const offset = clientCenter.subtracted(masterCenter).normalized().multiplied(outerDistance);
      
      const data: SnapResultData = {
        _master: master,
        _client: client,
        _dx: offset.x,
        _dy: offset.y,
        _type: SnapResultType.Tangent
      };

      return new SnapResult(data);
    }

    const innerDistance = masterCenter.distanceTo(clientCenter) + masterRadius - clientRadius;

    if (Math.abs(innerDistance) < intensity) {
      const projectedPoint = client.geo.clone().getCircle().getProjectedPtBy(masterCenter);
      
      if (!client.geo.containsPoint(projectedPoint)) {
        return undefined;
      }

      const offset = clientCenter.subtracted(masterCenter).normalized().multiplied(innerDistance);
      
      const data: SnapResultData = {
        _master: master,
        _client: client,
        _dx: offset.x,
        _dy: offset.y,
        _type: SnapResultType.Tangent
      };

      return new SnapResult(data);
    }

    return undefined;
  }

  private doSnapC2L(
    master: CircleSnapGeometry, 
    client: LineSnapGeometry, 
    intensity: number = this.intensity
  ): SnapResult | undefined {
    const masterCenter = master.geo.getCenter().clone();
    const extendedLine = client.geo.clone().extendDouble(1e4);
    const distance = MathAlg.CalculateDistance.pointToCurve2d(masterCenter, extendedLine) 
      - master.geo.getRadius();

    if (Math.abs(distance) < intensity) {
      const offset = client.geo.getProjectedPtBy(masterCenter)
        .clone()
        .subtracted(masterCenter)
        .normalized()
        .multiplied(distance);

      const data: SnapResultData = {
        _master: master,
        _client: client,
        _dx: offset.x,
        _dy: offset.y,
        _type: SnapResultType.Tangent
      };

      return new SnapResult(data);
    }

    return undefined;
  }

  private doSnapL2C(
    master: LineSnapGeometry, 
    client: CircleSnapGeometry, 
    intensity: number = this.intensity
  ): SnapResult | undefined {
    const clientCenter = client.geo.getCenter().clone();
    const clientRadius = client.geo.getRadius();
    const extendedLine = master.geo.clone().extendDouble(1e4);
    const distance = MathAlg.CalculateDistance.pointToCurve2d(clientCenter, extendedLine) - clientRadius;

    if (Math.abs(distance) < intensity) {
      const projectedPoint = master.geo.getProjectedPtBy(clientCenter);
      
      if (!master.geo.containsPoint(projectedPoint)) {
        return undefined;
      }

      const offset = clientCenter.subtracted(projectedPoint).normalized().multiplied(distance);

      const data: SnapResultData = {
        _master: master,
        _client: client,
        _dx: offset.x,
        _dy: offset.y,
        _type: SnapResultType.Tangent
      };

      return new SnapResult(data);
    }

    return undefined;
  }

  private doSnapL2A(
    master: LineSnapGeometry, 
    client: ArcSnapGeometry, 
    intensity: number = this.intensity
  ): SnapResult | undefined {
    const clientCenter = client.geo.getCenter().clone();
    const clientRadius = client.geo.getRadius();
    const extendedLine = master.geo.clone().extendDouble(1e4);
    const distance = MathAlg.CalculateDistance.pointToCurve2d(clientCenter, extendedLine) - clientRadius;

    if (Math.abs(distance) < intensity) {
      const projectedPoint = master.geo.getProjectedPtBy(clientCenter);
      
      if (!master.geo.containsPoint(projectedPoint)) {
        return undefined;
      }

      const offset = clientCenter.subtracted(projectedPoint).normalized().multiplied(distance);

      const data: SnapResultData = {
        _master: master,
        _client: client,
        _dx: offset.x,
        _dy: offset.y,
        _type: SnapResultType.Tangent
      };

      return new SnapResult(data);
    }

    return undefined;
  }

  private doSnapL2L(
    master: LineSnapGeometry, 
    client: LineSnapGeometry, 
    intensity: number = this.intensity
  ): SnapResult | undefined {
    if (master.geo.isParallelTo(client.geo)) {
      const extendedMaster = master.geo.clone().extendDouble(1e4);
      const extendedClient = client.geo.clone().extendDouble(1e4);
      const distance = MathAlg.CalculateDistance.curve2dToCurve2d(extendedMaster, extendedClient);

      if (Math.abs(distance) < intensity) {
        const masterStart = master.geo.getStartPt();
        const offset = client.geo.getProjectedPtBy(masterStart).subtracted(masterStart);

        if (offset.getLength() > intensity) {
          return undefined;
        }

        const data: SnapResultData = {
          _master: master,
          _client: client,
          _dx: offset.x,
          _dy: offset.y,
          _type: SnapResultType.Colline
        };

        return new SnapResult(data);
      }
    }

    return undefined;
  }

  private doSnapP2L(
    master: PointSnapGeometry, 
    client: LineSnapGeometry, 
    intensity: number = this.intensity
  ): SnapResult | undefined {
    if (master.type !== SnapGeomType.CenterPoint && client.type !== SnapGeomType.CenterLine) {
      const distance = MathAlg.CalculateDistance.pointToCurve2d(master.geo, client.geo);

      if (Math.abs(distance) < intensity) {
        const offset = client.geo.getProjectedPtBy(master.geo).subtracted(master.geo);
        const rotationCenter = new Vector2(master.geo).added(offset);
        const relatedLines = master.getRelatedLineGeometry();

        if (relatedLines.length === 0) {
          return undefined;
        }

        let minAbsAngle = 2 * Math.PI;
        let finalAngle = 2 * Math.PI;

        for (const relatedLine of relatedLines) {
          const translateMatrix = Matrix3.makeTranslate(offset);
          const transformedLine = relatedLine.geo.clone().transformed(translateMatrix);
          const targetLine = client.geo.clone();
          const rotationAngle = this.calcRotate(rotationCenter, transformedLine, targetLine);

          if (Math.abs(rotationAngle) < minAbsAngle) {
            minAbsAngle = Math.abs(rotationAngle);
            finalAngle = rotationAngle;
          }
        }

        if (Math.abs(finalAngle) < Tolerance.ANGLE_EPS) {
          return undefined;
        }

        let loop: Loop;

        if (client.relatedGeometries) {
          const curves = client.relatedGeometries
            .filter(geom => 
              geom.type === SnapGeomType.LineEdge || 
              geom.type === SnapGeomType.ArcEdge || 
              geom.type === SnapGeomType.CircleEdge
            )
            .filter((geom): geom is LineSnapGeometry | ArcSnapGeometry => 
              geom instanceof LineSnapGeometry || geom instanceof ArcSnapGeometry
            )
            .map(geom => geom.geo);

          loop = new Loop(curves);
        } else {
          const lineGeo = client.geo;
          const startPoint = lineGeo.getStartPt();
          const endPoint = lineGeo.getEndPt();
          const perpendicular1 = new Vector2(-lineGeo.getDirection().y, lineGeo.getDirection().x)
            .normalized()
            .multiplied(0.1);
          const perpendicular2 = new Vector2(lineGeo.getDirection().y, -lineGeo.getDirection().x)
            .normalized()
            .multiplied(0.1);

          const point1 = startPoint.added(perpendicular1);
          const point2 = endPoint.added(perpendicular1);
          const point3 = endPoint.added(perpendicular2);
          const point4 = startPoint.added(perpendicular2);

          loop = new Loop([point1, point2, point3, point4]);
          
          if (!loop.isAnticlockwise()) {
            loop.reverse();
          }
        }

        const data: SnapResultData = {
          _master: master,
          _client: client,
          _dx: offset.x,
          _dy: offset.y,
          _drotation: (180 * finalAngle) / Math.PI,
          _center: rotationCenter,
          _loop: loop,
          _type: SnapResultType.CollineRotation
        };

        return new SnapResult(data);
      }
    }

    return undefined;
  }

  private doSnapP2P(
    master: PointSnapGeometry, 
    client: PointSnapGeometry, 
    intensity: number = this.intensity
  ): SnapResult | undefined {
    const distance = new Vector2(master.geo).distanceTo(new Vector2(client.geo));

    if (Math.abs(distance) < intensity) {
      const data: SnapResultData = {
        _master: master,
        _client: client,
        _dx: client.geo.x - master.geo.x,
        _dy: client.geo.y - master.geo.y,
        _type: SnapResultType.Overlap
      };

      return new SnapResult(data);
    }

    return undefined;
  }

  private calcRotate(center: Vector2, line: any, targetLine: any): number {
    const centerVector = new Vector2(center);
    const otherPoint = line.getStartPt().equals(center) 
      ? line.getEndPt().clone() 
      : line.getStartPt().clone();
    
    const lineVector = otherPoint.subtracted(centerVector);
    const projectedVector = targetLine.getProjectedPtBy(otherPoint).subtracted(centerVector);
    
    let angle = lineVector.angleTo(projectedVector);

    if (angle > Math.PI / 2) {
      angle -= 2 * Math.PI;
    }

    return -angle;
  }
}