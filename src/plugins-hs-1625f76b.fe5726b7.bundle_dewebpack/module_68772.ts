import React, { PureComponent } from 'react';
import { List } from 'immutable';
import { updateCameraPositionName } from './cameraPositionService';
import { getPageSize } from './pageUtils';
import { IconfontView } from './IconfontView';
import CameraListItems from './CameraListItems';
import defaultImageSrc from './assets/default-camera.png';
import styles from './CameraList.module.css';

interface CameraPosition {
  get(key: string): any;
}

interface CameraListProps {
  selectedCamera: number;
  positions: List<CameraPosition>;
  clickCameraHandler: (id: number) => void;
  deleteHandler: (id: number) => void;
  resizeWindowHandler: () => void;
  onClickNextPrevHandler: (direction: number) => void;
  pageButtonHandler: (page: number) => void;
  startIndex: number;
  pageSize: number;
  isReadonly: boolean;
}

class CameraList extends PureComponent<CameraListProps> {
  componentDidMount(): void {
    window.addEventListener('resize', this.props.resizeWindowHandler);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.props.resizeWindowHandler);
  }

  private onClickPrevNextButton = (currentIndex: number, pageSize: number, isNext: boolean): void => {
    const direction = isNext ? 1 : -1;
    this.props.pageButtonHandler(currentIndex + direction * pageSize);
  };

  private onNameChange = (position: CameraPosition, newName: string): void => {
    updateCameraPositionName(position.get('id'), newName);
  };

  render(): React.ReactNode {
    const {
      selectedCamera,
      positions,
      clickCameraHandler,
      deleteHandler,
      startIndex,
      pageSize,
      pageButtonHandler,
      isReadonly,
    } = this.props;

    const emptyVisibility = positions.size > 0 ? 'hidden' : '';
    const effectivePageSize = pageSize === -1 ? getPageSize() : pageSize;
    const endIndex = startIndex + pageSize;
    const currentIndex = startIndex;
    const nextButtonVisibility = currentIndex + effectivePageSize >= positions.size ? 'hidden' : '';
    const prevButtonVisibility = currentIndex <= 0 ? 'hidden' : '';

    return (
      <div className={styles.cameralgList}>
        <div className={`emptydes ${emptyVisibility}`}>
          <img src={defaultImageSrc} />
          <div className="ctext">
            {ResourceManager.getString('project_empty_camera_position')}
          </div>
        </div>

        <CameraListItems
          isReadonly={isReadonly}
          positions={positions}
          selectedCamera={selectedCamera}
          clickCameraHandler={clickCameraHandler}
          onNameChange={this.onNameChange}
          deleteHandler={deleteHandler}
          startIndex={currentIndex}
          pageSize={pageSize}
          remainIdx={endIndex}
          nextpageHandler={pageButtonHandler}
        />

        <a
          className={`left list_button ${prevButtonVisibility}`}
          role="button"
          data-slide="prev"
          onClick={() => this.onClickPrevNextButton(currentIndex, effectivePageSize, false)}
        >
          <IconfontView
            showType="hs_xiao_shuangjiantou_zuo"
            customStyle={{
              color: '#33353B',
              fontSize: '14px',
            }}
            hoverColor="#396EFE"
            clickColor="#396EFE"
          />
        </a>

        <a
          className={`right list_button ${nextButtonVisibility}`}
          role="button"
          data-slide="next"
          onClick={() => this.onClickPrevNextButton(currentIndex, effectivePageSize, true)}
        >
          <IconfontView
            showType="hs_xiao_shuangjiantou_you"
            customStyle={{
              color: '#33353B',
              fontSize: '14px',
            }}
            hoverColor="#396EFE"
            clickColor="#396EFE"
          />
        </a>
      </div>
    );
  }
}

export default CameraList;