import React from 'react';

interface GuideData {
  icon: string;
  tip: string;
}

interface DiyUserGuideProps {
  next: () => void;
}

interface DiyUserGuideState {
  currentGuideIndex: number;
}

class DiyUserGuide extends React.Component<DiyUserGuideProps, DiyUserGuideState> {
  private readonly data: GuideData[] = [
    {
      icon: "customizedModeling_cad_guideline_01.png",
      tip: "plugin_customizedModeling_cad_guide1"
    },
    {
      icon: "customizedModeling_cad_guideline_02.png",
      tip: "plugin_customizedModeling_cad_guide2"
    },
    {
      icon: "customizedModeling_cad_guideline_03.png",
      tip: "plugin_customizedModeling_cad_guide3"
    },
    {
      icon: "customizedModeling_cad_guideline_04.png",
      tip: "plugin_customizedModeling_cad_guide4"
    }
  ];

  private readonly guideImages: string[];

  constructor(props: DiyUserGuideProps) {
    super(props);
    this.state = {
      currentGuideIndex: 0
    };
    
    // Import guide images (these would need to be actual imports in your project)
    this.guideImages = [
      require('./assets/guide-1.png'),
      require('./assets/guide-2.png'),
      require('./assets/guide-3.png'),
      require('./assets/guide-4.png')
    ];
  }

  private pageUp = (): void => {
    if (this.state.currentGuideIndex > 0) {
      this.setState({
        currentGuideIndex: this.state.currentGuideIndex - 1
      });
    }
  };

  private pageDown = (): void => {
    if (this.state.currentGuideIndex < this.data.length - 1) {
      this.setState({
        currentGuideIndex: this.state.currentGuideIndex + 1
      });
    }
  };

  render(): React.ReactElement {
    const { currentGuideIndex } = this.state;
    const isFirstPage = currentGuideIndex <= 0;
    const isLastPage = currentGuideIndex >= this.data.length - 1;
    const currentData = this.data[currentGuideIndex];
    const currentImage = this.guideImages[currentGuideIndex];

    return (
      <div className="diyUserguide">
        <div className="guideContainer">
          <div
            className="arrow"
            style={{ backgroundImage: `url(${leftArrowImage})` }}
            onClick={this.pageUp}
            aria-disabled={isFirstPage}
          />
          
          <div className="guide" ref="guide">
            <div
              className="icon"
              style={{ backgroundImage: `url(${currentImage})` }}
            />
            
            <div className="tip">
              {ResourceManager.getString(currentData.tip)}
            </div>
            
            <ul className="stateGroup">
              {this.data.map((_, index) => {
                const activeClass = index === currentGuideIndex ? "active" : "";
                return (
                  <li key={index} className={activeClass} />
                );
              })}
            </ul>
          </div>
          
          <div
            className="arrow"
            style={{ backgroundImage: `url(${rightArrowImage})` }}
            onClick={this.pageDown}
            aria-disabled={isLastPage}
          />
        </div>
      </div>
    );
  }
}

export default DiyUserGuide;