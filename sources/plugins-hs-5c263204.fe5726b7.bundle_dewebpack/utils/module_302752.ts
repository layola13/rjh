import React from 'react';

interface AddressItem {
  id: string;
  name: string;
  children?: AddressItem[];
}

interface ProvinceBlockProps {
  addressInfo: AddressItem[];
  id?: string;
  openCityPannel: boolean;
  openCityPannelHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
  clickHandler: (id: string, name: string) => void;
}

interface ProvinceBlockState {
  provinceId: string;
}

interface CityItemProps {
  id: string;
  name: string;
  clickHandler: (id: string, name: string) => void;
}

class CityItem extends React.Component<CityItemProps> {}

export default class ProvinceBlock extends React.Component<ProvinceBlockProps, ProvinceBlockState> {
  constructor(props: ProvinceBlockProps) {
    super(props);
    this.state = {
      provinceId: ''
    };
    this.proviceBlockOnClick = this.proviceBlockOnClick.bind(this);
  }

  /**
   * Check if province is selected and optionally return its children
   */
  provinceSelected(
    addressList: AddressItem[],
    targetId: string | undefined,
    returnChildren: boolean = false
  ): AddressItem[] | boolean {
    let isSelected = false;
    
    if (!targetId) {
      return isSelected;
    }

    for (let i = 0; i < addressList.length; i++) {
      if (addressList[i].id === targetId) {
        isSelected = true;
        if (returnChildren) {
          return addressList[i].children ?? [];
        }
      }
    }

    return isSelected;
  }

  proviceBlockOnClick(event: React.MouseEvent<HTMLDivElement>): void {
    this.props.openCityPannelHandler(event);
  }

  render(): React.ReactNode {
    const provinceElements: React.ReactNode[] = [];
    const cityElements: React.ReactNode[] = [];
    let selectedProvinceCities: AddressItem[] | undefined;

    if (this.props.addressInfo?.length > 0) {
      for (let i = 0; i < this.props.addressInfo.length; i++) {
        const province = this.props.addressInfo[i];
        let selectedClass = '';

        if (this.props.id && province.id === this.props.id) {
          selectedClass = ' selected';
          const result = this.provinceSelected(this.props.addressInfo, province.id, true);
          if (Array.isArray(result)) {
            selectedProvinceCities = result;
          }
        }

        const provinceElement = (
          <div
            key={`key${province.id}`}
            id={province.id}
            className={`provinceName${selectedClass}`}
            onClick={this.proviceBlockOnClick}
          >
            {province.name}
          </div>
        );

        provinceElements.push(provinceElement);
      }
    }

    const cityBlockVisibilityClass = this.props.openCityPannel ? ' ' : ' hide ';

    if (selectedProvinceCities?.length > 0) {
      for (let j = 0; j < selectedProvinceCities.length; j++) {
        const city = selectedProvinceCities[j];
        const cityElement = (
          <CityItem
            key={`cityId_${city.id}`}
            id={city.id}
            name={city.name}
            clickHandler={this.props.clickHandler}
          />
        );
        cityElements.push(cityElement);
      }
    }

    return (
      <div className="provinceBlock">
        {provinceElements}
        <div className={`cityBlock${cityBlockVisibilityClass}`}>
          {cityElements}
        </div>
      </div>
    );
  }
}