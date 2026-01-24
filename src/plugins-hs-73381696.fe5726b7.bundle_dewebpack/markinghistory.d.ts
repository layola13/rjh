/**
 * Marking history management system for HSApp
 * Manages marking records with persistent storage support
 */

/**
 * Represents a marking record in the history
 */
export type MarkingRecord = string;

/**
 * Storage interface for HSApp utilities
 */
interface IStorage {
  // Add storage methods as needed based on HSApp.Util.Storage implementation
}

/**
 * HSApp global namespace
 */
declare global {
  namespace HSApp {
    namespace Util {
      class Storage {
        constructor(pluginType: string);
      }
    }
  }
  
  namespace HSFPConstants {
    enum PluginType {
      MarkingSystem = 'MarkingSystem'
    }
  }
}

/**
 * Manages the history of marking records with storage persistence
 * Maintains a limited history (last 8 records) with add, delete, and query operations
 */
export class MarkingHistory {
  /**
   * Storage instance for persisting marking records
   */
  private storage: IStorage | null;
  
  /**
   * Array of marking records
   */
  private markingRecords: MarkingRecord[];

  /**
   * Creates a new MarkingHistory instance
   * Initializes storage with MarkingSystem plugin type
   */
  constructor();

  /**
   * Adds a record to the marking history
   * If the record already exists, it is moved to the end
   * Maintains only the last 8 records
   * 
   * @param record - The marking record to add
   */
  addRecord(record: MarkingRecord): void;

  /**
   * Deletes a specific record from the marking history
   * 
   * @param record - The marking record to delete
   */
  deleteRecord(record: MarkingRecord): void;

  /**
   * Retrieves records from the marking history with optional filtering and limiting
   * 
   * @param prefix - Optional prefix to filter records (returns records that start with this prefix, excluding exact match)
   * @param limit - Optional maximum number of most recent records to return
   * @returns Array of matching marking records
   */
  getRecord(prefix?: string, limit?: number): MarkingRecord[];

  /**
   * Clears all marking records from the history
   */
  clear(): void;
}