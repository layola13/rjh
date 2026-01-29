import React from 'react';
import ReactDOM from 'react-dom';
import { PopupWindow } from './PopupWindow';
import FileUploader from './FileUploader';
import './styles.css';

interface ImportCADPopupProps {
  callback: (file: File | null) => void;
}

interface ImportCADPopupState {
  callback: (file: File | null) => void;
}

class ImportCADPopup extends React.Component<ImportCADPopupProps, ImportCADPopupState> {
  private rootRef: React.RefObject<PopupWindow>;

  constructor(props: ImportCADPopupProps) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {
      callback: props.callback
    };
  }

  close(): void {
    this.rootRef.current?.handleCancelClick();
  }

  render(): React.ReactElement {
    const fileUploaderElement = React.createElement(FileUploader, {
      accept: '*/*',
      callback: this.state.callback
    });

    const headerName = ResourceManager.getString('plugin_customizedModeling_cad_import');

    return React.createElement(PopupWindow, {
      ref: this.rootRef,
      windowname: 'createnewwishlist',
      headername: headerName,
      contents: fileUploaderElement,
      winwidth: 705,
      submitcall: this.props.callback
    });
  }
}

export function show(callback: (file: File | null) => void): void {
  const popupElement = React.createElement(ImportCADPopup, {
    callback
  });

  const container = document.querySelector<HTMLElement>('.popupcontainer');
  if (container) {
    ReactDOM.render(popupElement, container);
  }
}

export function destroy(): void {
  const container = document.querySelector<HTMLElement>('.popupcontainer');
  if (container) {
    ReactDOM.unmountComponentAtNode(container);
  }
}