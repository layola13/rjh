import BaseWidget from './BaseWidget';

interface RadioButtonOptions {
  [key: string]: unknown;
}

class RadioButtonWidget extends BaseWidget {
  static create(element: JQuery | HTMLElement, options: RadioButtonOptions): RadioButtonWidget {
    return new RadioButtonWidget(element, options);
  }

  protected createMainWidget(element: HTMLElement, options: RadioButtonOptions): unknown {
    const $element = $(element);
    const $radioBtn = $('<span class="radioBtn" style="border:0"></span>').appendTo($element);
    return CRadioButton.create($radioBtn, options);
  }
}

export default RadioButtonWidget;