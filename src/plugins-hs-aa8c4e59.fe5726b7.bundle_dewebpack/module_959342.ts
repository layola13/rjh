import React, { Component, MouseEvent } from 'react';

interface PictureInfo {
  url: string;
}

interface PictureItemProps {
  picInfo: PictureInfo;
  userData: unknown;
  initialSelected: boolean;
  clickNotify: (userData: unknown) => void;
}

interface PictureItemState {
  selected: boolean;
}

export default class PictureItem extends Component<PictureItemProps, PictureItemState> {
  constructor(props: PictureItemProps) {
    super(props);
    
    this.state = {
      selected: props.initialSelected
    };
  }

  private _onClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    const { userData, clickNotify } = this.props;
    clickNotify(userData);
  };

  setSelectState_ = (selected: boolean): void => {
    this.setState({ selected });
  };

  render(): JSX.Element {
    const { picInfo } = this.props;
    const { selected } = this.state;
    const imageClassName = `img ${selected ? 'selected' : ''}`;

    return (
      <div className="pictureItem" onClick={this._onClick}>
        <img className={imageClassName} src={picInfo.url} />
      </div>
    );
  }
}