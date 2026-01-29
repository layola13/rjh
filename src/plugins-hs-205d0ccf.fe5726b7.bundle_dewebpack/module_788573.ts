interface RecommendData {
  id: string;
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
  type?: string;
  sub_list?: RecommendData[];
  softClothData?: unknown;
}

interface RecommendRequestPayload {
  house_id: string;
  room_id: string;
  plat_id: string;
  plat_entity: string;
  house_data: Record<string, unknown>;
  room_data: unknown;
  layout_number: number;
  propose_number: number;
  layout_mode: number;
  requestId: string;
}

interface RecommendResponse {
  ret?: string;
  data?: {
    group_scheme?: RecommendData[][];
  };
}

interface Content {
  id: string;
  seekId: string;
  contentType?: {
    getTypeString(): string;
    isTypeOf(type: string): boolean;
  };
  isFlagOn(flag: number): boolean;
}

interface AppInstance {
  designMetadata: Map<string, string>;
  cmdManager: CommandManager;
}

interface CommandManager {
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command): Content[];
}

interface Command {
  type: string;
  args: unknown[];
}

interface LogPayload {
  type: 'recommendAccessories' | 'reset' | 'changeScheme';
}

interface TrackPayload {
  sCategory?: string;
  source?: string;
}

const RECOMMEND_TIMEOUT = 15000;
const LIVE_HINT_DURATION = 3000;
const LAYOUT_NUMBER = 2;
const PROPOSE_NUMBER = 3;
const LAYOUT_MODE = 20;

export default class RecommendAccessoriesManager {
  private readonly _app: AppInstance;
  private _currentIndex: number;
  private _targetSpace: unknown;
  private _previousData: Content[];
  private _anchorContent?: Content;
  private readonly _allContentsDataMap: Map<number, Content[]>;
  public readonly signalRecommendAccessoriesToLog: HSCore.Util.Signal<LogPayload>;

  constructor(app: AppInstance) {
    this._app = app;
    this._currentIndex = 0;
    this._targetSpace = undefined;
    this._previousData = [];
    this._allContentsDataMap = new Map();
    this.signalRecommendAccessoriesToLog = new HSCore.Util.Signal();
  }

  public init(): void {
    this._currentIndex = 0;
    this._targetSpace = undefined;
    this._previousData = [];
    this._allContentsDataMap = new Map();
  }

  public showLoading(): void {
    HSApp.UI.FullScreenLoading.show(ResourceManager.getString('autoRecommend_loading'));
  }

  public hideLoading(): void {
    HSApp.UI.FullScreenLoading.hide();
  }

  private _isContentExist = (contents: Content[]): boolean => {
    return contents.some((content) => {
      return content && content.isFlagOn && !content.isFlagOn(HSCore.Model.EntityFlagEnum.removed);
    });
  };

  public startRecommendProcess = (anchorContent: Content): void => {
    this.showLoading();
    this._targetSpace = HSApp.Util.Recommend.getTargetSpace(anchorContent);
    const designStyle = HSApp.Util.Recommend.getDesignStyle();
    this._previousData = [];

    if (this._anchorContent && this._anchorContent.id !== anchorContent.id) {
      this._allContentsDataMap.clear();
    } else {
      this._allContentsDataMap.forEach((contents) => {
        if (this._isContentExist(contents)) {
          this._previousData = this._previousData.concat(contents);
        }
      });
    }

    this._anchorContent = anchorContent;
    this.signalRecommendAccessoriesToLog.dispatch({ type: 'recommendAccessories' });

    const roomData = HSApp.Util.RecommendDataPreparer.prepareRecommendData(
      this._targetSpace,
      anchorContent,
      designStyle
    );
    const requestId = HSApp.Util.UUID.uuid();
    const requestPayload: RecommendRequestPayload = {
      house_id: this._app.designMetadata.get('designId')!,
      room_id: roomData.id,
      plat_id: anchorContent.seekId,
      plat_entity: anchorContent.id,
      house_data: {},
      room_data: roomData,
      layout_number: LAYOUT_NUMBER,
      propose_number: PROPOSE_NUMBER,
      layout_mode: LAYOUT_MODE,
      requestId: requestId,
    };

    NWTK.mtop.Recommend.getAccessories({
      data: requestPayload,
      options: { timeout: RECOMMEND_TIMEOUT },
    })
      .then((response: RecommendResponse) => {
        if (!response?.data?.group_scheme?.length) {
          return Promise.reject(response.ret || 'getAccessories-error');
        }

        const groupSchemes = response.data.group_scheme;
        this._getDataAndExecuteCmd(anchorContent, groupSchemes[0], this._previousData, false, 0).then(() => {
          if (groupSchemes.length > 1) {
            this._showTryOtherSchemeLiveHint(groupSchemes, anchorContent);
          }
        });
      })
      .catch((error: unknown) => {
        this.hideLoading();
        LiveHint.show(ResourceManager.getString('recommend_error'), LIVE_HINT_DURATION, null, {
          status: LiveHint.statusEnum.warning,
          canclose: true,
        });
      });
  };

