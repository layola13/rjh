/**
 * CSS module for collection dialog component
 * Defines styles for modal effects, animations, search bar, and list views
 */

/**
 * Modal fade-in and scale-up animation effect
 */
export interface ModalEffectStyles {
  /** Initial state: scaled down and transparent */
  'md-effect-1': string;
  /** Active state: scaled to normal size and fully opaque */
  'md-show-md-effect-1': string;
}

/**
 * Common reusable button styling
 */
export interface CommonButtonStyles {
  /** Standard button appearance with border, background, and hover effects */
  commonButtonStyle: string;
}

/**
 * Text overflow handling for long content
 */
export interface TextStyles {
  /** Ellipsis truncation for overflowing text */
  commonTextStyleForLongText: string;
}

/**
 * Main collection dialog container styles
 */
export interface CollectionDialogStyles {
  /** Root container ID */
  fpcollectiondoms: string;
  /** Semi-transparent overlay mask */
  fpcollectiondomsMask: string;
}

/**
 * Dialog header section styles
 */
export interface HeaderStyles {
  /** Header container with title and close button */
  header: string;
  /** Header title text */
  label: string;
  /** Close button in top-right corner */
  closeBtn: string;
}

/**
 * Main collection frame (modal window) styles
 */
export interface CollectionFrameStyles {
  /** Modal window container with shadow and border radius */
  collectionFrame: string;
  /** Appear animation initial state */
  'fpcollectionAnimation-appear': string;
  /** Appear animation active state */
  'fpcollectionAnimation-appear-active': string;
}

/**
 * Search bar component styles
 */
export interface SearchBarStyles {
  /** Search bar container */
  searchBar: string;
  /** Clear input button */
  clearUp: string;
  /** City/region selector dropdown */
  cityZone: string;
  /** Dropdown triangle indicator */
  'triangle-down': string;
  /** City zone label text */
  label: string;
  /** Selected state for city zone */
  selected: string;
  /** Popover dropdown container */
  popover: string;
  /** Popover content area */
  'popover-content': string;
  /** Search input field */
  input: string;
  /** Search keyword input */
  searchKey: string;
  /** Search button icon */
  searchButton: string;
  /** Focused input state with blue highlight */
  'focus-input': string;
}

/**
 * Collection list view container styles
 */
export interface ListViewContainerStyles {
  /** Scrollable container for collection items */
  'fpcollectionlistview-scrollContainer': string;
  /** Full cover overlay */
  fullcover: string;
  /** Empty state view when no items exist */
  emptyView: string;
  /** Hint message in empty view */
  hintView: string;
}

/**
 * Collection list and item styles
 */
export interface ListViewStyles {
  /** List container */
  fpcollectionlistview: string;
  /** Individual collection item card */
  listItem: string;
  /** Hover overlay mask for list items */
  masker: string;
  /** Item detail information section */
  detailInfo: string;
  /** Room detail text (bold) */
  'room-detail': string;
  /** Neighborhood name with ellipsis */
  'neighbor-name': string;
}

/**
 * Pagination component styles
 */
export interface PaginationStyles {
  /** Pagination control container */
  'fpcollectionlistview-pagination': string;
  /** Ant Design pagination overrides */
  'ant-pagination-simple': string;
  'ant-pagination-simple-pager': string;
  'ant-pagination-prev': string;
  'ant-pagination-next': string;
  'ant-pagination-item-link': string;
  'ant-pagination-slash': string;
}

/**
 * Detail view modal styles
 */
export interface DetailViewStyles {
  /** Detail view container overlaying the list */
  'list-item-detail-view-container': string;
  /** Close button for detail view */
  closeBtn: string;
  /** Detail information panel */
  'detail-info': string;
  /** Area detail row */
  'area-detail': string;
  /** Style detail row */
  'style-detail': string;
  /** Room detail section */
  'room-detail': string;
  /** Room name with region info */
  'room-detail-name': string;
  /** Region information with icon */
  'region-info': string;
  /** Region text label */
  'region-info-text': string;
  /** Start design CTA button */
  'start-design': string;
  /** Main detail view image container */
  'list-item-detail-view': string;
  /** Detail view appear animation */
  'fpDetailViewAnimation-appear': string;
  /** Detail view appear animation active state */
  'fpDetailViewAnimation-appear-active': string;
}

/**
 * Total count display styles
 */
export interface TotalStyles {
  /** Total items count container */
  total: string;
  /** Highlighted number text */
  'total-number': string;
}

/**
 * Welcome/empty state styles
 */
export interface WelcomeStyles {
  /** Welcome screen container */
  'fpcollection-welcome': string;
  /** Welcome illustration image */
  pic: string;
  /** Welcome message text */
  text: string;
  /** Initial display state */
  init: string;
  /** Result display state */
  result: string;
}

/**
 * Complete CSS module type definition
 * Combines all style interfaces for the collection dialog component
 */
declare const styles: ModalEffectStyles &
  CommonButtonStyles &
  TextStyles &
  CollectionDialogStyles &
  HeaderStyles &
  CollectionFrameStyles &
  SearchBarStyles &
  ListViewContainerStyles &
  ListViewStyles &
  PaginationStyles &
  DetailViewStyles &
  TotalStyles &
  WelcomeStyles;

export default styles;