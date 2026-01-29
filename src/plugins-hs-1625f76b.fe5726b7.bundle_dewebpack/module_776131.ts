import { connect } from 'react-redux';
import CameraComponent from './CameraComponent';
import createCameraHandler from './createCameraHandler';
import closeDialog from './closeDialog';

interface RootState {
  isReadonly: boolean;
  isShown: boolean;
  isAnimation: boolean;
  callplugin: unknown;
}

interface StateProps {
  isReadonly: boolean;
  isShown: boolean;
  isAnimation: boolean;
  callplugin: unknown;
}

interface DispatchProps {
  createCameraHandler: typeof createCameraHandler;
  closeDialog: typeof closeDialog;
}

const mapStateToProps = (state: RootState): StateProps => ({
  isReadonly: state.isReadonly,
  isShown: state.isShown,
  isAnimation: state.isAnimation,
  callplugin: state.callplugin
});

const mapDispatchToProps: DispatchProps = {
  createCameraHandler,
  closeDialog
};

export default connect<StateProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(CameraComponent);