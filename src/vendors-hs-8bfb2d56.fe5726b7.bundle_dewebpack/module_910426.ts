import { v4 as uuidv4 } from 'uuid';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getGlobalOssSign } from './api';
import config from './config';
import i18n from './i18n';
import message from './message';
import { createAbortController } from './utils';

interface SignData {
  OSSAccessKeyId: string;
  policy: string;
  signature: string;
  dir: string;
  endpoint: string;
  callback?: string;
}

interface SignCache {
  expireTime: number;
  signData: SignData | null;
}

interface OssSignResponse {
  code: string;
  result?: {
    accessId?: string;
    policy?: string;
    signature?: string;
    dir: string;
    endpoint: string;
    callback?: string;
  };
}

interface FileInfo {
  key: string;
  imageUrl: string;
  fileSuffix: string;
  uploadFile: File;
}

interface UploadResult {
  uid: string;
  name: string;
  url: string;
  status: 'done' | 'error' | 'cancelled';
}

interface CancellableUpload {
  upload: (file: File, isPrivate?: boolean) => Promise<UploadResult | undefined>;
  cancel: () => void;
}

const SIGN_CACHE_DURATION = 270000; // 27 seconds in milliseconds

const signCache: SignCache = {
  expireTime: 0,
  signData: null,
};

export async function makeSign(): Promise<SignData | undefined> {
  try {
    const { expireTime, signData } = signCache;
    
    if (Date.now() - expireTime < SIGN_CACHE_DURATION && signData) {
      return signData;
    }

    const response: OssSignResponse | null = await getGlobalOssSign();

    if (response?.code !== 'SUCCESS' || !response.result) {
      return undefined;
    }

    const {
      accessId = '',
      policy = '',
      signature = '',
      dir,
      endpoint,
      callback,
    } = response.result;

    const newSignData: SignData = {
      OSSAccessKeyId: accessId,
      policy,
      signature,
      dir,
      endpoint,
    };

    if (callback) {
      newSignData.callback = callback;
    }

    Object.assign(signCache, {
      expireTime: Date.now(),
      signData: newSignData,
    });

    return newSignData;
  } catch (error) {
    message.error(i18n.t('errMsg_network') || '网络异常，请稍后重试');
    return undefined;
  }
}

function prepareFileInfo(file: File, signData: SignData, resizeWidth = ''): FileInfo {
  let fileSuffix = '';
  const fileType = file.type;

  if (file instanceof File && file.name) {
    fileSuffix = file.name.replace(/.+(\..+)$/, (_match, extension) => extension);
  } else {
    fileSuffix = '.' + fileType.split('/').pop();
  }

  const basePath = signData.dir || `${config.ossBucketPath}/${uuidv4()}`;
  const uniqueId = signData.dir ? `${uuidv4()}.` : '';
  
  const normalizedSuffix = fileSuffix.toLowerCase().replace('jpeg', 'jpg');
  const key = uniqueId
    ? `${basePath}/${uniqueId.replace('.', '')}${normalizedSuffix}`
    : `${basePath}${normalizedSuffix}`;

  const cleanKey = /^(https:\/\/|http:\/\/|\/\/)+(\s\S)*/g.test(key)
    ? key.replace(/(.+)?\?.+/g, (_match, path) => path)
    : key;

  const imageUrl = resizeWidth
    ? `${config.ossCdn}${cleanKey}?x-oss-process=image/resize,w_${resizeWidth}`
    : `${config.ossCdn}${cleanKey}`;

  return {
    key: cleanKey,
    imageUrl,
    fileSuffix,
    uploadFile: file,
  };
}

export async function uploadToOSS(
  file: File,
  signData: SignData,
  isPrivate = false,
  abortController?: AbortController
): Promise<UploadResult> {
  const fileInfo = prepareFileInfo(file, signData);

  const result: UploadResult = {
    uid: fileInfo.key,
    name: fileInfo.uploadFile.name,
    url: fileInfo.imageUrl,
    status: 'error',
  };

  if (!fileInfo.fileSuffix) {
    message.error(i18n.t('no.exten.re-upload') || '未获取到文件后缀，请重新上传');
    return result;
  }

  try {
    const uploadParams = {
      ...signData,
      key: fileInfo.key,
      file: fileInfo.uploadFile,
      success_action_status: '200',
    };

    const formData = new FormData();
    Object.entries(uploadParams).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });

    const requestConfig: AxiosRequestConfig = {
      url: signData.endpoint || config.ossHost,
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-oss-object-acl': isPrivate ? 'private' : 'default',
      },
      signal: abortController?.signal,
    };

    const response: AxiosResponse = await axios(requestConfig);

    if (response.status === 200) {
      return { ...result, status: 'done' };
    }

    return result;
  } catch (error) {
    if (axios.isCancel(error)) {
      return { ...result, status: 'cancelled' };
    }
    return result;
  }
}

export async function uploadFile(
  file: File,
  isPrivate = false,
  abortController?: AbortController
): Promise<UploadResult | undefined> {
  const signData = await makeSign();

  if (!signData) {
    return undefined;
  }

  return await uploadToOSS(file, signData, isPrivate, abortController);
}

export function createCancellableUpload(): CancellableUpload {
  const abortController = createAbortController();

  return {
    upload: (file: File, isPrivate = false) => uploadFile(file, isPrivate, abortController),
    cancel: () => abortController.abort(),
  };
}