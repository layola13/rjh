export interface Config {
  bizCode: string;
  env: string;
  homeUrl: string;
  pageDomain: string;
  ossBucketPath: string;
  ossModelPath: string;
  ossHost: string;
  ossCdn: string;
}

export const config: Config = {
  bizCode: "shejijia",
  env: "prod",
  homeUrl: "www.shejijia.com",
  pageDomain: "shejijia.com",
  ossBucketPath: "i",
  ossModelPath: "i",
  ossHost: "https://hs-prod-pim-products.oss-us-east-1.aliyuncs.com",
  ossCdn: "https://hs-prod-pim-products.oss-us-east-1.aliyuncs.com/"
};