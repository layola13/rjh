interface CameraSwitchWidgetParams {
  id?: string;
  onclick?: () => void;
  selectedIndex: number;
  btns: Array<{
    setting: {
      isPin: boolean;
      click: (event: JQuery.ClickEvent) => boolean;
    };
    cameraposition: {
      click: (event: JQuery.ClickEvent) => boolean;
    };
    fitcenter: {
      onclick?: () => void;
      click: () => void;
    };
  }>;
}

interface CImageButtonWidget {
  container: JQuery;
}

interface HSAppInstance {
  designMetadata: unknown;
}

interface AdskUser {
  adaId?: string;
  guid?: string;
}

declare global {
  interface Window {
    CameraSwitchWidget: typeof CameraSwitchWidget;
  }
  
  interface JQuery {
    cameraswitchwidget(params: CameraSwitchWidgetParams | string): JQuery;
  }
  
  const HSApp: {
    App: {
      getApp(): HSAppInstance;
    };
    Util: {
      Design: {
        isReadOnly(): boolean;
      };
      EventTrack: {
        instance(): {
          track(group: unknown, eventName: string): void;
        };
      };
      EventGroupEnum: {
        Camera: unknown;
      };
    };
  };
  
  const adskUser: AdskUser;
  
  const ResourceManager: {
    getString(key: string): string;
  };
  
  const CImageButton: {
    create(element: JQuery, config: unknown): CImageButtonWidget;
  };
}

class CameraSwitchWidget {
  public instance!: JQuery;
  public container: JQuery;
  public param: CameraSwitchWidgetParams;

  constructor(element: string | HTMLElement, params: CameraSwitchWidgetParams) {
    this.container = $(element);
    this.param = params;
    this.instance = this.container.cameraswitchwidget(this.param);
  }

  static create(element: string | HTMLElement, params: CameraSwitchWidgetParams): CameraSwitchWidget {
    return new CameraSwitchWidget(element, params);
  }

  public update(newParams: Partial<CameraSwitchWidgetParams>): void {
    this.destroy();
    Object.assign(this.param, newParams);
    this.instance = this.container.cameraswitchwidget(this.param);
  }

  public destroy(): void {
    this.instance.cameraswitchwidget("destroy");
  }
}

window.CameraSwitchWidget = CameraSwitchWidget;

interface CameraSwitchWidgetOptions {
  id: string;
  onclick?: () => void;
  selectedIndex: number;
  btns: Array<{
    setting: {
      isPin: boolean;
      click: (event: JQuery.ClickEvent) => boolean;
    };
    cameraposition: {
      click: (event: JQuery.ClickEvent) => boolean;
    };
    fitcenter: {
      onclick?: () => void;
      click: () => void;
    };
  }>;
}

interface CameraSwitchWidgetInstance {
  widgetEventPrefix: string;
  options: CameraSwitchWidgetOptions;
  element: JQuery;
  app: HSAppInstance;
  camera_positions: string;
  camera_settings: string;
  cameraWidgets: unknown[];
  positionWidget: CImageButtonWidget;
  settingWidget: CImageButtonWidget;
  fitcenterWidget: CImageButtonWidget;
  
  update(): void;
  selectSetting(isPinned: boolean): void;
  _create(): void;
}

$.widget("custom.cameraswitchwidget", {
  widgetEventPrefix: "cameraswitchwidget",
  
  options: {
    id: "camerarootcontainer",
    onclick: undefined
  } as CameraSwitchWidgetOptions,

  update(this: CameraSwitchWidgetInstance): void {
    const isPinned = this.options.btns[this.options.selectedIndex].setting.isPin;
    this.selectSetting(isPinned);
  },

  selectSetting(this: CameraSwitchWidgetInstance, isPinned: boolean): void {
    if (isPinned) {
      this.settingWidget.container.addClass("select");
    } else {
      this.settingWidget.container.removeClass("select");
    }
    this.positionWidget.container.removeClass("select");
  },

  _create(this: CameraSwitchWidgetInstance): void {
    const template = `
      <div class="camerarootcontainer">
        <div class="verticaldivider"></div>
        <div class="camera_position">
          <div class="settings1"></div>
          <div class="settings1text"></div>
        </div>
        <div class="verticaldivider"></div>
        <div class="settings">
          <div class="camera_setting">
            <div class="settings2"></div>
            <div class="settings2text"></div>
          </div>
          <div class="verticaldivider"></div>
          <div class="settings3"></div>
        </div>
      </div>
    `;
    
    this.element.append($(template));
    this.element.addClass("cameraSwitchWidget");
    
    this.app = HSApp.App.getApp();
    const userIdentifier = adskUser.adaId ?? adskUser.guid;
    const designMetadata = this.app.designMetadata;

    const isReadOnly = HSApp.Util.Design.isReadOnly();
    const cameraPositionElement = this.element.find(".camera_position");
    const previousDivider = cameraPositionElement.prev(".verticaldivider");
    const nextDivider = cameraPositionElement.next().next(".verticaldivider");
    
    if (isReadOnly) {
      cameraPositionElement.css("display", "none");
      previousDivider.css("display", "none");
      nextDivider.css("display", "none");
    } else {
      cameraPositionElement.css("display", "block");
      previousDivider.css("display", "block");
      nextDivider.css("display", "block");
    }

    const selectedIndex = this.options.selectedIndex;
    const buttonConfig = this.options.btns[0];
    
    this.camera_positions = ResourceManager.getString("camera_positions");
    this.camera_settings = ResourceManager.getString("camera_settings");
    this.cameraWidgets = [];

    const settingClickHandler = buttonConfig.setting.click;
    const positionClickHandler = buttonConfig.cameraposition.click;

    this.positionWidget = CImageButton.create(
      this.element.find(".settings1"),
      buttonConfig.cameraposition
    );
    this.element.find(".settings1text").text(this.camera_positions);

    this.settingWidget = CImageButton.create(
      this.element.find(".settings2"),
      buttonConfig.setting
    );

    this.element.find(".camera_setting").bind("click", (event: JQuery.ClickEvent) => {
      HSApp.Util.EventTrack.instance().track(
        HSApp.Util.EventGroupEnum.Camera,
        "camera_view_mode_setting_event"
      );
      
      const isPinned = settingClickHandler(event);
      this.selectSetting(isPinned);

      const editorElement = document.getElementById("editor3d");
      if (editorElement) {
        const canvasElements = editorElement.getElementsByTagName("canvas");
        if (canvasElements?.length > 0) {
          canvasElements[0].focus();
        }
      }
    });

    if (buttonConfig.setting.isPin) {
      this.selectSetting(true);
    }

    this.element.find(".camera_position").bind("click", (event: JQuery.ClickEvent) => {
      HSApp.Util.EventTrack.instance().track(
        HSApp.Util.EventGroupEnum.Camera,
        "camera_view_mode_position_event"
      );
      
      const isSelected = positionClickHandler(event);
      if (isSelected) {
        this.positionWidget.container.addClass("select");
      } else {
        this.positionWidget.container.removeClass("select");
      }
      this.settingWidget.container.removeClass("select");
    });

    this.element.find(".settings2text").text(this.camera_settings);

    buttonConfig.fitcenter.onclick = this.options.btns[selectedIndex].fitcenter.click;
    this.fitcenterWidget = CImageButton.create(
      this.element.find(".settings3"),
      buttonConfig.fitcenter
    );
  }
});