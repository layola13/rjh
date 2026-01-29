interface ModelInfo {
  modelId: string;
}

interface MoodBoardData {
  modelInfo: ModelInfo[];
}

interface Room {
  // Define room properties as needed
}

interface ProductMetadata {
  [key: string]: unknown;
}

interface App {
  transManager: {
    createRequest: (requestType: string, params: unknown[]) => unknown;
    commitAsync: (request: unknown) => Promise<unknown[]>;
  };
}

interface ApplyMoodBoardLayoutParams {
  room: Room;
  moodBoardData: MoodBoardData;
  app: App;
  clearBeforeApply?: boolean;
  freezeProcess?: () => void;
  unfreezeProcess?: () => void;
}

declare const HSApp: {
  Util: {
    HomeStylerImportProvider: new (param: null) => {
      cleanHouse: (clear: boolean, room: Room) => Promise<void>;
    };
  };
};

declare const HSCatalog: {
  Manager: {
    instance: () => {
      getProductsBySeekIds: (ids: string[], arg1: boolean, arg2: boolean) => Promise<ProductMetadata>;
    };
  };
};

declare const HSFPConstants: {
  RequestType: {
    ConstraintLayout: {
      ApplyMoodBoardLayout: string;
    };
  };
};

async function cleanRoom(clear: boolean, room: Room): Promise<void> {
  try {
    const provider = new HSApp.Util.HomeStylerImportProvider(null);
    await provider.cleanHouse(clear, room);
  } catch (error) {
    console.error('清空房间失败:', error);
    throw error;
  }
}

async function fetchProductMetadata(moodBoardData: MoodBoardData): Promise<ProductMetadata> {
  try {
    const modelIds = moodBoardData.modelInfo.map((item) => item.modelId);
    const products = await HSCatalog.Manager.instance().getProductsBySeekIds(modelIds, true, true);
    return products;
  } catch (error) {
    console.error('获取产品元数据失败:', error);
    throw error;
  }
}

export async function applyMoodBoardLayout(params: ApplyMoodBoardLayoutParams): Promise<unknown[]> {
  const { room, moodBoardData, app, clearBeforeApply, freezeProcess, unfreezeProcess } = params;

  if (!room || !moodBoardData) {
    throw new Error('房间或情绪板数据无效');
  }

  if (clearBeforeApply) {
    await cleanRoom(false, room);
  }

  freezeProcess?.();

  const productMetadata = await fetchProductMetadata(moodBoardData);

  if (!productMetadata || Object.keys(productMetadata).length === 0) {
    throw new Error('无法获取模型 Meta 数据');
  }

  try {
    unfreezeProcess?.();

    const request = app.transManager.createRequest(
      HSFPConstants.RequestType.ConstraintLayout.ApplyMoodBoardLayout,
      [room, moodBoardData, productMetadata]
    );

    const result = await app.transManager.commitAsync(request);

    freezeProcess?.();

    return Array.from(new Set(result));
  } catch (error) {
    console.error('应用情绪板布局失败:', error);
    throw error;
  } finally {
    unfreezeProcess?.();
  }
}