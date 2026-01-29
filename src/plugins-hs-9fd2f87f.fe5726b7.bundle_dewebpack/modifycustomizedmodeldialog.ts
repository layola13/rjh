import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import DialogWindow from './DialogWindow';
import createReactClass from 'create-react-class';

// Image imports
import ceilingImage from './images/ceiling.png';
import ceilingImageHover from './images/ceiling_hover.png';
import featureWallImage from './images/feature_wall.png';
import featureWallImageHover from './images/feature_wall_hover.png';
import platformImage from './images/platform.png';
import platformImageHover from './images/platform_hover.png';
import personalizedImage from './images/personalized.png';
import personalizedImageHover from './images/personalized_hover.png';

// Type definitions
interface CreateCustomizedModelParams {
  modelContentType: string;
  modelSizeRange: string;
}

interface ModelDialogProps {
  onCreate: (params: CreateCustomizedModelParams) => void;
}

interface ModifyModelDialogProps {
  onCreate: (params: CreateCustomizedModelParams) => void;
  initType?: string;
}

interface ModelItemProps {
  item: string;
  selectedItem: string;
  modelImages: string[];
  onModeTypeChange: (item: string) => void;
}

interface ModelItemState {
  isHover: boolean;
}

interface ModelContentProps {
  create: (params: CreateCustomizedModelParams) => void;
  cancel: (shouldSubmit?: boolean) => void;
  cancelCmd: () => void;
  isShowModelSize: boolean;
  isModify?: boolean;
  initType?: string;
}

interface ModelContentState {
  show: boolean;
  disabled: boolean;
  selectedItem: string;
  selectedSizeRange: string;
}

// Constants
const MODEL_TYPES = {
  CEILING: 'plugin_customizedModeling_type_ceiling',
  FEATURE_WALL: 'plugin_customizedModeling_type_feature_wall',
  PLATFORM: 'plugin_customizedModeling_type_platform',
  PERSONALIZED: 'plugin_customizedModeling_type_personalized',
} as const;

const DEFAULT_MODEL_TYPE = 'plugin_customizedModeling_select_model_type';

const MODEL_CONTENT_TYPE_MAP: Record<string, string> = {
  [MODEL_TYPES.CEILING]: HSCatalog.ContentTypeEnum.CustomizedCeiling,
  [MODEL_TYPES.FEATURE_WALL]: HSCatalog.ContentTypeEnum.CustomizedFeaturewall,
  [MODEL_TYPES.PLATFORM]: HSCatalog.ContentTypeEnum.CustomizedPlatform,
  [MODEL_TYPES.PERSONALIZED]: HSCatalog.ContentTypeEnum.CustomizedPersonalizedModel,
};

const MODEL_IMAGE_MAP: Record<string, string[]> = {
  [MODEL_TYPES.CEILING]: [ceilingImage, ceilingImageHover],
  [MODEL_TYPES.FEATURE_WALL]: [featureWallImage, featureWallImageHover],
  [MODEL_TYPES.PLATFORM]: [platformImage, platformImageHover],
  [MODEL_TYPES.PERSONALIZED]: [personalizedImage, personalizedImageHover],
};

const MODEL_TYPE_LIST = [
  MODEL_TYPES.CEILING,
  MODEL_TYPES.FEATURE_WALL,
  MODEL_TYPES.PLATFORM,
  MODEL_TYPES.PERSONALIZED,
];

const SIZE_RANGE = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
} as const;

// Model Item Component
class ModelItem extends React.Component<ModelItemProps, ModelItemState> {
  static propTypes = {
    item: PropTypes.string.isRequired,
    selectedItem: PropTypes.string.isRequired,
    modelImages: PropTypes.array.isRequired,
    onModeTypeChange: PropTypes.func.isRequired,
  };

  constructor(props: ModelItemProps) {
    super(props);
    this.state = {
      isHover: false,
    };
  }

