import React, { PureComponent, ReactElement } from 'react';
import { List } from 'immutable';
import CameraItem from './CameraItem';

interface Position {
  get(key: string): any;
}

interface CameraListProps {
  isReadonly: boolean;
  positions: List<Position>;
  selectedCamera: number;
  clickCameraHandler: (index: number) => void;
  onNameChange: (index: number, name: string) => void;
  deleteHandler: (index: number) => void;
  startIndex: number;
  remainIdx: number;
  nextpageHandler: () => void;
}

class CameraList extends PureComponent<CameraListProps> {
  static defaultProps = {
    clickCameraHandler: () => {},
    onNameChange: () => {}
  };

  constructor(props: CameraListProps) {
    super(props);
  }

  render(): ReactElement {
    const {
      positions,
      selectedCamera,
      clickCameraHandler,
      deleteHandler,
      onNameChange,
      startIndex,
      remainIdx,
      nextpageHandler,
      isReadonly
    } = this.props;

    const cameraItems = positions.map((camera, index) => {
      const activeClass = selectedCamera === index ? 'active' : '';
      const shouldGoToNextPage = remainIdx === index;
      const cameraId = camera.get('id');

      return React.createElement(CameraItem, {
        isReadonly,
        key: cameraId,
        camera,
        onCameraClicked: clickCameraHandler,
        onDeleteClicked: deleteHandler,
        onNameChange,
        index,
        isActive: activeClass,
        goToNextPage: shouldGoToNextPage,
        nextpageHandler
      });
    });

    const cameraBarStyle = {
      width: 280 * positions.size
    };

    return React.createElement(
      'div',
      {
        id: 'camera_lg_list_slider',
        ref: 'container'
      },
      React.createElement(
        'div',
        {
          className: 'camera_bar',
          style: cameraBarStyle
        },
        cameraItems.slice(startIndex)
      )
    );
  }
}

export default CameraList;