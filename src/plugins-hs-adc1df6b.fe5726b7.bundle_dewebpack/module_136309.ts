import { useMemo, createElement } from 'react';
import { IconfontView } from './IconfontView';

interface InboxHint {
  title: string;
  titleSecond: string;
  titleMdsKeyValue: string;
  titleSecondMdsKeyValue: string;
  content: string;
  contentSecond: string;
  linkName: string;
  linkNameSecond: string;
  linkNameMdsKeyValue: string;
  linkNameSecondMdsKeyValue: string;
  linkUrl: string;
  linkSecondUrl: string;
  headerColor: string;
  headerSecondColor: string;
  buttonColor: string;
  buttonSecondColor: string;
  buttonFontColor: string;
  sourcePage: string;
  titleMdsKey: string;
  linkType: string;
  copyValue: string;
}

interface PopoverProps {
  inboxHint: InboxHint | null;
  alertTime: number;
  hidePopover: () => void;
}

interface ComputedHintData {
  title: string;
  content: string;
  linkName: string;
  linkUrl: string;
}

const ALERT_TIME_SECONDARY = 2;
const MESSAGE_CENTER_TAB_KEY = '3';
const EVENT_GROUP = 'Pageheader';
const EVENT_CLOSE = 'notice_inboxbubble_close_event';
const EVENT_CLICK = 'notice_inboxbubble_click_event';
const LINK_TYPE_COPY_AND_OPEN_MARKET = 'copyAndOpenMarket';
const BLACK_FRIDAY_CODE_ID = 'blackFridayCode';

export default function InboxHintPopover(props: PopoverProps): JSX.Element | null {
  const { inboxHint, alertTime, hidePopover } = props;

  if (!inboxHint) {
    return null;
  }

  const computedHintData = useMemo<ComputedHintData>(() => {
    const {
      title,
      titleSecond,
      titleMdsKeyValue,
      titleSecondMdsKeyValue,
      content,
      contentSecond,
      linkName,
      linkNameSecond,
      linkNameMdsKeyValue,
      linkNameSecondMdsKeyValue,
      linkUrl,
      linkSecondUrl
    } = inboxHint;

    const isSecondaryAlert = alertTime === ALERT_TIME_SECONDARY;

    return {
      title: isSecondaryAlert ? (titleSecondMdsKeyValue || titleSecond) : (titleMdsKeyValue || title),
      content: isSecondaryAlert ? contentSecond : content,
      linkName: isSecondaryAlert ? (linkNameSecondMdsKeyValue || linkNameSecond) : (linkNameMdsKeyValue || linkName),
      linkUrl: isSecondaryAlert ? linkSecondUrl : linkUrl
    };
  }, [alertTime, inboxHint]);

  const { title, content, linkName, linkUrl } = computedHintData;

  const headerStyle = {
    backgroundImage: `linear-gradient(90deg, ${inboxHint.headerColor} 0%, ${inboxHint.headerSecondColor} 99%)`
  };

  const buttonStyle = {
    backgroundImage: `linear-gradient(90deg, ${inboxHint.buttonColor} 0%, ${inboxHint.buttonSecondColor} 99%)`,
    color: inboxHint.buttonFontColor || 'white'
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    const messageCenterUrl = HSApp.Util.Url.addParam(
      HSApp.PartnerConfig.MESSAGECENTER_URL,
      'tabkey',
      MESSAGE_CENTER_TAB_KEY
    );
    window.open(messageCenterUrl, '_blank', 'noopener=yes, noreferrer=yes');
  };

  const handleCloseClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    const { sourcePage, titleMdsKey } = inboxHint;
    HSApp.Util.EventTrack.instance().track(EVENT_GROUP, EVENT_CLOSE, {
      source_page: sourcePage || titleMdsKey
    });
    hidePopover();
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    const { linkType, copyValue, sourcePage, titleMdsKey } = inboxHint;

    if (linkType === LINK_TYPE_COPY_AND_OPEN_MARKET) {
      let inputElement = document.querySelector<HTMLInputElement>(`#${BLACK_FRIDAY_CODE_ID}`);
      
      if (!inputElement) {
        inputElement = document.createElement('input');
        inputElement.id = BLACK_FRIDAY_CODE_ID;
      }
      
      inputElement.value = copyValue || '';
      inputElement.style.position = 'absolute';
      inputElement.style.bottom = '-18px';
      document.body.appendChild(inputElement);
      inputElement.select();
      inputElement.setSelectionRange(0, inputElement.value.length);
      document.execCommand('copy');

      const marketingBadgePlugin = HSApp.App.getApp().pluginManager.getPlugin(
        HSFPConstants.PluginType.MarketingBadge
      );
      
      if (marketingBadgePlugin) {
        marketingBadgePlugin.showMarketModal('all', linkUrl);
      }
    } else {
      window.open(linkUrl, '_blank');
    }

    HSApp.Util.EventTrack.instance().track(EVENT_GROUP, EVENT_CLICK, {
      source_page: sourcePage || titleMdsKey
    });
    hidePopover();
  };

  return createElement('div', {
    className: 'popover-container',
    onClick: handleContainerClick
  },
    createElement('div', {
      className: 'header',
      style: headerStyle
    },
      createElement('div', {
        className: 'angle',
        style: {
          borderColor: `transparent transparent ${inboxHint.headerSecondColor} transparent`
        }
      })
    ),
    createElement('div', {
      className: 'content-main'
    },
      createElement('div', {
        className: 'title-container'
      },
        createElement('span', {
          className: 'title'
        }, title),
        createElement(IconfontView, {
          iconOnclick: handleCloseClick,
          customClass: 'popover-container-close',
          showType: 'hs_xian_guanbi',
          customStyle: {
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold'
          }
        })
      ),
      createElement('div', {
        className: 'content',
        dangerouslySetInnerHTML: {
          __html: content
        }
      }),
      createElement('div', {
        className: 'btn-in-popover',
        onClick: handleButtonClick,
        style: buttonStyle
      }, linkName)
    )
  );
}