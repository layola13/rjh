interface FeedbackStatus {
  iconName: string;
  title: string;
  description?: string;
}

interface MessageParams {
  msgNumber?: number;
}

interface StatusParams {
  description?: string;
}

type FeedbackStatusType = 'MESSAGE' | 'SUBMITTED' | 'CLOSED' | 'PROCESSING' | 'COMPLETED';

interface FeedbackStatusHandler {
  MESSAGE: (params: MessageParams) => FeedbackStatus;
  SUBMITTED: (params: StatusParams) => FeedbackStatus;
  CLOSED: (params: StatusParams) => FeedbackStatus;
  PROCESSING: (params: StatusParams) => FeedbackStatus;
  COMPLETED: (params: StatusParams) => FeedbackStatus;
}

declare const ResourceManager: {
  getString(key: string): string;
};

const feedbackStatusHandler: FeedbackStatusHandler = {
  MESSAGE: (params: MessageParams): FeedbackStatus => {
    const msgNumber = params.msgNumber ?? 0;
    return {
      iconName: "hs_mian_xinxi",
      title: ResourceManager.getString("plugin_feedback_receive_message_front") + msgNumber + ResourceManager.getString("plugin_feedback_receive_message_back")
    };
  },

  SUBMITTED: (params: StatusParams): FeedbackStatus => {
    const description = params.description;
    return {
      iconName: "hs_mian_tishi",
      title: ResourceManager.getString("plugin_feedback_problems_submitted"),
      description
    };
  },

  CLOSED: (params: StatusParams): FeedbackStatus => {
    const description = params.description;
    return {
      iconName: "hs_mian_tishi",
      title: ResourceManager.getString("plugin_feedback_problems_closed"),
      description
    };
  },

  PROCESSING: (params: StatusParams): FeedbackStatus => {
    const description = params.description;
    return {
      iconName: "hs_mian_tishi",
      title: ResourceManager.getString("plugin_feedback_problems_handling"),
      description
    };
  },

  COMPLETED: (params: StatusParams): FeedbackStatus => {
    const description = params.description;
    return {
      iconName: "hs_mian_wancheng",
      title: ResourceManager.getString("plugin_feedback_problems_solved"),
      description
    };
  }
};

export default feedbackStatusHandler;