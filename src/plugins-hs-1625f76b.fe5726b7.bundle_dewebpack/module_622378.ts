import React from 'react';
import { IconfontView } from './IconfontView';

interface CreateButtonProps {
  isAnimation: boolean;
  isReadonly: boolean;
  onCreate: () => void;
}

/**
 * CreateButton Component
 * A button component for creating/saving camera positions in the project
 */
export default class CreateButton extends React.Component<CreateButtonProps> {
  constructor(props: CreateButtonProps) {
    super(props);
    this.onCreateBtnClk = this.onCreateBtnClk.bind(this);
  }

  /**
   * Handles the create button click event
   * Tracks the camera position save event and triggers onCreate callback
   */
  private onCreateBtnClk(): void {
    const { isAnimation, isReadonly } = this.props;
    
    if (isAnimation || isReadonly) {
      return;
    }

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Camera,
      'project_save_camera_position_event'
    );
    
    this.props.onCreate();
  }

  render(): React.ReactElement {
    const { isAnimation, isReadonly } = this.props;
    
    const loadingClassName = isAnimation ? ' animate' : ' hidden';
    const iconClassName = isAnimation ? 'hidden' : '';
    const buttonDisabledClass = isReadonly ? 'createbtn-disable' : '';

    return (
      <div 
        className={`createbtn ${buttonDisabledClass}`}
        onClick={this.onCreateBtnClk}
      >
        <div className={`create-loading ${loadingClassName}`}>
          <IconfontView
            showType="hs_zhanshi_jiazai"
            customStyle={{
              color: '#33353B',
              fontSize: '40px'
            }}
            bgExtendSize={0}
          />
        </div>
        
        <div className={`${iconClassName} create-icon`}>
          <IconfontView
            showType="hs_xian_tianjia"
            customStyle={{
              color: '#33353B',
              fontSize: '26px'
            }}
          />
        </div>
        
        <div className={`ctext ${iconClassName}`}>
          {ResourceManager.getString('project_save_camera_position')}
        </div>
      </div>
    );
  }
}