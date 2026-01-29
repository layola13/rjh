import { PMolding_IO, PMolding } from './PMolding';
import { Entity } from './Entity';
import { Material } from './Material';

interface StateMap {
  [key: string]: State;
}

interface State {
  id: string;
  __value?: number;
  bindObjectFieldChanged(obj: any, field: string): void;
  unbindObject(obj: any): void;
}

interface ResourceMetadata {
  id: string;
  profileSizeX: number;
  profileSizeY: number;
  profile: string;
  contentType: ContentType;
}

interface ContentType {
  isTypeOf(type: string): boolean;
}

interface CreateOptions {
  resource?: ResourceMetadata;
  material: any;
  localId: string;
}

interface DumpOptions {
  [key: string]: any;
}

interface TransformData {
  start: THREE.Vector3;
  end: THREE.Vector3;
  originPoint: THREE.Vector3;
  matrix: THREE.Matrix4;
  inverseMatrix: THREE.Matrix4;
  localStart: THREE.Vector3;
  localEnd: THREE.Vector3;
  euler: THREE.Euler;
  rotationOfDeg: {
    x: number;
    y: number;
    z: number;
  };
}

interface SizeData {
  XLength: number;
  YLength: number;
  ZLength: number;
}

class PSegmentLoft_IO extends PMolding_IO {
  private static _instance: PSegmentLoft_IO;

  static instance(): PSegmentLoft_IO {
    if (!PSegmentLoft_IO._instance) {
      PSegmentLoft_IO._instance = new PSegmentLoft_IO();
    }
    return PSegmentLoft_IO._instance;
  }

  dump(
    entity: PSegmentLoft,
    callback?: (data: any[], entity: PSegmentLoft) => void,
    includePaths: boolean = true,
    options: DumpOptions = {}
  ): any[] {
    const dumpData = super.dump(entity, undefined, includePaths, options);
    const mainData = dumpData[0];

    if (mainData.paths) {
      delete mainData.paths;
    }

    mainData.XStart = entity.__XStart.id;
    mainData.YStart = entity.__YStart.id;
    mainData.ZStart = entity.__ZStart.id;
    mainData.XEnd = entity.__XEnd.id;
    mainData.YEnd = entity.__YEnd.id;
    mainData.ZEnd = entity.__ZEnd.id;
    mainData.XLength = entity.__XLength.id;
    mainData.YLength = entity.__YLength.id;
    mainData.ZLength = entity.__ZLength.id;

    if (callback) {
      callback(dumpData, entity);
    }

    entity.updatePosition();
    return dumpData;
  }

  load(entity: PSegmentLoft, data: any, context: { states: StateMap }): void {
    super.load(entity, data, context);

    const stateFields = [
      'XStart', 'YStart', 'ZStart',
      'XEnd', 'YEnd', 'ZEnd',
      'XLength', 'YLength', 'ZLength'
    ];

    stateFields.forEach((fieldName: string) => {
      const state = context.states[data[fieldName]];
      if (state) {
        const privateFieldName = `__${fieldName}` as keyof PSegmentLoft;
        (entity[privateFieldName] as State).unbindObject(entity);
        (entity as any)[privateFieldName] = state;
        state.bindObjectFieldChanged(entity, fieldName);
      }
    });
  }
}

class PSegmentLoft extends PMolding {
  __XStart!: State;
  __YStart!: State;
  __ZStart!: State;
  __XEnd!: State;
  __YEnd!: State;
  __ZEnd!: State;
  __XLength!: State;
  __YLength!: State;
  __ZLength!: State;
  __XSize!: State;
  __YSize!: State;

  XStart!: number;
  YStart!: number;
  ZStart!: number;
  XEnd!: number;
  YEnd!: number;
  ZEnd!: number;
  XLength!: number;
  YLength!: number;
  ZLength!: number;
  XSize!: number;
  YSize!: number;
  XRotation!: number;
  YRotation!: number;
  ZRotation!: number;

  material!: Material;
  localId!: string;
  metadata!: ResourceMetadata;
  seekId!: string;
  length!: number;
  x!: number;
  y!: number;
  z!: number;

  signalGeometryChanged!: { dispatch(): void };
  signalPositionChanged!: { dispatch(): void };

