interface CLabelOptions {
  id: string;
  text: string;
}

interface CLabelInstance {
  clabel(method: string): void;
  clabel(options: CLabelOptions): CLabelInstance;
}

interface JQuery {
  clabel(options: CLabelOptions): CLabelInstance;
  clabel(method: string): void;
}

class CLabel {
  private container: JQuery;
  private param: CLabelOptions;
  private instance?: CLabelInstance;

  constructor(element: string | HTMLElement, options: CLabelOptions) {
    this.container = $(element);
    this.param = options;
    this.instance = this.container.clabel(this.param);
  }

  static create(element: string | HTMLElement, options: CLabelOptions): CLabel {
    return new CLabel(element, options);
  }

  update(options: CLabelOptions): void {
    if (options.text !== this.param.text) {
      this.destroy();
      $.extend(this.param, options);
      this.instance = this.container.clabel(this.param);
    }
  }

  destroy(): void {
    this.instance?.clabel("destroy");
  }
}

$.widget("custom.clabel", {
  widgetEventPrefix: "clabel",
  
  options: {
    id: "",
    text: ""
  },

  _create(): void {
    const template = '<span class="inputlabel">#text</span>';
    const html = template.replace("#text", this.options.text);
    this.element.append($(html));
  },

  _destroy(): void {
    this.element.html("");
  }
});

window.CLabel = CLabel;

declare global {
  interface Window {
    CLabel: typeof CLabel;
  }
}