import React, { Component, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import IconComponent from './IconComponent';
import LargeViewDialog from './LargeViewDialog';

interface CeilingImageButtonItem {
  label: string;
  icon: string;
  iconHover: string;
  largeViewImg: string;
}

interface CeilingImageButtonProps {
  item: CeilingImageButtonItem;
  onMouseDown?: () => void;
}

interface CeilingImageButtonState {
  hover: boolean;
}

interface LargeViewDialogInstance {
  hideLargeViewImmediately: () => void;
  hideLargeView: () => void;
}

export default class CeilingImageButton extends Component<CeilingImageButtonProps, CeilingImageButtonState> {
  private ceilingLargeViewDialog?: HTMLDivElement;
  private ceilingLargeView?: LargeViewDialogInstance;

  constructor(props: CeilingImageButtonProps) {
    super(props);
    this.state = {
      hover: false
    };
  }

  private onMouseEnter(): void {
    this.setState({
      hover: true
    });
  }

  private onMouseLeave(): void {
    if (this.state.hover) {
      this.setState({
        hover: false
      });
    }
  }

  private onMouseDown(): void {
    this.hideLargeViewImmediately();
    this.props.onMouseDown?.();
  }

  private showLargeView(event: MouseEvent<HTMLDivElement>): void {
    if (!this.ceilingLargeViewDialog) {
      this.ceilingLargeViewDialog = document.querySelector<HTMLDivElement>('#ui-container #ceiling-largeview-dialog') ?? undefined;
      
      if (!this.ceilingLargeViewDialog) {
        const container = document.querySelector<HTMLDivElement>('#ui-container');
        const dialogElement = document.createElement('div');
        dialogElement.id = 'ceiling-largeview-dialog';
        dialogElement.className = 'ceiling-largeview-dialog';
        this.ceilingLargeViewDialog = container?.appendChild(dialogElement);
      }
    }

    if (this.ceilingLargeViewDialog) {
      this.ceilingLargeView = ReactDOM.render(
        <LargeViewDialog
          data={{
            label: this.props.item.label,
            img: this.props.item.largeViewImg,
            iconTop: event.currentTarget.getBoundingClientRect().top,
            hide: false
          }}
        />,
        this.ceilingLargeViewDialog
      ) as unknown as LargeViewDialogInstance;
    }
  }

  private hideLargeViewImmediately(): void {
    this.ceilingLargeView?.hideLargeViewImmediately();
  }

  private hideLargeView(): void {
    this.ceilingLargeView?.hideLargeView();
  }

  render(): JSX.Element {
    const { item } = this.props;
    const { hover } = this.state;
    const currentIcon = hover ? item.iconHover : item.icon;
    const wrapperClassName = hover 
      ? 'ceiling-imagebutton-wrapper ceiling-imagebutton-hover' 
      : 'ceiling-imagebutton-wrapper';

    return (
      <div
        className={wrapperClassName}
        onMouseEnter={() => this.onMouseEnter()}
        onMouseDown={() => this.onMouseDown()}
        onMouseLeave={() => this.onMouseLeave()}
      >
        <div className="ceiling-imagebutton-content">
          <img
            className="ceiling-imagebutton-img"
            draggable="false"
            src={currentIcon}
          />
        </div>
        {hover && (
          <div
            className="ceiling-largeview-icon"
            onMouseEnter={(event) => this.showLargeView(event)}
            onMouseLeave={() => this.hideLargeView()}
          >
            <IconComponent />
          </div>
        )}
      </div>
    );
  }
}