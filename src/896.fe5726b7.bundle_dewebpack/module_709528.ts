interface MtopResponse<T = any> {
  data?: {
    data?: T;
    result?: T;
  };
  result?: T;
  ret: string[];
}

interface VipInfo {
  [key: string]: unknown;
}

interface VipRecord {
  [key: string]: unknown;
}

interface VipNoticeExpireData {
  noticeExpire?: boolean;
}

interface NWTKMtopUser {
  userVipGet: () => Promise<MtopResponse<VipInfo>>;
  vipRecordsQuery: () => Promise<MtopResponse<VipRecord[]>>;
  vipNoticeCheckExpire: () => Promise<MtopResponse<VipNoticeExpireData>>;
}

declare global {
  const NWTK: {
    mtop: {
      User: NWTKMtopUser;
    };
  };
}

/**
 * Handles mtop API response and extracts data
 * @throws {MtopResponse} Throws the original response if validation fails
 */
export async function handleMtopResult<T>(responsePromise: Promise<MtopResponse<T>>): Promise<T> {
  const response = await responsePromise;

  if (response && response.data && response.ret[0].includes("SUCCESS")) {
    return response.data.data ?? response.data.result ?? response.data ?? response.result;
  }

  throw response;
}

/**
 * Retrieves user VIP information
 */
export async function getUserVip(): Promise<VipInfo> {
  return handleMtopResult(NWTK.mtop.User.userVipGet());
}

/**
 * Retrieves user VIP records
 */
export async function getVipRecords(): Promise<VipRecord[]> {
  return handleMtopResult(NWTK.mtop.User.vipRecordsQuery());
}

/**
 * Checks if VIP expiration notice should be displayed
 */
export async function vipNoticeCheckExpire(): Promise<boolean | undefined> {
  return handleMtopResult(NWTK.mtop.User.vipNoticeCheckExpire()).then(
    (data) => data?.noticeExpire
  );
}