  private _getDataAndExecuteCmd(
    anchorContent: Content,
    algorithmData: RecommendData[],
    previousData: Content[],
    isReset: boolean,
    schemeIndex: number = 0
  ): Promise<void> {
    const clonedAlgorithmData = HSApp.Util.DeepClone.cloneDeep(algorithmData);

    if (anchorContent.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
      LiveHint.show(
        ResourceManager.getString('recommend_error_content_has_been_removed'),
        LIVE_HINT_DURATION,
        null,
        {
          status: LiveHint.statusEnum.warning,
          canclose: true,
        }
      );
      return Promise.reject();
    }

    const hasSoftCloth = clonedAlgorithmData.some((item) => {
      const typeString = item?.type;
      const typeParts = typeString?.split('/');
      if (typeParts && typeParts.length >= 2) {
        return HSCatalog.ContentTypeEnum.ext_SoftCloth.includes(typeParts[1].trim());
      }
      return false;
    });

    const executeCommand = (
      anchor: Content,
      algorithm: RecommendData[],
      products: Record<string, unknown>[],
      previous: Content[],
      reset: boolean
    ): void => {
      const commandManager = HSApp.App.getApp().cmdManager;
      const command = commandManager.createCommand(HSFPConstants.CommandType.CmdAddRecommendAccessories, [
        anchor,
        algorithm,
        products,
        previous,
        reset,
      ]);
      this._previousData = commandManager.execute(command);

      if (hasSoftCloth) {
        this.hideLoading();
      }

      if (reset) {
        this._allContentsDataMap.clear();
      } else {
        this._allContentsDataMap.set(schemeIndex, this._previousData);
      }
    };

    if (!isReset) {
      return new Promise<Record<string, unknown>>((resolve) => {
        const catalogManager = HSCatalog.Manager.instance();
        let seekIds: string[] = [];
        clonedAlgorithmData.forEach((item) => {
          seekIds = seekIds.concat(this._getSeekIds(item));
        });
        resolve(catalogManager.getProductsBySeekIds(seekIds));
      })
        .then((productData) => {
          return this._getSoftClothData(productData, clonedAlgorithmData, anchorContent);
        })
        .then((result) => {
          if (!result) {
            return Promise.reject();
          }
          const { productData, algorithmData } = result;
          executeCommand(anchorContent, algorithmData, productData, previousData, isReset);
          this.hideLoading();
          return Promise.resolve();
        })
        .catch((error: unknown) => {
          console.error(error);
          this.hideLoading();
          return Promise.reject(error);
        });
    }

    executeCommand(anchorContent, [], [], previousData, isReset);
    return Promise.resolve();
  }

