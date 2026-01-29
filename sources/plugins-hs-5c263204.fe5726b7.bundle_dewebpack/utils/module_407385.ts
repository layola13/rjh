import * as React from 'react';

interface GroupItem {
  fid: string;
  seekId?: string;
  [key: string]: unknown;
}

interface ProductGroupInfo {
  fid: string;
  categoryId?: string;
  [key: string]: unknown;
}

interface GroupListProps {
  groupItems: GroupItem[];
  isFavoriteProductPage?: boolean;
  productGroupInfo: ProductGroupInfo;
  setCurrentFavgroup?: (groupId: string) => void;
  selectedId?: string;
}

interface SignalData {
  data: {
    fid: string;
    seekId?: string;
  };
}

interface HiddenGroupPanelPayload {
  itemId: string;
  seekId?: string;
  categoryId?: string;
}

declare global {
  interface Window {
    HSCore: {
      Util: {
        SignalHook: new (component: unknown) => SignalHook;
      };
    };
  }
}

interface SignalHook {
  listen(signal: Signal, callback: (data: SignalData) => void): void;
  unlistenAll(): void;
}

interface Signal {
  dispatch(data: HiddenGroupPanelPayload): void;
}

import GroupItemComponent from './GroupItemComponent';
import ScrollContainer from './ScrollContainer';
import SignalService from './SignalService';

class GroupList extends React.Component<GroupListProps> {
  private signalHook: SignalHook;
  private refs: {
    allGroup?: HTMLUListElement;
    scrollContainer?: HTMLElement;
  };

  constructor(props: GroupListProps) {
    super(props);
    this.signalHook = new window.HSCore.Util.SignalHook(this);
    this._onSelectedItem = this._onSelectedItem.bind(this);
    this.refs = {};
  }

  componentDidMount(): void {
    this.signalHook.listen(SignalService.signalAddGroup, (signalData: SignalData) => {
      this._onSelectedItem(signalData.data.fid, signalData.data.seekId);
    });
  }

  componentDidUpdate(): void {
    // Update logic placeholder
  }

  componentWillUnmount(): void {
    this.signalHook.unlistenAll();
  }

  private _onSelectedItem(itemId: string, seekId?: string, targetElement?: JQuery<HTMLElement>): void {
    let element = targetElement;
    
    if (!element && this.refs.allGroup) {
      element = $(this.refs.allGroup).find('li:last-child');
    }

    if (!element) {
      return;
    }

    const checkedElement = element.parent('.allGroup').find('.radio_input_checked');
    if (checkedElement) {
      checkedElement.removeClass('radio_input_checked');
    }

    element.find('.radio_input').addClass('radio_input_checked');

    setTimeout(() => {
      const payload: HiddenGroupPanelPayload = {
        itemId,
        seekId
      };

      if (this.props.productGroupInfo?.categoryId) {
        Object.assign(payload, {
          categoryId: this.props.productGroupInfo.categoryId
        });
      }

      SignalService.signalHiddenGroupPanel.dispatch(payload);
    }, 100);
  }

  private _onMouseEnter(): void {
    // Mouse enter logic placeholder
  }

  private _onMouseLeave(): void {
    // Mouse leave logic placeholder
  }

  private _onClick(): void {
    // Click logic placeholder
  }

  render(): React.ReactElement {
    const {
      groupItems,
      isFavoriteProductPage,
      productGroupInfo,
      setCurrentFavgroup,
      selectedId
    } = this.props;

    let items = groupItems;

    if (isFavoriteProductPage) {
      const itemsWithoutFirst = items.slice(1);
      itemsWithoutFirst.reverse();
      itemsWithoutFirst.unshift(items[0]);
      items = itemsWithoutFirst;
    }

    const renderedItems: React.ReactElement[] = [];

    items.forEach((groupItem: GroupItem) => {
      if (!groupItem) {
        return;
      }

      if (isFavoriteProductPage) {
        renderedItems.push(
          <GroupItemComponent
            key={groupItem.fid}
            isFavoriteProductPage={isFavoriteProductPage}
            groupItem={groupItem}
            productGroupInfo={productGroupInfo}
            setCurrentFavgroup={setCurrentFavgroup}
            selectedId={selectedId}
          />
        );
      } else {
        renderedItems.push(
          <GroupItemComponent
            key={groupItem.fid}
            groupItem={groupItem}
            checked={productGroupInfo.fid === groupItem.fid}
            productGroupInfo={productGroupInfo}
            onSelectedItem={this._onSelectedItem}
          />
        );
      }
    });

    return (
      <div className="scroll_wrapper">
        <ScrollContainer
          className={true}
          ref="scrollContainer"
          key={Math.random()}
        >
          <ul className="allGroup" ref="allGroup">
            {renderedItems}
          </ul>
        </ScrollContainer>
      </div>
    );
  }
}

export default GroupList;