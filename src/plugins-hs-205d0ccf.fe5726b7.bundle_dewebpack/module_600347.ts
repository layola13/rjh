import React from 'react';
import PropTypes from 'prop-types';

interface CameraButton {
  cameraposition?: unknown;
  setting?: unknown;
  view?: unknown;
  fitcenter?: unknown;
}

interface CameraData {
  selectedIndex: number;
  btns: CameraButton[];
  disable?: boolean;
}

interface CameraRootContainerProps {
  data: CameraData;
}

interface CameraRootContainerState {
  data: CameraData;
}

class CameraRootContainer extends React.Component<CameraRootContainerProps, CameraRootContainerState> {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps = {
    data: {
      selectedIndex: 0,
      btns: []
    }
  };

  constructor(props: CameraRootContainerProps) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: CameraRootContainerProps): void {
    this.setState({
      data: nextProps.data
    });
  }

  render(): React.ReactElement {
    const { data } = this.state;
    const { selectedIndex, btns } = data;
    const { disable = false } = this.props.data;
    const selectedButton = btns[selectedIndex];

    return (
      <div className={`camera-root-container ${disable ? 'disable' : ''}`}>
        {selectedButton.cameraposition && (
          <div className="camera-position">
            <u.default data={selectedButton.cameraposition} />
          </div>
        )}
        {selectedButton.setting && (
          <div className="camera-setting">
            <u.default data={selectedButton.setting} />
          </div>
        )}
        {selectedButton.view && (
          <div className="camera-view">
            {' '}
            <u.default data={selectedButton.view} />
            {' '}
          </div>
        )}
        {selectedButton.fitcenter && (
          <div className="camera-fitcenter">
            <u.default data={selectedButton.fitcenter} />
          </div>
        )}
      </div>
    );
  }
}

export default CameraRootContainer;