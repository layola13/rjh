export interface SelectOptionComponent {
  (): null;
  isSelectOption: boolean;
}

const SelectOption: SelectOptionComponent = () => {
  return null;
};

SelectOption.isSelectOption = true;

export default SelectOption;