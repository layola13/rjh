/**
 * Image file cache manager
 * Provides methods to store, retrieve, and manage image files in memory
 */
export default class ImageFileStore {
  /**
   * Internal storage for image files
   * @private
   */
  private store: Record<string, unknown>;

  constructor() {
    this.store = {};
  }

  /**
   * Save image files to the store
   * @param key - The unique identifier for the image file
   * @param value - The image file data to store
   * @param forceOverwrite - Whether to overwrite existing entry (default: false)
   */
  saveImgFiles(key: string, value: unknown, forceOverwrite: boolean = false): void {
    if (!this.store[key] || forceOverwrite) {
      this.store[key] = value;
    }
  }

  /**
   * Retrieve an image file from the store
   * @param key - The unique identifier for the image file
   * @param fallback - The fallback value to return if key doesn't exist
   * @returns The stored image file or the fallback value
   */
  getImgFile<T = unknown>(key: string, fallback: T): T {
    return (this.store[key] as T) || fallback;
  }

  /**
   * Get all stored image files
   * @returns A record of all stored image files
   */
  getAllImgFiles(): Record<string, unknown> {
    return this.store;
  }

  /**
   * Reset the store by clearing all image files
   * @returns An empty store object
   */
  resetImgFiles(): Record<string, unknown> {
    this.store = {};
    return this.store;
  }
}