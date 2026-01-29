import { insertSort } from './utils/sort';

interface ModelObject {
  text: string;
  value: string;
}

interface QueryParams {
  env: string;
  module: string;
  modelObj: ModelObject;
}

interface QueryParamsInput {
  module?: string;
  productType?: string;
  model?: string;
}

interface ProcessingContext {
  env: string;
  module?: string;
  modelObj: ModelObject;
  selected?: unknown;
  productType?: string;
  model?: string;
}

interface FeedbackDataItem {
  id: string;
  priority: number;
  fn: (context: ProcessingContext) => Partial<QueryParams> | null | undefined;
  callback?: (context: ProcessingContext) => void;
}

interface App {
  activeEnvironmentId: string;
  selectionManager: {
    selected: () => unknown[] | undefined;
  };
}

interface HSApp {
  App: {
    getApp: () => App;
  };
}

declare const HSApp: HSApp;

export const handleFeedbackQueryDataArr: FeedbackDataItem[] = [];

/**
 * Manages feedback query data processing and entry data items.
 */
export default class FeedbackQueryManager {
  private _arr: FeedbackDataItem[];

  constructor() {
    this._arr = handleFeedbackQueryDataArr;
  }

  /**
   * Processes query parameters through registered data handlers.
   * @param input - Query parameters input containing module, productType, and model
   * @returns Processed query parameters with env, module, and modelObj
   */
  getQueryParamsData(input: QueryParamsInput): QueryParams {
    const app = HSApp.App.getApp();
    const { module, productType, model } = input;

    let result: QueryParams = {
      env: module || app.activeEnvironmentId,
      module: module || '',
      modelObj: {
        text: '',
        value: ''
      }
    };

    const handlers = this._arr;
    let context: ProcessingContext = {
      ...result,
      selected: app.selectionManager.selected()?.[0],
      productType,
      model
    };

    for (let i = 0; i < handlers.length; i++) {
      const handler = handlers[i];
      const handlerResult = handler.fn(context);

      handler.callback?.(context);

      if (handlerResult) {
        const { env, module: handlerModule, modelObj } = handlerResult;

        result = {
          env: env || result.env,
          module: handlerModule || result.module,
          modelObj: modelObj?.value ? modelObj : result.modelObj
        };

        context = {
          ...context,
          ...handlerResult
        };
      }
    }

    return result;
  }

  /**
   * Adds a new feedback entry data item if it doesn't already exist.
   * @param item - Feedback data item to add
   */
  addHandlingFeedbackEntryDataItem(item: FeedbackDataItem): void {
    const exists = this._arr.some((existingItem) => existingItem.id === item.id);

    if (!exists) {
      this._arr.push(item);
      insertSort(this._arr);
    }
  }

  /**
   * Removes a feedback entry data item by ID.
   * @param id - ID of the item to remove
   */
  deleteFeedbackEntryDataItem(id: string): void {
    const handlers = this._arr;

    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i].id === id) {
        this._arr.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Retrieves all feedback entry data items.
   * @returns Array of all registered feedback data items
   */
  getHandlingFeedbackEntryDataItem(): FeedbackDataItem[] {
    return this._arr;
  }
}