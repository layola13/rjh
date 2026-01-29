import { MarkingSystemEntry } from './MarkingSystemEntry';
import { MarkingHistory } from './MarkingHistory';

interface HandlerDependencies {
  [key: string]: unknown;
}

interface HandlerContext {
  [key: string]: unknown;
}

interface HandlerApp {
  [key: string]: unknown;
}

interface InitOptions {
  context: HandlerContext;
  app: HandlerApp;
  dependencies: HandlerDependencies;
}

interface MarkingRecord {
  [key: string]: unknown;
}

type SignalType = 'open' | 'close' | 'submit';

interface SignalPayload {
  type: SignalType;
}

declare global {
  namespace HSCore {
    namespace Util {
      class Signal<T = unknown> {
        dispatch(payload: T): void;
      }
    }
  }
  const React: typeof import('react');
  const ReactDOM: typeof import('react-dom');
}

export class Handler {
  private _markingHistory: MarkingHistory;
  private _caseEntryWidget?: React.ReactElement;
  private _context?: HandlerContext;
  private _app?: HandlerApp;
  public dependencies?: HandlerDependencies;
  public signalMarkingToLog: HSCore.Util.Signal<SignalPayload>;

  constructor() {
    this._markingHistory = new MarkingHistory();
    this.signalMarkingToLog = new HSCore.Util.Signal<SignalPayload>();
  }

  /**
   * Initialize the handler with context, app, and dependencies
   */
  public init(options: InitOptions): void {
    this._context = options.context;
    this._app = options.app;
    this.dependencies = options.dependencies;
    this.renderCaseEntry();
  }

  /**
   * Render the case entry widget
   */
  public renderCaseEntry(): void {
    this.signalMarkingToLog.dispatch({ type: 'open' });
    
    const container = document.querySelector('.markingSystemEntry');
    if (container) {
      this._caseEntryWidget = ReactDOM.render(
        React.createElement(MarkingSystemEntry, {
          onClose: this.handleDialogClose,
          onSubmit: this.handleDialogSubmit
        }),
        container
      );
    }
  }

  /**
   * Add a record to marking history
   */
  public addMarkingHistory(record: MarkingRecord): void {
    this._markingHistory.addRecord(record);
  }

  /**
   * Get all marking history records
   */
  public getMarkingHistory(): MarkingRecord[] {
    return this._markingHistory.getRecord();
  }

  private handleDialogClose = (): void => {
    this.signalMarkingToLog.dispatch({ type: 'close' });
  };

  private handleDialogSubmit = (event: unknown): void => {
    this.signalMarkingToLog.dispatch({ type: 'submit' });
  };
}