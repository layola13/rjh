enum FloorplanDisplayAreaEnum {
  Outside = 0,
  Inside = 1,
  Used = 2
}

enum RequestType {
  ChangeGlobalAreaType = 'ChangeGlobalAreaType'
}

enum LogGroupTypes {
  WallOperation = 'WallOperation'
}

interface TransactionRequest {
  type: RequestType;
  params: unknown[];
}

interface TransactionManager {
  createRequest(type: RequestType, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface ClicksRatio {
  id: string;
  name: string;
}

interface CurrentParams {
  activeSection: LogGroupTypes;
  activeSectionName: string;
  clicksRatio: ClicksRatio;
  areaType: 'outer' | 'inside' | 'used';
}

abstract class Command {
  protected context!: CommandContext;
  
  abstract onExecute(): void;
  abstract isInteractive(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): LogGroupTypes;
  abstract getCurrentParams(): CurrentParams;
}

class ChangeGlobalAreaTypeCommand extends Command {
  private readonly fp: unknown;
  private readonly areaType: FloorplanDisplayAreaEnum;

  constructor(floorplan: unknown, areaType: FloorplanDisplayAreaEnum) {
    super();
    this.fp = floorplan;
    this.areaType = areaType;
  }

  onExecute(): void {
    const request = this.context.transManager.createRequest(
      RequestType.ChangeGlobalAreaType,
      [this.fp, this.areaType]
    );
    this.context.transManager.commit(request);
  }

  isInteractive(): boolean {
    return false;
  }

  getDescription(): string {
    let areaTypeName = '外框';
    
    if (this.areaType === FloorplanDisplayAreaEnum.Inside) {
      areaTypeName = '套内';
    } else if (this.areaType === FloorplanDisplayAreaEnum.Used) {
      areaTypeName = '使用';
    }
    
    return `切换面积展示类型为${areaTypeName}面积`;
  }

  getCategory(): LogGroupTypes {
    return LogGroupTypes.WallOperation;
  }

  getCurrentParams(): CurrentParams {
    let areaType: 'outer' | 'inside' | 'used' = 'outer';
    
    if (this.areaType === FloorplanDisplayAreaEnum.Inside) {
      areaType = 'inside';
    } else if (this.areaType === FloorplanDisplayAreaEnum.Used) {
      areaType = 'used';
    }
    
    return {
      activeSection: LogGroupTypes.WallOperation,
      activeSectionName: '墙体操作',
      clicksRatio: {
        id: 'changeGlobalAreaType',
        name: '切换建筑面积'
      },
      areaType
    };
  }
}

export default ChangeGlobalAreaTypeCommand;