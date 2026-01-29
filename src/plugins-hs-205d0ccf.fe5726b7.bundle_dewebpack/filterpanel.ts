export enum FilterType {
  RoomType = "roomType",
  Styler = "styler"
}

interface FilterItem {
  code: string;
  name: string;
}

interface FilterCategory {
  type: FilterType;
  list: FilterItem[];
}

interface FilterPanelProps {
  show: boolean;
  filterItems: FilterCategory[];
  callback?: (filters: Partial<Record<FilterType, string>>) => void;
}

interface FilterState {
  roomType?: string;
  styler?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = (props) => {
  const [displayCategories, setDisplayCategories] = useState<FilterCategory[]>([]);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  useEffect(() => {
    if (props.filterItems.length) {
      const updatedCategories = props.filterItems.map((category, index) => {
        const filteredList = category.list.filter((item) => {
          return selectedCodes[index] 
            ? item.code !== selectedCodes[index] 
            : item.code !== "all";
        });

        return {
          ...category,
          list: filteredList
        };
      });

      setDisplayCategories(updatedCategories);
    }
  }, [props.filterItems]);

  useEffect(() => {
    if (props.show) {
      const codes: string[] = [];
      const names: string[] = [];

      props.filterItems.forEach((category) => {
        const items = category.list;
        const code = items[0].code !== "all" ? items[0].code : "";
        codes.push(code);
        names.push(items[0].name);
      });

      setSelectedCodes(codes);
      setSelectedNames(names);
    }
  }, [props.show]);

  const getDisplayName = (type: FilterType, code?: string): string => {
    const category = props.filterItems.find((item) => item.type === type);
    
    if (!category) {
      return code ?? "";
    }

    const item = category.list?.find((listItem) => 
      listItem.code === code || listItem === code
    );

    return item?.name ?? (item as unknown as string) ?? "";
  };

  const handleFilterChange = (type: FilterType, code: string): void => {
    const selectedCode = code !== "all" ? code : undefined;
    
    const filterState: FilterState = {
      roomType: selectedCodes[0],
      styler: selectedCodes[1]
    };

    const categoryIndex = props.filterItems.findIndex((item) => item.type === type);
    
    const newCodes = Array.from(selectedCodes);
    newCodes[categoryIndex] = selectedCode ?? "";
    setSelectedCodes(newCodes);

    const newNames = Array.from(selectedNames);
    const displayName = getDisplayName(type, selectedCode);
    newNames[categoryIndex] = displayName;
    setSelectedNames(newNames);

    if (selectedCode) {
      filterState[type] = selectedCode;
    } else {
      delete filterState[type];
    }

    props.callback?.(filterState);
  };

  const getCurrentDisplayName = (type: FilterType): string => {
    const categoryIndex = props.filterItems.findIndex((item) => item.type === type);
    const category = props.filterItems[categoryIndex];
    const defaultName = category.list[0]?.name ?? "";

    return selectedNames[categoryIndex] ?? defaultName;
  };

  return (
    <div className="filter-panel">
      {props.show && displayCategories?.map((category) => (
        <div key={category.type}>
          <Dropdown
            overlay={
              <Menu
                onClick={(menuInfo) => handleFilterChange(category.type, menuInfo.key)}
                className="spark-filter-panel menu-items"
              >
                {category.list.map((item) => (
                  <Menu.Item
                    key={item?.code ?? item}
                    className="spark-filter-panel menu-item"
                  >
                    {item?.name ?? item}
                  </Menu.Item>
                ))}
              </Menu>
            }
            placement="bottomCenter"
          >
            <Button className="dropdown-btn">
              <span>{getCurrentDisplayName(category.type)}</span>
              <IconfontView
                showType="hs_xiao_danjiantou_xia"
                customStyle={{
                  fontSize: "8px",
                  color: "#ffffffdb"
                }}
              />
            </Button>
          </Dropdown>
        </div>
      ))}
    </div>
  );
};