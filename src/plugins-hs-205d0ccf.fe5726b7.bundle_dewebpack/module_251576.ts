interface MtopResponse<T = unknown> {
  ret?: string[];
  data?: T;
}

interface DeviceLockData {
  unitId: string;
  force?: boolean;
}

interface MtopSingleDeviceLogin {
  checkDeviceLock(params: { data: { unitId: string } }): Promise<MtopResponse>;
  getDeviceLock(params: { data: DeviceLockData }): Promise<MtopResponse>;
}

interface NWTKGlobal {
  mtop: {
    SingleDeviceLogin: MtopSingleDeviceLogin;
  };
}

declare const NWTK: NWTKGlobal;

function validateResponse<T>(response: Promise<MtopResponse<T>>): Promise<T> {
  return response.then((result) => {
    return result && result.ret && result.ret[0].includes("SUCCESS")
      ? Promise.resolve(result.data as T)
      : Promise.reject(result);
  });
}

export function checkLoginLock(unitId: string): Promise<unknown> {
  return validateResponse(
    NWTK.mtop.SingleDeviceLogin.checkDeviceLock({
      data: {
        unitId,
      },
    })
  );
}

export function getLoginLock(unitId: string): Promise<unknown> {
  return validateResponse(
    NWTK.mtop.SingleDeviceLogin.getDeviceLock({
      data: {
        unitId,
        force: false,
      },
    })
  );
}

export function tryLoginLock(unitId: string): Promise<unknown> {
  return validateResponse(
    NWTK.mtop.SingleDeviceLogin.getDeviceLock({
      data: {
        unitId,
        force: true,
      },
    })
  );
}