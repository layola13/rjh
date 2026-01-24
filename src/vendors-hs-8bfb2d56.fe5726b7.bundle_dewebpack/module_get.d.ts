/**
 * Identity module getter
 * Returns a cached read-only identity instance
 * 
 * @returns {Identity} The read-only identity instance
 * @remarks This method implements lazy initialization pattern for the identity object
 */
declare function getIdentity(): Identity;

/**
 * Represents an identity object
 * This interface should be extended based on the actual Identity implementation
 */
interface Identity {
  // Add specific identity properties and methods here
  // Example:
  // readonly id: string;
  // readonly name: string;
  // readonly isReadOnly: boolean;
}

/**
 * Context object that contains the identity getter method
 * This appears to be a method on a class or object with internal state
 */
interface IdentityContext {
  /**
   * Private cached identity instance
   * @internal
   */
  _identityReadOnly?: Identity;
  
  /**
   * Gets or creates a read-only identity instance
   * Uses lazy initialization to create the identity only when first accessed
   * 
   * @returns {Identity} The cached read-only identity instance
   */
  getIdentity(): Identity;
}

/**
 * Identity factory/constructor namespace
 */
declare namespace I {
  /**
   * Creates a new Identity instance
   * @returns {Identity} A new identity object
   */
  function Identity(): Identity;
}