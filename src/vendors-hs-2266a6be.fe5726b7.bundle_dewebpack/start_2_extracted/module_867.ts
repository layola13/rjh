import BaseCollector from './BaseCollector';

interface LogParams {
  umsId: string;
  sessionId: string;
  employeeId?: string;
  site: string;
  biz: string;
  domain?: string;
}

interface ValidationResult {
  error?: string;
}

interface Validator {
  field: string;
  check: (value: unknown) => ValidationResult;
}

interface AppParams {
  biz?: string;
}

interface App {
  appParams?: AppParams;
}

interface HSAppInterface {
  App?: {
    getApp: () => App | undefined;
  };
}

interface AdskUser {
  uid?: string;
  sid?: string;
  employeeId?: string;
  site?: string;
}

interface GlobalWindow {
  HSApp?: HSAppInterface;
  adskUser?: AdskUser;
}

declare const window: GlobalWindow;

const VALID_BIZ_VALUES = ['sjj', 'tpzz', 'global'] as const;
const DEFAULT_BIZ = 'sjj';
const DOMAIN_PATTERN = /^[A-Za-z]*$/;

function getQueryStrings(search: string): Record<string, string> | undefined {
  if (!search) return undefined;
  const params: Record<string, string> = {};
  const searchParams = new URLSearchParams(search);
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

class UserInfoCollector extends BaseCollector {
  static readonly collecterName = 'userInfo';

  getLogParams(): LogParams {
    const hsApp = window.HSApp;
    const app = hsApp?.App?.getApp();
    const queryStrings = getQueryStrings(location.search);
    const env = queryStrings?.env;
    const biz = app?.appParams?.biz;
    const adskUser = window.adskUser;

    return {
      umsId: adskUser?.uid ?? '',
      sessionId: adskUser?.sid ?? '',
      employeeId: adskUser?.employeeId,
      site: adskUser?.site ?? '',
      biz: biz ?? DEFAULT_BIZ,
      domain: env
    };
  }

  static getVaildator(): Validator[] {
    return [
      {
        field: 'userInfo.biz',
        check: (value: unknown): ValidationResult => {
          return VALID_BIZ_VALUES.includes(value as typeof VALID_BIZ_VALUES[number])
            ? {}
            : { error: '不在取值内' };
        }
      },
      {
        field: 'userInfo.domain',
        check: (value: unknown): ValidationResult => {
          return DOMAIN_PATTERN.test(String(value))
            ? {}
            : { error: 'domain需为纯字母' };
        }
      }
    ];
  }
}

export default UserInfoCollector;