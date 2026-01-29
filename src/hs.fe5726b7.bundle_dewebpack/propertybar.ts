enum PropertyBarControlTypeEnum {
  numberinput = "numberinput",
  lengthInput = "lengthinput",
  areaInput = "areaInput",
  button = "button",
  image = "image",
  imageButton = "imagebutton",
  ImageBtnWithHelp = "ImageBtnWithHelp",
  linkButton = "linkbutton",
  CImageButton = "CImageButton",
  ImageButtonWithPopup = "ImageButtonWithPopup",
  dropDownList = "dropdownlist",
  dropDownRoomTypeList = "dropdownroomtypelist",
  dropDownEditList = "dropdowneditlist",
  viewModeDropdown = "viewModeDropdown",
  slider = "slider",
  sliderscale = "sliderscale",
  enter = "enter",
  cameraSwitchWidget = "cameraSwitchWidget",
  divider = "divider",
  subdivider = "subdivider",
  arrowDivider = "arrowdivider",
  space = "space",
  popup = "popup",
  checkbox = "checkbox",
  colorCheckbox = "colorCheckbox",
  radioButton = "radioButton",
  label = "label",
  toggleBtn = "toggleBtn",
  toggleButton = "toggleButton",
  toggleBtnNew = "toggleBtnNew",
  statusBtn = "statusBtn",
  ninePatch = "ninePatch",
  rotation = "rotation",
  vdivider = "vdivider",
  helptip = "helptip",
  hintview = "hintview",
  img = "img",
  blockalign = "blockalign",
  titlelabel = "titlelabel",
  imgbtn = "imgbtn",
  nochoice = "nochoice",
  generalLengthInput = "generallengthinput",
  cabinetapp = "cabinetapp",
  performance3dCtrl = "performance3dCtrl",
  tagitems = "tagitems",
  sliderInput = "sliderInput",
  doubleSliderInput = "doubleSliderInput",
  ImageTextButton = "imageTextButton",
  CircleImage = "circleImage",
  colorPicker = "colorPicker",
  RadioButtonCard = "radioButtonCard"
}

interface ControlConfig {
  id?: string;
  visible?: boolean;
  hidden?: boolean;
  text?: string;
  template?: string;
  className?: string;
  width?: number;
  range?: unknown;
  options?: unknown;
  value?: unknown;
  label?: string;
  onValueChange?: (event: unknown) => void;
  onValueChangeStart?: (event: unknown) => void;
  onValueChangeEnd?: (event: unknown) => void;
  onopenpopup?: (event: unknown) => void;
  onclosepopup?: (event: unknown) => void;
}

interface ControlDefinition {
  id?: string;
  type: PropertyBarControlTypeEnum;
  data?: Partial<ControlConfig>;
}

interface ControlFactory {
  create: (container: JQuery, config: ControlConfig) => Control;
}

interface Control {
  update?: (config: ControlConfig) => void;
  destroy?: () => void;
  setValue?: (value: unknown) => void;
  addEventListener?: (eventType: string, handler: (event: unknown) => void, useCapture: boolean) => void;
}

class PropertyBarItem {
  propertyBar: PropertyBar;
  nodeElement?: JQuery;
  control?: Control | HTMLElement;

  constructor(propertyBar: PropertyBar) {
    this.propertyBar = propertyBar;
  }

  create(config: ControlConfig, factory: ControlFactory | null, container: JQuery): PropertyBarItem {
    const itemHtml = `<li class="${config.id} ${config.visible ? "" : "hidden"}"></li>`;
    const nodeElement = $(itemHtml).appendTo(container);
    
    const item = Object.create(this) as PropertyBarItem;
    item.nodeElement = nodeElement;
    
    if (factory) {
      item.control = factory.create(nodeElement, config);
    } else {
      const content = config.template || `<span>${config.text}</span>`;
      item.control = $(content).appendTo(nodeElement)[0];
    }
    
    return item;
  }

  update(config?: ControlConfig): void {
    if (!config) return;
    
    if (config.hidden === true || config.visible === false) {
      this.nodeElement?.addClass("hidden");
    } else {
      this.nodeElement?.removeClass("hidden");
      if (this.control && typeof this.control === 'object' && 'update' in this.control) {
        this.control.update?.(config);
      }
    }
  }

  destroy(): void {
    if (this.control && typeof this.control === 'object' && 'destroy' in this.control) {
      this.control.destroy?.();
    }
  }

  destory(): void {
    console.warn("deprecated, use destroy instead!");
    this.destroy();
  }
}

