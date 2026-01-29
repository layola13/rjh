interface AuthPopupProps {
  [key: string]: unknown;
}

export class AuthPopup {
  private renderContainer: HTMLElement | null | undefined;
  private readonly props: AuthPopupProps;

  constructor(props: AuthPopupProps) {
    this.props = props;
  }

  /**
   * Show the authentication popup by rendering it into the DOM
   */
  public show(): void {
    this.renderContainer = document.querySelector<HTMLElement>("#auth-popup-container");
    
    if (!this.renderContainer) {
      this.renderContainer = this.createContainer();
    }
    
    if (this.renderContainer) {
      ReactDOM.render(
        React.createElement(AuthPopupComponent, this.props),
        this.renderContainer
      );
    }
  }

  /**
   * Hide the authentication popup by unmounting it from the DOM
   */
  public hide(): void {
    if (this.renderContainer) {
      ReactDOM.unmountComponentAtNode(this.renderContainer);
      this.renderContainer = undefined;
    }
  }

  /**
   * Create and append the container element for the auth popup
   * @returns The created container element or undefined if parent not found
   */
  private createContainer(): HTMLElement | undefined {
    const uiContainer = document.querySelector<HTMLElement>("#ui-container");
    
    if (uiContainer) {
      const container = document.createElement("div");
      container.id = "auth-popup-container";
      uiContainer.appendChild(container);
      return container;
    }
    
    return undefined;
  }
}