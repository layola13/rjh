import { useState, useEffect, useRef } from 'react';
import { IconfontView } from './IconfontView';
import { ImagePanel } from './ImagePanel';
import { ImageSearchButton } from './ImageSearchButton';
import { ECategoryUpdateState, ImageView } from './ImageView';
import { getInspirationImageRecognizeCategory, getData } from './api';
import { Loading } from './Loading';

interface ImageData {
  imgSearchUrl: string;
  imgWidth: number;
  imgHeight: number;
}

interface ImageSearchPageProps {
  imgData: ImageData;
  onBack: () => void;
}

interface Category {
  code: number;
  name: string;
  children?: Category[];
}

interface Filter {
  brandsIds?: string;
  attributeIds?: string;
  colorBlock?: string;
}

interface ProductItem {
  uuid: string;
  vendorId?: string;
  styleId?: string;
  colorBlocks?: number[];
}

interface SearchParams {
  imgUrl: string;
  category?: string;
  boxStr: string;
}

interface RecognizeResult {
  predictCategories: number[];
  filters: Filter;
  items: ProductItem[];
}

const DEFAULT_EXPANDED_WIDTH = 631;
const DEFAULT_COLLAPSED_WIDTH = 247;
const FULL_EXPANDED_WIDTH = 664;
const FULL_COLLAPSED_WIDTH = 280;
const ICON_SIZE = '20px';
const BUTTON_SIZE = '30px';
const BOX_COORDINATES_LENGTH = 4;

