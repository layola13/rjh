interface CButtonOptions {
  id: string;
  onclick?: (event: JQuery.ClickEvent) => void;
  label: string;
  disabled: boolean;
  primary?: string;
  isShowArrow?: boolean;
}

class CButton {
  private container: JQuery;
  private param: CButtonOptions;
  private instance: JQuery;

  constructor(element: string | HTMLElement, options: CButtonOptions) {
    this.container = $(element);
    this.param = options;
    this.instance = this.container.cbutton(this.param);
  }

  static create(element: string | HTMLElement, options: CButtonOptions): CButton {
    return new CButton(element, options);
  }

  update(options: Partial<CButtonOptions>): void {
    this.destroy();
    Object.assign(this.param, options);
    this.instance = this.container.cbutton(this.param);
  }

  destroy(): void {
    this.instance.cbutton("destroy");
  }
}

window.CButton = CButton;

$.widget("custom.cbutton", {
  widgetEventPrefix: "cbutton",
  
  options: {
    id: "",
    onclick: undefined,
    label: "",
    disabled: false
  },

  _create(this: JQuery): void {
    const options = this.options as CButtonOptions;
    const label = options.label;
    const buttonHtml = `<span class="btn ${options.primary ?? ""}">${label}</span>`;
    
    this.element.append($(buttonHtml));
    
    if (options.disabled) {
      this.element.find("span.btn").addClass("disabled");
    }
    
    if (options.onclick && !options.disabled) {
      this.element.unbind("click").bind("click", options.onclick);
    }
    
    if (options.isShowArrow === true) {
      this.element.append('<span class="caret"></span>');
    }
  },

  _destroy(this: JQuery): void {
    this.element.html("");
    this.element.unbind("click");
  }
});

declare global {
  interface Window {
    CButton: typeof CButton;
  }

  interface JQuery {
    cbutton(options: CButtonOptions | string): JQuery;
  }
}