  constructor(name: string = '', parent?: any) {
    super(name, parent);

    this.defineStateField('XStart', 0);
    this.defineStateField('YStart', 0);
    this.defineStateField('ZStart', 0);
    this.defineStateField('XEnd', 0);
    this.defineStateField('YEnd', 0);
    this.defineStateField('ZEnd', 0);
    this.defineStateField('XLength', 0);
    this.defineStateField('YLength', 0);
    this.defineStateField('ZLength', 0);
  }

  static create(options: CreateOptions): PSegmentLoft {
    const resource = options.resource;
    const segment = new PSegmentLoft();

    segment.material = Material.create(options.material);
    segment.localId = options.localId;

    if (resource) {
      segment.metadata = resource;
      segment.seekId = resource.id;
      segment.__XSize.__value = resource.profileSizeX;
      segment.__YSize.__value = resource.profileSizeY;
    }

    return segment;
  }

  getPaths(): THREE.Vector3[][] {
    const transformData = this.getTransformData();
    return [[transformData.localEnd, transformData.localStart]];
  }

  getProfilePath(): THREE.Vector3[] {
    const transformData = this.getTransformData();
    const profileString = this.metadata.profile;
    const profileSizeX = this.metadata.profileSizeX;
    const profileSizeY = this.metadata.profileSizeY;

    const profilePoints = profileString.split(' ').map((command: string) => {
      const coordinates = command.slice(1).split(', ');
      return new THREE.Vector2(
        parseFloat(coordinates[0]) * profileSizeX,
        parseFloat(coordinates[1]) * profileSizeY
      );
    });

    if (GeLib.PolygonUtils.isCounterClockwise(profilePoints)) {
      profilePoints.reverse();
    }

    const profilePath = profilePoints.map((point: THREE.Vector2) =>
      new THREE.Vector3(
        transformData.localStart.x,
        -point.x + transformData.localStart.y,
        point.y + transformData.localStart.z
      )
    );

    const segmentLength = transformData.localEnd.sub(transformData.localStart).length();
    this.length = segmentLength;

    return profilePath;
  }

  getIO(): PSegmentLoft_IO {
    return PSegmentLoft_IO.instance();
  }

  onFieldChanged(fieldName: string, oldValue: any, newValue: any): void {
    const positionFields = ['XStart', 'YStart', 'ZStart', 'XEnd', 'YEnd', 'ZEnd'];
    const transformFields = ['x', 'y', 'z'];

    if (positionFields.includes(fieldName)) {
      this.updatePosition();
      this.dirty();
      this.signalGeometryChanged.dispatch();
    } else if (transformFields.includes(fieldName)) {
      this.dirty();
      this.signalPositionChanged.dispatch();
    } else if (fieldName === 'metadata') {
      this.dirty();
      this.signalGeometryChanged.dispatch();
    }

    super.onFieldChanged(fieldName, oldValue, newValue);
  }

  updatePosition(): void {
    const transformData = this.getTransformData();

    this.x = transformData.originPoint.x;
    this.y = transformData.originPoint.y;
    this.z = transformData.originPoint.z;
    this.XRotation = transformData.rotationOfDeg.x;
    this.YRotation = transformData.rotationOfDeg.y;
    this.ZRotation = transformData.rotationOfDeg.z;

    const size = this.getSize();
    this.XLength = size.XLength;
    this.YLength = size.YLength;
    this.ZLength = size.ZLength;
  }

