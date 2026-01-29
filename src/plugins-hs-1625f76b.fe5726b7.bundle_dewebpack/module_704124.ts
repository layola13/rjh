export interface ScaleFactors {
  XScale: number;
  YScale: number;
  ZScale: number;
}

export interface OffsetVector {
  x: number;
  y: number;
  z: number;
}

export interface SnappedItem {
  host: any;
  direction: string;
  normal?: THREE.Vector3;
}

export interface SizeRange {
  min: number;
  max: number;
}

export interface Content {
  x: number;
  y: number;
  z: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  XSize: number;
  YSize: number;
  ZSize: number;
  thickness: number;
  isFlagOn(flag: number): boolean;
}

export interface TargetSize {
  x?: number;
  y?: number;
  z?: number;
}

const DECIMAL_PRECISION = 3;
const ROUNDING_THRESHOLD = 0.5;

export function calculateOffsetToKeepSnap(
  content: Content,
  targetSize: Partial<OffsetVector>
): OffsetVector {
  const scaleFactors: ScaleFactors = {
    XScale: targetSize.x ? targetSize.x / content.XLength : content.XScale,
    YScale: targetSize.y ? targetSize.y / content.YLength : content.YScale,
    ZScale: targetSize.z ? targetSize.z / content.ZLength : content.ZScale
  };

  function getNicheSnapInfo(): SnappedItem[] {
    if (!HSCore.Util.Content.isNiche(content)) {
      return [];
    }

    const host = content.getHost();
    if (!host) {
      return [];
    }

    const snapInfo: SnappedItem[] = [];

    if (HSCore.Util.Content.isWallNiche(content)) {
      snapInfo.push({
        host,
        direction: HSFPConstants.Direction.Y
      });
    } else if (HSCore.Util.Content.isSlabNiche(content)) {
      snapInfo.push({
        host,
        direction: HSFPConstants.Direction.Z
      });
    }

    return snapInfo;
  }

  const offsetVector = new i.default.VectorUtils.toTHREEVector3({
    x: content.x,
    y: content.y,
    z: content.z
  });

  const snappedWalls = (0, r.getSnappedWalls)(content);
  const uniqueWalls: SnappedItem[] = [];

  snappedWalls.forEach((wall: SnappedItem) => {
    const exists = uniqueWalls.find((uniqueWall) =>
      i.default.VectorUtils.isPointEqual(
        wall.normal,
        uniqueWall.normal,
        HSCore.Util.Math.defaultTolerance
      )
    );

    if (!exists) {
      uniqueWalls.push(wall);
    }
  });

  uniqueWalls.forEach((wall) => {
    const wallHost = wall.host;
    const planeDistance = (0, r.planeDistanceBetween)(content, wallHost) - wallHost.width / 2;
    const wallNormalDirection = HSApp.Util.Wall.getWallNormalDir(wallHost);
    const xScaleDelta = planeDistance * (scaleFactors.XScale / content.XScale - 1);
    const yScaleDelta = planeDistance * (scaleFactors.YScale / content.YScale - 1);

    const adjustments = {
      x: wallNormalDirection.clone().multiplyScalar(xScaleDelta),
      y: wallNormalDirection.clone().multiplyScalar(yScaleDelta)
    };

    if (wall.direction === HSFPConstants.Direction.X) {
      offsetVector.add(adjustments.x);
    } else if (wall.direction === HSFPConstants.Direction.Y) {
      offsetVector.add(adjustments.y);
    }
  });

  (0, r.getSnappedContents)(content).forEach((snappedContent: SnappedItem) => {
    const halfLength =
      snappedContent.direction === HSFPConstants.Direction.Y
        ? content.YLength / 2
        : content.XLength / 2;

    const normal = snappedContent.normal;
    const xScaleDelta = halfLength * (scaleFactors.XScale / content.XScale - 1);
    const yScaleDelta = halfLength * (scaleFactors.YScale / content.YScale - 1);

    const adjustments = {
      x: normal.clone().multiplyScalar(xScaleDelta),
      y: normal.clone().multiplyScalar(yScaleDelta)
    };

    if (snappedContent.direction === HSFPConstants.Direction.X) {
      offsetVector.add(adjustments.x);
    } else if (snappedContent.direction === HSFPConstants.Direction.Y) {
      offsetVector.add(adjustments.y);
    }
  });

  const roomContent = HSCore.Util.Room.getRoomContentIn(content);
  const snappedCeiling = (0, r.getSnappedCeiling)(content);

  if (
    roomContent &&
    (content instanceof HSCore.Model.Beam ||
      content instanceof HSCore.Model.NCustomizedBeam ||
      snappedCeiling) &&
    targetSize.z !== undefined
  ) {
    offsetVector.z += content.ZSize - targetSize.z;
  }

  getNicheSnapInfo().forEach((nicheSnap) => {
    const nicheAdjustment = calculateNicheAdjustment(nicheSnap);

    if (nicheSnap.direction === HSFPConstants.Direction.Y) {
      offsetVector.add(nicheAdjustment.y);
    } else if (nicheSnap.direction === HSFPConstants.Direction.Z) {
      offsetVector.add(nicheAdjustment.z);
    }
  });

  function calculateNicheAdjustment(nicheSnap: SnappedItem): Partial<Record<'y' | 'z', THREE.Vector3>> {
    if (!HSCore.Util.Content.isNiche(content)) {
      return {};
    }

    let direction = new THREE.Vector3(0, 0, 0);
    const halfThickness = content.thickness / 2;
    const snapFaceType = HSCore.Util.Opening.getSnapFaceType(content);

    if (HSCore.Util.Content.isWallNiche(content)) {
      switch (snapFaceType) {
        case HSCore.Model.WallFaceType.left:
          direction = HSApp.Util.Wall.getWallNormalDir(nicheSnap.host).negate();
          break;
        case HSCore.Model.WallFaceType.right:
          direction = HSApp.Util.Wall.getWallNormalDir(nicheSnap.host);
          break;
        default:
          assert(false, "niche has host wall, but has not been snapped to any face");
      }

      const yScaleDelta = halfThickness * (scaleFactors.YScale / content.YScale - 1);
      return {
        y: direction.clone().multiplyScalar(yScaleDelta)
      };
    }

    if (HSCore.Util.Content.isSlabNiche(content)) {
      switch (snapFaceType) {
        case HSCore.Model.SlabFaceType.top:
          direction = new THREE.Vector3(0, 0, -1);
          break;
        case HSCore.Model.SlabFaceType.bottom:
          direction = new THREE.Vector3(0, 0, 1);
          break;
        default:
          assert(false, "niche has host slab, but has not been snapped to any face");
      }

      const zScaleDelta = halfThickness * (scaleFactors.ZScale / content.ZScale - 1);
      return {
        z: direction.clone().multiplyScalar(zScaleDelta)
      };
    }

    return {};
  }

  return {
    x: -(offsetVector.x - content.x),
    y: -(offsetVector.y - content.y),
    z: offsetVector.z - content.z
  };
}

