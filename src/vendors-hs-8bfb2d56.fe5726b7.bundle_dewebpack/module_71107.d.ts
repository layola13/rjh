/**
 * Comment model state interface
 */
interface CommentState {
  /** Whether the comment list has been loaded */
  loaded: boolean;
  /** Platform type (web, mobile, etc.) */
  platform: string;
  /** Total number of comments */
  total: number;
  /** Whether there are more comments to load */
  hasMore: boolean;
  /** List of comments */
  commentList: Comment[];
  /** List of hot comment IDs */
  hotCommitIdList: string[];
  /** Custom emojis configuration */
  customEmojis: CustomEmoji[];
}

/**
 * Comment item interface
 */
interface Comment {
  /** Unique comment identifier */
  commentId: string;
  /** Root comment ID (for replies) */
  rootCommentId?: string;
  /** Comment content */
  content?: string;
  /** Creation timestamp */
  createTime: string;
  /** List of child comments (replies) */
  childCommentList?: Comment[];
  /** Total count of child comments */
  childCommentTotal?: number;
  /** Whether there are more child comments */
  hasMoreChild?: boolean;
  /** Whether this is a hot/pinned item */
  hotItem?: boolean;
  /** Whether this comment was inserted dynamically */
  isInsert?: boolean;
  /** Comment to which this is replying */
  replyToComment?: Comment;
  /** Comment source (e.g., "HomeSeek") */
  source?: string;
  /** Whether this is a temporary waiting reply */
  generateReplyWaiting?: boolean;
}

/**
 * Custom emoji configuration
 */
interface CustomEmoji {
  /** Emoji identifier */
  id: string;
  /** Emoji display name */
  name: string;
  /** Emoji image URL */
  url: string;
}

/**
 * Client information for API requests
 */
interface ClientInfo {
  /** Platform type */
  platform: string;
  /** User language preference */
  language: string;
}

/**
 * Paging information from API responses
 */
interface PagingInfo {
  /** Total number of items */
  total: number;
  /** Whether there are more items to load */
  hasMore: boolean;
}

/**
 * Query system config parameters
 */
interface QuerySystemConfigParams {
  /** Additional configuration options */
  [key: string]: unknown;
}

/**
 * Initialize comment list parameters
 */
interface InitCommentListParams {
  /** Number of items per page */
  pageSize?: number;
  /** Whether to include reply-to comment data */
  includeReplyToComment?: boolean;
  /** Number of child comments to query */
  queryChildCommentCount?: number;
  /** Additional parameters */
  [key: string]: unknown;
}

/**
 * Query more comments parameters
 */
interface QueryMoreCommentListParams {
  /** Page number */
  pageNo?: number;
  /** Number of items per page */
  pageSize?: number;
  /** Last comment ID for pagination */
  lastCommentId?: string;
  /** Last comment creation time for pagination */
  lastCommentCreated?: string;
  /** List of hot item IDs to exclude */
  hotItemIdList?: string;
  /** Number of child comments to query */
  queryChildCommentCount?: number;
}

/**
 * Query comment info parameters
 */
interface QueryCommentInfoParams {
  /** Comment ID to query */
  commentId: string;
  /** Root comment ID (for child comments) */
  rootCommentId?: string;
}

/**
 * Update comment info parameters
 */
interface UpdateCommentInfoParams extends Comment {
  /** Comment ID */
  commentId: string;
}

/**
 * Initialize reply by comment parameters
 */
interface InitReplyByCommentParams {
  /** Root comment ID */
  rootCommentId: string;
  /** Local child comment total count */
  localChildTotal?: number;
}

/**
 * Insert comment to root comment parameters
 */
interface InsertCommentToRootCommentParams {
  /** Root comment ID to insert into */
  rootCommentId: string;
  /** List of comment IDs to insert */
  commentIdList: string[];
  /** Reference comment ID for insertion position */
  indexCommentId?: string | 'start';
}

/**
 * Insert comment items parameters
 */
interface InsertCommentItemsParams extends Array<{
  /** Comment ID (if updating existing) */
  commentId?: string;
  /** Comment data to insert */
  comment: Comment;
}> {}

/**
 * Insert comment item to root comment parameters
 */
interface InsertCommentItemToRootCommentParams {
  /** Root comment ID */
  rootCommentId: string;
  /** List of comments to insert */
  commentList?: Comment[];
  /** Reference comment ID for insertion position */
  indexCommentId?: string | 'start';
}

/**
 * Insert comment item to comment parameters
 */
interface InsertCommentItemToCommentParams {
  /** List of comments to insert */
  commentList?: Comment[];
  /** Reference comment ID for insertion position */
  indexCommentId?: string | 'start';
}

/**
 * Query more reply by comment parameters
 */
interface QueryMoreReplyByCommentParams {
  /** Comment ID to query replies for */
  commentId: string;
  /** List of child comments */
  childCommentList?: Comment[];
  /** Comment ID to remove from results */
  removeCommentId?: string;
  /** Number of items per page */
  pageSize?: number;
}

