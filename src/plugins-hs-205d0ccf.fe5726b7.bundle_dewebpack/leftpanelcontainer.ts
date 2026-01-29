import React, { Component, forwardRef, useRef, useImperativeHandle } from 'react';
import { Modal, Popover, Slider } from 'antd';
import { IconfontView, SmartText } from './components';
import { getString } from './i18n';
import classNames from 'classnames';

interface ResolutionRatio {
  code: string;
  privilegeCount?: number;
  showAuth?: boolean;
}

interface Proportion {
  code: string;
  proportionWidth: number;
  proportionHeight: number;
  resolutionRatioList: ResolutionRatio[];
}

interface RoomType {
  code: string;
  name: string;
}

interface Styler {
  code: string;
  name: string;
  imageUrl: string;
  tagValue?: string;
}

interface OptionAuth {
  resolutionRatio?: string[];
  imageCount?: number[];
}

interface PageInfo {
  proportionList?: Proportion[];
  resolutionRatioList?: ResolutionRatio[];
  imageCountList?: number[];
  roomTypeList?: RoomType[];
  stylerList?: Styler[];
  optionAuth?: OptionAuth;
  imageReferenceStrength?: number;
  styleDisableRoomList?: Record<string, string[]>;
}

interface LeftPanelState {
  pageInfo: PageInfo;
  proportionSelect?: Proportion;
  resolutionRatioSelect?: ResolutionRatio;
  imageCountSelect?: number;
  imageReferenceStrengthSelect?: number;
  roomTypeSelect?: RoomType;
  stylerSelect?: Styler;
}

interface LeftPanelProps {
  pageInfo: PageInfo;
  keepSelect?: boolean;
  proportionOnChange: (proportion: Proportion) => void;
  authorize: (type: string) => void;
}

interface CustomizedData {
  proportionSelect?: Proportion;
  resolutionRatioSelect?: ResolutionRatio;
  imageCountSelect?: number;
  imageReferenceStrengthSelect?: number;
  roomTypeSelect?: RoomType;
  stylerSelect?: Styler;
}

class LeftPanelContainerClass extends Component<LeftPanelProps, LeftPanelState> {
  constructor(props: LeftPanelProps) {
    super(props);
    this.state = {
      pageInfo: props.pageInfo,
    };
  }

  static getDerivedStateFromProps(props: LeftPanelProps, state: LeftPanelState): Partial<LeftPanelState> | null {
    const { pageInfo } = props;
    if (!pageInfo || pageInfo === state.pageInfo) {
      return null;
    }

    const firstProportion = pageInfo.proportionList?.[0];
    
    return {
      pageInfo,
      ...(props.keepSelect
        ? LeftPanelContainerClass.updateSelectedData(pageInfo, state)
        : {
            proportionSelect: pageInfo.proportionList?.[0],
            resolutionRatioSelect: firstProportion?.resolutionRatioList?.[0],
            imageCountSelect: pageInfo.imageCountList?.[0],
            imageReferenceStrengthSelect: pageInfo.imageReferenceStrength,
            roomTypeSelect: pageInfo.roomTypeList?.[0],
            stylerSelect: pageInfo.stylerList?.[0],
          }),
    };
  }

  static updateSelectedData(pageInfo: PageInfo, state: LeftPanelState): Partial<LeftPanelState> {
    const { proportionSelect, resolutionRatioSelect } = state;
    const updatedProportion = pageInfo.proportionList?.find(
      (item) => item.code === proportionSelect?.code
    );
    const updatedResolutionRatio = updatedProportion?.resolutionRatioList.find(
      (item) => item.code === resolutionRatioSelect?.code
    );

    return {
      proportionSelect: updatedProportion,
      resolutionRatioSelect: updatedResolutionRatio,
    };
  }

  proportionOnChange = (proportion: Proportion): void => {
    const { resolutionRatioSelect } = this.state;
    const updatedResolutionRatio =
      proportion.resolutionRatioList.find(
        (item) => item.code === resolutionRatioSelect?.code
      ) || resolutionRatioSelect;

    this.setState({
      proportionSelect: proportion,
      resolutionRatioSelect: updatedResolutionRatio,
    });
    this.props.proportionOnChange(proportion);
  };

  imageCountOnChange = (count: number, requireAuth: boolean): void => {
    if (requireAuth) {
      this.props.authorize('count');
    } else {
      this.setState({ imageCountSelect: count });
    }
  };

  moreCreditsClick = (): void => {
    this.props.authorize('aigc');
  };

