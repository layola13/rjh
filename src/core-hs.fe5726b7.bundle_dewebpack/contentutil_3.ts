import { Opening } from './Opening';
import { Wall } from './Wall';
import { Slab } from './Slab';
import { Bound } from './Bound';
import { Logger } from './Logger';

interface Point2D {
  x: number;
  y: number;
}

interface PathCommand {
  cmd: string;
  arg: string;
}

interface ProfileEntity {
  profile?: string;
  swing?: number;
}

interface MetadataEntity {
  metadata?: {
    contentType: {
      isTypeOf(types: any): boolean;
    };
  };
  contentType?: {
    isTypeOf(type: any): boolean;
  };
}

interface OpeningEntity extends MetadataEntity {
  profile?: string;
  swing?: number;
  getHost?(): any;
}

interface ParserState {
  currentPos: Point2D | null;
  M(arg: string): Point2D[];
  L(arg: string): Point2D[];
  C(arg: string): Point2D[];
  Q(arg: string): Point2D[];
}

export const ContentUtil = {
  /**
   * Checks if the entity is a wall niche
   */
  isWallNiche(entity: any): boolean {
    return !!(
      entity &&
      entity instanceof Opening &&
      entity.metadata &&
      entity.metadata.contentType.isTypeOf([
        HSCatalog.ContentTypeEnum.WallNiche,
        HSCatalog.ContentTypeEnum.AdjustableArchWallNiche,
        HSCatalog.ContentTypeEnum.RoundWallNiche
      ])
    );
  },

  /**
   * Checks if the entity is a slab hole
   */
  isSlabHole(entity: any): boolean {
    return !!(
      entity &&
      entity instanceof HSCore.Model.Hole &&
      entity.metadata &&
      entity.metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SlabOpening)
    );
  },

  /**
   * Checks if the entity is a slab opening
   */
  isSlabOpening(entity: any): boolean {
    return !!(
      entity &&
      entity instanceof Opening &&
      entity.metadata &&
      entity.metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_slabOpening)
    );
  },

  /**
   * Checks if the entity is a wall opening
   */
  isWallOpening(entity: any): boolean {
    if (!(entity && entity instanceof Opening)) {
      return false;
    }
    
    const host = entity.getHost();
    return (
      (entity.contentType && entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_wallOpening)) ||
      host instanceof Wall
    );
  },

  /**
   * Checks if the entity is a slab niche
   */
  isSlabNiche(entity: any): boolean {
    return !!(
      entity &&
      entity instanceof Opening &&
      entity.metadata &&
      entity.metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SlabNiche)
    );
  },

  /**
   * Gets the center profile of an opening
   */
  getOpeningCenterProfile(entity: ProfileEntity): Point2D[] | undefined {
    if (!entity.profile) {
      return undefined;
    }

    const points = this.parse(entity.profile);
    const pointCount = points.length;

    Logger.console.assert(pointCount > 2, 'invalid profile!');

    if (HSCore.Util.Math.isSamePoint(points[0], points[pointCount - 1])) {
      points.splice(-1, 1);
    }

    const bounds = new Bound();
    points.forEach((point) => {
      bounds.appendPoint(point);
    });

    const center = bounds.getCenter();
    return points.map((point) => ({
      x: point.x - center.x,
      y: point.y - center.y
    }));
  },

  /**
   * Checks if the entity is a niche (wall or slab)
   */
  isNiche(entity: any): boolean {
    return !!(
      entity &&
      entity instanceof Opening &&
      (this.isWallNiche(entity) || this.isSlabNiche(entity))
    );
  },

  /**
   * Parses SVG path-like profile string into array of points
   */
  parse(profile: string): Point2D[] {
    const commandRegex = /^\s*([CLMQ])\s*([\-0-9, . E|e]+)/;
    const coordinateRegex = /^\s*([\-0-9.E|e]+)\s*,\s*([\-0-9.E|e]+)/;

    const parseCoordinates = (arg: string): Point2D[] => {
      const points: Point2D[] = [];
      let remaining = arg;

      while (remaining.length > 0) {
        const match = coordinateRegex.exec(remaining);
        if (!match) {
          break;
        }

        points.push({
          x: Number(parseFloat(match[1]).toFixed(4)),
          y: Number(parseFloat(match[2]).toFixed(4))
        });

        remaining = remaining.replace(match[0], '');
      }

      return points;
    };

    const generateCubicBezierPoints = (
      start: Point2D,
      control1: Point2D,
      control2: Point2D,
      end: Point2D
    ): Point2D[] => {
      const points: Point2D[] = [];

      for (let step = 1; step < 10; step += 1) {
        const t = 0.1 * step;
        const oneMinusT = 1 - t;
        
        const x =
          oneMinusT * oneMinusT * oneMinusT * start.x +
          3 * t * oneMinusT * oneMinusT * control1.x +
          3 * t * t * oneMinusT * control2.x +
          t * t * t * end.x;
        
        const y =
          oneMinusT * oneMinusT * oneMinusT * start.y +
          3 * t * oneMinusT * oneMinusT * control1.y +
          3 * t * t * oneMinusT * control2.y +
          t * t * t * end.y;

        points.push({ x, y });
      }

      points.push(end);
      return points;
    };

    const generateQuadraticBezierPoints = (
      start: Point2D,
      control: Point2D,
      end: Point2D
    ): Point2D[] => {
      const points: Point2D[] = [];

      for (let step = 1; step < 10; step += 1) {
        const t = 0.1 * step;
        const oneMinusT = 1 - t;
        
        const x =
          oneMinusT * oneMinusT * start.x +
          2 * t * oneMinusT * control.x +
          t * t * end.x;
        
        const y =
          oneMinusT * oneMinusT * start.y +
          2 * t * oneMinusT * control.y +
          t * t * end.y;

        points.push({ x, y });
      }

      points.push(end);
      return points;
    };

    const parserState: ParserState = {
      currentPos: null,

      M(arg: string): Point2D[] {
        const points = parseCoordinates(arg);
        parserState.currentPos = points[0];
        return [points[0]];
      },

      L(arg: string): Point2D[] {
        const points = parseCoordinates(arg);
        parserState.currentPos = points[0];
        return [points[0]];
      },

      C(arg: string): Point2D[] {
        const points = parseCoordinates(arg);
        if (points.length !== 3) {
          return [];
        }

        const start = parserState.currentPos!;
        const control1 = points[0];
        const control2 = points[1];
        const end = points[2];

        const bezierPoints = generateCubicBezierPoints(start, control1, control2, end);
        parserState.currentPos = end;
        return bezierPoints;
      },

      Q(arg: string): Point2D[] {
        const points = parseCoordinates(arg);
        if (points.length !== 2) {
          return [];
        }

        const start = parserState.currentPos!;
        const control = points[0];
        const end = points[1];

        const bezierPoints = generateQuadraticBezierPoints(start, control, end);
        parserState.currentPos = end;
        return bezierPoints;
      }
    };

    if (!profile) {
      return [];
    }

    const commands: PathCommand[] = [];
    let remaining = profile;

    while (remaining.length > 0) {
      const match = commandRegex.exec(remaining);
      if (!match) {
        break;
      }

      commands.push({
        cmd: match[1],
        arg: match[2]
      });

      remaining = remaining.replace(match[0], '');
    }

    let allPoints: Point2D[] = [];

    for (let i = 0, length = commands.length; i < length; i++) {
      const command = commands[i];
      const points = parserState[command.cmd as keyof ParserState](command.arg) as Point2D[];
      allPoints = allPoints.concat(points);
    }

    return allPoints;
  },

  /**
   * Parses opening profile and applies swing transformation if needed
   */
  parseOpeningProfile(entity: OpeningEntity): Point2D[] {
    let points = this.parse(entity.profile!);

    if (entity.swing === 2 || entity.swing === 3) {
      points = points.map((point) => ({
        x: -point.x,
        y: point.y
      }));
    }

    return points;
  },

  /**
   * Validates if host is valid for wall opening
   */
  isValidWallOpeningHost(host: any, opening: any): boolean {
    return host instanceof Wall && this.isWallOpening(opening);
  },

  /**
   * Validates if host is valid for slab opening
   */
  isValidSlabOpeningHost(host: any, opening: any): boolean {
    return host instanceof Slab && this.isSlabOpening(opening);
  },

  /**
   * Checks if entity is a wainscot
   */
  isWainscot(entity: any): boolean {
    return !!(
      entity &&
      entity.contentType &&
      entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Wainscot)
    );
  }
};