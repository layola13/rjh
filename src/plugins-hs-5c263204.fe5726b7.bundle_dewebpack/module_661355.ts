import { Notification, IconfontView } from './notification-library';
import React from 'react';

enum StateEnum {
  MESSAGE = "MESSAGE"
}

interface ContentTemplateOptions {
  description?: string;
  msgNumber?: number;
}

interface NotificationContent {
  title: string;
  description: string;
  iconName: string;
}

interface NotificationTemplate {
  [key: string]: (options: ContentTemplateOptions) => NotificationContent;
}

const notificationTemplates: NotificationTemplate = {
  MESSAGE: (options: ContentTemplateOptions): NotificationContent => ({
    title: "消息通知",
    description: options.description || "",
    iconName: "hs_message_icon"
  })
};

const MESSAGE_TIME_WINDOW = 30000; // 30 seconds
const NOTIFICATION_DURATION = 5;
const NOTIFICATION_TOP_OFFSET = 46;

export default class NotificationHandler {
  private _msgTimeArr: number[];

  constructor() {
    this._msgTimeArr = [];
  }

  /**
   * Handle notification display
   * @param state - The state type of the notification
   * @param description - Description text for the notification
   * @param onButtonClick - Callback function when button is clicked
   */
  public handle(state: string, description: string, onButtonClick: () => void): void {
    let msgNumber = 0;
    
    if (state === StateEnum.MESSAGE) {
      msgNumber = this.calculateMsgNumber();
    }

    const content = this.contentTemplate(state, {
      description,
      msgNumber
    });

    this.showNotification(content, onButtonClick);
  }

  /**
   * Display the notification with specified content
   * @param content - Notification content object
   * @param onButtonClick - Callback for button click
   */
  private showNotification(content: NotificationContent, onButtonClick: () => void): void {
    Notification.destroy();

    const notificationKey = `open${Date.now()}`;

    const buttonElement = React.createElement(
      "span",
      {
        onClick: () => {
          Notification.close(notificationKey);
          onButtonClick();
        }
      },
      React.createElement(IconfontView, {
        showType: "hs_mian_youjiantou",
        customStyle: {
          fontSize: "12px",
          color: "#1c1c1c"
        }
      })
    );

    Notification.open({
      className: "feedbackNotification",
      message: content.title,
      description: content.description,
      btn: buttonElement,
      key: notificationKey,
      duration: NOTIFICATION_DURATION,
      closeIcon: React.createElement(IconfontView, {
        showType: "hs_xian_guanbi",
        customStyle: {
          color: "#1c1c1c",
          fontSize: "12px"
        }
      }),
      icon: React.createElement(IconfontView, {
        showType: content.iconName,
        customStyle: {
          fontSize: "20px",
          color: "#1c1c1c"
        }
      }),
      top: NOTIFICATION_TOP_OFFSET
    });
  }

  /**
   * Generate notification content based on state and options
   * @param state - The notification state type
   * @param options - Template options
   * @returns Notification content object
   */
  private contentTemplate(state: string, options: ContentTemplateOptions): NotificationContent {
    const description = options.description ?? "";
    const msgNumber = options.msgNumber ?? 1;

    return notificationTemplates[state]({
      description,
      msgNumber
    });
  }

  /**
   * Calculate the number of messages within the time window
   * @returns Number of messages in the last 30 seconds
   */
  private calculateMsgNumber(): number {
    const currentTime = Date.now();
    this._msgTimeArr.push(currentTime);

    const recentMessages = this._msgTimeArr.filter(
      timestamp => currentTime - timestamp <= MESSAGE_TIME_WINDOW
    );

    const messageCount = recentMessages.length;
    this._msgTimeArr = recentMessages;

    return messageCount;
  }
}