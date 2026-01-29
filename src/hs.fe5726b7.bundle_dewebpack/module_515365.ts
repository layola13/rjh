import BaseWidget from './BaseWidget';

interface WidgetConfig {
  [key: string]: unknown;
}

class ImageButtonWidget extends BaseWidget {
  static create(element: unknown, config: WidgetConfig): ImageButtonWidget {
    return new ImageButtonWidget(element, config);
  }

  createMainWidget(element: HTMLElement | string, config: WidgetConfig): unknown {
    const popoverWidget = this._getPopoverWidget(
      config,
      React.createElement('span', {
        className: 'imagebtn'
      })
    );

    const $element = $(element);

    if (popoverWidget) {
      $element.append('<span class="miniHelpBtnWrapper"></span>');
      ReactDOM.render(
        popoverWidget,
        $element.find('.miniHelpBtnWrapper').get(0)
      );
    } else {
      $element.append('<span class="imagebtn"></span>');
    }

    return CImageButton.create($element.find('.imagebtn'), config);
  }

  createHelpWidget(): null {
    return null;
  }
}

export default ImageButtonWidget;