import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';

// Image imports
import ceilingImage1 from './assets/ceiling-1.png';
import ceilingImage2 from './assets/ceiling-2.png';
import wallImage1 from './assets/wall-1.png';
import wallImage2 from './assets/wall-2.png';
import platformImage1 from './assets/platform-1.png';
import platformImage2 from './assets/platform-2.png';
import personalImage1 from './assets/personal-1.png';
import personalImage2 from './assets/personal-2.png';

// Type definitions
type ModelTypeKey = 
  | 'plugin_customizedModeling_type_ceiling'
  | 'plugin_customizedModeling_type_feature_wall'
  | 'plugin_customizedModeling_type_platform'
  | 'plugin_customizedModeling_type_personalized';

enum CustomizedContentType {
  CustomizedPMInstanceCeiling = 'CustomizedPMInstanceCeiling',
  CustomizedPMInstanceWall = 'CustomizedPMInstanceWall',
  CustomizedPMInstancePlatform = 'CustomizedPMInstancePlatform',
  CustomizedPMInstancePersonal = 'CustomizedPMInstancePersonal'
}

interface ModelItemProps {
  item: ModelTypeKey;
  selectedItem: string;
  modelImages: string[];
  onModeTypeChange: (item: ModelTypeKey) => void;
}

interface ModelItemState {
  isHover: boolean;
}

interface CreateParams {
  modelContentType: CustomizedContentType;
}

interface ModelTypeContentProps {
  create: (params: CreateParams) => void;
  cancel: (shouldClose?: boolean) => void;
  cancelCmd: () => void;
  initType?: ModelTypeKey;
  isModify?: boolean;
}

interface ModelTypeContentState {
  show: boolean;
  disabled: boolean;
  selectedItem: string;
}

interface DialogWrapperProps {
  onCreate: (params: CreateParams) => void;
  initType?: ModelTypeKey;
}

interface DialogRootRef {
  handleOkClick: (event: Event) => void;
  handleCancelClick: (event: Event) => void;
}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const HSCatalog: {
  ContentTypeEnum: typeof CustomizedContentType;
};

declare const HSApp: {
  App: {
    getApp(): {
      userTrackLogger: {
        push(name: string, data: unknown, options: unknown): void;
      };
    };
  };
};

declare const HSFPConstants: {
  LogGroupTypes: {
    ContentOperation: string;
  };
};

// ModelItem component
class ModelItem extends React.Component<ModelItemProps, ModelItemState> {
  static propTypes = {
    item: PropTypes.string.isRequired,
    selectedItem: PropTypes.string.isRequired,
    modelImages: PropTypes.array.isRequired,
    onModeTypeChange: PropTypes.func.isRequired
  };

  constructor(props: ModelItemProps) {
    super(props);
    this.state = {
      isHover: false
    };
  }

  onMouseEnter = (): void => {
    this.setState({ isHover: true });
  };

  onMouseLeave = (): void => {
    this.setState({ isHover: false });
  };

  onModeTypeChange = (item: ModelTypeKey): void => {
    this.props.onModeTypeChange(item);
  };

  render(): React.ReactElement {
    const { item, selectedItem, modelImages } = this.props;
    const { isHover } = this.state;

    const imageClassNames: string[] = ['model-image'];
    if (selectedItem === item) {
      imageClassNames.push('model-image-selected');
    } else if (isHover) {
      imageClassNames.push('model-image-hover');
    }

    const descriptionClassNames: string[] = ['model-description'];
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
            <input
              className="model-checkbox"
              type="checkbox"
              readOnly
              checked
            />
          )}
        </div>
        <div className={descriptionClassNames.join(' ')}>
          <div className="model-name">
            {ResourceManager.getString(item)}
          </div>
          <div className="model-tips">
            {ResourceManager.getString(`${item}_tips`)}
          </div>
        </div>
      </li>
    );
  }
}

// ModelTypeContent component
class ModelTypeContent extends React.Component<ModelTypeContentProps, ModelTypeContentState> {
  static propTypes = {
    create: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    cancelCmd: PropTypes.func.isRequired
  };

  private readonly DEFAULT_SELECTION = 'plugin_customizedModeling_select_model_type';
  private readonly MODEL_TYPES: ModelTypeKey[] = [
    'plugin_customizedModeling_type_ceiling',
    'plugin_customizedModeling_type_feature_wall',
    'plugin_customizedModeling_type_platform',
    'plugin_customizedModeling_type_personalized'
  ];

  private readonly modelContentTypeMap: Record<ModelTypeKey, CustomizedContentType> = {
    plugin_customizedModeling_type_ceiling: CustomizedContentType.CustomizedPMInstanceCeiling,
    plugin_customizedModeling_type_feature_wall: CustomizedContentType.CustomizedPMInstanceWall,
    plugin_customizedModeling_type_platform: CustomizedContentType.CustomizedPMInstancePlatform,
    plugin_customizedModeling_type_personalized: CustomizedContentType.CustomizedPMInstancePersonal
  };

  private readonly modelImageMap: Record<ModelTypeKey, string[]> = {
    plugin_customizedModeling_type_ceiling: [ceilingImage1, ceilingImage2],
    plugin_customizedModeling_type_feature_wall: [wallImage1, wallImage2],
    plugin_customizedModeling_type_platform: [platformImage1, platformImage2],
    plugin_customizedModeling_type_personalized: [personalImage1, personalImage2]
  };

