interface OperationTipProps {
  text: string;
}

const OperationTipComponent: React.FC<OperationTipProps> = ({ text }) => {
  return <div className="operation-tip-text">{text}</div>;
};

export class OperationTip {
  static create(text: string): void {
    let container = document.getElementById("operation-tip-container");
    
    if (!container) {
      const uiContainer = document.getElementById("ui-container");
      container = document.createElement("div");
      container.setAttribute("id", "operation-tip-container");
      uiContainer?.appendChild(container);
    }
    
    ReactDOM.render(<OperationTipComponent text={text} />, container);
  }

  static destroy(): void {
    const container = document.getElementById("operation-tip-container");
    
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
      container.parentNode?.removeChild(container);
    }
  }
}