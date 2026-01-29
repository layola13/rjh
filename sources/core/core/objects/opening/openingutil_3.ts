interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Wall {
  id: string;
  from: Point3D;
  to: Point3D;
}

interface WallDistance {
  dist: number;
  wall: Wall;
}

interface Element {
  x: number;
  y: number;
  z?: number;
  children?: Record<string, Element>;
  instanceOf(className: string): boolean;
  assignTo(wall: Wall): void;
  getHost(): Wall | null;
}

interface ReassignParams {
  children?: Record<string, Element>;
}

export const OpeningUtil = {
  /**
   * Reassigns opening elements to their closest wall hosts
   * @param element - The parent element containing openings
   * @param walls - Array of walls to reassign to
   * @param wallMap - Map of wall IDs to wall data
   */
  reassignOpeningHost: (
    element: ReassignParams | null | undefined,
    walls: Wall[] | null | undefined,
    wallMap: Map<string, Wall>
  ): void => {
    if (!element) return;

    const children = element.children;
    const wallArray = walls || [];
    let openings: Element[] = [];

    if (children) {
      openings = Object.values(children).filter(
        (child) =>
          HSCore.Util.Content.isWallOpening(child) ||
          child.instanceOf(HSConstants.ModelClass.NgCornerWindow) ||
          child.instanceOf(HSConstants.ModelClass.NgBayWindow)
      );

      if (wallArray.length && openings.length) {
        openings.forEach((opening) => {
          let minDistanceSquared = Infinity;
          let candidateWalls: WallDistance[] = [];
          let isAssigned = false;

          const openingPosition = new THREE.Vector3(opening.x, opening.y, 0);

          for (let i = 0, length = wallArray.length; i < length; i++) {
            const wall = wallArray[i];
            const wallStart = wall.from;
            const wallEnd = wall.to;
            const wallLine = new THREE.Line3(
              new THREE.Vector3(wallStart.x, wallStart.y, wallStart.z),
              new THREE.Vector3(wallEnd.x, wallEnd.y, wallEnd.z)
            );
            const closestPoint = wallLine.closestPointToPoint(openingPosition);

            if (opening.instanceOf(HSConstants.ModelClass.NgOpening)) {
              if (GeLib.LineUtils.isPointInsideLineSegment(openingPosition, wallLine)) {
                opening.assignTo(wall);
                isAssigned = true;
              }
            } else {
              const hostWall = opening.getHost();
              if (hostWall) {
                const hostFrom = hostWall.from;
                const hostTo = hostWall.to;
                let hostLine: THREE.Line3;

                if (hostFrom && hostTo) {
                  hostLine = new THREE.Line3(
                    new THREE.Vector3(hostFrom.x, hostFrom.y, hostFrom.z),
                    new THREE.Vector3(hostTo.x, hostTo.y, hostTo.z)
                  );
                } else {
                  const wallData = wallMap.get(hostWall.id);
                  if (!wallData) continue;
                  hostLine = new THREE.Line3(wallData.from, wallData.to);
                }

                const currentWallLine = new THREE.Line3(wallStart, wallEnd);

                switch (true) {
                  case opening.instanceOf(HSConstants.ModelClass.NgPOrdinaryWindow):
                  case opening.instanceOf(HSConstants.ModelClass.NgBayWindow):
                  case opening.instanceOf(HSConstants.ModelClass.NgCornerWindow):
                    if (
                      GeLib.LineUtils.isSameLines(hostLine, currentWallLine) &&
                      GeLib.LineUtils.isPointOnLineSegment(closestPoint, wallLine)
                    ) {
                      opening.assignTo(wall);
                      isAssigned = true;
                    }
                }
              }
            }

            if (isAssigned) break;

            const distanceSquared = openingPosition.distanceToSquared(closestPoint);
            if (GeLib.MathUtils.nearlyEqual(distanceSquared, minDistanceSquared, 0.001)) {
              candidateWalls.push({
                dist: minDistanceSquared,
                wall: wall
              });
            } else if (distanceSquared < minDistanceSquared) {
              minDistanceSquared = distanceSquared;
              candidateWalls[0] = {
                dist: minDistanceSquared,
                wall: wall
              };
              if (candidateWalls.length > 1 && candidateWalls[1].dist !== minDistanceSquared) {
                candidateWalls = candidateWalls.slice(0, 1);
              }
            }
          }

          if (!isAssigned) {
            const hostWall = opening.getHost();
            if (hostWall instanceof HSCore.Model.Wall && (hostWall.from || hostWall.to)) {
              if (children[hostWall.id] && !wallArray.includes(hostWall)) {
                return;
              }

              if (candidateWalls.length === 1) {
                opening.assignTo(candidateWalls[0].wall);
              } else if (candidateWalls.length > 1 && (hostWall.from || hostWall.to)) {
                const hostFrom = hostWall.from;
                const hostTo = hostWall.to;
                let hostLine: THREE.Line3;

                if (hostFrom && hostTo) {
                  hostLine = new THREE.Line3(
                    new THREE.Vector3(hostFrom.x, hostFrom.y, hostFrom.z),
                    new THREE.Vector3(hostTo.x, hostTo.y, hostTo.z)
                  );
                } else {
                  const wallData = wallMap.get(hostWall.id);
                  if (!wallData) return;
                  hostLine = new THREE.Line3(wallData.from, wallData.to);
                }

                let minDistance = Infinity;
                let bestWall = candidateWalls[0].wall;

                for (let i = 0, length = candidateWalls.length; i < length; i++) {
                  const candidateWall = candidateWalls[i].wall;
                  const candidateStart = new THREE.Vector3(
                    candidateWall.from.x,
                    candidateWall.from.y,
                    candidateWall.from.z
                  );
                  const candidateEnd = new THREE.Vector3(
                    candidateWall.to.x,
                    candidateWall.to.y,
                    candidateWall.to.z
                  );
                  const candidateLine = new THREE.Line3(candidateStart, candidateEnd);

                  if (GeLib.LineUtils.isSameLines(hostLine, candidateLine)) {
                    const distanceToStart = openingPosition.distanceTo(candidateStart);
                    const distanceToEnd = openingPosition.distanceTo(candidateEnd);
                    const closerDistance = distanceToStart < distanceToEnd ? distanceToStart : distanceToEnd;

                    if (closerDistance < minDistance) {
                      minDistance = closerDistance;
                      bestWall = candidateWall;
                    }
                  }
                }

                opening.assignTo(bestWall);
              }
            } else if (candidateWalls.length > 0) {
              opening.assignTo(candidateWalls[0].wall);
            }
          }
        });
      }
    }
  }
};