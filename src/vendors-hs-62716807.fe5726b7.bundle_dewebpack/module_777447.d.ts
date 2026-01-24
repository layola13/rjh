/**
 * Copy text to clipboard module
 * Provides cross-browser clipboard functionality with fallback support
 */

/**
 * Options for clipboard copy operation
 */
interface CopyToClipboardOptions {
  /**
   * Enable debug logging to console
   * @default false
   */
  debug?: boolean;

  /**
   * MIME type format for clipboard data
   * @example 'text/plain', 'text/html'
   */
  format?: string;

  /**
   * Custom message template for fallback prompt
   * Use #{key} placeholder for keyboard shortcut
   * @example 'Copy to clipboard: #{key}, Enter'
   */
  message?: string;

  /**
   * Callback invoked after successful copy operation
   * @param clipboardData - The ClipboardEvent's clipboardData object or IE's window.clipboardData
   */
  onCopy?: (clipboardData: DataTransfer | undefined) => void;
}

/**
 * Map of MIME types to IE-specific clipboard format names
 */
declare const CLIPBOARD_FORMAT_MAP: {
  readonly 'text/plain': 'Text';
  readonly 'text/html': 'Url';
  readonly default: 'Text';
};

/**
 * Copy text to the system clipboard with cross-browser support
 * 
 * Uses modern Clipboard API with fallbacks to:
 * 1. document.execCommand('copy')
 * 2. window.clipboardData (IE)
 * 3. window.prompt (last resort)
 * 
 * @param text - The text content to copy to clipboard
 * @param options - Configuration options for the copy operation
 * @returns True if copy was successful, false otherwise
 * 
 * @example
 *