/**
 * Comment module API configuration
 * Defines URL endpoints for comment-related operations in the Homestyler mobile application
 */

/**
 * API endpoint configuration interface
 */
export interface ApiEndpointConfig {
  /** The API URL/method identifier */
  url: string;
}

/**
 * Complete configuration object for comment module APIs
 */
export interface CommentModuleConfig {
  /** Add a new comment */
  addComment: ApiEndpointConfig;
  
  /** Query paginated comment list */
  queryCommentList: ApiEndpointConfig;
  
  /** Query paginated reply list for a comment */
  queryCommentReplyList: ApiEndpointConfig;
  
  /** Query a single comment by ID */
  queryComment: ApiEndpointConfig;
  
  /** Submit content for moderation check */
  submitContentCheck: ApiEndpointConfig;
  
  /** Modify an existing comment */
  modifiedComment: ApiEndpointConfig;
  
  /** Handle like/unlike action */
  likeClick: ApiEndpointConfig;
  
  /** Query like count for content */
  queryLikeCount: ApiEndpointConfig;
  
  /** Query G-score resource data */
  queryGscoreResource: ApiEndpointConfig;
  
  /** Query system configuration */
  querySystemConfig: ApiEndpointConfig;
}

/**
 * Exported configuration object containing all API endpoints
 */
export declare const config: CommentModuleConfig;