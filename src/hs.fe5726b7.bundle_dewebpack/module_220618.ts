interface ToggleConfig {
  value: boolean;
  label?: string;
  onLabel?: string;
  offLabel?: string;
  onValueChange?: (value: boolean) => void;
}

interface ToggleInstance {
  update(config: ToggleConfig): void;
}

export default class ToggleComponent {
  private newDiv: HTMLDivElement;
  private instance: ToggleInstance;

  constructor(config: ToggleConfig, container: HTMLElement) {
    this.newDiv = document.createElement("div");
    container.appendChild(this.newDiv);
    
    this.instance = ReactDOM.render(
      React.createElement(ToggleElement, {
        value: config.value,
        label: config.label,
        onLabel: config.onLabel,
        offLabel: config.offLabel,
        onValueChange: config.onValueChange
      }),
      this.newDiv
    ) as ToggleInstance;
  }

  update(config: ToggleConfig): void {
    this.instance.update(config);
  }

  destroy(): void {
    ReactDOM.unmountComponentAtNode(this.newDiv);
  }

  /**
   * @deprecated Use destroy instead
   */
  destory(): void {
    console.warn("deprecated, use destroy instead!");
    this.destroy();
  }

  static create(config: ToggleConfig, container: HTMLElement): ToggleComponent {
    return new ToggleComponent(config, container);
  }
}