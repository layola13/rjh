interface ApiConfig {
  method: string;
  url: string;
  description: string;
  baseApi?: boolean;
}

interface ApiConfigs {
  checkUserLoginStatus: ApiConfig;
  checkUserLicenceStatus: ApiConfig;
  getUserGrayVersion: ApiConfig;
  getUserMemberInfo: ApiConfig;
  resourceConfigs: ApiConfig;
}

const apiConfigs: ApiConfigs = {
  checkUserLoginStatus: {
    method: "post",
    url: "v1.0/base",
    description: "check登录状态",
    baseApi: true
  },
  checkUserLicenceStatus: {
    method: "post",
    url: "mtop.homestyler.authority.licence.check3dToolBaseLicence",
    description: "check用户是否工具licence"
  },
  getUserGrayVersion: {
    method: "post",
    url: "mtop.homestyler.authority.gray.get.global",
    description: "获取用户灰度版本"
  },
  getUserMemberInfo: {
    method: "post",
    url: "mtop.homestyler.global.authority.benefits.activeMemberScoreInfo",
    description: "获取用户会员信息"
  },
  resourceConfigs: {
    method: "post",
    url: "mtop.homestyler.global.gscore.resource.query",
    description: "获取资源位配置"
  }
};

export default apiConfigs;