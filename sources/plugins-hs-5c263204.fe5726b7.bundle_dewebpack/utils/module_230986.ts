import React from 'react';
import ReactDOM from 'react-dom';
import DetailView from './DetailView';

interface ListItemProps {
  item: {
    imageUrl: string;
    neighbor: string;
    grossAreaNum: number;
    bedroomNum: number;
  };
}

export default class ListItem extends React.Component<ListItemProps> {
  constructor(props: ListItemProps) {
    super(props);
    this.openDetailView = this.openDetailView.bind(this);
  }

  openDetailView(): void {
    const container = $('#list-item-detail-view-container');
    
    if (container.length >= 1) {
      container.removeClass('hide');
    } else {
      $('#collectionFrame').append('<div id="list-item-detail-view-container"></div>');
    }
    
    ReactDOM.render(
      <DetailView item={this.props.item} />,
      document.querySelector('#list-item-detail-view-container')
    );
  }

  render(): React.ReactElement {
    const { item } = this.props;
    
    return (
      <div className="listItem" ref="listItem" onClick={this.openDetailView}>
        <div className="masker" />
        <img
          src={`${item.imageUrl}?x-oss-process=style/small`}
          alt={`${item.neighbor} 2d view`}
        />
        <div className="detailInfo">
          <div className="room-detail">
            <span>{item.grossAreaNum} </span>
            <span>㎡ </span>
            <span>{item.bedroomNum} </span>
            <span>室</span>
          </div>
          <span className="neighbor-name">{item.neighbor} </span>
        </div>
      </div>
    );
  }
}