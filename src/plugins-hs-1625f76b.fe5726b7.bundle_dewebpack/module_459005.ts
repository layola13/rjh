import React from 'react';
import { IconfontView } from './IconfontView';

interface CameraData {
  get(key: 'name'): string;
  get(key: 'thumbnail'): string;
  get(key: string): unknown;
}

interface CameraItemProps {
  camera: CameraData;
  index: number;
  isActive: string;
  isReadonly?: boolean;
  goToNextPage?: boolean;
  onCameraClicked: (index: number) => void;
  onDeleteClicked: (index: number) => void;
  onNameChange: (index: number, name: string) => void;
  nextpageHandler?: (index: number) => void;
}

class CameraItem extends React.Component<CameraItemProps> {
  static defaultProps = {
    onCameraClicked: () => {},
    onDeleteClicked: () => {},
    onNameChange: () => {}
  };

  constructor(props: CameraItemProps) {
    super(props);
    this._onDelete = this._onDelete.bind(this);
  }

  private _onDelete(event: React.MouseEvent<HTMLLIElement>): void {
    const { onDeleteClicked, index, isReadonly } = this.props;
    
    if (isReadonly) {
      return;
    }

    const nativeEvent = event.nativeEvent;
    if (nativeEvent.stopPropagation) {
      nativeEvent.stopPropagation();
    } else {
      (nativeEvent as any).cancelBubble = true;
    }

    onDeleteClicked(index);
  }

  private clickCamera(cameraIndex: number, shouldGoToNextPage?: boolean): void {
    this.props.onCameraClicked(cameraIndex);
    
    if (shouldGoToNextPage && this.props.nextpageHandler) {
      this.props.nextpageHandler(cameraIndex);
    }
  }

  render(): React.ReactNode {
    const { camera, index, isActive, goToNextPage, isReadonly } = this.props;
    
    const thumbnailUrl = camera.get('thumbnail');
    const backgroundStyle: React.CSSProperties = {
      backgroundImage: `url(${thumbnailUrl})`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };

    const deleteIconClassName = isReadonly 
      ? 'delete_icon delete_icon_disable' 
      : 'delete_icon';

    return (
      <div
        key={index}
        onClick={() => this.clickCamera(index, goToNextPage)}
        className={`cameraItem col-md-2 col-sm-2 col-xs-2 ${isActive}`}
      >
        <div className="cameraImg" style={backgroundStyle}>
          <li className={deleteIconClassName} onClick={this._onDelete}>
            <IconfontView
              showType="hs_mian_shanchu"
              customStyle={{
                color: '#888888',
                fontSize: '16px'
              }}
              customBgStyle={{
                background: 'rgba(255, 255, 255, 0.60)'
              }}
              hoverColor="#396EFE"
              clickColor="#396EFE"
              hoverBgColor="rgba(255, 255, 255, 0.60)"
              bgExtendSize={12}
            />
          </li>
        </div>
      </div>
    );
  }
}

export default CameraItem;