import React, { Component } from 'react';

interface GroupItem {
  name: string;
  [key: string]: unknown;
}

interface AddGroupProps {
  groupItems: GroupItem[];
  onAddClick: (groupName: string) => void;
}

interface AddGroupState {
  isFocus: boolean;
}

class AddGroup extends Component<AddGroupProps, AddGroupState> {
  private addGroupTextRef: React.RefObject<HTMLInputElement>;

  constructor(props: AddGroupProps) {
    super(props);
    
    this.state = {
      isFocus: false
    };

    this.addGroupTextRef = React.createRef();

    this._onClick = this._onClick.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onHandleKeyUp = this._onHandleKeyUp.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  private isDuplicateInName(groupItems: GroupItem[], name: string): boolean {
    return groupItems.some(item => item.name === name);
  }

  private _onClick(event: React.MouseEvent<HTMLImageElement>): void {
    event.stopPropagation();
    
    const inputValue = this.addGroupTextRef.current?.value.trim() ?? '';
    
    if (this.isDuplicateInName(this.props.groupItems, inputValue) || !inputValue) {
      this.addGroupTextRef.current?.classList.add('redBorder');
      
      if (typeof LiveHint !== 'undefined') {
        LiveHint.show(
          ResourceManager.getString('favorite_favorite_add_to_group_fail'),
          4500,
          undefined,
          {
            status: LiveHint.statusEnum.warning,
            canclose: true
          }
        );
      }
    } else {
      if (typeof HSApp !== 'undefined') {
        HSApp.Util.EventTrack.instance().track(
          HSApp.Util.EventGroupEnum.Catalog,
          'create_favorate_folder'
        );
      }
      
      this.addGroupTextRef.current?.classList.remove('redBorder');
      this.props.onAddClick(inputValue);
      
      if (this.addGroupTextRef.current) {
        this.addGroupTextRef.current.value = '';
      }
    }
  }

  private _onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.stopPropagation();
    
    const inputValue = this.addGroupTextRef.current?.value.trim() ?? '';
    
    if (this.isDuplicateInName(this.props.groupItems, inputValue)) {
      this.addGroupTextRef.current?.classList.add('redBorder');
    } else {
      this.addGroupTextRef.current?.classList.remove('redBorder');
    }
  }

  private _onHandleKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER_KEY_CODE = 13;
    
    if (event.keyCode === ENTER_KEY_CODE) {
      this._onClick(event as unknown as React.MouseEvent<HTMLImageElement>);
    }
  }

  private _onFocus(event: React.FocusEvent<HTMLInputElement>): void {
    this.setState({
      isFocus: true
    });
  }

  private _onBlur(): void {
    this.setState({
      isFocus: false
    });
  }

  render(): React.ReactElement {
    const placeholderText = ResourceManager.getString('favorite_placeholder_string');
    const addGroupIconFocused = require('./assets/icon-add-focused.png');
    const addGroupIconNormal = require('./assets/icon-add-normal.png');

    return (
      <div className="add_group">
        <input
          className="add_group_text"
          ref={this.addGroupTextRef}
          type="text"
          placeholder={placeholderText}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onKeyUp={this._onHandleKeyUp}
          onChange={this._onChange}
        />
        <img
          src={this.state.isFocus ? addGroupIconFocused : addGroupIconNormal}
          className="add_group_img"
          alt="add_group_img"
          onClick={this._onClick}
        />
      </div>
    );
  }
}

export default AddGroup;