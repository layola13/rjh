import { uuid } from './utils';

const isRefresh: boolean = !!sessionStorage.getItem("pageId");
const storedTabId: string | null = sessionStorage.getItem("tabId");
const storedPageId: string | null = sessionStorage.getItem("pageId");

export const pageId: string = uuid();

let tabId: string;
if (storedTabId) {
  tabId = storedTabId;
} else {
  tabId = uuid();
  sessionStorage.setItem("tabId", tabId);
}

sessionStorage.setItem("pageId", pageId);

export interface PageConfig {
  isRefresh: boolean;
  pageId: string;
  prePageId: string;
  tabId: string;
}

export const config: PageConfig = {
  isRefresh,
  pageId,
  prePageId: storedPageId ?? "",
  tabId
};