interface RadioButtonOptions {
  id: string;
  btns: Array<RadioButtonConfig | Promise<RadioButtonConfig>>;
  selectedIndex: number;
  className: string;
  onchange?: (selectedIndex: number) => void;
  oncreate?: (element: JQuery, widget: JQuery.Widget) => void;
  ondestroy?: (element: JQuery, widget: JQuery.Widget) => void;
}

interface RadioButtonConfig {
  tooltip?: string;
  className?: string;
  img?: string;
  label?: string;
}

class CRadioButton {
  private container: JQuery;
  private param: RadioButtonOptions;
  private instance: JQuery;

  constructor(element: string | HTMLElement, options: RadioButtonOptions) {
    this.container = $(element);
    this.param = options;
    this.instance = this.container.radioButton(this.param);
  }

  static create(element: string | HTMLElement, options: RadioButtonOptions): CRadioButton {
    return new CRadioButton(element, options);
  }

  update(options: Partial<RadioButtonOptions>): void {
    this.destroy();
    $.extend(this.param, options);
    this.instance = this.container.radioButton(this.param);
  }

  destroy(): void {
    this.instance.radioButton("destroy");
  }
}

$.widget("custom.radioButton", {
  widgetEventPrefix: "radioButton",
  
  options: {
    id: "",
    btns: [],
    selectedIndex: -1,
    className: "",
    onchange: undefined,
    oncreate: undefined,
    ondestroy: undefined
  } as RadioButtonOptions,

  _destroy(): void {
    if (this.options.ondestroy) {
      this.options.ondestroy(this.element, this);
    }
    this.element.html("");
  },

  buildHtml(listElement: JQuery, config: RadioButtonConfig): void {
    const templateHtml = "<li title='#tooltip' class='#className'></li>"
      .replace("#tooltip", config.tooltip ?? "")
      .replace("#className", config.className ?? "");
    
    const listItem = $(templateHtml);
    listElement.append(listItem);

    if (config.img) {
      listItem.append("<img/>");
      listItem.find(">img").attr("src", config.img);
    }

    if (config.label) {
      listItem.append(`<span class='inputlabel'>${config.label}</span>`);
    }

    listItem.click(() => {
      const index = listElement.find("li").index(listItem);
      this.options.selectedIndex = index;
      this.update();
      if (this.options.onchange) {
        this.options.onchange(this.options.selectedIndex);
      }
    });

    ResourceManager.injectSVGImage(listItem.find("img")[0]);
    this.update();
  },

  _create(): void {
    const listContainer = $("<ul class='radioBtn'></ul>");
    this.element.append(listContainer);

    $.each(this.options.btns, (index: number, item: RadioButtonConfig | Promise<RadioButtonConfig>) => {
      if (item instanceof Promise) {
        item.then((config: RadioButtonConfig) => {
          this.buildHtml(listContainer, config);
        });
      } else {
        this.buildHtml(listContainer, item);
      }
    });

    if (this.options.oncreate) {
      this.options.oncreate(this.element, this);
    }
  },

  update(): void {
    this.element.find("li").removeClass("active");
    const selectedIndex = this.options.selectedIndex;
    this.element.find(`ul li:eq(${selectedIndex})`).addClass("active");
  }
});

declare global {
  interface Window {
    CRadioButton: typeof CRadioButton;
  }

  interface JQuery {
    radioButton(options: RadioButtonOptions | string): JQuery;
  }
}

window.CRadioButton = CRadioButton;