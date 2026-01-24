/**
 * Esprima ECMAScript Parser - Type Definitions
 * @version 4.0.1
 */

declare module 'esprima' {
  /**
   * ECMAScript syntax node types
   */
  export namespace Syntax {
    const AssignmentExpression: 'AssignmentExpression';
    const AssignmentPattern: 'AssignmentPattern';
    const ArrayExpression: 'ArrayExpression';
    const ArrayPattern: 'ArrayPattern';
    const ArrowFunctionExpression: 'ArrowFunctionExpression';
    const AwaitExpression: 'AwaitExpression';
    const BlockStatement: 'BlockStatement';
    const BinaryExpression: 'BinaryExpression';
    const BreakStatement: 'BreakStatement';
    const CallExpression: 'CallExpression';
    const CatchClause: 'CatchClause';
    const ClassBody: 'ClassBody';
    const ClassDeclaration: 'ClassDeclaration';
    const ClassExpression: 'ClassExpression';
    const ConditionalExpression: 'ConditionalExpression';
    const ContinueStatement: 'ContinueStatement';
    const DoWhileStatement: 'DoWhileStatement';
    const DebuggerStatement: 'DebuggerStatement';
    const EmptyStatement: 'EmptyStatement';
    const ExportAllDeclaration: 'ExportAllDeclaration';
    const ExportDefaultDeclaration: 'ExportDefaultDeclaration';
    const ExportNamedDeclaration: 'ExportNamedDeclaration';
    const ExportSpecifier: 'ExportSpecifier';
    const ExpressionStatement: 'ExpressionStatement';
    const ForStatement: 'ForStatement';
    const ForOfStatement: 'ForOfStatement';
    const ForInStatement: 'ForInStatement';
    const FunctionDeclaration: 'FunctionDeclaration';
    const FunctionExpression: 'FunctionExpression';
    const Identifier: 'Identifier';
    const IfStatement: 'IfStatement';
    const ImportDeclaration: 'ImportDeclaration';
    const ImportDefaultSpecifier: 'ImportDefaultSpecifier';
    const ImportNamespaceSpecifier: 'ImportNamespaceSpecifier';
    const ImportSpecifier: 'ImportSpecifier';
    const Literal: 'Literal';
    const LabeledStatement: 'LabeledStatement';
    const LogicalExpression: 'LogicalExpression';
    const MemberExpression: 'MemberExpression';
    const MetaProperty: 'MetaProperty';
    const MethodDefinition: 'MethodDefinition';
    const NewExpression: 'NewExpression';
    const ObjectExpression: 'ObjectExpression';
    const ObjectPattern: 'ObjectPattern';
    const Program: 'Program';
    const Property: 'Property';
    const RestElement: 'RestElement';
    const ReturnStatement: 'ReturnStatement';
    const SequenceExpression: 'SequenceExpression';
    const SpreadElement: 'SpreadElement';
    const Super: 'Super';
    const SwitchCase: 'SwitchCase';
    const SwitchStatement: 'SwitchStatement';
    const TaggedTemplateExpression: 'TaggedTemplateExpression';
    const TemplateElement: 'TemplateElement';
    const TemplateLiteral: 'TemplateLiteral';
    const ThisExpression: 'ThisExpression';
    const ThrowStatement: 'ThrowStatement';
    const TryStatement: 'TryStatement';
    const UnaryExpression: 'UnaryExpression';
    const UpdateExpression: 'UpdateExpression';
    const VariableDeclaration: 'VariableDeclaration';
    const VariableDeclarator: 'VariableDeclarator';
    const WhileStatement: 'WhileStatement';
    const WithStatement: 'WithStatement';
    const YieldExpression: 'YieldExpression';
  }

  /**
   * Source location information
   */
  export interface Position {
    /** Line number (1-indexed) */
    line: number;
    /** Column number (0-indexed) */
    column: number;
  }

  export interface SourceLocation {
    start: Position;
    end: Position;
    source?: string | null;
  }

  /**
   * Base AST node interface
   */
  export interface Node {
    type: string;
    loc?: SourceLocation;
    range?: [number, number];
  }

  /**
   * Parser configuration options
   */
  export interface ParseOptions {
    /** Attach comment nodes to the AST */
    comment?: boolean;
    /** Attach raw source text to literal nodes */
    raw?: boolean;
    /** Include source location information */
    loc?: boolean;
    /** Include index-based range information */
    range?: boolean;
    /** Collect tokens during parsing */
    tokens?: boolean;
    /** Continue parsing after syntax errors */
    tolerant?: boolean;
    /** Source type: 'script' or 'module' */
    sourceType?: 'script' | 'module';
    /** Enable JSX parsing */
    jsx?: boolean;
    /** Source code origin for location info */
    source?: string;
  }

  /**
   * Parsed program result
   */
  export interface Program extends Node {
    type: 'Program';
    sourceType: 'script' | 'module';
    body: Array<Node>;
    comments?: Array<Comment>;
    tokens?: Array<Token>;
    errors?: Array<Error>;
  }

  /**
   * Comment node
   */
  export interface Comment {
    type: 'Line' | 'Block';
    value: string;
    range?: [number, number];
    loc?: SourceLocation;
  }

  /**
   * Token object
   */
  export interface Token {
    type: string;
    value: string;
    range?: [number, number];
    loc?: SourceLocation;
    regex?: {
      pattern: string;
      flags: string;
    };
  }

  /**
   * Parse JavaScript source code into an AST
   * @param code - Source code to parse
   * @param options - Parser configuration
   * @param delegate - Optional visitor callback for each node
   */
  export function parse(
    code: string,
    options?: ParseOptions,
    delegate?: (node: Node, meta: { start: Position; end: Position }) => void
  ): Program;

  /**
   * Parse JavaScript source as a module
   * @param code - Source code to parse
   * @param options - Parser configuration
   * @param delegate - Optional visitor callback
   */
  export function parseModule(
    code: string,
    options?: ParseOptions,
    delegate?: (node: Node, meta: { start: Position; end: Position }) => void
  ): Program;

  /**
   * Parse JavaScript source as a script
   * @param code - Source code to parse
   * @param options - Parser configuration
   * @param delegate - Optional visitor callback
   */
  export function parseScript(
    code: string,
    options?: ParseOptions,
    delegate?: (node: Node, meta: { start: Position; end: Position }) => void
  ): Program;

  /**
   * Tokenize JavaScript source code
   * @param code - Source code to tokenize
   * @param options - Tokenizer configuration
   * @param delegate - Optional token transformer
   */
  export function tokenize(
    code: string,
    options?: ParseOptions,
    delegate?: (token: Token) => Token
  ): Array<Token>;

  /** Library version string */
  export const version: string;
}