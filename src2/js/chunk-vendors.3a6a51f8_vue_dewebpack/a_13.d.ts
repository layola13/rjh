/**
 * GraphQL location and token type definitions
 * Represents source location information and token structures used in GraphQL parsing
 */

/**
 * Represents a location in the source GraphQL document
 * Contains start/end positions and references to the corresponding tokens
 */
export interface Location {
  /** The character offset at which this location starts */
  readonly start: number;
  
  /** The character offset at which this location ends */
  readonly end: number;
  
  /** The Token at which this location starts */
  readonly startToken: Token;
  
  /** The Token at which this location ends */
  readonly endToken: Token;
  
  /** The Source document the AST represents */
  readonly source: Source;
  
  /**
   * Serializes the location to a JSON object
   * @returns A plain object with start and end positions
   */
  toJSON(): { start: number; end: number };
  
  /**
   * Custom inspect method for debugging
   * @returns Serialized representation of the location
   */
  inspect(): { start: number; end: number };
  
  /**
   * Symbol.toStringTag for custom string representation
   */
  readonly [Symbol.toStringTag]?: () => { start: number; end: number };
}

/**
 * Represents a single token in the GraphQL source
 * Tokens form a doubly-linked list for efficient traversal
 */
export interface Token {
  /** The kind/type of token (e.g., 'Name', 'Punctuation', etc.) */
  readonly kind: string;
  
  /** The character offset at which this token starts */
  readonly start: number;
  
  /** The character offset at which this token ends */
  readonly end: number;
  
  /** The line number on which this token appears (1-indexed) */
  readonly line: number;
  
  /** The column number at which this token starts (1-indexed) */
  readonly column: number;
  
  /** The string value of the token */
  readonly value: string | undefined;
  
  /** The previous token in the linked list */
  readonly prev: Token | null;
  
  /** The next token in the linked list */
  readonly next: Token | null;
  
  /**
   * Serializes the token to a JSON object
   * @returns A plain object with token metadata
   */
  toJSON(): {
    kind: string;
    value: string | undefined;
    line: number;
    column: number;
  };
  
  /**
   * Custom inspect method for debugging
   * @returns Serialized representation of the token
   */
  inspect(): {
    kind: string;
    value: string | undefined;
    line: number;
    column: number;
  };
  
  /**
   * Symbol.toStringTag for custom string representation
   */
  readonly [Symbol.toStringTag]?: () => {
    kind: string;
    value: string | undefined;
    line: number;
    column: number;
  };
}

/**
 * Represents the source GraphQL document
 * (Type definition inferred from usage)
 */
export interface Source {
  readonly body: string;
  readonly name: string;
  readonly locationOffset: { line: number; column: number };
}

/**
 * Type guard to check if a value is a Token
 * @param value - The value to check
 * @returns True if the value is a valid Token object
 */
export function isToken(value: unknown): value is Token;