import React from 'react';
import { IconfontView } from './IconfontView';
import LazyImage from './LazyImage';
import badgeIcon from './badge-icon.png';

const WHOLE_PRODUCT_CLASS = 'whole-product';

const HELP_DOC_KEYS: Record<string, string> = {
  my_styler_template: 'catalog.myTemplateRoom.inspiration',
  enterprise_styler_template_page: 'catalog.enterpriseTemplateRoom.inspiration',
};

interface AuthorInfo {
  nickName?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

interface CustomizedRoom {
  authorInfo?: AuthorInfo;
}

interface ProductData {
  customizedRoom?: CustomizedRoom;
}

interface PayInfo {
  needPay: boolean;
  isVip?: boolean;
  paid?: boolean;
}

interface FavoriteConfig {
  showFavorite?: boolean;
  isFavorite?: boolean;
  onFavoriteClick?: (params: FavoriteClickParams) => Promise<FavoriteResponse>;
  favoriteCallBackData?: unknown;
}

interface FavoriteClickParams {
  isFavorite: boolean;
  favoriteCallBackData?: unknown;
}

interface FavoriteResponse {
  isSucceed: boolean;
}

interface ProductItemProps {
  type: string;
  realIndex: number;
  realPage: number;
  data: ProductData;
  title: string;
  secondtitle?: string;
  operations?: React.ReactNode;
  isPano?: boolean;
  hasPano?: boolean;
  imgSrc: string;
  supportSelect?: boolean;
  payInfo?: PayInfo;
  favorite?: FavoriteConfig;
  clickItem?: (event: React.MouseEvent | React.SyntheticEvent, productTop?: number) => void;
}

interface ProductItemState {
  hovering: boolean;
  showFavorite: boolean;
  isFavorite: boolean;
}

let mouseEnterTimer: number | undefined;

const MOUSE_ENTER_DELAY = 300;

export default class ProductItem extends React.Component<ProductItemProps, ProductItemState> {
  private productRef = React.createRef<HTMLDivElement>();
  private canHandleFavorite: boolean;

  constructor(props: ProductItemProps) {
    super(props);

    this.state = {
      hovering: false,
      showFavorite: props.favorite?.showFavorite ?? false,
      isFavorite: props.favorite?.isFavorite ?? false,
    };

    this.canHandleFavorite = true;
  }

  componentWillReceiveProps(nextProps: ProductItemProps): void {
    if (nextProps.favorite?.isFavorite !== this.state.isFavorite) {
      this.setState({
        isFavorite: nextProps.favorite?.isFavorite ?? false,
      });
    }
  }

  private getProductTop(): number | undefined {
    const element = this.productRef.current;
    return element?.getBoundingClientRect().top;
  }

  private onItemClick = (event: React.MouseEvent | React.SyntheticEvent): void => {
    clearTimeout(mouseEnterTimer);

    const isValidClick = !event || event.type !== 'mousedown' || (event as React.MouseEvent).button === 0;
    
    if (isValidClick) {
      const { clickItem } = this.props;
      clickItem?.(event, this.getProductTop());
    }
  };

  private onItemMouseEnter = (event: React.MouseEvent): void => {
    clearTimeout(mouseEnterTimer);
    
    mouseEnterTimer = window.setTimeout(() => {
      this.onItemClick(event);
      this.setState({ hovering: true });
    }, MOUSE_ENTER_DELAY);
  };

  private onItemMouseLeave = (): void => {
    clearTimeout(mouseEnterTimer);
    this.setState({ hovering: false });
  };

  private renderItemFooter(title: string, secondTitle?: string, operations?: React.ReactNode): React.ReactElement {
    return (
      <div className={`${WHOLE_PRODUCT_CLASS}-content-info`}>
        <div className={`${WHOLE_PRODUCT_CLASS}-text-content`}>
          <div className={`${WHOLE_PRODUCT_CLASS}-text-container`}>
            <div className={`${WHOLE_PRODUCT_CLASS}-title`} title={title}>
              {title}
            </div>
          </div>
          {secondTitle && (
            <div className={`${WHOLE_PRODUCT_CLASS}-text-container`}>
              <div className={`${WHOLE_PRODUCT_CLASS}-second-title`} title={secondTitle}>
                {secondTitle}
              </div>
            </div>
          )}
        </div>
        <div className={`${WHOLE_PRODUCT_CLASS}-icon-info`}>
          {operations}
        </div>
      </div>
    );
  }

  private onFavoriteClick = (event: React.MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    if (!this.canHandleFavorite) {
      return;
    }

    this.canHandleFavorite = false;
    const newIsFavorite = !this.state.isFavorite;
    const { favorite } = this.props;

    if (typeof favorite?.onFavoriteClick === 'function') {
      favorite.onFavoriteClick({
        isFavorite: newIsFavorite,
        favoriteCallBackData: favorite.favoriteCallBackData,
      })
        .then((response: FavoriteResponse) => {
          this.canHandleFavorite = true;
          if (response.isSucceed) {
            this.setState({ isFavorite: newIsFavorite });
          }
        })
        .catch(() => {
          this.canHandleFavorite = true;
        });
    }
  };

