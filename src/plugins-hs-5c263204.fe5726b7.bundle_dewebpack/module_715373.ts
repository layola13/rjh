import React, { Component } from 'react';

interface FallbackImageProps {
  src: string;
  fallbackSrc: () => string;
  className?: string;
}

interface FallbackImageState {
  src: string;
  errored: boolean;
  className?: string;
}

export default class FallbackImage extends Component<FallbackImageProps, FallbackImageState> {
  constructor(props: FallbackImageProps) {
    super(props);
    
    this.state = {
      src: props.src,
      errored: false,
      className: props.className
    };
  }

  private onError = (): void => {
    if (!this.state.errored) {
      this.setState({
        src: this.props.fallbackSrc(),
        errored: true
      });
    }
  };

  render(): React.ReactElement {
    const { src, className } = this.state;
    
    return (
      <img
        src={src}
        onError={this.onError}
        className={className}
      />
    );
  }
}