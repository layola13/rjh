import React from 'react';

interface UnitConfig {
  digits: number;
}

interface ButtonConfig {
  id: string | number;
  icon?: string;
  tip: string;
}

interface ViewSettingData {
  contentId: string;
  title: string;
  subtitle: string;
  btns: ButtonConfig[];
  buttonlabel: string;
}

interface ViewSettingState {
  itemIndex: number;
  showDialog: boolean;
  selectedIndex: number;
}

interface ViewSettingProps {
  // Add specific props if needed
}

interface UserCameraRotationSettings {
  default3DView: number;
  firstPersonCameraRotationType: number;
  mouseLeftAndRightButtonSetting: number;
}

export class ViewSetting extends React.Component<ViewSettingProps, ViewSettingState> {
  private cameraRotateMode: string;
  private mouseMode: string;
  private viewMode: number;
  private unit: number;
  private digits: number;
  private unitMap: Record<number, UnitConfig>;
  private data: ViewSettingData[];

  constructor(props: ViewSettingProps) {
    super(props);

    this.state = {
      itemIndex: 0,
      showDialog: true,
      selectedIndex: 0
    };

    this.nextClick = this.nextClick.bind(this);
    this.completeClick = this.completeClick.bind(this);
    this.handleSelectedClick = this.handleSelectedClick.bind(this);

    this.viewMode = HSCore.Model.CameraTypeEnum.OrbitView;
    this.mouseMode = "mouseLeftButtonRotate";
    this.cameraRotateMode = "sameDirection";

    const lengthUnitType = HSCore.Util.Unit.LengthUnitTypeEnum;
    this.unit = lengthUnitType.meter;

    const defaultUnits = [
      lengthUnitType.meter,
      lengthUnitType.centimeter,
      lengthUnitType.millimeter
    ];
    const displayUnits = [...defaultUnits];

    if (HSApp.Config.TENANT === "fp") {
      defaultUnits.splice(1, 0, lengthUnitType.inch);
      displayUnits.splice(1, 0, lengthUnitType.foot);
    }

    this.unitMap = {
      [lengthUnitType.meter]: { digits: 3 },
      [lengthUnitType.centimeter]: { digits: 1 },
      [lengthUnitType.millimeter]: { digits: 0 },
      [lengthUnitType.inch]: { digits: 0 }
    };

    this.digits = this.unitMap[this.unit].digits;

    const unitButtons = defaultUnits.map((unitId, index) => ({
      id: unitId,
      tip: displayUnits[index]
    }));

    this.data = [
      {
        contentId: "viewsetting_unit",
        title: ResourceManager.getString("setting_measurement_unit"),
        subtitle: ResourceManager.getString("setting_measurement_unit_subtitle"),
        btns: unitButtons,
        buttonlabel: ResourceManager.getString("viewsetting_next")
      },
      {
        contentId: "viewsetting_defaultview",
        title: ResourceManager.getString("viewsetting_defaultview"),
        subtitle: ResourceManager.getString("viewsetting_select_defaultview"),
        btns: [
          {
            id: HSCore.Model.CameraTypeEnum.OrbitView,
            icon: require('./icons/orbit.svg'),
            tip: ResourceManager.getString("viewsetting_birdview")
          },
          {
            id: HSCore.Model.CameraTypeEnum.FirstPerson,
            icon: require('./icons/firstperson.svg'),
            tip: ResourceManager.getString("viewsetting_roam")
          }
        ],
        buttonlabel: ResourceManager.getString("viewsetting_next")
      },
      {
        contentId: "viewsetting_mouse_left_right_button_setting",
        title: ResourceManager.getString("viewsetting_mouse_left_right_button_setting"),
        subtitle: "",
        btns: [
          {
            id: "mouseLeftButtonRotate",
            icon: require('./icons/rotate.svg'),
            tip: ResourceManager.getString("setting_mouse_left_button_rotate")
          },
          {
            id: "mouseLeftButtonTranslation",
            icon: require('./icons/translate.svg'),
            tip: ResourceManager.getString("setting_mouse_left_button_translation")
          }
        ],
        buttonlabel: ResourceManager.getString("viewsetting_next")
      },
      {
        contentId: "viewsetting_mouserotate",
        title: ResourceManager.getString("viewsetting_mouserotate"),
        subtitle: ResourceManager.getString("viewsetting_rotatedirection"),
        btns: [
          {
            id: "sameDirection",
            icon: require('./icons/same-direction.svg'),
            tip: ResourceManager.getString("viewsetting_samedirection")
          },
          {
            id: "reverseDirection",
            icon: require('./icons/reverse-direction.svg'),
            tip: ResourceManager.getString("viewsetting_reversedirection")
          }
        ],
        buttonlabel: ResourceManager.getString("viewsetting_complete")
      }
    ];
  }