  onMouseEnter = (): void => {
    this.setState({ isHover: true });
  };

  onMouseLeave = (): void => {
    this.setState({ isHover: false });
  };

  onModeTypeChange = (item: string): void => {
    this.props.onModeTypeChange(item);
  };

  render(): React.ReactElement {
    const { item, selectedItem, modelImages } = this.props;
    const { isHover } = this.state;

    const imageClassNames = ['model-image'];
    if (selectedItem === item) {
      imageClassNames.push('model-image-selected');
    } else if (isHover) {
      imageClassNames.push('model-image-hover');
    }

    const descriptionClassNames = ['model-description'];
    if (selectedItem === item || isHover) {
      descriptionClassNames.push('model-description-highlight');
    }

    return (
      <li
        role="presentation"
        className="model-view-li"
        onClick={() => this.onModeTypeChange(item)}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div className={imageClassNames.join(' ')}>
          <img src={modelImages[0]} alt={item} />
          {selectedItem === item && (
            <input className="model-checkbox" type="checkbox" readOnly checked />
          )}
        </div>
        <div className={descriptionClassNames.join(' ')}>
          <div className="model-name">{ResourceManager.getString(item)}</div>
          <div className="model-tips">
            {ResourceManager.getString(`${item}_tips`)}
          </div>
        </div>
      </li>
    );
  }
}

