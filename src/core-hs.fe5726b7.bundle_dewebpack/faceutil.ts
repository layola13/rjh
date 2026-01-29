export interface Loop {
  ID: string;
  getLoopVertices(): unknown[];
}

export interface Face {
  outerLoop: Loop;
  innerLoops: Record<string, Loop>;
}

export type Point = unknown;

interface LoopUtilInterface {
  updateLoopByPoints(loop: Loop, points: Point[]): Loop;
}

declare module './LoopUtil' {
  export const LoopUtil: LoopUtilInterface;
}

import { LoopUtil } from './LoopUtil';

function findMatchingLoop(points: Point[], loops: Loop[]): Loop {
  return loops.find(loop => loop.getLoopVertices().length === points.length) || loops[0];
}

export const FaceUtil = {
  updateIsolateFace(face: Face, outerPoints: Point[], innerPointsArray: Point[][]): void {
    face.outerLoop = LoopUtil.updateLoopByPoints(face.outerLoop, outerPoints);

    const updatedInnerLoops: Record<string, Loop> = {};
    const existingInnerLoops = Object.values(face.innerLoops);

    innerPointsArray.forEach((points: Point[]) => {
      const matchingLoop = findMatchingLoop(points, existingInnerLoops);
      
      if (matchingLoop) {
        const index = existingInnerLoops.indexOf(matchingLoop);
        if (index > -1) {
          existingInnerLoops.splice(index, 1);
        }
      }

      const updatedLoop = LoopUtil.updateLoopByPoints(matchingLoop, points);
      
      if (updatedLoop) {
        updatedInnerLoops[updatedLoop.ID] = updatedLoop;
      }
    });

    face.innerLoops = updatedInnerLoops;
  }
};