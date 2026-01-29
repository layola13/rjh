import { Command } from 'HSApp/Cmd/Command';
import { RequestType } from 'HSFPConstants';
import type { Edge } from 'HSCore/Model/Edge';
import type { Floor } from 'HSCore/Model/Floor';
import type { Ceiling } from 'HSCore/Model/Ceiling';
import type { Slab } from 'HSCore/Model/Slab';
import type { TransactionManager, TransactionRequest } from 'HSCore/Transaction';

/**
 * Command to delete a split edge between two floors or ceilings
 */
export class CmdDeleteSplitEdge extends Command {
  private edge: Edge;
  private _request?: TransactionRequest;

  constructor(edge: Edge) {
    super();
    this.edge = edge;
  }

  onExecute(): void {
    const slab: Slab | null = this.edge.coedge 
      ? HSCore.Util.Slab.getSlabForCoEdge(this.edge.coedge) 
      : null;

    if (slab) {
      const transManager: TransactionManager = this.context.transManager;
      this._request = transManager.createRequest(RequestType.ChangeSlab, [slab]);

      if (this.doDeleteEdge()) {
        transManager.commit(this._request);
        this.mgr.complete();
      } else {
        this._request = undefined;
        this.mgr.cancel();
      }
    }
  }

  doDeleteEdge(): boolean {
    const edge = this.edge;
    const surfaces: Array<Floor | Ceiling> = [];

    Object.values(edge.parents).forEach((parent) => {
      const uniqueParent = parent.getUniqueParent()?.getUniqueParent();
      if (uniqueParent && 
          (uniqueParent instanceof HSCore.Model.Floor || 
           uniqueParent instanceof HSCore.Model.Ceiling)) {
        surfaces.push(uniqueParent);
      }
    });

    if (surfaces.length > 1) {
      const firstSurface = surfaces[0];
      const secondSurface = surfaces[1];
      const sharedEdges: Edge[] = HSCore.Util.Face.getSharedEdges(firstSurface, secondSurface);

      assert(sharedEdges.includes(edge));

      HSApp.App.getApp().selectionManager.unselectAll();

      return HSCore.Util.Face.mergeFloorToOtherFloor(firstSurface, secondSurface, sharedEdges) === secondSurface;
    }

    return false;
  }

  onCleanup(): void {
    super.onCleanup();
  }

  canUndoRedo(): boolean {
    return false;
  }
}