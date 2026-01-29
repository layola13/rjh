interface FloorPlanData {
  value: number;
  options: DataOptions;
  onValueChange?: (params: { value: number }) => void;
  onValueValidation?: (params: { value: number }) => void;
  title?: string;
  name?: string;
  className?: string;
}

interface DataOptions {
  readOnly?: boolean;
  items?: string[];
  rules?: ValidationRules;
}

interface ValidationRules {
  positiveOnly?: boolean;
  range?: {
    min?: number;
    max?: number;
  };
}

interface FloorLanResult {
  unitType: string;
  displayDigits: number;
  textExpression: string;
  oldValue: number;
}

interface ComponentProps {
  data: FloorPlanData;
  id?: string;
  className?: string;
}

interface ComponentState {
  data: FloorPlanData;
  value: string;
  option: DataOptions;
  unitType: string;
  displayDigits: number;
  oldValue: number;
  focus: boolean;
  show: boolean;
  highlight: boolean;
}

const DropdownEditComponent = {
  showItems: false as boolean,

  getfloorlan(value: number): FloorLanResult {
    const floorplan = HSApp.App.getApp().floorplan;
    const unitType = floorplan.displayLengthUnit;
    const displayDigits = floorplan.displayLengthPrecisionDigits;

    return {
      unitType,
      displayDigits,
      textExpression: isNaN(value)
        ? "--"
        : HSApp.Util.UnitFormater.toLengthDisplayString(
            value,
            unitType,
            displayDigits,
            false
          ),
      oldValue: value,
    };
  },

  getInitialState(this: any): ComponentState {
    const dataValue = this.props.data.value;
    const { unitType, displayDigits, textExpression, oldValue } =
      this.getfloorlan(dataValue);

    return {
      data: this.props.data,
      value: textExpression,
      option: this.props.data.options,
      unitType,
      displayDigits,
      oldValue,
      focus: false,
      show: false,
      highlight: false,
    };
  },

  UNSAFE_componentWillReceiveProps(this: any, nextProps: ComponentProps): void {
    const newValue = nextProps.data.value;
    const { unitType, displayDigits, textExpression, oldValue } =
      this.getfloorlan(newValue);

    this.setState({
      data: nextProps.data,
      option: nextProps.data.options,
      value: textExpression,
      unitType,
      displayDigits,
      oldValue,
      focus: false,
      show: false,
    });
  },

  componentDidMount(this: any): void {
    this.showItems = false;
    document.body.addEventListener("click", this.doit, true);

    const inputElement = ReactDOM.findDOMNode(this.refs.myinput) as HTMLInputElement;
    if (this.state.option.readOnly) {
      inputElement.setAttribute("readOnly", "true");
      inputElement.style.backgroundColor = "#ebebeb";
      inputElement.style.color = "#808080";
    }
  },

  componentWillUnmount(this: any): void {
    document.body.removeEventListener("click", this.doit);

    const inputElement = ReactDOM.findDOMNode(this.refs.myinput) as HTMLInputElement;
    if (this.state.option.readOnly) {
      inputElement.setAttribute("readOnly", "true");
      inputElement.style.backgroundColor = "#ebebeb";
      inputElement.style.color = "#808080";
    } else {
      inputElement.removeAttribute("readOnly");
      inputElement.style.backgroundColor = "#fafafa";
      inputElement.style.color = "#343a40";
    }
  },

  doit(this: any): void {
    if (this.state.show) {
      this.setState({
        show: false,
        highlight: false,
      });
    } else {
      this.showItems = false;
    }
  },

  callul(this: any): void {
    this.showItems = !this.showItems;
    this.setState({
      show: this.showItems,
      highlight: true,
    });
  },

  _onItemClick(this: any, event: React.MouseEvent, data: FloorPlanData, itemValue: string): void {
    this.setState({
      value: itemValue,
      show: false,
    });
    this.updatevalue(itemValue);
    HSApp.App.getApp()
      .pluginManager.getPlugin(HSFPConstants.PluginType.LeftMenu)
      .hideLeftMenu();
  },

  _isValueMatchRules(this: any, value: number): boolean {
    if (!this.state.option.rules) {
      return true;
    }

    if (this.state.option.rules.positiveOnly && value < 0) {
      return false;
    }

    return this._isValueInRange(value);
  },

  _isValueInRange(this: any, value: number): boolean {
    if (!this.state.option.rules?.range) {
      return true;
    }

    const range = this.state.option.rules.range;

    if (range.min !== undefined) {
      if (HSCore.Util.Math.nearlyEquals(value, range.min)) {
        return true;
      }
      if (value < range.min) {
        return false;
      }
    }

    if (range.max !== undefined) {
      if (HSCore.Util.Math.nearlyEquals(value, range.max)) {
        return true;
      }
      if (value > range.max) {
        return false;
      }
    }

    return true;
  },

  updatevalue(this: any, inputValue?: string): void {
    let value = inputValue ?? this.state.value;

    if (value === "--") {
      value = "0";
    }

    const parsedValue = HSApp.Util.ParseUtil.tryGetLengthDatabaseUnitValue(
      value,
      this.state.unitType
    );

    let validatedValue: number | undefined;
    if (this._isValueMatchRules(parsedValue)) {
      validatedValue = parsedValue;
    }

    if (
      validatedValue === undefined ||
      HSCore.Util.Math.nearlyEquals(this.state.value, validatedValue)
    ) {
      const validationParams = {
        value: HSApp.Util.ParseUtil.tryGetLengthDatabaseUnitValue(
          this.state.value,
          this.state.unitType
        ),
      };
      const validationCallback = this.state.data.onValueValidation;
      validationCallback?.(validationParams);
    } else {
      const displayValue = isNaN(validatedValue)
        ? "--"
        : HSApp.Util.UnitFormater.toLengthDisplayString(
            validatedValue,
            this.state.unitType,
            this.state.displayDigits,
            false
          );
      this.onblur(displayValue);
    }
  },

  keydown(this: any, event: React.KeyboardEvent): void {
    if (this.state.option.readOnly) {
      return;
    }

    if (event.keyCode === 13) {
      this.updatevalue();
      HSApp.App.getApp()
        .pluginManager.getPlugin(HSFPConstants.PluginType.LeftMenu)
        .hideLeftMenu();
    }
  },

  handleChange(this: any, event: React.ChangeEvent<HTMLInputElement>): void {
    if (this.state.option.readOnly) {
      return;
    }

    const inputText = event.target.value;
    let parsedValue = HSApp.Util.ParseUtil.tryGetLengthDatabaseUnitValue(
      inputText,
      this.state.unitType
    );
    let oldValue = this.state.oldValue;

    if (!this._isValueMatchRules(parsedValue)) {
      parsedValue = oldValue;
    }

    if (!isNaN(parsedValue)) {
      oldValue = parsedValue;
    }

    this.setState({
      value: inputText,
      oldValue,
    });
  },

  onblur(this: any, blurValue?: string): void {
    const value = typeof blurValue === "string" ? blurValue : this.state.value;
    const parsedValue = HSApp.Util.ParseUtil.tryGetLengthDatabaseUnitValue(
      value,
      this.state.unitType
    );

    if (HSCore.Util.Math.nearlyEquals(parsedValue, this.state.value)) {
      return;
    }

    if (!isNaN(parsedValue) && this._isValueMatchRules(parsedValue)) {
      const changeParams = { value: parsedValue };
      this.state.data.onValueChange?.(changeParams);
    } else {
      this.updatevalue();
    }
  },

  onfocus(this: any, event: React.FocusEvent<HTMLInputElement>): void {
    if (!this.state.focus) {
      event.target.select();
      this.setState({
        focus: true,
      });
    }
  },

  render(this: any): React.ReactElement {
    const data = this.props.data;
    const displayValue = this.state.value;

    let containerClassName = "";
    if (this.props.data.className) {
      containerClassName = this.props.data.className;
    }

    containerClassName += this.state.show
      ? " dropdowneditul"
      : " dropdowneditul hide";

    const listItems: React.ReactElement[] = [];
    const componentClassName = `${this.props.id}wallthickness dropdownlist`;

    let titleElement = React.createElement(
      "span",
      { className: "utitle" },
      `${data.title}`
    );

    if (this.props.id === "updownDropdown ") {
      titleElement = React.createElement(
        "p",
        { className: "cabinetLabel" },
        `${data.title}`
      );
    }

    data.options.items?.forEach((item: string) => {
      const itemText = item;
      const itemTitle = item;
      const currentDisplayValue = HSApp.Util.UnitFormater.toLengthDisplayString(
        data.value,
        this.state.unitType,
        this.state.displayDigits,
        false
      );

      if (currentDisplayValue === item) {
        listItems.push(
          React.createElement(
            "li",
            {
              className: "dropdownli highlight",
              role: "presentation",
              title: itemTitle,
              onClick: (event: React.MouseEvent) =>
                this._onItemClick(event, data, item),
            },
            React.createElement("span", null, itemText)
          )
        );
      } else {
        listItems.push(
          React.createElement(
            "li",
            {
              className: "dropdownli",
              role: "presentation",
              title: itemTitle,
              onClick: (event: React.MouseEvent) =>
                this._onItemClick(event, data, item),
            },
            React.createElement("span", { className: "utext" }, itemText)
          )
        );
      }
    });

    return React.createElement(
      "div",
      { className: componentClassName },
      titleElement,
      React.createElement(
        "div",
        { className: "ulcontainer" },
        React.createElement(
          "div",
          { className: "right_length_input " },
          React.createElement("input", {
            className: "input",
            type: "text",
            name: data.name,
            defaultValue: displayValue,
            value: displayValue,
            ref: "myinput",
            onKeyDown: this.keydown,
            onChange: this.handleChange,
            onBlur: this.onblur,
            onFocus: this.onfocus,
            style: this.state.highlight ? { background: " #a4d3f7" } : undefined,
          })
        ),
        React.createElement(
          "div",
          {
            className: "caretContainerBorder",
            onClick: this.callul,
          },
          React.createElement(IconfontView, {
            showType: this.state.show
              ? "hs_xiao_danjiantou_shang"
              : "hs_xiao_danjiantou_xia",
            customStyle: { fontSize: "8px" },
            customClass: "caret-icon",
            hoverColor: "#396EFE",
            clickColor: "#396EFE",
          })
        ),
        React.createElement(
          "ul",
          {
            role: "menu",
            className: containerClassName,
          },
          listItems
        )
      )
    );
  },
};

export default DropdownEditComponent;