interface IValueChangeProps {
  data: {
    controller?: IValueController;
    onValueChangeStart?: (value: unknown) => void;
    onValueChange?: (value: unknown) => void;
    onValueChangeEnd?: (value: unknown) => void;
  };
}

interface IValueChangeState {
  value: unknown;
}

interface IValueController {
  singalValueChanged: unknown;
  onValueChangeStart?: (value: unknown) => void;
  onValueChanged?: (value: unknown) => void;
  onValueChangeEnd?: (value: unknown) => void;
}

interface ValueChangedEvent {
  data: {
    value: unknown;
  };
}

export class IValueChange extends HSCore.Component<IValueChangeProps, IValueChangeState> {
  private signalHook?: HSCore.Util.SignalHook;
  private controller?: IValueController;
  private deactive?: () => void;

  constructor(props: IValueChangeProps) {
    super(props);

    this.signalHook = new HSCore.Util.SignalHook(this);
    this.onValueChanged = this.onValueChanged.bind(this);

    if (this.props.data.controller) {
      this.controller = this.props.data.controller;
      this.signalHook.listen(this.controller.singalValueChanged, this.onValueChanged);
    }
  }

  onDeactive(): void {
    if (this.controller && this.deactive) {
      this.deactive();
    }
    
    this.signalHook?.dispose();
    this.signalHook = undefined;
  }

  onValueChanged(event: ValueChangedEvent): void {
    this.setState({
      value: event.data.value
    });
  }

  changeStart(value: unknown): void {
    if (this.controller?.onValueChangeStart) {
      this.controller.onValueChangeStart(value);
    } else if (this.props.data.onValueChangeStart) {
      this.props.data.onValueChangeStart(value);
    }
  }

  changed(value: unknown): void {
    if (this.controller?.onValueChanged) {
      this.controller.onValueChanged(value);
    } else if (this.props.data.onValueChange) {
      this.props.data.onValueChange(value);
    }
  }

  changeEnd(value: unknown): void {
    if (this.controller?.onValueChangeEnd) {
      this.controller.onValueChangeEnd(value);
    } else if (this.props.data.onValueChangeEnd) {
      this.props.data.onValueChangeEnd(value);
    }
  }
}