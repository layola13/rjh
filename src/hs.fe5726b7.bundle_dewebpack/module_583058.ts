enum SliderEventsEnum {
  valueChangeStart = "valuechangestart",
  valueChanged = "valuechanged",
  valueChangeEnd = "valuechangeend"
}

interface SliderRange {
  min: number;
  max: number;
}

interface SliderDimension {
  show?: boolean;
  unit?: string;
}

interface SliderPopover {
  placement: string;
  trigger: string;
  text: string;
}

interface SliderOptions {
  value?: number;
  dimension?: SliderDimension;
  showRangeline?: boolean;
  disabled?: boolean;
  popover?: SliderPopover;
}

interface RangeLine {
  show?: boolean;
  startPos?: number;
}

interface SliderEventDetail {
  input: Slider;
  value?: number;
}

class Slider {
  public domElement: HTMLElement | undefined;
  private _sliderElement: HTMLElement | undefined;
  private _rangeLine: RangeLine = {};
  private _min: number = 0;
  private _max: number = 0;
  private _value: number = 0;
  private parentElement: JQuery<HTMLElement> | undefined;

  constructor(element: string | HTMLElement, range: SliderRange, options: SliderOptions = {}) {
    this._initValue(range, options);
    this._init(element, range, options);
  }

  public static create(element: string | HTMLElement, range: SliderRange, options?: SliderOptions): Slider {
    return new Slider(element, range, options);
  }

  public setValue(value: number): void {
    this._value = value;
    $(this._sliderElement).slider("option", "value", value);
    this._updateRangeLine();
  }

  public getValue(): number {
    return this._value;
  }

  public setDisable(disabled: boolean): void {
    $(this._sliderElement).slider("option", "disabled", disabled);
    this._updateRangeLine();
  }

  public addEventListener(event: string, listener: EventListener, options?: boolean | AddEventListenerOptions): void {
    this.domElement?.addEventListener(event, listener, options);
  }

  public removeEventListener(event: string, listener: EventListener, options?: boolean | EventListenerOptions): void {
    this.domElement?.removeEventListener(event, listener, options);
  }

  private _dispatchEvent(eventType: string, detail: Partial<SliderEventDetail>): void {
    const eventDetail: SliderEventDetail = {
      input: this,
      ...detail
    };

    const customEvent = document.createEvent("CustomEvent");
    customEvent.initCustomEvent(eventType, true, true, eventDetail);
    this.domElement?.dispatchEvent(customEvent);
  }

  private _onSliderStart(event: Event): void {
    this._dispatchEvent(SliderEventsEnum.valueChangeStart, {});
  }

  private _onSlider(event: Event, ui: { value: number }): void {
    this._dispatchEvent(SliderEventsEnum.valueChanged, {
      value: ui.value
    });
  }

  private _onSliderStop(event: Event, ui: { value: number }): void {
    this._dispatchEvent(SliderEventsEnum.valueChangeEnd, {
      value: ui.value
    });
  }

  private _init(element: string | HTMLElement, range: SliderRange, options: SliderOptions): void {
    this.parentElement = typeof element === "string" 
      ? $(document.querySelector(element) as HTMLElement)
      : $(element);

    const dimension = options.dimension;
    const showRangeline = options.showRangeline;
    this._rangeLine.show = !!showRangeline;

    const initialValue = this._value;
    const htmlContent = this._buildSliderHTML(range, dimension, showRangeline, options);

    if (options.popover) {
      ReactDOM.render(
        React.createElement(
          HSApp.UI.Popover.Heavy,
          {
            placement: options.popover.placement,
            trigger: options.popover.trigger,
            text: ResourceManager.getString(options.popover.text),
            showBtn: true
          },
          React.createElement("span", {
            dangerouslySetInnerHTML: {
              __html: htmlContent
            }
          })
        ),
        this.parentElement[0]
      );
    } else {
      this.parentElement.append(htmlContent);
    }

    this.domElement = this.parentElement.find("div.SliderContainer")[0];
    const sliderElement = $(this.domElement).find("div.Slider")[0];
    this._sliderElement = sliderElement;

    const self = this;
    $(sliderElement).slider({
      min: range.min,
      max: range.max,
      value: initialValue,
      disabled: options.disabled,
      start: function(event: Event, ui: { value: number }) {
        self.setValue(ui.value);
        self._onSliderStart(event);
      },
      slide: function(event: Event, ui: { value: number }) {
        self.setValue(ui.value);
        self._onSlider(event, ui);
      },
      stop: function(event: Event, ui: { value: number }) {
        self.setValue(ui.value);
        self._onSliderStop(event, ui);
      }
    });
  }

  private _initValue(range: SliderRange, options: SliderOptions): void {
    this._min = range.min;
    this._max = range.max;
    this._value = range.min;
    this._rangeLine.startPos = this._fitValue(options.value);
  }

  private _fitValue(value: number | undefined): number {
    if (value === undefined || isNaN(value)) {
      return this._min;
    }

    if (value > this._max) {
      return this._max;
    } else if (value < this._min) {
      return this._min;
    }

    return value;
  }

  private _updateRangeLine(): void {
    if (!this._rangeLine.show || this._rangeLine.startPos === undefined) {
      return;
    }

    const sliderWidth = $(this._sliderElement).width() ?? 0;
    const startPosition = sliderWidth * (this._rangeLine.startPos - this._min) / (this._max - this._min);
    const handle = $(this._sliderElement).find(".ui-slider-handle");
    const handlePosition = $(handle).position()?.left ?? 0;
    const rangeWidth = Math.abs(handlePosition - startPosition);
    const rangeLeft = Math.min(handlePosition, startPosition);

    $(this._sliderElement).find(".rangeLine").css({
      left: rangeLeft,
      width: rangeWidth
    });
  }

  private _buildSliderHTML(
    range: SliderRange,
    dimension: SliderDimension | undefined,
    showRangeline: boolean | undefined,
    options: SliderOptions
  ): string {
    let html = '<div class="SliderContainer"><div class="Slider">';

    if (showRangeline) {
      html += '<div class="rangeLine"></div>';
    }

    html += "</div>";

    if (dimension?.show) {
      const unit = dimension.unit ?? "";
      html += '<div class="dimension">';
      html += `<span class="d1">${range.min}${unit}</span>`;
      
      if (options.value !== undefined && !isNaN(options.value)) {
        html += `<span class="d2">${options.value}${unit}</span>`;
      }
      
      html += `<span class="d3">${range.max}${unit}</span>`;
      html += "</div>";
    }

    html += "</div>";
    return html;
  }
}

export { Slider, SliderEventsEnum };