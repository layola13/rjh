import { HSCore } from './HSCore';
import { HighlightGizmo } from './HighlightGizmo';
import { CustomizedStructureHighlightGizmo } from './CustomizedStructureHighlightGizmo';

interface DiffToolContext {
  entity: unknown;
}

export class DiffToolGizmoUtil {
  /**
   * Creates appropriate highlight gizmo based on the entity type
   * @param param1 - First parameter for gizmo construction
   * @param param2 - Second parameter for gizmo construction
   * @param context - Context containing the entity information
   * @param param4 - Fourth parameter for gizmo construction
   * @returns The created highlight gizmo instance
   */
  static getDiffToolHighLightGizmo(
    param1: unknown,
    param2: unknown,
    context: DiffToolContext,
    param4: unknown
  ): HighlightGizmo {
    let gizmo: HighlightGizmo = new HighlightGizmo(param1, param2, context, param4);

    if (context.entity instanceof HSCore.Model.NCustomizedStructure) {
      gizmo = new CustomizedStructureHighlightGizmo(param1, param2, context, param4);
    }

    return gizmo;
  }
}