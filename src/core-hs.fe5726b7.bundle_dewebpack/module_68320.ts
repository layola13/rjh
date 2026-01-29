import { polygon } from './polygon-library';
import { Logger } from './logger';

interface Point {
  X: number;
  Y: number;
}

interface Shape {
  outer: Point[];
  holes: Point[][];
  isSeam?: boolean;
  uvDescription?: UVDescription;
}

interface Bound {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface PavingOption {
  point?: { x: number; y: number };
  type?: string;
  rotation?: number;
  defaultOffsetX?: number;
  defaultOffsetY?: number;
}

interface Material {
  rotation?: number;
  alignType?: boolean;
}

interface UVDescription {
  uDirection: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  };
  vDirection: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  };
  uLength: number;
  vLength: number;
}

interface GeometryOptions {
  shapes: Shape[];
  bound?: Bound;
  matBound?: Bound;
  pavingOption: PavingOption;
  material?: Material;
  isBrick?: boolean;
  isSeam?: boolean;
  uvDescription?: UVDescription;
}

interface CoordinateSystem {
  offset: { x: number; y: number };
  xDirection: { x: number; y: number };
  yDirection: { x: number; y: number };
}

function createBufferGeometry(shapes: Shape[], decimalPlaces: number = 12): THREE.BufferGeometry {
  const indices: number[] = [];
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];

  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    const outerPoints = shape.outer;
    const holePoints = shape.holes;
    const outerCoords: number[][] = [];
    const holeCoords: number[][][] = [];

    outerPoints.forEach((point) => {
      outerCoords.push([point.X, point.Y]);
    });

    holePoints.forEach((hole) => {
      const holeCoord: number[][] = [];
      hole.forEach((point) => {
        holeCoord.push([point.X, point.Y]);
      });
      holeCoords.push(holeCoord);
    });

    try {
      polygon.triangulate(outerCoords, holeCoords).forEach((triangle) => {
        triangle.forEach((vertex) => {
          positions.push(vertex[0], vertex[1], 0);
          normals.push(0, 0, 1);

          if (shapes.isSeam && shapes.uvDescription) {
            const point = new THREE.Vector3(vertex[0], vertex[1], 0);
            const uDist = HSCore.Util.Math.getDistToLine(point, shapes.uvDescription.uDirection);
            const vNormalized = HSCore.Util.Math.getDistToLine(point, shapes.uvDescription.vDirection) / shapes.uvDescription.uLength;
            const uNormalized = uDist / shapes.uvDescription.vLength;
            uvs.push(vNormalized, uNormalized);
          } else {
            uvs.push(vertex[0], vertex[1]);
          }
        });
      });
    } catch (error) {
      Logger.console.error(error);
    }
  }

  for (let i = 0; i < positions.length / 3; i++) {
    indices.push(i);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.addAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.addAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(new THREE.Uint32BufferAttribute(indices, 1));

  return geometry;
}

function normalizeZero(value: number): number {
  return HSCore.Util.Math.isZero(value) ? 0 : value;
}

function getNewBufferGeometryWithUvTransformForBrick(options: GeometryOptions): THREE.BufferGeometry {
  const shapes = options.shapes;
  const bound = options.matBound || options.bound;
  const pavingPoint = options.pavingOption.point;
  let rotationAngle = 0;

  const boundOffset = bound ? new THREE.Vector2(bound.left, bound.top) : new THREE.Vector2(0, 0);

  if (pavingPoint && options.pavingOption.type !== 'default-normal' && options.material && !options.material.alignType) {
    const materialRotation = options.material.rotation || 0;
    const pavingRotation = options.pavingOption.rotation || 0;
    rotationAngle = normalizeZero(THREE.Math.degToRad(pavingRotation - materialRotation));
  }

  const geometry = createBufferGeometry(shapes);
  const flipScale = new THREE.Vector2(1, -1);
  const uvArray = geometry.attributes.uv.array as number[];
  const uvVector = new THREE.Vector2();

  let rotationCenter: THREE.Vector2;
  if (pavingPoint) {
    rotationCenter = new THREE.Vector2(pavingPoint.x, pavingPoint.y);
  } else {
    rotationCenter = bound ? new THREE.Vector2(bound.width / 2, bound.height / 2) : new THREE.Vector2(0, 0);
  }

  rotationCenter.x += boundOffset.x;
  rotationCenter.y += boundOffset.y;

  const defaultOffsetX = options.pavingOption.defaultOffsetX || 0;
  const defaultOffsetY = options.pavingOption.defaultOffsetY || 0;
  const offsetCenter = new THREE.Vector2(rotationCenter.x + defaultOffsetX, rotationCenter.y + defaultOffsetY);

  for (let i = 0; i < uvArray.length; i += 2) {
    uvVector
      .fromArray(uvArray, i)
      .rotateAround(rotationCenter, -rotationAngle || 0)
      .sub(offsetCenter)
      .multiply(flipScale)
      .toArray(uvArray, i);
  }

  const normalArray = geometry.attributes.normal.array as number[];
  const normalVector = new THREE.Vector3();
  for (let i = 0; i < normalArray.length; i += 3) {
    normalVector.fromArray(normalArray, i).negate().toArray(normalArray, i);
  }

  const indexArray = geometry.index!.array as number[];
  let temp: number;
  for (let i = 0; i < indexArray.length; i += 3) {
    temp = indexArray[i + 1];
    indexArray[i + 1] = indexArray[i + 2];
    indexArray[i + 2] = temp;
  }

  return geometry;
}

