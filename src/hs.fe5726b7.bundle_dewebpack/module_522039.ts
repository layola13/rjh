import Signal from './Signal';

interface ValueChangeEvent {
  value: unknown;
}

interface SliderControllerOptions {
  onValueChangeStart?: (value: unknown) => void;
  onValueChanged?: (value: unknown) => void;
  onValueChangeEnd?: (value: unknown) => void;
}

export default class SliderController extends Signal {
  onValueChangeStart?: (value: unknown) => void;
  onValueChanged?: (value: unknown) => void;
  onValueChangeEnd?: (value: unknown) => void;
  singalValueChanged!: Signal<ValueChangeEvent>;

  constructor(options: SliderControllerOptions) {
    super();
    this.onValueChangeStart = options.onValueChangeStart;
    this.onValueChanged = options.onValueChanged;
    this.onValueChangeEnd = options.onValueChangeEnd;
  }

  setValue(value: unknown): void {
    this.singalValueChanged.dispatch({
      value: value
    });
  }

  deactive(): void {
    // Empty implementation
  }
}