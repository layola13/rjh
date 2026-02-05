// @ts-nocheck
import { ContentLift, ContentLiftController } from './ContentLift';

interface LightEntity {
  x: number;
  y: number;
  z: number;
  XTarget: number;
  YTarget: number;
  ZTarget: number;
}

interface ActiveContext {
  selectLightTarget: boolean;
}

interface ControllerOptions {
  selectLightTarget: boolean;
}

class CustomContentLift extends ContentLift {
  constructor(
    e: unknown,
    n: unknown,
    i: unknown,
    a: unknown,
    s: unknown,
    l: unknown,
    c: unknown,
    u: unknown
  ) {
    const controller = l ?? new CustomContentLiftController(i as LightEntity, e, undefined, c as unknown, u as ControllerOptions);
    super(e, n, i, a, s, controller, c, u);
  }

  get contentPosition(): THREE.Vector3 {
    const entity = this.content as LightEntity;
    return this.activeContext.selectLightTarget
      ? new THREE.Vector3(entity.XTarget, entity.YTarget, entity.ZTarget)
      : new THREE.Vector3(entity.x, entity.y, entity.z);
  }
}

class CustomContentLiftController extends ContentLiftController {
  constructor(
    entity: LightEntity,
    parent: unknown,
    controller?: unknown,
    context?: unknown,
    options?: ControllerOptions
  ) {
    let finalController = controller;
    
    if (!finalController) {
      finalController = options?.selectLightTarget
        ? new HSApp.View.Base.LightTarget.LightTargetController(entity, parent)
        : new HSApp.View.Base.Light.LightController(entity, parent);
    }
    
    super(entity, parent, finalController, context, options);
  }

  get contentPosition(): THREE.Vector3 {
    const entity = this.entity as LightEntity;
    return this.activeContext.selectLightTarget
      ? new THREE.Vector3(entity.XTarget, entity.YTarget, entity.ZTarget)
      : new THREE.Vector3(entity.x, entity.y, entity.z);
  }
}

export default CustomContentLift;