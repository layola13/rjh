/**
 * Content key constant used for accessing content objects
 */
export const CONTENT_KEY = "contentObj";

/**
 * Enum representing the result status of an operation
 */
export enum EN_RESULT {
  /**
   * Operation completed successfully
   */
  Sucess = "succeed",
  
  /**
   * Operation failed
   */
  Fail = "failed"
}

/**
 * Type definition for EN_RESULT enum values
 */
export type EnResultType = EN_RESULT.Sucess | EN_RESULT.Fail;