function applyPavingTransform(options: GeometryOptions, coordinateSystem: CoordinateSystem): void {
  const pavingPoint = options.pavingOption.point;
  let rotationAngle = 0;
  let defaultOffset = { x: 0, y: 0 };
  const rotationCenter = new THREE.Vector2(0, 0);

  if (pavingPoint && options.pavingOption.type !== 'default-normal' && options.material && !options.material.alignType) {
    const materialRotation = options.material.rotation || 0;
    const pavingRotation = options.pavingOption.rotation || 0;
    rotationAngle = normalizeZero(THREE.Math.degToRad(pavingRotation - materialRotation));
    rotationCenter.add(new THREE.Vector2(pavingPoint.x, pavingPoint.y));
    defaultOffset.x = options.pavingOption.defaultOffsetX || 0;
    defaultOffset.y = options.pavingOption.defaultOffsetY || 0;
  }

  const cos = Math.cos(rotationAngle);
  const negSin = -Math.sin(rotationAngle);
  const sin = Math.sin(rotationAngle);
  const cosY = Math.cos(rotationAngle);

  rotationCenter.x += defaultOffset.x;
  rotationCenter.y += defaultOffset.y;

  const transformedX = cos * rotationCenter.x + negSin * rotationCenter.y - defaultOffset.x;
  const transformedY = sin * rotationCenter.x + cosY * rotationCenter.y - defaultOffset.y;

  coordinateSystem.offset.x += coordinateSystem.xDirection.x * transformedX + coordinateSystem.yDirection.x * transformedY;
  coordinateSystem.offset.y += coordinateSystem.xDirection.y * transformedX + coordinateSystem.yDirection.y * transformedY;

  const newXDirX = coordinateSystem.xDirection.x * cos + coordinateSystem.yDirection.x * sin;
  const newYDirX = coordinateSystem.xDirection.x * negSin + coordinateSystem.yDirection.x * cosY;
  const newXDirY = coordinateSystem.xDirection.y * cos + coordinateSystem.yDirection.y * sin;
  const newYDirY = coordinateSystem.xDirection.y * negSin + coordinateSystem.yDirection.y * cosY;

  coordinateSystem.xDirection.x = newXDirX;
  coordinateSystem.xDirection.y = newXDirY;
  coordinateSystem.yDirection.x = newYDirX;
  coordinateSystem.yDirection.y = newYDirY;
}

