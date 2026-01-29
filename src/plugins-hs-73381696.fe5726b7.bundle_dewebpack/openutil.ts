enum OpenType {
  LoadDesign = "load_design",
  LoadEmpty = "load_empty",
  OpenDesign = "open_design"
}

enum ResourcePhase {
  LoadingApp = "LoadingApp",
  OpenDesign = "OpenDesign"
}

enum OpeningStatus {
  Opening = "opening",
  Opend = "opend",
  HideLoading = "hide_loading"
}

interface ResourceEntry {
  name: string;
  startTime: number;
  duration: number;
  transferSize: number;
  responseEnd: number;
}

interface ResourceBuffer {
  [ResourcePhase.LoadingApp]?: ResourceEntry[];
  [ResourcePhase.OpenDesign]?: ResourceEntry[];
  timeData?: OpenTimeData;
}

interface OpenTimeInfo {
  newOpening?: { isEmpty: boolean; time: number };
  newOpend?: { isEmpty: boolean; time: number };
  opening?: { isEmpty: boolean; time: number };
  hideLoading?: { isEmpty: boolean; time: number };
}

interface OpenInfo {
  type: OpenType;
  opening: number;
  opend: number;
}

interface OpenTimeData {
  type: OpenType;
  startTime: number;
  loadEventEnd: number;
  appReady: number;
  designOpening: number;
  designOpend: number;
  resourcesEnd: number;
  publishVersion: string;
  publishVersionByType: string;
}

interface ResourceGroup {
  names: string[];
  start: number;
  end: number;
}

interface DocumentEventData {
  isNewDocument?: boolean;
}

interface LoadingEventData {
  data?: {
    type?: string;
  };
}

const logger = log.logger("HSApp.Plugin.Metrics.Performance.OpenDesign");
logger.silence = true;

export class OpenUtil {
  private static readonly RESOURCE_REG = /\.t3d/;
  private static readonly DEFAULT_RES_DELAY = 90000;
  private static readonly RESOURCE_TIME_GAP = 5000;

  private static _resBuff: ResourceBuffer = {};
  private static _perfObserver?: PerformanceObserver;
  private static _tempTagReady = 0;
  private static _openTimeInfo: OpenTimeInfo = {};
  private static _timer?: ReturnType<typeof setTimeout>;
  private static _docFirstInitialized = false;
  private static _signalHook = new HSCore.Util.SignalHook(OpenUtil);

  private static _logResourceList(entries?: PerformanceEntryList): void {
    if (this._tempTagReady === 0) {
      const tag = HSApp.Util.EventTrack.instance().getTag(
        HSApp.Util.EventGroupEnum.OpenDesign,
        "ready"
      );
      if (tag?.performanceTime) {
        this._tempTagReady = tag.performanceTime;
      }
    }

    if (!entries) return;

    entries.forEach((entry) => {
      const resourceEntry = entry as PerformanceResourceTiming;
      const phase =
        this._tempTagReady > 0 &&
        resourceEntry.startTime &&
        resourceEntry.startTime > this._tempTagReady
          ? ResourcePhase.OpenDesign
          : ResourcePhase.LoadingApp;

      if (!this._resBuff[phase]) {
        this._resBuff[phase] = [];
      }

      this._resBuff[phase]!.push({
        name: resourceEntry.name,
        startTime: resourceEntry.startTime,
        duration: resourceEntry.duration,
        transferSize: resourceEntry.transferSize,
        responseEnd: resourceEntry.responseEnd
      });
    });
  }

  private static _getPerfObserver(): PerformanceObserver {
    if (!this._perfObserver) {
      this._perfObserver = new PerformanceObserver(this._startPerformanceObserver);
    }
    return this._perfObserver;
  }

  static active(app: any): void {
    const observer = this._getPerfObserver();
    const resourceEntries = performance.getEntriesByType("resource");

    observer.observe({ entryTypes: ["resource"] });
    this._logResourceList(resourceEntries);

    app.signalDocumentOpening.listen((event: { data?: DocumentEventData }) => {
      this._setOpenTime(OpeningStatus.Opening, event?.data);
    }, this);

    app.signalDocumentOpened.listen((event: { data?: DocumentEventData }) => {
      this._setOpenTime(OpeningStatus.Opend, event?.data);
    }, this);

    if (app.transManager?.signalCreated) {
      this._signalHook.listen(
        app.transManager.signalCreated,
        this._signalCreatedHandler
      );
    }

    hsw?.plugin?.loadingfeedback?.Handler?.signalHideLoading?.listen(
      (event: LoadingEventData) => {
        const eventType = event?.data?.type;
        if (eventType === "designerror" || eventType === "designerror_deleted") {
          clearTimeout(this._timer);
          this._reset();
        } else {
          this._setOpenTime(OpeningStatus.HideLoading);
        }
      }
    );
  }

  static clear(): void {
    clearTimeout(this._timer);
    this._reset();
    this._signalHook.unlistenAll();
  }

  private static _observe(): void {
    this._getPerfObserver().observe({ entryTypes: ["resource"] });
  }

  private static _disconnect(): void {
    this._getPerfObserver().disconnect();
  }

  private static _getNavigation(): PerformanceNavigationTiming | undefined {
    const entries = performance?.getEntriesByType("navigation");
    if (entries?.length) {
      return entries[entries.length - 1] as PerformanceNavigationTiming;
    }
    return undefined;
  }

