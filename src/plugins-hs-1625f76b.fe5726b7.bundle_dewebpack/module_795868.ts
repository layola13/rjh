import { connect } from 'react-redux';
import CameraComponent from './CameraComponent';
import clickCameraHandler from './clickCameraHandler';
import deleteHandler from './deleteHandler';
import resizeWindowHandler from './resizeWindowHandler';
import pageButtonHandler from './pageButtonHandler';

interface RootState {
  isReadonly: boolean;
  navi: {
    startIndex: number;
    activeCamera: string | number | null;
    pageSize: number;
  };
  positions: unknown;
}

interface StateProps {
  isReadonly: boolean;
  startIndex: number;
  selectedCamera: string | number | null;
  positions: unknown;
  pageSize: number;
}

interface DispatchProps {
  clickCameraHandler: typeof clickCameraHandler;
  deleteHandler: typeof deleteHandler;
  resizeWindowHandler: typeof resizeWindowHandler;
  pageButtonHandler: typeof pageButtonHandler;
}

const mapStateToProps = (state: RootState): StateProps => {
  const { positions } = state;
  return {
    isReadonly: state.isReadonly,
    startIndex: state.navi.startIndex,
    selectedCamera: state.navi.activeCamera,
    positions,
    pageSize: state.navi.pageSize
  };
};

const mapDispatchToProps: DispatchProps = {
  clickCameraHandler,
  deleteHandler,
  resizeWindowHandler,
  pageButtonHandler
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraComponent);