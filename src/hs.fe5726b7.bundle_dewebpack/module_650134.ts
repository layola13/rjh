interface DropDownOption {
  id: string;
  label?: string;
  icon?: string;
  iconActive?: string;
  iconHover?: string;
  hotKey?: string;
  disabled?: number | boolean;
  alignleft?: boolean;
  image?: string;
  imageclick?: (event: Event) => void;
  itemtype?: 'editable' | 'divider' | 'normal';
  placeholder?: string;
}

interface DropDownParams {
  id: string;
  defaultKey?: string;
  options: DropDownOption[];
  prompt?: string;
  disabled?: boolean;
  onchange?: (key: string) => void;
  onopenpopup?: (data: { id: string; bound: { left: number; top: number; width: number; height: number } }) => void;
  onclosepopup?: (data: { id: string }) => void;
  width?: number;
  title?: string;
}

interface JQuery {
  cdropdown(options?: DropDownParams | string): JQuery;
  editabledropdown(options?: DropDownParams | string): JQuery;
  capture(element: JQuery, event: string, handler: (e: MouseEvent) => void): void;
  unbindcapture(element: JQuery, event: string, handler: (e: MouseEvent) => void): void;
}

interface JQueryStatic {
  widget(name: string, base: any, prototype?: any): void;
  capture(element: JQuery, event: string, handler: (e: MouseEvent) => void): void;
  unbindcapture(element: JQuery, event: string, handler: (e: MouseEvent) => void): void;
}

declare const ResourceManager: {
  injectSVGImage(element: HTMLElement): void;
};

class CDropDown {
  instance: JQuery;
  container: JQuery;
  param: DropDownParams;

  constructor(element: string | HTMLElement, params: DropDownParams) {
    this.instance = $(element).cdropdown(params);
    this.container = $(element);
    this.param = params;
  }

  static create(element: string | HTMLElement, params: DropDownParams): CDropDown {
    return new CDropDown(element, params);
  }

  toggleOptions(): void {
    this.instance.cdropdown('toggleOptions');
  }

  destroy(): void {
    this.instance.cdropdown('destroy');
  }

  isSame(params: DropDownParams): boolean {
    return (
      params.title === this.param.title &&
      params.prompt === this.param.prompt &&
      params.defaultKey === this.param.defaultKey
    );
  }

  update(params: DropDownParams): void {
    if (!this.isSame(params)) {
      this.destroy();
      $.extend(this.param, params);
      this.instance = this.container.cdropdown(this.param);
    }
  }
}

class CEditableDropDown {
  container: JQuery;
  instance: JQuery;
  param: DropDownParams;

  constructor(element: string | HTMLElement, params: DropDownParams) {
    this.container = $(element);
    this.instance = this.container.editabledropdown(params);
    this.param = params;
  }

  toggleOptions(): void {
    this.instance.editabledropdown('toggleOptions');
  }

  destroy(): void {
    this.instance.editabledropdown('destroy');
  }

  update(params: DropDownParams): void {
    this.destroy();
    $.extend(this.param, params);
    this.instance = this.container.editabledropdown(this.param);
  }
}

interface CDropDownWidget {
  widgetEventPrefix: string;
  options: DropDownParams;
  loseFocusHandler: ((e: MouseEvent) => void) | null;
  element: JQuery;
  _create(): void;
  _destroy(): void;
  getOptionByKey(key: string): DropDownOption | undefined;
  update(): void;
  open(): void;
  close(): void;
  dropdownOnScroll(e: Event): void;
  toggleOptions(): void;
  createOptionDom(option: DropDownOption, container: JQuery, selectedKey?: string): void;
}

