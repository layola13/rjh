import React from 'react';

interface GuideItem {
  icon: string;
  tip: string;
}

interface UserGuideProps {
  next: () => void;
}

interface UserGuideState {
  currentGuideIndex: number;
}

const GUIDE_ICONS = [
  require('./icons/icon1'),
  require('./icons/icon2'),
  require('./icons/icon3'),
  require('./icons/icon4'),
  require('./icons/icon5')
];

const ARROW_UP_ICON = require('./icons/arrow-up');
const ARROW_DOWN_ICON = require('./icons/arrow-down');

export default class UserGuide extends React.Component<UserGuideProps, UserGuideState> {
  private readonly guideData: GuideItem[];

  constructor(props: UserGuideProps) {
    super(props);
    
    this.state = {
      currentGuideIndex: 0
    };

    this.guideData = [
      {
        icon: 'Pinhua_guideline_01.svg',
        tip: 'plugin_catalog_diytiles_guide1'
      },
      {
        icon: 'Pinhua_guideline_02.svg',
        tip: 'plugin_catalog_diytiles_guide2'
      },
      {
        icon: 'Pinhua_guideline_03.svg',
        tip: 'plugin_catalog_diytiles_guide3'
      },
      {
        icon: 'Pinhua_guideline_04.svg',
        tip: 'plugin_catalog_diytiles_guide4'
      },
      {
        icon: 'Pinhua_guideline_05.svg',
        tip: 'plugin_catalog_diytiles_guide5'
      }
    ];
  }

  pageUp = (): void => {
    if (this.state.currentGuideIndex > 0) {
      this.setState({
        currentGuideIndex: this.state.currentGuideIndex - 1
      });
    }
  };

  pageDown = (): void => {
    if (this.state.currentGuideIndex < this.guideData.length - 1) {
      this.setState({
        currentGuideIndex: this.state.currentGuideIndex + 1
      });
    }
  };

  render(): JSX.Element {
    const currentGuide = this.guideData[this.state.currentGuideIndex];
    const currentIcon = GUIDE_ICONS[this.state.currentGuideIndex];

    return (
      <div className="userguide">
        <div className="guideContainer">
          <div
            className="arrow"
            style={{ backgroundImage: `url(${ARROW_UP_ICON})` }}
            onClick={this.pageUp}
          />
          <div className="guide">
            <div
              className="icon"
              style={{ backgroundImage: `url(${currentIcon})` }}
            />
            <div className="tip">
              {ResourceManager.getString(currentGuide.tip)}
            </div>
            <ul className="stateGroup">
              {this.guideData.map((item: GuideItem, index: number) => {
                const activeClass = index === this.state.currentGuideIndex ? 'active' : '';
                return <li key={index} className={activeClass} />;
              })}
            </ul>
          </div>
          <div
            className="arrow"
            style={{ backgroundImage: `url(${ARROW_DOWN_ICON})` }}
            onClick={this.pageDown}
          />
        </div>
        <div className="footer">
          <button
            type="button"
            onClick={this.props.next}
            className="btn btn-primary actionButton"
          >
            {ResourceManager.getString('userStrings_gotittext')}
          </button>
        </div>
      </div>
    );
  }
}