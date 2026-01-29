import * as React from 'react';
import { createComponentByType } from './component-factory';
import { Tabs, Scroll } from './ui-components';

interface TabItem {
  id: string;
  label: string;
  items: any[];
  floatItems?: any[];
  defaultSelect?: boolean;
  disableShow?: boolean;
}

interface PropertyBarLevel1Props {
  items: TabItem[];
  floatItems?: any[];
  isReadonly?: boolean;
}

interface PropertyBarLevel1State {
  selectedTabId: string;
}

export default class PropertyBarLevel1 extends React.Component<
  PropertyBarLevel1Props,
  PropertyBarLevel1State
> {
  constructor(props: PropertyBarLevel1Props) {
    super(props);
    const defaultSelectedTabId = this.getDefaultSelectedTabId(props);
    this.state = {
      selectedTabId: defaultSelectedTabId,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: PropertyBarLevel1Props): void {
    if (nextProps !== this.props) {
      const { selectedTabId } = this.state;
      const newDefaultSelectedTabId = this.getDefaultSelectedTabId(nextProps);
      if (newDefaultSelectedTabId && newDefaultSelectedTabId !== selectedTabId) {
        this.setState({
          selectedTabId: newDefaultSelectedTabId,
        });
      }
    }
  }

  getDefaultSelectedTabId(props: PropertyBarLevel1Props): string {
    const { items } = props;
    const filteredItems = this.onItemsFilter(items);
    let defaultId = '';
    
    if (filteredItems.length !== 0) {
      filteredItems.forEach((item) => {
        if (item.defaultSelect) {
          defaultId = item.id;
        }
      });
    }
    
    return defaultId;
  }

  getSecondLevelNodes(items: any[]): React.ReactNode[] {
    const nodes: React.ReactNode[] = [];
    items.forEach((item) => {
      nodes.push(createComponentByType(item));
    });
    return nodes;
  }

  getFloatItem(floatItems: any[]): React.ReactElement {
    const { isReadonly } = this.props;
    let className = `property-bar-float-item property-bar-float-item-${floatItems.length}`;
    
    if (isReadonly) {
      className += ' disable';
    }
    
    return (
      <div className={className}>
        {floatItems?.map((item) => createComponentByType(item))}
      </div>
    );
  }

  onTabChanged = (_event: any, tabId: string): void => {
    if (tabId !== this.state.selectedTabId) {
      this.setState({
        selectedTabId: tabId,
      });
    }
  };

  onItemsFilter(items: TabItem[]): TabItem[] {
    if (!items || items.length === 0) {
      return [];
    }
    return items.filter((item) => !item.disableShow);
  }

  render(): React.ReactElement {
    const { items, floatItems, isReadonly } = this.props;
    const { selectedTabId } = this.state;
    const filteredItems = this.onItemsFilter(items);
    
    if (filteredItems.length === 0) {
      return <div />;
    }
    
    let titleElement: React.ReactElement;
    let contentElement: React.ReactElement;
    let hasTabs = false;
    const hasFloatItems = floatItems && floatItems.length !== 0;
    
    if (filteredItems.length === 1) {
      titleElement = <div />;
      const firstItem = filteredItems[0];
      const allItems = [...firstItem.items];
      
      if (firstItem.floatItems?.length) {
        allItems.push(...firstItem.floatItems);
      }
      
      const secondLevelNodes = this.getSecondLevelNodes(allItems);
      contentElement = (
        <div key={firstItem.id} id={firstItem.id}>
          {secondLevelNodes}
        </div>
      );
    } else {
      const tabs: Array<{ value: string; label: string }> = [];
      hasTabs = true;
      
      filteredItems.forEach((item) => {
        tabs.push({
          value: item.id,
          label: item.label,
        });
        
        const itemsToRender = [...item.items];
        
        if (item.id === selectedTabId) {
          if (item.floatItems?.length) {
            itemsToRender.push(...item.floatItems);
          }
          const secondLevelNodes = this.getSecondLevelNodes(itemsToRender);
          contentElement = <>{secondLevelNodes}</>;
        }
      });
      
      const pageSize = filteredItems.length > 2 ? 3 : 2;
      
      titleElement = (
        <div className="property-bar-level1-title">
          <Tabs
            tabs={tabs}
            onChange={this.onTabChanged}
            defaultValue={selectedTabId && selectedTabId !== '' ? selectedTabId : filteredItems[0]?.id}
            pageSize={pageSize}
          />
        </div>
      );
    }
    
    let contentClassName = 'property-bar-level1-content';
    if (isReadonly) {
      contentClassName += ' disable';
    }
    
    const scrollClassName = `property-bar-level1-area${
      hasFloatItems ? ` has-float-item-${floatItems.length}` : ''
    }${hasTabs ? ' has-tabs' : ''}`;
    
    return (
      <div className="property-bar-level1" id={selectedTabId}>
        {titleElement}
        <Scroll className={scrollClassName} scrollYTip={true} type="simple">
          <div className={contentClassName}>{contentElement}</div>
        </Scroll>
        {hasFloatItems && this.getFloatItem(floatItems)}
      </div>
    );
  }
}