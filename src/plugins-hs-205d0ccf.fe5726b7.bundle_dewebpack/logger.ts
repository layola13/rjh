import { log } from './log-utils';
import { signalArticleViewOpen } from './article-view-signals';
import { signalShowModel } from './model-signals';
import { signalPagePush } from './page-signals';

interface ArticleViewData {
  id: string;
  articleUrl: string;
  articleTitle: string;
  from?: {
    id: string;
    name: string;
  };
}

interface ArticleViewEvent {
  data: ArticleViewData;
}

interface PagePushEvent {
  data: unknown;
}

interface ClicksRatioSubItem {
  id: string;
  name: string;
  subItem?: ClicksRatioSubItem;
}

interface LogOptions {
  actionType: string;
  description: string;
  clicksRatio: ClicksRatioSubItem;
}

interface EventTrackInstance {
  track(group: string, event: string, params?: Record<string, unknown>): void;
}

declare global {
  const HSApp: {
    Util: {
      EventTrack: {
        instance(): EventTrackInstance;
      };
      EventGroupEnum: {
        TeachingAbility: string;
      };
    };
  };
}

export class Logger {
  constructor() {}

  articleViewOpen(event: ArticleViewEvent): void {
    const data = event.data;
    
    log({
      actionType: "plugin.tutorial.ArticleView.open",
      description: "打开教程内容",
      clicksRatio: {
        id: "tutorial",
        name: "教程",
        subItem: {
          id: data.from?.id ?? "",
          name: data.from?.name ?? "",
          subItem: {
            id: data.articleUrl,
            name: data.articleTitle
          }
        }
      }
    });

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.TeachingAbility,
      "select_tutorial_event",
      {
        tutorial_id: data.id
      }
    );
  }

  showModel(): void {
    log({
      actionType: "plugin.tutorial.show",
      description: "打开教程弹框",
      clicksRatio: {
        id: "tutorial",
        name: "教程"
      }
    });

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.TeachingAbility,
      "open_tutorial_pannel_event"
    );
  }

  pagePush(event: PagePushEvent): void {
    const data = event.data;
  }

  onActive(): void {
    signalArticleViewOpen.listen(this.articleViewOpen);
    signalShowModel.listen(this.showModel);
    signalPagePush.listen(this.pagePush);
  }

  onDeactive(): void {
    signalArticleViewOpen.unlistenAll();
    signalShowModel.unlistenAll();
    signalPagePush.unlistenAll();
  }
}