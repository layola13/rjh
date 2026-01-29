import React from 'react';
import { Select, Option, NumberInput } from './components';

enum TagOptionType {
  Single = 'single',
  Multi = 'multi',
  Input = 'input'
}

interface TagOption {
  optionValue: string | number;
  dispName: string;
  needInput?: boolean;
  inputField?: string;
  inputValue?: number;
  inputUnit?: string;
  inputFieldLabel?: string;
  needOriginValue?: boolean;
}

interface SelectItem {
  id: string | number;
  name: string;
}

interface TagItem {
  tagFieldName: string | string[];
  tagOptions: TagOption | TagOption[] | TagOption[][];
  tagOptionType: TagOptionType;
  label: string;
  selectKeys: (string | number)[];
  tagFieldValue?: string;
}

interface TagDialogContentProps {
  data: {
    items: TagItem[];
    name: string;
    selectChange?: (fieldName: string, value: any) => void;
  };
}

interface TagDialogContentState {
  items: TagItem[];
  selectChange?: (fieldName: string, value: any) => void;
  name: string;
  selectMap: Record<string, any>;
  textMap: Record<string, string>;
}

class TagDialogContent extends React.Component<TagDialogContentProps, TagDialogContentState> {
  private needRefresh: boolean;

  constructor(props: TagDialogContentProps) {
    super(props);

    const { items, name, selectChange } = props.data;
    const selectMap: Record<string, any> = {};

    this.needRefresh = true;

    items.forEach((item) => {
      if (Array.isArray(item.tagFieldName)) {
        item.tagFieldName.forEach((fieldName, index) => {
          selectMap[fieldName] = item.selectKeys[index];
          selectChange?.(fieldName, item.selectKeys[index]);
        });
      } else {
        selectMap[item.tagFieldName] = item.selectKeys;
        selectChange?.(item.tagFieldName, item.selectKeys);
      }
    });

    this.state = {
      items,
      selectChange,
      name,
      selectMap,
      textMap: {}
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: TagDialogContentProps): void {
    const { items, selectChange, name } = nextProps.data;
    const selectMap: Record<string, any> = {};

    items.forEach((item) => {
      if (Array.isArray(item.tagFieldName)) {
        item.tagFieldName.forEach((fieldName, index) => {
          selectMap[fieldName] = item.selectKeys[index];
        });
      } else {
        selectMap[item.tagFieldName] = item.selectKeys;
      }
    });

    this.setState({
      items,
      selectChange,
      name,
      selectMap
    });
  }

  private handleItemChange = (item: TagItem, selectedOption: SelectItem): void => {
    const { tagFieldName, tagOptions } = item;
    const { id } = selectedOption;

    this.state.selectMap[tagFieldName as string] = [id];

    this.setState(
      { selectMap: this.state.selectMap },
      () => {
        if (this.state.selectChange) {
          this.state.selectChange(tagFieldName as string, [id]);

          if (!tagOptions) return;

          const optionsArray = Array.isArray(tagOptions) ? tagOptions : [tagOptions];
          optionsArray.forEach((option) => {
            if (option.optionValue === id && option.needInput) {
              const inputValue = this.state.selectMap[option.inputField!] 
                ? this.state.selectChange!(option.inputField!, this.state.selectMap[option.inputField!])
                : this.state.selectChange!(option.inputField!, option.inputValue);
            }
          });
        }
      }
    );
  };

  private handleMultiChoiceChange = (fieldName: string, value: any): void => {
    const updatedSelectMap = Object.assign(this.state.selectMap, { name: value });

    this.setState(
      { selectMap: updatedSelectMap },
      () => {
        this.state.selectChange?.(fieldName, value);
      }
    );
  };

  private handleTextChange = (fieldName: string, event: React.ChangeEvent<HTMLInputElement>): void => {
    const textMap = this.state.textMap;
    textMap[fieldName] = event.currentTarget.value;
    this.setState({ textMap });
  };

  private getOptions = (option: TagOption | TagOption[]): SelectItem[] => {
    const items: SelectItem[] = [];

    if (Array.isArray(option)) {
      option.forEach((opt) => {
        items.push(...this.getOptions(opt));
      });
    } else {
      items.push({
        id: option.optionValue,
        name: option.dispName
      });
    }

    return items;
  };

  private renderSingle = (item: TagItem, options: SelectItem[]): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    const selectedValues: (string | number)[] = [];
    const selectedOptions: TagOption[] = [];
    let optionIndex = 0;

    const tagOptionsArray = Array.isArray(item.tagOptions) ? item.tagOptions : [item.tagOptions];

    tagOptionsArray.forEach((tagOption) => {
      if (Array.isArray(tagOption)) {
        tagOption.forEach((opt) => {
          const fieldNames = item.tagFieldName as string[];
          if (opt.optionValue === this.state.selectMap[fieldNames[optionIndex]]) {
            selectedValues.push(opt.optionValue);
            selectedOptions.push(opt);
          }
        });
        optionIndex++;
      } else {
        const fieldName = item.tagFieldName as string;
        if (tagOption.optionValue === this.state.selectMap[fieldName]?.[0]) {
          selectedValues.push(tagOption.optionValue);
          selectedOptions.length = 0;
          selectedOptions.push(tagOption);
        }
      }
    });

    let additionalElement: JSX.Element | undefined;
    const selectElements: JSX.Element[] = [];
    let shouldRender = true;

    if (Array.isArray(item.tagFieldName)) {
      item.tagFieldName.forEach((fieldName, index) => {
        if (shouldRender) {
          const selectElement = (
            <Select
              dropdownClassName="content-tag-select-popup"
              className={`${fieldName} content-tag-select`}
              defaultValue={selectedValues[index]}
              onChange={(value: string | number) => {
                const selectedOption = options.find((opt) => opt.id === value);
                if (selectedOption) {
                  this.handleItemChange(item, selectedOption);
                }
              }}
            >
              {options.map((opt) => (
                <Option key={opt.id} value={opt.id} title={opt.name}>
                  {opt.name}
                </Option>
              ))}
            </Select>
          );
          selectElements.push(selectElement);
        }

        if (fieldName === 'door_hole_tag' && this.state.selectMap[fieldName] === 'none') {
          shouldRender = false;
        }
      });
    } else {
      const selectElement = (
        <Select
          dropdownClassName="content-tag-select-popup"
          className={`${item.tagFieldName} content-tag-select`}
          defaultValue={selectedValues[0]}
          onChange={(value: string | number) => {
            const selectedOption = options.find((opt) => opt.id === value);
            if (selectedOption) {
              this.handleItemChange(item, selectedOption);
            }
          }}
        >
          {options.map((opt) => (
            <Option key={opt.id} value={opt.id} title={opt.name}>
              {opt.name}
            </Option>
          ))}
        </Select>
      );
      selectElements.push(selectElement);
    }

    const firstFieldName = Array.isArray(item.tagFieldName) ? item.tagFieldName[0] : item.tagFieldName;
    if (firstFieldName === 'ceiling_make_type') {
      additionalElement = (
        <div className="clear">
          <span className="type">
            {(window as any).ResourceManager.getString('right_property_tag_field_make_type_tag')}
          </span>
          <span className="stack">
            {(window as any).ResourceManager.getString('right_property_tag_field_stack_level')}
          </span>
        </div>
      );
    }

    const selectedOption = selectedOptions[0];
    if (selectedOption?.needInput) {
      const inputValue = selectedOption.inputValue || 0;
      const needOriginValue = !!selectedOption.needOriginValue;
      const isWindowHoleTag = item.tagFieldName === 'window_hole_tag';
      const numberInputProps = {
        unit: selectedOption.inputUnit === 'auto' 
          ? (window as any).HSApp.App.getApp().floorplan.displayLengthUnit 
          : '',
        label: selectedOption.inputFieldLabel,
        hideLabel: isWindowHoleTag,
        name: selectedOption.inputField,
        className: `tagInput ${firstFieldName}_input`,
        options: {
          showTunningButtons: false,
          rules: {
            range: { min: 0, max: 1000 },
            positiveOnly: true
          },
          includeUnit: true,
          readOnly: false,
          needOriginValue
        },
        value: inputValue * 1000,
        onValueChange: (value: number) => {
          this.state.selectChange?.(selectedOption.inputField!, value / 1000);
        }
      };

      elements.push(
        <div className="tagDialogItem tagDialogItemSingle" key={firstFieldName}>
          <div className="label">{item.label}</div>
          <div className="comp">
            {selectElements}
            {additionalElement}
            <NumberInput {...numberInputProps} />
          </div>
        </div>
      );
    } else {
      elements.push(
        <div className="tagDialogItem tagDialogItemSingle" key={firstFieldName}>
          <div className="label">{item.label}</div>
          <div className="comp">
            {selectElements}
            {additionalElement}
          </div>
        </div>
      );
    }

    return elements;
  };

