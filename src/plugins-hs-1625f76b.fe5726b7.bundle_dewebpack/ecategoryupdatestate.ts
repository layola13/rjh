export enum ECategoryUpdateState {
  default = 0,
  clear = 1,
  update = 2,
}

interface Category {
  code: string | number;
  name: string;
}

interface ImageViewProps {
  searchPictureCategories: Category[];
  categoryId?: string;
  searchPicture: (
    param1: undefined,
    categoryCode: string | number,
    param3: undefined,
    param4: boolean
  ) => void;
  defaultState?: boolean;
  categoryList: Category[];
  updateCategoryList?: boolean;
  imageUrl: string;
  isPanelHidden?: boolean;
  onShowPanel?: () => void;
}

interface UserTrackLogger {
  push(
    event: string,
    data: {
      description: string;
      param: Record<string, string>;
    },
    options: Record<string, unknown>
  ): void;
}

interface App {
  userTrackLogger: UserTrackLogger;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

declare const HSApp: HSApp;
declare const ResourceManager: {
  getString(key: string): string;
};

export const ImageView: React.FC<ImageViewProps> = ({
  searchPictureCategories,
  categoryId = "",
  searchPicture,
  defaultState = false,
  categoryList,
  updateCategoryList,
  imageUrl,
  isPanelHidden,
  onShowPanel,
}) => {
  const [selectedCategoryCode, setSelectedCategoryCode] = useState<
    string | number | undefined
  >(undefined);
  const [selectedMoreCategory, setSelectedMoreCategory] = useState<Category | null>(
    null
  );
  const [displayCategories, setDisplayCategories] = useState<Category[]>(
    searchPictureCategories
  );

  useEffect(() => {
    if (updateCategoryList) {
      setDisplayCategories(searchPictureCategories);
      setSelectedMoreCategory(null);
      setSelectedCategoryCode(categoryId);
    }
  }, [updateCategoryList, searchPictureCategories, categoryId]);

  const handleCategoryClick = (category: Category): void => {
    if (category.code === selectedCategoryCode) {
      return;
    }

    HSApp.App.getApp().userTrackLogger.push(
      "inspiration.imagesearch.category",
      {
        description: "灵感图搜, 类目筛选",
        param: {
          type: category.code === 0 ? "all" : "top-three-categories",
          category: category.name,
        },
      },
      {}
    );

    setSelectedMoreCategory(null);
    setSelectedCategoryCode(category.code);
    searchPicture(undefined, category.code, undefined, false);
  };

  const handleMoreCategoryClick = (category: Category): void => {
    HSApp.App.getApp().userTrackLogger.push(
      "inspiration.imagesearch.category",
      {
        description: "灵感图搜, 类目筛选",
        param: {
          type: "more",
          category: category.name,
        },
      },
      {}
    );

    if (category?.code) {
      setSelectedMoreCategory(category);
      setSelectedCategoryCode(`${category.code} more`);
      searchPicture(undefined, category.code, undefined, false);
    }
  };

  const renderCategoryItem = (
    category: Category | undefined,
    index: number
  ): JSX.Element | string => {
    if (!category) {
      return "";
    }

    let isSelected = category.code === selectedCategoryCode;

    if (
      !selectedCategoryCode &&
      selectedCategoryCode !== 0 &&
      index === 1
    ) {
      isSelected = true;
    }

    return (
      <CategoryItemControl
        handleCategoryClick={handleCategoryClick}
        selected={isSelected}
        keyName={category.name}
        category={category}
      />
    );
  };

  return (
    <div className="aigc-image-view">
      <div className="image-view-left">
        <div className="image-view-image-container">
          <img src={imageUrl} alt="" />
          {isPanelHidden && (
            <div className="image-view-expand" onClick={onShowPanel}>
              <div className="image-view-expand-button">
                <Icons type="hs_mian_shoudongkuangxuan" />
              </div>
              {ResourceManager.getString("search_picture_screenshot")}
            </div>
          )}
        </div>
      </div>
      <div className="image-view-right">
        {!defaultState && (
          <div className="image-category-tree">
            {displayCategories.length > 0 && (
              <ul className="image-category-items">
                {displayCategories.map((category, index) =>
                  renderCategoryItem(category, index)
                )}
                <li className="image-category-filter-item">
                  <ImageSearchDropdown
                    categoryName={
                      selectedMoreCategory?.name ??
                      ResourceManager.getString("inspiration_image_search_more")
                    }
                    selectedMoreCategory={selectedMoreCategory}
                    categoryList={categoryList}
                    disabledCategories={displayCategories}
                    onCategoryClick={handleMoreCategoryClick}
                  />
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};