interface Toolbar {
  name: string;
  [key: string]: unknown;
}

interface FloorplannerToolbarProps {
  activeToolbar: Toolbar | null;
  toolbars: Toolbar[];
  visible: boolean;
  showSecondToolbar: (toolbar: Toolbar) => void;
  signalToolbarHover: (toolbar: Toolbar | null) => void;
  toolTipSignalHook: (message: string) => void;
}

interface ToolbarItemProps {
  isActive: boolean;
  toolbar: Toolbar;
  showSecondToolbar: (toolbar: Toolbar) => void;
  signalToolbarHover: (toolbar: Toolbar | null) => void;
  toolTipSignalHook: (message: string) => void;
}

declare const React: {
  createElement: (
    type: string | React.ComponentType<any>,
    props: Record<string, any> | null,
    ...children: any[]
  ) => React.ReactElement;
};

declare namespace React {
  type ReactElement = any;
  type ComponentType<P> = (props: P) => ReactElement;
}

import ToolbarItem from './ToolbarItem';

function FloorplannerToolbar(props: FloorplannerToolbarProps): React.ReactElement {
  const { activeToolbar, toolbars, visible, showSecondToolbar, signalToolbarHover, toolTipSignalHook } = props;

  const containerStyle: React.CSSProperties = {
    display: visible ? 'block' : 'none'
  };

  return React.createElement(
    'div',
    {
      id: 'floorplannerToolbar',
      className: 'unselectable',
      style: containerStyle
    },
    toolbars.map((toolbar: Toolbar) => {
      return React.createElement(ToolbarItem, {
        key: toolbar.name,
        isActive: toolbar === activeToolbar,
        toolbar: toolbar,
        showSecondToolbar: showSecondToolbar,
        signalToolbarHover: signalToolbarHover,
        toolTipSignalHook: toolTipSignalHook
      });
    })
  );
}

export default FloorplannerToolbar;