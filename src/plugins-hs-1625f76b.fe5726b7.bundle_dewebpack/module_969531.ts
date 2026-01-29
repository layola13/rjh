import React from 'react';

interface ProductThumbnailProps {
  imgSrc: string;
  onClose: () => void;
}

interface ProductThumbnailState {
  visible: boolean;
}

const DEFAULT_ZOOM = 100;
const MIN_ZOOM = 10;
const ZOOM_SENSITIVITY = 12;

export default class ProductThumbnail extends React.Component<ProductThumbnailProps, ProductThumbnailState> {
  private handlerCancel: () => void;
  private moving: boolean;
  private beginX: number;
  private beginY: number;
  private lastX: number | null;
  private lastY: number | null;
  private x: number;
  private y: number;
  private dragPopupWindow: HTMLElement | null;

  constructor(props: ProductThumbnailProps) {
    super(props);
    
    this.handlerCancel = this.handleCancel.bind(this);
    this.moving = false;
    this.x = 0;
    this.y = 0;
    this.beginX = 0;
    this.beginY = 0;
    this.lastX = null;
    this.lastY = null;
    this.dragPopupWindow = null;
    
    this.state = {
      visible: true
    };

    document.onmouseup = (event: MouseEvent) => this.onMouseUp(event);
    document.onmousemove = (event: MouseEvent) => this.onMouseMove(event);
  }

  componentDidMount(): void {
    this.dragPopupWindow = document.getElementById('dragPopupWindow');
  }

  handleCancel(): void {
    this.props.onClose();
  }

  onMouseWheel(event: React.WheelEvent<HTMLImageElement>): boolean {
    const nativeEvent = event.nativeEvent;
    const thumbnailElement = document.getElementById('productthumbnail') as HTMLElement;
    
    if (!thumbnailElement) {
      return false;
    }

    let currentZoom = parseInt(thumbnailElement.style.zoom, 10);
    
    if (isNaN(currentZoom)) {
      currentZoom = DEFAULT_ZOOM;
    }

    const newZoom = currentZoom - nativeEvent.deltaY / ZOOM_SENSITIVITY;
    
    if (newZoom > MIN_ZOOM) {
      thumbnailElement.style.zoom = `${newZoom}%`;
    }

    return false;
  }

  onMouseDown(event: React.MouseEvent<HTMLDivElement>): void {
    this.moving = true;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
    this.beginX = this.x;
    this.beginY = this.y;
  }

  onMouseUp(event: MouseEvent): void {
    this.moving = false;
    this.lastX = null;
    this.lastY = null;
  }

  onMouseMove(event: MouseEvent): void {
    event.stopPropagation();
    
    if (this.moving) {
      this.onMove(event);
    }
  }

  onMove(event: MouseEvent): void {
    if (this.lastX === null || this.lastY === null || !this.dragPopupWindow) {
      return;
    }

    const deltaX = event.clientX - this.lastX;
    const deltaY = event.clientY - this.lastY;
    
    this.x = this.beginX + deltaX;
    this.y = this.beginY + deltaY;
    
    this.dragPopupWindow.style.left = `${this.x}px`;
    this.dragPopupWindow.style.top = `${this.y}px`;
  }

  render(): React.ReactElement {
    return (
      <div className="product-thumbnail" ref="dragPopupWindow" id="dragPopupWindow">
        <div 
          className="product-thumbnail-head" 
          onMouseDown={this.onMouseDown.bind(this)}
        >
          <h2 className="product-thumbnail-title">产品图例</h2>
          <span className="product-thumbnail-close" onClick={this.handlerCancel}>
            <img src={require('./close-icon')} />
          </span>
        </div>
        <div className="product-thumbnail-content">
          <img
            className="product-thumbnail-img"
            id="productthumbnail"
            onWheel={this.onMouseWheel.bind(this)}
            src={this.props.imgSrc}
          />
        </div>
        <div className="product-thumbnail-bottom">
          <div className="product-thumbnail-buttom" onClick={this.handlerCancel}>
            我知道了
          </div>
        </div>
      </div>
    );
  }
}