import BaseCollector from './BaseCollector';

interface QueryStrings {
  env?: string;
  [key: string]: string | undefined;
}

interface AppParams {
  biz?: string;
  [key: string]: unknown;
}

interface App {
  appParams?: AppParams;
  getApp?: () => App;
}

interface HSApp {
  App?: App;
}

interface AdskUser {
  uid?: string;
  sid?: string;
  employeeId?: string;
  site?: string;
}

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

declare global {
  interface Window {
    HSApp?: HSApp;
    adskUser?: AdskUser;
  }
}

function getQueryStrings(search: string): QueryStrings {
  const params: QueryStrings = {};
  const searchParams = new URLSearchParams(search);
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

class UserInfoCollector extends BaseCollector {
  static readonly collecterName = "userInfo";

  getLogParams(): LogParams {
    const hsApp = window.HSApp;
    const app = hsApp?.App?.getApp?.();
    const queryStrings = getQueryStrings(location.search);
    const env = queryStrings?.env;
    const biz = app?.appParams?.biz;
    const adskUser = window.adskUser;

    return {
      umsId: adskUser?.uid ?? "",
      sessionId: adskUser?.sid ?? "",
      employeeId: adskUser?.employeeId,
      site: adskUser?.site ?? "",
      biz: biz ?? "sjj",
      domain: env
    };
  }

  static getVaildator(): Validator[] {
    return [
      {
        field: "userInfo.biz",
        check: (value: unknown): ValidationResult => {
          const validBizValues = ["sjj", "tpzz", "global"];
          return validBizValues.includes(value as string)
            ? {}
            : { error: "不在取值内" };
        }
      },
      {
        field: "userInfo.domain",
        check: (value: unknown): ValidationResult => {
          const domainPattern = /^[A-Za-z]*$/;
          return domainPattern.test(value as string)
            ? {}
            : { error: "domain需为纯字母" };
        }
      }
    ];
  }
}

export default UserInfoCollector;