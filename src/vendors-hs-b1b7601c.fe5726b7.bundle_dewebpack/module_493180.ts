interface ImageStore {
  [key: string]: unknown;
}

class ImageFileManager {
  private store: ImageStore = {};

  /**
   * Save image files to the store
   * @param key - The key to store the image file under
   * @param value - The image file data to store
   * @param forceOverwrite - Whether to overwrite existing entries (default: false)
   */
  saveImgFiles = (key: string, value: unknown, forceOverwrite: boolean = false): void => {
    if (!this.store[key] || forceOverwrite) {
      this.store[key] = value;
    }
  };

  /**
   * Get an image file from the store
   * @param key - The key of the image file to retrieve
   * @param defaultValue - The default value to return if key doesn't exist
   * @returns The stored image file or the default value
   */
  getImgFile = (key: string, defaultValue: unknown): unknown => {
    return this.store[key] ?? defaultValue;
  };

  /**
   * Get all image files from the store
   * @returns All stored image files
   */
  getAllImgFiles = (): ImageStore => {
    return this.store;
  };

  /**
   * Reset the image file store to empty
   * @returns Empty store object
   */
  resetImgFiles = (): ImageStore => {
    this.store = {};
    return this.store;
  };
}

export default ImageFileManager;