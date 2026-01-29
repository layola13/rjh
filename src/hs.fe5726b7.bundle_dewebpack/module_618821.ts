interface NumberInputOptions {
  id: string;
  label: string;
  value?: number;
  readOnly: boolean;
  range: { min?: number; max?: number } | null;
  hasSpinner: boolean;
  step: number;
  showErrorMsg: boolean;
  errorMsg: string;
  placeholder: string;
  autoTunning: boolean;
  onValueChangeEnd?: (value: number) => void;
  onValueChangeStart?: () => void;
  onValueChange?: (value: number) => void;
  onInvalidInput?: () => void;
}

class NumberInputWidget {
  private instance: JQuery;

  constructor(element: HTMLElement | string, options: Partial<NumberInputOptions>) {
    this.instance = $(element).cnumberinputwidget(options);
  }

  static create(element: HTMLElement | string, options: Partial<NumberInputOptions>): NumberInputWidget {
    return new NumberInputWidget(element, options);
  }

  isValid(): boolean {
    return this.instance.cnumberinputwidget("isValid");
  }

  setErrorStatus(): void {
    this.instance.cnumberinputwidget("setErrorStatus");
  }

  setValue(value: number): void {
    this.instance.cnumberinputwidget("onInputTextChanged", value);
  }

  destroy(): void {
    this.instance.cnumberinputwidget("destroy");
  }

  setDisable(disabled: boolean): void {
    this.instance.cnumberinputwidget("onDisableStateChanged", disabled);
  }

  updateMinValue(minValue: number): void {
    this.instance.cnumberinputwidget("onMinValueChanged", minValue);
  }

  updateMaxValue(maxValue: number): void {
    this.instance.cnumberinputwidget("onMaxValueChanged", maxValue);
  }
}

