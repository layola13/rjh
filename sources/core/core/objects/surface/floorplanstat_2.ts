export class FloorplanStat {
  dumpStartTime: number | null = null;
  dumpEndTime: number | null = null;
  dumpStringifyStartTime: number | null = null;
  dumpStringifyEndTime: number | null = null;
  openJsonParseStartTime: number | null = null;
  openJsonParseEndTime: number | null = null;
  openLoadEntitiesStartTime: number | null = null;
  openLoadEntitiesEndTime: number | null = null;
  openPostProcessStartTime: number | null = null;
  openPostProcessEndTime: number | null = null;

  private static instanceCache: FloorplanStat | null = null;

  get dumpTime(): number {
    return this.dumpStartTime !== null && this.dumpEndTime !== null
      ? this.dumpEndTime - this.dumpStartTime
      : 0;
  }

  get dumpStringifyTime(): number {
    return this.dumpStringifyStartTime !== null && this.dumpStringifyEndTime !== null
      ? this.dumpStringifyEndTime - this.dumpStringifyStartTime
      : 0;
  }

  get openJsonParseTime(): number {
    return this.openJsonParseEndTime !== null && this.openJsonParseStartTime !== null
      ? this.openJsonParseEndTime - this.openJsonParseStartTime
      : 0;
  }

  get openLoadEntitiesTime(): number {
    return this.openLoadEntitiesEndTime !== null && this.openLoadEntitiesStartTime !== null
      ? this.openLoadEntitiesEndTime - this.openLoadEntitiesStartTime
      : 0;
  }

  get openPostProcessTime(): number {
    return this.openPostProcessEndTime !== null && this.openPostProcessStartTime !== null
      ? this.openPostProcessEndTime - this.openPostProcessStartTime
      : 0;
  }

  static instance(): FloorplanStat {
    if (!FloorplanStat.instanceCache) {
      FloorplanStat.instanceCache = new FloorplanStat();
    }
    return FloorplanStat.instanceCache;
  }
}