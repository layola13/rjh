/**
 * GraphQL printer and HTTP link type definitions
 * Provides types for printing GraphQL AST nodes and creating HTTP transport links
 */

/**
 * GraphQL AST node visitor that converts nodes to their string representation
 */
export interface PrintVisitor {
  /** Print a Name node */
  Name(node: NameNode): string;
  
  /** Print a Variable node */
  Variable(node: VariableNode): string;
  
  /** Print a Document node */
  Document(node: DocumentNode): string;
  
  /** Print an OperationDefinition node */
  OperationDefinition(node: OperationDefinitionNode): string;
  
  /** Print a VariableDefinition node */
  VariableDefinition(node: VariableDefinitionNode): string;
  
  /** Print a SelectionSet node */
  SelectionSet(node: SelectionSetNode): string;
  
  /** Print a Field node */
  Field(node: FieldNode): string;
  
  /** Print an Argument node */
  Argument(node: ArgumentNode): string;
  
  /** Print a FragmentSpread node */
  FragmentSpread(node: FragmentSpreadNode): string;
  
  /** Print an InlineFragment node */
  InlineFragment(node: InlineFragmentNode): string;
  
  /** Print a FragmentDefinition node */
  FragmentDefinition(node: FragmentDefinitionNode): string;
  
  /** Print an IntValue node */
  IntValue(node: IntValueNode): string;
  
  /** Print a FloatValue node */
  FloatValue(node: FloatValueNode): string;
  
  /** Print a StringValue node */
  StringValue(node: StringValueNode, key?: string): string;
  
  /** Print a BooleanValue node */
  BooleanValue(node: BooleanValueNode): string;
  
  /** Print a NullValue node */
  NullValue(node: NullValueNode): string;
  
  /** Print an EnumValue node */
  EnumValue(node: EnumValueNode): string;
  
  /** Print a ListValue node */
  ListValue(node: ListValueNode): string;
  
  /** Print an ObjectValue node */
  ObjectValue(node: ObjectValueNode): string;
  
  /** Print an ObjectField node */
  ObjectField(node: ObjectFieldNode): string;
  
  /** Print a Directive node */
  Directive(node: DirectiveNode): string;
  
  /** Print a NamedType node */
  NamedType(node: NamedTypeNode): string;
  
  /** Print a ListType node */
  ListType(node: ListTypeNode): string;
  
  /** Print a NonNullType node */
  NonNullType(node: NonNullTypeNode): string;
  
  /** Print a SchemaDefinition node */
  SchemaDefinition(node: SchemaDefinitionNode): string;
  
  /** Print an OperationTypeDefinition node */
  OperationTypeDefinition(node: OperationTypeDefinitionNode): string;
  
  /** Print a ScalarTypeDefinition node */
  ScalarTypeDefinition(node: ScalarTypeDefinitionNode): string;
  
  /** Print an ObjectTypeDefinition node */
  ObjectTypeDefinition(node: ObjectTypeDefinitionNode): string;
  
  /** Print a FieldDefinition node */
  FieldDefinition(node: FieldDefinitionNode): string;
  
  /** Print an InputValueDefinition node */
  InputValueDefinition(node: InputValueDefinitionNode): string;
  
  /** Print an InterfaceTypeDefinition node */
  InterfaceTypeDefinition(node: InterfaceTypeDefinitionNode): string;
  
  /** Print a UnionTypeDefinition node */
  UnionTypeDefinition(node: UnionTypeDefinitionNode): string;
  
  /** Print an EnumTypeDefinition node */
  EnumTypeDefinition(node: EnumTypeDefinitionNode): string;
  
  /** Print an EnumValueDefinition node */
  EnumValueDefinition(node: EnumValueDefinitionNode): string;
  
  /** Print an InputObjectTypeDefinition node */
  InputObjectTypeDefinition(node: InputObjectTypeDefinitionNode): string;
  
  /** Print a DirectiveDefinition node */
  DirectiveDefinition(node: DirectiveDefinitionNode): string;
  
  /** Print a SchemaExtension node */
  SchemaExtension(node: SchemaExtensionNode): string;
  
