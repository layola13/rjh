import { Util } from './157475';

interface Point {
  x: number;
  y: number;
}

interface Contour {
  outer: Point[][];
  holes: Point[][];
}

interface ContentBound {
  center: Point;
  width: number;
  height: number;
  rotation: number;
}

interface BrepBound {
  appendPoint(point: Point): void;
}

interface FloorplanContent {
  x: number;
  y: number;
  instanceOf(modelClass: string): boolean;
}

interface Room {
  forEachContent(callback: (content: FloorplanContent) => void): void;
}

interface Floorplan {
  forEachRoom(callback: (room: Room) => void): void;
  forEachContent(callback: (content: FloorplanContent) => void): void;
}

declare const HSCore: {
  Util: {
    BrepBound: new (minX: number, minY: number, maxX: number, maxY: number) => BrepBound;
    Math: {
      getBounds(path: Point[]): [number, number, number, number] | null;
    };
  };
};

declare const HSConstants: {
  ModelClass: {
    NgOpening: string;
    NgCornerWindow: string;
    NgBayWindow: string;
    NgPOrdinaryWindow: string;
  };
};

class FloorplanBoundCalculator {
  floorplan: Floorplan;
  borderlinePaths: Point[][];
  contours: Contour[];
  innerPaths: Point[][];
  outerPaths: Point[][];
  innerBound: BrepBound | undefined;
  outerBound: BrepBound | undefined;

  constructor(floorplan: Floorplan) {
    this.floorplan = floorplan;
    this.borderlinePaths = [];
    this.contours = [];
    this.innerPaths = [];
    this.outerPaths = [];
    this.innerBound = undefined;
    this.outerBound = undefined;
  }

  eval(): void {
    this.borderlinePaths = Util.computeWallStructureBorderLines(this.floorplan);
    this.contours = Util.findContours(this.borderlinePaths);

    let innerPaths: Point[][] = [];
    let outerPaths: Point[][] = [];

    this.contours.forEach((contour) => {
      innerPaths = innerPaths.concat(contour.holes);
      outerPaths.push(contour.outer);
    });

    this.innerPaths = innerPaths;
    this.outerPaths = outerPaths;
    this.innerBound = this._computeBound(this.innerPaths);
    this.outerBound = this._computeBound(this.outerPaths);
    this._adjustOuterBound(this.outerBound);
  }

  private _computeBound(paths: Point[][]): BrepBound {
    const bound = new HSCore.Util.BrepBound(Infinity, Infinity, 0, 0);
    
    paths.forEach((path) => {
      path.forEach((point) => {
        bound.appendPoint(point);
      });
    });

    return bound;
  }

  private _adjustOuterBound(outerBound: BrepBound): void {
    const processContent = (content: FloorplanContent): void => {
      let contentBound: ContentBound | undefined;

      if (content.instanceOf(HSConstants.ModelClass.NgOpening)) {
        contentBound = Util.getContentBound(content, false);
      } else if (content.instanceOf(HSConstants.ModelClass.NgCornerWindow)) {
        const cornerWindowPaths = Util.getCornerWindowPaths(content);
        
        if (!cornerWindowPaths || !cornerWindowPaths.outPath) {
          return;
        }

        let outPath = cornerWindowPaths.outPath;

        if (content.instanceOf(HSConstants.ModelClass.NgBayWindow) || 
            content.instanceOf(HSConstants.ModelClass.NgPOrdinaryWindow)) {
          outPath.forEach((point) => {
            point.x += content.x;
            point.y += content.y;
          });
        }

        const bounds = HSCore.Util.Math.getBounds(outPath);
        
        if (!bounds) {
          return;
        }

        contentBound = {
          center: {
            x: bounds[0] + bounds[2] / 2,
            y: bounds[1] + bounds[3] / 2
          },
          width: bounds[2],
          height: bounds[3],
          rotation: 0
        };
      }

      if (contentBound) {
        Util.computeOutline(
          contentBound.center,
          contentBound.width,
          contentBound.height,
          contentBound.rotation
        ).forEach((point) => {
          outerBound.appendPoint(point);
        });
      }
    };

    this.floorplan.forEachRoom((room) => {
      room.forEachContent(processContent);
    });

    this.floorplan.forEachContent(processContent);
  }
}

export default FloorplanBoundCalculator;