function findCategoryByCode(code: number, categories: Category[]): Category | undefined {
  for (const category of categories) {
    if (category.code === code) {
      return category;
    }
    if (category.children) {
      const found = findCategoryByCode(code, category.children);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}

function buildSearchCategories(codes: number[], allCategories: Category[]): Category[] {
  if (!codes || codes.length === 0) {
    return [];
  }

  const result = codes
    .map(code => findCategoryByCode(code, allCategories))
    .filter((cat): cat is Category => cat !== undefined);

  result.unshift({
    code: 0,
    name: ResourceManager.getString('inspiration_image_search_all')
  });

  return result;
}

function filterProducts(
  items: ProductItem[],
  filters: Filter
): ProductItem[] {
  const { brandsIds, attributeIds, colorBlock } = filters;
  const styleId = attributeIds?.split('_')[1];
  const colorBlockNum = colorBlock ? parseInt(colorBlock, 10) : undefined;

  return items.filter(item => {
    if (brandsIds && item.vendorId !== brandsIds) {
      return false;
    }
    if (styleId && item.styleId !== styleId) {
      return false;
    }
    if (colorBlockNum && (!item.colorBlocks || !item.colorBlocks.includes(colorBlockNum))) {
      return false;
    }
    return true;
  });
}

function trackFilterUsage(filters: Filter): void {
  const tracker = HSApp.App.getApp().userTrackLogger;
  const { brandsIds, attributeIds, colorBlock } = filters;
  const styleId = attributeIds?.split('_')[1];

  if (brandsIds) {
    tracker.push('inspiration.imagesearch.filter.brandsId', {
      description: '灵感图搜，条件筛选，品牌',
      param: { id: brandsIds }
    }, {});
  }

  if (styleId) {
    tracker.push('inspiration.imagesearch.filter.styleId', {
      description: '灵感图搜，条件筛选，风格',
      param: { id: styleId }
    }, {});
  }

  if (colorBlock) {
    tracker.push('inspiration.imagesearch.filter.color', {
      description: '灵感图搜，条件筛选，颜色',
      param: { id: colorBlock }
    }, {});
  }
}

export const ImageSearchPage: React.FC<ImageSearchPageProps> = ({ imgData, onBack }) => {
  const [imageUrl, setImageUrl] = useState<string>(imgData.imgSearchUrl);
  const [displayImageUrl, setDisplayImageUrl] = useState<string>(imgData.imgSearchUrl);
  const [imageWidth, setImageWidth] = useState<number>(imgData.imgWidth);
  const [imageHeight, setImageHeight] = useState<number>(imgData.imgHeight);
  const [isPanelHidden, setIsPanelHidden] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [predictedCategories, setPredictedCategories] = useState<number[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [currentFilters, setCurrentFilters] = useState<Filter | undefined>();
  const [displayProducts, setDisplayProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDefaultState, setIsDefaultState] = useState<boolean>(true);
  const [categoryUpdateState, setCategoryUpdateState] = useState<ECategoryUpdateState>(
    ECategoryUpdateState.default
  );

  const originalProductsRef = useRef<ProductItem[]>();
  const boxCoordinatesRef = useRef<number[]>([]);
  const imagePanelRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const filterContainerRef = useRef<any>(null);
  const filterMapRef = useRef<Map<string, any>>(new Map());
  const pendingRequestsRef = useRef<number>(0);

  const catalogLib = HSApp.Catalog.Manager.getHSCatalogLib();
  const expandButtonElement = document.querySelector<HTMLElement>('.hsc-expand-area .hsc-btn-content');

  useEffect(() => {
    getInspirationImageRecognizeCategory().then(response => {
      setAllCategories(response.categoryList);
    });
  }, []);

  useEffect(() => {
    handleShowPanel();
    return onBack;
  }, [imgData]);

  useEffect(() => {
    setIsDefaultState(true);
    pendingRequestsRef.current = 0;
  }, [imageUrl]);

  const handleHidePanel = (): void => {
    setIsPanelHidden(true);
    if (imagePanelRef.current) {
      imagePanelRef.current.style.display = 'none';
    }
  };

  const handleShowPanel = (): void => {
    setIsPanelHidden(false);
    if (imagePanelRef.current) {
      imagePanelRef.current.style.display = 'block';
    }
  };

  const searchPicture = (
    boxCoordinates?: number[],
    category?: string,
    newImageUrl?: string,
    shouldClearResults: boolean = true
  ): void => {
    if (boxCoordinates && boxCoordinates.length === BOX_COORDINATES_LENGTH) {
      boxCoordinatesRef.current = boxCoordinates;
    } else if (category !== undefined) {
      boxCoordinates = boxCoordinatesRef.current;
    }

    setIsDefaultState(false);
    pendingRequestsRef.current += 1;

    if (shouldClearResults) {
      setPredictedCategories([]);
      setCategoryUpdateState(ECategoryUpdateState.clear);
    }

    setIsLoading(true);
    filterMapRef.current.clear();

    if (newImageUrl) {
      setDisplayImageUrl(newImageUrl);
    }

    const searchParams: SearchParams = {
      imgUrl: imageUrl,
      category: category ?? undefined,
      boxStr: boxCoordinates!.toString()
    };

    getData(searchParams)
      .then((result: RecognizeResult) => {
        if (pendingRequestsRef.current === 1) {
          setPredictedCategories(result.predictCategories);
          setCurrentFilters(result.filters);
          originalProductsRef.current = result.items;
          setDisplayProducts(result.items);
          setIsLoading(false);

          if (shouldClearResults) {
            setCategoryUpdateState(ECategoryUpdateState.update);
          }
        }
        pendingRequestsRef.current -= 1;
      })
      .catch(() => {
        setPredictedCategories([]);
        setCurrentFilters(undefined);
        setDisplayProducts([]);
        setIsLoading(false);
      });
  };

  const handleShowPicture = (newImageData: ImageData): void => {
    setImageUrl(newImageData.imgSearchUrl);
    setDisplayImageUrl(newImageData.imgSearchUrl);
    setImageWidth(newImageData.imgWidth);
    setImageHeight(newImageData.imgHeight);
  };

  const handleExpandToggle = (): void => {
    setIsExpanded(!isExpanded);
  };

  const handleChangeImagePanelPosition = (): void => {
    if (!imagePanelRef.current) {
      handleHidePanel();
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    imagePanelRef.current.style.top = `${rect.top}px`;
    imagePanelRef.current.style.left = `${rect.right}px`;
  };

  const handleFilterSearch = (filters: Filter): void => {
    if (!originalProductsRef.current || originalProductsRef.current.length === 0) {
      return;
    }

    trackFilterUsage(filters);
    const filtered = filterProducts(originalProductsRef.current, filters);
    setDisplayProducts(filtered);
  };

  const handleMouseEnter = (): void => {
    if (expandButtonElement) {
      expandButtonElement.style.visibility = 'hidden';
    }
  };

  const handleMouseLeave = (): void => {
    if (expandButtonElement) {
      expandButtonElement.style.visibility = 'visible';
    }
  };

  const headerWidth = isExpanded ? DEFAULT_EXPANDED_WIDTH : DEFAULT_COLLAPSED_WIDTH;
  const contentWidth = isExpanded ? FULL_EXPANDED_WIDTH : FULL_COLLAPSED_WIDTH;
  const searchCategories = buildSearchCategories(predictedCategories, allCategories);

  return (
    <div className="aigc-image-search-page-container" ref={containerRef}>
      <div className="image-search-page-header" style={{ width: `${headerWidth}px` }}>
        <div onClick={onBack}>
          <IconfontView
            showType="hs_xian_guanbi"
            customStyle={{ fontSize: ICON_SIZE }}
            hoverBgColor="#F5F5F5"
            clickColor="#396EFE"
          />
        </div>
        <div className="image-search-page-header-title">
          {ResourceManager.getString('inspiration_image_search_search_page')}
        </div>
        <ImageSearchButton showPicture={handleShowPicture} isReUpLoadButton={true} />
        <catalogLib.IconfontRadiusView
          customClass="expand-btn"
          customStyle={{ fontSize: ICON_SIZE }}
          iconOnclick={handleExpandToggle}
          showType={isExpanded ? 'hs_xian_suoxiao' : 'hs_xian_zhankai'}
          background={{
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
            borderRadius: BUTTON_SIZE,
            background: '#F5F5F5'
          }}
        />
      </div>

      <ImageView
        imageUrl={displayImageUrl}
        isPanelHidden={isPanelHidden}
        onShowPanel={handleShowPanel}
        searchPictureCategories={searchCategories}
        searchPicture={searchPicture}
        defaultState={isDefaultState}
        categoryList={allCategories}
        updateCategoryList={categoryUpdateState}
      />

      <div
        className="image-panel-root"
        ref={imagePanelRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ImagePanel
          originImageUrl={imageUrl}
          originImageWidth={imageWidth}
          originImageHeight={imageHeight}
          onHidePanel={handleHidePanel}
          onShowPanel={handleShowPanel}
          onCancel={onBack}
          changeImagePanelPosition={handleChangeImagePanelPosition}
          searchPicture={searchPicture}
        />
      </div>

      {!isDefaultState && (
        <div className="image-search-product-page-content">
          <Loading show={isLoading} />
          {!isLoading && (
            <div className="hsc-model-container" style={{ width: `${contentWidth}px` }}>
              {currentFilters && (
                <catalogLib.FilterContainer
                  filters={currentFilters}
                  ref={filterContainerRef}
                  onFilterSearch={handleFilterSearch}
                  filterMap={filterMapRef.current}
                  title="title"
                />
              )}

              {displayProducts.length === 0 && (
                <div className="no-result-page">
                  <img className="icon" src={require('./assets/no-result-icon.png')} />
                  <div className="tooltipstext">
                    {ResourceManager.getString('inspiration_image_search_no_result')}
                  </div>
                </div>
              )}

              {displayProducts.length > 0 && (
                <div className="image-search-page-product-list-container">
                  <div className="image-search-page-product-list">
                    {displayProducts.map(item => (
                      <catalogLib.ProductItemContainer key={item.uuid} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};