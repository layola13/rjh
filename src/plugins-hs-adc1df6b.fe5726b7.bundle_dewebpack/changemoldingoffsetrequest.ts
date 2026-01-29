import { HSCore } from './HSCore';

export class ChangeMoldingOffsetRequest extends HSCore.Transaction.Common.StateRequest {
  private entity: HSCore.Model.Baseboard | HSCore.Model.Cornice;

  constructor(entity: HSCore.Model.Baseboard | HSCore.Model.Cornice) {
    super();
    this.entity = entity;
  }

  onReceive(action: string, offset: number): boolean {
    if (action !== "changeOffset") {
      return super.onReceive(action, offset);
    }

    this.entity.offset = offset;
    this.entity.dirtyNeighborMoldingsByFacetype();

    if (this.entity instanceof HSCore.Model.Baseboard) {
      const host = this.entity.host;
      HSCore.Util.Face.removeHoleForMolding(this.entity);
      
      if (offset > 0) {
        HSCore.Util.Face.makeHoleForMolding(this.entity);
      }
      
      host.updateFaceMixpaint();
      host.dirtyGeometry();
    } else if (this.entity instanceof HSCore.Model.Cornice) {
      const host = this.entity.host;
      const validTopoPathers: HSCore.Model.CorniceTopoPather[] = [];

      this.entity.topoPathers.forEach((topoPather) => {
        const zLimit = HSCore.Model.CorniceTopoPather.offsetZLimit(topoPather.index, host);
        if (zLimit - offset - this.entity.height >= 0) {
          validTopoPathers.push(topoPather);
        }
      });

      if (this.entity.topoPathers.length === validTopoPathers.length) {
        return true;
      }

      if (validTopoPathers.length === 0) {
        host.removeMolding(this.entity);
        return true;
      }

      const clonedEntity = this.entity.clone();
      const newCornices = validTopoPathers.map((topoPather) => {
        const newCornice = clonedEntity.clone();
        newCornice.addTopoPather(topoPather);
        newCornice.assignTo(host);
        host.addMolding(newCornice);
        return newCornice;
      });

      host.removeMolding(this.entity);
      HSCore.Util.Molding.autoConnectGivenCornices(newCornices);
    }

    return true;
  }

  onUndo(): void {
    super.onUndo();
    this.entity.dirtyNeighborMoldingsByFacetype();
  }

  onRedo(): void {
    super.onRedo();
    this.entity.dirtyNeighborMoldingsByFacetype();
  }

  canTransactField(): boolean {
    return true;
  }
}