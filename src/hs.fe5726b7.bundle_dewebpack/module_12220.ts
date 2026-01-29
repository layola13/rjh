import React from 'react';

interface StyleItem {
  code: string;
  label: string;
}

interface StyleSelectorProps {
  data: StyleItem[];
  defaultValue: StyleItem | string;
  onSubmit?: (selectedItem: StyleItem) => void;
  onClose?: () => void;
}

interface StyleSelectorState {
  selectedItem: StyleItem;
}

export default class StyleSelector extends React.Component<StyleSelectorProps, StyleSelectorState> {
  static defaultProps: Partial<StyleSelectorProps> = {
    data: [],
    defaultValue: ""
  };

  constructor(props: StyleSelectorProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.state = {
      selectedItem: this.props.defaultValue as StyleItem
    };
  }

  selectType(item: StyleItem): void {
    this.setState({
      selectedItem: item
    });
  }

  onClick(): void {
    this.props.onSubmit?.(this.state.selectedItem);
  }

  onClose(): void {
    this.props.onClose?.();
  }

  render(): React.ReactElement {
    const { selectedItem } = this.state;
    
    return (
      <div className="style-selector-wrapper">
        <div className="style-selector-header">
          <span className="style-selector-label">
            {ResourceManager.getString("content_contextmenu_style_setting_select")}
          </span>
          <span 
            className="style-selector-close" 
            onClick={this.onClose}
          />
        </div>
        <div className="style-selector-body">
          {this.props.data.map((item) => (
            <span
              key={item.code}
              className={`style-selector-type ${item.code === selectedItem.code ? "style-selector-selected" : ""}`}
              onClick={() => this.selectType(item)}
            >
              {item.label}
            </span>
          ))}
        </div>
        <div className="style-selector-footer">
          <button onClick={this.onClick}>
            {ResourceManager.getString("messageDialog_OK")}
          </button>
        </div>
      </div>
    );
  }
}