$.widget("custom.cnumberinputwidget", {
  widgetEventPrefix: "cnumberinputwidget",

  options: {
    id: "",
    label: "",
    value: undefined,
    readOnly: false,
    range: null,
    hasSpinner: false,
    step: 1,
    showErrorMsg: false,
    errorMsg: "",
    placeholder: "",
    autoTunning: true,
    onValueChangeEnd: undefined,
    onValueChangeStart: undefined,
    onValueChange: undefined,
    onInvalidInput: undefined
  } as NumberInputOptions,

  database: undefined as number | undefined,
  _isValid: true,
  pressTimer: undefined as number | undefined,

  _precision(): number {
    let precision = this._precisionOf(this.options.step);
    if (this.options.range !== null && this.options.range.min) {
      precision = Math.max(precision, this._precisionOf(this.options.range.min));
    }
    return precision;
  },

  _precisionOf(value: number): number {
    const valueStr = value.toString();
    const dotIndex = valueStr.indexOf(".");
    return dotIndex === -1 ? 0 : valueStr.length - dotIndex - 1;
  },

  onMinValueChanged(minValue: number): void {
    if (this.options.range) {
      this.options.range.min = minValue;
    }
  },

  onMaxValueChanged(maxValue: number): void {
    if (this.options.range) {
      this.options.range.max = maxValue;
    }
  },

  setErrorStatus(): void {
    this._isValid = false;
    this._$("input").addClass("error");
    this._$(".errorMsg").html(this.options.errorMsg);
  },

  setNormalStatus(): void {
    this._isValid = true;
    this._$("input").removeClass("error");
    this._$(".errorMsg").html("");
  },

  isValid(): boolean {
    const value = this._$(".inputwidgets input").val() as string;
    return this._isValidInput(value);
  },

  _isValidInput(value: string | number): boolean {
    if (!new RegExp("^-?[0-9.]*$").exec(String(value))) {
      return false;
    }

    let maxValue = Number.MAX_SAFE_INTEGER;
    let minValue = Number.MIN_SAFE_INTEGER;

    if (this.options.range && this.options.range.min != null) {
      minValue = this.options.range.min;
    }

    if (this.options.range && this.options.range.max) {
      maxValue = this.options.range.max;
    }

    const numValue = Number(value);
    return !(numValue < minValue || numValue > maxValue);
  },

  onInputTextChanged(value: string | number): void {
    this.setNormalStatus();

    if (value !== "-" && value !== "") {
      if (this._isValidInput(value)) {
        this.setDataBase(Number(value));
        this._$("input").val(this.database);
        this.options.onValueChange?.(this.database!);
      } else {
        this.onInvalidInput();
      }
    }
  },

  onDisableStateChanged(disabled: boolean): void {
    if (disabled) {
      this._$(".inputwidgets input").addClass("readonly");
      this._$(".inputwidgets input").attr("readonly", true);
    } else {
      this._$(".inputwidgets input").removeClass("readonly");
      this._$(".inputwidgets input").attr("readonly", false);
    }
  },

  onInvalidInput(): void {
    this.setErrorStatus();
    this.options.onInvalidInput?.();
  },

  setDataBase(value: number): void {
    this.database = parseFloat(parseFloat(String(value)).toFixed(this._precision()));
  },

  initEvent(): void {
    const self = this;

    this._$(".inputwidgets input").keyup(function(event) {
      const value = $(this).val() as string;
      self.onInputTextChanged(value);
    });

    this._$(".inputwidgets input").keydown(function(event) {
      if (event.keyCode === 38) {
        self._fineTuning(true);
      } else if (event.keyCode === 40) {
        self._fineTuning(false);
      } else if (event.keyCode === 8 || event.keyCode === 46) {
        event.stopPropagation();
      } else if (event.keyCode === 13) {
        const value = $(this).val() as string;
        if (self._isValidInput(value)) {
          self.options.onValueChangeEnd?.(parseInt(value));
        }
      }
    });

    this._$(".inputwidgets input").focus(function(event) {
      const value = $(this).val() as string;
      self.setNormalStatus();
      if (!self._isValidInput(value)) {
        self.onInvalidInput();
      }
      self.options.onValueChangeStart?.();
    });

    this._$(".inputwidgets input").blur(function(event) {
      const value = $(this).val() as string;
      self.options.onValueChangeEnd?.(Number(value));
    });

    if (this.options.hasSpinner) {
      this._$(".arrowHit.up").mouseup(function() {
        if (self._isValid) {
          self.clearTimer();
          self.options.onValueChangeEnd?.();
        }
      });

      this._$(".arrowHit.up").mouseout(function() {
        if (self._isValid) {
          self.clearTimer();
          self.options.onValueChangeEnd?.();
        }
      });

      this._$(".arrowHit.up").mousedown(function() {
        if (self._isValid) {
          self.options.onValueChangeStart?.();
          self.clearTimer();
          self.fireFineTuning(true);
        }
      });

      this._$(".arrowHit.down").mouseup(function() {
        if (self._isValid) {
          self.clearTimer();
          self.options.onValueChangeEnd?.();
        }
      });

      this._$(".arrowHit.down").mouseout(function() {
        if (self._isValid) {
          self.clearTimer();
          self.options.onValueChangeEnd?.();
        }
      });

      this._$(".arrowHit.down").mousedown(function() {
        if (self._isValid) {
          self.options.onValueChangeStart?.();
          self.clearTimer();
          self.fireFineTuning(false);
        }
      });
    }
  },

  clearTimer(): void {
    clearTimeout(this.pressTimer);
  },

  fireFineTuning(isIncrement: boolean, delay?: number): void {
    const self = this;
    self._fineTuning(isIncrement);

    if (self.options.autoTunning) {
      const actualDelay = delay === undefined ? 300 : delay;
      self.pressTimer = window.setTimeout(function() {
        self.fireFineTuning(isIncrement, 15);
      }, actualDelay);
    }
  },

  _fineTuning(isIncrement: boolean): void {
    const step = isIncrement ? this.options.step : -1 * this.options.step;
    const newValue = this.database! + step;

    if (this._isValidInput(newValue)) {
      this.setDataBase(newValue);
      this._$("input").val(this.database);
      this.options.onValueChange?.(this.database!);
    }
  },

  _$(selector?: string): JQuery {
    return selector ? this.element.find(selector) : this.element;
  },

  _create(): void {
    this.setDataBase(this.options.value!);
    this._$().html("<span class='inputlabel'/>");
    this._$(".inputlabel").html(this.options.label);
    this._$().append($("<span class='inputwidgets'/>"));
    this._$(".inputwidgets").append("<input type='text'/>");
    this._$(".inputwidgets input").val(this.database);

    if (this.options.readOnly) {
      this._$(".inputwidgets input").addClass("readonly");
      this._$(".inputwidgets input").attr("readonly", true);
    }

    if (this.options.showErrorMsg) {
      this._$().append('<span class="errorMsg"></span>');
    }

    if (this.options.hasSpinner) {
      this._$(".inputwidgets input").css("paddingRight", "25px");
      this._$(".inputwidgets").append("<span class='arrowgroup'/>");
      this._$(".arrowgroup").append("<span class='arrowHit up'/>");
      this._$(".arrowHit.up").append("<a href='javascript:void(0);' class='arrow-up caret caret-reversed' style='left:0;'></a>");
      this._$(".arrowgroup").append("<span class='arrowHit down'/>");
      this._$(".arrowHit.down").append("<a href='javascript:void(0);' class='arrow-down caret'></a>");
    }

    this._$("input").attr("placeholder", this.options.placeholder);
    this.initEvent();
  }
});

export default NumberInputWidget;