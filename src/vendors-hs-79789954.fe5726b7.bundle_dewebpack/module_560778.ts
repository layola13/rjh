import * as THREE from 'three';
import { Box3, Vector3 } from 'three';

interface BoundingBox {
  min: Vector3;
  max: Vector3;
  isValid(): boolean;
  makeEmpty(): void;
  setFromPoints(points: Vector3[]): Box3;
  clone(): Box3;
  applyMatrix4(matrix: THREE.Matrix4): Box3;
}

interface Box3D {
  XLength: number;
  YLength: number;
  ZLength: number;
}

interface Vector3Like {
  x: number;
  y: number;
  z: number;
}

type Vector3Input = [number, number, number] | Vector3Like;

const defaultBox = new Box3();
const minVector = new Vector3();
const maxVector = new Vector3();

let cachedCorners: Vector3[] | undefined;

function transformBoxCorners(
  min: number[],
  max: number[],
  transform?: THREE.Matrix4
): Vector3[] {
  if (!cachedCorners) {
    cachedCorners = [
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3()
    ];
  }

  const corners = cachedCorners.slice();

  corners[0].set(min[0], min[1], min[2]);
  corners[1].set(max[0], min[1], min[2]);
  corners[2].set(max[0], max[1], min[2]);
  corners[3].set(min[0], max[1], min[2]);
  corners[4].set(min[0], min[1], max[2]);
  corners[5].set(max[0], min[1], max[2]);
  corners[6].set(max[0], max[1], max[2]);
  corners[7].set(min[0], max[1], max[2]);

  if (transform) {
    corners.forEach(corner => corner.applyMatrix4(transform));
  }

  return corners;
}

const min = (a: number, b: number): number => a < b ? a : b;
const max = (a: number, b: number): number => a > t ? a : b;

export function buildBBoxFromSize(
  size: [number, number, number],
  target: Box3 = defaultBox
): Box3 {
  const [width, height, depth] = size;
  
  minVector.set(-width / 2, -height / 2, 0);
  maxVector.set(width / 2, height / 2, depth);
  
  return target.set(minVector, maxVector);
}

export function transformBBox(
  box: Box3,
  matrix: THREE.Matrix4,
  target: Box3 = defaultBox
): Box3 {
  return box.clone().applyMatrix4(matrix);
}

export function createHSBox3(
  minPoint: Vector3Input,
  maxPoint: Vector3Input,
  transform?: THREE.Matrix4
): Box3 {
  const minArray = Array.isArray(minPoint) 
    ? minPoint 
    : [minPoint.x, minPoint.y, minPoint.z];
  
  const maxArray = Array.isArray(maxPoint) 
    ? maxPoint 
    : [maxPoint.x, maxPoint.y, maxPoint.z];

  const corners = transformBoxCorners(minArray, maxArray, transform);
  const box = new THREE.Box3();
  
  return box.setFromPoints(corners);
}

export function transformHSBox(box: Box3, transform: THREE.Matrix4): Box3 {
  const { min, max } = box;
  const corners = transformBoxCorners(
    [min.x, min.y, min.z],
    [max.x, max.y, max.z],
    transform
  );
  
  box.setFromPoints(corners);
  return box;
}

export function viewToModelBox(viewBox: Box3, modelBox: Box3): Box3 {
  modelBox.min.x = viewBox.min.x;
  modelBox.min.y = -viewBox.max.z;
  modelBox.min.z = viewBox.min.y;
  
  modelBox.max.x = viewBox.max.x;
  modelBox.max.y = -viewBox.min.z;
  modelBox.max.z = viewBox.max.y;
  
  return modelBox;
}

export function hsBoxIntersection(
  boxA: Box3,
  boxB: Box3,
  target: Box3
): Box3 {
  target.min.x = Math.max(boxA.min.x, boxB.min.x);
  target.min.y = Math.max(boxA.min.y, boxB.min.y);
  target.min.z = Math.max(boxA.min.z, boxB.min.z);
  
  target.max.x = Math.min(boxA.max.x, boxB.max.x);
  target.max.y = Math.min(boxA.max.y, boxB.max.y);
  target.max.z = Math.min(boxA.max.z, boxB.max.z);
  
  if (!target.isValid()) {
    target.makeEmpty();
  }
  
  return target;
}

export function hsBox2Intersection(
  boxA: Box3,
  boxB: Box3,
  target: Box3
): Box3 {
  target.min.x = Math.max(boxA.min.x, boxB.min.x);
  target.min.y = Math.max(boxA.min.y, boxB.min.y);
  
  target.max.x = Math.min(boxA.max.x, boxB.max.x);
  target.max.y = Math.min(boxA.max.y, boxB.max.y);
  
  if (!target.isValid()) {
    target.makeEmpty();
  }
  
  return target;
}

export function calculateIOU(boxA: Box3D, boxB: Box3D): number {
  const intersectionVolume = 
    max(0, min(boxA.XLength, boxB.XLength) - max(0, 0)) *
    max(0, min(boxA.YLength, boxB.YLength) - max(0, 0)) *
    max(0, min(boxA.ZLength, boxB.ZLength) - max(0, 0));
  
  const volumeA = boxA.XLength * boxA.YLength * boxA.ZLength;
  const volumeB = boxB.XLength * boxB.YLength * boxB.ZLength;
  const unionVolume = volumeA + volumeB - intersectionVolume;
  
  return intersectionVolume / unionVolume;
}