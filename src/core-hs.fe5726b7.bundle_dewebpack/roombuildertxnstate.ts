import { EntityTxnState } from './EntityTxnState';

export class RoomBuilderTxnState extends EntityTxnState {
  constructor(entity: unknown, transaction: unknown) {
    super(entity, transaction);
  }

  postRestore(context: unknown, transaction: unknown): void {
    super.postRestore(context, transaction);
    
    const entity = this._getEntityFromContext(context);
    
    if (entity && typeof entity.dirty === 'function') {
      entity.dirty();
    }
  }
}