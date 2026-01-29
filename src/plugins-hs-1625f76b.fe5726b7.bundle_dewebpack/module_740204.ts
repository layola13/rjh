import React from 'react';

interface ProgressBarProps {
  className?: string;
  show?: boolean;
  progress: string;
  hint?: string;
}

export default class ProgressBar extends React.Component<ProgressBarProps> {
  constructor(props: ProgressBarProps) {
    super(props);
  }

  render(): React.ReactElement {
    const { className = '', show = false, progress, hint } = this.props;
    const isUploadComplete = progress === '100%';
    
    return (
      <div className={`progressBarContainer ${className}${show ? '' : ' hidden'}`}>
        <div className="progressBarContent">
          <div className="progressBar">
            <div 
              className="percent" 
              style={{ width: progress }}
            />
          </div>
          <div className={isUploadComplete ? 'uploadSuccessIcon' : 'hidden'}>
            <span />
          </div>
        </div>
        <div className={`hint ${hint ? '' : 'hidden'}`}>
          {`${hint} ${progress}`}
        </div>
      </div>
    );
  }
}