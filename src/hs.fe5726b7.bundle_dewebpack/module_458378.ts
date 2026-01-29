import PropTypes from 'prop-types';
import React from 'react';

interface GuideData {
  icon: string;
  tip: string;
}

interface FeatureUserGuideProps {
  next: () => void;
  data: GuideData[];
  gotItText?: string;
}

interface FeatureUserGuideState {
  currentGuideIndex: number;
  hoverLeftArrow: boolean;
  hoverRightArrow: boolean;
}

const FeatureUserGuideComponent = React.createClass<FeatureUserGuideProps, FeatureUserGuideState>({
  propTypes: {
    next: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    gotItText: PropTypes.string
  },

  getDefaultProps(): Partial<FeatureUserGuideProps> {
    return {};
  },

  getInitialState(): FeatureUserGuideState {
    return {
      currentGuideIndex: 0,
      hoverLeftArrow: false,
      hoverRightArrow: false
    };
  },

  pageUp(): void {
    if (this.state.currentGuideIndex > 0) {
      this.setState({
        currentGuideIndex: this.state.currentGuideIndex - 1
      });
    }
  },

  pageDown(): void {
    if (this.state.currentGuideIndex < this.props.data.length - 1) {
      const newState = {
        currentGuideIndex: this.state.currentGuideIndex + 1
      };
      this.setState(newState);
    }
  },

  parseURL(url: string): string {
    let result = `res/${url}`;
    if (/\.(gif|jpg|jpeg|png|svg|SVG|GIF|JPG|PNG)$/.test(url)) {
      result = `res/ImgUserGuide/${url}`;
    }
    return ResourceManager.parseURL(result, './ui/widgets/userguide/');
  },

  onMouseOverLeftEvent(event: React.MouseEvent): void {
    this.setState({
      hoverLeftArrow: true
    });
  },

  onMouseoutLeftEvent(): void {
    this.setState({
      hoverLeftArrow: false
    });
  },

  onMouseOverRightEvent(): void {
    this.setState({
      hoverRightArrow: true
    });
  },

  onMouseOutRightEvent(): void {
    this.setState({
      hoverRightArrow: false
    });
  },

  render(): React.ReactElement {
    const isFirstPage = this.state.currentGuideIndex <= 0;
    const isLastPage = this.state.currentGuideIndex >= this.props.data.length - 1;
    const currentGuide = this.props.data[this.state.currentGuideIndex];
    
    let leftArrowIcon = require('./arrow-left-default.png');
    let rightArrowIcon = require('./arrow-right-default.png');

    if (this.state.currentGuideIndex !== 0 && this.state.hoverLeftArrow) {
      leftArrowIcon = require('./arrow-left-hover.png');
    }

    if (this.state.currentGuideIndex !== this.props.data.length - 1 && this.state.hoverRightArrow) {
      rightArrowIcon = require('./arrow-right-hover.png');
    }

    return (
      <div className="featureUserGuide">
        <div 
          className="guideContainer" 
          style={{ backgroundImage: `url(${currentGuide.icon})` }}
        >
          <div
            className="arrow left"
            style={{ backgroundImage: `url(${leftArrowIcon})` }}
            onClick={this.pageUp}
            onMouseOver={this.onMouseOverLeftEvent}
            onMouseOut={this.onMouseoutLeftEvent}
          />
          <div className="guide" ref="guide">
            <div className="spaceHolder" />
            <div className="tip">
              {ResourceManager.getString(currentGuide.tip)}
            </div>
            <ul className="stateGroup">
              {this.props.data.map((guide, index) => {
                const className = index === this.state.currentGuideIndex ? 'active' : '';
                return <li key={index} className={className} />;
              })}
            </ul>
          </div>
          <div
            className="arrow right"
            style={{ backgroundImage: `url(${rightArrowIcon})` }}
            onClick={this.pageDown}
            onMouseOver={this.onMouseOverRightEvent}
            onMouseOut={this.onMouseOutRightEvent}
          />
        </div>
        <div className="footer">
          <button
            type="button"
            onClick={this.props.next}
            disabled={false}
            className="btn btn-primary actionButton"
          >
            {this.props.gotItText ?? ResourceManager.getString('userStrings_gotittext')}
          </button>
        </div>
      </div>
    );
  }
});

interface ShowOptions {
  tutorialCookieKey?: string;
  data: GuideData[];
  headerName: string;
  readed?: () => void;
  windowClassName?: string;
  gotItText?: string;
  cancelcall?: () => void;
}

interface PopupWindow {
  close: () => void;
}

const UserGuideManager = {
  popupwindow: undefined as PopupWindow | undefined,

  show(options: ShowOptions): void {
    const { 
      tutorialCookieKey, 
      data, 
      headerName, 
      readed, 
      windowClassName, 
      gotItText, 
      cancelcall 
    } = options;

    if (tutorialCookieKey && tutorialCookieKey !== 'importcad-userguidereaded' && $.cookie(tutorialCookieKey)) {
      readed?.();
      return;
    }

    const contents = (
      <FeatureUserGuideComponent
        next={() => {
          this.popupwindow?.close();
          if (tutorialCookieKey) {
            $.cookie(tutorialCookieKey, true);
          }
          readed?.();
        }}
        data={data}
        gotItText={gotItText}
      />
    );

    const onCancel = cancelcall ?? (() => this.close());

    this.popupwindow = HSApp.UI.PopupWindowBuilder.showWindow({
      contents,
      headerName,
      className: windowClassName,
      winwidth: 750,
      cancelcall: onCancel
    });
  },

  close(): void {
    this.popupwindow?.close();
  }
};

export default UserGuideManager;