$.widget('custom.cdropdown', {
  widgetEventPrefix: 'cdropdown',
  options: {
    id: '',
    defaultKey: '',
    options: [],
    prompt: '',
    disabled: false,
    onchange: undefined,
    onopenpopup: undefined,
    onclosepopup: undefined,
    width: undefined
  },
  loseFocusHandler: null,

  _create(this: CDropDownWidget): void {
    this.update();
    this.loseFocusHandler = ((event: MouseEvent) => {
      const isPointInElement = (element: JQuery): boolean => {
        const point = { x: event.clientX, y: event.clientY };
        const left = element.offset()!.left;
        const top = element.offset()!.top;
        const bounds = {
          left,
          top,
          right: left + element.outerWidth()!,
          bottom: top + element.outerHeight()!
        };
        return bounds.left < point.x && point.x < bounds.right && bounds.top < point.y && point.y < bounds.bottom;
      };

      if (!isPointInElement(this.element.find('>button')) && !isPointInElement(this.element.find('>ul'))) {
        this.close();
      }
    }).bind(this);
  },

  _destroy(this: CDropDownWidget): void {
    this.close();
    this.element.html('');
  },

  getOptionByKey(this: CDropDownWidget, key: string): DropDownOption | undefined {
    let foundOption: DropDownOption | undefined;
    $.each(this.options.options, function (this: DropDownOption) {
      if (this.id === key) {
        foundOption = this;
        return false;
      }
    });
    return foundOption;
  },

  update(this: CDropDownWidget): void {
    const widget = this;
    widget.element.addClass('cdropdown').addClass(widget.options.id);
    widget.element.html('');

    let selectedOption: DropDownOption | undefined;
    if (widget.options.defaultKey !== undefined) {
      selectedOption = widget.getOptionByKey(widget.options.defaultKey);
    }

    let buttonText = selectedOption ? selectedOption.label : widget.options.prompt;
    buttonText = buttonText || '';
    const buttonIcon = selectedOption?.icon;
    const selectedKey = selectedOption?.id || '';

    const buttonElement = $('<button type="button"></button>');
    widget.element.append(buttonElement);

    if (buttonIcon) {
      widget.element.find('button').append($("<span class='icon'><img /></span>"));
      widget.element.find('button .icon').find('img').attr('src', buttonIcon);
      if (buttonIcon.endsWith('svg')) {
        ResourceManager.injectSVGImage(widget.element.find('button .icon')[0]);
      }
    }

    widget.element.find('button').append($("<span class='utext'></span>"));
    widget.element.find('button .utext').html(buttonText);
    widget.element.find('button').append($("<span class='caret'></span>"));

    widget.element.removeClass('disable');
    if (widget.options.disabled) {
      this.element.addClass('disable');
    }

    if (!widget.options.disabled) {
      widget.element.find('button').click(() => {
        const dropdownList = widget.element.find('ul');
        if (!dropdownList.is(':visible')) {
          widget.open();
        } else {
          widget.close();
        }
      });
    }

    const listElement = $('<ul role="menu"></ul>');
    widget.element.append(listElement);

    for (let i = 0; i < widget.options.options.length; i++) {
      const option = widget.options.options[i];
      const container = widget.element.find('>ul');
      widget.createOptionDom(option, container, selectedKey);
    }

    if (widget.options.width) {
      widget.element[0].style.width = `${widget.options.width}px`;
    }
  },

  open(this: CDropDownWidget): void {
    const dropdownList = this.element.find('>ul');
    dropdownList.show();

    if (this.options.onopenpopup) {
      this.options.onopenpopup({
        id: this.options.id,
        bound: {
          left: dropdownList.offset()!.left,
          top: dropdownList.offset()!.top,
          width: dropdownList.outerWidth()!,
          height: dropdownList.outerHeight()!
        }
      });
    }

    $.capture($('body'), 'mousedown', this.loseFocusHandler!);
    $.capture($('body'), 'mousewheel', this.dropdownOnScroll);
  },

  close(this: CDropDownWidget): void {
    this.element.find('>ul').hide();

    if (this.options.onclosepopup) {
      this.options.onclosepopup({ id: this.options.id });
    }

    $.unbindcapture($('body'), 'mousedown', this.loseFocusHandler!);
    $.unbindcapture($('body'), 'mousewheel', this.dropdownOnScroll);
  },

  dropdownOnScroll(event: Event): void {
    event.stopPropagation();
  },

  toggleOptions(this: CDropDownWidget): void {
    if (this.element.find('>ul').is(':visible')) {
      this.close();
    } else {
      this.open();
    }
  },

  createOptionDom(this: CDropDownWidget, option: DropDownOption, container: JQuery, selectedKey?: string): void {
    const widget = this;
    const optionId = option.id;
    let labelText = option.label ?? '';
    const iconSrc = option.icon ?? '';
    const iconHoverSrc = option.iconHover ?? '';
    const hotKeyText = option.hotKey ?? '';
    const labelTitle = labelText;
    let itemStyle = '';
    let activeStyle = '';

    if (option.disabled === 1 || option.disabled === true) {
      labelText = `<font color="#dddddd">${labelText}</font>`;
    }

    if (option.alignleft) {
      itemStyle = 'margin-left: 15px;';
    }

    let rightImageHtml = '';
    if (option.image) {
      rightImageHtml = '<span class="right_image"><img src="#image"/></span>';
    }

    if (selectedKey === option.id) {
      activeStyle = 'background: #327dff; color: #fff';
      itemStyle += ' color: #fff';
    }

    let itemHtml = `<li data='${optionId}' role='presentation' title='${labelTitle}' style='${activeStyle}'><span data-src='${iconSrc}' class='icon'><img /></span><a role='menuitem' style='${itemStyle}' href='javascript:void(0);'>${labelText}</a><span class='hotKey' style='${activeStyle}'>${hotKeyText}</span>${rightImageHtml}</li>`;

    container.append($(itemHtml));

    if (option.image) {
      ResourceManager.injectSVGImage(container.find('img')[0]);
      if (option.imageclick) {
        container.find('.right_image').unbind('click').bind('click', option.imageclick);
      }
    }

    const itemSelector = `li[data='${optionId}']`;

    if (iconSrc) {
      if (iconSrc.endsWith('svg')) {
        const iconToUse = selectedKey === option.id ? iconHoverSrc : iconSrc;
        container.find(itemSelector).find('.icon').find('img').attr('src', iconToUse);
      }
    } else {
      container.find(itemSelector).find('.icon').remove();
    }

    if (option.disabled !== 1 && option.disabled !== true) {
      container.find(itemSelector).bind('mousedown', function () {
        const selectedId = $(this).attr('data')!;
        widget.options.defaultKey = selectedId;
        widget.update();
        widget.close();
        if (widget.options.onchange) {
          widget.options.onchange(selectedId);
        }
      });
    }
  }
});

