import { VirtualAreaLight_IO, VirtualAreaLight } from './VirtualAreaLight';
import { LightTypeEnum } from './LightTypeEnum';
import { Entity } from './Entity';
import * as THREE from 'three';

const DEFAULT_DIMENSION = 0.2;

export class EllipseLight_IO extends VirtualAreaLight_IO {
  static instance(): EllipseLight_IO {
    // Singleton pattern implementation
    return new EllipseLight_IO();
  }
}

export class EllipseLight extends VirtualAreaLight {
  public width: number;
  public height: number;
  public double_flat: boolean;

  constructor(name: string = "", parent: Entity | undefined = undefined) {
    super(name, parent);
    this.type = LightTypeEnum.EllipseLight;
    this.width = DEFAULT_DIMENSION;
    this.height = DEFAULT_DIMENSION;
    this.double_flat = false;
  }

  static create(): EllipseLight {
    const ellipseLight = new EllipseLight();
    ellipseLight.reset();
    return ellipseLight;
  }

  reset(): void {
    super.reset();
    this.width = DEFAULT_DIMENSION;
    this.height = DEFAULT_DIMENSION;
    this.double_flat = false;
  }

  getIO(): EllipseLight_IO {
    return EllipseLight_IO.instance();
  }

  getArea(): number {
    return Math.PI * this.height * this.width / 4;
  }

  constructPath(segmentCount: number): THREE.Vector3[] {
    if (segmentCount < 4) {
      return [];
    }

    const adjustedSegments = Math.floor(segmentCount / 4);
    const quarterSegments = adjustedSegments;
    const semiMajorAxis = this.width / 2;
    const semiMinorAxis = this.height / 2;
    const path: THREE.Vector3[] = [];
    const angleStep = Math.PI / 2 / quarterSegments;

    for (let i = 1; i < quarterSegments; ++i) {
      const angle = angleStep * i;
      const x = semiMajorAxis * Math.cos(angle);
      const y = semiMinorAxis * Math.sin(angle);

      path[i] = new THREE.Vector3(x, y, 0);
      path[2 * quarterSegments - i] = new THREE.Vector3(-x, y, 0);
      path[2 * quarterSegments + i] = new THREE.Vector3(-x, -y, 0);
      path[4 * quarterSegments - i] = new THREE.Vector3(x, -y, 0);
    }

    path[0] = new THREE.Vector3(semiMajorAxis, 0, 0);
    path[quarterSegments] = new THREE.Vector3(0, semiMinorAxis, 0);
    path[2 * quarterSegments] = new THREE.Vector3(-semiMajorAxis, 0, 0);
    path[3 * quarterSegments] = new THREE.Vector3(0, -semiMinorAxis, 0);

    return path;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgEllipseLight, EllipseLight);