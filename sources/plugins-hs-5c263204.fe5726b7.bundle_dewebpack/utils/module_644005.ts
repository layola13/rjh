// @ts-nocheck
import { ScaleContext, ScaleDirectionType, WallBoardScale } from './scale-utils';
import { Gizmo } from './gizmo-base';
import { ChildGizmo } from './child-gizmo';

export default class WallBoardGizmo extends Gizmo {
  constructor(
    context: unknown,
    node: unknown,
    instance: unknown
  ) {
    super(context, node, instance);
    
    this.addChildGizmo(new ChildGizmo(context, node, instance));
    
    const scaleContext = new ScaleContext();
    
    const scaleDirections: ScaleDirectionType[] = [
      ScaleDirectionType.left,
      ScaleDirectionType.right,
      ScaleDirectionType.top
    ];
    
    scaleDirections.forEach((direction: ScaleDirectionType) => {
      this.addChildGizmo(
        new WallBoardScale(this.context, node, instance, direction, scaleContext)
      );
    });
  }
}