interface EditableDropDownWidget extends CDropDownWidget {
  createOptionEditableDom(option: DropDownOption, container: JQuery): void;
  createOptionDividerDom(option: DropDownOption, container: JQuery): void;
  _super(...args: any[]): void;
}

$.widget('custom.editabledropdown', $.custom.cdropdown as any, {
  open(this: EditableDropDownWidget): void {
    this.update();
    this._super();
  },

  createOptionDom(this: EditableDropDownWidget, option: DropDownOption, container: JQuery): void {
    if (option.itemtype === 'editable') {
      this.createOptionEditableDom(option, container);
    } else if (option.itemtype === 'divider') {
      this.createOptionDividerDom(option, container);
    } else {
      this._super(option, container);
    }
  },

  createOptionEditableDom(this: EditableDropDownWidget, option: DropDownOption, container: JQuery): void {
    const widget = this;
    const optionId = option.id;
    const labelText = option.label ?? '';
    const iconSrc = option.icon ?? '';

    const listItem = $('<li/>')
      .attr('data', optionId)
      .append(`<span data-src="${iconSrc}" class="icon">`)
      .append($('<input/>', {
        value: labelText,
        placeholder: option.placeholder
      }))
      .appendTo(container);

    ResourceManager.injectSVGImage(listItem.find('span.icon').get(0) as HTMLElement);

    listItem.find('input')
      .on('focusout', function () {
        const inputValue = $(this).val() as string;
        if (inputValue) {
          const selectedId = option.id;
          widget.options.defaultKey = selectedId;
          option.label = inputValue;
          if (widget.options.onchange) {
            widget.options.onchange(selectedId);
          }
          widget.update();
        }
        widget.close();
      })
      .keypress(function (event) {
        if (event.which === 13) {
          $(this).blur();
          return false;
        }
      });
  },

  createOptionDividerDom(this: EditableDropDownWidget, option: DropDownOption, container: JQuery): void {
    const divider = $('<li class="option-divider"/>');
    container.append(divider);
  }
});

(window as any).CDropDown = CDropDown;
(window as any).CEditableDropDown = CEditableDropDown;