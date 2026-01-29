import { sendMtop } from './path/to/mtop/module';

interface OssSignOptions {
  [key: string]: unknown;
}

interface OssSignResponse {
  [key: string]: unknown;
}

/**
 * Get global OSS sign
 * @param options - Optional configuration for OSS sign request
 * @returns Promise with OSS sign response
 */
export function getGlobalOssSign(options: OssSignOptions = {}): Promise<OssSignResponse> {
  return sendMtop({
    url: 'mtop.com.tpsjj.service.oss.sign.global',
    data: options
  });
}