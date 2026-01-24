/**
 * JavaScript expression parser and evaluator module.
 * Provides synchronous and asynchronous evaluation of JavaScript expressions with AST support.
 */

/**
 * AST Node type discriminator
 */
type ASTNodeType =
  | 'ArrayExpression'
  | 'BinaryExpression'
  | 'CallExpression'
  | 'ConditionalExpression'
  | 'Identifier'
  | 'Literal'
  | 'LogicalExpression'
  | 'MemberExpression'
  | 'ThisExpression'
  | 'UnaryExpression';

/**
 * Base AST Node interface
 */
interface BaseASTNode {
  type: ASTNodeType;
}

/**
 * Array expression node: [1, 2, 3]
 */
interface ArrayExpressionNode extends BaseASTNode {
  type: 'ArrayExpression';
  elements: ASTNode[];
}

/**
 * Binary operation node: a + b, x * y
 */
interface BinaryExpressionNode extends BaseASTNode {
  type: 'BinaryExpression';
  operator: BinaryOperator;
  left: ASTNode;
  right: ASTNode;
}

/**
 * Function call node: func(arg1, arg2)
 */
interface CallExpressionNode extends BaseASTNode {
  type: 'CallExpression';
  callee: ASTNode;
  arguments: ASTNode[];
}

/**
 * Ternary conditional node: condition ? consequent : alternate
 */
interface ConditionalExpressionNode extends BaseASTNode {
  type: 'ConditionalExpression';
  test: ASTNode;
  consequent: ASTNode;
  alternate: ASTNode;
}

/**
 * Identifier node: variable name
 */
interface IdentifierNode extends BaseASTNode {
  type: 'Identifier';
  name: string;
}

/**
 * Literal value node: 42, "string", true
 */
interface LiteralNode extends BaseASTNode {
  type: 'Literal';
  value: unknown;
}

/**
 * Logical operation node: a && b, x || y
 */
interface LogicalExpressionNode extends BaseASTNode {
  type: 'LogicalExpression';
  operator: LogicalOperator;
  left: ASTNode;
  right: ASTNode;
}

/**
 * Member access node: obj.prop, arr[index]
 */
interface MemberExpressionNode extends BaseASTNode {
  type: 'MemberExpression';
  object: ASTNode;
  property: ASTNode;
  computed: boolean;
}

/**
 * This keyword node
 */
interface ThisExpressionNode extends BaseASTNode {
  type: 'ThisExpression';
}

/**
 * Unary operation node: -x, !flag, ~bits
 */
interface UnaryExpressionNode extends BaseASTNode {
  type: 'UnaryExpression';
  operator: UnaryOperator;
  argument: ASTNode;
}

/**
 * Union type of all possible AST nodes
 */
type ASTNode =
  | ArrayExpressionNode
  | BinaryExpressionNode
  | CallExpressionNode
  | ConditionalExpressionNode
  | IdentifierNode
  | LiteralNode
  | LogicalExpressionNode
  | MemberExpressionNode
  | ThisExpressionNode
  | UnaryExpressionNode;

/**
 * Binary operators supported by the evaluator
 */
type BinaryOperator =
  | '||'
  | '&&'
  | '|'
  | '^'
  | '&'
  | '=='
  | '!='
  | '==='
  | '!=='
  | '<'
  | '>'
  | '<='
  | '>='
  | '<<'
  | '>>'
  | '>>>'
  | '+'
  | '-'
  | '*'
  | '/'
  | '%';

/**
 * Logical operators
 */
type LogicalOperator = '||' | '&&';

/**
 * Unary operators supported by the evaluator
 */
type UnaryOperator = '-' | '+' | '~' | '!';

/**
 * Evaluation context/scope containing variable bindings
 */
type EvaluationContext = Record<string, unknown>;

/**
 * Binary operator implementation function
 */
type BinaryOperatorFunction = (left: unknown, right: unknown) => unknown;

/**
 * Unary operator implementation function
 */
type UnaryOperatorFunction = (operand: unknown) => unknown;

/**
 * Compiled expression function (synchronous)
 */
type CompiledExpression = (context: EvaluationContext) => unknown;

/**
 * Compiled expression function (asynchronous)
 */
type CompiledExpressionAsync = (context: EvaluationContext) => Promise<unknown>;

/**
 * Parser interface from external module
 */
interface Parser {
  /**
   * Parse a JavaScript expression string into an AST
   */
  (expression: string): ASTNode;
  
  /**
   * Register a custom unary operator
   */
  addUnaryOp(operator: string): void;
  
  /**
   * Register a custom binary operator
   */
  addBinaryOp(operator: string): void;
}

/**
 * Parse a JavaScript expression string into an AST.
 * @param expression - The expression string to parse
 * @returns The parsed AST node
 */
export declare const parse: Parser;

/**
 * Synchronously evaluate an AST node with the given context.
 * @param node - The AST node to evaluate
 * @param context - Variable bindings for evaluation
 * @returns The evaluation result
 */
export declare function eval(node: ASTNode, context: EvaluationContext): unknown;

/**
 * Asynchronously evaluate an AST node with the given context.
 * Supports async operations and returns a Promise.
 * @param node - The AST node to evaluate
 * @param context - Variable bindings for evaluation
 * @returns Promise resolving to the evaluation result
 */
export declare function evalAsync(node: ASTNode, context: EvaluationContext): Promise<unknown>;

/**
 * Compile an expression string into a reusable synchronous evaluation function.
 * @param expression - The expression string to compile
 * @returns A function that evaluates the expression with a given context
 */
export declare function compile(expression: string): CompiledExpression;

/**
 * Compile an expression string into a reusable asynchronous evaluation function.
 * @param expression - The expression string to compile
 * @returns A function that evaluates the expression asynchronously with a given context
 */
export declare function compileAsync(expression: string): CompiledExpressionAsync;

/**
 * Register a custom unary operator with its implementation.
 * @param operator - The operator symbol (e.g., '!')
 * @param implementation - The function implementing the operator behavior
 */
export declare function addUnaryOp(operator: string, implementation: UnaryOperatorFunction): void;

/**
 * Register a custom binary operator with its implementation.
 * @param operator - The operator symbol (e.g., '+')
 * @param implementation - The function implementing the operator behavior
 */
export declare function addBinaryOp(operator: string, implementation: BinaryOperatorFunction): void;