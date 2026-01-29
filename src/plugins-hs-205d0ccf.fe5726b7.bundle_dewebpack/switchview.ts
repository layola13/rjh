interface SwitchViewState {
  currViewMode: string;
}

interface SwitchViewProps {}

interface App {
  primaryViewMode: string;
  is2DViewActive(): boolean;
  is3DViewActive(): boolean;
  switchTo2DView(): void;
  switchTo3DView(): void;
}

interface HSAppNamespace {
  App: {
    getApp(): App;
  };
}

declare const HSApp: HSAppNamespace;

export class SwitchView extends React.Component<SwitchViewProps, SwitchViewState> {
  private _app: App;

  constructor(props: SwitchViewProps) {
    super(props);
    this._app = HSApp.App.getApp();
    this.state = {
      currViewMode: this._app.primaryViewMode
    };
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  private handleSwitch(viewMode: '2d' | '3d'): void {
    if (this._app.is2DViewActive() && viewMode === '3d') {
      this._app.switchTo3DView();
    } else if (!this._app.is2DViewActive() && viewMode === '2d') {
      this._app.switchTo2DView();
    }
    
    this.setState({
      currViewMode: this._app.primaryViewMode
    });
  }

  render(): JSX.Element {
    const is2DActive = this._app.is2DViewActive();
    const is3DActive = this._app.is3DViewActive();

    return (
      <div className="spark_pic_switch-view-container">
        <div
          className={`switch-item ${is2DActive ? 'switch-active' : ''}`}
          onClick={() => this.handleSwitch('2d')}
        >
          2D
        </div>
        <div
          className={`switch-item switch-3d ${is3DActive ? 'switch-active' : ''}`}
          onClick={() => this.handleSwitch('3d')}
        >
          3D
        </div>
      </div>
    );
  }
}