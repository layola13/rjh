import { HSPaveSDK } from './hspavesdk';
import { HSCore } from './hscore';
import { HSApp } from './hsapp';

interface PathData {
  outer: number[][];
  holes: number[][][];
}

interface Face {
  id: string;
}

interface Floor {
  id: string;
}

interface InteriorWall {
  forEachFace(callback: (face: Face) => void): void;
}

interface RoomInfo {
  wallFaces: {
    faces: Face[];
  };
}

interface GeometryManager {
  getFaceRoomInfo(floor: Floor): RoomInfo;
}

interface Scene {
  forEachLayer(callback: (layer: Layer) => void): void;
}

interface Layer {
  forEachFloor(callback: (floor: Floor) => void): void;
}

interface Floorplan {
  scene: Scene;
  geometryManager: GeometryManager;
}

export class Utils {
  /**
   * Computes the intersection of two paths, considering their outer boundaries and holes
   * @param pathA - First path with outer boundary and holes
   * @param pathB - Second path with outer boundary and holes
   * @returns Intersected path or undefined if no intersection exists
   */
  static InterPath(pathA: PathData, pathB: PathData): HSPaveSDK.Path | undefined {
    const outerPathA = new HSPaveSDK.Path(pathA.outer);
    const outerPathB = new HSPaveSDK.Path(pathB.outer);
    
    const intersectionResult = HSPaveSDK.ClipperService.ins.clip(
      [outerPathA],
      [outerPathB],
      HSPaveSDK.ClipMode.Inter
    );
    
    if (intersectionResult.length === 0) {
      return undefined;
    }
    
    const holesA = pathA.holes.map((hole) => new HSPaveSDK.Path(hole));
    const holesB = pathB.holes.map((hole) => new HSPaveSDK.Path(hole));
    
    const combinedHoles = HSPaveSDK.ClipperService.ins.clip(
      holesA,
      holesB,
      HSPaveSDK.ClipMode.Union
    );
    
    return new HSPaveSDK.Path(
      intersectionResult[0].outer,
      combinedHoles.map((hole) => hole.outer)
    );
  }

  /**
   * Retrieves all faces (floors and walls) that match the given IDs
   * @param faceIds - Array of face IDs to search for
   * @returns Array of matching faces
   */
  static getGroupFaces(faceIds: string[]): Face[] {
    const floorplan: Floorplan = HSApp.App.getApp().floorplan;
    const { scene, geometryManager } = floorplan;
    const matchedFaces: Face[] = [];
    
    const checkAndAddFace = (face: Face): boolean => {
      if (faceIds.includes(face.id)) {
        matchedFaces.push(face);
      }
      return faceIds.length === matchedFaces.length;
    };
    
    scene.forEachLayer((layer: Layer) => {
      layer.forEachFloor((floor: Floor) => {
        if (checkAndAddFace(floor)) {
          return;
        }
        
        const roomInfo = geometryManager.getFaceRoomInfo(floor);
        roomInfo.wallFaces.faces.forEach((wallFace: Face) => {
          checkAndAddFace(wallFace);
        });
        
        const interiorWalls = HSCore.Util.Floor.findInteriorWallsInFloor(floor);
        interiorWalls.forEach((wall: InteriorWall) => {
          wall.forEachFace((wallFace: Face) => {
            checkAndAddFace(wallFace);
          });
        });
      });
    });
    
    return matchedFaces;
  }
}