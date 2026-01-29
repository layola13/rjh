import Checkbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';

const AntCheckbox = Checkbox;
AntCheckbox.Group = CheckboxGroup;
AntCheckbox.__ANT_CHECKBOX = true;

export default AntCheckbox;