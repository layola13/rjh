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
    url: "mtop.homestyler.global.mobile.app.commentmodule.save"
  },
  queryCommentList: {
    url: "mtop.homestyler.global.mobile.app.commentmodule.page"
  },
  queryCommentReplyList: {
    url: "mtop.homestyler.global.mobile.app.commentmodule.pagereply"
  },
  queryComment: {
    url: "mtop.homestyler.global.mobile.app.commentmodule.get"
  },
  submitContentCheck: {
    url: "mtop.homestyler.global.mobile.image.submitcontentcheck"
  },
  modifiedComment: {
    url: "mtop.homestyler.global.mobile.app.commentmodule.modified"
  },
  likeClick: {
    url: "mtop.homestyler.global.mobile.app.like.click"
  },
  queryLikeCount: {
    url: "mtop.homestyler.global.mobile.app.like.count"
  },
  queryGscoreResource: {
    url: "mtop.homestyler.global.gscore.resource.query"
  },
  querySystemConfig: {
    url: "mtop.homestyler.global.mobile.app.system.configquery"
  }
};