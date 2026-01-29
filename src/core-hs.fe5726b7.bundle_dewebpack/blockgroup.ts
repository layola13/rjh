import { Box2, Vector2, Matrix3 } from './math';

interface BrickInfo {
  outer: number[][];
  bbox: Box2;
  mass: Vector2;
}

interface AnchorPoints {
  anchorPoint1: { x: number; y: number };
  anchorPoint2: { x: number; y: number };
  basePoint1: { x: number; y: number };
  basePoint2: { x: number; y: number };
}

interface Pattern {
  forEachChild(callback: (child: PatternChild) => void): void;
  anchorPoints: AnchorPoints;
}

interface PatternChild {
  localId: string;
  getPaintOutline(): number[][];
}

interface Block {
  localId: string;
  points: number[][];
  rotation: number;
  pattern: Pattern;
  pavingOption: {
    point: Vector2;
  };
}

class PatternCache {
  public readonly brickMap: Map<string, BrickInfo>;
  public readonly outer: number[][];
  public readonly bbox: Box2;
  public readonly pattern: Pattern;
  public readonly u: Vector2;
  public readonly v: Vector2;

  constructor(pattern: Pattern) {
    this.brickMap = new Map();
    this.outer = [];
    this.bbox = new Box2();
    this.pattern = pattern;

    pattern.forEachChild((child) => {
      const outline = child.getPaintOutline();
      const boundingBox = new Box2(outline);
      const massProperties = HSCore.Util.Math.getMassProperties(outline);
      
      const brickInfo: BrickInfo = {
        outer: child.getPaintOutline(),
        bbox: new Box2(outline),
        mass: new Vector2(massProperties[1], massProperties[2])
      };

      this.brickMap.set(child.localId, brickInfo);
      this.outer.push(...outline);
      this.bbox.union(boundingBox);
    });

    const anchorPoints = pattern.anchorPoints;
    const anchorPoint1 = anchorPoints.anchorPoint1;
    const anchorPoint2 = anchorPoints.anchorPoint2;
    const basePoint1 = anchorPoints.basePoint1;
    const basePoint2 = anchorPoints.basePoint2;

    this.u = new Vector2(basePoint1.x - anchorPoint1.x, basePoint1.y - anchorPoint1.y);
    this.v = new Vector2(basePoint2.x - anchorPoint2.x, basePoint2.y - anchorPoint2.y);
  }

  computeGlobalPavingPoint(block: Block, bbox?: Box2): Vector2 {
    const brickInfo = this.brickMap.get(block.localId);
    if (!brickInfo) {
      throw new Error(`Brick not found for localId: ${block.localId}`);
    }

    const boundingBox = bbox ?? new Box2(block.points);
    const pavingPoint = boundingBox.min.added(block.pavingOption.point);
    const offset = new Vector2(-brickInfo.mass.x, -brickInfo.mass.y);
    const rotation = block.rotation;

    if (rotation !== 0) {
      offset.vecRotate(rotation);
    }

    return pavingPoint.add(offset);
  }

  computeLocalPavingPoint(block: Block): Vector2 {
    const boundingBox = new Box2(block.points);
    return this.computeGlobalPavingPoint(block, boundingBox).subtract(boundingBox.min);
  }
}

export class BlockGroup {
  public readonly blocks: Block[];
  public readonly localIdToMassMap: Map<string, Vector2>;
  public readonly patternCache: PatternCache;
  public readonly u: Vector2;
  public readonly v: Vector2;

  constructor(block: Block, patternCache: PatternCache, blockMass: Vector2) {
    this.blocks = [];
    this.localIdToMassMap = new Map();
    this.blocks.push(block);
    this.patternCache = patternCache;

    const rotation = block.rotation;
    const rotationMatrix = rotation !== 0 ? Matrix3.makeRotate(Vector2.O(), rotation) : undefined;

    this.u = new Vector2(patternCache.u);
    this.v = new Vector2(patternCache.v);

    if (rotationMatrix) {
      this.u.vecTransform(rotationMatrix);
      this.v.vecTransform(rotationMatrix);
    }

    const referenceBrick = patternCache.brickMap.get(block.localId);
    if (!referenceBrick) {
      throw new Error(`Reference brick not found for localId: ${block.localId}`);
    }

    patternCache.brickMap.forEach((brickInfo, localId) => {
      if (localId === block.localId) {
        this.localIdToMassMap.set(block.localId, blockMass);
      } else {
        const massOffset = brickInfo.mass.subtracted(referenceBrick.mass);
        if (rotationMatrix) {
          massOffset.vecTransform(rotationMatrix);
        }
        massOffset.add(blockMass);
        this.localIdToMassMap.set(localId, massOffset);
      }
    });
  }

