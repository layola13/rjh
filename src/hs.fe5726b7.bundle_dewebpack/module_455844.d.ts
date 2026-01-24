/**
 * Cross-document messaging utility for secure communication between windows.
 * Supports both modern postMessage API and legacy hash-based messaging fallback.
 * 
 * @module CrossDocumentMessaging
 */

/**
 * Message event data structure for legacy hash-based messaging
 */
interface LegacyMessageEvent {
  /** The message data extracted from URL hash */
  data: string;
}

/**
 * Callback function type for receiving messages
 */
type MessageCallback = (event: MessageEvent | LegacyMessageEvent) => void;

/**
 * Origin validator function type
 * @param origin - The origin of the message sender
 * @returns true if the origin is allowed, false otherwise
 */
type OriginValidator = (origin: string) => boolean;

/**
 * Cross-document messaging module interface
 */
interface CrossDocumentMessenger {
  /**
   * Sends a message to a target window
   * 
   * @param message - The message data to send
   * @param targetOrigin - The target origin URL (e.g., "https://example.com")
   * @param targetWindow - The target window object (defaults to parent window)
   */
  postMessage(message: string, targetOrigin: string, targetWindow?: Window): void;

  /**
   * Registers or unregisters a message event listener
   * 
   * @param callback - The callback function to handle received messages (null to unregister)
   * @param originFilter - Origin validation (string for exact match, function for custom validation)
   */
  receiveMessage(callback: MessageCallback | null, originFilter?: string | OriginValidator): void;
}

/**
 * Implements cross-document messaging with postMessage API and hash-based fallback
 */
declare const crossDocumentMessenger: CrossDocumentMessenger;

export = crossDocumentMessenger;