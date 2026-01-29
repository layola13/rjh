interface TextInputWidgetOptions {
  id: string;
  label: string;
  value?: string;
  readOnly: boolean;
  showErrorMsg: boolean;
  errorMsg: string;
  validation: {
    allowEmpty: boolean;
  };
  onValueChangeEnd?: (value: string) => void;
  onValueChangeStart?: () => void;
  onValueChange?: (value: string) => void;
  onInvalidInput?: () => void;
  placeholder: string;
}

class CTextInputWidget {
  private instance: JQuery;

  constructor(element: HTMLElement | string, options: Partial<TextInputWidgetOptions>) {
    this.instance = $(element).ctextinputwidget(options);
  }

  static create(element: HTMLElement | string, options: Partial<TextInputWidgetOptions>): CTextInputWidget {
    return new CTextInputWidget(element, options);
  }

  isValid(): boolean {
    return this.instance.ctextinputwidget("isValid");
  }

  setErrorStatus(): void {
    this.instance.ctextinputwidget("setErrorStatus");
  }

  destroy(): void {
    this.instance.ctextinputwidget("destroy");
  }
}

declare global {
  interface Window {
    CTextInputWidget: typeof CTextInputWidget;
  }

  interface JQuery {
    ctextinputwidget(options: Partial<TextInputWidgetOptions>): JQuery;
    ctextinputwidget(method: "isValid"): boolean;
    ctextinputwidget(method: "setErrorStatus"): void;
    ctextinputwidget(method: "destroy"): void;
  }
}

window.CTextInputWidget = CTextInputWidget;

$.widget("custom.ctextinputwidget", {
  widgetEventPrefix: "ctextinputwidget",

  options: {
    id: "",
    label: "",
    value: undefined,
    readOnly: false,
    showErrorMsg: false,
    errorMsg: "",
    validation: {
      allowEmpty: false
    },
    onValueChangeEnd: undefined,
    onValueChangeStart: undefined,
    onValueChange: undefined,
    onInvalidInput: undefined,
    placeholder: ""
  } as TextInputWidgetOptions,

  database: undefined as string | undefined,

  setErrorStatus(this: any): void {
    this._$("input").addClass("error");
    this._$(".errorMsg").html(this.options.errorMsg);
  },

  setNormalStatus(this: any): void {
    this._$("input").removeClass("error");
    this._$(".errorMsg").html("");
  },

  _isValidInput(this: any, value: string): boolean {
    return !(!this.options.validation.allowEmpty && !value);
  },

  isValid(this: any): boolean {
    const value = this._$(".inputwidgets input").val() as string;
    return this._isValidInput(value);
  },

  onInputTextChanged(this: any, value: string): void {
    this.setNormalStatus();
    if (this._isValidInput(value)) {
      this.setDataBase(value);
      this.options.onValueChange?.(this.database);
    } else {
      this.onInvalidInput();
    }
  },

  onInvalidInput(this: any): void {
    this.setErrorStatus();
    this.options.onInvalidInput?.();
  },

  setDataBase(this: any, value: string): void {
    this.database = value;
  },

  initEvent(this: any): void {
    const self = this;

    this._$(".inputwidgets input").keyup(function(event: JQuery.KeyUpEvent): void {
      const value = $(this).val() as string;
      self.onInputTextChanged(value);
    });

    this._$(".inputwidgets input").focus(function(event: JQuery.FocusEvent): void {
      const value = $(this).val() as string;
      self.setNormalStatus();
      if (!self._isValidInput(value)) {
        self.onInvalidInput();
      }
      self.options.onValueChangeStart?.();
    });

    this._$(".inputwidgets input").blur(function(event: JQuery.BlurEvent): void {
      const value = $(this).val() as string;
      self.options.onValueChangeEnd?.(value);
    });
  },

  _$(this: any, selector?: string): JQuery {
    return selector ? this._$().find(selector) : this.element;
  },

  _create(this: any): void {
    this.setDataBase(this.options.value);
    this._$().html("<span class='inputlabel'/>");
    this._$(".inputlabel").html(this.options.label);
    this._$().append($("<span class='inputwidgets'/>"));
    this._$(".inputwidgets").append("<input type='text'/>");
    this._$(".inputwidgets input").val(this.database);

    if (this.options.readOnly) {
      this._$(".inputwidgets input").addClass("readOnly");
      this._$().attr("readonly", true);
    }

    if (this.options.showErrorMsg) {
      this._$().append('<span class="errorMsg"></span>');
    }

    this._$("input").attr("placeholder", this.options.placeholder);
    this.initEvent();
  }
});