// Model Content Component
const ModelContent = createReactClass<ModelContentProps, ModelContentState>({
  propTypes: {
    create: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    cancelCmd: PropTypes.func.isRequired,
    isShowModelSize: PropTypes.bool.isRequired,
    isModify: PropTypes.bool,
    initType: PropTypes.string,
  },

  getInitialState(): ModelContentState {
    const defaultContentType = MODEL_CONTENT_TYPE_MAP[DEFAULT_MODEL_TYPE];
    return {
      show: false,
      disabled: true,
      selectedItem: DEFAULT_MODEL_TYPE,
      selectedSizeRange: HSCore.Model.CustomizedModel.getDefaultSizeRange(defaultContentType),
    };
  },

  componentDidMount(): void {
    document.body.addEventListener('click', this.handleBodyClick, true);
  },

  componentWillUnmount(): void {
    document.body.removeEventListener('click', this.handleBodyClick);
  },

  handleBodyClick(): void {
    if (this.state.show) {
      this.setState({ show: false });
    }
  },

  toggleSelectModelType(): void {
    this.setState({ show: !this.state.show });
  },

  _onSizeRangeChange(event: React.MouseEvent<HTMLLIElement>): void {
    if (!this.state.disabled) {
      const sizeRange = event.currentTarget.id;
      this.setState({ selectedSizeRange: sizeRange });
    }
  },

  _onModeTypeChange(modelType: string): void {
    const contentType = MODEL_CONTENT_TYPE_MAP[modelType];
    const defaultSizeRange = HSCore.Model.CustomizedModel.getDefaultSizeRange(contentType);
    
    this.setState({
      selectedItem: modelType,
      selectedSizeRange: defaultSizeRange,
      show: false,
      disabled: false,
    });
  },

  _onCreateClicked(): void {
    if (this.state.disabled) {
      return;
    }

    const { selectedItem, selectedSizeRange } = this.state;
    const modelContentType = MODEL_CONTENT_TYPE_MAP[selectedItem];

    const eventTracker = HSApp.Util.EventTrack.instance();
    eventTracker.track(HSApp.Util.EventGroupEnum.Rightmenu, 'enter_diy_env_event', {
      entrance: 'catalog',
      IF_env: HSApp.App.getApp().activeEnvironmentId,
    });

    eventTracker.track(
      HSApp.Util.EventGroupEnum.Customize,
      `${modelContentType.replace(/ /g, '_')}_event`,
      { diySize: selectedSizeRange }
    );

    this.props.create({
      modelContentType,
      modelSizeRange: selectedSizeRange,
    });

    $('.feedbackentrybtn').css('zIndex', 101);
  },

  _onCancelClicked(): void {
    this.props.cancel();
    this.props.cancelCmd();
  },

  render(): React.ReactElement {
    const { isShowModelSize, isModify, initType } = this.props;
    const { selectedItem, selectedSizeRange, disabled } = this.state;

    if (selectedItem === DEFAULT_MODEL_TYPE && isModify && initType) {
      this._onModeTypeChange(initType);
    }

    const modelItems = MODEL_TYPE_LIST.map((modelType) => (
      <ModelItem
        key={modelType}
        item={modelType}
        selectedItem={selectedItem}
        modelImages={MODEL_IMAGE_MAP[modelType]}
        onModeTypeChange={this._onModeTypeChange}
      />
    ));

    const getSizeItemClassName = (sizeType: string): string => {
      const baseClass = 'outputitem';
      if (disabled) {
        return `${baseClass} buttonDisabled`;
      }
      return `${baseClass} ${sizeType === selectedSizeRange ? 'active' : 'buttonEnabled'}`;
    };

    return (
      <div>
        {isShowModelSize && (
          <div className="model-size-field">
            <div className="model-size-tile">
              {ResourceManager.getString('plugin_customizedModeling_model_size')}
            </div>
            <div className="modeloutputtogglecontainer">
              <ul className="modelsizecontainer" ref="modelsizecontainer">
                <li
                  id={SIZE_RANGE.LOW}
                  className={getSizeItemClassName(SIZE_RANGE.LOW)}
                  onClick={this._onSizeRangeChange}
                >
                  {ResourceManager.getString('plugin_customizedModeling_model_size_rough')}
                </li>
                <li
                  id={SIZE_RANGE.MIDDLE}
                  className={getSizeItemClassName(SIZE_RANGE.MIDDLE)}
                  onClick={this._onSizeRangeChange}
                >
                  {ResourceManager.getString('plugin_customizedModeling_model_size_ordinary')}
                </li>
                <li
                  id={SIZE_RANGE.HIGH}
                  className={getSizeItemClassName(SIZE_RANGE.HIGH)}
                  onClick={this._onSizeRangeChange}
                >
                  {ResourceManager.getString('plugin_customizedModeling_model_size_refined')}
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="model-type-field">
          {isShowModelSize && (
            <div className="model-type-tile">
              {ResourceManager.getString('plugin_customizedModeling_model_type')}
            </div>
          )}
          <div className="model-type-container">{modelItems}</div>
        </div>

        <div className="createcustomizedmodelbuttons customizedmodel-buttons">
          <Button className="cancelbutton" type="default" onClick={this._onCancelClicked}>
            {ResourceManager.getString('cancel')}
          </Button>
          <Button
            className="createbutton"
            disabled={disabled}
            type="primary"
            onClick={this._onCreateClicked}
          >
            {ResourceManager.getString(
              isModify ? 'plugin_customizedModeling_modify' : 'plugin_customizedModeling_create'
            )}
          </Button>
        </div>
      </div>
    );
  },
});

// Create Model Dialog Component
class CreateModelDialogWrapper extends React.Component<ModelDialogProps> {
  static propTypes = {
    onCreate: PropTypes.func.isRequired,
  };

  refs!: {
    root: any;
  };

  constructor(props: ModelDialogProps) {
    super(props);
    this.close = this.close.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.cancelCmd = this.cancelCmd.bind(this);
  }

  cancelCmd(): void {
    const cmdManager = HSApp.App.getApp().cmdManager;
    const currentCmd = cmdManager.current;
    if (currentCmd && currentCmd.type === HSFPConstants.CommandType.CreateRoomAttachedCustomizedModel) {
      cmdManager.cancel();
    }
  }

  close(shouldSubmit = false): void {
    try {
      if (shouldSubmit) {
        this.refs.root.handleOkClick(event);
      } else {
        this.refs.root.handleCancelClick(event);
      }
    } catch (error) {
      const container = document.querySelector('.createcustomizedmodel');
      if (container && ReactDOM) {
        ReactDOM.unmountComponentAtNode(container);
      }
    }
  }

  onCreate(params: CreateCustomizedModelParams): void {
    this.close(true);
    this.props.onCreate(params);
  }

  render(): React.ReactElement {
    const contentElement = (
      <ModelContent
        create={this.onCreate}
        cancel={this.close}
        cancelCmd={this.cancelCmd}
        isShowModelSize={false}
      />
    );

    return (
      <DialogWindow
        ref="root"
        windowname="createcustomizedmodel"
        class="createcustomizedmodel"
        headername={ResourceManager.getString('plugin_customizedModeling_select_model_type_header')}
        contents={contentElement}
        winwidth={576}
        winheight={330}
        wintop={178}
      />
    );
  }
}

// Modify Model Dialog Component
const ModifyModelDialogWrapper = createReactClass<ModifyModelDialogProps, {}>({
  propTypes: {
    onCreate: PropTypes.func.isRequired,
    initType: PropTypes.string,
  },

  refs: {} as { root: any },

  close(shouldSubmit = false): void {
    if (shouldSubmit) {
      this.refs.root.handleOkClick(event);
    } else {
      this.refs.root.handleCancelClick(event);
    }
  },

  onCreate(params: CreateCustomizedModelParams): void {
    this.close(true);
    this.props.onCreate(params);
  },

  cancelCmd(): void {
    const cmdManager = HSApp.App.getApp().cmdManager;
    const currentCmd = cmdManager.current;
    if (currentCmd && currentCmd.type === HSFPConstants.CommandType.CreateRoomAttachedCustomizedModel) {
      cmdManager.cancel();
    }
  },

  addEndLog(isValid: boolean): void {
    HSApp.App.getApp().userTrackLogger.push(
      'editCustomizedModelType',
      {
        description: '修改自由造型类型',
        group: HSFPConstants.LogGroupTypes.ContentOperation,
        type: 'diy1.0',
        validOperation: isValid,
      },
      { triggerType: 'end' }
    );
  },

  cancelCall(): void {
    this.addEndLog(false);
  },

  submitCall(): void {
    this.addEndLog(true);
  },

  render(): React.ReactElement {
    const contentElement = (
      <ModelContent
        create={this.onCreate}
        cancel={this.close}
        cancelCmd={this.cancelCmd}
        initType={this.props.initType}
        isModify={true}
        isShowModelSize={true}
      />
    );

    return (
      <DialogWindow
        ref="root"
        windowname="createcustomizedmodel"
        class="createcustomizedmodel"
        headername={ResourceManager.getString('plugin_customizedModeling_modify_ceiling_type')}
        contents={contentElement}
        winwidth={576}
        winheight={454}
        wintop={178}
        cancelcall={this.cancelCall}
        submitcall={this.submitCall}
      />
    );
  },
});

// Main Dialog Classes
export class CustomizedModelDialog {
  show(onCreate: (params: CreateCustomizedModelParams) => void): void {
    const dialogElement = <CreateModelDialogWrapper onCreate={onCreate} />;
    const container = document.querySelector('.popupcontainer');
    if (container) {
      ReactDOM.render(dialogElement, container);
    }
  }
}

export class ModifyCustomizedModelDialog {
  private _initType: string | undefined;

  constructor(initType?: string) {
    this._initType = initType;
  }

  show(onCreate: (params: CreateCustomizedModelParams) => void): void {
    const dialogElement = (
      <ModifyModelDialogWrapper onCreate={onCreate} initType={this._initType} />
    );
    const container = document.querySelector('.popupcontainer');
    if (container) {
      ReactDOM.render(dialogElement, container);
    }
  }
}

export default new CustomizedModelDialog();