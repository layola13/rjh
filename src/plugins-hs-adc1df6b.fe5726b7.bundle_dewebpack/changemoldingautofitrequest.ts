import { HSCore } from './path/to/HSCore';

interface MoldingEntity {
  autoFit: boolean;
  dirtyNeighborMoldingsByFacetype(): void;
}

export class ChangeMoldingAutofitRequest extends HSCore.Transaction.Common.StateRequest {
  private entity: MoldingEntity;

  constructor(entity: MoldingEntity) {
    super();
    this.entity = entity;
  }

  private changeAutoFit(autoFit: boolean): void {
    this.entity.autoFit = autoFit;
    this.entity.dirtyNeighborMoldingsByFacetype();
  }

  onReceive(eventType: string, data: boolean): boolean {
    if (eventType !== 'changeAutofit') {
      return super.onReceive(eventType, data);
    }
    this.changeAutoFit(data);
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
}