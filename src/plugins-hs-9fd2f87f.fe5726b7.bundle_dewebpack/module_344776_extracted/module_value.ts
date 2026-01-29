interface Vec2 {
  x: number;
  y: number;
}

interface BaseCabinet {
  YLength: number;
  z: number;
  ZLength: number;
}

interface AreaInfo {
  height: number;
}

interface LinePoint {
  x: number;
  y: number;
}

class WorkpathCalculator {
  private _workPath: Vec2[];
  private _referencePos: Vec2;
  private _areaInfo: AreaInfo;
  private _depth: number;
  private _moveDirection: THREE.Vector3;
  private _frontDir: THREE.Vector3;
  private _rotation: number;
  private _height: number;

  private _findClosestBaseCabinet(position: Vec2): BaseCabinet {
    // Implementation needed
    throw new Error('Method not implemented');
  }

  public calculate(): void {
    const midpoint = HSCore.Util.Math.Vec2.lerp(
      this._workPath[0],
      this._workPath[1],
      0.5
    );

    const closestCabinet = this._findClosestBaseCabinet(midpoint);
    this._depth = closestCabinet.YLength;

    this._moveDirection = new THREE.Vector3(
      this._workPath[1].x - this._workPath[0].x,
      this._workPath[1].y - this._workPath[0].y,
      0
    ).normalize();

    const upVector = new THREE.Vector3(0, 0, 1);
    const crossProduct = new THREE.Vector3(0, 0, 0).cross(
      upVector,
      this._moveDirection
    );

    const referenceDirection = new THREE.Vector3(
      this._referencePos.x - midpoint.x,
      this._referencePos.y - midpoint.y,
      0
    ).normalize();

    if (crossProduct.dot(referenceDirection) < 0) {
      crossProduct.negate();
    }

    this._frontDir = crossProduct;

    const origin: LinePoint = { x: 0, y: 0 };
    const defaultDirection: LinePoint = { x: 0, y: -1 };

    const angle = HSCore.Util.Math.lineLineAngleCCW(
      origin,
      this._frontDir,
      origin,
      defaultDirection
    );

    this._rotation = -angle;
    this._height = closestCabinet.z + closestCabinet.ZLength + this._areaInfo.height;
  }
}