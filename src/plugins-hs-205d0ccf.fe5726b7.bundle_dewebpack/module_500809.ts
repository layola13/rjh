import MenuItem from './MenuItem';

type MenuItemType = 'radio';

interface RadioMenuItemData {
  label: string;
  tooltip: string;
  groupId: string;
  icon: string;
  iconhover: string;
  catagory: string;
  lineType: string;
  isChecked: boolean;
  onchange: (checked: boolean) => void;
  cancelRadioStatus: (groupId: string) => void;
  onclick?: () => void;
}

interface RadioMenuItemProps extends Partial<RadioMenuItemData> {
  name: string;
  [key: string]: unknown;
}

interface ParentMenu {
  childItems: MenuItem[];
}

export default function createRadioMenuItem(BaseMenuItem: typeof MenuItem) {
  return class RadioMenuItem extends BaseMenuItem {
    declare data: RadioMenuItemData;
    declare parent: ParentMenu;

    constructor(props: RadioMenuItemProps, context?: unknown) {
      const { name, ...restProps } = props;

      super(name, context);

      Object.assign(this.data, {
        label: '',
        tooltip: '',
        groupId: '',
        icon: '',
        iconhover: '',
        catagory: '',
        lineType: '',
        isChecked: !!props.isChecked,
        onchange: () => {},
        cancelRadioStatus: () => {}
      });

      this.setData(restProps);
    }

    get type(): MenuItemType {
      return 'radio';
    }

    setChecked(checked: boolean): void {
      if (checked && !this.data.isChecked) {
        this.cancelRadioStatus(this.data.groupId);
      }
      this.setData({ isChecked: checked });
    }

    cancelRadioStatus(groupId: string): void {
      if (!groupId) return;

      this.parent.childItems.forEach((item: MenuItem) => {
        if (item.type === 'radio') {
          const radioItem = item as RadioMenuItem;
          if (radioItem.data.groupId !== groupId) return;
          if (radioItem.data.isChecked) {
            radioItem.data.isChecked = false;
          }
        }
      });
    }

    click(): void {
      if (this.data.onclick) {
        this.data.onclick();
      }

      if (!this.data.isChecked) {
        this.setChecked(!this.data.isChecked);
        super.click?.();
      }
    }

    setData(data: Partial<RadioMenuItemData>): void {
      if (!data) return;

      const previousChecked = this.data.isChecked;
      super.setData?.(data);

      if (previousChecked !== this.data.isChecked) {
        this.data.onchange(this.data.isChecked);
      }
    }
  };
}