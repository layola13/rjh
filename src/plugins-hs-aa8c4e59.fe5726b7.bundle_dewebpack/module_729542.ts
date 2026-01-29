import React, { Component, RefObject } from 'react';

interface PicInfo {
  [key: string]: unknown;
}

interface PictureListItemProps {
  picInfo: PicInfo;
  initialSelected: boolean;
  clickNotify: (userData: { itemIdx: number }) => void;
  userData: { itemIdx: number };
}

interface PictureListItemInstance {
  props: PictureListItemProps;
  setSelectState_(selected: boolean): void;
}

interface PictureListContainerProps {
  picInfoList: PicInfo[];
  selectChangeNotify?: (picInfo: PicInfo) => void;
}

class PictureListItem extends Component<PictureListItemProps> {
  setSelectState_(selected: boolean): void {
    // Implementation placeholder
  }
}

class PictureListContainer extends Component<PictureListContainerProps> {
  private _selectIdx: number = -1;
  private _items: JSX.Element[] = [];
  private _itemInstanceArr: (PictureListItemInstance | null)[] = [];
  private listContainerRef: RefObject<HTMLDivElement> = React.createRef();

  UNSAFE_componentWillMount(): void {
    this._selectIdx = -1;
    this._initItems();
  }

  componentDidMount(): void {
    const element = this.listContainerRef.current;
    if (element) {
      $(element).perfectScrollbar({
        suppressScrollX: true
      });
    }
  }

  componentDidUpdate(prevProps: PictureListContainerProps): void {
    const element = this.listContainerRef.current;
    if (element) {
      $(element).perfectScrollbar('update');
    }
  }

  componentWillUnmount(): void {
    const element = this.listContainerRef.current;
    if (element) {
      $(element).perfectScrollbar('destroy');
    }
    this._destroyItems();
  }

  private _initItems = (): void => {
    this._items = [];
    const picInfoList = this.props.picInfoList;
    const length = picInfoList.length;
    this._itemInstanceArr = new Array(length).fill(null);

    for (let i = 0; i < length; ++i) {
      this._items.push(
        React.createElement(PictureListItem, {
          key: i,
          ref: this._onRefFunc,
          picInfo: picInfoList[i],
          initialSelected: this._selectIdx === i,
          clickNotify: this._onItemClick,
          userData: { itemIdx: i }
        })
      );
    }
  };

  private _destroyItems = (): void => {
    this._items = [];
    this._itemInstanceArr = [];
  };

  private _onRefFunc = (instance: PictureListItemInstance | null): void => {
    if (instance) {
      const itemIdx = instance.props.userData.itemIdx;
      this._itemInstanceArr[itemIdx] = instance;
    }
  };

  private _onItemClick = (userData: { itemIdx: number }): void => {
    const itemIdx = userData.itemIdx;

    if (itemIdx !== this._selectIdx) {
      const newItem = this._itemInstanceArr[itemIdx];
      if (newItem) {
        newItem.setSelectState_(true);
      }

      if (this._selectIdx !== -1) {
        const previousItem = this._itemInstanceArr[this._selectIdx];
        if (previousItem) {
          previousItem.setSelectState_(false);
        }
      }

      this._selectIdx = itemIdx;

      if (this.props.selectChangeNotify) {
        this.props.selectChangeNotify(this.props.picInfoList[itemIdx]);
      }
    }
  };

  render(): JSX.Element {
    return React.createElement(
      'div',
      {
        className: 'pictureListContainer',
        ref: this.listContainerRef
      },
      this._items
    );
  }
}

export default PictureListContainer;