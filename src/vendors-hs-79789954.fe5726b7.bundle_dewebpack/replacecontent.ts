import { queryAIReplaceContents, submitAIReplaceContents } from './api';
import Logger from './logger';

interface Content {
  seekId: string;
  entityId: string;
  categories: string[];
  XLength: number;
  YLength: number;
  ZLength: number;
  XScale: number;
  YScale: number;
  ZScale: number;
}

interface ReplaceModelInfo {
  modelId: string;
  originModelId: string;
  type: string;
  categoryId: string;
  length: number;
  width: number;
  height: number;
  entityIds: string[];
}

interface ReplaceParams {
  lang: string;
  tenant: string;
  initGeneralization: boolean;
  replaceModelsInfo: ReplaceModelInfo[];
  baseModelIds: string[];
  isExpandStyle: boolean;
  styleCode: string[];
}

interface AIAlgorithmContent {
  originReplaceId: string;
  id: string;
}

interface QueryResponse {
  status: number;
  items?: AIAlgorithmContent[];
}

export class ReplaceContent {
  private contents: Content[];
  private replaceContentMap?: Map<string, string>;
  private timeId?: ReturnType<typeof setTimeout>;

  constructor(contents: Content[]) {
    this.contents = contents;
  }

  async execute(): Promise<Map<string, string>> {
    Logger.log('start replace contents');
    this.replaceContentMap = new Map<string, string>();

    const params = this.paramsFactory();
    Logger.log('replace contents params: ', params);

    const taskId = await this.startQuery(params);
    const aiContents = await this.getAIAlgorithmContents(taskId);

    if (aiContents?.length) {
      Logger.log('replace content result: ', aiContents);
      for (const content of aiContents) {
        const { originReplaceId, id } = content;
        this.replaceContentMap.set(originReplaceId, id);
      }
    }

    return this.replaceContentMap;
  }

  paramsFactory(): ReplaceParams {
    const baseModelIds: string[] = [];
    const replaceModelsInfo: ReplaceModelInfo[] = [];
    const uniqueContents = this.removeDuplicateContents(this.contents).filter(
      content => !!content.categories[0]
    );

    for (const content of uniqueContents) {
      baseModelIds.push(content.seekId);
      replaceModelsInfo.push({
        modelId: content.seekId,
        originModelId: content.seekId,
        type: '3D',
        categoryId: content.categories.join(', '),
        length: Math.round(content.XLength * content.XScale * 1000),
        width: Math.round(content.YLength * content.YScale * 1000),
        height: Math.round(content.ZLength * content.ZScale * 1000),
        entityIds: [content.entityId]
      });
    }

    const { replaceModelsInfo: finalReplaceInfo, baseModelIds: finalBaseIds } =
      this.getReplaceNumsByGradeAndType(replaceModelsInfo, baseModelIds);

    return {
      lang: 'zh_CN',
      tenant: 'ezhome',
      initGeneralization: false,
      replaceModelsInfo: finalReplaceInfo,
      baseModelIds: finalBaseIds,
      isExpandStyle: true,
      styleCode: ['Modern']
    };
  }

  isSameModelIds(contents: AIAlgorithmContent[]): boolean {
    for (const content of contents) {
      if (content.originReplaceId !== content.id) {
        return false;
      }
    }
    return true;
  }

  cancelLoading(): void {
    if (this.timeId) {
      clearTimeout(this.timeId);
    }
  }

  async getAIAlgorithmContents(taskId: string): Promise<AIAlgorithmContent[] | undefined> {
    let result: AIAlgorithmContent[] | undefined;

    if (this.timeId) {
      clearTimeout(this.timeId);
    }

    let elapsedTime = 0;
    let status = 0;
    const MAX_TIMEOUT = 5000;
    const POLL_INTERVAL = 100;

    try {
      while (status !== 1 && elapsedTime < MAX_TIMEOUT) {
        const response: QueryResponse = await queryAIReplaceContents({ taskId });
        status = response?.status;

        if (status === 1) {
          clearTimeout(this.timeId);
          result = response.items;
          break;
        }

        await new Promise<void>(resolve => {
          this.timeId = setTimeout(resolve, POLL_INTERVAL);
        });

        elapsedTime += POLL_INTERVAL;
      }
    } catch (error) {
      Logger.log(error);
    }

    return result;
  }

  async startQuery(params: ReplaceParams): Promise<string> {
    return await submitAIReplaceContents(params);
  }

  removeDuplicateContents(contents: Content[]): Content[] {
    const seenIds = new Set<string>();
    const uniqueContents: Content[] = [];

    for (const content of contents) {
      if (!seenIds.has(content.seekId)) {
        seenIds.add(content.seekId);
        uniqueContents.push(content);
      }
    }

    return uniqueContents;
  }

  getReplaceNumsByGradeAndType(
    replaceModelsInfo: ReplaceModelInfo[],
    baseModelIds: string[]
  ): { replaceModelsInfo: ReplaceModelInfo[]; baseModelIds: string[] } {
    return {
      replaceModelsInfo,
      baseModelIds
    };
  }
}