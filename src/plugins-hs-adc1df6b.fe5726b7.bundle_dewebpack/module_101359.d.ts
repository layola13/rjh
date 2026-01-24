/**
 * Storage operation type constants
 * Defines the available storage operation types for the application
 */
export enum StorageOperationType {
  /** Save operation - persists data to storage */
  SAVE = "save",
  
  /** Load operation - retrieves data from storage */
  LOAD = "load",
  
  /** Save furnish operation - persists furnish-specific data to storage */
  SAVEFURNISH = "saveFurnish"
}

/**
 * Readonly object containing storage operation type constants
 * @deprecated Use StorageOperationType enum instead
 */
export interface StorageOperationTypes {
  readonly SAVE: "save";
  readonly LOAD: "load";
  readonly SAVEFURNISH: "saveFurnish";
}

/**
 * Default export - frozen object containing storage operation type constants
 */
declare const storageOperations: Readonly<StorageOperationTypes>;

export default storageOperations;