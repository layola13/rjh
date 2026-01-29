import { ContentUtil } from './ContentUtil';
import { Wall, WallFaceType } from './Wall';
import { WallUtil } from './WallUtil';
import { Slab, SlabFaceType } from './Slab';
import { DocManager } from './DocManager';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Opening {
  x: number;
  y: number;
  z: number;
  swing: number;
  outline?: Position[];
  getHost(): Wall | Slab | null;
}

interface WallInfo {
  outerWallSide: WallFaceType;
}

interface Face {
  id: string;
}

interface SlabProvider {
  getFacePath(face: Face): Position[];
}

export const OpeningUtil = {
  getSnapFaceType(opening: Opening): WallFaceType | SlabFaceType | undefined {
    const host = opening.getHost();
    let faceType: WallFaceType | SlabFaceType | undefined;

    if (ContentUtil.isValidWallOpeningHost(host, opening)) {
      const wall = host as Wall;
      const wallInfo: WallInfo = WallUtil.getWallInfo(wall);

      switch (opening.swing) {
        case 1:
          faceType = wallInfo.outerWallSide === WallFaceType.left 
            ? WallFaceType.left 
            : WallFaceType.right;
          break;
        case 0:
          faceType = wallInfo.outerWallSide === WallFaceType.left 
            ? WallFaceType.right 
            : WallFaceType.left;
          break;
      }
    } else if (ContentUtil.isValidSlabOpeningHost(host, opening)) {
      switch (opening.swing) {
        case 1:
          faceType = SlabFaceType.bottom;
          break;
        case 0:
          faceType = SlabFaceType.top;
          break;
      }
    }

    return faceType;
  },

  getHostFaces(opening: Opening): Face[] {
    const host = opening.getHost();
    if (!host) {
      return [];
    }

    const position: Position = {
      x: opening.x,
      y: opening.y,
      z: opening.z
    };

    if (host instanceof Wall) {
      let outline: Position[] | undefined;
      if (ContentUtil.isWallNiche(opening)) {
        outline = opening.outline;
      }
      return WallUtil.findNearestWallFaces(host, position, outline);
    }

    if (host instanceof Slab) {
      const slabProvider: SlabProvider | undefined = DocManager.instance().slabProviderMap.get(host.id);
      if (!slabProvider) {
        return [];
      }

      const topFaces: Face[] = Object.values(host.getFaces(SlabFaceType.top));
      let matchingTopFaces: Face[] = [];
      const facePathCache = new Map<string, Position[]>();

      topFaces.forEach((face: Face) => {
        const facePath = slabProvider.getFacePath(face);
        facePathCache.set(face.id, facePath);
        if (HSCore.Util.Math.isPointInPolygon(position, facePath)) {
          matchingTopFaces.push(face);
        }
      });

      if (matchingTopFaces.length > 1) {
        let smallestFace = matchingTopFaces[0];
        let smallestPath = facePathCache.get(smallestFace.id)!;

        for (let i = 1; i < matchingTopFaces.length; i++) {
          const currentFace = matchingTopFaces[i];
          const currentPath = facePathCache.get(currentFace.id)!;
          if (HSCore.Util.Math.isPolygonInPolygon(currentPath, smallestPath)) {
            smallestFace = matchingTopFaces[i];
            smallestPath = currentPath;
          }
        }
        matchingTopFaces = [smallestFace];
      }

      if (ContentUtil.isSlabNiche(opening)) {
        return matchingTopFaces;
      }

      const bottomFaces: Face[] = Object.values(host.getFaces(SlabFaceType.bottom));
      let matchingBottomFaces: Face[] = [];

      bottomFaces.forEach((face: Face) => {
        const facePath = slabProvider.getFacePath(face);
        facePathCache.set(face.id, facePath);
        if (HSCore.Util.Math.isPointInPolygon(position, facePath)) {
          matchingBottomFaces.push(face);
        }
      });

      if (matchingBottomFaces.length > 1) {
        let smallestFace = matchingBottomFaces[0];
        let smallestPath = facePathCache.get(smallestFace.id)!;

        for (let i = 1; i < matchingBottomFaces.length; i++) {
          const currentFace = matchingBottomFaces[i];
          const currentPath = facePathCache.get(currentFace.id)!;
          if (HSCore.Util.Math.isPolygonInPolygon(currentPath, smallestPath)) {
            smallestFace = matchingBottomFaces[i];
            smallestPath = currentPath;
          }
        }
        matchingBottomFaces = [smallestFace];
      }

      return [...matchingTopFaces, ...matchingBottomFaces];
    }

    return [];
  }
};