  getTransformData(): TransformData {
    const startPoint = new THREE.Vector3(this.XStart, this.YStart, this.ZStart);
    const endPoint = new THREE.Vector3(this.XEnd, this.YEnd, this.ZEnd);

    const direction = new THREE.Vector3();
    direction.subVectors(endPoint, startPoint);
    direction.normalize();

    const upVector = new THREE.Vector3(0, 1, 0);
    const sideVector = new THREE.Vector3();
    sideVector.crossVectors(direction, upVector);

    const transformMatrix = new THREE.Matrix4();
    transformMatrix.makeBasis(direction, upVector, sideVector);

    const midPoint = new THREE.Vector3();
    midPoint.addVectors(startPoint, endPoint).multiplyScalar(0.5);
    transformMatrix.setPosition(midPoint);

    const profileTransform = PSegmentLoft.getProfileTransformMatrixByContentType(this.metadata);
    transformMatrix.multiply(profileTransform);

    const inverseMatrix = new THREE.Matrix4();
    inverseMatrix.getInverse(transformMatrix);

    const localStart = startPoint.clone();
    const localEnd = endPoint.clone();
    localStart.applyMatrix4(inverseMatrix);
    localEnd.applyMatrix4(inverseMatrix);

    const euler = new THREE.Euler();
    euler.setFromRotationMatrix(transformMatrix);

    return {
      start: startPoint,
      end: endPoint,
      originPoint: midPoint,
      matrix: transformMatrix,
      inverseMatrix: inverseMatrix,
      localStart: localStart,
      localEnd: localEnd,
      euler: euler,
      rotationOfDeg: {
        x: euler.x * THREE.Math.RAD2DEG,
        y: euler.y * THREE.Math.RAD2DEG,
        z: euler.z * THREE.Math.RAD2DEG
      }
    };
  }

  getSize(): SizeData {
    const size: SizeData = {
      XLength: 0,
      YLength: 0,
      ZLength: 0
    };

    const contentType = this.metadata?.contentType ?? null;
    if (!contentType) {
      return size;
    }

    const startPoint = new THREE.Vector3(this.XStart, this.YStart, this.ZStart);
    const segmentLength = new THREE.Vector3(this.XEnd, this.YEnd, this.ZEnd)
      .sub(startPoint)
      .length();

    if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamMullion)) {
      size.XLength = this.XSize;
      size.YLength = this.YSize;
      size.ZLength = segmentLength;
    } else {
      size.XLength = segmentLength;
      size.YLength = this.XSize;
      size.ZLength = this.YSize;
    }

    return size;
  }

  static getProfileTransformMatrixByContentType(metadata: ResourceMetadata): THREE.Matrix4 {
    const transformMatrix = new THREE.Matrix4();

    if (!metadata?.contentType) {
      return transformMatrix;
    }

    const tempMatrix = new THREE.Matrix4();
    const contentType = metadata.contentType;

    if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamUpTrack)) {
      tempMatrix.makeTranslation(0, 0, metadata.profileSizeY);
      transformMatrix.multiply(tempMatrix);
    } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamDownTrack)) {
      tempMatrix.makeTranslation(0, 0, 0);
      transformMatrix.multiply(tempMatrix);
    } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamMullion)) {
      tempMatrix.makeTranslation(0, -metadata.profileSizeY, 0);
      transformMatrix.multiply(tempMatrix);
      tempMatrix.identity();
      tempMatrix.makeRotationX(Math.PI / 2);
      transformMatrix.multiply(tempMatrix);
    } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamUpTransom)) {
      tempMatrix.makeTranslation(0, 0, metadata.profileSizeY);
      transformMatrix.multiply(tempMatrix);
    } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamMiddleTransom)) {
      tempMatrix.makeTranslation(0, 0, metadata.profileSizeY / 2);
      transformMatrix.multiply(tempMatrix);
    } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamDownTransom)) {
      tempMatrix.makeTranslation(0, 0, 0);
      transformMatrix.multiply(tempMatrix);
    }

    return transformMatrix;
  }

  static getPSegmentLoftContentTypes(): string[] {
    return [
      HSCatalog.ContentTypeEnum.ParamUpTrack,
      HSCatalog.ContentTypeEnum.ParamDownTrack,
      HSCatalog.ContentTypeEnum.ParamMullion,
      HSCatalog.ContentTypeEnum.ParamUpTransom,
      HSCatalog.ContentTypeEnum.ParamMiddleTransom,
      HSCatalog.ContentTypeEnum.ParamDownTransom
    ];
  }

  protected defineStateField(name: string, initialValue: number): void {
    // Implementation provided by parent class
  }

  protected dirty(): void {
    // Implementation provided by parent class
  }
}

Entity.registerClass(HSConstants.ModelClass.NgPSegmentLoft, PSegmentLoft);

export { PSegmentLoft, PSegmentLoft_IO };