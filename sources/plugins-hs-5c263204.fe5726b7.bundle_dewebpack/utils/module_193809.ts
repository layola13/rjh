import React from 'react';
import guideLoadingImage from './path/to/image';

interface GuideLoadingProps {
  showGuideLoading: boolean;
}

interface GuideLoadingState {
  showGuideLoading: boolean;
}

export default class GuideLoading extends React.Component<GuideLoadingProps, GuideLoadingState> {
  constructor(props: GuideLoadingProps) {
    super(props);
    this.state = {
      showGuideLoading: props.showGuideLoading
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: GuideLoadingProps): void {
    this.setState({
      showGuideLoading: nextProps.showGuideLoading
    });
  }

  render(): React.ReactElement {
    const visibilityClass = this.state.showGuideLoading ? 'show' : 'hide';
    
    return (
      <div className={`guideloadingWrapper ${visibilityClass}`}>
        <div className="guideloading">
          <img className="image" src={guideLoadingImage} />
        </div>
      </div>
    );
  }
}