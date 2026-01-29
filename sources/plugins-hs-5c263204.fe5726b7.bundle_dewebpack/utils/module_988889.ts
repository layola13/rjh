import React, { Component, MouseEvent } from 'react';

interface CityNameBlockProps {
  id: string;
  name: string;
  clickHandler: (event: MouseEvent<HTMLDivElement>) => void;
}

interface CityNameBlockState {
  selectedFlag: boolean;
}

export default class CityNameBlock extends Component<CityNameBlockProps, CityNameBlockState> {
  constructor(props: CityNameBlockProps) {
    super(props);
    this.state = {
      selectedFlag: false
    };
    this.clickCityHandler = this.clickCityHandler.bind(this);
  }

  clickCityHandler(event: MouseEvent<HTMLDivElement>): void {
    const addressViewContainer = $('#addressViewContainer');
    if (addressViewContainer.attr('class') === 'showUp') {
      addressViewContainer.removeClass('showUp');
      addressViewContainer.addClass('hide');
    }

    const cityZoneClass = $('.cityZone').attr('class');
    if (cityZoneClass && cityZoneClass.search('selected') !== -1) {
      $('.cityZone').removeClass('selected');
    }

    this.setState({
      selectedFlag: true
    });

    this.props.clickHandler(event);
    this.forceUpdate();
  }

  render(): JSX.Element {
    const selectedClass = this.state.selectedFlag ? ' seleted' : ' ';
    
    return (
      <div
        className={`cityNameBlock${selectedClass}`}
        id={this.props.id}
        onClick={this.clickCityHandler}
      >
        {this.props.name}
      </div>
    );
  }
}