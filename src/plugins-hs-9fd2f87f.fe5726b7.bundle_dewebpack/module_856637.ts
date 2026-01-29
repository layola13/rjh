interface PointerToolTipData {
  content: string;
  mouseX: number;
  mouseY: number;
}

interface PointerToolTipProps {
  data: PointerToolTipData;
}

interface PointerToolTipState {
  content: string;
  mouseX: number;
  mouseY: number;
}

class PointerToolTipComponent extends React.Component<PointerToolTipProps, PointerToolTipState> {
  private createTimer?: number;
  private destroyTimer?: number;
  private animationTimer?: number;
  private readonly offsetX: number = 17;
  private readonly offsetY: number = 15;

  constructor(props: PointerToolTipProps) {
    super(props);
    this.state = {
      content: props.data.content,
      mouseX: props.data.mouseX,
      mouseY: props.data.mouseY
    };
  }

  componentDidMount(): void {
    this._changeTipPosition();
  }

  UNSAFE_componentWillReceiveProps(nextProps: PointerToolTipProps): void {
    if (this.createTimer) {
      clearTimeout(this.createTimer);
    }
    if (this.destroyTimer) {
      clearTimeout(this.destroyTimer);
    }

    this.createTimer = window.setTimeout(() => {
      this.setState({
        mouseX: nextProps.data.mouseX,
        mouseY: nextProps.data.mouseY,
        content: nextProps.data.content
      });
      this._changeTipPosition();
      this._showTipAnimation();
    }, 30);

    this.destroyTimer = window.setTimeout(() => {
      PointerToolTip.destroy();
    }, 5000);
  }

  private _changeTipPosition = (): void => {
    const element = document.getElementsByClassName("pointer-tool-tip-label")[0] as HTMLElement;
    if (!element) {
      return;
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const elementHeight = element.offsetHeight;
    const elementWidth = element.offsetWidth;

    if (this.state.mouseX + this.offsetX + elementHeight > windowWidth) {
      element.style.left = `${this.state.mouseX - this.offsetX - 2 * elementHeight}px`;
    } else {
      element.style.left = `${this.state.mouseX + this.offsetX}px`;
    }

    if (this.state.mouseY + this.offsetY + elementWidth > windowHeight) {
      element.style.top = `${this.state.mouseY - this.offsetY - elementWidth}px`;
    } else {
      element.style.top = `${this.state.mouseY - this.offsetY}px`;
    }
  };

  private _showTipAnimation = (): void => {
    if (this.animationTimer) {
      clearTimeout(this.animationTimer);
    }

    const elements = document.getElementsByClassName("pointer-tool-tip-label");
    if (elements?.[0]) {
      elements[0].setAttribute("class", "pointer-tool-tip-label show-tip pointer-tool-tip-animation");
    }

    this.animationTimer = window.setTimeout(() => {
      const elements = document.getElementsByClassName("pointer-tool-tip-label");
      if (elements?.[0]) {
        elements[0].setAttribute("class", "pointer-tool-tip-label show-tip");
      }
    }, 300);
  };

  render(): React.ReactElement {
    return React.createElement("div", {
      className: "pointer-tool-tip-label"
    }, this.state.content);
  }
}

class PointerToolTip {
  /**
   * Create and display a pointer tooltip
   */
  static create(data: PointerToolTipData): void {
    let wrapElement = document.getElementById("pointer-tool-tip-wrap");
    
    if (!wrapElement) {
      const bodyElement = document.getElementsByTagName("body")[0];
      wrapElement = document.createElement("div");
      wrapElement.setAttribute("id", "pointer-tool-tip-wrap");
      bodyElement.appendChild(wrapElement);
    }

    ReactDOM.render(React.createElement(PointerToolTipComponent, {
      data: data
    }), wrapElement);
  }

  /**
   * Destroy and remove the pointer tooltip
   */
  static destroy(): void {
    const wrapElement = document.getElementById("pointer-tool-tip-wrap");
    if (wrapElement) {
      ReactDOM.unmountComponentAtNode(wrapElement);
      wrapElement.parentNode?.removeChild(wrapElement);
    }
  }
}

export default PointerToolTip;