export function getNewBufferGeometry(options: GeometryOptions): THREE.BufferGeometry {
  const shapes = options.shapes;
  const bound = options.matBound;
  const pavingPoint = options.pavingOption.point;
  let rotationAngle = 0;
  let defaultOffset = { x: 0, y: 0 };
  const rotationCenter = new THREE.Vector2(0, 0);
  const boundOffset = bound ? new THREE.Vector2(bound.left, bound.top) : new THREE.Vector2(0, 0);

  if (pavingPoint && options.pavingOption.type !== 'default-normal' && options.material && !options.material.alignType) {
    const materialRotation = options.material.rotation || 0;
    const pavingRotation = options.pavingOption.rotation || 0;
    rotationAngle = normalizeZero(THREE.Math.degToRad(pavingRotation - materialRotation));

    rotationCenter.add(new THREE.Vector2(pavingPoint.x, pavingPoint.y));
    defaultOffset.x -= options.pavingOption.defaultOffsetX || 0;
    defaultOffset.y -= options.pavingOption.defaultOffsetY || 0;
  }

  const geometry = createBufferGeometry(shapes);
  const uvArray = geometry.attributes.uv.array as number[];
  const uvVector = new THREE.Vector2();
  const flipScale = new THREE.Vector2(1, -1);

  for (let i = 0; i < uvArray.length; i += 2) {
    uvVector
      .fromArray(uvArray, i)
      .sub(boundOffset)
      .multiply(flipScale)
      .sub(new THREE.Vector2(rotationCenter.x, -rotationCenter.y))
      .rotateAround(new THREE.Vector2(defaultOffset.x, -defaultOffset.y), rotationAngle || 0)
      .toArray(uvArray, i);
  }

  const normalArray = geometry.attributes.normal.array as number[];
  const normalVector = new THREE.Vector3();
  for (let i = 0; i < normalArray.length; i += 3) {
    normalVector.fromArray(normalArray, i).negate().toArray(normalArray, i);
  }

  const indexArray = geometry.index!.array as number[];
  let temp: number;
  for (let i = 0; i < indexArray.length; i += 3) {
    temp = indexArray[i + 1];
    indexArray[i + 1] = indexArray[i + 2];
    indexArray[i + 2] = temp;
  }

  return geometry;
}

export { getNewBufferGeometryWithUvTransformForBrick };

export function getNewBufferGeometryWithUvTransform(options: GeometryOptions): THREE.BufferGeometry {
  if (options.isBrick) {
    return getNewBufferGeometryWithUvTransformForBrick(options);
  }

  const shapes = options.shapes;
  const bound = options.matBound || options.bound;
  const pavingPoint = options.pavingOption.point;

  shapes.isSeam = options.isSeam;
  shapes.uvDescription = options.uvDescription;

  let rotationAngle = 0;
  let defaultOffset = { x: 0, y: 0 };
  let rotationCenter = new THREE.Vector2(0, 0);
  const boundOffset = bound ? new THREE.Vector2(bound.left, bound.top) : new THREE.Vector2(0, 0);

  if (pavingPoint && options.pavingOption.type !== 'default-normal' && options.material && !options.material.alignType) {
    const materialRotation = options.material.rotation || 0;
    const pavingRotation = options.pavingOption.rotation || 0;
    rotationAngle = normalizeZero(THREE.Math.degToRad(pavingRotation - materialRotation));

    rotationCenter.add(new THREE.Vector2(pavingPoint.x, pavingPoint.y));
    defaultOffset.x -= options.pavingOption.defaultOffsetX || 0;
    defaultOffset.y -= options.pavingOption.defaultOffsetY || 0;
  }

  const geometry = createBufferGeometry(shapes);
  const flipScale = new THREE.Vector2(1, -1);
  const uvArray = geometry.attributes.uv.array as number[];
  const uvVector = new THREE.Vector2();

  if (!shapes.isSeam) {
    for (let i = 0; i < uvArray.length; i += 2) {
      uvVector.fromArray(uvArray, i).sub(boundOffset).multiply(flipScale).toArray(uvArray, i);
    }
  }

  rotationCenter = new THREE.Vector2(rotationCenter.x, -rotationCenter.y);
  defaultOffset = { x: defaultOffset.x, y: -defaultOffset.y };

  const translateToOrigin = new THREE.Matrix3().translate(-rotationCenter.x, -rotationCenter.y);
  const translateToOffset = new THREE.Matrix3().translate(-defaultOffset.x, -defaultOffset.y);
  const rotate = new THREE.Matrix3().rotate(-rotationAngle || 0);
  const translateBack = new THREE.Matrix3().translate(defaultOffset.x, defaultOffset.y);

  const rotateWithOffset = new THREE.Matrix3().multiplyMatrices(rotate, translateToOffset);
  const applyTranslateBack = new THREE.Matrix3().multiplyMatrices(translateBack, rotateWithOffset);
  const uvTransform = new THREE.Matrix3().multiplyMatrices(applyTranslateBack, translateToOrigin);

  const normalArray = geometry.attributes.normal.array as number[];
  const normalVector = new THREE.Vector3();
  for (let i = 0; i < normalArray.length; i += 3) {
    normalVector.fromArray(normalArray, i).negate().toArray(normalArray, i);
  }

  const indexArray = geometry.index!.array as number[];
  let temp: number;
  for (let i = 0; i < indexArray.length; i += 3) {
    temp = indexArray[i + 1];
    indexArray[i + 1] = indexArray[i + 2];
    indexArray[i + 2] = temp;
  }

  (geometry as any).uvTransform = uvTransform;
  return geometry;
}

