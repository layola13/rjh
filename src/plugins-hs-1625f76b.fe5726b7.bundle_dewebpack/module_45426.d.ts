/**
 * Question type constants
 * Defines the available question types in the system
 */

/**
 * Enum-like object containing all supported question types
 */
export declare const QuestionTypes: {
  /**
   * Single choice question type
   * Allows user to select only one option from multiple choices
   */
  readonly Single: "SingleChoice";
  
  /**
   * Multiple choice question type
   * Allows user to select multiple options from available choices
   */
  readonly Multi: "MultiChoice";
  
  /**
   * Input question type
   * Allows user to provide free-form text input
   */
  readonly Input: "Input";
};

/**
 * Union type of all possible question type values
 */
export type QuestionType = typeof QuestionTypes[keyof typeof QuestionTypes];

/**
 * Type alias for single choice question type
 */
export type SingleChoiceType = "SingleChoice";

/**
 * Type alias for multiple choice question type
 */
export type MultiChoiceType = "MultiChoice";

/**
 * Type alias for input question type
 */
export type InputType = "Input";