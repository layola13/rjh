interface OptionsLocale {
  items_per_page: string;
  jump_to: string;
  jump_to_confirm: string;
  page: string;
  page_size: string;
}

interface OptionsProps {
  pageSize: number;
  locale: OptionsLocale;
  changeSize: (size: number) => void;
  quickGo: (page: number) => void;
  rootPrefixCls: string;
  goButton?: boolean | React.ReactNode;
  selectComponentClass: any;
  buildOptionText?: (size: number) => string;
  selectPrefixCls: string;
  disabled?: boolean;
  pageSizeOptions: string[];
}

interface OptionsState {
  goInputText: string;
}

class Options extends React.Component<OptionsProps, OptionsState> {
  static defaultProps = {
    pageSizeOptions: ["10", "20", "50", "100"]
  };

  state: OptionsState = {
    goInputText: ""
  };

  buildOptionText = (size: number): string => {
    return `${size} ${this.props.locale.items_per_page}`;
  };

  changeSize = (value: string): void => {
    this.props.changeSize(Number(value));
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      goInputText: event.target.value
    });
  };

  handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    const { goButton, quickGo, rootPrefixCls } = this.props;
    const { goInputText } = this.state;

    if (goButton || goInputText === "") {
      return;
    }

    this.setState({
      goInputText: ""
    });

    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (
      relatedTarget &&
      (relatedTarget.className.indexOf(`${rootPrefixCls}-item-link`) >= 0 ||
        relatedTarget.className.indexOf(`${rootPrefixCls}-item`) >= 0)
    ) {
      return;
    }

    quickGo(this.getValidValue());
  };

  go = (event: React.KeyboardEvent | React.MouseEvent): void => {
    const { goInputText } = this.state;

    if (goInputText === "") {
      return;
    }

    const isEnterKey = (event as React.KeyboardEvent).keyCode === 13;
    const isClick = event.type === "click";

    if (!isEnterKey && !isClick) {
      return;
    }

    this.setState({
      goInputText: ""
    });

    this.props.quickGo(this.getValidValue());
  };

  getValidValue(): number {
    const { goInputText } = this.state;
    
    if (!goInputText || isNaN(Number(goInputText))) {
      return undefined;
    }

    return Number(goInputText);
  }

  getPageSizeOptions(): string[] {
    const { pageSize, pageSizeOptions } = this.props;

    const hasPageSize = pageSizeOptions.some(
      option => option.toString() === pageSize.toString()
    );

    if (hasPageSize) {
      return pageSizeOptions;
    }

    return pageSizeOptions
      .concat([pageSize.toString()])
      .sort((a, b) => {
        const numA = isNaN(Number(a)) ? 0 : Number(a);
        const numB = isNaN(Number(b)) ? 0 : Number(b);
        return numA - numB;
      });
  }

  render(): React.ReactElement | null {
    const {
      pageSize,
      locale,
      rootPrefixCls,
      changeSize,
      quickGo,
      goButton,
      selectComponentClass: SelectComponent,
      buildOptionText,
      selectPrefixCls,
      disabled
    } = this.props;

    const { goInputText } = this.state;

    if (!changeSize && !quickGo) {
      return null;
    }

    const optionsClassName = `${rootPrefixCls}-options`;
    const pageSizeOptions = this.getPageSizeOptions();

    let sizeChanger: React.ReactNode = null;
    let quickJumper: React.ReactNode = null;
    let goButtonNode: React.ReactNode = null;

    if (changeSize && SelectComponent) {
      const options = pageSizeOptions.map((size, index) => (
        <SelectComponent.Option key={index} value={size.toString()}>
          {(buildOptionText || this.buildOptionText)(Number(size))}
        </SelectComponent.Option>
      ));

      sizeChanger = (
        <SelectComponent
          disabled={disabled}
          prefixCls={selectPrefixCls}
          showSearch={false}
          className={`${optionsClassName}-size-changer`}
          optionLabelProp="children"
          dropdownMatchSelectWidth={false}
          value={(pageSize || Number(pageSizeOptions[0])).toString()}
          onChange={this.changeSize}
          getPopupContainer={(node: HTMLElement) => node.parentNode}
          aria-label={locale.page_size}
          defaultOpen={false}
        >
          {options}
        </SelectComponent>
      );
    }

    if (quickGo) {
      if (goButton) {
        goButtonNode =
          typeof goButton === "boolean" ? (
            <button
              type="button"
              onClick={this.go}
              onKeyUp={this.go}
              disabled={disabled}
              className={`${optionsClassName}-quick-jumper-button`}
            >
              {locale.jump_to_confirm}
            </button>
          ) : (
            <span onClick={this.go} onKeyUp={this.go}>
              {goButton}
            </span>
          );
      }

      quickJumper = (
        <div className={`${optionsClassName}-quick-jumper`}>
          {locale.jump_to}
          <input
            disabled={disabled}
            type="text"
            value={goInputText}
            onChange={this.handleChange}
            onKeyUp={this.go}
            onBlur={this.handleBlur}
            aria-label={locale.page}
          />
          {locale.page}
          {goButtonNode}
        </div>
      );
    }

    return (
      <li className={optionsClassName}>
        {sizeChanger}
        {quickJumper}
      </li>
    );
  }
}

export default Options;