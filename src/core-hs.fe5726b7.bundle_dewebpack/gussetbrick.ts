interface GussetMetaData {
  ZLength: number;
  attrBaseline?: number;
}

class GussetMetaDecorator {
  public readonly meta: GussetMetaData;
  public readonly thickness: number;
  public readonly hZLength: number;

  constructor(meta: GussetMetaData) {
    this.meta = meta;
    this.thickness = this._getThickness();
    this.hZLength = 0.5 * meta.ZLength;
  }

  private _getThickness(): number {
    const meta = this.meta;
    return meta.attrBaseline === undefined ? meta.ZLength : 0.001 * meta.attrBaseline;
  }
}

export class GussetBrick {
  public readonly id: string | number;
  public readonly metaDecorator: GussetMetaDecorator;
  public viewTranslation: THREE.Vector3;
  public viewRotation: THREE.Quaternion;
  public viewScale: THREE.Vector3;

  constructor(id: string | number, metaDecorator: GussetMetaDecorator) {
    this.viewTranslation = new THREE.Vector3();
    this.viewRotation = new THREE.Quaternion();
    this.viewScale = new THREE.Vector3(1, 1, 1);
    this.id = id;
    this.metaDecorator = metaDecorator;
  }

  static toLocalCenter(
    point: THREE.Vector2,
    boundingBox?: THREE.Box2,
    shouldCheckContainment?: boolean
  ): THREE.Vector2 | undefined {
    if (!boundingBox) {
      return point;
    }

    if (!shouldCheckContainment || boundingBox.containsPoint(point)) {
      return new THREE.Vector2(point.x - boundingBox.min.x, point.y - boundingBox.min.y);
    }

    return undefined;
  }

  setViewTransfrom(
    position: THREE.Vector2,
    rotation: number,
    target: HSCore.Model.Face | unknown
  ): void {
    const thickness = this.metaDecorator.thickness;
    const halfPi = 0.5 * Math.PI;
    const rotationAngle = rotation;
    const rotationMatrix = new THREE.Matrix4();

    if (target instanceof HSCore.Model.Face) {
      this.viewTranslation.z = -(thickness - this.metaDecorator.hZLength);
    } else {
      this.viewTranslation.z = thickness - this.metaDecorator.hZLength;
    }

    rotationMatrix.makeRotationX(halfPi);

    if (rotationAngle !== 0) {
      rotationMatrix.multiply(new THREE.Matrix4().makeRotationY(rotationAngle));
    }

    this.viewScale.y = -1;
    this.viewTranslation.x = position.x;
    this.viewTranslation.y = position.y;
    this.viewRotation.setFromRotationMatrix(rotationMatrix);
  }
}

export class GussetModelInstance {
  public readonly metaDecorator: GussetMetaDecorator;
  public readonly metaData: GussetMetaData;
  public bricks: GussetBrick[];

  constructor(metaData: GussetMetaData) {
    this.bricks = [];
    this.metaDecorator = new GussetMetaDecorator(metaData);
    this.metaData = metaData;
  }
}