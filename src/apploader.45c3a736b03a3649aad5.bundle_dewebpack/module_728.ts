interface ApiEndpoint {
  method: string;
  url: string;
  description: string;
  isTpzz?: boolean;
  removeEaSuffix?: boolean;
}

interface ApiConfig {
  checkUserLoginStatus: ApiEndpoint;
  checkUserLicenceStatus: ApiEndpoint;
  getUserGrayVersion: ApiEndpoint;
  getTpzzEnv: ApiEndpoint;
  resourceConfigs: ApiEndpoint;
  getEnterpriseCode: ApiEndpoint;
}

const apiConfig: ApiConfig = {
  checkUserLoginStatus: {
    method: "post",
    url: "mtop.homestyler.member.user.base",
    description: "check登录状态"
  },
  checkUserLicenceStatus: {
    method: "post",
    url: "mtop.homestyler.authority.licence.check3dToolBaseLicence",
    description: "check用户是否工具licence"
  },
  getUserGrayVersion: {
    method: "post",
    url: "mtop.homestyler.authority.gray.get",
    description: "获取用户灰度版本"
  },
  getTpzzEnv: {
    method: "post",
    url: "mtop.taobao.ihome.turbo.v2.env.get",
    description: "获取编辑器环境参数",
    isTpzz: true
  },
  resourceConfigs: {
    method: "post",
    url: "mtop.homestyler.bff.resource.queryresourcelocation",
    description: "获取资源位配置"
  },
  getEnterpriseCode: {
    method: "post",
    url: "mtop.taobao.mpmw.saas.brand.custom.query.by.enterpriseCode",
    description: "获取企业code",
    removeEaSuffix: true
  }
};

export default apiConfig;