import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'cropperjs';

interface CropData {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotate?: number;
  scaleX?: number;
  scaleY?: number;
}

interface CropBoxData {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

interface CanvasData {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

type DragMode = 'crop' | 'move' | 'none';
type ViewMode = 0 | 1 | 2 | 3;

interface ReactCropperProps {
  style?: React.CSSProperties;
  className?: string;
  crossOrigin?: string;
  src?: string | null;
  alt?: string;
  aspectRatio?: number;
  dragMode?: DragMode;
  data?: CropData | null;
  scaleX?: number;
  scaleY?: number;
  enable?: boolean;
  cropBoxData?: CropBoxData;
  canvasData?: CanvasData;
  zoomTo?: number;
  moveTo?: number[];
  rotateTo?: number;
  viewMode?: ViewMode;
  preview?: string;
  responsive?: boolean;
  restore?: boolean;
  checkCrossOrigin?: boolean;
  checkOrientation?: boolean;
  modal?: boolean;
  guides?: boolean;
  center?: boolean;
  highlight?: boolean;
  background?: boolean;
  autoCrop?: boolean;
  autoCropArea?: number;
  movable?: boolean;
  rotatable?: boolean;
  scalable?: boolean;
  zoomable?: boolean;
  zoomOnTouch?: boolean;
  zoomOnWheel?: boolean;
  wheelZoomRation?: number;
  cropBoxMovable?: boolean;
  cropBoxResizable?: boolean;
  toggleDragModeOnDblclick?: boolean;
  minContainerWidth?: number;
  minContainerHeight?: number;
  minCanvasWidth?: number;
  minCanvasHeight?: number;
  minCropBoxWidth?: number;
  minCropBoxHeight?: number;
  ready?: () => void;
  cropstart?: () => void;
  cropmove?: () => void;
  cropend?: () => void;
  crop?: () => void;
  zoom?: () => void;
}

const CROPPER_PROPS = [
  'dragMode',
  'aspectRatio',
  'data',
  'crop',
  'viewMode',
  'preview',
  'responsive',
  'restore',
  'checkCrossOrigin',
  'checkOrientation',
  'modal',
  'guides',
  'center',
  'highlight',
  'background',
  'autoCrop',
  'autoCropArea',
  'movable',
  'rotatable',
  'scalable',
  'zoomable',
  'zoomOnTouch',
  'zoomOnWheel',
  'wheelZoomRation',
  'cropBoxMovable',
  'cropBoxResizable',
  'toggleDragModeOnDblclick',
  'minContainerWidth',
  'minContainerHeight',
  'minCanvasWidth',
  'minCanvasHeight',
  'minCropBoxWidth',
  'minCropBoxHeight',
  'ready',
  'cropstart',
  'cropmove',
  'cropend',
  'zoom'
];

const IMMUTABLE_PROPS = CROPPER_PROPS.slice(4);

class ReactCropper extends Component<ReactCropperProps> {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    crossOrigin: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    aspectRatio: PropTypes.number,
    dragMode: PropTypes.oneOf(['crop', 'move', 'none']),
    data: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
      rotate: PropTypes.number,
      scaleX: PropTypes.number,
      scaleY: PropTypes.number
    }),
    scaleX: PropTypes.number,
    scaleY: PropTypes.number,
    enable: PropTypes.bool,
    cropBoxData: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    canvasData: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    zoomTo: PropTypes.number,
    moveTo: PropTypes.arrayOf(PropTypes.number),
    rotateTo: PropTypes.number,
    viewMode: PropTypes.oneOf([0, 1, 2, 3]),
    preview: PropTypes.string,
    responsive: PropTypes.bool,
    restore: PropTypes.bool,
    checkCrossOrigin: PropTypes.bool,
    checkOrientation: PropTypes.bool,
    modal: PropTypes.bool,
    guides: PropTypes.bool,
    center: PropTypes.bool,
    highlight: PropTypes.bool,
    background: PropTypes.bool,
    autoCrop: PropTypes.bool,
    autoCropArea: PropTypes.number,
    movable: PropTypes.bool,
    rotatable: PropTypes.bool,
    scalable: PropTypes.bool,
    zoomable: PropTypes.bool,
    zoomOnTouch: PropTypes.bool,
    zoomOnWheel: PropTypes.bool,
    wheelZoomRation: PropTypes.number,
    cropBoxMovable: PropTypes.bool,
    cropBoxResizable: PropTypes.bool,
    toggleDragModeOnDblclick: PropTypes.bool,
    minContainerWidth: PropTypes.number,
    minContainerHeight: PropTypes.number,
    minCanvasWidth: PropTypes.number,
    minCanvasHeight: PropTypes.number,
    minCropBoxWidth: PropTypes.number,
    minCropBoxHeight: PropTypes.number,
    ready: PropTypes.func,
    cropstart: PropTypes.func,
    cropmove: PropTypes.func,
    cropend: PropTypes.func,
    crop: PropTypes.func,
    zoom: PropTypes.func
  };

  static defaultProps: Partial<ReactCropperProps> = {
    src: null,
    dragMode: 'crop',
    data: null,
    scaleX: 1,
    scaleY: 1,
    enable: true,
    zoomTo: 1,
    rotateTo: 0
  };

  private img?: HTMLImageElement;
  private cropper!: Cropper;

  componentDidMount(): void {
    const cropperOptions = Object.keys(this.props)
      .filter((propKey) => CROPPER_PROPS.indexOf(propKey) !== -1)
      .reduce((options, propKey) => {
        return {
          ...options,
          [propKey]: this.props[propKey as keyof ReactCropperProps]
        };
      }, {});

    this.cropper = new Cropper(this.img!, cropperOptions);
  }

  componentWillReceiveProps(nextProps: ReactCropperProps): void {
    if (nextProps.src !== this.props.src) {
      this.cropper.reset().clear().replace(nextProps.src!);
    }

    if (nextProps.aspectRatio !== this.props.aspectRatio) {
      this.setAspectRatio(nextProps.aspectRatio!);
    }

    if (nextProps.data !== this.props.data) {
      this.setData(nextProps.data!);
    }

    if (nextProps.dragMode !== this.props.dragMode) {
      this.setDragMode(nextProps.dragMode!);
    }

    if (nextProps.cropBoxData !== this.props.cropBoxData) {
      this.setCropBoxData(nextProps.cropBoxData!);
    }

    if (nextProps.canvasData !== this.props.canvasData) {
      this.setCanvasData(nextProps.canvasData!);
    }

    if (nextProps.moveTo !== this.props.moveTo) {
      if (nextProps.moveTo!.length > 1) {
        this.moveTo(nextProps.moveTo![0], nextProps.moveTo![1]);
      } else {
        this.moveTo(nextProps.moveTo![0]);
      }
    }

    if (nextProps.zoomTo !== this.props.zoomTo) {
      this.zoomTo(nextProps.zoomTo!);
    }

    if (nextProps.rotateTo !== this.props.rotateTo) {
      this.rotateTo(nextProps.rotateTo!);
    }

    if (nextProps.scaleX !== this.props.scaleX) {
      this.scaleX(nextProps.scaleX!);
    }

    if (nextProps.scaleY !== this.props.scaleY) {
      this.scaleY(nextProps.scaleY!);
    }

    if (nextProps.enable !== this.props.enable) {
      if (nextProps.enable) {
        this.enable();
      } else {
        this.disable();
      }
    }

    Object.keys(nextProps).forEach((propKey) => {
      let hasChanged = nextProps[propKey as keyof ReactCropperProps] !== this.props[propKey as keyof ReactCropperProps];
      const isImmutable = IMMUTABLE_PROPS.indexOf(propKey) !== -1;

      if (
        typeof nextProps[propKey as keyof ReactCropperProps] === 'function' &&
        typeof this.props[propKey as keyof ReactCropperProps] === 'function'
      ) {
        hasChanged = nextProps[propKey as keyof ReactCropperProps]!.toString() !== this.props[propKey as keyof ReactCropperProps]!.toString();
      }

      if (hasChanged && isImmutable) {
        throw new Error(`prop: ${propKey} can't be change after componentDidMount`);
      }
    });
  }

  componentWillUnmount(): void {
    if (this.img) {
      this.cropper.destroy();
      delete this.img;
      delete this.cropper;
    }
  }

  setDragMode(mode: DragMode): Cropper {
    return this.cropper.setDragMode(mode);
  }

  setAspectRatio(aspectRatio: number): Cropper {
    return this.cropper.setAspectRatio(aspectRatio);
  }

  getCroppedCanvas(options?: Cropper.GetCroppedCanvasOptions): HTMLCanvasElement {
    return this.cropper.getCroppedCanvas(options);
  }

  setCropBoxData(data: CropBoxData): Cropper {
    return this.cropper.setCropBoxData(data);
  }

  getCropBoxData(): Cropper.CropBoxData {
    return this.cropper.getCropBoxData();
  }

  setCanvasData(data: CanvasData): Cropper {
    return this.cropper.setCanvasData(data);
  }

  getCanvasData(): Cropper.CanvasData {
    return this.cropper.getCanvasData();
  }

  getImageData(): Cropper.ImageData {
    return this.cropper.getImageData();
  }

  getContainerData(): Cropper.ContainerData {
    return this.cropper.getContainerData();
  }

  setData(data: CropData): Cropper {
    return this.cropper.setData(data);
  }

  getData(rounded?: boolean): Cropper.Data {
    return this.cropper.getData(rounded);
  }

  crop(): Cropper {
    return this.cropper.crop();
  }

  move(offsetX: number, offsetY?: number): Cropper {
    return this.cropper.move(offsetX, offsetY);
  }

  moveTo(x: number, y?: number): Cropper {
    return this.cropper.moveTo(x, y);
  }

  zoom(ratio: number): Cropper {
    return this.cropper.zoom(ratio);
  }

  zoomTo(ratio: number): Cropper {
    return this.cropper.zoomTo(ratio);
  }

  rotate(degree: number): Cropper {
    return this.cropper.rotate(degree);
  }

  rotateTo(degree: number): Cropper {
    return this.cropper.rotateTo(degree);
  }

  enable(): Cropper {
    return this.cropper.enable();
  }

  disable(): Cropper {
    return this.cropper.disable();
  }

  reset(): Cropper {
    return this.cropper.reset();
  }

  clear(): Cropper {
    return this.cropper.clear();
  }

  replace(url: string, hasSameSize?: boolean): Cropper {
    return this.cropper.replace(url, hasSameSize);
  }

  scale(scaleX: number, scaleY?: number): Cropper {
    return this.cropper.scale(scaleX, scaleY);
  }

  scaleX(scaleX: number): Cropper {
    return this.cropper.scaleX(scaleX);
  }

  scaleY(scaleY: number): Cropper {
    return this.cropper.scaleY(scaleY);
  }

  render(): JSX.Element {
    const { src, alt, crossOrigin } = this.props;

    return (
      <div
        style={this.props.style}
        className={this.props.className}
      >
        <img
          crossOrigin={crossOrigin}
          ref={(imgElement) => {
            this.img = imgElement!;
          }}
          src={src!}
          alt={alt ?? 'picture'}
          style={{ opacity: 0 }}
        />
      </div>
    );
  }
}

export default ReactCropper;