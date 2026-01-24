/**
 * Content transaction state management
 * Handles transactional operations for content entities with metadata tracking
 */

import { EntityTxnState } from './EntityTxnState';
import { EntityTransactionType } from './EntityTransactionType';
import { FieldValueWrapper } from './FieldValueWrapper';
import { Logger } from './Logger';

/**
 * Transaction context containing entity mappings and product metadata
 */
interface TransactionContext {
  /**
   * Map of product IDs to their metadata
   */
  productsMap: Map<string, ProductMetadata>;
}

/**
 * Product metadata information
 */
interface ProductMetadata {
  /**
   * Unique identifier for the product
   */
  id: string;
  [key: string]: unknown;
}

/**
 * Content entity with seekId and metadata
 */
interface ContentEntity {
  /**
   * Seek identifier for the content
   */
  seekId?: string;
  
  /**
   * Metadata associated with the content
   */
  metadata?: ProductMetadata;
  
  /**
   * Get the host entity that contains this content
   */
  getHost(): ContentEntity | null;
  
  /**
   * Assign this content to a new host entity
   * @param host - The new host entity or null to unassign
   */
  assignTo(host: ContentEntity | null): void;
}

/**
 * Transaction state manager for content entities
 * Extends base entity transaction state with content-specific metadata handling
 */
export class ContentTxnState extends EntityTxnState {
  /**
   * The content entity being tracked
   */
  protected entity?: ContentEntity;
  
  /**
   * Data snapshot before transaction
   */
  protected dataBefore?: unknown;
  
  /**
   * Data snapshot after transaction
   */
  protected dataAfter?: unknown;

  /**
   * Create a new content transaction state
   * @param entity - The content entity to track
   * @param transactionType - Type of transaction (defaults to Modification)
   */
  constructor(
    entity: ContentEntity,
    transactionType: EntityTransactionType = EntityTransactionType.Modification
  ) {
    super(entity, transactionType);
  }

  /**
   * Execute a transaction on the content entity
   * @param description - Description of the transaction
   * @param data - Transaction data
   * @param options - Transaction options
   * @param context - Transaction context containing product mappings
   */
  transact(
    description: string = '',
    data?: unknown,
    options?: unknown,
    context?: TransactionContext
  ): void {
    const entity = this.entity;
    
    if (!entity || !context) {
      return;
    }
    
    super.transact(description, data, options, context);
    
    // Update products map with entity metadata before transaction
    if (this.dataBefore && entity.seekId && entity.metadata) {
      Logger.console.assert(
        entity.seekId === entity.metadata.id,
        'inconsistent seekId!'
      );
      context.productsMap.set(entity.metadata.id, entity.metadata);
    }
  }

  /**
   * Commit the transaction and update product metadata
   * @param context - Transaction context containing product mappings
   */
  commit(context?: TransactionContext): void {
    const entity = this.entity;
    
    if (!entity || !context) {
      return;
    }
    
    super.commit(context);
    
    // Update products map with entity metadata after commit
    if (this.dataAfter && entity.seekId && entity.metadata) {
      Logger.console.assert(
        entity.seekId === entity.metadata.id,
        'inconsistent seekId!'
      );
      context.productsMap.set(entity.metadata.id, entity.metadata);
    }
  }

  /**
   * Restore content entity state after transaction rollback
   * Handles reassignment of content to correct host entity
   * @param context - Transaction context
   * @param data - Restoration data containing field values
   */
  postRestore(context: unknown, data: Record<string, unknown>): void {
    super.postRestore(context, data);
    
    const entity = this._getEntityFromContext(context);
    if (!entity) {
      return;
    }
    
    const hostField = EntityTxnState.getFieldValue(data, 'host');
    if (!hostField) {
      return;
    }
    
    // Unwrap field value if needed
    const hostValue = hostField instanceof FieldValueWrapper 
      ? hostField.value 
      : hostField;
    
    // Get host entity from context or set to null
    const hostEntity = (hostValue && this._getEntityFromContext(context, hostValue)) || null;
    
    // Reassign entity to correct host if changed
    if (entity.getHost() !== hostEntity) {
      entity.assignTo(hostEntity);
    }
  }

  /**
   * Retrieve entity from transaction context
   * @param context - Transaction context
   * @param key - Optional key to lookup specific entity
   * @returns The content entity or undefined
   */
  protected _getEntityFromContext(context: unknown, key?: unknown): ContentEntity | undefined {
    // Implementation inherited from parent class
    return super._getEntityFromContext(context, key) as ContentEntity | undefined;
  }
}