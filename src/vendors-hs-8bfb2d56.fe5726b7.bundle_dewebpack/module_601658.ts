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
  paypalAppId: string;
  paypalReturnUrl: string;
  paypalAuthend: string;
  galleryHost: string;
  MTOP_CONFIG: MtopConfig;
  TOP_CONFIG: TopConfig;
}

export const config: Config = {
  bizCode: "homestyler",
  env: "pre",
  homeUrl: "pre-www.homestyler.com",
  ossBucketPath: "i",
  ossModelPath: "i",
  ossHost: "https://hs-prod-pim-products.oss-us-east-1.aliyuncs.com",
  ossCdn: "https://hs-prod-pim-products.oss-us-east-1.aliyuncs.com/",
  paypalAppId: "AYKG-cuVYGT-MPcKPNztX0cHa0t8yMGyjZKmJYMDVnMk6XI4tAN8flA1wexmsRkdD-WLvVOn5XrNdVPG",
  paypalReturnUrl: "https://pre-www.homestyler.com/paypal",
  paypalAuthend: "sandbox",
  galleryHost: "https://pre-gcase.homestyler.com",
  MTOP_CONFIG: {
    prefix: "acs-wapa-us",
    subDomain: "homestyler",
    mainDomain: "com",
    pageDomain: "homestyler.com"
  },
  TOP_CONFIG: {
    prefix: "pre-api",
    subDomain: "shejijia",
    mainDomain: "com",
    pageDomain: "shejijia.com"
  }
};