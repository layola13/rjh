import React from 'react';
import ReactDOM from 'react-dom';

interface DetailPageItem {
  order?: number;
  [key: string]: unknown;
}

interface PropertyPlaneData {
  show?: boolean;
  command?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onApply?: () => void;
  onNext?: () => void;
  labelButton?: boolean;
}

interface PropertyPlaneProps {
  data?: PropertyPlaneData;
  items?: DetailPageItem[];
  command?: string;
}

interface PropertyPlaneState {
  show: boolean;
  command: string;
  onClose?: () => void;
  operationCancel?: () => void;
  operationApply?: () => void;
  operationNext?: () => void;
  labelButton: boolean;
  items?: DetailPageItem[];
}

interface LabelParam {
  tips?: Array<{ data: string }>;
  command: string;
  labelButton: boolean;
  onCancel?: () => void;
  onApply?: () => void;
}

interface LabelPageProps {
  labelParam: LabelParam;
}

interface DetailPageResult {
  detailPage: React.ReactNode;
  labelPage: React.ReactNode;
}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const CloseIcon: string;

class DetailPage {
  createDetailPageByItems(items: DetailPageItem[] | undefined, command: string): React.ReactNode {
    return null;
  }
}

class LabelPage extends React.Component<LabelPageProps> {}

class Localization {
  static property: string = 'Property';
}

class IconComponent extends React.Component<{ src: string }> {}

class PropertyPlane extends React.Component<PropertyPlaneProps, PropertyPlaneState> {
  private _detailPage: DetailPage;

  constructor(props: PropertyPlaneProps) {
    super(props);
    
    const data = this.props.data;
    
    this.state = {
      show: data?.show ?? false,
      command: data?.show ? (data.command ?? '') : '',
      onClose: data?.onClose,
      operationCancel: data?.onCancel,
      operationApply: data?.onApply,
      operationNext: data?.onNext,
      labelButton: data?.labelButton ?? false,
      items: this.props.items
    };
    
    this._detailPage = new DetailPage();
  }

  createDetailPageFromCommand(): DetailPageResult {
    let detailPage: React.ReactNode;
    let labelPage: React.ReactNode;
    const items = this.state.items;
    const command = this.state.command;

    switch (command) {
      case 'command_line':
      case 'command_arch':
      case 'command_fillet':
      case 'command_rect':
      case 'command_circle':
      case 'command_polygon':
        detailPage = this._detailPage.createDetailPageByItems(items, command);
        labelPage = React.createElement(LabelPage, {
          labelParam: {
            command: command,
            labelButton: false
          }
        });
        break;

      case 'command_molding':
        labelPage = React.createElement(LabelPage, {
          labelParam: {
            tips: [{
              data: ResourceManager.getString('plugin_customizedModeling_molding')
            }],
            command: command,
            labelButton: true,
            onCancel: this.close.bind(this),
            onApply: this.state.operationApply
          }
        });
        break;

      case 'command_sweep':
        labelPage = React.createElement(LabelPage, {
          labelParam: {
            tips: [
              { data: ResourceManager.getString('plugin_customizedModeling_sweep') },
              { data: ResourceManager.getString('plugin_customizedModeling_sweep_select') }
            ],
            command: command,
            labelButton: true,
            onCancel: this.close.bind(this),
            onApply: this.state.operationApply
          }
        });
        break;

      case 'command_group':
        labelPage = React.createElement(LabelPage, {
          labelParam: {
            tips: [{
              data: ResourceManager.getString('plugin_customizedModeling_select_group_element')
            }],
            command: command,
            labelButton: true,
            onCancel: this.close.bind(this),
            onApply: this.state.operationApply
          }
        });
        break;

      case 'command_lineraid':
      case 'command_radioraid':
        labelPage = React.createElement(LabelPage, {
          labelParam: {
            tips: [{
              data: ResourceManager.getString('plugin_customizedModeling_select_face')
            }],
            command: command,
            labelButton: true,
            onCancel: this.close.bind(this),
            onApply: this.state.operationApply
          }
        });
        break;
    }

    return {
      detailPage,
      labelPage
    };
  }

  close(): void {
    const labelPartElement = document.querySelector('#propertyplane-label-part');
    if (labelPartElement) {
      ReactDOM.unmountComponentAtNode(labelPartElement);
    }
    
    this.setState({ show: false });
    this.state.onClose?.();
  }

