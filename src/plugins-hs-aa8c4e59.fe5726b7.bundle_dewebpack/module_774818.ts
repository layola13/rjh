interface UserInfo {
  memberId?: string;
  uid?: string;
  source?: string;
  clientVersion?: string;
  publishVersion?: string;
  publishVersionByType?: string;
  graphicsCard?: string;
  webglVersion?: string;
  environment?: string;
  hslang?: string;
  browserLang?: string;
  deployCountry?: string;
  adid?: string;
  hsi?: string;
  hsb?: string;
  envDomain?: string;
  channelCode?: string;
}

interface HSInfo {
  adid: string;
  hsi: string;
  hsb: string;
}

interface WebglInfo {
  graphicsCard?: string;
  webglVersion?: string;
}

interface AppParams {
  _queryStrings: {
    webClient?: string;
    clientVersion?: string;
  };
}

interface HSApp {
  App: {
    getApp(): {
      pluginManager: {
        getPlugin(name: string): any;
      };
      appParams: AppParams;
      getWebglInfo(): WebglInfo | null;
    };
  };
  Config: {
    TENANT: string;
  };
  Util: {
    EventTrack: {
      instance(): {
        signalEventTrack: {
          listen(callback: Function, context: any): void;
        };
      };
    };
    Url: {
      getQueryStrings(): Record<string, string>;
    };
  };
}

interface AplusMapping {
  [key: string]: {
    id: string;
    params?: string[];
  };
}

interface TrackEventData {
  group?: string;
  action?: string;
  param?: Record<string, any>;
}

interface TrackEvent {
  data: TrackEventData;
}

interface GoldlogAction {
  action: string;
  arguments: any[];
}

declare global {
  interface Window {
    goldlog?: any;
    goldlog_queue?: GoldlogAction[];
    publishVersion?: string;
    publishVersionByType?: string;
    HSApp: HSApp;
    adskUser: {
      memberId?: string;
      uid?: string;
    };
  }

  const HSApp: HSApp;
  const adskUser: {
    memberId?: string;
    uid?: string;
  };
  const AplusMapping: AplusMapping;
  const $: {
    cookie(name: string): string;
  };
}

export default class Analytics {
  userInfo: UserInfo = {};
  private _graphicsCard: string | null = null;
  private webglVersion?: string;

  start(): void {
    this.initializeAplus(document);

    const signInPlugin = HSApp.App.getApp().pluginManager.getPlugin("hsw.plugin.signin.Plugin");
    if (signInPlugin) {
      signInPlugin.signals.signalSigninSucceeded.listen(this.sendPV, this);
    }

    HSApp.Util.EventTrack.instance().signalEventTrack.listen(this.track, this);
  }

  private initializeAplus(doc: Document): void {
    if (window.goldlog?.sendPV) {
      return;
    }

    const ifrPvMeta = doc.createElement("meta");
    ifrPvMeta.name = "aplus-ifr-pv";
    ifrPvMeta.content = "1";
    doc.head.appendChild(ifrPvMeta);

    const waitingMeta = doc.createElement("meta");
    waitingMeta.name = "aplus-waiting";
    waitingMeta.content = "MAN";
    doc.head.appendChild(waitingMeta);

    const spmMeta = doc.createElement("meta");
    spmMeta.name = "spm-id";
    spmMeta.content = "a214ky.13184254";

    const script = doc.createElement("script");
    script.type = "text/javascript";
    script.id = "beacon-aplus";
    script.src = "//g.alicdn.com/alilog/mlog/aplus_v2.js";

    let clogValue = "ou";
    if (HSApp.Config.TENANT === "fp") {
      script.src = "//laz-g-cdn.alicdn.com/alilog/mlog/aplus_int.js";
      clogValue = "int";
      spmMeta.content = "a1zmxy.20315410";
    }

    doc.head.appendChild(spmMeta);
    script.setAttribute("exparams", `clog=${clogValue}&aplus&sidx=aplusSidx&ckx=aplusCkx`);
    script.async = true;
    script.defer = true;

    const firstChild = doc.body.firstChild;
    doc.body.insertBefore(script, firstChild);
  }

  sendPV(): void {
    this.getUserInfo();

    window.goldlog_queue = window.goldlog_queue || [];
    window.goldlog_queue.push({
      action: "goldlog.sendPV",
      arguments: [
        {},
        {
          ...this.userInfo,
          refer_from_url: window.document.referrer
        }
      ]
    });
  }

