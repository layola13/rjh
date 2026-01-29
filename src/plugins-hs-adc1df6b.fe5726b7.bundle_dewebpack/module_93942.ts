import React from 'react';
import { Tooltip } from 'antd';
import { IconfontView } from './IconfontView';

interface FullScreenState {
  fullscreen: boolean;
}

interface FullScreenProps {
  customStyle?: React.CSSProperties;
}

interface FullScreenDocument extends Document {
  fullScreenElement?: Element | null;
  mozFullScreen?: boolean;
  webkitIsFullScreen?: boolean;
  msExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
}

interface FullScreenElement extends HTMLElement {
  msRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
}

class FullScreenComponent extends React.Component<FullScreenProps, FullScreenState> {
  constructor(props: FullScreenProps) {
    super(props);
    this.state = {
      fullscreen: this.isFullScreen()
    };
  }

  componentDidMount(): void {
    $(window).resize(() => {
      if (this.isFullScreen()) {
        this.setState({ fullscreen: true });
      } else {
        this.setState({ fullscreen: false });
      }
    });
  }

  isFullScreen(): boolean {
    const doc = document as FullScreenDocument;
    return (
      (doc.fullScreenElement !== undefined && doc.fullScreenElement !== null) ||
      !!doc.mozFullScreen ||
      !!doc.webkitIsFullScreen
    );
  }

  requestFullScreen(element: FullScreenElement): void {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
    this.setState({ fullscreen: true });
  }

  exitFullScreen(): void {
    const doc = document as FullScreenDocument;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    }
    this.setState({ fullscreen: false });
  }

  toggleFullScreen(): void {
    if (this.isFullScreen()) {
      this.exitFullScreen();
    } else {
      this.requestFullScreen(document.documentElement as FullScreenElement);
    }
  }

  render(): React.ReactElement {
    const { fullscreen } = this.state;
    const { customStyle = { fontSize: '20px' } } = this.props;

    return (
      <div
        className="full-screen-content"
        onClick={() => this.toggleFullScreen()}
      >
        <Tooltip
          placement="bottom"
          overlayClassName="tooltip-full-screen"
          title={
            fullscreen
              ? ResourceManager.getString('toolbar_esc_fullscreen')
              : ResourceManager.getString('toolbar_fullscreen')
          }
          color="dark"
        >
          <div className="full-screen">
            <IconfontView
              showType={fullscreen ? 'hs_mian_tuichuquanping' : 'hs_mian_quanping'}
              customStyle={customStyle}
              clickColor="#396EFE"
              className="full-screen-icons"
            />
          </div>
        </Tooltip>
      </div>
    );
  }
}

class FullScreenToolbarItem {
  order: number = 1100;

  getRenderItem(customStyle?: React.CSSProperties): React.ReactElement {
    return <FullScreenComponent customStyle={customStyle} />;
  }
}

export default new FullScreenToolbarItem();