enum CheckBoxStatus {
  checked = "checked",
  unchecked = "unchecked",
  indeterminate = "indeterminate"
}

interface CheckBoxOptions {
  text?: string;
  status?: CheckBoxStatus;
  disabled?: boolean;
  tooltip?: string;
  onclick?: (event: JQuery.ClickEvent) => void;
  hidden?: boolean;
  popover?: PopoverConfig;
}

interface PopoverConfig {
  placement: string;
  trigger: string;
  text: string;
}

interface CheckBoxInstance {
  ccheckBox(method: "destroy"): void;
  ccheckBox(options: CheckBoxOptions): CheckBoxInstance;
}

class CheckBox {
  static readonly StatusEnum = CheckBoxStatus;

  private container: JQuery;
  private param: CheckBoxOptions;
  private instance: CheckBoxInstance | undefined;

  constructor(element: string | HTMLElement, options: CheckBoxOptions) {
    this.container = $(element);
    this.param = options;
    this.instance = this.container.ccheckBox(this.param) as CheckBoxInstance;
  }

  static create(element: string | HTMLElement, options: CheckBoxOptions): CheckBox {
    return new CheckBox(element, options);
  }

  update(options: CheckBoxOptions): void {
    this.destroy();
    $.extend(this.param, options);
    this.instance = this.container.ccheckBox(this.param) as CheckBoxInstance;
  }

  destroy(): void {
    this.instance?.ccheckBox("destroy");
  }
}

$.widget("custom.ccheckBox", {
  widgetEventPrefix: "ccheckBox",
  
  options: {
    text: "",
    status: CheckBoxStatus.unchecked,
    disabled: false,
    tooltip: "",
    onclick: undefined,
    hidden: false,
    popover: undefined
  } as CheckBoxOptions,

  _create(this: any): void {
    const labelHtml = this.options.text 
      ? `<span class="inputlabel">${this.options.text}</span>` 
      : "";
    const checkboxHtml = `<span class="checkboxContainer"><input type="checkbox"/>${labelHtml}</span>`;

    if (this.options.popover) {
      const popoverConfig = this.options.popover;
      ReactDOM.render(
        React.createElement(
          HSApp.UI.Popover.Heavy,
          {
            placement: popoverConfig.placement,
            trigger: popoverConfig.trigger,
            text: ResourceManager.getString(popoverConfig.text),
            showBtn: true
          },
          React.createElement("span", {
            dangerouslySetInnerHTML: { __html: checkboxHtml }
          })
        ),
        this._$()[0]
      );
    } else {
      this._$().append($(checkboxHtml));
    }

    const checkbox = this._$("input[type=checkbox]");
    checkbox.prop("indeterminate", false).prop("checked", "");

    switch (this.options.status) {
      case CheckBoxStatus.checked:
        checkbox.prop("checked", "checked");
        break;
      case CheckBoxStatus.indeterminate:
        checkbox.prop("indeterminate", true);
        break;
    }

    this._$(".inputlable").removeClass("disabled");
    checkbox.prop("disabled", "");

    if (this.options.disabled) {
      this._$(".inputlable").addClass("disabled");
      checkbox.prop("disabled", "disabled");
    }

    if (this.options.tooltip) {
      checkbox.attr("title", this.options.tooltip);
    }

    if (this.options.onclick) {
      checkbox.unbind("click").bind("click", this.options.onclick);
    }

    this._$().show();
    if (this.options.hidden) {
      this._$().hide();
    }
  },

  _$(this: any, selector?: string): JQuery {
    return selector ? this._$().find(selector) : this.element;
  },

  _destroy(this: any): void {
    this.element.html("");
    this._$("input[type=checkbox]").unbind("click");
  }
});

export default CheckBox;