  imageReferenceStrengthOnChange = (strength: number): void => {
    this.setState({ imageReferenceStrengthSelect: strength });
  };

  roomTypeOnChange = (roomType: RoomType): void => {
    this.setState({ roomTypeSelect: roomType });
  };

  stylerOnChange = (styler: Styler): void => {
    this.setState({ stylerSelect: styler });
  };

  showResolutionRatioWarnModel = (content: string): void => {
    const isFpTenant = HSApp.Config.TENANT === 'fp';
    const okTextKey = isFpTenant
      ? 'plugin_spark_pic_warn_model_ok_buy_coupon'
      : 'plugin_spark_pic_warn_model_ok';

    const modal = Modal.confirm({
      title: getString('plugin_spark_pic_warn_model_title'),
      centered: true,
      content: `${getString('plugin_spark_pic_warn_model_content_1')}${getString('plugin_spark_pic_warn_model_content_2')}`,
      okText: getString(okTextKey),
      cancelText: getString('plugin_spark_pic_warn_model_cancel'),
      icon: null,
      closable: true,
      className: 'model_container',
      onOk: (close) => {
        close();
        modal.destroy();
        if (isFpTenant) {
          this.props.authorize('aigc');
        }
      },
    });
  };

  getCustomizedData(): CustomizedData {
    const {
      proportionSelect,
      resolutionRatioSelect,
      imageCountSelect,
      imageReferenceStrengthSelect,
      roomTypeSelect,
      stylerSelect,
    } = this.state;

    return {
      proportionSelect,
      resolutionRatioSelect,
      imageCountSelect,
      imageReferenceStrengthSelect,
      roomTypeSelect,
      stylerSelect,
    };
  }

  render(): React.ReactNode {
    const { pageInfo } = this.props;
    const {
      proportionSelect,
      resolutionRatioSelect,
      imageCountSelect,
      imageReferenceStrengthSelect,
      roomTypeSelect,
      stylerSelect,
    } = this.state;

    return (
      <div className="left_panel">
        <div className="icon">
          <img src={require('./assets/icon.png')} />
        </div>
        <div className="content">
          <ProportionSection
            proportionList={pageInfo?.proportionList}
            resolutionRatioAuth={pageInfo?.optionAuth?.resolutionRatio}
            proportionSelect={proportionSelect}
            resolutionRatioSelect={resolutionRatioSelect}
            proportionOnChange={this.proportionOnChange}
            moreCreditsClick={this.moreCreditsClick}
          />
          <ImageCountSection
            imageCountList={pageInfo?.imageCountList}
            imageCountAuth={pageInfo?.optionAuth?.imageCount}
            imageCountSelect={imageCountSelect}
            imageCountOnChange={this.imageCountOnChange}
          />
          <ImageReferenceStrengthSection
            imageReferenceStrength={imageReferenceStrengthSelect}
            onChange={this.imageReferenceStrengthOnChange}
          />
          <RoomTypeSection
            roomTypeList={pageInfo?.roomTypeList}
            roomTypeSelect={roomTypeSelect}
            stylerSelect={stylerSelect}
            onChange={this.roomTypeOnChange}
            styleDisableRoomList={pageInfo?.styleDisableRoomList}
          />
          <StylerSection
            stylerList={pageInfo?.stylerList}
            stylerSelect={stylerSelect}
            roomTypeSelect={roomTypeSelect}
            onChange={this.stylerOnChange}
            styleDisableRoomList={pageInfo?.styleDisableRoomList}
          />
        </div>
      </div>
    );
  }
}

interface ProportionSectionProps {
  proportionList?: Proportion[];
  resolutionRatioAuth?: string[];
  proportionSelect?: Proportion;
  resolutionRatioSelect?: ResolutionRatio;
  proportionOnChange: (proportion: Proportion) => void;
  moreCreditsClick: () => void;
}

