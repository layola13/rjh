/**
 * JavaScript Expression Parser (JSEP) - Type Definitions
 * A lightweight JavaScript expression parser that converts expression strings into AST nodes.
 * @version 0.3.4
 */

/**
 * Base interface for all AST node types
 */
interface BaseNode {
  type: string;
}

/**
 * Literal value node (numbers, strings, booleans, null)
 */
interface LiteralNode extends BaseNode {
  type: 'Literal';
  value: string | number | boolean | null;
  raw: string;
}

/**
 * Identifier node (variable names)
 */
interface IdentifierNode extends BaseNode {
  type: 'Identifier';
  name: string;
}

/**
 * This expression node
 */
interface ThisExpressionNode extends BaseNode {
  type: 'ThisExpression';
}

/**
 * Binary operation node (+, -, *, /, %, etc.)
 */
interface BinaryExpressionNode extends BaseNode {
  type: 'BinaryExpression';
  operator: string;
  left: ExpressionNode;
  right: ExpressionNode;
}

/**
 * Logical operation node (&&, ||)
 */
interface LogicalExpressionNode extends BaseNode {
  type: 'LogicalExpression';
  operator: '&&' | '||';
  left: ExpressionNode;
  right: ExpressionNode;
}

/**
 * Unary operation node (!, -, ~, +)
 */
interface UnaryExpressionNode extends BaseNode {
  type: 'UnaryExpression';
  operator: string;
  argument: ExpressionNode;
  prefix: boolean;
}

/**
 * Conditional/ternary expression node (condition ? consequent : alternate)
 */
interface ConditionalExpressionNode extends BaseNode {
  type: 'ConditionalExpression';
  test: ExpressionNode;
  consequent: ExpressionNode;
  alternate: ExpressionNode;
}

/**
 * Member access expression node (object.property or object[property])
 */
interface MemberExpressionNode extends BaseNode {
  type: 'MemberExpression';
  computed: boolean;
  object: ExpressionNode;
  property: ExpressionNode;
}

/**
 * Function call expression node
 */
interface CallExpressionNode extends BaseNode {
  type: 'CallExpression';
  callee: ExpressionNode;
  arguments: ExpressionNode[];
}

/**
 * Array expression node
 */
interface ArrayExpressionNode extends BaseNode {
  type: 'ArrayExpression';
  elements: ExpressionNode[];
}

/**
 * Compound expression node (multiple expressions separated by comma or semicolon)
 */
interface CompoundExpressionNode extends BaseNode {
  type: 'Compound';
  body: ExpressionNode[];
}

/**
 * Union type of all possible expression nodes
 */
type ExpressionNode =
  | LiteralNode
  | IdentifierNode
  | ThisExpressionNode
  | BinaryExpressionNode
  | LogicalExpressionNode
  | UnaryExpressionNode
  | ConditionalExpressionNode
  | MemberExpressionNode
  | CallExpressionNode
  | ArrayExpressionNode
  | CompoundExpressionNode;

/**
 * Unary operators configuration
 */
interface UnaryOperators {
  [operator: string]: boolean;
}

/**
 * Binary operators configuration with precedence levels
 */
interface BinaryOperators {
  [operator: string]: number;
}

/**
 * Literal values configuration
 */
interface LiteralValues {
  [key: string]: boolean | null;
}

/**
 * Main JSEP parser interface
 */
interface JSEPParser {
  /**
   * Library version
   */
  version: string;

  /**
   * Parse an expression string into an AST
   * @param expression - The expression string to parse
   * @returns The parsed AST node
   * @throws Error if parsing fails
   */
  (expression: string): ExpressionNode;

  /**
   * Get string representation of the parser
   * @returns Version string
   */
  toString(): string;

  /**
   * Add a custom unary operator
   * @param operator - The unary operator to add
   * @returns The parser instance for chaining
   */
  addUnaryOp(operator: string): this;

  /**
   * Add a custom binary operator with precedence
   * @param operator - The binary operator to add
   * @param precedence - The precedence level (higher = evaluated first)
   * @returns The parser instance for chaining
   */
  addBinaryOp(operator: string, precedence: number): this;

  /**
   * Add a custom literal value
   * @param name - The literal name
   * @param value - The literal value
   * @returns The parser instance for chaining
   */
  addLiteral(name: string, value: boolean | null | number | string): this;

  /**
   * Remove a unary operator
   * @param operator - The unary operator to remove
   * @returns The parser instance for chaining
   */
  removeUnaryOp(operator: string): this;

  /**
   * Remove all unary operators
   * @returns The parser instance for chaining
   */
  removeAllUnaryOps(): this;

  /**
   * Remove a binary operator
   * @param operator - The binary operator to remove
   * @returns The parser instance for chaining
   */
  removeBinaryOp(operator: string): this;

  /**
   * Remove all binary operators
   * @returns The parser instance for chaining
   */
  removeAllBinaryOps(): this;

  /**
   * Remove a literal value
   * @param name - The literal name to remove
   * @returns The parser instance for chaining
   */
  removeLiteral(name: string): this;

  /**
   * Remove all literal values
   * @returns The parser instance for chaining
   */
  removeAllLiterals(): this;
}

/**
 * JSEP Parser - Parses JavaScript expressions into Abstract Syntax Trees
 */
declare const jsep: JSEPParser;

export = jsep;
export as namespace jsep;

export {
  ExpressionNode,
  LiteralNode,
  IdentifierNode,
  ThisExpressionNode,
  BinaryExpressionNode,
  LogicalExpressionNode,
  UnaryExpressionNode,
  ConditionalExpressionNode,
  MemberExpressionNode,
  CallExpressionNode,
  ArrayExpressionNode,
  CompoundExpressionNode,
  UnaryOperators,
  BinaryOperators,
  LiteralValues,
  JSEPParser,
};