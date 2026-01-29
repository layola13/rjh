interface MultiChoiceItem {
  id: string | number;
  name: string;
}

interface MultiChoiceData {
  items: MultiChoiceItem[];
  selectKeys: Array<string | number>;
  selectChange?: (name: string, keys: Array<string | number>) => void;
  name: string;
}

interface MultiChoiceProps {
  data: MultiChoiceData;
}

interface MultiChoiceState {
  items: MultiChoiceItem[];
  selectKeys: Array<string | number>;
  selectChange?: (name: string, keys: Array<string | number>) => void;
  name: string;
}

class MultiChoiceComponent extends React.Component<MultiChoiceProps, MultiChoiceState> {
  getInitialState(): MultiChoiceState {
    const { data } = this.props;
    return {
      items: data.items,
      selectKeys: data.selectKeys,
      selectChange: data.selectChange,
      name: data.name
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: MultiChoiceProps): void {
    const { items, selectChange, name } = nextProps.data;
    this.setState({
      items,
      selectChange,
      name
    });
  }

  private _onItemSelect = (itemId: string | number): void => {
    const newSelectKeys: Array<string | number> = [];
    let isAlreadySelected = false;

    this.state.selectKeys.forEach((key) => {
      if (key !== itemId) {
        newSelectKeys.push(key);
      } else {
        isAlreadySelected = true;
      }
    });

    if (!isAlreadySelected) {
      newSelectKeys.push(itemId);
    }

    this.setState(
      { selectKeys: newSelectKeys },
      () => {
        this.state.selectChange?.(this.state.name, newSelectKeys);
      }
    );
  };

  render(): JSX.Element {
    const renderedItems: JSX.Element[] = [];

    this.state.items?.forEach((item) => {
      const isSelected = this.state.selectKeys.some((key) => key === item.id);

      const listItem = isSelected
        ? React.createElement(
            "li",
            { className: "multiChoiceItemLi itemSelected" },
            React.createElement("span", null, item.name),
            React.createElement(
              "span",
              {
                className: "itemSelectBtn",
                onClick: () => this._onItemSelect(item.id)
              },
              "X"
            )
          )
        : React.createElement(
            "li",
            {
              className: "multiChoiceItemLi",
              onClick: () => this._onItemSelect(item.id)
            },
            React.createElement("span", null, item.name)
          );

      renderedItems.push(listItem);
    });

    return React.createElement(
      "ul",
      { className: `multiChoiceItem ${this.state.name}` },
      renderedItems
    );
  }
}

export default MultiChoiceComponent;