// @ts-nocheck
import { Vector3 } from './Vector3';
import { ActiveContext, ActiveType } from './ActiveContext';
import { TubeBox } from './TubeBox';
import { TubeLift, TubeLiftController } from './TubeLift';
import { TubeMovement, TubeMovementController } from './TubeMovement';

interface Route {
  isLine3d(): boolean;
  getDirection(): Vector3;
}

interface Line3D {
  isLine3d(): boolean;
  getProjectedPtBy(point: Vector3): Vector3;
}

interface Tube {
  route: Route[];
  getCenter(): Vector3;
  getUniqueRoute(): Line3D | null;
}

interface Controller {
  // Add specific controller properties as needed
}

interface Context {
  // Add specific context properties as needed
}

interface Scene {
  // Add specific scene properties as needed
}

interface PositionOptions {
  x?: number;
  y?: number;
  z?: number;
}

interface GizmoOptions {
  controller: Controller;
}

abstract class BaseGizmo {
  protected context: Context;
  protected scene: Scene;
  protected tube: Tube;

  constructor(context: Context, scene: Scene, tube: Tube) {
    this.context = context;
    this.scene = scene;
    this.tube = tube;
  }

  protected abstract addChildGizmo(gizmo: unknown): void;
}

class TubeGizmo extends BaseGizmo {
  private static readonly GIZMO_SIZE = 0.4;
  private static readonly LIFT_OFFSET = 0.5;

  constructor(
    context: Context,
    scene: Scene,
    tube: Tube,
    options: GizmoOptions,
    positionOptions: PositionOptions
  ) {
    super(context, scene, tube);

    const activeContext = new ActiveContext();
    const controller = options.controller;

    if (positionOptions.z === undefined) {
      positionOptions.z = tube.getCenter().z;
    }

    const tubePosition = this.getTubePosition(positionOptions);

    this.addChildGizmo(new TubeBox(context, scene, tube));
    this.addChildGizmo(new TubeGizmoHelper(this.context, scene, tube, activeContext, tubePosition));
    this.addChildGizmo(new TubeGizmoDecorator(this.context, scene, tube, tubePosition));

    if (tube.route.length !== 1 || !tube.route[0].isLine3d()) {
      return;
    }

    const direction = tube.route[0].getDirection();
    const absX = Math.abs(direction.x);
    const absY = Math.abs(direction.y);
    const absZ = Math.abs(direction.z);

    const isXSmaller = absX < absY || absX < absZ;
    const isYSmaller = absY < absX || absY < absZ;
    const isZSmaller = absZ < absX || absZ < absY;

    if (isZSmaller) {
      const liftController = new TubeLiftController(
        tube,
        context,
        controller,
        ActiveType.top,
        activeContext,
        tubePosition
      );
      this.addChildGizmo(
        new TubeLift(
          context,
          scene,
          tube,
          TubeGizmo.GIZMO_SIZE,
          TubeGizmo.LIFT_OFFSET,
          liftController,
          ActiveType.top,
          activeContext
        )
      );
    }

    if (isYSmaller) {
      const nearController = new TubeMovementController(
        tube,
        context,
        controller,
        ActiveType.near,
        activeContext,
        tubePosition
      );
      this.addChildGizmo(
        new TubeMovement(
          this.context,
          scene,
          0,
          tube,
          TubeGizmo.GIZMO_SIZE,
          nearController,
          ActiveType.near,
          activeContext
        )
      );

      const leftController = new TubeMovementController(
        tube,
        context,
        controller,
        ActiveType.left,
        activeContext,
        tubePosition
      );
      this.addChildGizmo(
        new TubeMovement(
          this.context,
          scene,
          Math.PI,
          tube,
          TubeGizmo.GIZMO_SIZE,
          leftController,
          ActiveType.left,
          activeContext
        )
      );
    }

    if (isXSmaller) {
      const farController = new TubeMovementController(
        tube,
        context,
        controller,
        ActiveType.far,
        activeContext,
        tubePosition
      );
      this.addChildGizmo(
        new TubeMovement(
          this.context,
          scene,
          Math.PI / 2,
          tube,
          TubeGizmo.GIZMO_SIZE,
          farController,
          ActiveType.far,
          activeContext
        )
      );

      const rightController = new TubeMovementController(
        tube,
        context,
        controller,
        ActiveType.right,
        activeContext,
        tubePosition
      );
      this.addChildGizmo(
        new TubeMovement(
          this.context,
          scene,
          -Math.PI / 2,
          tube,
          TubeGizmo.GIZMO_SIZE,
          rightController,
          ActiveType.right,
          activeContext
        )
      );
    }
  }

  protected addChildGizmo(gizmo: unknown): void {
    // Implementation for adding child gizmo
  }

  private getTubePosition(positionOptions: PositionOptions): Vector3 {
    const uniqueRoute = this.tube.getUniqueRoute();
    const position = new Vector3(positionOptions);

    if (uniqueRoute && uniqueRoute.isLine3d()) {
      return uniqueRoute.getProjectedPtBy(position);
    }

    return position;
  }
}

class TubeGizmoHelper {
  constructor(
    context: Context,
    scene: Scene,
    tube: Tube,
    activeContext: ActiveContext,
    position: Vector3
  ) {
    // Implementation
  }
}

class TubeGizmoDecorator {
  constructor(
    context: Context,
    scene: Scene,
    tube: Tube,
    position: Vector3
  ) {
    // Implementation
  }
}

export default TubeGizmo;