const ProportionSection: React.FC<ProportionSectionProps> = ({
  proportionList = [],
  resolutionRatioAuth = [],
  proportionSelect = proportionList[0],
  proportionOnChange,
  moreCreditsClick,
}) => {
  const resolutionRatioListWithAuth = proportionSelect?.resolutionRatioList.map((item) => ({
    ...item,
    showAuth: !resolutionRatioAuth.includes(item.code),
  }));

  const firstResolutionRatio = resolutionRatioListWithAuth?.[0];
  const privilegeCount = firstResolutionRatio?.privilegeCount ?? 0;
  const isFpTenant = HSApp.Config.TENANT === 'fp';

  return (
    <>
      <div className="content_item resolution">
        <div className="title">
          <span>{getString('plugin_spark_pic_AI_credits')}</span>
        </div>
        <div className="detail">
          {isFpTenant ? (
            <div className="credits_item cursor_on_hover" onClick={moreCreditsClick}>
              <span className="text">
                {ResourceManager.getString('plugin_spark_pic_credits_left').replace('{num}', String(privilegeCount))}
              </span>
              <span className="text">
                {ResourceManager.getString('plugin_spark_pic_warn_model_ok_buy_coupon')} →
              </span>
            </div>
          ) : (
            <div className="credits_item">
              <span className="text">
                {ResourceManager.getString('plugin_spark_pic_credits_left').replace('{num}', String(privilegeCount))}
              </span>
              <img style={{ width: 46, height: 16 }} src={require('./assets/badge.png')} />
            </div>
          )}
        </div>
      </div>
      <div className="content_item proportion">
        <div className="title">
          <span>{getString('plugin_spark_pic_proportion')}</span>
        </div>
        <div className="detail">
          {proportionList.map((item) => (
            <LabelItem
              key={item.code}
              customClass={classNames('proportion_item', {
                label_item_selected: item.code === proportionSelect?.code,
              })}
              label={`${item.proportionWidth}:${item.proportionHeight}`}
              itemClick={() => proportionOnChange(item)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

interface ImageCountSectionProps {
  imageCountList?: number[];
  imageCountAuth?: number[];
  imageCountSelect?: number;
  imageCountOnChange: (count: number, requireAuth: boolean) => void;
}

const ImageCountSection: React.FC<ImageCountSectionProps> = ({
  imageCountList = [],
  imageCountAuth = [],
  imageCountSelect,
  imageCountOnChange,
}) => {
  const imageCountWithAuth = imageCountList.map((count) => ({
    count,
    showAuth: !imageCountAuth.includes(count),
  }));

  const popoverContent = (
    <div className="popover_content">{getString('plugin_spark_pic_design_numbers_popover')}</div>
  );

  return (
    <div className="content_item image_reference_strength">
      <div className="title">
        <span>{getString('plugin_spark_pic_image_count')}</span>
        <Popover
          content={popoverContent}
          arrowPointAtCenter={true}
          trigger="hover"
          placement="topLeft"
          arrow={{ pointAtCenter: true }}
          overlayClassName="spark-pic-popover-overwrap-dark"
        >
          <IconfontView showType="hs_shuxingmianban_jieshibai" customStyle={{ fontSize: '16px' }} />
        </Popover>
      </div>
      <div className="detail">
        {imageCountWithAuth.map(({ count, showAuth }) => (
          <div key={count} className="image_count">
            <LabelItem
              customClass={classNames({ image_count_item_selected: count === imageCountSelect })}
              label={count}
              itemClick={() => imageCountOnChange(count, showAuth)}
            />
            {showAuth && <img className="benefit_img" src={require('./assets/benefit.png')} />}
          </div>
        ))}
      </div>
    </div>
  );
};

interface ImageReferenceStrengthSectionProps {
  imageReferenceStrength?: number;
  onChange: (value: number) => void;
}

const ImageReferenceStrengthSection: React.FC<ImageReferenceStrengthSectionProps> = ({
  imageReferenceStrength = 20,
  onChange,
}) => {
  const popoverContent = (
    <div className="popover_content">{getString('plugin_spark_pic_image_strength_popover')}</div>
  );

  const marks = {
    0: {
      style: { color: 'rgba(255, 255, 255, 0.46)' },
      label: getString('plugin_spark_pic_image_strength_low'),
    },
    50: {
      style: { color: 'rgba(255, 255, 255, 0.46)' },
      label: getString('plugin_spark_pic_image_strength_middle'),
    },
    100: {
      style: { color: 'rgba(255, 255, 255, 0.46)' },
      label: getString('plugin_spark_pic_image_strength_high'),
    },
  };

  return (
    <div className="content_item image_reference_strength">
      <div className="title">
        <span>{getString('plugin_spark_pic_image_strength')}</span>
        <Popover
          content={popoverContent}
          arrowPointAtCenter={true}
          trigger="hover"
          placement="topLeft"
          arrow={{ pointAtCenter: true }}
          overlayClassName="spark-pic-popover-overwrap-dark"
        >
          <IconfontView showType="hs_shuxingmianban_jieshibai" customStyle={{ fontSize: '16px' }} />
        </Popover>
      </div>
      <div className="detail slider-outer">
        <Slider marks={marks} step={1} value={imageReferenceStrength} min={0} max={100} onChange={onChange} />
      </div>
    </div>
  );
};

interface RoomTypeSectionProps {
  roomTypeList?: RoomType[];
  roomTypeSelect?: RoomType;
  stylerSelect?: Styler;
  onChange: (roomType: RoomType) => void;
  styleDisableRoomList?: Record<string, string[]>;
}

const RoomTypeSection: React.FC<RoomTypeSectionProps> = ({
  roomTypeList = [],
  roomTypeSelect,
  stylerSelect,
  onChange,
  styleDisableRoomList = {},
}) => {
  return (
    <div className="content_item">
      <div className="title">
        <span>{getString('plugin_spark_pic_room_type')}</span>
      </div>
      <div className="detail">
        {roomTypeList.map((roomType) => {
          const isDisabled = (styleDisableRoomList[stylerSelect?.code ?? ''] || []).includes(roomType.code);
          return (
            <LabelItem
              key={roomType.code}
              customClass={classNames('proportion_item', {
                label_item_selected: !isDisabled && roomTypeSelect?.code === roomType.code,
                label_item_disable: isDisabled,
              })}
              isShowTip={true}
              label={roomType.name}
              itemClick={() => onChange(roomType)}
            />
          );
        })}
      </div>
    </div>
  );
};

interface StylerSectionProps {
  stylerList?: Styler[];
  stylerSelect?: Styler;
  roomTypeSelect?: RoomType;
  onChange: (styler: Styler) => void;
  styleDisableRoomList?: Record<string, string[]>;
}

const StylerSection: React.FC<StylerSectionProps> = ({
  stylerList = [],
  stylerSelect,
  roomTypeSelect,
  onChange,
  styleDisableRoomList = {},
}) => {
  return (
    <div className="content_item styler">
      <div className="title">
        <span>{getString('plugin_spark_pic_styler')}</span>
      </div>
      <div className="detail">
        {stylerList.map((styler) => {
          const isDisabled = (styleDisableRoomList[styler.code] || []).includes(roomTypeSelect?.code ?? '');
          return (
            <ImageItem
              key={styler.code}
              customClass={classNames({
                image_item_selected: !isDisabled && stylerSelect?.code === styler.code,
                image_item_disable: isDisabled,
              })}
              tagValue={styler.tagValue}
              label={styler.name}
              imageUrl={styler.imageUrl}
              itemClick={() => onChange(styler)}
            />
          );
        })}
      </div>
    </div>
  );
};

interface LabelItemProps {
  label: React.ReactNode;
  customClass?: string;
  itemClick: () => void;
  isShowTip?: boolean;
}

const LabelItem: React.FC<LabelItemProps> = ({ label, customClass, itemClick }) => {
  return (
    <div className={`label_item ${customClass ?? ''}`} onClick={itemClick}>
      <SmartText>{label}</SmartText>
    </div>
  );
};

interface ImageItemProps {
  label: string;
  imageUrl: string;
  customClass?: string;
  itemClick: () => void;
  tagValue?: string;
}

const ImageItem: React.FC<ImageItemProps> = ({ label, imageUrl, customClass, itemClick, tagValue }) => {
  return (
    <div className={`image_item ${customClass ?? ''}`} onClick={itemClick}>
      {tagValue && <div className="tag_type">{tagValue}</div>}
      <img src={imageUrl} />
      <span className="image_name">
        <SmartText>{label}</SmartText>
      </span>
    </div>
  );
};

export interface LeftPanelContainerRef {
  getCustomizedData: () => CustomizedData;
  showWarnModel: (content: string) => void;
  setSelectedRoomType: (roomType: RoomType) => void;
}

export const LeftPanelContainer = forwardRef<LeftPanelContainerRef, LeftPanelProps>((props, ref) => {
  const innerRef = useRef<LeftPanelContainerClass>(null);

  useImperativeHandle(
    ref,
    () => ({
      getCustomizedData: () => innerRef.current!.getCustomizedData(),
      showWarnModel: (content: string) => innerRef.current!.showResolutionRatioWarnModel(content),
      setSelectedRoomType: (roomType: RoomType) => innerRef.current!.roomTypeOnChange(roomType),
    }),
    []
  );

  return <LeftPanelContainerClass {...props} ref={innerRef} />;
});