  private renderMulti = (item: TagItem, options: SelectItem[]): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    const multiChoiceData = {
      items: options,
      selectKeys: item.selectKeys,
      selectChange: this.handleMultiChoiceChange,
      name: item.tagFieldName as string
    };

    const MultiChoiceComponent = (window as any).MultiChoiceComponent;

    elements.push(
      <div className="tagDialogItem tagDialogItemMulti" key={item.tagFieldName as string}>
        <div className="tagDialogItemLabelMulti">{item.label}:</div>
        <MultiChoiceComponent data={multiChoiceData} />
      </div>
    );

    return elements;
  };

  private renderInput = (item: TagItem): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    let inputValue = '';

    if (item.tagFieldValue) {
      inputValue = item.tagFieldValue;
    }

    if (this.state.textMap[item.tagFieldName as string]) {
      inputValue = this.state.textMap[item.tagFieldName as string];
    }

    if (inputValue !== '') {
      elements.push(
        <div className="tagDialogItem" key={item.tagFieldName as string}>
          <div className="tagDialogItemLabel">{item.label}:</div>
          <input
            type="text"
            onBlur={(event) => {
              this.state.selectChange?.(item.tagFieldName as string, event.currentTarget.value);
            }}
            value={inputValue}
            onChange={(event) => {
              this.handleTextChange(item.tagFieldName as string, event);
            }}
          />
        </div>
      );
    } else {
      elements.push(
        <div className="tagDialogItem" key={item.tagFieldName as string}>
          <div className="tagDialogItemLabel">{item.label}:</div>
          <input
            type="text"
            onBlur={(event) => {
              this.state.selectChange?.(item.tagFieldName as string, event.currentTarget.value);
            }}
          />
        </div>
      );
    }

    return elements;
  };

  render(): JSX.Element {
    const { items } = this.state;
    const elements: JSX.Element[] = [];

    items.forEach((item) => {
      const options = this.getOptions(item.tagOptions);

      if (item.tagOptionType === TagOptionType.Single) {
        elements.push(...this.renderSingle(item, options));
      } else if (item.tagOptionType === TagOptionType.Multi) {
        elements.push(...this.renderMulti(item, options));
      } else if (item.tagOptionType === TagOptionType.Input) {
        elements.push(...this.renderInput(item));
      }
    });

    return <div className="tagDialogContent">{elements}</div>;
  }
}

export default TagDialogContent;