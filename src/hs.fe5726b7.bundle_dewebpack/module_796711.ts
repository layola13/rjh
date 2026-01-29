interface AngleSpinnerOptions extends JQueryUI.SpinnerOptions {
  [key: string]: any;
}

interface ValidationResult {
  isValid: boolean;
  text: string;
}

interface UpdateValueEventData {
  target: AngleSpinner;
  value: number;
}

interface AngleSpinner extends JQueryUI.Spinner {
  widgetEventPrefix: string;
  options: AngleSpinnerOptions;
  reg: string;
  _isWritingSpinner: boolean;
  _create(): void;
  _getErrorMsgContainer(): JQuery;
  setNormalStatus(): void;
  setErrorStatus(errorMessage: string): void;
  _refresh(): void;
  _start(): void;
  getIsWritingSpinner(): boolean;
  _stop(): void;
  _isValidInput(value: string): ValidationResult;
  setValue(value: number | string): void;
}

const BORDER_NORMAL = 'solid 1px #ccc';
const BORDER_ERROR = 'solid 1px red';
const BORDER_FOCUS = 'solid 1px #379df1';
const MAX_ANGLE_VALUE = 45;
const INTEGER_REGEX = '^-?[0-9]*$';

$.widget('custom.anglespinner', $.ui.spinner, {
  widgetEventPrefix: 'anglespinner',

  options: {} as AngleSpinnerOptions,

  reg: INTEGER_REGEX,

  _isWritingSpinner: false,

  _create(this: AngleSpinner): void {
    $.ui.spinner.prototype._create.apply(this, arguments as any);

    this.element.parent().find('.ui-spinner-button').hide();
    this._getErrorMsgContainer().append("<div class='errorMsg'></div>");

    this.element.bind('blur', function (this: HTMLElement): void {
      const $element = $(this);
      const borderStyle = $element.hasClass('error') ? BORDER_ERROR : BORDER_NORMAL;
      $element.css('border', borderStyle);
    });

    this.element.bind('focus', function (this: HTMLElement): void {
      const $element = $(this);
      const borderStyle = $element.hasClass('error') ? BORDER_ERROR : BORDER_FOCUS;
      $element.css('border', borderStyle);
    });
  },

  _getErrorMsgContainer(this: AngleSpinner): JQuery {
    return this.element.parent().parent().parent();
  },

  setNormalStatus(this: AngleSpinner): void {
    this._getErrorMsgContainer().find('.errorMsg').hide();
    this.element.css('border', BORDER_NORMAL);
    this.element.removeClass('error');
  },

  setErrorStatus(this: AngleSpinner, errorMessage: string): void {
    const $errorContainer = this._getErrorMsgContainer().find('.errorMsg');
    $errorContainer.show();
    $errorContainer.html(errorMessage);
    this.element.css('border', BORDER_ERROR);
    this.element.addClass('error');
  },

  _refresh(this: AngleSpinner): void {
    this.setNormalStatus();
  },

  _start(this: AngleSpinner): void {
    this._isWritingSpinner = true;
    this.setNormalStatus();
  },

  getIsWritingSpinner(this: AngleSpinner): boolean {
    return this._isWritingSpinner;
  },

  _stop(this: AngleSpinner): void {
    this._isWritingSpinner = false;

    const inputValue = this.element.val() as string;
    const validationResult = this._isValidInput(inputValue);

    if (validationResult.isValid) {
      if (inputValue !== '' && inputValue !== '-') {
        this._trigger('updateValue', null, {
          target: this,
          value: parseFloat(inputValue)
        } as UpdateValueEventData);
      }
    } else {
      this.setErrorStatus(validationResult.text);
    }

    $.ui.spinner.prototype._stop.apply(this, arguments as any);
  },

  _isValidInput(this: AngleSpinner, value: string): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      text: ''
    };

    const regex = new RegExp(this.reg);
    if (!regex.exec(value)) {
      result.isValid = false;
      result.text = ResourceManager.getString('plugin_style_error_6');
      return result;
    }

    const numericValue = Math.abs(parseFloat(value));
    if (numericValue > MAX_ANGLE_VALUE) {
      result.isValid = false;
      result.text = ResourceManager.getString('plugin_style_error_6');
    }

    return result;
  },

  setValue(this: AngleSpinner, value: number | string): void {
    this.element.val(value);
  }
});

declare global {
  interface JQuery {
    anglespinner(options?: AngleSpinnerOptions): JQuery;
    anglespinner(method: 'setValue', value: number | string): JQuery;
    anglespinner(method: 'getIsWritingSpinner'): boolean;
    anglespinner(method: 'setNormalStatus'): JQuery;
    anglespinner(method: 'setErrorStatus', errorMessage: string): JQuery;
    anglespinner(method: string, ...args: any[]): any;
  }

  interface ResourceManager {
    getString(key: string): string;
  }

  const ResourceManager: ResourceManager;
}