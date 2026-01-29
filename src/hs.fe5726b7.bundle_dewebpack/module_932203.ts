interface ValueChangeEvent<T = any> {
  data: {
    value: T;
  };
}

interface ValueController<T = any> {
  singalValueChanged: any;
  onValueChangeStart?: (event: ValueChangeEvent<T>) => void;
  onValueChanged?: (event: ValueChangeEvent<T>) => void;
  onValueChangeEnd?: (event: ValueChangeEvent<T>) => void;
}

interface IValueChangeProps<T = any> {
  data: {
    controller?: ValueController<T>;
    onValueChangeStart?: (event: ValueChangeEvent<T>) => void;
    onValueChange?: (event: ValueChangeEvent<T>) => void;
    onValueChangeEnd?: (event: ValueChangeEvent<T>) => void;
  };
}

interface IValueChangeState<T = any> {
  value: T;
}

declare namespace HSCore {
  namespace Util {
    class SignalHook {
      constructor(owner: any);
      listen(signal: any, callback: (event: any) => void): void;
      unlistenAll(): void;
      dispose(): void;
    }
  }
}

export function IValueChange<P extends IValueChangeProps, S extends IValueChangeState>(
  BaseComponent: new (props: P) => any
) {
  return class extends BaseComponent {
    signalHook: HSCore.Util.SignalHook | undefined;
    controller: ValueController | undefined;
    deactive?: () => void;

    constructor(props: P) {
      super(props);
      
      this.signalHook = new HSCore.Util.SignalHook(this);
      this.onValueChanged = this.onValueChanged.bind(this);
      
      if (this.props.data.controller) {
        this.controller = this.props.data.controller;
        this.signalHook.listen(
          this.controller.singalValueChanged,
          this.onValueChanged
        );
      }
    }

    updateController(props: P): void {
      if (props.data.controller !== this.controller) {
        this.controller = props.data.controller;
        this.signalHook?.unlistenAll();
        
        if (this.controller) {
          this.signalHook?.listen(
            this.controller.singalValueChanged,
            this.onValueChanged
          );
        }
      }
    }

    onDeactive(): void {
      if (this.controller && this.deactive) {
        this.deactive();
      }
      
      this.signalHook?.dispose();
      this.signalHook = undefined;
    }

    onValueChanged(event: ValueChangeEvent): void {
      this.setState({
        value: event.data.value
      });
    }

    changeStart(event: ValueChangeEvent): void {
      if (this.controller?.onValueChangeStart) {
        this.controller.onValueChangeStart(event);
      } else if (this.props.data.onValueChangeStart) {
        this.props.data.onValueChangeStart(event);
      }
    }

    changed(event: ValueChangeEvent): void {
      if (this.controller?.onValueChanged) {
        this.controller.onValueChanged(event);
      } else if (this.props.data.onValueChange) {
        this.props.data.onValueChange(event);
      }
    }

    changeEnd(event: ValueChangeEvent): void {
      if (this.controller?.onValueChangeEnd) {
        this.controller.onValueChangeEnd(event);
      } else if (this.props.data.onValueChangeEnd) {
        this.props.data.onValueChangeEnd(event);
      }
    }
  };
}