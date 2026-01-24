/**
 * FileSaver.js type definitions
 * @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js
 */

/**
 * Blob save options
 */
export interface SaveAsOptions {
  /** Automatically prepend BOM for UTF-8 text */
  autoBom?: boolean;
}

/**
 * FileSaver instance representing an ongoing save operation
 */
export interface FileSaver {
  /** Current state of the save operation */
  readyState: number;
  
  /** Initial state constant */
  readonly INIT: 0;
  
  /** Writing state constant */
  readonly WRITING: 1;
  
  /** Done state constant */
  readonly DONE: 2;
  
  /** Error that occurred during save, if any */
  error: Error | null;
  
  /** Callback fired when write starts */
  onwritestart: ((this: FileSaver, event: ProgressEvent) => void) | null;
  
  /** Callback fired during write progress */
  onprogress: ((this: FileSaver, event: ProgressEvent) => void) | null;
  
  /** Callback fired when write completes successfully */
  onwrite: ((this: FileSaver, event: ProgressEvent) => void) | null;
  
  /** Callback fired when operation is aborted */
  onabort: ((this: FileSaver, event: ProgressEvent) => void) | null;
  
  /** Callback fired on error */
  onerror: ((this: FileSaver, event: ProgressEvent) => void) | null;
  
  /** Callback fired when write ends (success or failure) */
  onwriteend: ((this: FileSaver, event: ProgressEvent) => void) | null;
  
  /**
   * Abort the ongoing save operation
   */
  abort(): void;
}

/**
 * Save a Blob/File to disk with the specified filename
 * 
 * @param blob - The Blob or File object to save
 * @param filename - The desired filename (optional, defaults to "download")
 * @returns FileSaver instance for tracking the operation
 * 
 * @example
 *