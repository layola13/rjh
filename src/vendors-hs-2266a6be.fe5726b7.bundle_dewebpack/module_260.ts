import BaseCollector from './BaseCollector';
import { pageId, config } from './PageConfig';

interface LogParams {
  pageId: string;
  page: string;
  logName: string;
  prePageId: string;
  tabId: string;
}

class PageIdCollector extends BaseCollector {
  static collecterName = "pageId";
  static dataExtend = true;

  protected logName!: string;

  getLogParams(): LogParams {
    const href = window?.location?.href ?? "";
    
    return {
      pageId,
      page: href,
      logName: this.logName,
      prePageId: config.prePageId,
      tabId: config.tabId
    };
  }
}

export default PageIdCollector;