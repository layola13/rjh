import { uuid } from './uuid-module';

const isRefresh: boolean = Boolean(sessionStorage.getItem("pageId"));
const storedTabId: string | null = sessionStorage.getItem("tabId");
const storedPageId: string | null = sessionStorage.getItem("pageId");

export const pageId: string = uuid();

let tabId: string = storedTabId || "";

if (!tabId) {
    tabId = uuid();
    sessionStorage.setItem("tabId", tabId);
}

sessionStorage.setItem("pageId", pageId);

export interface Config {
    isRefresh: boolean;
    pageId: string;
    prePageId: string;
    tabId: string;
}

export const config: Config = {
    isRefresh,
    pageId,
    prePageId: storedPageId || "",
    tabId
};