interface FontOption {
  id: number;
  label: string;
}

interface FontWeightData {
  options: FontOption[];
  defaultKey: number;
  onchange: (key: number) => void;
  onClickDropDown?: () => void;
  onHideDropDown?: () => void;
  direction: string;
  customClassName: string;
}

interface FontData {
  options: FontOption[];
  defaultKey: number;
  onchange: (key: number) => void;
  direction: string;
  customClassName: string;
}

interface TextInputData {
  className: string;
  label: string;
  value: number;
  delay: boolean;
  options: {
    unitType: string;
    displayDigits: number;
    includeUnit: boolean;
    readOnly: boolean;
    startFromMin: boolean;
    tips: string;
    rules: {
      range: {
        min: number;
        minInput: number;
        max: number;
        maxInput: number;
      };
      positiveOnly: boolean;
    };
  };
  onValueChangeStart: () => void;
  onValueChange: (event: { detail: { value: number } }) => void;
  onValueChangeEnd: (event: { detail: { value: number } }) => void;
}

interface ButtonData {
  className: string;
  text: string;
  disabled: boolean;
  onclick: () => void;
}

interface TextPanelProps {
  text: string;
  textHeight: number;
  fontKey: number;
  fontWeightKey: number;
  isDefaultSettings: boolean;
}

interface TextPanelState {
  text: string;
  textHeight: number;
  fontKey: number;
  fontWeightKey: number;
  isDefaultSettings: boolean;
  fontWeightData?: FontWeightData;
}

interface FontSVGData {
  textString: string;
}

const HSW_PLUGIN_NAMESPACE = HSApp.Util.Core.define("hsw.plugin.customizedmodeling");

