interface LinkButtonOptions {
  id: string;
  text: string;
  tooltip: string;
  onclick?: (event: JQuery.ClickEvent) => void;
  disabled: boolean;
}

interface LinkButtonInstance extends JQuery {
  linkButton(method: 'destroy'): void;
  linkButton(options: Partial<LinkButtonOptions>): JQuery;
}

class CLinkButton {
  private container: JQuery;
  private param: Partial<LinkButtonOptions>;
  private instance?: LinkButtonInstance;

  constructor(element: string | HTMLElement | JQuery, options: Partial<LinkButtonOptions>) {
    this.container = $(element);
    this.param = options;
    this.instance = this.container.linkButton(this.param) as LinkButtonInstance;
  }

  static create(element: string | HTMLElement | JQuery, options: Partial<LinkButtonOptions>): CLinkButton {
    return new CLinkButton(element, options);
  }

  update(options: Partial<LinkButtonOptions>): void {
    this.destroy();
    $.extend(this.param, options);
    this.instance = this.container.linkButton(this.param) as LinkButtonInstance;
  }

  destroy(): void {
    this.instance?.linkButton('destroy');
  }
}

declare global {
  interface Window {
    CLinkButton: typeof CLinkButton;
  }

  interface JQuery {
    linkButton(options: Partial<LinkButtonOptions>): JQuery;
    linkButton(method: 'destroy'): void;
  }
}

window.CLinkButton = CLinkButton;

$.widget('custom.linkButton', {
  widgetEventPrefix: 'linkButton',

  options: {
    id: '',
    text: '',
    tooltip: '',
    onclick: undefined as ((event: JQuery.ClickEvent) => void) | undefined,
    disabled: false
  },

  _create(this: { element: JQuery; options: LinkButtonOptions }): void {
    const template = '<span class="linkbutton" title="#tooltip">#text</span>';
    const html = template
      .replace('#id', this.options.id)
      .replace('#text', this.options.text)
      .replace('#tooltip', this.options.tooltip);

    this.element.append($(html));

    if (this.options.onclick && !this.options.disabled) {
      this.element.unbind('click').bind('click', this.options.onclick);
    }

    this.element.find('span').removeClass('disable');

    if (this.options.disabled) {
      this.element.find('span').addClass('disable');
    }
  },

  _destroy(this: { element: JQuery }): void {
    this.element.html('');
    this.element.unbind('click');
  }
});