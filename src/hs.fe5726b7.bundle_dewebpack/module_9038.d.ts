/**
 * Catalog event manager for handling catalog-related interactions
 * Manages signals, user interactions, and product operations
 */
export default class CatalogEventManager {
  /** Application instance reference */
  private readonly app: any;

  /** Signal dispatched when catalog item is clicked */
  signalItemClicked: any;

  /** Signal for independent catalog hidden state */
  signalIndependentHidden: any;

  /** Signal for catalog expansion state */
  signalExpandCatalog: any;

  /** Signal for catalog visibility state */
  signalShowCatalog: any;

  /** Signal dispatched on item mouse over */
  signalItemMouseOver: any;

  /** Signal dispatched on item mouse out */
  signalItemMouseOut: any;

  /** Signal for menu item click events */
  signalMenuItemClick: any;

  /** Signal for upload items click events */
  signalUploadItemsClick: any;

  /** Signal for page scroll start events */
  signalPageScrollStart: any;

  /** Signal for catalog tabs click events */
  signalCatalogTabsClick: any;

  /** Signal for upload model click events */
  signalUploadModelClick: any;

  /** Flag indicating if mouse is over a product item */
  isEnterProductItem: boolean | undefined;

  /** Catalog expansion state */
  isExpand: boolean;

  /** Get favorite container from favorite plugin */
  get FavContainer(): any;

  /** Get favorite topic container from favorite plugin */
  get FavTopicContainer(): any;

  /** Get favorite group container from favorite plugin */
  get FavGroupContainer(): any;

  /**
   * Expand or collapse product page
   * @param isExpand - Whether to expand the page
   */
  expandProductPage(isExpand: boolean): void;

  /**
   * Handle catalog close button click
   * @param isShow - Whether to show the catalog
   */
  closeCatalogClick(isShow: boolean): void;

  /**
   * Change catalog z-index for layering control
   * @param isExpand - Whether catalog is expanded
   */
  changeCatalogZIndex(isExpand: boolean): void;

  /**
   * Listen to mouse events and dispatch corresponding signals
   * @param event - Mouse event object
   * @param data - Optional event data
   */
  listenMouseEvent(
    event: { type: 'click' | 'wheel' | 'scroll' | 'tabclick' | 'uploaditem' },
    data?: Record<string, any>
  ): void;

  /**
   * Send analytics data for product events
   * @param product - Product metadata
   */
  private _sentAnalyseData(product: { id: string; vendorId: string }): void;

  /**
   * Add mouse event listeners for drag operations
   * @param event - Mouse event
   * @param icon - Optional icon identifier
   */
  addMouseEvent(event: MouseEvent, icon?: string): void;

  /**
   * Show live hint for using model in specific contexts
   * @param product - Product metadata with content type
   */
  showLiveHintForUseModel(product: {
    contentType: any;
    [key: string]: any;
  }): void;

  /**
   * Add disassembly product to recent list
   * @param product - Product metadata
   */
  addDassemblyToRecent(product: { seekId: string }): void;

  /**
   * Add material to recent list (requires login)
   * @param materialId - Material identifier
   */
  addMaterialToRecent(materialId: string): void;

  /**
   * Add customized product to recent list
   * @param product - Product metadata
   */
  addProductToCustomRecent(product: { seekId: string }): void;

  /**
   * Handle catalog item click event
   * @param event - Mouse event
   * @param product - Product metadata
   * @param options - Additional options
   */
  handleItemClick(
    event: MouseEvent,
    product: any,
    options: { needUpdate?: boolean }
  ): void;

  /**
   * Get product data via API request
   * @param product - Product metadata
   * @returns Product data promise
   */
  getProductRequest(product: any): Promise<any>;

  /**
   * Check if ID is a valid seek ID (UUID format)
   * @param id - ID to validate
   * @returns True if valid UUID
   */
  isValidSeekId(id: string): boolean;

  /**
   * Prepare and load product resources
   * @param productData - Product data object
   * @returns Promise resolving to loaded product data
   */
  prepareLoadResource(productData: any): Promise<any>;

  /**
   * Handle mouse enter on catalog item
   * @param product - Product metadata
   */
  handleItemEnter(product: { id: string }): void;

  /**
   * Handle mouse leave from catalog item
   * @param product - Product metadata
   */
  handleItemLeave(product: { id: string }): void;

  /**
   * Handle search by picture file upload
   * @param files - File list from input
   * @returns Promise with image search parameters
   */
  handleSearchPictureFile(files: FileList): Promise<{
    imgSearchUrl?: string;
    smallImgSearchUrl?: string;
    imgSearchLoc?: [number, number, number, number];
    imgWidth?: number;
    imgHeight?: number;
    allItems?: boolean;
    selectedSearchPictureCategoryId?: string;
    pictureUrl?: string;
  }>;

  /**
   * Show model apply panel popup
   */
  showModelApplyPanel(): void;

  /**
   * Handle upload menu item click
   * @param data - Upload menu data
   */
  handleClickUpoladMenu(data: any): void;

  /**
   * Show product report panel
   * @param product - Product metadata
   */
  showReportPanel(product: {
    id: string;
    productType: number;
    name: string;
    needUpdate?: boolean;
  }): void;

  /**
   * Show product thumbnail preview
   * @param product - Product metadata
   */
  showProductThumbnail(product: any): void;

  /**
   * Add product to recent list (requires login)
   * @param productId - Product identifier
   */
  addProductToRecent(productId: string): void;

  /**
   * Get material map from selected entity
   * @returns Object containing entity and its material map
   */
  getMaterialMap(): {
    entity: any;
    materialMap: Map<any, any>;
  };

  /**
   * Recover entity to its initial model state
   * @param data - Data containing entity and original materials
   */
  recoverInitialModel(data: {
    entity: any;
    originMaterialDataMap?: Map<any, any>;
  }): void;

  /**
   * Show upload Pinhua (品画) popup
   */
  showUploadPinhuaPopup(): void;

  /**
   * Check if currently in material editing mode
   * @returns True if editing materials
   */
  isEditMaterial(): boolean;

  /**
   * Check if product data should display favorite icon
   * @param product - Product metadata
   * @returns True if favorite icon should be shown
   */
  checkDataIfShowFavIcon(product: {
    favorite?: any;
    dataId?: string;
    jid?: string;
  }): boolean;

  /**
   * Check if user guide is started
   * @returns True if guide is active
   */
  isGuideStarted(): boolean;

  /**
   * Show model channel panel for special models
   * @param data - Model channel data
   */
  showModelChannelPanel(data: {
    id: string;
    page: number;
    index: number;
    topicPoolId: string;
    traceIds: string[];
    payIndexFlag: any;
    saleInfo: { sale: number };
  }): void;

  /**
   * Show marketing modal dialog
   * @param type - Marketing type
   * @param data - Marketing data
   * @param options - Additional options
   */
  showMarketModal(type: string, data: any, options?: any): void;

  /**
   * Open Spark image list panel
   */
  openSparkImageList(): void;

  /**
   * Show 3D viewer for product
   * @param product - Product metadata
   */
  show3DViewer(product: any): void;

  /**
   * Open AI model generator panel
   */
  openAIModel(): void;
}