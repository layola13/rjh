interface ColorCheckboxOptions {
  text: string;
  status: StatusType;
  disabled: boolean;
  tooltip: string;
  onclick?: (event: JQuery.ClickEvent) => void;
  hidden: boolean;
}

type StatusType = "checked" | "unchecked" | "indeterminate";

class ColorCheckboxWrapper {
  private container: JQuery;
  private param: Partial<ColorCheckboxOptions>;
  private instance: JQuery;

  static readonly StatusEnum = {
    checked: "checked" as const,
    unchecked: "unchecked" as const,
    indeterminate: "indeterminate" as const
  };

  constructor(element: string | HTMLElement, options: Partial<ColorCheckboxOptions>) {
    this.container = $(element);
    this.param = options;
    this.instance = this.container.ColorCheckbox(this.param);
  }

  static create(element: string | HTMLElement, options: Partial<ColorCheckboxOptions>): ColorCheckboxWrapper {
    return new ColorCheckboxWrapper(element, options);
  }

  update(options: Partial<ColorCheckboxOptions>): void {
    this.destroy();
    $.extend(this.param, options);
    this.instance = this.container.ColorCheckbox(this.param);
  }

  destroy(): void {
    this.instance.ColorCheckbox("destroy");
  }
}

Object.freeze(ColorCheckboxWrapper.StatusEnum);

$.widget("custom.ColorCheckbox", {
  widgetEventPrefix: "ColorCheckbox",
  
  options: {
    text: "",
    status: ColorCheckboxWrapper.StatusEnum.unchecked,
    disabled: false,
    tooltip: "",
    onclick: undefined,
    hidden: false
  },

  _create: function(this: any): void {
    const textSpan = this.options.text 
      ? `<span class="checkboxTxt">${this.options.text}</span>` 
      : "";
    
    const template = `<li><span class="colorCheckboxContainer"><span class="checkboxOuter checkboxIsChecked"><span class="checkboxInner"></span></span>${textSpan}</span></li>`;
    
    this._$().append($(template));
    
    this._$(".colorCheckboxContainer").css({
      position: "relative",
      bottom: "2px",
      "margin-left": "15px"
    });
    
    this._$(".checkboxOuter").css({
      width: "12px",
      height: "12px",
      "border-radius": "2px",
      border: "1px solid #A9A7A5",
      "box-sizing": "boder-box",
      top: "3px",
      position: "absolute",
      margin: "0px"
    });
    
    this._$(".checkboxInner").css({
      "box-sizing": "content-box",
      content: "",
      border: "1px solid #fff",
      "border-left": "0px",
      "border-top": "0px",
      height: "7px",
      width: "3px",
      left: "-1px",
      position: "absolute",
      transform: "rotate(45deg) scaleY(1)"
    });
    
    this._$(".checkboxTxt").css({
      "margin-left": "15px",
      "font-size": "14px"
    });
    
    if (this.options.status === ColorCheckboxWrapper.StatusEnum.checked && !this.options.disabled) {
      this._$(".checkboxIsChecked").css({
        background: "#499ef7",
        "border-color": "#199ef7"
      });
    } else if (this.options.status !== ColorCheckboxWrapper.StatusEnum.unchecked || this.options.disabled) {
      this._$(".colorCheckboxContainer").css("opacity", "0.65");
    }
    
    if (this.options.tooltip) {
      this._$(".colorCheckboxContainer").attr("title", this.options.tooltip);
    }
    
    if (this.options.onclick) {
      this._$(".colorCheckboxContainer").unbind("click").bind("click", this.options.onclick);
    }
    
    this._$().show();
    
    if (this.options.hidden) {
      this._$().hide();
    }
  },

  _$: function(this: any, selector?: string): JQuery {
    return selector ? this._$().find(selector) : this.element;
  },

  _destroy: function(this: any): void {
    this.element.html("");
    this._$(".colorCheckboxContainer").unbind("click");
  }
});

export default ColorCheckboxWrapper;