const DEFAULT_Z_INDEX = 101;
const ELEVATED_Z_INDEX = 200;
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class CustomizedModelingTextPanel extends React.Component<TextPanelProps, TextPanelState> {
  static textFontMap: Record<number, string> = {
    0: "ph",
    1: "yah"
  };

  static textFontConvertMap: Record<string, number> = {
    ph: 0,
    yah: 1
  };

  static textWeightMap: Record<string, Record<number, string>> = {
    ph: {
      0: "r",
      1: "l",
      2: "m",
      3: "b",
      4: "h"
    }
  };

  static textWeightConvertMap: Record<string, Record<string, number>> = {
    ph: {
      r: 0,
      l: 1,
      m: 2,
      b: 3,
      h: 4
    }
  };

  private fontData: FontData;
  private phFontWeightOptions: FontOption[];
  private yaheiFontWeightOptions: FontOption[];

  constructor(props: TextPanelProps) {
    super(props);

    this.state = {
      text: props.text,
      textHeight: props.textHeight,
      fontKey: props.fontKey,
      fontWeightKey: props.fontWeightKey,
      isDefaultSettings: props.isDefaultSettings
    };

    $(".customized-modeling-panel-wrap").css("z-index", DEFAULT_Z_INDEX);

    this.fontData = {
      options: [
        {
          id: 0,
          label: ResourceManager.getString("plugin_customizedmodel_text_puhui")
        },
        {
          id: 1,
          label: ResourceManager.getString("plugin_customizedmodel_text_heiti")
        }
      ],
      defaultKey: this.state.fontKey,
      onchange: (key: number) => {
        this.onTextFontClick(key);
      },
      direction: "column",
      customClassName: "customized-modeling-text-font-dropdownlist"
    };

    this.phFontWeightOptions = [
      {
        id: 0,
        label: ResourceManager.getString("plugin_customizedmodel_text_changguiti")
      },
      {
        id: 1,
        label: ResourceManager.getString("plugin_customizedmodel_text_xiti")
      },
      {
        id: 2,
        label: ResourceManager.getString("plugin_customizedmodel_text_zhongheiti")
      },
      {
        id: 3,
        label: ResourceManager.getString("plugin_customizedmodel_text_cuti")
      },
      {
        id: 4,
        label: ResourceManager.getString("plugin_customizedmodel_text_teheiti")
      }
    ];

    this.yaheiFontWeightOptions = [
      {
        id: 0,
        label: ResourceManager.getString("plugin_customizedmodel_text_changguiti")
      }
    ];

    const weightOptions = this.state.fontKey === 1 
      ? this.yaheiFontWeightOptions 
      : this.phFontWeightOptions;

    this.state.fontWeightData = {
      options: weightOptions,
      defaultKey: this.state.fontWeightKey,
      onchange: (key: number) => {
        this.onTextFontWeightClick(key);
        $(".customized-modeling-panel-wrap").css("z-index", DEFAULT_Z_INDEX);
      },
      onClickDropDown: () => {
        $(".customized-modeling-panel-wrap").css("z-index", ELEVATED_Z_INDEX);
      },
      onHideDropDown: () => {
        $(".customized-modeling-panel-wrap").css("z-index", DEFAULT_Z_INDEX);
      },
      direction: "column",
      customClassName: "customized-modeling-text-fontweight-dropdownlist"
    };
  }

  componentDidMount(): void {
    // Lifecycle hook
  }

  onTextChange = (event?: React.ChangeEvent<HTMLInputElement>, textValue?: string): void => {
    let text = textValue;
    if (event) {
      text = event.target.value;
    }

    this.setState({ text: text ?? "" });

    const fontLoadPromises: Promise<FontSVGData>[] = [];
    for (let i = 0; i < (text?.length ?? 0); ++i) {
      if (text?.charAt(i) === " ") {
        fontLoadPromises.push(Promise.resolve({ textString: " " }));
      } else {
        let asciiCode = HSCore.Util.String.toAscii(text!.charAt(i)).substr(3);
        asciiCode = asciiCode.replace(";", "");
        fontLoadPromises.push(
          ResourceManager.load(
            HSApp.Config.CHROME_DOWNLOAD_LOCATION + "/font-svg/fonts/" + asciiCode + ".json",
            HSApp.Io.Load.LoadTypeEnum.FontSVGJson
          )
        );
      }
    }

    Promise.all(fontLoadPromises).then((fontDataArray: FontSVGData[]) => {
      for (let i = 0; i < fontDataArray.length; ++i) {
        fontDataArray[i].textString = text![i];
      }
      HSW_PLUGIN_NAMESPACE.UI.postUIMessage("command.text", "updateText", {
        text: fontDataArray,
        textFont: this.getCurrentFont()
      }, true);
    });
  };

  onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    switch (event.keyCode) {
      case ENTER_KEY:
        HSW_PLUGIN_NAMESPACE.UI.postUIMessage("command.text", "updateTextEnd", {});
        break;
      case ESCAPE_KEY:
        HSW_PLUGIN_NAMESPACE.UI.postUIMessage("command.onKeyPassed", "escape", {});
        break;
    }
  };

  onFocus = (): void => {
    // Focus handler
  };

  onTextFontClick(fontKey: number): void {
    if (fontKey === this.state.fontKey) {
      return;
    }

    const createFontWeightData = (options: FontOption[]): FontWeightData => ({
      options,
      defaultKey: 0,
      onchange: (key: number) => {
        this.onTextFontWeightClick(key);
        $(".customized-modeling-panel-wrap").css("z-index", DEFAULT_Z_INDEX);
      },
      onClickDropDown: () => {
        $(".customized-modeling-panel-wrap").css("z-index", ELEVATED_Z_INDEX);
      },
      onHideDropDown: () => {
        $(".customized-modeling-panel-wrap").css("z-index", DEFAULT_Z_INDEX);
      },
      direction: "column",
      customClassName: "customized-modeling-text-fontweight-dropdownlist"
    });

    if (fontKey === 0) {
      this.setState({
        fontWeightKey: 0,
        fontKey: fontKey,
        fontWeightData: createFontWeightData(this.phFontWeightOptions)
      });
    } else if (fontKey === 1) {
      this.setState({
        fontWeightKey: 0,
        fontKey: fontKey,
        fontWeightData: createFontWeightData(this.yaheiFontWeightOptions)
      });
    }

    this.postTextChangeMessage();
  }

  onTextFontWeightClick(weightKey: number): void {
    if (weightKey === this.state.fontWeightKey) {
      return;
    }

    this.setState({ fontWeightKey: weightKey });
    this.postTextChangeMessage();
  }

  postTextChangeMessage(): void {
    this.onTextChange(undefined, this.state.text);
  }

  setAsDefault(): void {
    HSW_PLUGIN_NAMESPACE.UI.postUIMessage("command.text", "restoreAsDefaultSettings", {});
    this.setState({ isDefaultSettings: true });
  }

  getCurrentFont(): string {
    const fontName = CustomizedModelingTextPanel.textFontMap[this.state.fontKey];
    const weightMap = CustomizedModelingTextPanel.textWeightMap[fontName];
    
    if (weightMap) {
      return fontName + "-" + weightMap[this.state.fontWeightKey];
    }
    
    return fontName;
  }

  render(): React.ReactElement {
    const textHeightInputData: TextInputData = {
      className: "customized-modeling-panel-text-height",
      label: ResourceManager.getString("plugin_wallstyle_height"),
      value: this.state.textHeight,
      delay: false,
      options: {
        unitType: "mm",
        displayDigits: 0,
        includeUnit: true,
        readOnly: false,
        startFromMin: true,
        tips: "",
        rules: {
          range: {
            min: 0.01,
            minInput: HSConstants.Constants.DEFAULT_MOLDING_PARAM.MIN_HEIGHT,
            max: 0.4,
            maxInput: HSConstants.Constants.DEFAULT_MOLDING_PARAM.MAX_HEIGHT
          },
          positiveOnly: true
        }
      },
      onValueChangeStart: () => {},
      onValueChange: (event: { detail: { value: number } }) => {
        HSW_PLUGIN_NAMESPACE.UI.postUIMessage("command.text", "setTextThickness", {
          thickness: 100 * event.detail.value,
          doCommit: false
        });
      },
      onValueChangeEnd: (event: { detail: { value: number } }) => {
        HSW_PLUGIN_NAMESPACE.UI.postUIMessage("command.text", "setTextThickness", {
          thickness: 100 * event.detail.value,
          doCommit: true
        });
        this.setState({ isDefaultSettings: false });
      }
    };

    const setDefaultButtonData: ButtonData = {
      className: "customized-modeling-panel-text-set-default",
      text: ResourceManager.getString("plugin_customizedmodel_text_set_default"),
      disabled: false,
      onclick: () => {
        this.setAsDefault();
      }
    };

    return React.createElement(
      "div",
      { className: "customized-modeling-panel-wrap" },
      React.createElement(
        "div",
        { className: "customized-modeling-panel-title" },
        ResourceManager.getString("plugin_customizedmodel_text_title")
      ),
      React.createElement(HSW.UI.Button, { data: setDefaultButtonData }),
      React.createElement("input", {
        className: "customized-modeling-panel-text-input",
        onFocus: this.onFocus,
        value: this.state.text,
        onChange: this.onTextChange,
        onKeyDown: this.onKeyDown
      }),
      React.createElement(HSW.UI.DropDownList, {
        id: "customized-modeling-panel-text-font",
        data: this.fontData
      }),
      React.createElement(HSW.UI.DropDownList, {
        id: "customized-modeling-panel-text-fontweight",
        data: this.state.fontWeightData
      }),
      React.createElement(
        "div",
        null,
        React.createElement(HSW.UI.TextInput, { data: textHeightInputData })
      )
    );
  }
}

