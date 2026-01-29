import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigatorComponent from './NavigatorComponent';
import CameraControlPanel from './CameraControlPanel';
import { getApp } from './appUtils';
import { getClipBound, snapshotWidth, snapshotHeight } from './clipUtils';

interface CameraUIProps {
  isShown: boolean;
  isAnimation?: boolean;
  isReadonly?: boolean;
  createCameraHandler: (animationFn: (dataUrl: string) => Promise<void>) => void;
  closeDialog: () => void;
}

interface AnimationOptions {
  top: number;
  left: number;
  width: number;
  height: number;
  position: string;
}

export const overlayId = 'cameraOverlay';
export const ngNavigatorId = 'np_navigator';

class CameraUI extends Component<CameraUIProps> {
  static propTypes = {
    isShown: PropTypes.bool.isRequired,
    createCameraHandler: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired
  };

  private uixml: any;
  private containerT?: number;

  constructor(props: CameraUIProps) {
    super(props);
    this.onLoseFocus = this.onLoseFocus.bind(this);
    this.uixml = undefined;
    this._init();
  }

  private _init(): void {
    $('body').append('<div class="cameraUI vertical"><div class="midMask"></div></div>');
  }

  private _$(selector?: string): JQuery {
    return selector ? $('.cameraUI').find(selector) : $('.cameraUI');
  }

  componentDidMount(): void {
    $.capture($('body'), 'mousedown', this.onLoseFocus);
  }

  componentWillUnmount(): void {
    $.unbindcapture($('body'), 'mousedown', this.onLoseFocus);
  }

  private testIfInBounds(event: JQuery.MouseDownEvent): boolean {
    let isInBounds = false;

    ['#np_navigator', '.camera-position'].forEach((selector: string) => {
      const element = $(selector);
      if (element.is(event.target) || element.has(event.target).length !== 0) {
        isInBounds = true;
      }
    });

    if (event.which === 3) {
      isInBounds = false;
    }

    if (!isInBounds) {
      HSApp.App.getApp().pluginManager
        .getPlugin('hsw.plugin.orbitview.Plugin')
        .signalCameraPositionPopup.dispatch({ isActive: false });
      this.props.closeDialog();
    }

    return isInBounds;
  }

  private onLoseFocus(event: JQuery.MouseDownEvent): void {
    if (this.props.isShown) {
      if (!this.testIfInBounds(event)) {
        event.preventDefault();
      }
    }
  }

  private _runAnimation(imageDataUrl: string): Promise<void> {
    if (!this.props.isShown) {
      return Promise.resolve();
    }

    const clientRect = getApp().getActive3DView().context.clientRect;
    let offsetWidth = 0;
    let offsetHeight = 0;

    if ($('#render_tab .main')) {
      offsetWidth = 238;
      offsetHeight = 74;
    }

    const viewportWidth = clientRect.width - offsetWidth;
    const viewportHeight = clientRect.height - offsetHeight;
    const clipBounds = getClipBound(viewportWidth, viewportHeight, true);

    return new Promise<void>((resolve, reject) => {
      this._$('.mask').remove();
      this._$('.midMask').before("<div class='mask'></div>");
      this._$('.canvasScreenShot').remove();
      this._$('.midMask').before("<div class='canvasScreenShot'><img/></div>");

      const initialStyles: AnimationOptions = {
        top: clipBounds[1],
        left: clipBounds[0],
        width: clipBounds[2],
        height: clipBounds[3],
        position: 'absolute'
      };

      this._$('.canvasScreenShot').css(initialStyles);
      this._$('.mask').css(initialStyles);
      this._$('.canvasScreenShot img').css({
        width: '100%',
        height: '100%',
        position: 'absolute'
      }).attr('src', imageDataUrl);

      const animationDuration = 400;
      let targetLeft = clipBounds[0];
      let targetTop = clipBounds[1];
      let targetWidth = clipBounds[2];
      let targetHeight = clipBounds[3];
      const self = this;

      self.containerT = $('#header .navbar').height() + 1;

      this._$('.canvasScreenShot').animate({
        left: targetLeft,
        top: targetTop,
        width: targetWidth,
        height: targetHeight
      }, animationDuration, function() {
        targetWidth = snapshotWidth;
        targetHeight = snapshotHeight;
        targetLeft = 0;

        const verLine = $('.ver_line');
        if (verLine && verLine.offset()) {
          targetTop = verLine.offset()!.top - snapshotHeight;
        }

        self._$('.canvasScreenShot').animate({
          left: targetLeft,
          top: targetTop,
          width: targetWidth,
          height: targetHeight
        }, animationDuration, function() {
          targetHeight = 10;
          targetWidth = targetHeight / snapshotHeight * snapshotWidth;
          targetLeft = (snapshotWidth - targetWidth) / 2;

          const verLine = $('.ver_line');
          if (verLine && verLine.offset()) {
            targetTop = verLine.offset()!.top - targetHeight / 2;
          }

          self._$('.canvasScreenShot').animate({
            left: targetLeft,
            top: targetTop,
            width: targetWidth,
            height: targetHeight
          }, animationDuration, function() {
            self._$('.canvasScreenShot').remove();
            self._$('.mask').animate({
              opacity: 0
            }, animationDuration, function() {
              self._$('.mask').remove();
              setTimeout(() => {
                resolve();
              }, 200);
            });
          });
        });
      });
    });
  }

  render(): React.ReactNode {
    const { isShown, isAnimation, createCameraHandler, isReadonly = false } = this.props;

    if (!isShown) {
      return null;
    }

    return (
      <div id={overlayId} className="visible">
        <div id={ngNavigatorId} className="row item">
          <NavigatorComponent isReadonly={isReadonly} />
          <div className="ver_line" />
          <CameraControlPanel
            isReadonly={isReadonly}
            onCreate={() => createCameraHandler(this._runAnimation.bind(this))}
            isAnimation={isAnimation}
          />
        </div>
      </div>
    );
  }
}

export default CameraUI;