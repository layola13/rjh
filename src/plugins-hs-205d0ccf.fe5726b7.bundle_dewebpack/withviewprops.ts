import React, { useContext, Component, createContext } from 'react';
import { Signal } from './Signal';
import { uuid } from './utils';
import { PAGES, defaultDragModel, PageInfo } from './pages';
import { ThemeContext } from './ThemeContext';
import { modalContext, ModalContextType } from './modalContext';
import BackIcon from './BackIcon';

interface PageSize {
  width: number;
  height: number;
  positionX?: number;
}

interface DragModel {
  pageSize?: PageSize;
  zoomable?: boolean;
}

interface PageConfig<T = any> {
  pageInfo: PageInfo;
  dragModel?: DragModel | ((options: { fromPage?: PageConfig; modalData: any }) => DragModel | null);
}

interface PageItem<T = any> {
  Page: PageConfig<T>;
  data: T;
}

interface ViewPropsContextValue {
  back: () => void;
  pushPageByName: (pageName: string, data?: any) => void;
  push: (pageItem: PageItem) => void;
  close: () => void;
  data: any;
}

interface ShowPageData {
  name: string;
  data: any;
}

interface TeachingMainProps {
  data: {
    showPage?: ShowPageData;
  };
  close: () => void;
}

interface TeachingMainState {
  pageList: PageItem[];
}

interface PagePushSignalPayload {
  id: string;
  from?: PageInfo;
  to: PageInfo;
}

const ViewPropsContext = createContext<ViewPropsContextValue | undefined>(undefined);

export const signalPagePush = new Signal<PagePushSignalPayload>();

export function WithViewProps<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithViewPropsWrapper(props: P) {
    const contextValue = useContext(ViewPropsContext);
    return contextValue ? React.createElement(WrappedComponent, { ...contextValue, ...props }) : null;
  };
}

class TeachingMain extends Component<TeachingMainProps, TeachingMainState> {
  static contextType = modalContext;
  context!: ModalContextType;

  private id: string;
  private initPage: PageItem;

  constructor(props: TeachingMainProps) {
    super(props);

    const showPage = props.data.showPage;
    const initialPage: PageItem = {
      Page: PAGES[showPage?.name ?? ''],
      data: showPage?.data
    };

    this.id = uuid();
    this.initPage = initialPage;

    if (initialPage.Page) {
      this.state = {
        pageList: [initialPage]
      };

      signalPagePush.dispatch({
        to: initialPage.Page.pageInfo,
        id: this.id
      });
    }

    this.back = this.back.bind(this);
    this.push = this.push.bind(this);
  }

  componentDidUpdate(): void {
    const currentInitPage = this.initPage;
    const showPage = this.props.data.showPage;

    if (showPage && PAGES[showPage.name]) {
      const newPage = PAGES[showPage.name];
      const hasPageChanged = newPage !== currentInitPage.Page || showPage.data !== currentInitPage.data;

      if (hasPageChanged) {
        const pageItem: PageItem = {
          Page: newPage,
          data: showPage.data
        };
        this.push(pageItem);
        this.initPage = pageItem;
      }
    }
  }

  back(): void {
    this.setState((prevState) => {
      const { pageList } = prevState;

      if ((pageList?.length ?? 0) < 2) {
        return prevState;
      }

      const currentPage = pageList[pageList.length - 1];
      const previousPage = pageList[pageList.length - 2];

      signalPagePush.dispatch({
        id: this.id,
        from: currentPage.Page.pageInfo,
        to: previousPage.Page.pageInfo
      });

      this.setDrag(previousPage.Page, currentPage.Page);

      const newPageList = pageList.slice(0, pageList.length - 1);

      return {
        ...prevState,
        pageList: newPageList
      };
    });
  }

  pushPageByName = (pageName: string, data?: any): void => {
    const pageItem: PageItem = {
      Page: PAGES[pageName],
      data
    };
    this.push(pageItem);
  };

  push(pageItem: PageItem): void {
    this.setState((prevState) => {
      const currentPage = prevState.pageList[prevState.pageList.length - 1];

      signalPagePush.dispatch({
        id: this.id,
        from: currentPage.Page.pageInfo,
        to: pageItem.Page.pageInfo
      });

      this.setDrag(pageItem.Page, currentPage.Page);

      return {
        pageList: [...prevState.pageList, pageItem]
      };
    });
  }

  private setDrag(page: PageConfig, fromPage?: PageConfig): void {
    const dragModel = TeachingMain.getPageDrag(page, this.props.data, fromPage);

    if (dragModel) {
      if (dragModel.pageSize) {
        this.context?.setSize?.(
          dragModel.pageSize.width,
          dragModel.pageSize.height,
          dragModel.pageSize.positionX
        );
      }

      if (dragModel.zoomable !== undefined) {
        this.context?.setZoomable?.(dragModel.zoomable);
      }
    }
  }

  static getDefaultPageDrag(pageName: string, modalData: any): DragModel {
    const page = PAGES[pageName];
    return (page && TeachingMain.getPageDrag(page, modalData)) || defaultDragModel;
  }

  static getPageDrag(page: PageConfig, modalData: any, fromPage?: PageConfig): DragModel | null {
    let dragModel: DragModel | null | undefined;

    if (typeof page.dragModel === 'function') {
      dragModel = page.dragModel({ fromPage, modalData });
    } else if (typeof page.dragModel === 'object') {
      dragModel = page.dragModel;
    }

    if (dragModel !== null) {
      return dragModel || defaultDragModel;
    }

    return null;
  }

  render() {
    const { pageList } = this.state;

    const contextValue: ViewPropsContextValue = {
      back: this.back,
      pushPageByName: this.pushPageByName,
      push: this.push,
      close: this.props.close,
      data: undefined
    };

    return (
      <ViewPropsContext.Provider value={contextValue}>
        <ThemeContext.Consumer>
          {(theme) => (
            <div className={`teaching-main ${theme}`}>
              {pageList.map((pageItem, index) => {
                const isHidden = index !== pageList.length - 1;
                const backIcon = index > 0 ? <BackIcon onClick={this.back} /> : null;

                return (
                  <div
                    key={index}
                    style={{ zIndex: index }}
                    className={`${isHidden ? 'hidden-view-wrapper' : ''} view-wrapper`}
                  >
                    <pageItem.Page
                      index={index}
                      back={this.back}
                      backIcon={backIcon}
                      pushPageByName={this.pushPageByName}
                      push={this.push}
                      close={this.props.close}
                      data={pageItem.data}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </ThemeContext.Consumer>
      </ViewPropsContext.Provider>
    );
  }
}

export default TeachingMain;