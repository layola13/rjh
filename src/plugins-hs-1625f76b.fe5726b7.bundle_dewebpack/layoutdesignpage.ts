import React from 'react';
import { SmartText, Scroll } from './components';

interface LegendItem {
  modelJid: string;
  legendName: string;
  legendUrl: string;
}

interface CategoryData {
  categoryName: string;
  legendList: LegendItem[];
}

interface LayoutDesignPageState {
  categories: string[];
  selectedCategoryName: string;
}

interface LayoutDesignPageProps {}

interface MtopResponse {
  ret: string[];
  data?: {
    result: CategoryData[];
  };
}

interface EventTrackParams {
  logType: string;
  subMenuId: string;
  subMenuName: string;
  name: string;
  selectedPath: {
    index: number;
    path: Array<{ name: string }>;
  };
}

declare global {
  const NWTK: {
    mtop: {
      Catalog: {
        getLayoutDesignPageData(): Promise<MtopResponse>;
      };
    };
  };
  
  const HSApp: {
    Catalog: {
      EventTrackManager: {
        getInstance(): {
          signalCatalogToLog(params: EventTrackParams): void;
        };
      };
      BaseApiManager: {
        getInstance(): {
          eventsManager: {
            handleItemClick(context: null, params: { id: string }): void;
          };
        };
      };
    };
  };
  
  const ResourceManager: {
    getString(key: string): string;
  };
}

export class LayoutDesignPage extends React.Component<LayoutDesignPageProps, LayoutDesignPageState> {
  private data: CategoryData[] = [];

  constructor(props: LayoutDesignPageProps) {
    super(props);
    this.state = {
      categories: [],
      selectedCategoryName: ''
    };
  }

  private getLayoutDesignPageData(): Promise<CategoryData[]> {
    return NWTK.mtop.Catalog.getLayoutDesignPageData()
      .then((response: MtopResponse) => {
        const data = response.data;
        if (response && response.ret[0].includes('SUCCESS') && data) {
          return data.result;
        }
        return Promise.reject();
      })
      .catch((error: unknown) => {
        return Promise.reject(error);
      });
  }

  componentDidMount(): void {
    this.getLayoutDesignPageData().then((data: CategoryData[]) => {
      this.data = data;
      const categories = data.map((item: CategoryData) => item.categoryName);
      const firstCategory = categories[0];
      
      this.setState({
        categories: categories,
        selectedCategoryName: firstCategory
      });
      
      HSApp.Catalog.EventTrackManager.getInstance().signalCatalogToLog({
        logType: 'category',
        subMenuId: 'layoutDesign',
        subMenuName: '布置',
        name: firstCategory,
        selectedPath: {
          index: 1,
          path: [{ name: firstCategory }]
        }
      });
    });
  }

  private handleCategoryClick(categoryName: string): void {
    this.setState({
      selectedCategoryName: categoryName
    });
    
    HSApp.Catalog.EventTrackManager.getInstance().signalCatalogToLog({
      logType: 'category',
      subMenuId: 'layoutDesign',
      subMenuName: '布置',
      name: categoryName,
      selectedPath: {
        index: 1,
        path: [{ name: categoryName }]
      }
    });
  }

  private handleItemClick(modelJid: string): void {
    HSApp.Catalog.BaseApiManager.getInstance().eventsManager.handleItemClick(null, {
      id: modelJid
    });
  }

  render(): React.ReactElement {
    const { categories, selectedCategoryName } = this.state;
    
    const selectedCategory = this.data.find(
      (item: CategoryData) => item.categoryName === selectedCategoryName
    );
    const legendList = selectedCategory?.legendList ?? [];

    return (
      <div className="layout-design-page">
        <div className="page-title">
          <div className="main-title">
            {ResourceManager.getString('catalog_layout_design_products')}
          </div>
        </div>
        
        <div className="content">
          <div className="categories">
            {categories.map((category: string, index: number) => (
              <div
                key={index}
                className={`cate ${category === selectedCategoryName ? 'selected' : ''}`}
                onClick={() => this.handleCategoryClick(category)}
              >
                <SmartText className="text" ellipseLine={2}>
                  {category}
                </SmartText>
              </div>
            ))}
          </div>
          
          <Scroll className="scroll-area" scrollYTip={true}>
            <div className="products">
              {legendList.map((item: LegendItem, index: number) => {
                const { modelJid, legendName, legendUrl } = item;
                
                return (
                  <div key={index} className="product">
                    <div className="image-container">
                      <img
                        className="image"
                        src={legendUrl}
                        onClick={() => this.handleItemClick(modelJid)}
                      />
                    </div>
                    <SmartText className="text" ellipseLine={2}>
                      {legendName}
                    </SmartText>
                  </div>
                );
              })}
            </div>
          </Scroll>
        </div>
      </div>
    );
  }
}