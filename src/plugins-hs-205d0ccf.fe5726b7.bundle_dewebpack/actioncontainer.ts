import React from 'react';
import { IconfontView, Tooltip } from './components';
import vipIconSrc from './assets/vip-icon';

interface ActionItem {
  name: string;
  icon: string;
  disable: boolean;
  unable?: boolean;
  showVip?: boolean;
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  toolTipCom?: (action: ActionItem) => React.ReactNode;
}

interface ActionContainerProps {
  actionList: ActionItem[];
}

export const ActionContainer: React.FC<ActionContainerProps> = ({ actionList }) => {
  const enabledActions = actionList.filter((action) => !action.disable);

  const getTooltipContent = (action: ActionItem): React.ReactNode => {
    const { name, toolTipCom } = action;
    return toolTipCom ? toolTipCom(action) : name;
  };

  const renderVipIcon = () => (
    <div className="vipIcon">
      <img src={vipIconSrc} alt="VIP" />
    </div>
  );

  const renderActionIcon = (action: ActionItem) => (
    <div
      className={`action_item ${action.unable ? 'unable' : ''}`}
      onClick={action.handleClick}
    >
      <IconfontView
        showType={action.icon}
        customStyle={{ fontSize: '20px' }}
      />
    </div>
  );

  const renderInfoIcon = (action: ActionItem) => (
    <Tooltip
      title={getTooltipContent(action)}
      color="dark"
      placement="top"
      overlayClassName={action.toolTipCom ? 'containerTip' : ''}
    >
      <div
        className="action_item_icon"
        onClick={(event) => event.stopPropagation()}
      >
        <IconfontView
          showType="hs_shuxingmianban_jieshihei"
          customStyle={{ fontSize: '16px' }}
        />
      </div>
    </Tooltip>
  );

  const renderActionWithTooltip = (action: ActionItem) => (
    <div className="itemWrapper" key={action.name}>
      {action.showVip && renderVipIcon()}
      {renderActionIcon(action)}
      {renderInfoIcon(action)}
    </div>
  );

  const renderActionWithSimpleTooltip = (action: ActionItem) => (
    <Tooltip
      title={getTooltipContent(action)}
      color="dark"
      placement="top"
      key={action.name}
    >
      <div className="itemWrapper">
        {action.showVip && renderVipIcon()}
        {renderActionIcon(action)}
      </div>
    </Tooltip>
  );

  return (
    <div className="action_container">
      {enabledActions.map((action) =>
        action.toolTipCom
          ? renderActionWithTooltip(action)
          : renderActionWithSimpleTooltip(action)
      )}
    </div>
  );
};