import { EntityTxnState } from './EntityTxnState';
import { EntityTransactionType } from './EntityTransactionType';
import { FieldValueWrapper } from './FieldValueWrapper';
import { Logger } from './Logger';

interface TransactionContext {
  productsMap: Map<string, unknown>;
}

interface ContentEntity {
  seekId?: string;
  metadata?: {
    id: string;
  };
  getHost(): ContentEntity | null;
  assignTo(host: ContentEntity | null): void;
}

export class ContentTxnState extends EntityTxnState {
  protected entity?: ContentEntity;
  protected dataBefore?: unknown;
  protected dataAfter?: unknown;

  constructor(
    entity: ContentEntity,
    transactionType: EntityTransactionType = EntityTransactionType.Modification
  ) {
    super(entity, transactionType);
  }

  transact(
    description: string = '',
    timestamp?: number,
    data?: unknown,
    context?: TransactionContext
  ): void {
    const entity = this.entity;
    
    if (!entity || !context) {
      return;
    }

    super.transact(description, timestamp, data, context);

    if (this.dataBefore && entity.seekId && entity.metadata) {
      Logger.console.assert(
        entity.seekId === entity.metadata.id,
        'inconsistent seekId!'
      );
      context.productsMap.set(entity.metadata.id, entity.metadata);
    }
  }

  commit(context?: TransactionContext): void {
    const entity = this.entity;

    if (!entity || !context) {
      return;
    }

    super.commit(context);

    if (this.dataAfter && entity.seekId && entity.metadata) {
      Logger.console.assert(
        entity.seekId === entity.metadata.id,
        'inconsistent seekId!'
      );
      context.productsMap.set(entity.metadata.id, entity.metadata);
    }
  }

  postRestore(context: unknown, data: Record<string, unknown>): void {
    super.postRestore(context, data);

    const entity = this._getEntityFromContext(context);
    if (!entity) {
      return;
    }

    const hostFieldValue = EntityTxnState.getFieldValue(data, 'host');
    if (!hostFieldValue) {
      return;
    }

    const hostValue = hostFieldValue instanceof FieldValueWrapper
      ? hostFieldValue.value
      : hostFieldValue;

    const hostEntity = (hostValue && this._getEntityFromContext(context, hostValue)) || null;

    if (entity.getHost() !== hostEntity) {
      entity.assignTo(hostEntity);
    }
  }

  protected _getEntityFromContext(context: unknown, id?: string): ContentEntity | null {
    // Implementation to be provided by base class or overridden
    return null;
  }
}