  render(): React.ReactNode {
    const { detailPage, labelPage } = this.createDetailPageFromCommand();

    return React.createElement('div', {
      id: this.state.show ? 'diy_property_plane' : 'diy_property_plane_hide',
      className: `${this.props.command}_property_plane`
    },
      React.createElement('div', { className: 'property_plane_header' },
        React.createElement('span', { className: 'header_name' }, Localization.property),
        React.createElement('span', {
          className: 'property_plane_close',
          onClick: () => this.close()
        },
          React.createElement(IconComponent, { src: CloseIcon })
        )
      ),
      React.createElement('div', { className: 'command_label_container' },
        React.createElement('div', {
          id: 'command_label',
          className: `${this.state.command}_label`
        }, labelPage)
      ),
      React.createElement('div', { className: 'detail_divider' }),
      React.createElement('div', { className: 'diy_property_plane_content' }, detailPage)
    );
  }
}

const DEFAULT_ORDER_OFFSET = 1000;

function getInputElement(elementId: string): HTMLInputElement | undefined {
  const container = document.getElementById(elementId);
  if (!container) {
    return undefined;
  }
  
  const inputs = container.getElementsByTagName('input');
  return inputs.length > 0 ? inputs[0] : undefined;
}

export default class PropertyPlaneManager {
  private static instance?: PropertyPlane;
  private static _rootElement?: HTMLElement;

  static create(data: PropertyPlaneProps): void {
    const uiContainer = document.getElementById('ui-container');
    if (!uiContainer) {
      return;
    }

    let planeContainer = document.getElementById('diy_property_plane_container');
    if (planeContainer) {
      return;
    }

    this._rootElement = planeContainer;
    
    const newContainer = document.createElement('div');
    newContainer.setAttribute('id', 'diy_property_plane_container');
    newContainer.className = 'diy_property_plane_container';
    uiContainer.appendChild(newContainer);
    
    PropertyPlaneManager.instance = ReactDOM.render(
      React.createElement(PropertyPlane, { data: data }),
      newContainer
    ) as PropertyPlane;
  }

  static update(data: PropertyPlaneProps): void {
    const items = data.items;
    
    if (items) {
      items.forEach((item, index) => {
        if (item.order === undefined) {
          item.order = DEFAULT_ORDER_OFFSET + index;
        }
      });
      
      items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }

    if (!PropertyPlaneManager.instance) {
      return;
    }

    const instance = PropertyPlaneManager.instance;
    const dataTyped = data.data;

    if (dataTyped?.show !== undefined) {
      instance.setState({ show: dataTyped.show });
    }
    if (dataTyped?.command !== undefined) {
      instance.setState({ command: dataTyped.command });
    }
    if (dataTyped?.labelButton !== undefined) {
      instance.setState({ labelButton: dataTyped.labelButton });
    }
    if (dataTyped?.onCancel !== undefined) {
      instance.setState({ operationCancel: dataTyped.onCancel });
    }
    if (dataTyped?.onApply !== undefined) {
      instance.setState({ operationApply: dataTyped.onApply });
    }
    if (dataTyped?.onNext !== undefined) {
      instance.setState({ operationNext: dataTyped.onNext });
    }
    if (items) {
      instance.setState({ items });
    }
  }

  static updateInputValue(elementId: string, value: string, skipConversion?: boolean): void {
    const inputElement = getInputElement(elementId);
    if (skipConversion || !inputElement) {
      return;
    }

    const parsedValue = parseFloat(value);
    const roundedValue = parseFloat(parsedValue.toFixed(1));
    const scaledValue = 10 * roundedValue;
    inputElement.value = String(Math.abs(scaledValue));
  }

  static updateMultInputValue(elementIds: string[], value: string, skipConversion?: boolean): void {
    const normalizedValue = value.replace(/[ \s]/g, '');
    const coordinatePattern = /(-?\d+(\.\d?)?)[, \s]+(-?\d+(\.\d?)?)/gi;
    
    if (!normalizedValue.match(coordinatePattern) || skipConversion) {
      return;
    }

    const values = normalizedValue.split(', ');
    
    elementIds.forEach((elementId, index) => {
      const inputElement = getInputElement(elementId);
      if (!inputElement) {
        return;
      }

      const rawValue = values[index];
      (inputElement as HTMLInputElement & { trueValue?: string }).trueValue = rawValue;
      
      const parsedValue = parseFloat(rawValue);
      const roundedValue = parseFloat(parsedValue.toFixed(1));
      const scaledValue = 10 * roundedValue;
      inputElement.value = String(Math.abs(scaledValue));
    });
  }
}