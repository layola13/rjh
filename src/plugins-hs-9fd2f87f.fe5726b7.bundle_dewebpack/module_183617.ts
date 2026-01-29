interface LightBandSettingsData {
  temperature: number;
  intensity: number;
  onChange: (value: Record<string, number>) => void;
  onClose: () => void;
  onReset: () => void;
  onComplete: () => void;
}

interface LightBandSettingsProps {
  data: LightBandSettingsData;
}

interface LightBandSettingsState {
  temperature: number;
  intensity: number;
}

interface SliderProps {
  onChange: (value: number) => void;
  destext: string;
  value: number;
  max: number;
  min: number;
  step: number;
  id: string;
  validate: (value: number) => boolean;
}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const ReactDOM: {
  render(element: React.ReactElement, container: Element): LightBandSettingsComponent;
  unmountComponentAtNode(container: Element): void;
};

declare const $: any;

class LightBandSettingsComponent extends React.Component<LightBandSettingsProps, LightBandSettingsState> {
  constructor(props: LightBandSettingsProps) {
    super(props);
    this.state = {
      temperature: props.data.temperature,
      intensity: props.data.intensity
    };
  }

  componentDidMount(): void {
    const panel = $("#customizedmodel-lightbandsettings-panel");
    const parent = panel.parent().parent();
    const leftOffset = (parent.width() - panel.width()) / 2;
    const topOffset = (parent.height() - panel.height()) / 2;
    panel.css("left", leftOffset);
    panel.css("top", topOffset);
  }

  handleChange(callback: (value: Record<string, number>) => void, propertyName: string): (value: number) => void {
    return (value: number) => {
      const update = { [propertyName]: value };
      callback(update);
      LightBandSettings.instance?.setState(update);
    };
  }

  render(): React.ReactElement {
    const titleText = ResourceManager.getString("plugin_customizedModeling_lightband_settings_title");
    const reminderText = ResourceManager.getString("plugin_customizedModeling_lightband_settings_reminder");
    const reminderText1 = ResourceManager.getString("plugin_customizedModeling_lightband_settings_reminder_text1");
    const reminderText2 = ResourceManager.getString("plugin_customizedModeling_lightband_settings_reminder_text2");
    const reminderText3 = ResourceManager.getString("plugin_customizedModeling_lightband_settings_reminder_text3");
    const intensityLabel = ResourceManager.getString("plugin_manuallighting_attr_intensity_per_m");
    const resetButtonText = ResourceManager.getString("plugin_customizedModeling_lightband_settings_reset");
    const completeButtonText = ResourceManager.getString("plugin_customizedModeling_lightband_settings_complete");

    return React.createElement("div", {
      className: "panel-wrap",
      id: "customizedmodel-lightbandsettings-panel"
    }, 
      React.createElement("div", {
        className: "panel-title"
      }, 
        titleText, 
        React.createElement("span", {
          className: "closeBtn",
          onClick: this.props.data.onClose
        }, 
          React.createElement("a", {
            href: "javascript:void(0);",
            id: "closemsgboxbtn"
          }, "X")
        )
      ), 
      React.createElement("div", {
        className: "panel-body"
      }, 
        React.createElement("p", {
          className: "reminder-text-top"
        }, reminderText), 
        React.createElement("p", {
          className: "reminder-text"
        }, reminderText1), 
        React.createElement("p", {
          className: "reminder-text"
        }, reminderText2), 
        React.createElement("p", {
          className: "reminder-text"
        }, reminderText3), 
        React.createElement("div", {
          className: "settings-controls"
        }, 
          React.createElement<SliderProps>(Slider as any, {
            onChange: this.handleChange(this.props.data.onChange, "intensity"),
            destext: intensityLabel,
            value: this.state.intensity,
            max: 7000,
            min: 0,
            step: 100,
            id: "lightIntensify",
            validate: (value: number) => value >= 0 && value <= 7000
          })
        )
      ), 
      React.createElement("div", {
        className: "panel-bottom"
      }, 
        React.createElement("button", {
          type: "button",
          className: "resetbutton",
          onClick: this.props.data.onReset
        }, resetButtonText), 
        React.createElement("button", {
          type: "button",
          className: "confirmbutton",
          onClick: this.props.data.onComplete
        }, completeButtonText)
      )
    );
  }
}

const Slider: React.ComponentType<SliderProps> = {} as any;

class LightBandSettings {
  static instance?: LightBandSettingsComponent;

  static create(
    temperature: number,
    intensity: number,
    onChange: (value: Record<string, number>) => void,
    onClose: () => void,
    onReset: () => void,
    onComplete: () => void
  ): void {
    const uiContainer = document.getElementById("ui-container");
    if (uiContainer && !document.getElementById("light-band-settings-panel")) {
      const panelContainer = document.createElement("div");
      panelContainer.setAttribute("id", "light-band-settings-panel");
      panelContainer.className = "light-band-settings-panel";
      uiContainer.appendChild(panelContainer);

      const data: LightBandSettingsData = {
        temperature,
        intensity,
        onChange,
        onClose,
        onReset,
        onComplete
      };

      LightBandSettings.instance = ReactDOM.render(
        React.createElement(LightBandSettingsComponent, { data }),
        panelContainer
      );
    }
  }

  static destroy(): void {
    const panelContainer = document.getElementById("light-band-settings-panel");
    if (panelContainer) {
      ReactDOM.unmountComponentAtNode(panelContainer);
      panelContainer.parentNode?.removeChild(panelContainer);
      LightBandSettings.instance = undefined;
    }
  }

  static reset(temperature: number, intensity: number): void {
    LightBandSettings.instance?.setState({ temperature });
    LightBandSettings.instance?.setState({ intensity });
  }
}

export default LightBandSettings;