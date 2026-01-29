import CBaseWidget from './CBaseWidget';

interface ImageButtonConfig {
  popupClassName: string;
  [key: string]: unknown;
}

class CImageButtonWidget extends CBaseWidget {
  static create(element: JQuery | string, config: ImageButtonConfig): CImageButtonWidget {
    return new CImageButtonWidget(element, config);
  }

  protected createMainWidget(element: string | HTMLElement, config: ImageButtonConfig): JQuery {
    const $element = $(element);
    $element.append(
      `<div class="imagebutton"></div><div class="statusbar_popup_container ${config.popupClassName}"></div>`
    );
    return CImageButton.create($element.find('.imagebutton'), config);
  }
}

export default CImageButtonWidget;