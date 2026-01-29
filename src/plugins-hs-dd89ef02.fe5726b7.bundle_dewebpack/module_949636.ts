interface Point2D {
  x: number;
  y: number;
}

interface WallOffsetInfo {
  wall: HSCore.Model.Wall;
  offset: Point2D;
}

interface WallConnectionResult {
  connectWall: HSCore.Model.Wall;
  nextPoint: Point2D;
}

interface WallChangeUpdateParams {
  wallCurve: any;
  openingPos: HSMath.Vector2;
}

const POSITION_TOLERANCE = 1e-4;
const WALL_OFFSET_MAGNITUDE = 0.06;

function isPointsEqual(point1: Point2D, point2: Point2D): boolean {
  return (
    Math.abs(point1.x - point2.x) < POSITION_TOLERANCE &&
    Math.abs(point1.y - point2.y) < POSITION_TOLERANCE
  );
}

function isWallInSlab(wall: HSCore.Model.Wall): boolean {
  return wall
    .getUniqueParent()
    .layerInfo.slabInfos.some((slabInfo) =>
      slabInfo.structures
        .filter((structure) => structure instanceof HSCore.Model.Wall)
        .some((slabWall) => slabWall === wall)
    );
}

function isHorizontalWall(wall: HSCore.Model.Wall): boolean {
  return Math.abs(wall.fromPoint.y - wall.toPoint.y) < POSITION_TOLERANCE;
}

function isVerticalWall(wall: HSCore.Model.Wall): boolean {
  return Math.abs(wall.fromPoint.x - wall.toPoint.x) < POSITION_TOLERANCE;
}

function findConnectedWalls(
  startWall: HSCore.Model.Wall,
  isHorizontal: boolean,
  isVertical: boolean,
  pivotPoint: Point2D,
  candidateWalls: HSCore.Model.Wall[]
): HSCore.Model.Wall[] {
  const visitedWalls = new Set<HSCore.Model.Wall>();
  visitedWalls.add(startWall);

  const connectedWalls: HSCore.Model.Wall[] = [];

  function findNextConnection(
    currentPoint: Point2D,
    previousWall: HSCore.Model.Wall
  ): WallConnectionResult | null {
    let nextPoint: Point2D | null = null;

    const connectedWall = candidateWalls.find((wall) => {
      if (wall === previousWall || visitedWalls.has(wall)) {
        return false;
      }

      const wallIsHorizontal = isHorizontalWall(wall);
      const wallIsVertical = isVerticalWall(wall);

      if (!(isHorizontal === wallIsHorizontal || isVertical === wallIsVertical)) {
        return false;
      }

      if (isPointsEqual(currentPoint, wall.fromPoint)) {
        nextPoint = wall.toPoint;
        return true;
      } else if (isPointsEqual(currentPoint, wall.toPoint)) {
        nextPoint = wall.fromPoint;
        return true;
      }

      return false;
    });

    if (connectedWall && nextPoint) {
      visitedWalls.add(connectedWall);
      return { connectWall: connectedWall, nextPoint };
    }

    return null;
  }

  let currentConnection = findNextConnection(pivotPoint, startWall);

  while (currentConnection) {
    connectedWalls.push(currentConnection.connectWall);
    currentConnection = findNextConnection(
      currentConnection.nextPoint,
      currentConnection.connectWall
    );
  }

  return connectedWalls;
}

function applyWallOffsets(offsets: WallOffsetInfo[]): void {
  if (offsets.length === 0 || !offsets[0].wall) {
    return;
  }

  const parametricOpenings = new Set<HSCore.Model.ParametricOpening>();
  const floorplan = offsets[0].wall.getUniqueParent();

  if (!floorplan) {
    return;
  }

  for (const { wall, offset } of offsets) {
    const originalCurve = wall.curve.clone();
    wall.curve.translate(offset);

    wall.forEachContent((content) => {
      const isStandardOpening = content instanceof HSCore.Model.Opening;
      const isSingleWallParametricOpening =
        content instanceof HSCore.Model.ParametricOpening &&
        content.relatedWalls.length === 1;

      if (isStandardOpening || isSingleWallParametricOpening) {
        const updater = HSCore.Util.Opening.getWallChangeUpdater(
          content,
          {
            wallCurve: originalCurve,
            openingPos: new HSMath.Vector2(content),
          },
          wall
        );
        updater.update();
      }
    });

    wall.forEachContent((content) => {
      if (content instanceof HSCore.Model.ParametricOpening) {
        parametricOpenings.add(content);
      }
    });

    const jointLinkWalls = HSCore.Util.TgWall.getJointLinkWalls(wall);
    const unlinkedWalls = HSCore.Util.TgWall.unlinkWallJoints(jointLinkWalls);

    HSCore.Util.TgWall.createWallJoints(wall, Object.values(floorplan.walls));
    HSCore.Util.TgWall.processWallsJoints(
      Array.from(new Set([...unlinkedWalls, wall]))
    );
  }

  HSCore.Util.TgWall.updateLayerByWalls(Object.values(floorplan.walls), floorplan, {
    preHoleBuild: () => {
      parametricOpenings.forEach((opening) => opening.updateOpeningPos());
    },
  });

  HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
}

