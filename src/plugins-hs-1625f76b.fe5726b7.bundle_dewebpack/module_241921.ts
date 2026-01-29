import React, { Component, RefObject, createRef } from 'react';
import ReactDOM from 'react-dom';

interface DropdownItem {
  id?: string;
  code?: string;
  name?: string;
  [key: string]: unknown;
}

interface DropdownProps {
  items?: DropdownItem[];
  name?: string;
  title?: string;
  selectedindex?: number;
  classname?: string;
  placeholder?: string;
  onchanged?: (name: string | undefined, item: DropdownItem) => void;
}

interface DropdownState {
  iscustome: boolean;
  disabled: boolean;
}

export default class Dropdown extends Component<DropdownProps, DropdownState> {
  selectedText: RefObject<HTMLSpanElement>;
  customefield: RefObject<HTMLInputElement>;
  dropdownmenu: RefObject<HTMLUListElement>;
  buttoncom: RefObject<HTMLButtonElement>;
  CurrentItem?: DropdownItem | string;

  constructor(props: DropdownProps) {
    super(props);
    
    this.selectedText = createRef<HTMLSpanElement>();
    this.customefield = createRef<HTMLInputElement>();
    this.dropdownmenu = createRef<HTMLUListElement>();
    this.buttoncom = createRef<HTMLButtonElement>();
    
    this.state = {
      iscustome: false,
      disabled: false
    };

    this.onItemClicked = this.onItemClicked.bind(this);
    this.getCurrentItem = this.getCurrentItem.bind(this);
    this.setDefaultValue = this.setDefaultValue.bind(this);
    this.disabled = this.disabled.bind(this);
    this.enabled = this.enabled.bind(this);
    this.domNode = this.domNode.bind(this);
  }

  componentDidMount(): void {
    const node = this.domNode();
    if (node) {
      $(node).perfectScrollbar({
        suppressScrollX: true
      });
    }
  }

  componentDidUpdate(): void {
    const node = this.domNode();
    if (node) {
      $(node).perfectScrollbar('update');
    }
  }

  componentWillUnmount(): void {
    const node = this.domNode();
    if (node) {
      $(node).perfectScrollbar('destroy');
    }
  }

  onItemClicked(name: string | undefined, item: DropdownItem): boolean {
    const { onchanged } = this.props;
    
    if (onchanged) {
      onchanged(name, item);
    }

    if (item.id === 'custome') {
      this.setState({
        iscustome: true
      });
    } else if (this.selectedText.current) {
      $(this.selectedText.current).html(item.name ?? '');
    }

    if (name === 'style' && this.selectedText.current) {
      this.selectedText.current.classList.add('dark-color');
    }

    this.CurrentItem = item;
    return false;
  }

  getCurrentItem(): string | DropdownItem | undefined {
    if (this.customefield.current) {
      return this.customefield.current.value;
    }
    return this.CurrentItem;
  }

  setDefaultValue(value: string | DropdownItem | undefined): void {
    if (!value) {
      return;
    }

    const domNode = ReactDOM.findDOMNode(this.selectedText.current) as HTMLElement;
    
    if (!domNode) {
      return;
    }

    if (typeof value === 'string') {
      domNode.innerHTML = value;
      domNode.title = value;
      this.CurrentItem = {};
    } else {
      const itemName = value.name ?? '';
      domNode.innerHTML = itemName;
      domNode.title = itemName;
      this.CurrentItem = value;
    }
  }

  disabled(): void {
    this.setState({
      disabled: true
    });
  }

  enabled(): void {
    this.setState({
      disabled: false
    });
  }

  domNode(): Element | Text | null {
    return ReactDOM.findDOMNode(this.dropdownmenu.current);
  }

  render(): React.ReactNode {
    const items = this.props.items ?? [];
    const name = this.props.name;
    let title = this.props.title;
    const selectedindex = this.props.selectedindex ?? 0;
    const classname = this.props.classname ?? '';
    const placeholder = this.props.placeholder ?? '';

    if (items.length > selectedindex) {
      if (items[selectedindex].name) {
        title = items[selectedindex].name;
      }
      this.CurrentItem = items[selectedindex];
    }

    let customInput: React.ReactNode;
    let hiddenClass = '';

    if (this.state.iscustome) {
      customInput = (
        <input
          disabled={this.state.disabled}
          className="form-control"
          type="text"
          ref={this.customefield}
          placeholder={placeholder}
        />
      );
      hiddenClass = ' hidden';
    }

    const menuItems: React.ReactNode[] = [];
    let keyCounter = 0;

    items.forEach((item) => {
      keyCounter += 1;
      let menuItem: React.ReactNode;

      if (!item.id) {
        menuItem = (
          <li
            key={item.code + keyCounter}
            onClick={this.onItemClicked.bind(null, name, item)}
            role="presentation"
          >
            <a key={item.code + item.name} role="menuitem">
              {item.name}
            </a>
          </li>
        );
      } else if (item.id && item.name) {
        menuItem = (
          <li
            key={item.id + item.name + keyCounter}
            onClick={this.onItemClicked.bind(null, name, item)}
            role="presentation"
          >
            <a key={item.id + item.name} role="menuitem">
              {item.name}
            </a>
          </li>
        );
      }

      if (menuItem) {
        menuItems.push(menuItem);
      }
    });

    return (
      <div className={`dropdown positionfields ${classname}`}>
        {customInput}
        <button
          disabled={this.state.disabled}
          className={`btn btn-default dropdown-toggle${hiddenClass}`}
          type="button"
          ref={this.buttoncom}
          data-toggle="dropdown"
        >
          <span ref={this.selectedText} className="currentitem" title={title}>
            {title}
          </span>
          <span className="caret" />
        </button>
        <ul
          className={`dropdown-menu${hiddenClass}`}
          ref={this.dropdownmenu}
          role="menu"
          aria-labelledby="menu1"
        >
          {menuItems}
        </ul>
      </div>
    );
  }
}