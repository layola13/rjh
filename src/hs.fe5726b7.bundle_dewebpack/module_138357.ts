interface CnamePatternMap {
  hosts: string[];
  cnamePattern: string;
  count: number;
}

interface Config {
  catalogSearchServer: string;
  server: string;
  apiServer: string;
  getReportedImgUrl: string;
  application: string;
  tenant: string;
  region: string;
  language: string;
  productStatus: number;
  productSortBy: string;
  productOrder: string;
  cnamePatternMaps: CnamePatternMap[];
  rewriteUrl: (url: string) => string;
  credentialsWhiteListCors: string[];
  excludeCredentialsWhiteListCors: string[];
  dataTypes: string[];
}

const config: Config = {
  catalogSearchServer: "",
  server: "http://3d.homestyler.com/cn",
  apiServer: "https://api.homestyler.com/",
  getReportedImgUrl: "https://jr-fpmw.homestyler.com/api/rest/v1.0/asset/report/url",
  application: "fpweb",
  tenant: "ezhome",
  region: "",
  language: "zh_CN",
  productStatus: 1,
  productSortBy: "rank",
  productOrder: "desc",
  cnamePatternMaps: [
    {
      hosts: [
        "juran-prod-assets.s3.cn-north-1.amazonaws.com.cn",
        "s3.shejijia.com/juran-prod-assets"
      ],
      cnamePattern: "s3#index#.shejijia.com/juran-prod-assets",
      count: 10
    },
    {
      hosts: [
        "juran-prod-contents.s3.cn-north-1.amazonaws.com.cn",
        "s3.shejijia.com/juran-prod-contents"
      ],
      cnamePattern: "s3#index#.shejijia.com/juran-prod-contents",
      count: 10
    },
    {
      hosts: [
        "juran-staging-contents.s3.cn-north-1.amazonaws.com.cn",
        "s3.shejijia.com/juran-staging-contents"
      ],
      cnamePattern: "s3#index#.shejijia.com/juran-staging-contents",
      count: 10
    },
    {
      hosts: [
        "//s3.cn-north-1.amazonaws.com.cn",
        "//s3.shejijia.com"
      ],
      cnamePattern: "//s3#index#.shejijia.com",
      count: 10
    },
    {
      hosts: [
        "//juran-prod-assets-iso.oss-cn-beijing.aliyuncs.com",
        "//juran-prod-assets.oss-cn-beijing.aliyuncs.com"
      ],
      cnamePattern: "//a#index#.shejijia.com",
      count: 10
    }
  ],
  rewriteUrl: function(url: string): string {
    return url;
  },
  credentialsWhiteListCors: [
    "api.shejijia.com",
    "api.shejijia.test",
    "passport.shejijia.com",
    "passport.shejijia.test",
    "ws.shejijia.com",
    "ws.shejijia.test",
    "api.homestyler.test",
    "api.homestyler.com",
    "passport.homestyler.com",
    "passport.homestyler.test",
    "ws.homestyler.com",
    "ws.homestyler.test",
    "api.homestyler.taobao.net",
    "api.homestyler.taobao.com",
    "passport.homestyler.taobao.net",
    "passport.homestyler.taobao.com",
    "ws.homestyler.taobao.net",
    "ws.homestyler.taobao.com"
  ],
  excludeCredentialsWhiteListCors: [
    "//i.shejijia.com",
    "//i.homestyler.com"
  ],
  dataTypes: [
    ".json",
    ".xml",
    ".text",
    ".html",
    ".htm",
    ".jpg",
    ".png",
    ".gif",
    ".svg",
    ".t3d"
  ]
};

export default config;