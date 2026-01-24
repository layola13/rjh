/**
 * GraphQL AST Visitor Module
 * Provides utilities for traversing and transforming GraphQL Abstract Syntax Trees
 */

/**
 * Defines the visitor key configuration for each GraphQL AST node type.
 * Each key maps to an array of child property names that should be visited.
 */
interface VisitorKeys {
  Name: string[];
  Document: string[];
  OperationDefinition: string[];
  VariableDefinition: string[];
  Variable: string[];
  SelectionSet: string[];
  Field: string[];
  Argument: string[];
  FragmentSpread: string[];
  InlineFragment: string[];
  FragmentDefinition: string[];
  IntValue: string[];
  FloatValue: string[];
  StringValue: string[];
  BooleanValue: string[];
  NullValue: string[];
  EnumValue: string[];
  ListValue: string[];
  ObjectValue: string[];
  ObjectField: string[];
  Directive: string[];
  NamedType: string[];
  ListType: string[];
  NonNullType: string[];
  SchemaDefinition: string[];
  OperationTypeDefinition: string[];
  ScalarTypeDefinition: string[];
  ObjectTypeDefinition: string[];
  FieldDefinition: string[];
  InputValueDefinition: string[];
  InterfaceTypeDefinition: string[];
  UnionTypeDefinition: string[];
  EnumTypeDefinition: string[];
  EnumValueDefinition: string[];
  InputObjectTypeDefinition: string[];
  DirectiveDefinition: string[];
  SchemaExtension: string[];
  ScalarTypeExtension: string[];
  ObjectTypeExtension: string[];
  InterfaceTypeExtension: string[];
  UnionTypeExtension: string[];
  EnumTypeExtension: string[];
  InputObjectTypeExtension: string[];
  [key: string]: string[];
}

/**
 * Base interface for GraphQL AST nodes
 */
interface ASTNode {
  kind: string;
  [key: string]: unknown;
}

/**
 * Visitor function that can be called on enter or leave of a node
 */
type VisitorFn<T extends ASTNode = ASTNode> = (
  node: T,
  key: string | number | undefined,
  parent: ASTNode | ReadonlyArray<ASTNode> | undefined,
  path: ReadonlyArray<string | number>,
  ancestors: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>>
) => ASTNode | undefined | null | false | typeof BREAK;

/**
 * Visitor object with enter and/or leave hooks
 */
interface VisitorHooks<T extends ASTNode = ASTNode> {
  enter?: VisitorFn<T>;
  leave?: VisitorFn<T>;
}

/**
 * Visitor configuration object mapping node kinds to visitor functions or hooks
 */
type Visitor = {
  [K in string]?: VisitorFn | VisitorHooks;
} & {
  enter?: VisitorFn;
  leave?: VisitorFn;
};

/**
 * Sentinel value to break out of traversal
 */
export const BREAK: unique symbol;

/**
 * Traverses a GraphQL AST and applies visitor functions to each node.
 * 
 * @param root - The root AST node to begin traversal
 * @param visitor - Visitor configuration with enter/leave hooks for different node types
 * @param visitorKeys - Optional custom visitor keys configuration (defaults to GraphQL schema)
 * @returns The potentially modified AST after traversal
 * 
 * @example
 *