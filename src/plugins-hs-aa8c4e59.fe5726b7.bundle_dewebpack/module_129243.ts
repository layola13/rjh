import React from 'react';

interface ImageComponentProps {
  className?: string;
  src: string;
  onLoad?: () => void;
}

export default class ImageComponent extends React.Component<ImageComponentProps> {
  constructor(props: ImageComponentProps) {
    super(props);
    this._onLoad = this._onLoad.bind(this);
  }

  private _onLoad(): void {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  render(): React.ReactElement {
    return React.createElement('img', {
      className: this.props.className,
      ref: 'image',
      onLoad: this._onLoad,
      src: this.props.src
    });
  }
}