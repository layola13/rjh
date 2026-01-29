import React from 'react';
import PropTypes from 'prop-types';
import { IconfontView } from './IconfontView';
import { Pagination } from './Pagination';
import ScrollContainer from './ScrollContainer';
import SearchAPI from './SearchAPI';
import ListItem from './ListItem';
import noResultImage from './assets/no-result.svg';
import defaultImage from './assets/default-image.png';

interface Product {
  acs_asset_name: string;
  hs_design_id: string;
  imageUrl: string;
  areaNum: number | string;
  grossAreaNum: number;
  livingroomNum: number;
  bedroomNum: number;
  bathroomNum: number;
  neighbor: string | { name: string };
  provinceName: string;
  cityName: string;
  districtName: string;
}

interface FloorPlanListViewState {
  products: Product[];
  total: number;
  totalNumber: number | string;
  offset: number;
  isLoading: boolean;
}

interface FloorPlanListViewProps {
  searchText: string;
  targetCity?: string;
  targetCityName?: string;
  bedRoomRange?: string;
  grossAreaRange?: string;
  limit?: number;
  doSearch?: boolean;
  isFullyMatching?: boolean;
  onCloseHandler?: () => void;
}

interface SearchTemplateItem {
  name: string;
  id: string;
  meta?: {
    image2d?: {
      url: string;
    };
  };
  area?: number;
  grossArea: number;
  livingroomNum: number;
  bedroomNum: number;
  bathroomNum: number;
  neighbor: string | { name: string };
  provinceName?: string;
  cityName?: string;
  districtName?: string;
}

interface SearchTemplateResponse {
  items: SearchTemplateItem[];
  total: number;
  totalNumber: number;
}

const MAX_TOTAL_NUMBER = 200;
const DEFAULT_LIMIT = 16;

export default class FloorPlanListView extends React.Component<FloorPlanListViewProps, FloorPlanListViewState> {
  static propTypes = {
    searchText: PropTypes.string.isRequired,
    targetCity: PropTypes.string,
    targetCityName: PropTypes.string,
    bedRoomRange: PropTypes.string,
    grossAreaRange: PropTypes.string,
  };

  static defaultProps = {
    searchText: '',
    limit: DEFAULT_LIMIT,
    doSearch: true,
    bedRoomRange: 'to',
    grossAreaRange: 'to',
    isFullyMatching: false,
  };

  refs!: {
    scrollContainer: ScrollContainer;
  };

  constructor(props: FloorPlanListViewProps) {
    super(props);
    this.state = {
      products: [],
      total: 0,
      totalNumber: 0,
      offset: 0,
      isLoading: false,
    };

    this.reset = this.reset.bind(this);
    this.updateView = this.updateView.bind(this);
    this.handleNoResult = this.handleNoResult.bind(this);
    this.getCurrentPageNum = this.getCurrentPageNum.bind(this);
    this.jumpToPage = this.jumpToPage.bind(this);
  }

  getCurrentPageNum(): number {
    return Math.ceil(this.state.offset / (this.props.limit ?? DEFAULT_LIMIT)) + 1;
  }

  jumpToPage(pageNum: number): void {
    this.reset();
    this.updateView(
      this.props.searchText,
      this.props.targetCity,
      (pageNum - 1) * (this.props.limit ?? DEFAULT_LIMIT),
      this.props.limit,
      this.props.bedRoomRange,
      this.props.grossAreaRange,
      this.props.isFullyMatching
    );
  }

  updateView(
    searchText: string,
    targetCity?: string,
    offset: number = 0,
    limit: number = DEFAULT_LIMIT,
    bedRoomRange: string = 'to',
    grossAreaRange: string = 'to',
    isFullyMatching?: boolean
  ): void {
    if (!searchText && !targetCity) {
      this.reset();
      return;
    }

    const searchParams = {
      targetCity: targetCity,
    };

    this.setState({ isLoading: true });

    SearchAPI.searchPublicTemplates(searchText, bedRoomRange, grossAreaRange, searchParams, offset, limit)
      .then((response: SearchTemplateResponse) => {
        if (this.props.searchText === searchText && this.props.targetCity === searchParams.targetCity) {
          const products: Product[] = [];
          
          response.items.forEach((item: SearchTemplateItem) => {
            const neighbor = item.neighbor;
            const neighborValue = typeof neighbor === 'string' || (typeof neighbor === 'object' && neighbor.name) 
              ? neighbor 
              : '';

            products.push({
              acs_asset_name: item.name,
              hs_design_id: item.id,
              imageUrl: item.meta?.image2d?.url ?? defaultImage,
              areaNum: item.area ? item.area.toFixed(2) : item.grossArea,
              grossAreaNum: item.grossArea,
              livingroomNum: item.livingroomNum,
              bedroomNum: item.bedroomNum,
              bathroomNum: item.bathroomNum,
              neighbor: neighborValue,
              provinceName: item.provinceName ?? '',
              cityName: item.cityName ?? '',
              districtName: item.districtName ?? '',
            });
          });

          this.setState({
            products,
            total: response.total,
            totalNumber: response.totalNumber > MAX_TOTAL_NUMBER ? '200+' : response.totalNumber,
            offset,
            isLoading: false,
          });
        }
      })
      .catch((error: any) => {
        this.reset();
        if (error?.ret?.[0]?.includes('FAIL_BIZ_SEARCH_APARTMENT_OVER')) {
          this.props.onCloseHandler?.();
          this.setState({ isLoading: false });
          this.searchFPTimeLimitDialog();
          return;
        }
        return Promise.reject('Get floor plan collection failed in this frame');
      });

    this.refs.scrollContainer.setScrollTop(0);
  }

