export interface MtopConfig {
  prefix: string;
  subDomain: string;
  mainDomain: string;
  pageDomain: string;
}

export interface TopConfig {
  prefix: string;
  subDomain: string;
  mainDomain: string;
  pageDomain: string;
}

export interface Config {
  bizCode: string;
  env: string;
  homeUrl: string;
  ossBucketPath: string;
  ossModelPath: string;
  ossHost: string;
  ossCdn: string;
  MTOP_CONFIG: MtopConfig;
  TOP_CONFIG: TopConfig;
}

export const config: Config = {
  bizCode: "shejijia",
  env: "pre",
  homeUrl: "pre-www.shejijia.com",
  ossBucketPath: "i",
  ossModelPath: "i",
  ossHost: "https://hs-prod-pim-products.oss-us-east-1.aliyuncs.com",
  ossCdn: "https://hs-prod-pim-products.oss-us-east-1.aliyuncs.com/",
  MTOP_CONFIG: {
    prefix: "acs",
    subDomain: "wapa",
    mainDomain: "shejijia.com",
    pageDomain: "shejijia.com"
  },
  TOP_CONFIG: {
    prefix: "pre-api",
    subDomain: "shejijia",
    mainDomain: "com",
    pageDomain: "shejijia.com"
  }
};