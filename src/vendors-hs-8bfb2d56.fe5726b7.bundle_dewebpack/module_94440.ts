import mtopService from './mtopService';
import { mtopConfig } from './config';

interface CommentData {
  [key: string]: unknown;
}

interface AddCommentParams {
  [key: string]: unknown;
}

interface QueryCommentParams {
  [key: string]: unknown;
}

interface CommentListParams {
  [key: string]: unknown;
}

interface ReplyByCommentParams {
  [key: string]: unknown;
}

interface SystemConfigParams {
  [key: string]: unknown;
}

interface LikeClickParams {
  [key: string]: unknown;
}

interface ModifiedCommentParams {
  [key: string]: unknown;
}

interface HomeSeekCommentParams {
  [key: string]: unknown;
}

interface ReportCommentParams {
  [key: string]: unknown;
}

interface TranslateCommentParams {
  [key: string]: unknown;
}

interface TranslateCommentBatchParams {
  [key: string]: unknown;
}

interface MtopResponse<T = unknown> {
  data: T;
  success: boolean;
  [key: string]: unknown;
}

export function addComment(params: AddCommentParams): Promise<MtopResponse> {
  return mtopService.sendMtop({
    url: mtopConfig.addComment.url,
    method: 'post',
    data: params,
    requestOptions: {
      processEmoji: true
    },
    opts: {
      needLogin: true
    }
  });
}

export function getCommentInfo(params: QueryCommentParams): Promise<MtopResponse> {
  return mtopService.sendMtop({
    url: mtopConfig.queryComment.url,
    data: params
  });
}

export function getCommentList(params: CommentListParams): Promise<MtopResponse> {
  return mtopService.sendMtop({
    url: mtopConfig.queryCommentList.url,
    data: params
  });
}

export function getReplyByComment(params: ReplyByCommentParams): Promise<MtopResponse> {
  return mtopService.sendMtop({
    url: mtopConfig.queryCommentReplyList.url,
    data: params
  });
}

export function getSystemConfig(params: SystemConfigParams): Promise<MtopResponse> {
  return mtopService.sendMtop({
    url: mtopConfig.querySystemConfig.url,
    data: params
  });
}

export function likeClick(params: LikeClickParams): Promise<MtopResponse> {
  return mtopService.sendMtop({
    url: mtopConfig.likeClick.url,
    data: params,
    opts: {
      needLogin: true
    }
  });
}

export function modifiedComment(params: ModifiedCommentParams): Promise<MtopResponse> {
  return mtopService.sendMtop({
    url: mtopConfig.modifiedComment.url,
    data: params,
    opts: {
      needLogin: true
    }
  });
}

export function queryHomeSeekComment(params: HomeSeekCommentParams): Promise<MtopResponse> {
  return mtopService.sendMtop({
    url: 'mtop.homestyler.global.mobile.homeseek.batchgetreply',
    data: {
      query: JSON.stringify(params)
    }
  });
}

export function reportComment(params: ReportCommentParams): Promise<MtopResponse> {
  return mtopService.sendMtop({
    url: 'mtop.homestyler.global.mobile.app.report',
    method: 'post',
    data: params,
    opts: {
      needLogin: true
    }
  });
}

export function submitContentCheck(url: string): Promise<MtopResponse> {
  return mtopService.sendMtop({
    url: mtopConfig.submitContentCheck.url,
    data: {
      url
    },
    opts: {
      needLogin: true
    }
  });
}

export function translateComment(params: TranslateCommentParams): Promise<MtopResponse> {
  return mtopService.sendMtop({
    url: 'mtop.homestyler.global.mobile.app.content.translate',
    data: params
  });
}

export function translateCommentBatch(params: TranslateCommentBatchParams): Promise<MtopResponse> {
  return mtopService.sendMtop({
    url: 'mtop.homestyler.global.mobile.app.content.translate.batch',
    data: params
  });
}