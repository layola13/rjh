import React from 'react';
import { Tooltip } from 'antd';

interface SearchProduct {
  city: string;
  neighborName: string;
  communityStr: string | null;
  hoverStr: string;
  count: number;
}

interface SearchResultContainerProps {
  searchText: string;
  targetCity: string;
  targetCityName: string;
  cityIdMap: Map<string, string>;
  handleClickSearchItem: (cityId: string, cityName: string, neighborName: string) => void;
}

interface SearchResultContainerState {
  products: SearchProduct[];
  searchStart: boolean;
}

interface TemplateSearchResult {
  neighborName: string;
  neighborAlias?: string[];
  apartmentCount: number;
}

const MAX_DISPLAY_RESULTS = 15;
const DEBOUNCE_DELAY = 350;

export default class SearchResultContainer extends React.Component<
  SearchResultContainerProps,
  SearchResultContainerState
> {
  private onRealTimeSearch: (searchText: string) => void;

  constructor(props: SearchResultContainerProps) {
    super(props);
    
    this.state = {
      products: [],
      searchStart: false
    };

    this.onRealTimeSearch = _.debounce((searchText: string) => {
      this.realTimeSearch(searchText);
    }, DEBOUNCE_DELAY);
  }

  UNSAFE_componentWillReceiveProps(nextProps: SearchResultContainerProps): void {
    if (nextProps.searchText.length !== 0) {
      this.setState({
        searchStart: true
      });
      this.onRealTimeSearch(nextProps.searchText);
    }
  }

  private realTimeSearch(searchText: string): void {
    const cityCode = this.props.targetCity.split('_')[1];
    
    NWTK.api.design.searchTemplatesSuggestionsList(searchText, cityCode)
      .then((results: TemplateSearchResult[]) => {
        if (results.length > 0) {
          const products: SearchProduct[] = [];
          
          results.forEach((result) => {
            const aliases = result.neighborAlias || [];
            
            products.push({
              city: this.props.targetCity,
              neighborName: result.neighborName,
              communityStr: aliases.length > 0 
                ? `(${aliases.join(' / ')})` 
                : null,
              hoverStr: aliases.length === 0 
                ? result.neighborName 
                : `${result.neighborName}/${aliases.join('/')}`,
              count: result.apartmentCount
            });
          });
          
          this.setState({
            products,
            searchStart: false
          });
        } else {
          this.setState({
            products: [],
            searchStart: false
          });
        }
      })
      .catch(() => {
        this.setState({
          searchStart: false
        });
        return Promise.reject('Get facetResults failed');
      });
  }

  render(): React.ReactElement {
    const searchInputElement = $('.searchKey')[0] as HTMLInputElement | undefined;
    const hasSearchText = searchInputElement?.value.length > 0 ?? false;
    
    const containerClassName = this.state.products.length > 0 ? 'show' : 'hide';
    const resultElements: React.ReactElement[] = [];

    if (hasSearchText) {
      if (this.state.searchStart) {
        // Searching in progress
      } else {
        const products = this.state.products;
        
        if (products.length > 0) {
          const displayCount = Math.min(MAX_DISPLAY_RESULTS, products.length);
          
          for (let index = 0; index < displayCount; index++) {
            const product = products[index];
            const cityId = this.props.cityIdMap.get(this.props.targetCityName);
            
            const tooltipContent = (
              <span style={{ color: '#808080', fontSize: '12px' }}>
                {product.hoverStr}
              </span>
            );

            const handleMouseDown = (): void => {
              this.props.handleClickSearchItem(
                cityId!,
                this.props.targetCityName,
                product.neighborName
              );
            };

            resultElements.push(
              <div className="search-result-item" key={product.neighborName}>
                <div
                  onMouseDown={handleMouseDown}
                  className="search-result-item-tooltip"
                >
                  <div className="city">{this.props.targetCityName}</div>
                  
                  {product.communityStr ? (
                    <Tooltip
                      placement="bottom"
                      title={tooltipContent}
                      trigger="hover"
                      color="#ffffff"
                      overlayClassName="search-result-tooltip-wrapper"
                    >
                      <div className="search-result-item-tooltip">
                        <div className="neighborNameWrapper">
                          <span className="neighborName">{product.neighborName}</span>
                          <span className="communityName">{product.communityStr}</span>
                        </div>
                        <div className="totalCount">约{product.count}个户型</div>
                      </div>
                    </Tooltip>
                  ) : (
                    <div className="search-result-item-tooltip">
                      <div className="neighborNameWrapper">
                        <span className="neighborName">{product.neighborName}</span>
                      </div>
                      <div className="totalCount">约{product.count}个户型</div>
                    </div>
                  )}
                </div>
              </div>
            );
          }
        }
      }
    }

    return (
      <div id="fpcollection-search-result-container" className={containerClassName}>
        {resultElements}
      </div>
    );
  }
}