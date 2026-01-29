/**
 * Entity transaction type enumeration
 * Defines the types of transactions that can be performed on entities
 * @module EntityTransactionType
 * @originalId 55173
 */

/**
 * Enum representing different types of entity transactions
 * @enum {number}
 */
export enum EntityTransactionType {
  /**
   * Entity creation transaction
   * Indicates a new entity is being created
   */
  Creation = 1,

  /**
   * Entity deletion transaction
   * Indicates an entity is being permanently deleted
   */
  Deletion = 2,

  /**
   * Entity modification transaction
   * Indicates an existing entity is being updated or modified
   */
  Modification = 3,

  /**
   * Entity recycling transaction
   * Indicates an entity is being moved to recycle bin or soft-deleted
   */
  Recycling = 4
}