import { createModel } from '@/utils/model';
import { getSystemConfig, getCommentList, getCommentInfo, getReplyByComment, modifiedComment } from '@/services/comment';

interface ClientInfo {
  platform: string;
  language: string;
}

interface Comment {
  commentId: string;
  rootCommentId?: string;
  createTime: string;
  childCommentList?: Comment[];
  childCommentTotal?: number;
  hasMoreChild?: boolean;
  hotItem?: boolean;
  isInsert?: boolean;
  replyToComment?: Comment;
  generateReplyWaiting?: boolean;
  source?: string;
}

interface Paging {
  total: number;
  hasMore: boolean;
}

interface CommentState {
  loaded: boolean;
  platform: string;
  total: number;
  hasMore: boolean;
  commentList: Comment[];
  hotCommitIdList: string[];
  customEmojis: unknown[];
  emoji?: unknown;
}

interface QuerySystemConfigParams {
  clientInfo?: string;
  keyList?: string;
}

interface InitCommentListParams {
  pageSize?: number;
  includeReplyToComment?: boolean;
  clientInfo?: string;
  pageNo?: number;
  queryChildCommentCount?: number;
}

interface QueryMoreCommentListParams {
  pageSize?: number;
  pageNo?: number;
  clientInfo?: string;
  queryChildCommentCount?: number;
  lastCommentId?: string;
  lastCommentCreated?: string;
  hotItemIdList?: string;
}

interface QueryCommentInfoParams {
  commentId: string;
  rootCommentId?: string;
}

interface InitReplyByCommentParams {
  rootCommentId: string;
  localChildTotal?: number;
}

interface InsertCommentToRootCommentParams {
  commentIdList: string[];
  rootCommentId: string;
  indexCommentId?: string;
}

interface InsertCommentItem {
  commentId?: string;
  comment: Comment;
}

interface InsertCommentItemToRootCommentParams {
  commentList: Comment[];
  rootCommentId: string;
  indexCommentId?: string;
}

interface InsertCommentItemToCommentParams {
  commentList: Comment[];
  indexCommentId?: string;
}

interface QueryMoreReplyByCommentParams extends Comment {
  pageSize?: number;
  removeCommentId?: string;
}

interface DeleteCommentParams {
  commentId: string;
  rootCommentId?: string;
  localChildTotal?: number;
}

interface SystemConfigResponse {
  emoji?: unknown;
}

interface CommentListResponse {
  data: Comment[];
  paging: Paging;
}

interface CommentInfoResponse {
  result: Comment[];
}

declare const globalLanguage: { language?: string };

