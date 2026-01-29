import React from 'react';

interface IconfontViewProps {
  onMouseEnter: () => void;
  onMouseOut: () => void;
  showType: string;
  customStyle: {
    color: string;
    hoverColor: string;
    fontSize: string;
  };
}

declare const IconfontView: React.FC<IconfontViewProps>;

interface StarMarkingProps {
  data: string;
  changeMarkingScores: (payload: { module: string; score: number }) => void;
}

interface StarMarkingState {
  clickIndex: number;
  hoverIndex: number;
}

export class StarMarking extends React.Component<StarMarkingProps, StarMarkingState> {
  constructor(props: StarMarkingProps) {
    super(props);
    this.state = {
      clickIndex: 0,
      hoverIndex: 0
    };
  }

  handleClick(index: number): void {
    this.setState({
      clickIndex: index
    });
    this.changeMarkingScore(index);
  }

  handleOnMouseEnter(index: number): void {
    this.setState({
      hoverIndex: index
    });
  }

  handleOnMouseOut(): void {
    this.setState({
      hoverIndex: 0
    });
  }

  changeMarkingScore(score: number): void {
    const payload = {
      module: this.props.data,
      score: score
    };
    this.props.changeMarkingScores(payload);
  }

  getStar(): React.ReactNode[] {
    const activeIndex = this.state.hoverIndex === 0 
      ? this.state.clickIndex 
      : this.state.hoverIndex;
    const stars: React.ReactNode[] = [];

    [1, 2, 3, 4, 5].map((starIndex) => {
      let color = 'rgb(237, 181, 70)';
      if (starIndex > activeIndex) {
        color = '#C9C7C7';
      }
      stars.push(
        React.createElement('div', {
          onClick: () => this.handleClick(starIndex)
        }, React.createElement(IconfontView, {
          onMouseEnter: () => this.handleOnMouseEnter(starIndex),
          onMouseOut: () => this.handleOnMouseOut(),
          showType: 'hs_mian_shoucang',
          customStyle: {
            color: color,
            hoverColor: 'rgb(255, 183, 57)',
            fontSize: '28px'
          }
        }))
      );
    });

    return stars;
  }

  render(): React.ReactNode {
    const starElements = this.getStar();
    return React.createElement('div', {
      className: 'starmarkingentry'
    }, React.createElement('div', {
      className: 'functionname'
    }, this.props.data), React.createElement('div', {
      className: 'starcontainer'
    }, starElements));
  }
}