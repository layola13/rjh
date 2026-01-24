/**
 * Comment service module - provides API methods for comment operations
 * @module CommentService
 */

/**
 * Request options for comment operations
 */
interface CommentRequestOptions {
  /** Whether to process emoji characters in the content */
  processEmoji?: boolean;
}

/**
 * Options for API requests
 */
interface RequestOpts {
  /** Whether login is required for this request */
  needLogin?: boolean;
}

/**
 * Base parameters for comment operations
 */
interface BaseCommentParams {
  [key: string]: unknown;
}

/**
 * Parameters for adding a new comment
 */
interface AddCommentParams extends BaseCommentParams {
  /** Content of the comment */
  content: string;
  /** ID of the target entity being commented on */
  targetId: string;
  /** Type of the target entity */
  targetType: string;
}

/**
 * Parameters for querying comment information
 */
interface GetCommentInfoParams extends BaseCommentParams {
  /** Comment ID */
  commentId: string;
}

/**
 * Parameters for querying comment list
 */
interface GetCommentListParams extends BaseCommentParams {
  /** Target entity ID */
  targetId: string;
  /** Page number */
  page?: number;
  /** Page size */
  pageSize?: number;
}

/**
 * Parameters for querying replies to a comment
 */
interface GetReplyByCommentParams extends BaseCommentParams {
  /** Parent comment ID */
  commentId: string;
  /** Page number */
  page?: number;
  /** Page size */
  pageSize?: number;
}

/**
 * Parameters for system configuration query
 */
interface GetSystemConfigParams extends BaseCommentParams {
  /** Configuration key */
  configKey?: string;
}

/**
 * Parameters for like/unlike operation
 */
interface LikeClickParams extends BaseCommentParams {
  /** Comment ID to like */
  commentId: string;
  /** Like action type */
  action: 'like' | 'unlike';
}

/**
 * Parameters for modifying a comment
 */
interface ModifiedCommentParams extends BaseCommentParams {
  /** Comment ID to modify */
  commentId: string;
  /** New content */
  content: string;
}

/**
 * Parameters for home seek comment query
 */
interface QueryHomeSeekCommentParams {
  [key: string]: unknown;
}

/**
 * Parameters for reporting a comment
 */
interface ReportCommentParams extends BaseCommentParams {
  /** Comment ID to report */
  commentId: string;
  /** Reason for reporting */
  reason: string;
  /** Report type */
  reportType: string;
}

/**
 * Parameters for content check submission
 */
type SubmitContentCheckParams = string;

/**
 * Parameters for translating a comment
 */
interface TranslateCommentParams extends BaseCommentParams {
  /** Comment ID to translate */
  commentId: string;
  /** Target language code */
  targetLang: string;
}

/**
 * Parameters for batch translating comments
 */
interface TranslateCommentBatchParams extends BaseCommentParams {
  /** Array of comment IDs to translate */
  commentIds: string[];
  /** Target language code */
  targetLang: string;
}

/**
 * Generic API response type
 */
interface ApiResponse<T = unknown> {
  /** Response data */
  data: T;
  /** Success status */
  success: boolean;
  /** Error message if failed */
  message?: string;
}

/**
 * Adds a new comment
 * @param params - Comment parameters including content and target information
 * @returns Promise resolving to the API response
 */
export function addComment(params: AddCommentParams): Promise<ApiResponse>;

/**
 * Retrieves information about a specific comment
 * @param params - Parameters including the comment ID
 * @returns Promise resolving to the comment information
 */
export function getCommentInfo(params: GetCommentInfoParams): Promise<ApiResponse>;

/**
 * Retrieves a list of comments for a target entity
 * @param params - Parameters including target ID and pagination options
 * @returns Promise resolving to the list of comments
 */
export function getCommentList(params: GetCommentListParams): Promise<ApiResponse>;

/**
 * Retrieves replies for a specific comment
 * @param params - Parameters including the parent comment ID
 * @returns Promise resolving to the list of replies
 */
export function getReplyByComment(params: GetReplyByCommentParams): Promise<ApiResponse>;

/**
 * Retrieves system configuration settings
 * @param params - Configuration query parameters
 * @returns Promise resolving to the system configuration
 */
export function getSystemConfig(params: GetSystemConfigParams): Promise<ApiResponse>;

/**
 * Performs a like or unlike action on a comment
 * @param params - Parameters including comment ID and action type
 * @returns Promise resolving to the action result
 */
export function likeClick(params: LikeClickParams): Promise<ApiResponse>;

/**
 * Modifies an existing comment
 * @param params - Parameters including comment ID and new content
 * @returns Promise resolving to the modification result
 */
export function modifiedComment(params: ModifiedCommentParams): Promise<ApiResponse>;

/**
 * Batch retrieves replies for home seek comments
 * @param params - Query parameters for home seek comments
 * @returns Promise resolving to the batch reply data
 */
export function queryHomeSeekComment(params: QueryHomeSeekCommentParams): Promise<ApiResponse>;

/**
 * Reports a comment for violating community guidelines
 * @param params - Report parameters including comment ID and reason
 * @returns Promise resolving to the report submission result
 */
export function reportComment(params: ReportCommentParams): Promise<ApiResponse>;

/**
 * Submits content for security/compliance check
 * @param url - URL of the content to be checked
 * @returns Promise resolving to the content check result
 */
export function submitContentCheck(url: SubmitContentCheckParams): Promise<ApiResponse>;

/**
 * Translates a single comment to a target language
 * @param params - Translation parameters including comment ID and target language
 * @returns Promise resolving to the translated content
 */
export function translateComment(params: TranslateCommentParams): Promise<ApiResponse>;

/**
 * Translates multiple comments in batch to a target language
 * @param params - Batch translation parameters including comment IDs and target language
 * @returns Promise resolving to the translated contents
 */
export function translateCommentBatch(params: TranslateCommentBatchParams): Promise<ApiResponse>;