  private onCheckHelpDoc = (event: React.MouseEvent): void => {
    event.stopPropagation();

    const app = (window as any).HSApp?.App?.getApp();
    const helpDocKey = HELP_DOC_KEYS[this.props.type];
    
    app?.signalCustomFunctionStart?.dispatch({ key: helpDocKey });
  };

  render(): React.ReactElement {
    const {
      type,
      realIndex,
      realPage,
      data,
      title,
      secondtitle,
      operations,
      hasPano,
      imgSrc,
      supportSelect,
      payInfo,
    } = this.props;

    const { hovering, showFavorite, isFavorite } = this.state;

    const authorInfo = data.customizedRoom?.authorInfo ?? {};
    const { nickName, firstName, lastName, avatar } = authorInfo;

    const favoriteIconStyle: React.CSSProperties = {
      fontSize: '14px',
      color: isFavorite ? '#FFB739' : '#9B9FAB',
    };

    const badgeIcons: React.ReactElement[] = [];

    if (payInfo?.needPay) {
      if (payInfo.isVip) {
        badgeIcons.push(
          <IconfontView
            key="vip"
            showType="hs_zhanshi_styler"
            customStyle={{ fontSize: '20px', opacity: 0.8 }}
          />
        );
      } else if (!payInfo.paid) {
        badgeIcons.push(
          <img key="badge" className="icon-badge-symbol" src={badgeIcon} />
        );
      }
    }

    if (hasPano) {
      badgeIcons.push(
        <IconfontView
          key="pano"
          showType="hs_mian_quanjing"
          customStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
        />
      );
    }

    const whiteLabelConfig = (window as any).adskUser?.getBenefitMeta?.('whiteLabel', 'hideHomestylerText');
    const autoStylerAvatar = whiteLabelConfig?.autoStylerAvatar;
    
    let authorName = nickName || `${firstName ?? ''} ${lastName ?? ''}`.trim();
    
    if (autoStylerAvatar?.hide) {
      authorName = '';
    } else if (autoStylerAvatar?.text) {
      authorName = autoStylerAvatar.text;
    }

    const shouldShowNoSelectionHint =
      ['my_styler_template', 'enterprise_styler_template_page'].includes(type) &&
      !supportSelect &&
      (window as any).HSApp?.Config?.TENANT !== 'fp' &&
      hovering;

    const isPublicTemplate = type === 'public_styler_template_page';

    return (
      <div className={`${WHOLE_PRODUCT_CLASS}-wrapper`} data-index={realIndex} data-page={realPage}>
        <div ref={this.productRef} className={`${WHOLE_PRODUCT_CLASS}-container`}>
          <div
            className={`${WHOLE_PRODUCT_CLASS}-content-image-wrapper`}
            onClick={this.onItemClick}
            onMouseEnter={this.onItemMouseEnter}
            onMouseLeave={this.onItemMouseLeave}
          >
            <div>
              <LazyImage
                key="imageNormal"
                dataSrc={imgSrc}
                classes={`${WHOLE_PRODUCT_CLASS}-content-image`}
              />
            </div>

            {showFavorite && hovering && (
              <span className={`${WHOLE_PRODUCT_CLASS}-favorite-icon`} onClick={this.onFavoriteClick}>
                <IconfontView
                  showType="hs_mian_shoucang"
                  clickColor="#FFB739"
                  customStyle={favoriteIconStyle}
                  hoverColor={isFavorite ? '#FFB739' : '#60646f'}
                />
              </span>
            )}

            {badgeIcons.length > 0 && (
              <span className={`${WHOLE_PRODUCT_CLASS}-icons-block`}>{badgeIcons}</span>
            )}

            {shouldShowNoSelectionHint && (
              <div className={`${WHOLE_PRODUCT_CLASS}-no-selection`}>
                <span className={`${WHOLE_PRODUCT_CLASS}-no-selection-desc`}>
                  {(window as any).ResourceManager?.getString('autostyler_no_selection')}
                </span>
                <span className={`${WHOLE_PRODUCT_CLASS}-no-selection-link`} onClick={this.onCheckHelpDoc}>
                  {(window as any).ResourceManager?.getString('autostyler_no_selection_check_help_doc')}
                </span>
              </div>
            )}

            {isPublicTemplate && authorName && (
              <div className="author-info">
                <div className="avatar">
                  <img src={avatar} />
                </div>
                <div className="user-name">{authorName}</div>
              </div>
            )}
          </div>

          {this.renderItemFooter(title, secondtitle, operations)}
        </div>
      </div>
    );
  }
}