  private nextClick(event: React.MouseEvent): void {
    const currentIndex = this.state.itemIndex;
    this.setState({
      itemIndex: currentIndex + 1,
      selectedIndex: 0
    });
  }

  private hide(): void {
    this.setState({
      showDialog: false
    });
  }

  private runAnimation(): void {
    const firstToolbarItem = $(".toolbar.active-toolbar").find("ul li:first");
    const backgroundImage = this.cameraRotateMode === "sameDirection" 
      ? require('./images/same-direction-bg.png')
      : require('./images/reverse-direction-bg.png');

    $(".view-wrapper")?.css({
      "background-image": `url(${backgroundImage})`
    });

    $(".view-wrapper").genieCollapse(firstToolbarItem, ["top"], 3, () => {
      $(".view-setting")?.remove();
    });

    setTimeout(() => {
      firstToolbarItem.addClass("viewsetting_toolbar_file_animation");
      setTimeout(() => {
        firstToolbarItem.removeClass("viewsetting_toolbar_file_animation");
      }, 1000);
    }, 1100);
  }

  private completeClick(event: React.MouseEvent): void {
    this.hide();
    this.runAnimation();

    const cameraRotationType = this.cameraRotateMode === "sameDirection" ? 1 : 0;
    const mouseButtonSetting = this.mouseMode === "mouseLeftButtonTranslation" ? 1 : 0;

    const app = HSApp.App.getApp();
    const activeView = app.getActive3DView();
    
    if (activeView) {
      activeView.switchCameraByType(this.viewMode);
    }

    app.pluginManager.getPlugin("hsw.plugin.viewswitch.Plugin").onViewChanged();

    const settings: UserCameraRotationSettings = {
      default3DView: this.viewMode,
      firstPersonCameraRotationType: cameraRotationType,
      mouseLeftAndRightButtonSetting: mouseButtonSetting
    };

    if (HSApp.Config.TENANT === "fp") {
      const storage = new HSApp.Util.Storage(HSFPConstants.PluginType.UserSetting);
      this.initUserCameraRotation(settings, storage);
    } else {
      const url = `${HSApp.PartnerConfig.MEMBER_CENTER_URL}/api/v2/members/${adskUser.memberId}/design/setting`;
      NWTK.ajax.put(url, settings)
        .then(() => {
          this.initUserCameraRotation(settings);
        })
        .catch((error: Error) => {
          console.error("Failed to save settings:", error);
        });
    }

    this.setUnit();
  }

  private setUnit(): void {
    const app = HSApp.App.getApp();
    
    appSettingsUtil.defaultDisplayLengthUnit = this.unit;
    app.floorplan.displayLengthUnit = this.unit;

    const areaUnit = this.unit === HSCore.Util.Unit.LengthUnitTypeEnum.inch
      ? HSCore.Util.Unit.AreaUnitTypeEnum.foot
      : HSCore.Util.Unit.AreaUnitTypeEnum.meter;

    appSettingsUtil.defaultDisplayAreaUnit = areaUnit;
    app.floorplan.displayAreaUnit = areaUnit;

    app.appSettings.signalValueChanged.dispatch({
      fieldName: "displayLengthUnit",
      value: areaUnit
    });

    app.signalPropertyBarRefresh.dispatch();

    appSettingsUtil.defaultDisplayLengthDigits = this.digits;
    app.floorplan.displayLengthPrecisionDigits = this.digits;

    const areaDigits = this.unit === HSCore.Util.Unit.LengthUnitTypeEnum.inch ? 0 : 2;
    appSettingsUtil.defaultDisplayAreaDigits = areaDigits;
    app.floorplan.displayAreaPrecisionDigits = areaDigits;

    new HSApp.Util.Storage(HSFPConstants.PluginType.UserSetting).set("user-setting-displayLength-unit", {
      unit: this.unit,
      digits: this.digits
    });
  }

