/**
 * GraphQL Tag - A TypeScript library for parsing GraphQL query strings into AST.
 * Based on graphql-tag library.
 */

import type { DocumentNode, FragmentDefinitionNode, DefinitionNode, Source, Location } from 'graphql';

/**
 * Location information for AST nodes
 */
export interface ASTLocation {
  start: number;
  end: number;
  source?: Source;
  startToken?: Token;
  endToken?: Token;
}

/**
 * Token kinds used in GraphQL lexer
 */
export enum TokenKind {
  SOF = '<SOF>',
  EOF = '<EOF>',
  BANG = '!',
  DOLLAR = '$',
  AMP = '&',
  PAREN_L = '(',
  PAREN_R = ')',
  SPREAD = '...',
  COLON = ':',
  EQUALS = '=',
  AT = '@',
  BRACKET_L = '[',
  BRACKET_R = ']',
  BRACE_L = '{',
  PIPE = '|',
  BRACE_R = '}',
  NAME = 'Name',
  INT = 'Int',
  FLOAT = 'Float',
  STRING = 'String',
  BLOCK_STRING = 'BlockString',
  COMMENT = 'Comment',
}

/**
 * Token representation in the lexer
 */
export interface Token {
  kind: TokenKind;
  start: number;
  end: number;
  line: number;
  column: number;
  value?: string;
  prev?: Token | null;
  next?: Token | null;
}

/**
 * Parser options for GraphQL documents
 */
export interface ParserOptions {
  /** Disable location information in the AST */
  noLocation?: boolean;
  /** Enable experimental fragment variables support */
  experimentalFragmentVariables?: boolean;
  /** Allow legacy SDL implements interfaces syntax */
  allowLegacySDLImplementsInterfaces?: boolean;
  /** Allow legacy SDL empty fields syntax */
  allowLegacySDLEmptyFields?: boolean;
}

/**
 * Cache for parsed GraphQL documents
 * Key: normalized query string, Value: parsed DocumentNode
 */
declare const documentCache: Map<string, DocumentNode>;

/**
 * Cache for fragment definitions
 * Key: fragment name, Value: Set of normalized fragment bodies
 */
declare const fragmentCache: Map<string, Set<string>>;

/**
 * Configuration flags
 */
declare let showFragmentWarnings: boolean;
declare let useExperimentalFragmentVariables: boolean;

/**
 * Main template tag function for parsing GraphQL queries
 * 
 * @example
 *