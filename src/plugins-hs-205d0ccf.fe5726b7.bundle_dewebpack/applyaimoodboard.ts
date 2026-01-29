import { CommunityInspirationAction } from './CommunityInspirationAction';

interface RoomInfo {
  floors: Floor[];
}

interface Floor {
  // Floor structure details
}

interface Face {
  roomInfos: RoomInfo[];
}

interface MoodBoardData {
  moodBoardImageUrl?: string;
  // Add other properties as needed
}

interface ApplyStatusData {
  status: string;
  unusedSeekIds: string[];
  moodBoardData?: MoodBoardData;
}

interface ApplyStatusChangedEvent {
  data: ApplyStatusData;
}

interface Command {
  signalApplyStatusChanged: unknown;
}

interface ExecuteOptions {
  templateId?: string;
}

interface ApiResponse {
  ret: string[];
  data?: {
    hasData: boolean;
    url: string;
  };
}

interface DetectedRoom {
  tagetRoom?: unknown;
}

export class ApplyAIMoodBoard extends CommunityInspirationAction {
  private timerId?: NodeJS.Timeout;
  private moodBoardData?: MoodBoardData;
  private templateId?: string;

  public onExecute(options?: ExecuteOptions): void {
    if (options?.templateId) {
      this.templateId = options.templateId;
      const detectedRoom = HSApp.Util.Face.detectSingleRoom();
      
      if (detectedRoom && !detectedRoom.tagetRoom) {
        LiveHint.show(
          ResourceManager.getString("plugin_cusomized_feature_modeling_draw_room"),
          3000,
          null,
          { canclose: true }
        );
        this._signalHook.listen(this._app.signalDocumentOpened, this._onDocumentOpened);
      } else {
        this._showSelectRoom([]);
      }
    } else {
      this._signalHook.listen(this._app.signalDocumentOpened, this._onDocumentOpened);
    }
  }

  private _onDocumentOpened = (): void => {
    super._onDocumentOpened?.();
    this.tryGetMoodBoardData();
  };

  private async tryGetMoodBoardData(): Promise<void> {
    const templateId = HSApp.Util.Url.getQueryStrings().templateId;
    const jsonUrl = await this.getJsonUrl(templateId);
    
    if (!jsonUrl) {
      return;
    }

    const data = await this.fetchJsonData(jsonUrl);
    if (data) {
      this.moodBoardData = data;
    }
  }

  private async retryGetMoodBoardData(templateId?: string): Promise<MoodBoardData | undefined> {
    showLoading({ show: true });

    const jsonUrl = await this.retryPromise(() => this.getJsonUrl(templateId));
    
    clearTimeout(this.timerId);
    showLoading({ show: false });

    if (!jsonUrl) {
      LiveHint.show(
        ResourceManager.getString("apply_texture_error"),
        3000,
        () => LiveHint.hide(),
        { canclose: true }
      );
      return undefined;
    }

    const data = await this.fetchJsonData(jsonUrl);
    if (!data) {
      LiveHint.show(
        ResourceManager.getString("apply_texture_error"),
        3000,
        () => LiveHint.hide(),
        { canclose: true }
      );
      return undefined;
    }

    return data;
  }

  private async getJsonUrl(templateId?: string): Promise<string> {
    return NWTK.mtop.designTemplates.aiMoodBoard({
      data: { subTaskId: templateId }
    }).then((response: ApiResponse) => {
      if (response?.ret?.[0]?.includes("SUCCESS") && response.data?.hasData) {
        return response.data.url;
      }
      return Promise.reject();
    });
  }

  private async fetchJsonData(url: string): Promise<MoodBoardData | undefined> {
    const response = await fetch(`${url}?t=${Date.now()}`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache"
      }
    });

    if (!response.ok) {
      return Promise.reject();
    }

    return response.json();
  }

  private async retryPromise<T>(
    promiseFn: () => Promise<T>,
    maxRetries: number = 12,
    delayMs: number = 5000
  ): Promise<T | undefined> {
    try {
      return await promiseFn();
    } catch (error) {
      if (maxRetries === 0) {
        return Promise.resolve(undefined);
      }

      await new Promise<void>((resolve) => {
        this.timerId = setTimeout(resolve, delayMs);
      });

      return this.retryPromise(promiseFn, maxRetries - 1, delayMs);
    }
  }

  public executeCmd = async (templateId?: string): Promise<boolean> => {
    const selectedItems = this._app.selectionManager.selected(true);

    if (!(selectedItems.length && selectedItems[0] instanceof HSCore.Model.Face)) {
      return false;
    }

    let moodBoardData = this.moodBoardData;
    if (!moodBoardData) {
      moodBoardData = await this.retryGetMoodBoardData(templateId ?? this.templateId);
    }

    if (!moodBoardData) {
      return false;
    }

    const face = selectedItems[0] as Face;
    const floor = face.roomInfos[0]?.floors[0];
    
    const command = floor
      ? this._app.cmdManager.createCommand(HSFPConstants.CommandType.ApplyMoodBoardLayout, [floor, moodBoardData])
      : undefined;

    if (!command) {
      return false;
    }

    const signalHook = new HSCore.Util.SignalHook();
    signalHook.listen(command.signalApplyStatusChanged, (event: ApplyStatusChangedEvent) => {
      const { status, unusedSeekIds, moodBoardData } = event.data;
      
      if (status === "completed") {
        this.showPanel(unusedSeekIds, moodBoardData?.moodBoardImageUrl);
      }
      
      signalHook.dispose();
    });

    this._app.selectionManager.unselectAll();
    this._app.cmdManager.execute(command);

    return true;
  };

  private showPanel(unusedSeekIds: string[], coverImage?: string): void {
    if (unusedSeekIds.length === 0) {
      return;
    }

    this._app.pluginManager
      .getPlugin(HSFPConstants.PluginType.Autostyler)
      .showMaterialPickUpPage({
        data: [["", unusedSeekIds]],
        showPanel: true,
        classNames: "apply-ai-mood-board-pick-up-page",
        hideDesignInfo: true,
        coverImage,
        title: "Apply AI Mood Board"
      });
  }
}