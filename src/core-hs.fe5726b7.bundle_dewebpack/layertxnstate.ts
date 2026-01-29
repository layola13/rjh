import { EntityTxnState } from './EntityTxnState';

export class LayerTxnState extends EntityTxnState {
  constructor(entity: unknown, transaction: unknown) {
    super(entity, transaction);
  }

  postRestore(context: unknown, data: unknown): void {
    super.postRestore(context, data);
    
    const entity = this._getEntityFromContext(context);
    
    if (entity) {
      HSCore.Util.Layer.dirtyLayerInfo(entity);
    }
  }
}