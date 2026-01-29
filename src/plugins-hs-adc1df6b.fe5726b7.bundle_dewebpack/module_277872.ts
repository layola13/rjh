interface TabItem {
  label: string;
  value: string;
  tooltip?: string;
  imgUrl?: string;
  className?: string;
}

interface TabsSelectProps {
  onChange?: (index: number, tab: TabItem, value?: string) => void;
  className?: string;
  defaultValue?: string;
  defaultIndex?: number;
  disabled?: boolean;
  tabs?: TabItem[];
  [key: string]: unknown;
}

interface ComponentProps {
  data: TabsSelectProps;
  id: string;
}

export default function PropertyBarTabsSelect(props: ComponentProps): JSX.Element {
  const { data, id } = props;
  const {
    onChange,
    className = '',
    defaultValue,
    defaultIndex,
    disabled = false,
    tabs,
    ...restProps
  } = data;

  let finalIndex = defaultIndex;

  if (defaultValue && tabs) {
    const foundIndex = tabs.findIndex((tab) => tab.value === defaultValue);
    if (foundIndex !== -1) {
      finalIndex = foundIndex;
    }
  }

  const handleChange = (index: number, tab: TabItem): void => {
    if (!disabled && tabs) {
      const value = tabs[index]?.value;
      onChange?.(index, tab, value);
    }
  };

  const renderTabs = (): JSX.Element[] => {
    if (!tabs) {
      return [];
    }

    return tabs.map((tab) => {
      const { label, tooltip, imgUrl, className: tabClassName } = tab;

      if (tooltip) {
        return (
          <Tooltip
            placement="top"
            color="dark"
            title={
              <>
                <img src={imgUrl} alt="" />
                <span>{tooltip}</span>
              </>
            }
            overlayClassName={tabClassName}
          >
            <SmartText>{label}</SmartText>
          </Tooltip>
        );
      }

      return <SmartText>{label}</SmartText>;
    });
  };

  return (
    <div id={id} className={`property-bar-tabs-select ${className}`}>
      {disabled && <div className="property-bar-tabs-select-disabled" />}
      <TabsSelect
        defaultIndex={finalIndex}
        onChange={handleChange}
        tabs={renderTabs()}
        {...restProps}
      />
    </div>
  );
}