export default class CustomizedModelingTextPanelManager {
  private static instance?: CustomizedModelingTextPanel;

  static create(
    text?: string,
    textHeight: number = 0.1,
    fontString: string = "ph-r",
    isDefaultSettings: boolean = true
  ): void {
    const defaultText = text ?? ResourceManager.getString("plugin_customizedmodel_text_input");
    const uiContainer = document.getElementById("ui-container");

    if (!uiContainer || document.getElementById("customized-modeling-text-preview-panel")) {
      return;
    }

    const panelContainer = document.createElement("div");
    panelContainer.setAttribute("id", "customized-modeling-text-preview-panel");
    panelContainer.className = "customized-modeling-text-preview-panel";
    uiContainer.appendChild(panelContainer);

    let fontKey = 0;
    let fontWeightKey = 0;

    if (fontString) {
      const fontParts = fontString.split("-");
      if (fontParts.length > 0) {
        fontKey = CustomizedModelingTextPanel.textFontConvertMap[fontParts[0]];
        if (fontParts.length > 1) {
          fontWeightKey = CustomizedModelingTextPanel.textWeightConvertMap[fontParts[0]][fontParts[1]];
        }
      }
    }

    CustomizedModelingTextPanelManager.instance = ReactDOM.render(
      React.createElement(CustomizedModelingTextPanel, {
        text: defaultText,
        textHeight,
        fontKey,
        fontWeightKey,
        isDefaultSettings
      }),
      panelContainer
    ) as CustomizedModelingTextPanel;
  }

  static updateState(state: Partial<TextPanelState>): void {
    if (CustomizedModelingTextPanelManager.instance) {
      CustomizedModelingTextPanelManager.instance.setState(state as TextPanelState);
    }
  }

  static postTextChangeMessage(): void {
    if (CustomizedModelingTextPanelManager.instance) {
      CustomizedModelingTextPanelManager.instance.postTextChangeMessage();
    }
  }

  static focusTextInput(selectAll: boolean): void {
    if (CustomizedModelingTextPanelManager.instance) {
      $(".customized-modeling-panel-text-input").focus();
      if (selectAll) {
        $(".customized-modeling-panel-text-input").select();
      }
    }
  }

  static destroy(): void {
    const panelElement = document.getElementById("customized-modeling-text-preview-panel");
    if (panelElement) {
      HSW_PLUGIN_NAMESPACE.UI.postUIMessage("command.text", "updateTextEnd", {});
      ReactDOM.unmountComponentAtNode(panelElement);
      panelElement.parentNode?.removeChild(panelElement);
      CustomizedModelingTextPanelManager.instance = undefined;
    }
  }
}