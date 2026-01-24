/**
 * GraphQL Error Location
 * Represents a position in the source code
 */
interface SourceLocation {
  line: number;
  column: number;
}

/**
 * GraphQL AST Node with location information
 */
interface ASTNode {
  loc?: LocationInfo;
  kind: string;
}

/**
 * Location information including source and position
 */
interface LocationInfo {
  start: SourceLocation;
  end: SourceLocation;
  source: Source;
}

/**
 * GraphQL Source document
 */
interface Source {
  body: string;
  name: string;
  locationOffset: SourceLocation;
}

/**
 * GraphQL Error with enhanced location information
 */
interface GraphQLError {
  /** Error message */
  message: string;
  /** AST nodes related to the error */
  nodes?: ReadonlyArray<ASTNode>;
  /** Source document where error occurred */
  source?: Source;
  /** Specific locations in the source */
  locations?: ReadonlyArray<SourceLocation>;
}

/**
 * Formats a GraphQL error with enhanced location information
 * 
 * @param error - The GraphQL error to format
 * @returns Formatted error message with source code context
 */
declare function formatGraphQLError(error: GraphQLError): string;

/**
 * Prints the location context from source code
 * 
 * @param source - The source document
 * @param location - The specific location to highlight
 * @returns Formatted source code snippet with location highlighted
 */
declare function printSourceLocation(source: Source, location: SourceLocation): string;

/**
 * Calculates line and column offset from source location
 * 
 * @param source - The source document
 * @param location - The location to calculate offset for
 * @returns Adjusted source location
 */
declare function getLocationOffset(source: Source, location: SourceLocation): SourceLocation;

export { formatGraphQLError, printSourceLocation, getLocationOffset, GraphQLError, SourceLocation, ASTNode, LocationInfo, Source };