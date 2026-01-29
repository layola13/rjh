export enum FaceGroupConnectModeEnum {
  None = 0,
  Manual = 1,
  Auto = 2
}

interface FaceGroupBoundData {
  left: number;
  top: number;
  width: number;
  height: number;
  transform?: Matrix3;
}

interface FaceGroupBoundMapData {
  [faceId: string]: FaceGroupBoundData;
}

interface FaceGroupBoundLeftBottomData {
  left: number;
  bottom: number;
  width: number;
  height: number;
  matrix?: Matrix3;
}

interface FaceGroupBoundLeftBottomMap {
  [faceId: string]: FaceGroupBoundLeftBottomData;
}

interface TransformMap {
  [faceId: string]: Matrix3;
}

interface SerializedFaceGroupBound {
  left: number;
  top: number;
  width: number;
  height: number;
  tf?: unknown;
}

interface SerializedFaceGroupData {
  faceGroupId: string;
  faceGroupBoundMap: {
    [faceId: string]: SerializedFaceGroupBound;
  };
  cm?: FaceGroupConnectModeEnum;
}

export class FaceGroup {
  private _faceGroupId: string = "";
  private _faceGroupBoundMap: FaceGroupBoundMapData = {};
  private _connectMode: FaceGroupConnectModeEnum = FaceGroupConnectModeEnum.None;

  copyFrom(source: FaceGroup): void {
    this._faceGroupId = source._faceGroupId;
    this._faceGroupBoundMap = this._validateMapObj(_.cloneDeep(source._faceGroupBoundMap));
    this._connectMode = source._connectMode;
  }

  clone(): FaceGroup {
    const cloned = new FaceGroup();
    cloned.copyFrom(this);
    return cloned;
  }

  set connectMode(mode: FaceGroupConnectModeEnum) {
    this._connectMode = mode;
  }

  get connectMode(): FaceGroupConnectModeEnum {
    return this._connectMode;
  }

  set faceGroupId(id: string) {
    this._faceGroupId = id;
  }

  get faceGroupId(): string {
    return this._faceGroupId;
  }

  set faceGroupBoundMap(map: FaceGroupBoundMapData) {
    this._faceGroupBoundMap = this._validateMapObj(map);
  }

  get faceGroupBoundMap(): FaceGroupBoundMapData {
    return this._faceGroupBoundMap;
  }

  get transformMap(): TransformMap {
    const result: TransformMap = {};
    
    Object.keys(this.faceGroupBoundMap).forEach((faceId) => {
      const boundData = this.faceGroupBoundMapLeftBottom[faceId];
      const matrix = boundData.matrix 
        ? boundData.matrix 
        : Matrix3.makeTranslate({ x: boundData.left, y: boundData.bottom });
      result[faceId] = matrix;
    });

    return result;
  }

  private _validateMapObj(map: FaceGroupBoundMapData = {}): FaceGroupBoundMapData {
    return Object.entries(map || {}).reduce((acc, [key, value]) => {
      if (value != null) {
        acc[key] = value;
      }
      return acc;
    }, {} as FaceGroupBoundMapData);
  }

  get faceGroupBoundMapLeftBottom(): FaceGroupBoundLeftBottomMap {
    const result: FaceGroupBoundLeftBottomMap = {};
    const faceIds = Object.keys(this.faceGroupBoundMap);
    
    if (!faceIds.length) return result;

    const boundBoxMap = new Map<string, Box2>();
    
    faceIds.forEach((faceId) => {
      if (this.faceGroupBoundMap[faceId] === undefined) return;

      const { left, top, width, height } = this.faceGroupBoundMap[faceId];
      const box = new Box2([
        { x: left, y: top },
        { x: left + width, y: top - height }
      ]);
      boundBoxMap.set(faceId, box);
    });

    const unionBox = new Box2();
    for (const [, box] of boundBoxMap) {
      unionBox.union(box);
    }

    for (const [faceId, box] of boundBoxMap) {
      const offsetLeft = box.min.x - unionBox.min.x;
      const offsetBottom = box.min.y - unionBox.min.y;
      const boxWidth = box.max.x - box.min.x;
      const boxHeight = box.max.y - box.min.y;

      result[faceId] = {
        left: offsetLeft,
        bottom: offsetBottom,
        width: boxWidth,
        height: boxHeight,
        matrix: this.faceGroupBoundMap[faceId].transform
      };
    }

    return result;
  }

