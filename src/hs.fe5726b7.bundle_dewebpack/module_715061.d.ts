/**
 * Unit input widget wrapper module
 * Provides a configurable input component with unit selection capabilities
 */

import { UnitInputWidgetEventsEnum } from './unit-input-widget-events';

/**
 * Configuration options for the unit input widget
 */
export interface UnitInputOptions {
  /** Label text to display above the input */
  label?: string;
  /** Input field name attribute */
  name: string;
  /** Widget-specific configuration options */
  options: UnitInputWidgetOptions;
  /** Initial value for the input */
  value?: number;
  /** Callback fired when the input value changes */
  onValueChange?: (event: Event) => void;
  /** Callback fired when value change starts (e.g., user begins dragging) */
  onValueChangeStart?: (event: Event) => void;
  /** Callback fired when value change ends (e.g., user releases mouse) */
  onValueChangeEnd?: (event: Event) => void;
  /** Callback fired on keyboard input */
  onKeyDown?: (event: KeyboardEvent) => void;
  /** Callback fired when input receives focus */
  onFocus?: (event: FocusEvent) => void;
  /** Callback fired when input loses focus */
  onBlur?: (event: FocusEvent) => void;
}

/**
 * Widget-specific options (structure depends on the actual widget implementation)
 */
export interface UnitInputWidgetOptions {
  [key: string]: unknown;
}

/**
 * Internal callbacks registry
 */
interface Callbacks {
  onValueChange: (event: Event) => void;
  onValueChangeStart: (event: Event) => void;
  onValueChangeEnd: (event: Event) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  onFocus: (event: FocusEvent) => void;
  onBlur: (event: FocusEvent) => void;
}

/**
 * Core input widget interface (from external library)
 */
interface InputWidget {
  getValue(): number;
  setValue(value: number): void;
  updateOptions(options: UnitInputWidgetOptions): void;
  destroy(): void;
  addEventListener(event: string, handler: EventListener, useCapture: boolean): void;
}

/**
 * Widget factory interface
 */
interface WidgetFactory {
  create(
    container: HTMLElement,
    name: string,
    options: UnitInputWidgetOptions,
    value?: number
  ): InputWidget;
}

/**
 * Unit input component wrapper
 * Manages a unit input widget with value controls and event handling
 */
export default class UnitInputComponent {
  /** Whether the component is currently disabled */
  disabled: boolean = false;

  /** Internal event callbacks registry */
  private callbacks: Callbacks;

  /** The underlying input widget instance */
  inputWidget: InputWidget;

  /**
   * Creates a new unit input component
   * @param container - Target DOM element or jQuery selector
   * @param config - Configuration options for the input widget
   * @param factory - Factory for creating the underlying widget
   */
  constructor(
    container: HTMLElement | string,
    config: UnitInputOptions,
    factory: WidgetFactory
  ) {
    this.callbacks = {
      onValueChange: HSCore.Util.Object.nullFunction,
      onValueChangeStart: HSCore.Util.Object.nullFunction,
      onValueChangeEnd: HSCore.Util.Object.nullFunction,
      onKeyDown: HSCore.Util.Object.nullFunction,
      onFocus: HSCore.Util.Object.nullFunction,
      onBlur: HSCore.Util.Object.nullFunction,
    };

    const labelHtml = config.label
      ? `<span class="inputlabel">${config.label}</span>`
      : '';
    const $container = $(container).append(
      `${labelHtml} <span class="lengthinput"></span>`
    );

    const inputElement = $container.children('.lengthinput')[0];
    const widget = factory.create(
      inputElement,
      config.name,
      config.options,
      config.value
    );

    // Register event listeners
    widget.addEventListener(
      UnitInputWidgetEventsEnum.valueChanged,
      this._eventListener.bind(this, 'onValueChange'),
      false
    );
    widget.addEventListener(
      UnitInputWidgetEventsEnum.valueChangeStart,
      this._eventListener.bind(this, 'onValueChangeStart'),
      false
    );
    widget.addEventListener(
      UnitInputWidgetEventsEnum.valueChangeEnd,
      this._eventListener.bind(this, 'onValueChangeEnd'),
      false
    );
    widget.addEventListener(
      'keydown',
      this._eventListener.bind(this, 'onKeyDown'),
      false
    );
    widget.addEventListener(
      'focus',
      this._eventListener.bind(this, 'onFocus'),
      false
    );
    widget.addEventListener(
      'blur',
      this._eventListener.bind(this, 'onBlur'),
      false
    );

    this.inputWidget = widget;
    this._updateCallbacks(config);
  }

  /**
   * Updates the component configuration
   * @param config - Partial configuration to update
   */
  update(config?: Partial<UnitInputOptions>): void {
    if (!config) {
      return;
    }

    this._updateCallbacks(config);

    const widget = this.inputWidget;
    if (
      config.value !== undefined &&
      !HSCore.Util.Math.nearlyEquals(config.value, widget.getValue())
    ) {
      widget.setValue(config.value);
    }

    if (config.options) {
      widget.updateOptions(config.options);
    }
  }

  /**
   * Destroys the component and cleans up resources
   */
  destroy(): void {
    this.inputWidget.destroy();
  }

  /**
   * @deprecated Use destroy() instead
   */
  destory(): void {
    console.warn('deprecated, use destroy instead!');
    this.destroy();
  }

  /**
   * Internal event listener dispatcher
   * @param callbackName - Name of the callback to invoke
   * @param event - Event object passed to the callback
   */
  private _eventListener(callbackName: keyof Callbacks, event: Event): void {
    if (this.disabled) {
      return;
    }
    this.callbacks[callbackName](event as never);
  }

  /**
   * Updates callback functions from configuration
   * @param config - Configuration containing callback functions
   */
  private _updateCallbacks(config: Partial<UnitInputOptions>): void {
    Object.entries(config).forEach(([key, value]) => {
      if (typeof value === 'function' && key.startsWith('on')) {
        this.callbacks[key as keyof Callbacks] = value.bind(this.inputWidget);
      }
    });
  }
}