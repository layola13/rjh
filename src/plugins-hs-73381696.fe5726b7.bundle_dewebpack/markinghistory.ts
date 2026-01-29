class MarkingHistory {
  private storage: HSApp.Util.Storage | null;
  private markingRecords: string[];

  constructor() {
    this.storage = null;
    this.markingRecords = [];
    this.storage = new HSApp.Util.Storage(HSFPConstants.PluginType.MarkingSystem);
  }

  addRecord(record: string): void {
    if (record) {
      this.markingRecords = this.markingRecords || [];
      const index = this.markingRecords.indexOf(record);
      if (index !== -1) {
        this.markingRecords.splice(index, 1);
      }
      this.markingRecords.push(record);
      this.markingRecords.slice(-8);
    }
  }

  deleteRecord(record: string): void {
    const index = this.markingRecords.indexOf(record);
    if (index !== -1) {
      this.markingRecords.splice(index, 1);
    }
  }

  getRecord(prefix?: string, limit?: number): string[] {
    let records = this.markingRecords;
    if (!records) {
      return [];
    }

    if (prefix) {
      records = records.filter((record) => {
        return record !== prefix && record.startsWith(prefix);
      });
    }

    if (Number.isInteger(limit)) {
      records = records.slice(-limit!);
    }

    return records;
  }

  clear(): void {
    this.markingRecords = [];
  }
}

export { MarkingHistory };