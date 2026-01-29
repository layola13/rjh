import { ActiveContext, ActiveType } from './289659';
import { ContentRotation } from './449406';

enum MoveRotateMode {
  moveAndRotate = 0,
  onlyMove = 1,
  onlyRotate = 2
}

Object.freeze(MoveRotateMode);

interface GizmoConfig {
  targetEnabled: boolean;
  type: HSCore.Model.LightTypeEnum;
  ZLength: number;
}

export default class LightGizmo extends HSApp.View.Base.Gizmo {
  constructor(
    context: unknown,
    node: unknown,
    config: GizmoConfig,
    target?: HSApp.View.T3d.LightTarget
  ) {
    super(context, node, config);

    const activeContext = new ActiveContext();
    let mode = MoveRotateMode.moveAndRotate;

    activeContext.selectLightTarget = false;

    if (config.targetEnabled) {
      activeContext.selectLightTarget = !!(target && target instanceof HSApp.View.T3d.LightTarget);
      mode = MoveRotateMode.onlyMove;
    }

    if (this.supportRotation(config)) {
      if (mode === MoveRotateMode.moveAndRotate || mode === MoveRotateMode.onlyRotate) {
        [ActiveType.xy, ActiveType.xz, ActiveType.yz].forEach((activeType) => {
          this.addChildGizmo(
            new ContentRotation(context, node, config, 1, undefined, activeType, activeContext)
          );
        });
      }

      this.addChildGizmo(
        new RotationGizmo(this.context, node, config, activeContext)
      );
    }

    if (mode === MoveRotateMode.moveAndRotate || mode === MoveRotateMode.onlyMove) {
      this.addChildGizmo(
        new TopMoveGizmo(context, node, config, config.ZLength, 0.5, undefined, ActiveType.top, activeContext)
      );

      const rotationAngles = [0, Math.PI, 0.5 * Math.PI, -0.5 * Math.PI];
      rotationAngles.forEach((angle) => {
        let activeType: ActiveType;

        if (angle === 0) {
          activeType = ActiveType.near;
        } else if (angle === Math.PI) {
          activeType = ActiveType.left;
        } else if (angle === 0.5 * Math.PI) {
          activeType = ActiveType.far;
        } else if (angle === -0.5 * Math.PI) {
          activeType = ActiveType.right;
        } else {
          return;
        }

        this.addChildGizmo(
          new DirectionalMoveGizmo(this.context, node, angle, config, 1, undefined, activeType, activeContext)
        );
      });
    }
  }

  private supportRotation(config: GizmoConfig): boolean {
    return !(
      config.type === HSCore.Model.LightTypeEnum.PointLight ||
      config instanceof HSCore.Model.LightSubGroup
    );
  }
}

class RotationGizmo {
  constructor(
    context: unknown,
    node: unknown,
    config: GizmoConfig,
    activeContext: ActiveContext
  ) {}
}

class TopMoveGizmo {
  constructor(
    context: unknown,
    node: unknown,
    config: GizmoConfig,
    zLength: number,
    scale: number,
    options: unknown,
    activeType: ActiveType,
    activeContext: ActiveContext
  ) {}
}

class DirectionalMoveGizmo {
  constructor(
    context: unknown,
    node: unknown,
    angle: number,
    config: GizmoConfig,
    scale: number,
    options: unknown,
    activeType: ActiveType,
    activeContext: ActiveContext
  ) {}
}