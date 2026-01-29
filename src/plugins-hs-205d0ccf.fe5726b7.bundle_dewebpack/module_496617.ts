interface SliderOptions {
  readOnly: boolean;
  rules: {
    range: {
      min: number;
      max: number;
    };
  };
}

interface SliderData {
  value: number;
  onValueChange: (value: number) => void;
  options: {
    rules: {
      range: {
        min: number;
        max: number;
      };
    };
  };
}

interface ButtonData {
  tooltip: string;
  onclick: () => void;
}

interface ZoomViewData {
  sliderData: SliderData;
  zoomOutData: ButtonData;
  zoomInData: ButtonData;
  environment?: number;
  disable?: boolean;
  tooltipClassName?: string;
  useWhiteIcon?: boolean;
}

interface ZoomViewProps {
  data: ZoomViewData;
}

interface ZoomViewState {
  value: number;
}

interface ViewBoxChangedEvent {
  data: {
    scaleChanged: boolean;
  };
}

interface View2D {
  signalViewBoxChanged: {
    listen: (callback: (event?: ViewBoxChangedEvent) => void, context: any) => void;
    unlisten: (callback: (event?: ViewBoxChangedEvent) => void, context: any) => void;
  };
  getMinViewBoxWidth: () => number;
  getViewBox: () => { width: number };
}

interface MixpaintCanvas {
  viewBoxChanged?: boolean;
  signalViewBoxChanged?: {
    listen: (callback: () => void, context: any) => void;
    unlisten: (callback: () => void, context: any) => void;
  };
  zoomValue: number;
}

interface App {
  getMain2DView: () => View2D;
  getAux2DView: () => View2D;
  is3DViewActive: () => boolean;
}

declare const HSApp: {
  App: {
    getApp: () => App;
  };
  PaintPluginHelper: {
    UI: {
      MixpaintCanvas?: MixpaintCanvas;
    };
  };
};

declare const HSFPConstants: {
  Environment: {
    Default: number;
    Render: number;
    ManualLighting: number;
    CustomizedCeilingModel: number;
    CustomizedBackgroundWall: number;
    CustomizedPlatform: number;
    NCustomizedCeilingModel: number;
    NCustomizedBackgroundWall: number;
    NCustomizedPlatform: number;
    ConcealedWorkV2: number;
    MixPaint: number;
  };
};

declare const HSCore: {
  Util: {
    Math: {
      nearlyEquals: (a: number, b: number) => boolean;
    };
  };
};

const ZOOM_SCALE_FACTOR = 1.11;

class ZoomView extends React.Component<ZoomViewProps, ZoomViewState> {
  static defaultProps: Partial<ZoomViewProps> = {
    data: {} as ZoomViewData,
  };

  private isClickSlider: boolean = false;
  private _app: App;
  private mixpaintCanvas?: MixpaintCanvas;

  constructor(props: ZoomViewProps) {
    super(props);
    const sliderData = props.data.sliderData;
    this.state = {
      value: sliderData.value,
    };
    this._app = HSApp.App.getApp();
    this.listen(props);
  }

  UNSAFE_componentWillReceiveProps(nextProps: ZoomViewProps): void {
    this.setState({
      value: nextProps.data.sliderData.value,
    });
    this.unlisten();
    this.listen(nextProps);
  }

  componentWillUnmount(): void {
    this.unlisten();
  }

  private listen(props: ZoomViewProps): void {
    const { data } = props;
    const { environment } = data;

    if (
      environment === HSFPConstants.Environment.Default ||
      environment === HSFPConstants.Environment.Render ||
      environment === HSFPConstants.Environment.ManualLighting ||
      environment === HSFPConstants.Environment.CustomizedCeilingModel ||
      environment === HSFPConstants.Environment.CustomizedBackgroundWall ||
      environment === HSFPConstants.Environment.CustomizedPlatform ||
      environment === HSFPConstants.Environment.NCustomizedCeilingModel ||
      environment === HSFPConstants.Environment.NCustomizedBackgroundWall ||
      environment === HSFPConstants.Environment.NCustomizedPlatform ||
      environment === HSFPConstants.Environment.ConcealedWorkV2
    ) {
      this._app.getMain2DView().signalViewBoxChanged.listen(this.updateMainCanvasSliderValue, this);
    } else if (environment === HSFPConstants.Environment.MixPaint) {
      this.mixpaintCanvas = HSApp.PaintPluginHelper.UI.MixpaintCanvas;
      if (this.mixpaintCanvas?.viewBoxChanged && this.mixpaintCanvas.signalViewBoxChanged) {
        this.mixpaintCanvas.signalViewBoxChanged.listen(this.updateMixpaintSliderValue, this);
      }
    }
  }

