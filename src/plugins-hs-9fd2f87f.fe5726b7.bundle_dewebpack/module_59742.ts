enum PropertyBarControlTypeEnum {
  lengthInput = 'lengthInput',
  imageButton = 'imageButton',
  radioButton = 'radioButton'
}

interface PropertyItemData {
  [key: string]: unknown;
}

interface PropertyItem {
  id: string;
  type: PropertyBarControlTypeEnum;
  label?: string;
  data?: PropertyItemData;
}

interface LengthInputProps {
  data?: PropertyItemData;
}

interface RadioButtonProps {
  data: PropertyItem;
}

declare const React: {
  createElement(
    type: string,
    props: Record<string, unknown> | null,
    ...children: unknown[]
  ): unknown;
};

declare class LengthInputComponent extends React.Component<LengthInputProps> {}
declare class RadioButtonComponent extends React.Component<RadioButtonProps> {}

class PropertyDetailPageBuilder {
  createDetailPageByItems(items: PropertyItem[], context?: unknown): unknown {
    if (!items || items.length === 0) {
      return null;
    }

    const elements: unknown[] = [];

    items.forEach((item: PropertyItem) => {
      let element: unknown;

      switch (item.type) {
        case PropertyBarControlTypeEnum.lengthInput:
          element = React.createElement(
            'div',
            {
              className: 'property_input_component',
              id: item.id
            },
            React.createElement(
              'span',
              {
                className: 'property_input_label'
              },
              item.label
            ),
            React.createElement(
              'span',
              {
                className: 'property_input_detail'
              },
              React.createElement(LengthInputComponent, {
                data: item.data
              })
            )
          );
          elements.push(element);
          elements.push(
            React.createElement('div', {
              className: 'detail_divider'
            })
          );
          break;

        case PropertyBarControlTypeEnum.imageButton:
          break;

        case PropertyBarControlTypeEnum.radioButton:
          element = React.createElement(
            'div',
            {
              className: 'property_radio_component',
              id: item.id
            },
            React.createElement(RadioButtonComponent, {
              data: item
            })
          );
          elements.push(element);
          elements.push(
            React.createElement('div', {
              className: 'detail_divider'
            })
          );
          break;
      }
    });

    return React.createElement(
      'div',
      {
        className: 'diy_command_detail'
      },
      elements
    );
  }
}

export default PropertyDetailPageBuilder;