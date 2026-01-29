import { EventGroupEnum, EventTrack } from '../util/EventTrack';
import { Signal } from '../core/util/Signal';
import { IPlugin } from './IPlugin';
import { HSFPConstants } from '../constants';
import { OpenUtil } from '../util/OpenUtil';
import { Operation } from '../operation/Operation';

interface PerformanceMetrics {
  timePageStartup?: number;
  timeAppReady?: number;
  timeOpenDesign?: number;
  timeResoureLoaded?: number;
  loadingApp?: number;
  openDesign?: number;
  publishVersion?: string;
  publishVersionByType?: string;
}

interface ResourceEntry {
  name: string;
  startTime: number;
  duration: number;
  transferSize: number;
  responseEnd: number;
}

interface ResourceMetrics {
  [key: string]: ResourceEntry[] | PerformanceMetrics;
  LoadingApp?: ResourceEntry[];
  OpenDesign?: ResourceEntry[];
  timeData?: PerformanceMetrics;
}

interface PluginActivateOptions {
  app: HSApp.App;
}

interface EventTag {
  time?: number;
}

interface PerformanceObserverEntryList {
  getEntriesByType(type: string): PerformanceResourceTiming[];
}

const PERFORMANCE_LOG = log.logger('HSApp.Plugin.Metrics.Performance');
PERFORMANCE_LOG.silence = true;

const LOADING_APP_PHASE = 'LoadingApp';
const OPEN_DESIGN_PHASE = 'OpenDesign';
const RESOURCE_READY_TIMEOUT = 90000;

let resourceMetrics: ResourceMetrics = {};
let appReadyTime = 0;

function getPerformanceMetrics(): PerformanceMetrics {
  const designId = HSApp.App.getApp().designMetadata.get('designId');
  if (!designId) {
    return {};
  }

  const eventTrack = EventTrack.instance();
  const beginTag = eventTrack.getTag(EventGroupEnum.OpenDesign, 'begin');
  const readyTag = eventTrack.getTag(EventGroupEnum.OpenDesign, 'ready');

  let openDesignTime = 0;
  let appReadyTimestamp = 0;
  const resourceLoadedTime = Date.now();
  const pageStartupTime = performance.timeOrigin;

  if (beginTag?.time) {
    openDesignTime = beginTag.time;
  }

  if (readyTag?.time) {
    appReadyTimestamp = readyTag.time;
  }

  return {
    timePageStartup: pageStartupTime,
    timeAppReady: appReadyTimestamp,
    timeOpenDesign: openDesignTime,
    timeResoureLoaded: resourceLoadedTime,
    loadingApp: appReadyTimestamp - pageStartupTime,
    openDesign: resourceLoadedTime - openDesignTime,
    publishVersion: window.publishVersion,
    publishVersionByType: window.publishVersionByType,
  };
}

function calculateAppReadyTime(): void {
  if (appReadyTime > 0) {
    return;
  }

  const readyTag = EventTrack.instance().getTag(EventGroupEnum.OpenDesign, 'ready');
  if (readyTag?.time) {
    appReadyTime = readyTag.time - performance.timeOrigin;
  }
}

function collectResourceEntries(entries: PerformanceResourceTiming[]): void {
  calculateAppReadyTime();

  entries.forEach((entry) => {
    const phase = appReadyTime > 0 && entry.startTime > appReadyTime 
      ? OPEN_DESIGN_PHASE 
      : LOADING_APP_PHASE;

    if (!resourceMetrics[phase]) {
      resourceMetrics[phase] = [];
    }

    (resourceMetrics[phase] as ResourceEntry[]).push({
      name: entry.name,
      startTime: entry.startTime,
      duration: entry.duration,
      transferSize: entry.transferSize,
      responseEnd: entry.responseEnd,
    });
  });
}

class Ticker {
  constructor(private app: HSApp.App) {}

  documentReady(): void {
    // Document ready implementation
  }

  start(): void {
    // Start ticker implementation
  }
}

class Command {
  constructor(private app: HSApp.App) {}

  init(): void {
    // Initialize command implementation
  }

  clear(): void {
    // Clear command implementation
  }
}

class NetworkDetect {
  constructor(private app: HSApp.App) {}

  detectToolNetworkByRes(): unknown {
    // Network detection implementation
    return null;
  }
}

function logPerformanceMetrics(): void {
  const previousSilence = PERFORMANCE_LOG.silence;
  PERFORMANCE_LOG.silence = false;

  const metrics = getPerformanceMetrics();
  PERFORMANCE_LOG.info(JSON.stringify(metrics), true);

  PERFORMANCE_LOG.silence = previousSilence;
}

export class MetricsPlugin extends IPlugin {
  public signalMouseEvent: Signal<MouseEvent>;
  private perfObserver?: PerformanceObserver;
  private ticker?: Ticker;
  private command?: Command;
  private networkDetect?: NetworkDetect;

  constructor() {
    super({
      name: 'Metrics Plugin',
      description: 'Metrics tracking',
      dependencies: [
        'hsw.plugin.loadingfeedback.Plugin',
        HSFPConstants.PluginType.Persistence,
      ],
    });

    this.signalMouseEvent = new Signal(this);
  }

  private startPerformanceObserver(entryList: PerformanceObserverEntryList): void {
    const resourceEntries = entryList.getEntriesByType('resource');
    collectResourceEntries(resourceEntries);
  }

  public onActive(options: PluginActivateOptions): void {
    super.onActive(options);

    const app = options.app;
    OpenUtil.active(app);

    if (!this.perfObserver) {
      this.perfObserver = new PerformanceObserver(this.startPerformanceObserver.bind(this));
    }

    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    this.perfObserver.observe({ entryTypes: ['resource'] });
    collectResourceEntries(resourceEntries);

    this.ticker = new Ticker(app);
    this.command = new Command(app);
    this.networkDetect = new NetworkDetect(app);

    app.signalOpenDocumentResourceLoaded.listen(() => {
      this.ticker?.documentReady();
      logPerformanceMetrics();
    }, this);

    app.signalDocumentOpening.listen(() => {
      PERFORMANCE_LOG.debug('signalDocumentOpening received');

      if (!this.perfObserver) {
        this.perfObserver = new PerformanceObserver(this.startPerformanceObserver.bind(this));
      }

      this.perfObserver.observe({ entryTypes: ['resource'] });

      setTimeout(() => {
        const metrics = getPerformanceMetrics();
        resourceMetrics.timeData = { ...metrics };
        PERFORMANCE_LOG.info(JSON.stringify(resourceMetrics), true);
        this.perfObserver?.disconnect();
        resourceMetrics = {};
      }, RESOURCE_READY_TIMEOUT);
    }, this);

    window.addEventListener('mousedown', this.dispatchMouseEvent.bind(this), true);

    if (HSApp.Config.FPS_LOG_TICKER) {
      this.ticker.start();
    }

    this.command.init();
    Operation.active(app);
  }

  private dispatchMouseEvent(event: MouseEvent): void {
    this.signalMouseEvent.dispatch(event);
  }

  public detectToolNetwork(): unknown {
    return this.networkDetect?.detectToolNetworkByRes();
  }

  public onDeactive(): void {
    this.command?.clear();
    OpenUtil.clear();
    Operation.clear();
  }
}

HSApp.Plugin.registerPlugin('hsw.plugin.metrics.Plugin', MetricsPlugin);