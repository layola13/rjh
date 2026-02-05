// @ts-nocheck
import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import FeedbackHandler from './FeedbackHandler';

interface PluginDependency {
  name: string;
  version?: string;
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface FeedbackEntryOptions {
  isLog?: boolean;
  [key: string]: unknown;
}

interface AppContext {
  app: unknown;
}

interface HandlerInitOptions {
  dependencies: Map<string, unknown>;
  app: unknown;
  signalFeedbackRecordCountNumber: HSCore.Util.Signal;
}

interface HelpCenterFeedbackRecordData {
  [key: string]: unknown;
}

interface FeedbackListOptions {
  [key: string]: unknown;
}

interface FeedbackEntryDataItem {
  id: string;
  [key: string]: unknown;
}

interface SubmitDataHandleItem {
  id: string;
  handler: (data: unknown) => void;
  [key: string]: unknown;
}

class FeedbackPlugin extends HSApp.Plugin.IPlugin {
  private handler?: FeedbackHandler;
  public signalFeedbackRecordCountNumber: HSCore.Util.Signal;

  constructor() {
    super([
      {
        name: 'ezhome feedback plugin v2',
        description: 'ezhome feedback for floorplan',
        dependencies: [
          HSFPConstants.PluginType.CommonUI,
          HSFPConstants.PluginType.Persistence,
          HSFPConstants.PluginType.Toolbar,
          HSFPConstants.PluginType.PageHeader,
          'hsw.plugin.metrics.Plugin'
        ]
      }
    ]);

    this.signalFeedbackRecordCountNumber = new HSCore.Util.Signal(this);
  }

  public onActive(context: AppContext, dependencies: Map<string, unknown>): void {
    this.handler = new FeedbackHandler();
    this.handler.init({
      dependencies,
      app: context.app,
      signalFeedbackRecordCountNumber: this.signalFeedbackRecordCountNumber
    });
  }

  public onDeactive(): void {
    // Cleanup logic if needed
  }

  public showFeedbackEntry(options?: FeedbackEntryOptions): void {
    let isLog = true;

    if (options) {
      isLog = !(typeof options.isLog === 'boolean' && !options.isLog);
    }

    this.handler?.showFeedbackEntry(
      options ? { ...options, isLog } : { isLog }
    );
  }

  public setHelpCenterFeedbackRecordData(data: HelpCenterFeedbackRecordData): void {
    this.handler?.setHelpCenterFeedbackRecordData(data);
  }

  public showFeedbackList(options: FeedbackListOptions): void {
    this.handler?.showFeedbackList(options);
  }

  public getCountNumber(): number | undefined {
    return this.handler?.getCountNumber();
  }

  public addHandlingFeedbackEntryDataItem(item: FeedbackEntryDataItem): void {
    this.handler?.addHandlingFeedbackEntryDataItem(item);
  }

  public deleteFeedbackEntryDataItem(itemId: string): void {
    this.handler?.deleteFeedbackEntryDataItem(itemId);
  }

  public getHandlingFeedbackEntryDataItem(): FeedbackEntryDataItem[] | undefined {
    return this.handler?.getHandlingFeedbackEntryDataItem();
  }

  public addSubmitDataHandleItem(item: SubmitDataHandleItem): void {
    this.handler?.addSubmitDataHandleItem(item);
  }

  public deleteSubmitDataHandleItem(itemId: string): void {
    this.handler?.deleteSubmitDataHandleItem(itemId);
  }

  public getSubmitDataHandleItem(): SubmitDataHandleItem[] | undefined {
    return this.handler?.getSubmitDataHandleItem();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.Feedback, FeedbackPlugin);