  constructor(props: ModelTypeContentProps) {
    super(props);
    this.state = {
      show: false,
      disabled: true,
      selectedItem: this.DEFAULT_SELECTION
    };
  }

  componentDidMount(): void {
    document.body.addEventListener('click', this.handleBodyClick, true);
  }

  componentWillUnmount(): void {
    document.body.removeEventListener('click', this.handleBodyClick);
  }

  handleBodyClick = (): void => {
    if (this.state.show) {
      this.setState({ show: false });
    }
  };

  toggleSelectModelType = (): void => {
    this.setState({ show: !this.state.show });
  };

  handleModeTypeChange = (item: ModelTypeKey): void => {
    this.setState({
      selectedItem: item,
      show: false,
      disabled: false
    });
  };

  handleCreateClicked = (): void => {
    if (this.state.disabled) {
      return;
    }

    const selectedItem = this.state.selectedItem as ModelTypeKey;
    this.props.create({
      modelContentType: this.modelContentTypeMap[selectedItem]
    });

    const feedbackBtn = document.querySelector('.feedbackentrybtn') as HTMLElement;
    if (feedbackBtn) {
      feedbackBtn.style.zIndex = '101';
    }
  };

  handleCancelClicked = (): void => {
    this.props.cancel();
    this.props.cancelCmd();
  };

  render(): React.ReactElement {
    const { isModify, initType } = this.props;
    const { selectedItem, disabled } = this.state;

    if (selectedItem === this.DEFAULT_SELECTION && isModify && initType) {
      this.handleModeTypeChange(initType);
    }

    const modelItems = this.MODEL_TYPES.map((type) => (
      <ModelItem
        key={type}
        item={type}
        selectedItem={selectedItem}
        modelImages={this.modelImageMap[type]}
        onModeTypeChange={this.handleModeTypeChange}
      />
    ));

    return (
      <div>
        <div className="model-type-field">
          <div className="model-type-tile">
            {ResourceManager.getString('plugin_customizedModeling_model_type')}
          </div>
          <div className="model-type-container">
            {modelItems}
          </div>
        </div>
        <div className="createcustomizedmodelbuttons customizedmodel-buttons">
          <Button
            className="cancelbutton"
            shape="circle"
            onClick={this.handleCancelClicked}
          >
            {ResourceManager.getString('cancel')}
          </Button>
          <Button
            className="createbutton"
            disabled={disabled}
            shape="circle"
            type="primary"
            onClick={this.handleCreateClicked}
          >
            {ResourceManager.getString(
              isModify 
                ? 'plugin_customizedModeling_modify' 
                : 'plugin_customizedModeling_create'
            )}
          </Button>
        </div>
      </div>
    );
  }
}

// DialogWrapper component
class DialogWrapper extends React.Component<DialogWrapperProps> {
  static propTypes = {
    onCreate: PropTypes.func.isRequired
  };

  private rootRef = React.createRef<DialogRootRef>();

  close = (shouldSubmit: boolean): void => {
    const root = this.rootRef.current;
    if (!root) return;

    if (shouldSubmit) {
      root.handleOkClick(new Event('click'));
    } else {
      root.handleCancelClick(new Event('click'));
    }
  };

  handleCreate = (params: CreateParams): void => {
    this.close(true);
    this.props.onCreate(params);
  };

  handleCancelCmd = (): void => {
    // Placeholder for cancel command
  };

  addEndLog = (validOperation: boolean): void => {
    HSApp.App.getApp().userTrackLogger.push(
      'editCustomizedModelType',
      {
        description: '修改自由造型类型',
        group: HSFPConstants.LogGroupTypes.ContentOperation,
        type: 'diy2.0',
        validOperation
      },
      {
        triggerType: 'end'
      }
    );
  };

  handleCancelCall = (): void => {
    this.addEndLog(false);
  };

  handleSubmitCall = (): void => {
    this.addEndLog(true);
  };

  render(): React.ReactElement {
    const content = (
      <ModelTypeContent
        create={this.handleCreate}
        cancel={this.close}
        cancelCmd={this.handleCancelCmd}
        initType={this.props.initType}
        isModify={true}
      />
    );

    return (
      <div
        ref={this.rootRef as any}
        className="createcustomizedmodel"
        data-windowname="createcustomizedmodel"
        data-headername={ResourceManager.getString('plugin_customizedModeling_modify_ceiling_type')}
        data-winwidth={576}
        data-winheight={354}
        data-wintop={178}
      >
        {content}
      </div>
    );
  }
}

// Main export class
export class EditCustomizedPModelTypeDialog {
  private readonly initType?: ModelTypeKey;

  constructor(initType?: ModelTypeKey) {
    this.initType = initType;
  }

  show(onCreate: (params: CreateParams) => void): void {
    const dialogElement = (
      <DialogWrapper
        onCreate={onCreate}
        initType={this.initType}
      />
    );

    const container = document.querySelector('.popupcontainer');
    if (container) {
      ReactDOM.render(dialogElement, container);
    }
  }
}