  private unlisten(): void {
    if (this.mixpaintCanvas?.viewBoxChanged && this.mixpaintCanvas.signalViewBoxChanged) {
      this.mixpaintCanvas.signalViewBoxChanged.unlisten(this.updateMixpaintSliderValue, this);
    }
    if (this._app?.getMain2DView().signalViewBoxChanged) {
      this._app.getMain2DView().signalViewBoxChanged.unlisten(this.updateMainCanvasSliderValue, this);
    }
  }

  private updateMixpaintSliderValue = (): void => {
    if (!this.isClickSlider && this.mixpaintCanvas) {
      const zoomValue = this.mixpaintCanvas.zoomValue;
      if (!HSCore.Util.Math.nearlyEquals(zoomValue, this.state.value)) {
        this.setState({ value: zoomValue });
      }
    }
  };

  private updateAuxCanvasSliderValue = (event: ViewBoxChangedEvent): void => {
    this._updateViewSliderValue(event, this._app.getAux2DView());
  };

  private updateMainCanvasSliderValue = (event?: ViewBoxChangedEvent): void => {
    this._updateViewSliderValue(event, this._app.getMain2DView());
  };

  private _updateViewSliderValue(event: ViewBoxChangedEvent | undefined, view: View2D): void {
    if (!this.isClickSlider && !this._app.is3DViewActive() && (!event || event.data.scaleChanged)) {
      const minViewBoxWidth = view.getMinViewBoxWidth();
      const currentWidth = view.getViewBox().width;
      const maxRange = this.props.data.sliderData.options.rules.range.max;
      const calculatedValue = maxRange - Math.log(currentWidth / minViewBoxWidth) / Math.log(ZOOM_SCALE_FACTOR);
      
      this.setState({ value: calculatedValue });
    }
  }

  render(): React.ReactElement {
    const disabled = this.props.data.disable ?? false;

    const zoomOutButtonData = {
      tooltipClassName: this.props.data.tooltipClassName ?? "dark-arc-tooltip",
      imgShowType: "hs_mian_suoxiao",
      imgNormalColor: this.props.data.useWhiteIcon ? "white" : "#1C1C1C",
      tooltip: this.props.data.zoomOutData.tooltip,
      hasBottomTriangle: false,
      onclick: this.props.data.zoomOutData.onclick,
      tooltipColor: "dark",
    };

    const sliderConfig = {
      className: "",
      label: "",
      value: this.state.value,
      delay: false,
      onValueChangeStart: () => {
        this.isClickSlider = true;
      },
      onValueChange: (value: number) => {
        this.props.data.sliderData.onValueChange(value);
      },
      onValueChangeEnd: () => {
        this.isClickSlider = false;
      },
      options: {
        readOnly: false,
        rules: {
          range: {
            min: this.props.data.sliderData.options.rules.range.min,
            max: this.props.data.sliderData.options.rules.range.max,
          },
        },
      },
    };

    const zoomInButtonData = {
      className: "right-zoomin-button",
      tooltipClassName: this.props.data.tooltipClassName ?? "dark-arc-tooltip",
      imgShowType: "hs_mian_fangda",
      imgNormalColor: this.props.data.useWhiteIcon ? "white" : "#1C1C1C",
      tooltip: this.props.data.zoomInData.tooltip,
      hasBottomTriangle: false,
      onclick: this.props.data.zoomInData.onclick,
      tooltipColor: "dark",
    };

    return (
      <div className={`zoom-view-wrapper ${disabled ? "disable" : ""}`}>
        <div className="zoom-view-content">
          <IconButton data={zoomOutButtonData} />
          <Slider data={sliderConfig} />
          <IconButton data={zoomInButtonData} />
        </div>
      </div>
    );
  }
}

export default ZoomView;