  private async _getSoftClothData(
    productData: Record<string, unknown>,
    algorithmData: RecommendData[],
    anchorContent: Content
  ): Promise<{ productData: Record<string, unknown>; algorithmData: RecommendData[] } | null> {
    try {
      if (anchorContent.contentType?.getTypeString().includes('window')) {
        return { productData, algorithmData };
      }

      const softClothPromises: Array<[number, Promise<unknown>]> = [];

      for (let index = 0; index < algorithmData.length; index++) {
        const item = algorithmData[index];
        const product = productData[item.id];

        if (product.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ext_SoftCloth)) {
          const softCloth = HSCore.Model.SoftCloth.create(product);
          softCloth.x = item.position[0];
          softCloth.y = item.position[1];
          softCloth.z = item.position[2];
          softCloth.XScale = item.scale[0];
          softCloth.YScale = item.scale[1];
          softCloth.ZScale = item.scale[2];
          softCloth.XRotation = item.rotation[0];
          softCloth.YRotation = item.rotation[1];
          softCloth.ZRotation = item.rotation[2];

          softClothPromises.push([
            index,
            HSApp.Util.SoftCloth.getSoftClothData(softCloth, anchorContent, { host: anchorContent }),
          ]);

          HSApp.Util.EventTrack.instance().track(
            HSApp.Util.EventGroupEnum.Recommendation,
            'accessories_soft_cloth_event',
            { sCategory: anchorContent.contentType!.getTypeString() }
          );
        }
      }

      if (softClothPromises.length > 0) {
        const results = await Promise.all(softClothPromises.map(([, promise]) => promise));
        results.forEach((result, resultIndex) => {
          algorithmData[softClothPromises[resultIndex][0]].softClothData = result;
        });
        return { productData, algorithmData };
      }

      return { productData, algorithmData };
    } catch (error) {
      return null;
    }
  }

  private _getSeekIds(data: RecommendData): string[] {
    let seekIds: string[] = [];
    seekIds.push(data.id);

    if (data.sub_list) {
      data.sub_list.forEach((subItem) => {
        seekIds = seekIds.concat(this._getSeekIds(subItem));
      });
    }

    return seekIds;
  }

  private _showTryOtherSchemeLiveHint(schemes: RecommendData[][], anchorContent: Content): void {
    this._currentIndex = 1;

    const actions = [
      () => {
        if (HSApp.Util.Environment.isDefaultEnv()) {
          if (!HSApp.Util.Recommend.isRoomExist(this._targetSpace)) {
            LiveHint.hide();
            return;
          }

          let contentsToReset: Content[] = [];
          if (this._isContentExist(this._previousData)) {
            contentsToReset = this._previousData;
          } else {
            const mapSize = this._allContentsDataMap.size;
            const mapIterator = this._allContentsDataMap.values();

            for (let i = 0; i < mapSize; i++) {
              const contents = mapIterator.next().value;
              if (this._isContentExist(contents)) {
                contentsToReset = contents;
                break;
              }
            }
          }

          this._getDataAndExecuteCmd(anchorContent, [], contentsToReset, true);
          this.signalRecommendAccessoriesToLog.dispatch({ type: 'reset' });
          HSApp.Util.EventTrack.instance().track(
            HSApp.Util.EventGroupEnum.Recommendation,
            'accessories_live_hint_reset_event'
          );
        }
        LiveHint.hide();
      },
      () => {
        if (HSApp.Util.Environment.isDefaultEnv()) {
          if (!HSApp.Util.Recommend.isRoomExist(this._targetSpace)) {
            LiveHint.hide();
            return;
          }

          this.showLoading();
          this._getDataAndExecuteCmd(
            anchorContent,
            schemes[this._currentIndex],
            this._previousData,
            false,
            this._currentIndex
          );
          this._currentIndex++;

          if (this._currentIndex > schemes.length - 1) {
            this._currentIndex = 0;
          }

          this.signalRecommendAccessoriesToLog.dispatch({ type: 'changeScheme' });
          HSApp.Util.EventTrack.instance().track(
            HSApp.Util.EventGroupEnum.Recommendation,
            'accessories_live_hint_try_another_event'
          );
        } else {
          LiveHint.hide();
        }
      },
    ];

    const message = `${ResourceManager.getString('recommend_try_another_recommend')}`;
    const appendHtml =
      `&nbsp;&nbsp;<span class='action auto-recommend-live-hint-button auto-recommend-live-hint-normal-button'>` +
      `${ResourceManager.getString('recommend_reset')}</span>&nbsp;&nbsp;` +
      `<span class='action auto-recommend-live-hint-button auto-recommend-live-hint-active-button'>` +
      `${ResourceManager.getString('recommend_change_scheme')}</span>`;

    LiveHint.show(message, undefined, actions, {
      canclose: true,
      closeCallback: () => {
        const eventTracker = HSApp.Util.EventTrack.instance();
        eventTracker.track(HSApp.Util.EventGroupEnum.Recommendation, 'accessories_live_hint_close_event');

        let noticeInstance: { close: () => Promise<void> } | undefined;

        const feedbackDialog = HSApp.UI.FeedbackDialogFactory(
          HSApp.UI.FEEDBACK_TYPE_ENUM.ACCESSORIES,
          () => {
            noticeInstance?.close().then(() => {
              return HSApp.UI.Message.success(ResourceManager.getString('recommend_thanks_for_feedback'));
            });
          },
          () => {
            eventTracker.track(HSApp.Util.EventGroupEnum.Recommendation, 'design_rating_satisfied_event', {
              source: '一键摆饰',
            });
          },
          () => {
            eventTracker.track(HSApp.Util.EventGroupEnum.Recommendation, 'design_rating_unsatisfied_event', {
              source: '一键摆饰',
            });
          }
        );

        noticeInstance = HSApp.UI.Message.notice(feedbackDialog, {
          always: true,
          className: 'feedback-notice-wrapper',
        });
      },
      append: appendHtml,
    });
  }
}