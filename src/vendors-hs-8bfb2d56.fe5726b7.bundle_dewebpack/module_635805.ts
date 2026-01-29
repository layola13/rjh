export interface ApiEndpoint {
  url: string;
}

export interface ApiConfig {
  addComment: ApiEndpoint;
  queryCommentList: ApiEndpoint;
  queryCommentReplyList: ApiEndpoint;
  queryComment: ApiEndpoint;
  submitContentCheck: ApiEndpoint;
  modifiedComment: ApiEndpoint;
  likeClick: ApiEndpoint;
  queryLikeCount: ApiEndpoint;
  queryGscoreResource: ApiEndpoint;
  querySystemConfig: ApiEndpoint;
}

export const config: ApiConfig = {
  addComment: {
    url: "mtop.homestyler.mobile.app.commentmodule.save"
  },
  queryCommentList: {
    url: "mtop.homestyler.mobile.app.commentmodule.page"
  },
  queryCommentReplyList: {
    url: "mtop.homestyler.mobile.app.commentmodule.pagereply"
  },
  queryComment: {
    url: "mtop.homestyler.mobile.app.commentmodule.get"
  },
  submitContentCheck: {
    url: "mtop.homestyler.mobile.image.submitcontentcheck"
  },
  modifiedComment: {
    url: "mtop.homestyler.mobile.app.commentmodule.modified"
  },
  likeClick: {
    url: "mtop.homestyler.mobile.app.like.click"
  },
  queryLikeCount: {
    url: "mtop.homestyler.mobile.app.like.count"
  },
  queryGscoreResource: {
    url: "mtop.homestyler.bff.resource.queryresourcelocation"
  },
  querySystemConfig: {
    url: "mtop.homestyler.mobile.app.system.configquery"
  }
};