export function getNumberWithStep(
  value: number,
  step: number,
  range: SizeRange
): number {
  const precisionMultiplier = Math.pow(10, DECIMAL_PRECISION);

  let scaledValue = Math.round(value * precisionMultiplier);
  const scaledMin = Math.round(range.min * precisionMultiplier);
  const scaledMax = Math.round(range.max * precisionMultiplier);
  const scaledStep = step * precisionMultiplier;

  const remainder = (scaledValue - scaledMin) % scaledStep;
  scaledValue -= remainder;

  if (remainder >= scaledStep * ROUNDING_THRESHOLD) {
    scaledValue += scaledStep;
  }

  if (scaledValue < scaledMin) {
    scaledValue = scaledMin;
  }

  if (scaledValue > scaledMax) {
    scaledValue = scaledMax;
  }

  return +(scaledValue / precisionMultiplier).toFixed(DECIMAL_PRECISION);
}

export function getTargetSize(
  content: Content,
  inputSize: TargetSize,
  lockedAxes?: string[]
): TargetSize {
  const sizeEntries = Object.entries(inputSize);

  if (
    content.isFlagOn(HSCore.Model.ContentFlagEnum.LengthWidthLocked) &&
    !content.isFlagOn(HSCore.Model.ContentFlagEnum.ProportionsLocked) &&
    sizeEntries.length === 1 &&
    sizeEntries[0].length === 2 &&
    sizeEntries[0][0] === "z"
  ) {
    const result: TargetSize = { ...inputSize };
    result.x = content.XSize;
    result.y = content.YSize;
    result.z = content.ZSize;
    return result;
  }

  let validatedSize = sizeEntries.reduce((acc, [axis, size]) => {
    if (size < r.CONTENT_MINIMUM_VALID_SIZE) {
      acc[axis as keyof TargetSize] = r.CONTENT_MINIMUM_VALID_SIZE;
    } else {
      acc[axis as keyof TargetSize] = size;
    }
    return acc;
  }, {} as TargetSize);

  if (content.isFlagOn(HSCore.Model.ContentFlagEnum.ProportionsLocked)) {
    lockedAxes = ["x", "y", "z"];
  }

  if (
    content.isFlagOn(HSCore.Model.ContentFlagEnum.LengthWidthLocked) &&
    !content.isFlagOn(HSCore.Model.ContentFlagEnum.ProportionsLocked)
  ) {
    lockedAxes = ["x", "y"];
  }

  if (!lockedAxes || lockedAxes.length === 0) {
    return validatedSize;
  }

  if (sizeEntries.length === 3 || sizeEntries.length === 0) {
    return validatedSize;
  }

  const firstEntry = Object.entries(validatedSize)[0];
  validatedSize = (0, r.calcTargetSizeWithProportionLocked)(content, firstEntry);

  const minLockedEntry = Object.entries(validatedSize)
    .filter(([axis]) => lockedAxes!.includes(axis))
    .reduce((min, current) => (current[1] < min[1] ? current : min));

  if (minLockedEntry[1] < r.CONTENT_MINIMUM_VALID_SIZE) {
    minLockedEntry[1] = r.CONTENT_MINIMUM_VALID_SIZE;
    validatedSize = (0, r.calcTargetSizeWithProportionLocked)(content, minLockedEntry);
  }

  if (lockedAxes.length !== 3) {
    validatedSize = Object.entries(validatedSize)
      .filter(([axis]) => lockedAxes!.includes(axis))
      .reduce((acc, [axis, size]) => {
        acc[axis as keyof TargetSize] = size;
        return acc;
      }, {} as TargetSize);
  }

  return validatedSize;
}