  init(faceGroupId: string, faceGroupBoundMap: FaceGroupBoundMapData): void {
    this._faceGroupId = faceGroupId;
    this._faceGroupBoundMap = this._validateMapObj(faceGroupBoundMap);
  }

  clear(): void {
    this.faceGroupId = "";
    this.faceGroupBoundMap = {};
    this.connectMode = FaceGroupConnectModeEnum.None;
  }

  getFaceIds(): string[] {
    return this._faceGroupId && this._faceGroupId.split(";") || [];
  }

  getTransformById(faceId: string): Matrix3 | undefined {
    const faceIds = this.getFaceIds();
    if (faceId && faceIds.includes(faceId)) {
      return this.transformMap[faceId];
    }
  }

  transformBoundMap(transformMatrix: Matrix3): void {
    if (!this.faceGroupBoundMap) return;

    const matrix = new Matrix3().fromArray(transformMatrix.toArray());
    const faceIds = Object.keys(this.faceGroupBoundMap);
    
    if (!faceIds.length) return;

    const transformedBoundsMap = new Map<string, [number, number, number, number]>();
    const allTransformedPoints: Vector2[] = [];

    faceIds.forEach((faceId) => {
      if (this.faceGroupBoundMap[faceId] === undefined) return;

      const { left, top, width, height } = this.faceGroupBoundMap[faceId];
      const transformedPoints = [
        new Vector2(left, top),
        new Vector2(left, top - height),
        new Vector2(left + width, top - height),
        new Vector2(left + width, top)
      ].map((point) => point.transformed(matrix));

      allTransformedPoints.push(...transformedPoints);
      transformedBoundsMap.set(faceId, getBounds(transformedPoints));
    });

    if (!allTransformedPoints.length) return;

    const [minX, minY, totalWidth, totalHeight] = getBounds(allTransformedPoints);

    transformedBoundsMap.forEach((bounds, faceId) => {
      const [boundMinX, boundMinY, boundWidth, boundHeight] = bounds;
      this.faceGroupBoundMap[faceId] = {
        left: boundMinX - minX,
        top: boundMinY + boundHeight - (minY + totalHeight),
        width: boundWidth,
        height: boundHeight
      };
    });

    faceIds.forEach((faceId) => {
      const transform = this.faceGroupBoundMap[faceId]?.transform;
      if (transform) {
        transform.preMultiply(matrix);
      }
    });
  }

  getPaveBoundingBox(faceId: string): THREE.Box2 | undefined {
    const bound = this.faceGroupBoundMap[faceId];
    if (!bound) return;

    let maxOffset = 0;
    Object.values(this.faceGroupBoundMap).forEach((boundData) => {
      maxOffset = Math.max(maxOffset, boundData.height - boundData.top);
    });

    return new THREE.Box2(
      new THREE.Vector2(bound.left, maxOffset + bound.top - bound.height),
      new THREE.Vector2(bound.left + bound.width, maxOffset + bound.top)
    );
  }

  load(serializedData: SerializedFaceGroupData, context: unknown): void {
    const migrated = FaceGroupUpdater.migrationConnectMode(
      FaceGroupUpdater.migrationFaceGroupIdMap(serializedData, context),
      context
    );

    this._faceGroupId = migrated.faceGroupId;
    this._connectMode = migrated.cm;

    const faceIds = Object.keys(migrated.faceGroupBoundMap);
    const boundMap: FaceGroupBoundMapData = {};

    faceIds.forEach((faceId) => {
      const bound = migrated.faceGroupBoundMap[faceId];
      boundMap[faceId] = {
        left: bound.left,
        top: bound.top,
        width: bound.width,
        height: bound.height,
        transform: bound.tf && new Matrix3().load(bound.tf)
      };
    });

    this._faceGroupBoundMap = boundMap;
  }

  dump(): SerializedFaceGroupData {
    const serializedBoundMap: { [faceId: string]: SerializedFaceGroupBound } = {};

    Object.keys(this._faceGroupBoundMap).forEach((faceId) => {
      const bound = this._faceGroupBoundMap[faceId];
      serializedBoundMap[faceId] = {
        left: bound.left,
        top: bound.top,
        width: bound.width,
        height: bound.height
      };

      if (bound.transform) {
        serializedBoundMap[faceId].tf = bound.transform.dump();
      }
    });

    const result: SerializedFaceGroupData = {
      faceGroupId: this._faceGroupId,
      faceGroupBoundMap: serializedBoundMap
    };

    if (this._connectMode) {
      result.cm = this._connectMode;
    }

    return result;
  }
}