  searchFPTimeLimitDialog(): void {
    const title = ResourceManager.getString('plugin_fpCollection_search_limit_title');
    const okButton = ResourceManager.getString('messageDialog_OK');
    const content = ResourceManager.getString('plugin_fpCollection_search_limit_content');

    MessageBox.create(content, [okButton], 1, {
      title,
      disablemask: true,
    }).show();
  }

  reset(): void {
    this.setState({
      products: [],
      total: 0,
      isLoading: false,
    });
  }

  handleNoResult(event: React.MouseEvent<HTMLAnchorElement>): void {
    const app = HSApp.App.getApp();
    const plugin = app.pluginManager.getPlugin('hsw.brand.ezhome.floorplancollection.Plugin');
    plugin.hide();
    app.cmdManager.cancel();

    if (hsw.plugin.underlayimg) {
      if (adskUser.isLogin()) {
        hsw.plugin.underlayimg.UI.start();
      } else {
        adskUser.openLoginWindow();
        $('body')
          .unbind(adskUser.EVENT_CALLBACK_FUN)
          .bind(adskUser.EVENT_CALLBACK_FUN, () => {
            if (hsw.plugin.underlayimg) {
              hsw.plugin.underlayimg.UI.start();
            } else {
              log("can't find underlayimg plugin");
            }
          });
      }
      event.stopPropagation();
    } else {
      log("can't find underlayimg plugin");
    }
  }

  componentDidMount(): void {
    if (this.props.doSearch) {
      this.updateView(
        this.props.searchText,
        this.props.targetCity,
        undefined,
        undefined,
        this.props.bedRoomRange,
        this.props.grossAreaRange,
        this.props.isFullyMatching
      );
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: FloorPlanListViewProps): void {
    if (nextProps.doSearch) {
      this.reset();
      this.updateView(
        nextProps.searchText,
        nextProps.targetCity,
        undefined,
        undefined,
        nextProps.bedRoomRange,
        nextProps.grossAreaRange,
        nextProps.isFullyMatching
      );
    }
  }

  itemRender(current: number, type: string, originalElement: React.ReactNode): React.ReactNode {
    if (type === 'prev') {
      return (
        <IconfontView
          showType="hs_xiao_danjiantou_zuo"
          hoverColor="#396efe"
          customStyle={{
            fontSize: '12px',
            color: '#9B9FAB',
          }}
        />
      );
    }
    if (type === 'next') {
      return (
        <IconfontView
          showType="hs_xiao_danjiantou_you"
          hoverColor="#396efe"
          customStyle={{
            fontSize: '12px',
            color: '#9B9FAB',
          }}
        />
      );
    }
    return originalElement;
  }

  render(): React.ReactNode {
    let loadingElement: React.ReactNode;
    let emptyViewClassName: string;
    let listViewClassName: string;
    const itemElements: React.ReactNode[] = [];

    if (this.state.isLoading) {
      loadingElement = HSApp.UI.LoadingWidget.getReactElement({
        panelclass: 'panelcenter',
        covercolor: 'rgba(255, 255, 255, 0.2)',
      });
    } else {
      const products = this.state.products;
      if (products?.length) {
        products.forEach((product: Product) => {
          itemElements.push(<ListItem key={product.hs_design_id} item={product} />);
        });
      }
      emptyViewClassName = this.state.total === 0 ? 'show' : 'hide';
      listViewClassName = this.state.total === 0 ? 'hide' : 'show';
    }

    return (
      <div id="fpcollectionlistview-scrollContainer">
        {loadingElement}
        <div className={listViewClassName} id="fpcollectionlistview">
          <ScrollContainer className ref="scrollContainer">
            {itemElements}
          </ScrollContainer>
          <Pagination
            simple
            hideOnSinglePage
            className="fpcollectionlistview-pagination"
            current={this.getCurrentPageNum()}
            total={this.state.total}
            pageSize={this.props.limit}
            onChange={this.jumpToPage}
            itemRender={this.itemRender}
          />
        </div>
        <div id="emptyView" className={emptyViewClassName}>
          <div className="hintView">
            <img src={noResultImage} alt="noSearchResult" />
            <p>{ResourceManager.getString('plugin_fpCollection_no_result')}</p>
            <p>
              <span>{ResourceManager.getString('plugin_fpCollection_no_result_you_can')}</span>
              <a onClick={this.handleNoResult}>
                {ResourceManager.getString('plugin_fpCollection_no_result_upload')}
              </a>
              <span>{ResourceManager.getString('plugin_fpCollection_no_result_draw')}</span>
            </p>
          </div>
        </div>
        <span className="total">
          {ResourceManager.getString('plugin_fpCollection_num_before')}
          <span className="total-number">{this.state.totalNumber}</span>
          {ResourceManager.getString('plugin_fpCollection_num')}
        </span>
      </div>
    );
  }
}