  /** Print a ScalarTypeExtension node */
  ScalarTypeExtension(node: ScalarTypeExtensionNode): string;
  
  /** Print an ObjectTypeExtension node */
  ObjectTypeExtension(node: ObjectTypeExtensionNode): string;
  
  /** Print an InterfaceTypeExtension node */
  InterfaceTypeExtension(node: InterfaceTypeExtensionNode): string;
  
  /** Print a UnionTypeExtension node */
  UnionTypeExtension(node: UnionTypeExtensionNode): string;
  
  /** Print an EnumTypeExtension node */
  EnumTypeExtension(node: EnumTypeExtensionNode): string;
  
  /** Print an InputObjectTypeExtension node */
  InputObjectTypeExtension(node: InputObjectTypeExtensionNode): string;
}

/**
 * HTTP configuration options for GraphQL requests
 */
export interface HttpConfig {
  /** Whether to include the query string in the request body */
  includeQuery?: boolean;
  
  /** Whether to include extensions in the request */
  includeExtensions?: boolean;
}

/**
 * HTTP link configuration options
 */
export interface HttpLinkOptions {
  /** GraphQL endpoint URI (default: "/graphql") */
  uri?: string | ((operation: Operation) => string);
  
  /** Custom fetch implementation */
  fetch?: typeof fetch;
  
  /** Whether to include extensions in requests */
  includeExtensions?: boolean;
  
  /** Whether to use GET method for queries */
  useGETForQueries?: boolean;
  
  /** Additional fetch options */
  fetchOptions?: RequestInit;
  
  /** Request credentials mode */
  credentials?: RequestCredentials;
  
  /** Request headers */
  headers?: Record<string, string>;
}

/**
 * Context for HTTP requests
 */
export interface HttpContext {
  /** Override URI for this request */
  uri?: string;
  
  /** HTTP configuration */
  http?: HttpConfig;
  
  /** Fetch options for this request */
  fetchOptions?: RequestInit;
  
  /** Credentials mode for this request */
  credentials?: RequestCredentials;
  
  /** Headers for this request */
  headers?: Record<string, string>;
  
  /** Client awareness information */
  clientAwareness?: {
    /** Client name */
    name?: string;
    /** Client version */
    version?: string;
  };
  
  /** Response object (set after request completes) */
  response?: Response;
}

/**
 * Server error thrown when GraphQL request fails
 */
export interface ServerError extends Error {
  /** Error name */
  name: 'ServerError';
  
  /** HTTP response object */
  response: Response;
  
  /** HTTP status code */
  statusCode: number;
  
  /** Response result */
  result: unknown;
}

/**
 * Request body for GraphQL HTTP requests
 */
export interface GraphQLRequestBody {
  /** Operation name */
  operationName?: string;
  
  /** Query variables */
  variables?: Record<string, unknown>;
  
  /** GraphQL query string */
  query?: string;
  
  /** Request extensions */
  extensions?: Record<string, unknown>;
}

/**
 * Combined request configuration
 */
export interface RequestConfig {
  /** Fetch options */
  options: RequestInit;
  
  /** Request body */
  body: GraphQLRequestBody;
}

/**
 * Abort controller for request cancellation
 */
export interface AbortControllerConfig {
  /** AbortController instance */
  controller: AbortController | false;
  
  /** AbortSignal instance */
  signal: AbortSignal | false;
}

/**
 * Result of URI construction for GET requests
 */
export interface URIConstructionResult {
  /** Constructed URI with query parameters */
  newURI?: string;
  
  /** Parse error if serialization failed */
  parseError?: Error;
}

/**
 * Create an HTTP link for Apollo Client
 * @param options - Configuration options for the HTTP link
 * @returns Apollo Link instance for HTTP transport
 */
export declare function createHttpLink(options?: HttpLinkOptions): ApolloLink;

/**
 * HTTP Link class for GraphQL over HTTP transport
 */
export declare class HttpLink extends ApolloLink {
  /**
   * Create a new HTTP link
   * @param options - Configuration options
   */
  constructor(options?: HttpLinkOptions);
}

/**
 * Default export is HttpLink class
 */
export default HttpLink;