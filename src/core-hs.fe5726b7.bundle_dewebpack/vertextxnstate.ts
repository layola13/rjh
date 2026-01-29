import { EntityTxnState } from './EntityTxnState';
import { EntityTransactionType } from './EntityTransactionType';

export class VertexTxnState extends EntityTxnState {
  constructor(
    entity: unknown,
    transactionType: EntityTransactionType = EntityTransactionType.Modification
  ) {
    super(entity, transactionType);
  }

  postRestore(context: unknown, data: unknown): void {
    super.postRestore(context, data);
    
    const entity = this._getEntityFromContext(context);
    
    if (entity?.parents) {
      Object.values(entity.parents).forEach((parent: any) => {
        parent.dirtyGeometry();
      });
    }
  }
}