export function calcCoordinateSystem(options: GeometryOptions): CoordinateSystem {
  const coordinateSystem: CoordinateSystem = {
    offset: { x: 0, y: 0 },
    xDirection: { x: 0, y: 0 },
    yDirection: { x: 0, y: 0 }
  };

  if (options.isBrick) {
    const bound = options.matBound || options.bound;
    let rotationAngle = 0;

    if (options.pavingOption.point && options.pavingOption.type !== 'default-normal' && options.material && !options.material.alignType) {
      const materialRotation = options.material.rotation || 0;
      const pavingRotation = options.pavingOption.rotation || 0;
      rotationAngle = normalizeZero(THREE.Math.degToRad(pavingRotation - materialRotation));
    }

    const centerPoint = options.pavingOption.point
      ? { x: options.pavingOption.point.x, y: options.pavingOption.point.y }
      : bound
      ? { x: bound.width / 2, y: bound.height / 2 }
      : { x: 0, y: 0 };

    centerPoint.x += bound ? bound.left : 0;
    centerPoint.y += bound ? bound.top : 0;

    const offsetPoint = {
      x: options.pavingOption.defaultOffsetX ? centerPoint.x + options.pavingOption.defaultOffsetX : 0,
      y: options.pavingOption.defaultOffsetY ? centerPoint.y + options.pavingOption.defaultOffsetY : 0
    };

    let cos = Math.cos(rotationAngle);
    let negSin = -Math.sin(rotationAngle);
    let sin = Math.sin(rotationAngle);
    let cosY = Math.cos(rotationAngle);

    offsetPoint.x = centerPoint.x - offsetPoint.x;
    offsetPoint.y = centerPoint.y - offsetPoint.y;

    coordinateSystem.offset.x = centerPoint.x - (offsetPoint.x * cos + offsetPoint.y * negSin);
    coordinateSystem.offset.y = centerPoint.y - (offsetPoint.x * sin + offsetPoint.y * cosY);

    negSin = -negSin;
    sin = -sin;

    coordinateSystem.xDirection.x = cos;
    coordinateSystem.xDirection.y = -sin;
    coordinateSystem.yDirection.x = negSin;
    coordinateSystem.yDirection.y = -cosY;
  } else if (options.isSeam && options.uvDescription) {
    coordinateSystem.offset.x = options.uvDescription.uDirection.start.x;
    coordinateSystem.offset.y = options.uvDescription.uDirection.start.y;
    coordinateSystem.xDirection.x = options.uvDescription.uDirection.end.x - options.uvDescription.uDirection.start.x;
    coordinateSystem.xDirection.y = options.uvDescription.uDirection.end.y - options.uvDescription.uDirection.start.y;
    coordinateSystem.yDirection.x = options.uvDescription.vDirection.end.x - options.uvDescription.vDirection.start.x;
    coordinateSystem.yDirection.y = options.uvDescription.vDirection.end.y - options.uvDescription.vDirection.start.y;
    applyPavingTransform(options, coordinateSystem);
  } else {
    const bound = options.matBound || options.bound;
    coordinateSystem.offset.x = bound!.left;
    coordinateSystem.offset.y = bound!.top;
    coordinateSystem.xDirection.x = 1;
    coordinateSystem.xDirection.y = 0;
    coordinateSystem.yDirection.x = 0;
    coordinateSystem.yDirection.y = 1;
    applyPavingTransform(options, coordinateSystem);
    coordinateSystem.yDirection.x *= -1;
    coordinateSystem.yDirection.y *= -1;
  }

  return coordinateSystem;
}