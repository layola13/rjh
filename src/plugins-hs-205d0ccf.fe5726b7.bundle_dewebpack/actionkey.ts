export enum ActionKey {
  Delete = 0,
  Download = 1,
  Share = 2,
  Mark = 3,
  Generate = 4,
  Upgrade = 5,
  FeedBack = 6
}

export interface TooltipItem {
  key: string | number;
  title: string;
  icon: string;
  disable?: boolean;
  callback?: () => void;
}

export interface CardTooltipProps {
  tooltipItems: TooltipItem[];
}

interface ResourceManager {
  getString(key: string): string;
}

declare const ResourceManager: ResourceManager;

export const CardTooltip: React.FC<CardTooltipProps> = ({ tooltipItems }) => {
  const handleClick = (event: React.MouseEvent, item: TooltipItem): void => {
    item.callback?.();
    event.stopPropagation();
  };

  const enabledItems = tooltipItems.filter((item) => !item.disable);

  return (
    <div className="tooltip-items">
      {enabledItems.map((item) => {
        const title = ResourceManager.getString(item.title);

        return (
          <Tooltip
            key={item.key}
            title={title}
            color="dark"
            placement="top"
          >
            <div
              className="tooltip-item"
              onClick={(event) => handleClick(event, item)}
            >
              <IconfontView
                showType={item.icon}
                customStyle={{
                  fontSize: "16px",
                  color: "#fff"
                }}
              />
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};

interface TooltipProps {
  title: string;
  color: string;
  placement: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

declare const Tooltip: React.FC<TooltipProps>;

interface IconfontViewProps {
  showType: string;
  customStyle?: React.CSSProperties;
}

declare const IconfontView: React.FC<IconfontViewProps>;