export default createModel({
  state: {
    loaded: false,
    platform: 'web',
    total: 0,
    hasMore: false,
    commentList: [],
    hotCommitIdList: [],
    customEmojis: [],
  } as CommentState,

  reducers: {
    updateStates(state: CommentState, payload: Partial<CommentState>): CommentState {
      return { ...state, ...payload };
    },

    updateHotCommitIdList(state: CommentState, payload: string[]): CommentState {
      return { ...state, hotCommitIdList: payload };
    },

    updateCommentList(state: CommentState, payload: Comment[]): CommentState {
      return { ...state, commentList: payload };
    },

    addTotal(state: CommentState, payload: number): CommentState {
      return { ...state, total: state.total + payload };
    },

    replaceRootComment(state: CommentState, payload: Comment): CommentState {
      const commentList = JSON.parse(JSON.stringify(state.commentList)) as Comment[];
      commentList.forEach((comment, index) => {
        if (comment.commentId === payload.commentId) {
          commentList[index] = { ...comment, ...payload };
        }
      });
      return { ...state, commentList };
    },

    replaceChildComment(state: CommentState, payload: Comment): CommentState {
      const commentList = JSON.parse(JSON.stringify(state.commentList)) as Comment[];
      commentList.forEach((comment) => {
        if (comment.commentId === payload.rootCommentId && comment.childCommentList) {
          comment.childCommentList = comment.childCommentList.map((child) =>
            child.commentId === payload.commentId ? { ...child, ...payload } : child
          );
        }
      });
      return { ...state, commentList };
    },
  },

  effects: function () {
    return {
      async querySystemConfig(params: QuerySystemConfigParams = {}, rootState: { comment: CommentState }): Promise<void> {
        const response = await getSystemConfig({
          clientInfo: JSON.stringify({
            platform: rootState.comment.platform,
            language: globalLanguage.language || 'en_US',
          }),
          keyList: JSON.stringify(['commentLogo', 'commentLength', 'commentGuide', 'emoji', 'commentTopCount']),
        });

        if (response.emoji) {
          this.updateStates({ emoji: response.emoji });
        }
      },

      async initCommentList(params: InitCommentListParams = {}, rootState: { comment: CommentState }): Promise<void> {
        const pageSize = params.pageSize || 10;
        const response = await getCommentList({
          clientInfo: JSON.stringify({
            platform: rootState.comment.platform,
            language: globalLanguage.language || 'en_US',
          }),
          pageNo: 0,
          pageSize,
          queryChildCommentCount: 1,
          ...params,
        });

        const data = response.data;

        if (params.includeReplyToComment) {
          data.forEach((comment) => {
            comment.childCommentList?.forEach((child) => {
              if (child.replyToComment && comment.childCommentList) {
                comment.childCommentList.unshift(child.replyToComment);
              }
            });
            comment.childCommentList?.sort((a, b) => (Number(a.createTime) || 0) - (Number(b.createTime) || 0));
          });
        }

        if (data.length >= 1) {
          this.updateStates({
            loaded: true,
            total: response.paging?.total,
            hasMore: response.paging?.hasMore,
            commentList: data,
          });

          const hotCommitIdList = data.filter((comment) => comment.hotItem).map((comment) => comment.commentId);
          this.updateHotCommitIdList(hotCommitIdList);
        } else {
          this.updateStates({
            loaded: true,
            total: response.paging?.total,
            hasMore: response.paging?.hasMore,
            commentList: [],
          });
        }
      },

      async queryMoreCommentList(params: QueryMoreCommentListParams = {}, rootState: { comment: CommentState }): Promise<void> {
        const queryParams: QueryMoreCommentListParams = {
          clientInfo: JSON.stringify({
            platform: rootState.comment.platform,
            language: globalLanguage.language || 'en_US',
          }),
          pageNo: 0,
          pageSize: 10,
          queryChildCommentCount: 1,
          ...params,
        };

        const commentList = JSON.parse(JSON.stringify(rootState.comment.commentList)) as Comment[];

        if (commentList.length >= 1) {
          const lastComment = commentList[commentList.length - 1];
          queryParams.lastCommentId = lastComment.commentId;
          queryParams.lastCommentCreated = lastComment.createTime;
        }

        if (rootState.comment.hotCommitIdList.length >= 1) {
          queryParams.hotItemIdList = JSON.stringify(rootState.comment.hotCommitIdList);
        }

        const response = await getCommentList(queryParams);

        if (response.data?.length >= 1) {
          const newCommentList = commentList.concat(response.data);
          this.updateStates({
            hasMore: response.paging?.hasMore,
            commentList: newCommentList,
          });
        } else if (response.paging) {
          this.updateStates({
            hasMore: response.paging.hasMore,
          });
        }
      },

      async queryCommentInfo(params: QueryCommentInfoParams, rootState: { comment: CommentState }): Promise<void> {
        const response = await getCommentInfo({
          clientInfo: JSON.stringify({
            platform: rootState.comment.platform,
            language: globalLanguage.language || 'en_US',
          }),
          commentIdList: JSON.stringify([params.commentId]),
          includeDeleted: false,
        });

        if (response.result?.length >= 1) {
          const comment = response.result[0];
          if (params.rootCommentId) {
            this.replaceChildComment(comment);
          } else {
            this.replaceRootComment(comment);
          }
        }
      },

      async updateCommentInfo(params: Comment, rootState: { comment: CommentState }): Promise<void> {
        const isRootComment = rootState.comment.commentList.some((comment) => comment.commentId === params.commentId);
        
        if (isRootComment) {
          this.replaceRootComment(params);
        } else {
          this.replaceChildComment(params);
        }
      },

      async initReplyByComment(params: InitReplyByCommentParams, rootState: { comment: CommentState }): Promise<void> {
        const queryParams: Record<string, unknown> = {
          clientInfo: JSON.stringify({
            platform: rootState.comment.platform,
            language: globalLanguage.language || 'en_US',
          }),
          rootCommentId: params.rootCommentId,
          pageNo: 0,
          pageSize: 10,
        };

        if (params.localChildTotal) {
          queryParams.pageSize = params.localChildTotal;
        }

        const response = await getReplyByComment(queryParams);

        if (response.data) {
          const commentList = JSON.parse(JSON.stringify(rootState.comment.commentList)) as Comment[];
          commentList.forEach((comment) => {
            if (comment.commentId === params.rootCommentId) {
              comment.childCommentList = response.data;
              comment.hasMoreChild = response.paging.hasMore;
            }
          });
          this.updateCommentList(commentList);
        }
      },

      async insertCommentToRootComment(params: InsertCommentToRootCommentParams, rootState: { comment: CommentState }): Promise<void> {
        const clientInfo = JSON.stringify({
          platform: rootState.comment.platform,
          language: globalLanguage.language || 'en_US',
        });

        const response = await getCommentInfo({
          clientInfo,
          commentIdList: JSON.stringify(params.commentIdList),
          includeDeleted: true,
        });

        const result = response.result;
        if (!result) {
          return;
        }

        const commentList = JSON.parse(JSON.stringify(rootState.comment.commentList)) as Comment[];
        const parentComment = commentList.find((comment) => comment.commentId === params.rootCommentId);

        if (!parentComment) {
          return;
        }

        if (!parentComment.childCommentList) {
          parentComment.childCommentList = [];
        }

        result.forEach((comment) => {
          comment.isInsert = true;
        });

        const childCommentList = [...parentComment.childCommentList];
        let insertIndex = childCommentList.length;

        if (params.indexCommentId === 'start') {
          insertIndex = 0;
        } else if (params.indexCommentId) {
          const foundIndex = childCommentList.findIndex((comment) => comment.commentId === params.indexCommentId);
          if (foundIndex !== -1) {
            insertIndex = foundIndex + 1;
          }
        }

        childCommentList.splice(insertIndex, 0, ...result);
        parentComment.childCommentList = childCommentList;
        parentComment.childCommentTotal = (parentComment.childCommentTotal || 0) + result.length;

        this.updateCommentList(commentList);
        this.addTotal(params.commentIdList.length);
      },

      async insertCommentItems(params: InsertCommentItem[], rootState: { comment: CommentState }): Promise<void> {
        const commentList = JSON.parse(JSON.stringify(rootState.comment.commentList || [])) as Comment[];
        let addedCount = 0;

        params.forEach((item) => {
          if (!item.commentId && !commentList.some((comment) => comment.commentId === item.comment.commentId)) {
            commentList.unshift(item.comment);
            addedCount += 1;
            return;
          }

          let childIndex = -1;
          const parentComment = commentList.find((comment) => {
            if (comment.commentId === item.commentId) {
              childIndex = -1;
              return true;
            }
            const foundIndex = comment.childCommentList?.findIndex((child) => child.commentId === item.commentId);
            if (foundIndex !== undefined && foundIndex !== -1) {
              childIndex = foundIndex;
              return true;
            }
            return false;
          });

          if (parentComment && !parentComment.childCommentList?.some((child) => child.commentId === item.comment.commentId)) {
            const childCommentList = parentComment.childCommentList || [];
            
            if (childIndex === -1) {
              childIndex = 0;
            } else {
              childIndex += 1;
            }

            childCommentList.splice(childIndex, 0, item.comment);

            const waitingIndex = childCommentList.findIndex((comment) => comment.generateReplyWaiting);
            if (waitingIndex > -1 && item.comment.source === 'HomeSeek') {
              childCommentList.splice(waitingIndex, 1);
              parentComment.childCommentTotal = parentComment.childCommentTotal || 0;
            } else {
              addedCount += 1;
              parentComment.childCommentTotal = (parentComment.childCommentTotal || 0) + 1;
            }

            parentComment.childCommentList = childCommentList;
          }
        });

        this.updateCommentList(commentList);
        this.addTotal(addedCount);
      },

      async insertCommentItemToRootComment(params: InsertCommentItemToRootCommentParams, rootState: { comment: CommentState }): Promise<void> {
        const insertList = params.commentList;
        if (!insertList) {
          return;
        }

        const commentList = JSON.parse(JSON.stringify(rootState.comment.commentList)) as Comment[];
        const parentComment = commentList.find((comment) => comment.commentId === params.rootCommentId);

        if (!parentComment) {
          return;
        }

        if (!parentComment.childCommentList) {
          parentComment.childCommentList = [];
        }

        insertList.forEach((comment) => {
          comment.isInsert = true;
        });

        const childCommentList = [...parentComment.childCommentList];
        let insertIndex = childCommentList.length;

        if (params.indexCommentId === 'start') {
          insertIndex = 0;
        } else if (params.indexCommentId) {
          const foundIndex = childCommentList.findIndex((comment) => comment.commentId === params.indexCommentId);
          if (foundIndex !== -1) {
            insertIndex = foundIndex + 1;
          }
        }

        childCommentList.splice(insertIndex, 0, ...insertList);
        parentComment.childCommentList = childCommentList;
        parentComment.childCommentTotal = (parentComment.childCommentTotal || 0) + insertList.length;

        this.updateCommentList(commentList);
        this.addTotal(params.commentList.length);
      },

      async insertCommentItemToComment(params: InsertCommentItemToCommentParams, rootState: { comment: CommentState }): Promise<void> {
        const insertList = params.commentList;
        if (!insertList?.length) {
          return;
        }

        const commentList = JSON.parse(JSON.stringify(rootState.comment.commentList)) as Comment[];

        insertList.forEach((comment) => {
          comment.isInsert = true;
          comment.childCommentTotal = comment.childCommentList?.length || 0;
        });

        let insertIndex = commentList.length;

        if (params.indexCommentId === 'start') {
          insertIndex = 0;
        } else if (params.indexCommentId) {
          const foundIndex = commentList.findIndex((comment) => comment.commentId === params.indexCommentId);
          if (foundIndex !== -1) {
            insertIndex = foundIndex + 1;
          }
        }

        commentList.splice(insertIndex, 0, ...insertList);
        this.updateCommentList(commentList);
        this.addTotal(params.commentList.length);
      },

      async queryMoreReplyByComment(params: QueryMoreReplyByCommentParams, rootState: { comment: CommentState }): Promise<void> {
        const queryParams: Record<string, unknown> = {
          clientInfo: JSON.stringify({
            platform: rootState.comment.platform,
            language: globalLanguage.language || 'en_US',
          }),
          rootCommentId: params.commentId,
          removeCommentId: params.removeCommentId || '',
          pageNo: 0,
          pageSize: params.pageSize || 6,
        };

        if (params.childCommentList?.length >= 1) {
          const childCommentList = params.childCommentList;
          const lastChild = [...childCommentList].reverse().find((child) => !child.isInsert && child.commentId !== params.removeCommentId);
          queryParams.lastCommentCreated = lastChild?.createTime;
          queryParams.lastCommentId = lastChild?.commentId;
        }

        const response = await getReplyByComment(queryParams);

        if (response.data) {
          const commentList = JSON.parse(JSON.stringify(rootState.comment.commentList)) as Comment[];
          commentList.forEach((comment) => {
            if (comment.commentId === params.commentId) {
              const newChildren = response.data.filter((newChild) => {
                return !comment.childCommentList?.some((existingChild) => existingChild.commentId === newChild.commentId);
              });
              const mergedChildren = [...(comment.childCommentList || []), ...newChildren];
              comment.childCommentList = mergedChildren;
              comment.hasMoreChild = response.paging.hasMore;
            }
          });
          this.updateCommentList(commentList);
        }
      },

      async deleteComment(params: DeleteCommentParams, rootState: { comment: CommentState }): Promise<void> {
        const response = await modifiedComment({
          clientInfo: JSON.stringify({
            platform: rootState.comment.platform,
            language: globalLanguage.language || 'en_US',
          }),
          commentId: params.commentId,
          action: 'delete',
          platformSystem: rootState.comment.platform,
        });

        if (response.result) {
          let commentList = JSON.parse(JSON.stringify(rootState.comment.commentList)) as Comment[];

          if (params.rootCommentId) {
            const newChildTotal = (params.localChildTotal || 1) - 1;
            await this.initReplyByComment({
              ...params,
              localChildTotal: newChildTotal > 1 ? newChildTotal : 1,
            }, rootState);
            this.addTotal(-1);
          } else {
            commentList = commentList.filter((comment) => comment.commentId !== params.commentId);
            this.updateCommentList(commentList);
            this.addTotal(-1);
          }
        }
      },
    };
  },
});