import { useState, useEffect, default as React } from 'react';
import { Badge, Checkbox } from 'some-ui-library';
import { CardTooltip } from './CardTooltip';

interface ImageItem {
  taskId: string;
  imageName: string;
  resolutionRatio: string;
}

interface TooltipItem {
  label: string;
  value: string;
}

interface CompleteCardProps {
  src: string;
  isNew: boolean;
  item: ImageItem;
  checked: boolean;
  onCheckedChange?: (item: ImageItem) => void;
  handleClick: (item: ImageItem) => void;
  tooltipItems: TooltipItem[];
}

export const CompleteCard: React.FC<CompleteCardProps> = (props) => {
  const {
    src,
    isNew,
    item,
    checked,
    onCheckedChange,
    handleClick,
    tooltipItems
  } = props;

  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const [showNewBadge, setShowNewBadge] = useState<boolean>(isNew);

  useEffect(() => {
    setIsChecked(props.checked);
  }, [props.checked]);

  useEffect(() => {
    setShowNewBadge(props.isNew);
  }, [props.isNew]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newCheckedState = e.target.checked;
    setIsChecked(newCheckedState);
    onCheckedChange?.(item);
  };

  const handleViewMoreClick = (): void => {
    handleClick(item);
  };

  const checkboxClassName = isChecked ? 'card-checkbox checked' : 'card-checkbox';
  const backgroundImageStyle = { backgroundImage: `url(${src})` };

  return (
    <Badge dot={showNewBadge}>
      <div className="grid-viewer-card">
        <div className="card-wrapper">
          <div className="card-img" style={backgroundImageStyle}>
            <div className="card-corner-sign">
              {ResourceManager.getString(item.resolutionRatio)}
            </div>
          </div>
          <div className="card-bottom">
            <div className="card-name">{item.imageName}</div>
          </div>
          <Checkbox
            className={checkboxClassName}
            data-item-uid={item.taskId}
            checked={checked}
            onChange={handleCheckboxChange}
          />
          <div className="hover-mask" />
          <div className="click-view-more" onClick={handleViewMoreClick}>
            {ResourceManager.getString('plugin_render_view_detail')}
          </div>
        </div>
        <CardTooltip tooltipItems={tooltipItems} />
      </div>
    </Badge>
  );
};