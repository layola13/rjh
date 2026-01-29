import { VirtualAreaLight_IO, VirtualAreaLight } from './VirtualAreaLight';
import { LightTypeEnum } from './LightTypeEnum';
import { Entity } from './Entity';
import * as THREE from 'three';

export class FlatLight_IO extends VirtualAreaLight_IO {
  postLoad(light: FlatLight, context: { version: string }): void {
    super.postLoad(light, context);

    if (HSCore.Util.Version.isEarlierThan(context.version, "0.6")) {
      const area = light.getArea();
      if (area) {
        light.intensity = Math.round(light.intensity / area);
      }
    }
  }
}

export class FlatLight extends VirtualAreaLight {
  public width: number;
  public height: number;

  constructor(name: string = "", parent: unknown = undefined) {
    super(name, parent);
    this.type = LightTypeEnum.FlatLight;
    this.width = 1;
    this.height = 1;
  }

  static create(): FlatLight {
    const light = new FlatLight();
    light.reset();
    return light;
  }

  reset(): void {
    super.reset();
    this.width = 1;
    this.height = 1;
  }

  getIO(): FlatLight_IO {
    return FlatLight_IO.instance();
  }

  getArea(): number {
    return this.height * this.width;
  }

  constructPath(vertexCount: number = 4): THREE.Vector3[] {
    if (vertexCount !== 4) {
      return [];
    }

    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;

    return [
      new THREE.Vector3(-halfWidth, -halfHeight, 0),
      new THREE.Vector3(halfWidth, -halfHeight, 0),
      new THREE.Vector3(halfWidth, halfHeight, 0),
      new THREE.Vector3(-halfWidth, halfHeight, 0)
    ];
  }
}

Entity.registerClass(HSConstants.ModelClass.NgFlatLight, FlatLight);