import React, { Component, MouseEvent, RefObject } from 'react';

interface AddressItem {
  id: string;
  name: string;
  children: AddressItem[];
}

interface AddressViewState {
  showFlag: boolean;
  provinceId: string;
  openCityPannel: boolean;
}

interface AddressViewProps {
  addressInfo: AddressItem[];
  provinceIdMap: Map<string, unknown>;
  cityIdMap: Map<string, unknown>;
  currentCityName: string;
  clickHandler: (event: MouseEvent<HTMLElement> | null, type?: string) => void;
  maskClickHandlder: () => void;
}

class AddressView extends Component<AddressViewProps, AddressViewState> {
  private scrollContainerRef: RefObject<HTMLDivElement>;
  private currentCityNameRef: RefObject<HTMLDivElement>;

  constructor(props: AddressViewProps) {
    super(props);
    
    this.state = {
      showFlag: false,
      provinceId: '',
      openCityPannel: false
    };

    this.scrollContainerRef = React.createRef();
    this.currentCityNameRef = React.createRef();
    
    this.clickAddressList = this.clickAddressList.bind(this);
    this.clickMask = this.clickMask.bind(this);
  }

  /**
   * Groups province children into a map indexed by row number
   */
  private provinceListHandler(province: AddressItem): Map<string, AddressItem[]> {
    const resultMap = new Map<string, AddressItem[]>();
    const children: AddressItem[] = [];
    
    for (let i = 0; i < province.children.length; i++) {
      children.push(province.children[i]);
    }
    
    resultMap.set('1', children);
    return resultMap;
  }

  /**
   * Checks if a province is selected
   */
  private provinceSelected(provinces: AddressItem[], targetProvinceId?: string): boolean {
    let isSelected = false;
    
    if (!targetProvinceId) {
      return isSelected;
    }
    
    for (let i = 0; i < provinces.length; i++) {
      if (provinces[i].id === targetProvinceId) {
        isSelected = true;
        break;
      }
    }
    
    return isSelected;
  }

  private clickAddressList(event: MouseEvent<HTMLElement>): void {
    const targetId = (event.target as HTMLElement).id;
    
    if (this.props.provinceIdMap.has(targetId)) {
      if (!this.state.openCityPannel) {
        this.setState({ openCityPannel: true });
      }
      
      this.setState({ provinceId: targetId });
      this.forceUpdate();
      this.props.clickHandler(null, 'province');
    }
    
    if (this.props.cityIdMap.has(targetId)) {
      this.props.clickHandler(event);
    }
    
    event.stopPropagation();
  }

  private clickMask(): void {
    this.props.maskClickHandlder();
  }

  render(): JSX.Element {
    const regionBlocks: JSX.Element[] = [];

    if (this.props.addressInfo.length > 0) {
      for (let regionIndex = 0; regionIndex < this.props.addressInfo.length; regionIndex++) {
        const region = this.props.addressInfo[regionIndex];
        const provinceRows: JSX.Element[] = [];

        if (region.children.length > 0) {
          const provinceMap = this.provinceListHandler(region);
          
          for (let rowNumber = 1; rowNumber <= provinceMap.size; rowNumber++) {
            const provinces = provinceMap.get(rowNumber.toString());
            
            if (!provinces) continue;
            
            const isProvinceSelected = this.provinceSelected(provinces, this.state.provinceId);
            const shouldOpenCityPannel = this.state.openCityPannel && isProvinceSelected;
            
            const provinceRow = React.createElement(ProvinceRow, {
              key: `${rowNumber}row${provinces[0].name}`,
              id: this.state.provinceId,
              addressInfo: provinces,
              clickHandler: this.props.clickHandler,
              openCityPannel: shouldOpenCityPannel,
              openCityPannelHandler: this.clickAddressList
            });
            
            provinceRows.push(provinceRow);
          }
        }

        const regionBlock = (
          <div key={region.id} className="regionBlock">
            <div className="regionName">{region.name}</div>
            {provinceRows}
          </div>
        );
        
        regionBlocks.push(regionBlock);
      }
    }

    return (
      <div id="addressViewMask" onClick={this.clickMask}>
        <div id="addressInfoContainer">
          <div className="currentLocation">
            <span className="currentCity">
              {ResourceManager.getString('plugin_fpCollection_currentLocation')}
            </span>
            <img src={cityIconSrc} alt="cityicon" />
            <div
              className="label"
              ref={this.currentCityNameRef}
              onClick={this.props.clickHandler}
            >
              {this.props.currentCityName}
            </div>
          </div>
          <ScrollContainer
            className="addressList"
            ref={this.scrollContainerRef}
            onClick={this.clickAddressList}
          >
            {regionBlocks}
          </ScrollContainer>
        </div>
      </div>
    );
  }
}

interface ProvinceRowProps {
  id: string;
  addressInfo: AddressItem[];
  clickHandler: (event: MouseEvent<HTMLElement> | null, type?: string) => void;
  openCityPannel: boolean;
  openCityPannelHandler: (event: MouseEvent<HTMLElement>) => void;
}

class ProvinceRow extends Component<ProvinceRowProps> {}

interface ScrollContainerProps {
  className?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
}

class ScrollContainer extends Component<ScrollContainerProps> {}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const cityIconSrc: string;

export default AddressView;