  static getBlockMass(block: Block): Vector2 {
    return new Box2(block.points).min.added(block.pavingOption.point);
  }

  canMerge(block: Block, targetMass: Vector2): boolean {
    const currentMass = this.localIdToMassMap.get(block.localId);
    if (!currentMass) {
      return false;
    }

    const massDelta = targetMass.subtracted(currentMass);
    const TOLERANCE = 0.001;

    const isNearZero = (value: number, tolerance: number = 1e-6): boolean => {
      return value < tolerance && value > -tolerance;
    };

    let uCoefficient = 0;
    let vCoefficient = 0;

    if (isNearZero(this.u.x)) {
      if (isNearZero(this.v.x) || isNearZero(this.u.y)) {
        return false;
      }
      vCoefficient = massDelta.x / this.v.x;
      uCoefficient = (massDelta.y - vCoefficient * this.v.y) / this.u.y;
    } else if (isNearZero(this.u.y)) {
      if (isNearZero(this.v.y)) {
        return false;
      }
      vCoefficient = massDelta.y / this.v.y;
      uCoefficient = (massDelta.x - vCoefficient * this.v.x) / this.u.x;
    } else if (isNearZero(this.v.x)) {
      if (isNearZero(this.v.y)) {
        return false;
      }
      uCoefficient = massDelta.x / this.u.x;
      vCoefficient = (massDelta.y - uCoefficient * this.u.y) / this.v.y;
    } else if (isNearZero(this.v.y)) {
      uCoefficient = massDelta.y / this.u.y;
      vCoefficient = (massDelta.x - uCoefficient * this.u.x) / this.v.x;
    } else {
      let determinant = this.u.x * this.v.y - this.u.y * this.v.x;
      if (isNearZero(determinant, TOLERANCE)) {
        determinant = this.v.x * this.u.y - this.v.y * this.u.x;
        if (isNearZero(determinant, TOLERANCE)) {
          return false;
        }
        vCoefficient = (massDelta.x * this.u.y - massDelta.y * this.u.x) / determinant;
        uCoefficient = (massDelta.x - vCoefficient * this.v.x) / this.u.x;
      } else {
        uCoefficient = (massDelta.x * this.v.y - massDelta.y * this.v.x) / determinant;
        vCoefficient = (massDelta.y - uCoefficient * this.u.y) / this.v.y;
      }
    }

    const roundedU = Math.round(uCoefficient);
    const roundedV = Math.round(vCoefficient);
    const errorX = massDelta.x - (roundedU * this.u.x + roundedV * this.v.x);
    const errorY = massDelta.y - (roundedU * this.u.y + roundedV * this.v.y);

    return isNearZero(errorX, TOLERANCE) && isNearZero(errorY, TOLERANCE);
  }

  merge(block: Block, targetMass: Vector2): boolean {
    if (!this.canMerge(block, targetMass)) {
      return false;
    }
    this.blocks.push(block);
    return true;
  }
}

export class BlockGroupMap {
  private readonly patToRotGroupMap: Map<Pattern, Map<number, BlockGroup[]>>;
  private readonly _patToCacheMap: Map<Pattern, PatternCache>;

  constructor() {
    this.patToRotGroupMap = new Map();
    this._patToCacheMap = new Map();
  }

  mergeBlock(block: Block): void {
    const blockMass = BlockGroup.getBlockMass(block);
    const pattern = block.pattern;
    const patternCache = this.getPatternCache(pattern);

    let rotationGroupMap = this.patToRotGroupMap.get(pattern);

    if (rotationGroupMap) {
      const groupsForRotation = rotationGroupMap.get(block.rotation);

      if (groupsForRotation) {
        const mergedIntoExisting = groupsForRotation.find(group => group.merge(block, blockMass));
        
        if (!mergedIntoExisting) {
          const newGroup = new BlockGroup(block, patternCache, blockMass);
          groupsForRotation.push(newGroup);
        }
      } else {
        const newGroup = new BlockGroup(block, patternCache, blockMass);
        rotationGroupMap.set(block.rotation, [newGroup]);
      }
    } else {
      const newGroup = new BlockGroup(block, patternCache, blockMass);
      rotationGroupMap = new Map();
      rotationGroupMap.set(block.rotation, [newGroup]);
      this.patToRotGroupMap.set(pattern, rotationGroupMap);
    }
  }

  getPatternCache(pattern: Pattern): PatternCache {
    let cache = this._patToCacheMap.get(pattern);
    if (!cache) {
      cache = new PatternCache(pattern);
      this._patToCacheMap.set(pattern, cache);
    }
    return cache;
  }
}