/**
 * Delete comment parameters
 */
interface DeleteCommentParams {
  /** Comment ID to delete */
  commentId: string;
  /** Root comment ID (if deleting a reply) */
  rootCommentId?: string;
  /** Local child comment total count */
  localChildTotal?: number;
}

/**
 * Comment model reducers
 */
interface CommentReducers {
  /**
   * Update multiple state properties
   * @param state - Current state
   * @param payload - Partial state updates
   * @returns Updated state
   */
  updateStates: (state: CommentState, payload: Partial<CommentState>) => CommentState;

  /**
   * Update the list of hot comment IDs
   * @param state - Current state
   * @param payload - New hot comment ID list
   * @returns Updated state
   */
  updateHotCommitIdList: (state: CommentState, payload: string[]) => CommentState;

  /**
   * Update the comment list
   * @param state - Current state
   * @param payload - New comment list
   * @returns Updated state
   */
  updateCommentList: (state: CommentState, payload: Comment[]) => CommentState;

  /**
   * Increment the total comment count
   * @param state - Current state
   * @param payload - Number to add to total
   * @returns Updated state
   */
  addTotal: (state: CommentState, payload: number) => CommentState;

  /**
   * Replace a root-level comment
   * @param state - Current state
   * @param payload - Updated comment data
   * @returns Updated state
   */
  replaceRootComment: (state: CommentState, payload: Comment) => CommentState;

  /**
   * Replace a child comment within a thread
   * @param state - Current state
   * @param payload - Updated comment data
   * @returns Updated state
   */
  replaceChildComment: (state: CommentState, payload: Comment) => CommentState;
}

/**
 * Comment model effects
 */
interface CommentEffects {
  /**
   * Query system configuration for comments
   * @param payload - Query parameters
   * @param rootState - Root application state
   */
  querySystemConfig: (payload: QuerySystemConfigParams, rootState: RootState) => Promise<void>;

  /**
   * Initialize the comment list
   * @param payload - Initialization parameters
   * @param rootState - Root application state
   */
  initCommentList: (payload: InitCommentListParams, rootState: RootState) => Promise<void>;

  /**
   * Load more comments (pagination)
   * @param payload - Query parameters
   * @param rootState - Root application state
   */
  queryMoreCommentList: (payload: QueryMoreCommentListParams, rootState: RootState) => Promise<void>;

  /**
   * Query detailed information for a specific comment
   * @param payload - Comment query parameters
   * @param rootState - Root application state
   */
  queryCommentInfo: (payload: QueryCommentInfoParams, rootState: RootState) => Promise<void>;

  /**
   * Update comment information in state
   * @param payload - Updated comment data
   * @param rootState - Root application state
   */
  updateCommentInfo: (payload: UpdateCommentInfoParams, rootState: RootState) => Promise<void>;

  /**
   * Initialize replies for a specific comment
   * @param payload - Reply initialization parameters
   * @param rootState - Root application state
   */
  initReplyByComment: (payload: InitReplyByCommentParams, rootState: RootState) => Promise<void>;

  /**
   * Insert comments into a root comment thread
   * @param payload - Insertion parameters
   * @param rootState - Root application state
   */
  insertCommentToRootComment: (payload: InsertCommentToRootCommentParams, rootState: RootState) => Promise<void>;

  /**
   * Insert multiple comment items
   * @param payload - Array of comments to insert
   * @param rootState - Root application state
   */
  insertCommentItems: (payload: InsertCommentItemsParams, rootState: RootState) => Promise<void>;

  /**
   * Insert a comment item into a root comment
   * @param payload - Insertion parameters
   * @param rootState - Root application state
   */
  insertCommentItemToRootComment: (payload: InsertCommentItemToRootCommentParams, rootState: RootState) => Promise<void>;

  /**
   * Insert a comment item at a specific position
   * @param payload - Insertion parameters
   * @param rootState - Root application state
   */
  insertCommentItemToComment: (payload: InsertCommentItemToCommentParams, rootState: RootState) => Promise<void>;

  /**
   * Load more replies for a comment
   * @param payload - Query parameters
   * @param rootState - Root application state
   */
  queryMoreReplyByComment: (payload: QueryMoreReplyByCommentParams, rootState: RootState) => Promise<void>;

  /**
   * Delete a comment
   * @param payload - Deletion parameters
   * @param rootState - Root application state
   */
  deleteComment: (payload: DeleteCommentParams, rootState: RootState) => Promise<void>;
}

/**
 * Root application state containing comment model
 */
interface RootState {
  /** Comment model state */
  comment: CommentState;
}

/**
 * Comment model definition
 */
interface CommentModel {
  /** Initial state */
  state: CommentState;
  /** State reducers */
  reducers: CommentReducers;
  /** Async effects */
  effects: () => CommentEffects;
}

/**
 * Default export: Comment model for state management
 */
declare const commentModel: CommentModel;
export default commentModel;