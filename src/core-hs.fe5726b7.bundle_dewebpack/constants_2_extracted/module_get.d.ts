/**
 * Module: module_get
 * Gets the Constants object from the application
 * @returns The Constants configuration object
 */
declare module 'module_get' {
  /**
   * Constants configuration interface
   * TODO: Define the actual structure of Constants based on your application
   */
  interface Constants {
    [key: string]: unknown;
  }

  /**
   * Retrieves the application's Constants object
   * @returns The Constants configuration
   */
  function get(): Constants;

  export default get;
  export { Constants };
}