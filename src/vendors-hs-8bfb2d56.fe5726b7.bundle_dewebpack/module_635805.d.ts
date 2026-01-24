/**
 * 评论和互动模块API配置
 * 
 * 提供评论系统、点赞、内容审核等功能的接口配置
 * @module CommentModuleConfig
 */

/**
 * API端点配置接口
 */
interface ApiEndpoint {
  /** API请求地址 */
  url: string;
}

/**
 * 评论模块配置对象
 */
interface CommentModuleConfig {
  /** 添加评论接口配置 */
  addComment: ApiEndpoint;
  
  /** 查询评论列表接口配置（分页） */
  queryCommentList: ApiEndpoint;
  
  /** 查询评论回复列表接口配置（分页） */
  queryCommentReplyList: ApiEndpoint;
  
  /** 查询单条评论接口配置 */
  queryComment: ApiEndpoint;
  
  /** 提交内容审核接口配置 */
  submitContentCheck: ApiEndpoint;
  
  /** 修改评论接口配置 */
  modifiedComment: ApiEndpoint;
  
  /** 点赞操作接口配置 */
  likeClick: ApiEndpoint;
  
  /** 查询点赞数量接口配置 */
  queryLikeCount: ApiEndpoint;
  
  /** 查询Gscore资源接口配置 */
  queryGscoreResource: ApiEndpoint;
  
  /** 查询系统配置接口配置 */
  querySystemConfig: ApiEndpoint;
}

/**
 * 评论模块API配置
 * 
 * @remarks
 * 所有接口均为mtop协议，用于Homestyler移动端应用
 */
export declare const config: CommentModuleConfig;