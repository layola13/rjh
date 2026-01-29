import { ContentMovement, ContentMovementController } from './ContentMovement';

interface Content {
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

interface LightTargetController {
  new (content: Content, parent: unknown): unknown;
}

interface LightController {
  new (content: Content, parent: unknown): unknown;
}

declare namespace HSApp.View.Base.LightTarget {
  const LightTargetController: LightTargetController;
}

declare namespace HSApp.View.Base.Light {
  const LightController: LightController;
}

declare const THREE: {
  Vector3: {
    new (x: number, y: number, z: number): Vector3;
  };
};

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

class CustomContentMovement extends ContentMovement {
  content: Content;
  activeContext: ActiveContext;

  constructor(
    e: unknown,
    n: unknown,
    i: unknown,
    a: Content,
    s: ActiveContext,
    l: CustomContentMovementController | undefined,
    c: unknown,
    u: unknown
  ) {
    const controller = l ?? new CustomContentMovementController(a, e, undefined, c, s);
    super(e, n, i, a, s, controller, c, u);
  }

  get contentPosition(): Vector3 {
    const content = this.content;
    return this.activeContext.selectLightTarget
      ? new THREE.Vector3(content.XTarget, content.YTarget, content.ZTarget)
      : new THREE.Vector3(content.x, content.y, content.z);
  }
}

class CustomContentMovementController extends ContentMovementController {
  constructor(
    content: Content,
    parent: unknown,
    controller: unknown | undefined,
    param4: unknown,
    context: ActiveContext
  ) {
    const actualController =
      controller ??
      (context.selectLightTarget
        ? new HSApp.View.Base.LightTarget.LightTargetController(content, parent)
        : new HSApp.View.Base.Light.LightController(content, parent));
    
    super(content, parent, actualController, param4, context);
  }
}

export default CustomContentMovement;