  private getHSInfo(): HSInfo {
    const adid = $.cookie("adid");
    const hsi = $.cookie("hsi");
    let hsb = $.cookie("hsb");
    let hsbParams = "";

    try {
      const hsbData = JSON.parse(hsb);
      const hsbArray = Object.keys(hsbData).map((key) => {
        hsbParams = `${hsbParams}&${key}=${hsbData[key]}`;
        return `${key}_${hsbData[key]}`;
      });
      hsb = hsbArray.join("-");
    } catch (error) {
      hsb = "";
    }

    return {
      adid,
      hsi,
      hsb: `${hsb}${hsbParams}`
    };
  }

  private getUserInfo(): void {
    const app = HSApp.App.getApp();
    let source = "Web";
    const queryStrings = app.appParams._queryStrings;
    const webClient = queryStrings.webClient;
    const clientVersion = queryStrings.clientVersion || "";

    if (webClient) {
      source = webClient === "win" ? "WindowsClient" : "MacClient";
    }

    try {
      if (this._graphicsCard === null) {
        const webglInfo = app.getWebglInfo() || {};
        this._graphicsCard = webglInfo.graphicsCard || null;
        this.webglVersion = webglInfo.webglVersion;
      }
    } catch (error) {
      // Ignore error
    }

    const urlParams = HSApp.Util.Url.getQueryStrings();
    const channelCode = urlParams.channelCode;
    const env = urlParams.env;

    const metaTags = document.getElementsByTagName("meta");
    const deployCountryMeta = metaTags?.namedItem?.("deployCountry");

    if (HSApp.Config.TENANT === "fp") {
      const signInPlugin = HSApp.App.getApp().pluginManager.getPlugin("hsw.plugin.signin.Plugin");
      const storage = signInPlugin.getStorage() || { uid: "" };
      const hsInfo = this.getHSInfo();

      this.userInfo = {
        memberId: adskUser.memberId || storage.uid,
        uid: adskUser.uid || storage.uid,
        source,
        clientVersion,
        publishVersion: window.publishVersion,
        publishVersionByType: window.publishVersionByType,
        graphicsCard: this._graphicsCard || undefined,
        webglVersion: this.webglVersion,
        environment: "设计家",
        hslang: urlParams.lang || "",
        browserLang: navigator.language,
        deployCountry: deployCountryMeta?.content || "us",
        ...hsInfo
      };
    } else {
      this.userInfo = {
        memberId: adskUser.memberId,
        uid: adskUser.uid,
        source,
        clientVersion,
        graphicsCard: this._graphicsCard || undefined,
        webglVersion: this.webglVersion,
        environment: "设计家",
        envDomain: env || "",
        hslang: urlParams.lang || "",
        browserLang: navigator.language,
        publishVersion: window.publishVersion,
        publishVersionByType: window.publishVersionByType,
        deployCountry: deployCountryMeta?.content || "zh"
      };
    }

    if (channelCode) {
      Object.assign(this.userInfo, { channelCode });
    }
  }

  private sendUV(mappingConfig: { id: string; params?: string[] }, extraData?: Record<string, any>): void {
    const mergedData = Object.assign({}, this.userInfo, extraData);
    const params: string[] = [];

    for (const [key, value] of Object.entries(mergedData)) {
      params.push(`${key}=${value}`);
    }

    const paramString = params.join("&");
    window.goldlog_queue = window.goldlog_queue || [];

    const logPrefix = HSApp.Config.TENANT === "fp" 
      ? "/hs_global_web.3d." 
      : "/hs_domestic_web.3d.";

    window.goldlog_queue.push({
      action: "goldlog.record",
      arguments: [logPrefix + mappingConfig.id, "CLK", paramString, "GET"]
    });
  }

  private track(event: TrackEvent): void {
    const data = event.data;
    if (!data.group || !data.action) {
      return;
    }

    const mappingKey = `${data.group}_${data.action}`;
    const mappingConfig = AplusMapping[mappingKey];

    if (!mappingConfig) {
      return;
    }

    if (mappingConfig.params && Array.isArray(mappingConfig.params) && mappingConfig.params.length && data.param) {
      const extractedParams: Record<string, any> = {};
      mappingConfig.params.forEach((paramKey) => {
        const paramValue = data.param?.[paramKey];
        extractedParams[paramKey] = paramValue;
      });
      this.sendUV(mappingConfig, extractedParams);
    } else {
      this.sendUV(mappingConfig);
    }
  }
}