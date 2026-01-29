interface ImageButtonOptions {
  id: string;
  src: string;
  label: string;
  color?: number;
  tooltip: string;
  tipposition: string;
  text?: string;
  disabled: boolean;
  hidden: boolean;
  onclick?: (event: JQuery.ClickEvent) => void;
  onmousedown?: (event: JQuery.MouseDownEvent) => void;
  onmouseup?: (event: JQuery.MouseUpEvent) => void;
  onmouseenter?: (event: JQuery.MouseEnterEvent) => void;
  onmouseleave?: (event: JQuery.MouseLeaveEvent) => void;
  oncreate?: (element: JQuery, widget: ImageButtonWidget) => void;
  ondestroy?: (element: JQuery, widget: ImageButtonWidget) => void;
  onerror?: (event: JQuery.ErrorEvent) => void;
  asyncParam: string | Promise<AsyncParamResult>;
  isActive: boolean;
  imgClassName?: string;
  captionDom: string;
  isSelected: boolean;
  popoverOptions?: PopoverOptions;
}

interface PopoverOptions {
  time?: number;
}

interface AsyncParamResult {
  text?: string;
  imgSrc?: string;
}

interface ImageButtonWidget {
  widgetEventPrefix: string;
  options: ImageButtonOptions;
  element: JQuery;
  _create(): void;
  _destroy(): void;
  update(options: Partial<ImageButtonOptions>): void;
  render(): void;
  _$(selector?: string): JQuery;
  _applyColor(): void;
  _applyTexture(): void;
  _applyText(text: string): void;
  setActiveStatus(): void;
  resetStatus(): void;
}

declare global {
  interface Window {
    CImageButton: typeof CImageButton;
  }
  
  interface JQuery {
    imagebutton(options: Partial<ImageButtonOptions>): JQuery;
    imagebutton(method: 'destroy'): void;
    imagebutton(method: 'update', options: Partial<ImageButtonOptions>): void;
    popover(options?: unknown): JQuery;
    popover(method: 'destroy'): void;
  }
  
  const ResourceManager: {
    injectSVGImage(element: HTMLElement): void;
  };
}

class CImageButton {
  public instance: JQuery | undefined = undefined;
  public container: JQuery | undefined = undefined;
  public param: Partial<ImageButtonOptions> | undefined = undefined;

  constructor(container: JQuery, options?: Partial<ImageButtonOptions>) {
    this.container = container;
    this.param = {};
    $.extend(this.param, options);
    this.instance = this.container.imagebutton(this.param);
  }

  static create(container: JQuery, options?: Partial<ImageButtonOptions>): CImageButton {
    return new CImageButton(container, options);
  }

  public update(options: Partial<ImageButtonOptions>): void {
    const deepEqual = (obj1: unknown, obj2: unknown): boolean => {
      if (obj1 === obj2 || typeof obj2 === 'function') {
        return true;
      }
      
      if (typeof obj1 === 'object' && obj1 !== null && typeof obj2 === 'object' && obj2 !== null) {
        const keys1 = Object.keys(obj1);
        return !keys1.some((key) => {
          const val1 = (obj1 as Record<string, unknown>)[key];
          const val2 = (obj2 as Record<string, unknown>)[key];
          return !(val2 === undefined || deepEqual(val1, val2));
        });
      }
      
      return false;
    };

    if (!deepEqual(this.param, options)) {
      Object.assign(this.param, options);
      this.instance?.imagebutton('destroy');
      this.instance = this.container?.imagebutton(this.param!);
    } else {
      Object.assign(this.param, options);
      this.container?.imagebutton('update', options);
    }
  }
}

window.CImageButton = CImageButton;