  private initUserCameraRotation(
    settings: UserCameraRotationSettings,
    storage?: HSApp.Util.Storage
  ): void {
    const { default3DView, firstPersonCameraRotationType, mouseLeftAndRightButtonSetting } = settings;

    adskUser.customizedSetting.default3DView = default3DView;
    adskUser.customizedSetting.firstPersonCameraRotationType = firstPersonCameraRotationType;
    adskUser.customizedSetting.mouseLeftAndRightButtonSetting = mouseLeftAndRightButtonSetting;

    HSApp.App.getApp()
      .pluginManager
      .getPlugin(HSFPConstants.PluginType.UserSetting)
      .initSettingStatus({
        default3DView: true,
        firstPersonCameraRotationType: true,
        mouseLeftAndRightButtonSetting: true
      });

    if (storage) {
      storage.set("user-setting-camera-rotation", settings);
    }
  }

  private handleSelectedClick(
    event: React.MouseEvent,
    buttonIndex: number,
    contentId: string,
    buttonId: string | number
  ): void {
    this.setState({
      selectedIndex: buttonIndex
    });

    if (contentId === "viewsetting_defaultview") {
      this.viewMode = buttonId as number;
    } else if (contentId === "viewsetting_mouse_left_right_button_setting") {
      this.mouseMode = buttonId as string;
    } else if (contentId === "viewsetting_mouserotate") {
      this.cameraRotateMode = buttonId as string;
    } else if (contentId === "viewsetting_unit") {
      this.unit = buttonId as number;
      this.digits = this.unitMap[buttonId as number].digits;
    }
  }

  render(): React.ReactElement {
    const currentData = this.data[this.state.itemIndex];
    const { contentId, title, subtitle, btns, buttonlabel } = currentData;

    const buttonElements = btns.map((btn, index) => {
      const { id, icon, tip } = btn;
      const selectedClass = this.state.selectedIndex === index ? "view-image-option-selected" : "";

      return (
        <div
          key={id}
          className={`view-image-option ${selectedClass}`}
          onClick={(event) => this.handleSelectedClick(event, index, contentId, id)}
        >
          {icon && <img src={icon} />}
          <div className="view-tips">
            <p className="view-tips-text">{tip}</p>
          </div>
          {this.state.selectedIndex === index && (
            <input className="view-checkbox" type="checkbox" />
          )}
        </div>
      );
    });

    const subtitleStyle = {
      visibility: subtitle ? "visible" : "hidden"
    } as React.CSSProperties;

    const isLastStep = this.state.itemIndex === this.data.length - 1;

    return (
      <div className={`view-setting ${this.state.showDialog ? "" : "view-setting-hide"}`}>
        <div className="view-setting-mask" />
        <div className="view-wrapper">
          <div className="view-header">
            <div className="view-title">
              {`${this.state.itemIndex + 1}/${this.data.length} ${title}`}
            </div>
            <div className="view-subtitle" style={subtitleStyle}>
              {subtitle}
            </div>
          </div>
          <div className={`view-content ${btns.length > 2 ? "view-content-more" : ""}`}>
            {buttonElements}
          </div>
          <div className="view-footer">
            <button
              type="button"
              className="view-buttonstyle btn"
              onClick={(event) => isLastStep ? this.completeClick(event) : this.nextClick(event)}
            >
              {buttonlabel}
            </button>
          </div>
          <div className="view-close-btn">
            <IconfontView
              showType="hs_xian_guanbi"
              iconOnclick={() => this.hide()}
              customStyle={{
                fontSize: "20px",
                color: "#000000"
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}