class PropertyBar {
  private _name: string;
  private _rootElement: JQuery | null;
  private _containerElement: JQuery | null;
  private _containerElementHeader: JQuery | null;
  private _controlsByKey: Map<string, PropertyBarItem>;
  private _propertyBarItem: PropertyBarItem;
  private onopenpopup?: (event: unknown) => void;
  private onclosepopup?: (event: unknown) => void;

  signalSizeGrow: HSCore.Util.Signal<unknown>;
  signalSizeShrink: HSCore.Util.Signal<unknown>;

  constructor(name: string) {
    this._name = name;
    this._rootElement = null;
    this._containerElement = null;
    this._containerElementHeader = null;
    this._controlsByKey = new Map<string, PropertyBarItem>();
    this.signalSizeGrow = new HSCore.Util.Signal<unknown>(undefined);
    this.signalSizeShrink = new HSCore.Util.Signal<unknown>(undefined);
    this._init();
    this._propertyBarItem = new PropertyBarItem(this);
  }

  static create(name: string): PropertyBar {
    return new PropertyBar(name);
  }

  getControlById(id: string): PropertyBarItem | undefined {
    return this._controlsByKey.get(id);
  }

  show(parent?: JQuery): void {
    const container = parent || $("body");
    container.append(this._rootElement!);
    
    HSApp.App.getApp();
    
    if (this._name.indexOf("statusBar") > -1) {
      const detailContainer = document.querySelector(".detail-page-independent-container-wrapper");
      let totalWidth = ($(".entry-container").is(":hidden") ? 0 : $(".entry-container").width()!) + 
                       ($(".detail-page-container-wrapper").is(":hidden") ? 0 : $(".detail-page-container-wrapper").width()!);
      
      if (detailContainer?.offsetWidth) {
        totalWidth = detailContainer.offsetWidth;
      }
      
      $(this._rootElement!).css("width", `calc(100% - ${totalWidth + 2}px)`);
    }
    
    this._init();
    this._rootElement!.show();
  }

  hide(): void {
    this._init();
    this._rootElement!.hide();
    this._rootElement!.detach();
  }

  clear(): void {
    this._removeAll();
    this._init();
  }

  addControl(definition: ControlDefinition): PropertyBarItem | undefined {
    return this._addControl(definition);
  }

  setControls(definitions: ControlDefinition[]): Record<string, PropertyBarItem> {
    this.clear();
    const controls: Record<string, PropertyBarItem> = {};
    
    definitions.forEach((definition) => {
      const control = this._addControl(definition);
      if (definition.id && control) {
        controls[definition.id] = control;
      }
    });
    
    return controls;
  }

  private _init(): void {
    if (this._rootElement) return;
    
    const template = `<div class="${this._name} noprint propertybar"><ul class="list-inline contents contents-header"></ul><ul class="list-inline contents contents-end"></ul></div>`;
    this._rootElement = $(template);
    this._rootElement.hide();
    this._containerElement = this._rootElement.find(".contents-end");
    this._containerElementHeader = this._rootElement.find(".contents-header");
    
    this.onopenpopup = ((event: unknown) => {
      this.signalSizeGrow.dispatch(event);
    }).bind(this);
    
    this.onclosepopup = ((event: unknown) => {
      this.signalSizeShrink.dispatch(event);
    }).bind(this);
  }

  private _removeAll(): void {
    this._controlsByKey.forEach((control) => {
      control.destroy?.();
    });
    this._controlsByKey.clear();
    this._rootElement?.remove();
    this._rootElement = null;
  }