export function fixForWall(): WallOffsetInfo[] {
  const allWalls: HSCore.Model.Wall[] = [];
  HSApp.App.getApp().floorplan.forEachWall((wall) => {
    allWalls.push(wall);
  });

  const wallsNotInSlab = allWalls.filter((wall) => !isWallInSlab(wall));
  const wallsInSlab = allWalls.filter((wall) => isWallInSlab(wall));

  const offsetResults: WallOffsetInfo[] = [];

  wallsNotInSlab.forEach((wall) => {
    const isHorizontal = isHorizontalWall(wall);
    const isVertical = isVerticalWall(wall);

    if (!isHorizontal && !isVertical) {
      return;
    }

    if (offsetResults.find((result) => result.wall === wall)) {
      return;
    }

    wallsInSlab.find((slabWall) => {
      const slabIsHorizontal = isHorizontalWall(slabWall);
      const slabIsVertical = isVerticalWall(slabWall);

      if (
        !(slabIsHorizontal || slabIsVertical) ||
        isHorizontal !== slabIsHorizontal ||
        isVertical !== slabIsVertical
      ) {
        return false;
      }

      let sharedPoint: Point2D | null = null;
      let oppositePoint: Point2D | null = null;

      if (
        isPointsEqual(wall.fromPoint, slabWall.fromPoint) ||
        isPointsEqual(wall.fromPoint, slabWall.toPoint)
      ) {
        sharedPoint = wall.fromPoint;
        oppositePoint = wall.toPoint;
      } else if (
        isPointsEqual(wall.toPoint, slabWall.fromPoint) ||
        isPointsEqual(wall.toPoint, slabWall.toPoint)
      ) {
        sharedPoint = wall.toPoint;
        oppositePoint = wall.fromPoint;
      }

      if (!sharedPoint || !oppositePoint) {
        return false;
      }

      const connectedWalls = findConnectedWalls(
        wall,
        isHorizontal,
        isVertical,
        oppositePoint,
        wallsNotInSlab
      );

      let anchorPoint: Point2D | null = null;
      const adjacentSlabWalls = wallsInSlab.filter((adjacentWall) => {
        if (adjacentWall === slabWall) {
          return false;
        }

        if (isPointsEqual(sharedPoint!, adjacentWall.fromPoint)) {
          anchorPoint = adjacentWall.toPoint;
          return true;
        } else if (isPointsEqual(sharedPoint!, adjacentWall.toPoint)) {
          anchorPoint = adjacentWall.fromPoint;
          return true;
        }

        return false;
      });

      if (adjacentSlabWalls.length !== 1 || !anchorPoint) {
        return false;
      }

      const adjacentWall = adjacentSlabWalls[0];
      const adjacentIsHorizontal = isHorizontalWall(adjacentWall);
      const adjacentIsVertical = isVerticalWall(adjacentWall);

      if (!(isHorizontal === adjacentIsVertical || isVertical === adjacentIsHorizontal)) {
        return false;
      }

      const offset: Point2D = { x: 0, y: 0 };

      if (isHorizontal) {
        offset.y = WALL_OFFSET_MAGNITUDE * (anchorPoint.y > sharedPoint.y ? -1 : 1);
      } else {
        offset.x = WALL_OFFSET_MAGNITUDE * (anchorPoint.x > sharedPoint.x ? -1 : 1);
      }

      offsetResults.push({ wall, offset });

      connectedWalls.forEach((connectedWall) => {
        offsetResults.push({ wall: connectedWall, offset });
      });

      return true;
    });
  });

  const uniqueOffsets: WallOffsetInfo[] = [];

  offsetResults.forEach((offsetInfo) => {
    if (!uniqueOffsets.find((existing) => existing.wall === offsetInfo.wall)) {
      uniqueOffsets.push(offsetInfo);
      console.log(
        `UPDATE WALL INFO: ID ${offsetInfo.wall.ID} OFFSET VALUE ${JSON.stringify(offsetInfo.offset)}`
      );
    }
  });

  applyWallOffsets(uniqueOffsets);

  return offsetResults;
}