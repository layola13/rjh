import { HSCore } from './HSCore';
import React from 'react';
import ReactDOM from 'react-dom';
import { CompassWidget } from './CompassWidget';

const COMPASS_DEGREE_KEY = 'compass_degree';

interface App {
  signalViewActivated: any;
  signalDocumentOpened: any;
  signalDocumentClosed: any;
  signalMetadataChanged: any;
  layoutMgr: {
    register: (name: string, element: Element | null) => void;
  };
  designMetadata: {
    get: (key: string) => number | undefined;
    set: (key: string, value: number) => void;
  };
}

interface InitOptions {
  app: App;
  noUI?: boolean;
}

interface ViewActivatedEvent {
  data: {
    newView: {
      name: string;
    };
  };
}

interface MetadataChangedEvent {
  data: {
    attributes?: {
      [key: string]: number;
    };
  };
}

interface CompassWidgetInstance {
  updateDegree: (degree: number) => void;
  show: () => void;
  hide: () => void;
}

export class Handler {
  private signalHook: HSCore.Util.SignalHook;
  private autoShowHide: boolean;
  private app?: App;
  private compassWidgetRef: React.RefObject<CompassWidgetInstance>;

  constructor() {
    this.compassWidgetRef = React.createRef<CompassWidgetInstance>();
    this.setDegree = this.setDegree.bind(this);
    this.signalHook = new HSCore.Util.SignalHook(this);
    this.autoShowHide = true;
  }

  public init(options: InitOptions): void {
    this.app = options.app;

    if (!options.noUI) {
      this.renderCompassWidget();
    }

    this.signalHook
      .listen(this.app.signalViewActivated, this.onViewActivated)
      .listen(this.app.signalDocumentOpened, this._onDocumentOpened)
      .listen(this.app.signalDocumentClosed, this.onDocumentClosed)
      .listen(this.app.signalMetadataChanged, this.onMetadataChanged);
  }

  private onMetadataChanged(event: MetadataChangedEvent): void {
    if (event.data.attributes?.hasOwnProperty(COMPASS_DEGREE_KEY)) {
      this.compassWidgetRef.current?.updateDegree(
        event.data.attributes[COMPASS_DEGREE_KEY]
      );
    }
  }

  private _onDocumentOpened(): void {
    this.compassWidgetRef.current?.updateDegree(this.getDegree());
  }

  private onDocumentClosed(): void {
    this.compassWidgetRef.current?.updateDegree(0);
  }

  private onViewActivated(event: ViewActivatedEvent): void {
    if (this.autoShowHide) {
      if (event.data.newView.name === 'svg') {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  private renderCompassWidget(): void {
    ReactDOM.render(
      React.createElement(CompassWidget, {
        degree: this.getDegree(),
        onDragStop: this.setDegree,
        ref: this.compassWidgetRef
      }),
      document.querySelector('.compasscontainer'),
      () => {
        this.app?.layoutMgr.register(
          'compassWidget',
          document.querySelector('.compasswidget')
        );
      }
    );
  }

  public isAutoShowHide(): boolean {
    return this.autoShowHide;
  }

  public setAutoShowHide(enabled: boolean): void {
    this.autoShowHide = enabled;
  }

  public show(): void {
    this.compassWidgetRef.current?.show();
  }

  public hide(): void {
    this.compassWidgetRef.current?.hide();
  }

  public setDegree(degree: number): void {
    this.app?.designMetadata.set(COMPASS_DEGREE_KEY, degree);
  }

  public getDegree(): number {
    return this.app?.designMetadata.get(COMPASS_DEGREE_KEY) ?? 0;
  }
}