import React from 'react';
import ReactDOM from 'react-dom';
import spinnerAnimation from './spinnerAnimation';

const PLUGIN_CUSTOMIZEDMODELING_SNAPPING_PLANE_HELP_COOKIE = 'plugin_customizedmodeling_snapping_plane_help_cookie';

interface SnappingPlaneHelpData {
  tipTitleFirst: string;
  tipTitleSecond: string;
  video: string;
  nomoreShow: string;
  containerElement: HTMLElement;
}

interface SnappingPlaneHelpProps {
  data: SnappingPlaneHelpData;
}

interface SnappingPlaneHelpState {
  tipTitleFirst: string;
  tipTitleSecond: string;
  video: string;
  nomoreShow: string;
  containerElement: HTMLElement;
}

declare const HSApp: {
  PartnerConfig?: {
    RES_BASEPATH?: string;
  };
  Config?: {
    RES_BASEPATH?: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare const $: {
  cookie(name: string, value?: boolean | string): string | undefined;
};

class SnappingPlaneHelp extends React.Component<SnappingPlaneHelpProps, SnappingPlaneHelpState> {
  constructor(props: SnappingPlaneHelpProps) {
    super(props);
    
    this.state = {
      tipTitleFirst: props.data.tipTitleFirst,
      tipTitleSecond: props.data.tipTitleSecond,
      video: props.data.video,
      nomoreShow: props.data.nomoreShow,
      containerElement: props.data.containerElement
    };
  }

  componentDidMount(): void {}

  private _destroyComponent = (): void => {
    SnappingPlaneHelpCtrl.destroy();
  };

  private _renderTipTitleFirst = (): JSX.Element | null => {
    const { tipTitleFirst } = this.state;
    return tipTitleFirst ? <div>{tipTitleFirst}</div> : null;
  };

  private _renderTipTitleSecond = (): JSX.Element | null => {
    const { tipTitleSecond } = this.state;
    return tipTitleSecond ? <div>{tipTitleSecond}</div> : null;
  };

  private _renderVideo = (): JSX.Element | null => {
    const { video } = this.state;
    if (!video) return null;

    const basePath = HSApp?.PartnerConfig?.RES_BASEPATH ?? HSApp?.Config?.RES_BASEPATH ?? '';
    
    return (
      <video
        width="240"
        height="135px"
        poster={spinnerAnimation}
        autoPlay
        loop
        className="pvideo"
      >
        <source src={basePath + video} type="video/mp4" />
      </video>
    );
  };

  private _renderNomoreShow = (): JSX.Element | null => {
    const nomoreShowText = this.state.nomoreShow || ResourceManager.getString('plugin_customizedmodeling_showall_ok');
    
    return nomoreShowText ? (
      <div className="nomore-show">
        <span onClick={this._destroyComponent}>{nomoreShowText}</span>
      </div>
    ) : null;
  };

  render(): JSX.Element {
    return (
      <div className="tip-wrap">
        <div className="tip-body">
          {this._renderTipTitleFirst()}
          {this._renderTipTitleSecond()}
          {this._renderNomoreShow()}
        </div>
      </div>
    );
  }
}

class SnappingPlaneHelpCtrl {
  /**
   * Creates and displays the snapping plane help tooltip
   * @param callback - Optional callback to execute after creation
   */
  static create(callback?: () => void): void {
    const snappingPlaneHelpCookie = SnappingPlaneHelpCtrl.getCookie();
    
    if (snappingPlaneHelpCookie && eval(snappingPlaneHelpCookie)) {
      callback?.();
      return;
    }

    const eleWrap = document.getElementsByClassName('plugin_customizedModeling_snapping_plane_help');
    
    if (!eleWrap?.[0]) return;

    const element = document.getElementById('snapping-plane-help-tip');
    
    if (element) return;

    const containerElementWrap = eleWrap[0];
    const tipTitleFirst = ResourceManager.getString('plugin_customizedModeling_snapping_plane_tip_first');
    const tipTitleSecond = ResourceManager.getString('plugin_customizedModeling_snapping_plane_tip_second');
    const video = 'userguide/res/video/snappingPlaneHelp.mp4';
    const nomoreShow = ResourceManager.getString('plugin_customizedModeling_snapping_help_known');
    const containerElement = document.createElement('div');
    
    containerElement.setAttribute('id', 'snapping-plane-help-tip');
    containerElementWrap.appendChild(containerElement);

    const data: SnappingPlaneHelpData = {
      tipTitleFirst,
      tipTitleSecond,
      video,
      nomoreShow,
      containerElement
    };

    ReactDOM.render(<SnappingPlaneHelp data={data} />, containerElement);
    callback?.();
  }

  /**
   * Gets the cookie value for snapping plane help
   * @returns Cookie value as string or undefined
   */
  static getCookie(): string | undefined {
    return $.cookie(PLUGIN_CUSTOMIZEDMODELING_SNAPPING_PLANE_HELP_COOKIE);
  }

  /**
   * Sets the cookie value for snapping plane help
   * @param value - Boolean value to store in cookie
   */
  static setCookie(value: boolean): void {
    $.cookie(PLUGIN_CUSTOMIZEDMODELING_SNAPPING_PLANE_HELP_COOKIE, value);
  }

  /**
   * Creates the help tooltip on hover interaction
   */
  static hoverCreate(): void {
    SnappingPlaneHelpCtrl.setCookie(false);
    SnappingPlaneHelpCtrl.create();
  }

  /**
   * Destroys and removes the help tooltip from DOM
   */
  static destroy(): void {
    const element = document.getElementById('snapping-plane-help-tip');
    
    if (element) {
      ReactDOM.unmountComponentAtNode(element);
      element.parentNode?.removeChild(element);
    }
    
    SnappingPlaneHelpCtrl.setCookie(true);
  }
}

export default SnappingPlaneHelpCtrl;