  private static _getResourcesEnd(opendTime?: number): number | undefined {
    const { LoadingApp: loadingAppRes, OpenDesign: openDesignRes } = this._resBuff;

    if (!loadingAppRes && !openDesignRes) {
      return undefined;
    }

    const nowTime = opendTime ?? performance.now();
    const groups: ResourceGroup[] = [];
    let currentGroupIndex = 0;

    const allResources = [...(loadingAppRes ?? []), ...(openDesignRes ?? [])];
    allResources.sort((a, b) => a.startTime - b.startTime);

    allResources.forEach((resource) => {
      if (resource.startTime < nowTime && resource.responseEnd < nowTime) {
        return;
      }

      const isValidResource = this.RESOURCE_REG.test(resource.name);
      const currentGroup = groups[currentGroupIndex];

      if (!currentGroup && isValidResource) {
        groups.push({
          names: [resource.name],
          start: resource.startTime,
          end: resource.responseEnd
        });
      } else if (currentGroup) {
        if (resource.startTime < currentGroup.end + this.RESOURCE_TIME_GAP) {
          currentGroup.end = Math.max(currentGroup.end, resource.responseEnd);
          currentGroup.names.push(resource.name);
        } else if (isValidResource) {
          currentGroupIndex++;
          groups.push({
            names: [resource.name],
            start: resource.startTime,
            end: resource.responseEnd
          });
        }
      }
    });

    return groups[0]?.end;
  }

  private static _getOpenTimeData(openInfo: OpenInfo): OpenTimeData {
    const readyTag = HSApp.Util.EventTrack.instance().getTag(
      HSApp.Util.EventGroupEnum.OpenDesign,
      "ready"
    );
    const navigation = this._getNavigation();
    const startTime = navigation?.startTime ?? 0;
    const loadEventEnd = navigation?.loadEventEnd ?? 0;
    const appReady = readyTag?.performanceTime ?? loadEventEnd;
    const designOpening = openInfo.opening;
    const designOpend = openInfo.opend;
    const resourcesEnd = this._getResourcesEnd(designOpend) ?? designOpend;

    return {
      type: openInfo.type,
      startTime,
      loadEventEnd,
      appReady,
      designOpening,
      designOpend,
      resourcesEnd,
      publishVersion: window.publishVersion,
      publishVersionByType: window.publishVersionByType
    };
  }

  private static _getCurrentUrlAssetId(): string | undefined {
    return HSApp.Util.Url.getQueryStrings().assetId;
  }

  private static _isHistoryVersionDesign(): boolean {
    return !!HSApp.Util.Url.getQueryStrings().versionID;
  }

  private static _setOpenTime(
    status: OpeningStatus,
    data?: DocumentEventData
  ): void {
    const assetId = this._getCurrentUrlAssetId();

    if (status === OpeningStatus.Opening) {
      clearTimeout(this._timer);

      if (data?.isNewDocument) {
        this._openTimeInfo = {};
        this._openTimeInfo.newOpening = {
          isEmpty: !assetId,
          time: performance.now()
        };
      } else {
        if (
          !this._openTimeInfo.newOpening?.isEmpty &&
          !this._openTimeInfo.opening
        ) {
          this._openTimeInfo.hideLoading = undefined;
        } else {
          this._openTimeInfo = {};
        }
        this._openTimeInfo.opening = {
          isEmpty: !assetId,
          time: performance.now()
        };
      }
      this._observe();
    } else if (status === OpeningStatus.Opend) {
      if (data?.isNewDocument) {
        if (this._docFirstInitialized) {
          this._reset();
        } else {
          this._docFirstInitialized = true;
          this._openTimeInfo.newOpend = {
            isEmpty: !assetId,
            time: performance.now()
          };
          this._tryReport();
        }
      }
    } else if (status === OpeningStatus.HideLoading) {
      if (this._openTimeInfo.opening) {
        this._openTimeInfo.hideLoading = {
          isEmpty: !assetId,
          time: performance.now()
        };
        this._tryReport();
      }
    }
  }

  private static _calcOpenInfo(): OpenInfo | undefined {
    if (
      this._openTimeInfo.newOpening &&
      this._openTimeInfo.newOpend &&
      !this._openTimeInfo.opening &&
      !this._openTimeInfo.hideLoading
    ) {
      return {
        type: OpenType.LoadEmpty,
        opening: this._openTimeInfo.newOpening.time,
        opend: this._openTimeInfo.newOpend.time
      };
    }

    if (
      this._openTimeInfo.newOpening &&
      this._openTimeInfo.newOpend &&
      this._openTimeInfo.opening &&
      this._openTimeInfo.hideLoading
    ) {
      return {
        type: OpenType.LoadDesign,
        opening: this._openTimeInfo.opening.time,
        opend: this._openTimeInfo.hideLoading.time
      };
    }

    if (
      !this._openTimeInfo.newOpening &&
      !this._openTimeInfo.newOpend &&
      this._openTimeInfo.opening &&
      this._openTimeInfo.hideLoading
    ) {
      return {
        type: OpenType.OpenDesign,
        opening: this._openTimeInfo.opening.time,
        opend: this._openTimeInfo.hideLoading.time
      };
    }

    return undefined;
  }

  private static _reset(): void {
    this._disconnect();
    this._resBuff = {};
    this._openTimeInfo = {};
  }

  private static _reportHandler(): void {
    if (!this._isHistoryVersionDesign()) {
      const openInfo = this._calcOpenInfo();
      if (openInfo) {
        const timeData = this._getOpenTimeData(openInfo);
        this._resBuff.timeData = timeData;
        logger.info(JSON.stringify(this._resBuff), true);
      }
    }
    this._reset();
  }

  private static _tryReport(): void {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this._reportHandler();
    }, this.DEFAULT_RES_DELAY);
  }

  private static _startPerformanceObserver = (list: PerformanceObserverEntryList): void => {
    const entries = list.getEntriesByType("resource");
    OpenUtil._logResourceList(entries);
  };

  private static _signalCreatedHandler = (): void => {
    OpenUtil._disconnect();
  };
}