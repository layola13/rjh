export interface UnitInputCallbacks {
  onValueChange: (event: Event) => void;
  onValueChangeStart: (event: Event) => void;
  onValueChangeEnd: (event: Event) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  onFocus: (event: FocusEvent) => void;
  onBlur: (event: FocusEvent) => void;
}

export interface UnitInputOptions {
  label?: string;
  name: string;
  options: unknown;
  value: number;
  onValueChange?: (event: Event) => void;
  onValueChangeStart?: (event: Event) => void;
  onValueChangeEnd?: (event: Event) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

export interface InputWidget {
  getValue(): number;
  setValue(value: number): void;
  updateOptions(options: unknown): void;
  destroy(): void;
  addEventListener(event: string, listener: (event: Event) => void, useCapture: boolean): void;
}

export interface WidgetFactory {
  create(element: HTMLElement, name: string, options: unknown, value: number): InputWidget;
}

enum UnitInputWidgetEventsEnum {
  valueChanged = 'valueChanged',
  valueChangeStart = 'valueChangeStart',
  valueChangeEnd = 'valueChangeEnd'
}

class UnitInputController {
  disabled: boolean = false;
  callbacks: UnitInputCallbacks;
  inputWidget!: InputWidget;

  constructor(element: HTMLElement, options: UnitInputOptions, widgetFactory: WidgetFactory) {
    this.callbacks = {
      onValueChange: this.nullFunction,
      onValueChangeStart: this.nullFunction,
      onValueChangeEnd: this.nullFunction,
      onKeyDown: this.nullFunction,
      onFocus: this.nullFunction,
      onBlur: this.nullFunction
    };

    const labelHtml = options.label 
      ? `<span class="inputlabel">${options.label}</span>` 
      : '';
    
    const container = $(element).append(`${labelHtml} <span class="lengthinput"></span>`);
    const inputElement = container.children('.lengthinput')[0] as HTMLElement;
    
    const widget = widgetFactory.create(
      inputElement,
      options.name,
      options.options,
      options.value
    );

    widget.addEventListener(
      UnitInputWidgetEventsEnum.valueChanged,
      this.eventListener.bind(this, 'onValueChange'),
      false
    );
    widget.addEventListener(
      UnitInputWidgetEventsEnum.valueChangeStart,
      this.eventListener.bind(this, 'onValueChangeStart'),
      false
    );
    widget.addEventListener(
      UnitInputWidgetEventsEnum.valueChangeEnd,
      this.eventListener.bind(this, 'onValueChangeEnd'),
      false
    );
    widget.addEventListener('keydown', this.eventListener.bind(this, 'onKeyDown'), false);
    widget.addEventListener('focus', this.eventListener.bind(this, 'onFocus'), false);
    widget.addEventListener('blur', this.eventListener.bind(this, 'onBlur'), false);

    this.inputWidget = widget;
    this.updateCallbacks(options);
  }

  update(options?: Partial<UnitInputOptions>): void {
    if (!options) {
      return;
    }

    this.updateCallbacks(options);

    const widget = this.inputWidget;
    
    if (options.value !== undefined && !this.nearlyEquals(options.value, widget.getValue())) {
      widget.setValue(options.value);
    }

    if (options.options) {
      widget.updateOptions(options.options);
    }
  }

  destroy(): void {
    this.inputWidget.destroy();
  }

  /** @deprecated use destroy instead */
  destory(): void {
    console.warn('deprecated, use destroy instead!');
    this.destroy();
  }

  private eventListener(callbackName: keyof UnitInputCallbacks, event: Event): void {
    if (!this.disabled) {
      this.callbacks[callbackName](event);
    }
  }

  private updateCallbacks(options: Partial<UnitInputOptions>): void {
    Object.entries(options).forEach(([key, value]) => {
      if (typeof value === 'function' && key.startsWith('on')) {
        this.callbacks[key as keyof UnitInputCallbacks] = value.bind(this.inputWidget);
      }
    });
  }

  private nullFunction(): void {
    // No operation
  }

  private nearlyEquals(a: number, b: number, epsilon: number = 1e-10): boolean {
    return Math.abs(a - b) < epsilon;
  }
}

export default UnitInputController;