interface ExecuteResult {
  status: 'success';
  data: unknown;
}

interface SaveServiceDependency {
  saveService: {
    getDumpServices: () => unknown;
    getData: (data: unknown) => Promise<unknown>;
    app: unknown;
  };
}

interface DataHelper {
  getDataWithDumpData(
    dataFetcher: () => Promise<unknown>,
    dumpServices: unknown
  ): Promise<unknown>;
}

declare const DataHelper: DataHelper;

export class SaveGetDataStage {
  private app: unknown;
  private getData: (data: unknown) => Promise<unknown>;
  private getDumpServices: () => unknown;

  constructor(dependencies: SaveServiceDependency) {
    const { saveService } = dependencies;
    this.getDumpServices = saveService.getDumpServices;
    this.getData = saveService.getData.bind(saveService);
    this.app = saveService.app;
  }

  async execute(data: unknown, _context: unknown): Promise<ExecuteResult> {
    const dataFetcher = () => this.getData(data);
    const result = await DataHelper.getDataWithDumpData(
      dataFetcher,
      this.getDumpServices()
    );

    return {
      status: 'success',
      data: result
    };
  }
}