import React from 'react';
import PropTypes from 'prop-types';

interface ProgressBarProps {
  show?: boolean;
  progress?: string;
  hint?: string;
  className?: string;
}

interface ProgressBarComponent extends React.ComponentClass<ProgressBarProps> {
  propTypes?: Record<string, unknown>;
  getDefaultProps?: () => ProgressBarProps;
}

const FULL_PROGRESS = '100%';

class ProgressBar extends React.Component<ProgressBarProps> {
  static propTypes = {
    show: PropTypes.bool,
    progress: PropTypes.string,
    hint: PropTypes.string,
    className: PropTypes.string
  };

  static defaultProps: ProgressBarProps = {
    show: true,
    hint: '',
    className: ''
  };

  render(): React.ReactElement {
    const { show = true, progress = '', hint = '', className = '' } = this.props;
    const isVisible = show ? '' : ' hidden';
    const isComplete = progress === FULL_PROGRESS;
    const uploadIconClass = isComplete ? 'uploadSuccessIcon' : 'hidden';
    const hintClass = hint ? '' : 'hidden';

    return (
      <div className={`progressBarContainer ${className}${isVisible}`}>
        <div className="progressBarContent">
          <div className="progressBar">
            <div 
              className="percent" 
              style={{ width: progress }}
            />
          </div>
          <div className={uploadIconClass}>
            <span />
          </div>
        </div>
        <div className={`hint ${hintClass}`}>
          {hint}
        </div>
      </div>
    );
  }
}

export default ProgressBar;