export const rootDivId = "spark_pic_image_root";

export const userTrackId = "album.SparkPic";

export enum RenderJobStatusCode {
  PENDING = 0,
  DISPATCHED = 1,
  SUCCESS = 2,
  FAILED = 3,
  NOPERMISSION = 4,
  SUBMITING = -1,
  SUBMITFAILURE = 500,
  SUBMITNETWORKFAIL = 501
}

export enum TaskBizStatusCode {
  PENDING = 0,
  DISPATCHED = 1,
  SUCCESS = 2,
  SUBFAILED = 9,
  FAILED = 10
}

interface SharePlatformParams {
  url: string;
  title: string;
  summary: string;
  image: string;
  description?: string;
}

interface SharePlatformConfig {
  url: string;
  params: SharePlatformParams;
}

interface ShareUrlConfig {
  qzone: SharePlatformConfig;
  qq: SharePlatformConfig;
  weibo: SharePlatformConfig;
}

export const SHARE_URL: ShareUrlConfig = {
  qzone: {
    url: "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
    params: {
      url: "url",
      title: "title",
      summary: "summary",
      image: "pics",
      description: "desc"
    }
  },
  qq: {
    url: "https://connect.qq.com/widget/shareqq/index.html",
    params: {
      url: "url",
      title: "title",
      summary: "summary",
      image: "pics"
    }
  },
  weibo: {
    url: "https://service.weibo.com/share/share.php",
    params: {
      url: "url",
      title: "title",
      summary: "summary",
      image: "pic"
    }
  }
};

export const WEIBO_APPKEY = 1980978009;