$.widget('custom.imagebutton', {
  widgetEventPrefix: 'imagebutton',
  
  options: {
    id: '',
    src: '',
    label: '',
    color: undefined,
    tooltip: '',
    tipposition: '',
    text: undefined,
    disabled: false,
    hidden: false,
    onclick: undefined,
    onmousedown: undefined,
    onmouseup: undefined,
    onmouseenter: undefined,
    onmouseleave: undefined,
    oncreate: undefined,
    ondestroy: undefined,
    asyncParam: '',
    isActive: false,
    imgClassName: undefined,
    captionDom: '',
    isSelected: false
  } as ImageButtonOptions,

  _create(this: ImageButtonWidget): void {
    this.render();
    this.options.oncreate?.(this.element, this);
  },

  _destroy(this: ImageButtonWidget): void {
    this._$().popover('destroy');
    this.options.ondestroy?.(this.element, this);
    this.element.html('');
  },

  update(this: ImageButtonWidget, options: Partial<ImageButtonOptions>): void {
    Object.assign(this.options, options);
  },

  render(this: ImageButtonWidget): void {
    this.element.append($('<span class="imagebutton"></span>'));
    
    if (this.options.label) {
      this.element.append($(`<span class="image-label">${this.options.label}</span>`));
    }

    const popoverOpts = this.options.popoverOptions;
    if (popoverOpts) {
      const showDelay = popoverOpts.time ?? 800;
      this._$().popover?.({
        container: 'body',
        trigger: 'hover',
        placement: 'auto top',
        delay: { show: showDelay },
        content: this.options.tooltip,
        html: true
      });
    }

    this.element.find('span.imagebutton').html('<img/>');
    this.element.removeClass('disable');
    
    if (this.options.disabled) {
      this.element.addClass('disable');
      this._$().css({ cursor: 'no-drop' });
    }

    this.element.removeClass('hidden');
    if (this.options.hidden) {
      this.element.addClass('hidden');
    }

    this.resetStatus();
    
    if (this.options.isActive) {
      this.setActiveStatus();
    }

    this.element.unbind('click').unbind('mousedown').unbind('mouseup');

    if (!this.options.disabled) {
      if (this.options.onclick) {
        this.element.bind('click', (event: JQuery.ClickEvent) => {
          event.preventDefault();
          event.stopPropagation();
          this.options.onclick!(event);
        });
      }
      
      if (this.options.onmousedown) {
        this.element.bind('mousedown', this.options.onmousedown);
      }
      
      if (this.options.onmouseup) {
        this.element.bind('mouseup', this.options.onmouseup);
      }
      
      if (this.options.onmouseenter) {
        this.element.bind('mouseenter', this.options.onmouseenter);
      }
      
      if (this.options.onmouseleave) {
        this.element.bind('mouseleave', this.options.onmouseleave);
      }
    }

    if (this.options.color) {
      this._applyColor();
    }

    if (this.options.src || this.options.asyncParam) {
      this._applyTexture();
    }

    if (this.options.text) {
      this._applyText(this.options.text);
    }

    if (this.options.asyncParam instanceof Promise) {
      this.options.asyncParam.then((result: AsyncParamResult) => {
        if (result?.text !== undefined) {
          this._applyText(result.text);
        }
      });
    }

    if (this.options.imgClassName) {
      this.element.find('img').addClass(this.options.imgClassName);
    }

    if (this.options.captionDom) {
      const children = this.element.find('span.imagebutton').children();
      this.element.find('span.imagebutton').append('<div class="buttonWithCaption"/>');
      this.element.find('span.imagebutton > div').append(children);
      this.element.find('span.imagebutton > div').append(this.options.captionDom);
      this.element.find('span').addClass('propertybar-span');
      this.element.addClass('propertybar-span');
    }

    if (typeof this.options.isSelected === 'boolean' && this.options.isSelected) {
      this.element.find('span.imagebutton > div').addClass('selectedItem');
    }
  },

  _$(this: ImageButtonWidget, selector?: string): JQuery {
    return selector ? this._$().find(selector) : this.element.find('> span');
  },

  _applyColor(this: ImageButtonWidget): void {
    const hexColor = this.options.color!.toString(16);
    const paddedHex = '#' + '0'.repeat(6 - hexColor.length) + hexColor;
    this.element.find('img').css('background-color', paddedHex);
  },

  _applyTexture(this: ImageButtonWidget): void {
    const imgElement = this.element.find('img').attr('id', this.options.id);
    let hasDirectSrc = false;

    if (this.options.src && typeof this.options.src === 'string') {
      const fileExtension = this.options.src.split('.').pop();
      if (fileExtension === 'svg') {
        ResourceManager.injectSVGImage(imgElement.attr('data-src', this.options.src)[0]);
      } else {
        imgElement.attr('src', this.options.src);
        hasDirectSrc = true;
      }
    }

    if (this.options.asyncParam instanceof Promise) {
      this.options.asyncParam.then((result: AsyncParamResult) => {
        if (result?.imgSrc) {
          this._$('img').attr('src', result.imgSrc);
          hasDirectSrc = true;
        }
      });
    }

    if (hasDirectSrc && this.options.onerror) {
      this._$('img').on('error', (event: JQuery.ErrorEvent) => {
        this.options.onerror!(event);
      });
    }
  },

  _applyText(this: ImageButtonWidget, text: string): void {
    this._$().append(`<span>${text}</span>`);
    this._$('span').css({
      'font-size': '9pt',
      color: '#808080',
      position: 'absolute',
      top: '19px',
      left: '18px',
      'text-shadow': '-0.07em -0.07em 0 #f3f3f3, 0.07em -0.07em 0 #f3f3f3, -0.07em 0.07em 0 #f3f3f3, 0.07em 0.07em 0 #f3f3f3'
    });
  },

  setActiveStatus(this: ImageButtonWidget): void {
    this._$().addClass('active');
  },

  resetStatus(this: ImageButtonWidget): void {
    this._$().removeClass('active');
  }
});