  private _addControl(definition: ControlDefinition): PropertyBarItem | undefined {
    let item: PropertyBarItem | undefined;
    
    const config: ControlConfig = {
      ...definition.data,
      id: definition.id
    };
    
    if (config.visible === undefined) {
      config.visible = !config.hidden;
    }
    
    switch (definition.type) {
      case PropertyBarControlTypeEnum.divider:
        Object.assign(config, {
          id: config.className,
          template: '<span class="verticaldivider"></span>'
        });
        item = this._propertyBarItem.create(config, null, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.subdivider:
        Object.assign(config, {
          id: config.className,
          template: '<span class="verticalsubdivider"></span>'
        });
        item = this._propertyBarItem.create(config, null, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.arrowDivider:
        Object.assign(config, {
          id: config.className,
          template: '<div class="arrow-divider"></div>'
        });
        item = this._propertyBarItem.create(config, null, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.ImageButtonWithPopup:
        item = this._propertyBarItem.create(config, ImageButtonWithPopup, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.imageButton:
        item = this._propertyBarItem.create(config, ImageButton, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.image:
        item = this._propertyBarItem.create(config, CImage, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.linkButton:
        item = this._propertyBarItem.create(config, CLinkButton, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.label:
        item = this._propertyBarItem.create(config, CLabel, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.numberinput:
        item = this._propertyBarItem.create(config, NumberInput, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.areaInput:
        item = this._propertyBarItem.create(config, AreaInput, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.lengthInput:
        item = this._propertyBarItem.create(config, LengthInput, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.space:
        config.width = config.width || 10;
        item = this._propertyBarItem.create({
          id: "",
          template: `<span class="space" style="width:${config.width}px"></span>`
        }, null, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.dropDownList:
        config.onopenpopup = this.onopenpopup;
        config.onclosepopup = this.onclosepopup;
        item = this._propertyBarItem.create(config, CDropDown, this._containerElementHeader!);
        break;
        
      case PropertyBarControlTypeEnum.viewModeDropdown:
        item = this._propertyBarItem.create(config, {
          create: (container: JQuery, cfg: ControlConfig) => {
            return viewModeDropdown.create(cfg, container.get(0));
          }
        }, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.cameraSwitchWidget:
        item = this._propertyBarItem.create(config, CameraSwitchWidget, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.button:
        config.label = config.text;
        item = this._propertyBarItem.create(config, CButton, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.slider:
        item = this._propertyBarItem.create(config, {
          create: (container: JQuery, cfg: ControlConfig) => {
            const slider = Slider.create(container, cfg.range, cfg.options);
            slider.setValue?.(cfg.value);
            
            if (cfg.onValueChange) {
              slider.addEventListener?.(SliderEventsEnum.valueChanged, cfg.onValueChange.bind(slider), false);
            }
            if (cfg.onValueChangeStart) {
              slider.addEventListener?.(SliderEventsEnum.valueChangeStart, cfg.onValueChangeStart.bind(slider), false);
            }
            if (cfg.onValueChangeEnd) {
              slider.addEventListener?.(SliderEventsEnum.valueChangeEnd, cfg.onValueChangeEnd.bind(slider), false);
            }
            
            return slider;
          }
        }, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.sliderscale:
        item = this._propertyBarItem.create(config, {
          create: (container: JQuery, cfg: ControlConfig) => {
            const sliderScale = SliderScale.create(container, cfg.range, cfg.options);
            sliderScale.setValue?.(cfg.value);
            
            if (cfg.onValueChange) {
              sliderScale.addEventListener?.(SliderEventsEnum.valueChanged, cfg.onValueChange.bind(sliderScale), false);
            }
            if (cfg.onValueChangeStart) {
              sliderScale.addEventListener?.(SliderEventsEnum.valueChangeStart, cfg.onValueChangeStart.bind(sliderScale), false);
            }
            if (cfg.onValueChangeEnd) {
              sliderScale.addEventListener?.(SliderEventsEnum.valueChangeEnd, cfg.onValueChangeEnd.bind(sliderScale), false);
            }
            
            return sliderScale;
          }
        }, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.radioButton:
        item = this._propertyBarItem.create(config, RadioButton, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.checkbox:
        item = this._propertyBarItem.create(config, CCheckBox, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.colorCheckbox:
        item = this._propertyBarItem.create(config, ColorCheckbox, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.toggleBtn:
        item = this._propertyBarItem.create(config, {
          create: (container: JQuery, cfg: ControlConfig) => {
            return ToggleButtonWidget.create(cfg, container.get(0));
          }
        }, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.toggleBtnNew:
        item = this._propertyBarItem.create(config, {
          create: (container: JQuery, cfg: ControlConfig) => {
            return ToggleBtnWidget.create(cfg, container.get(0));
          }
        }, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.statusBtn:
        item = this._propertyBarItem.create(config, {
          create: (container: JQuery, cfg: ControlConfig) => {
            return StatusBtnWidget.create(cfg, container.get(0));
          }
        }, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.ninePatch:
        item = this._propertyBarItem.create(config, {
          create: (container: JQuery, cfg: ControlConfig) => {
            return NinePatchWidget.create(cfg, container.get(0));
          }
        }, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.performance3dCtrl:
        item = this._propertyBarItem.create(config, {
          create: (container: JQuery, cfg: ControlConfig) => {
            return Performance3DCtrl.create(cfg, container.get(0));
          }
        }, this._containerElement!);
        break;
        
      case PropertyBarControlTypeEnum.CImageButton:
        item = this._propertyBarItem.create(config, CImageButton, this._containerElement!);
        break;
    }
    
    if (item) {
      const controlId = definition.id || HSCore.Util.String.randomGUID();
      this._controlsByKey.set(controlId, item);
    }
    
    return item;
  }
}

export { PropertyBarControlTypeEnum, PropertyBar };