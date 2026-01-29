interface EventData {
  key: string;
  success?: boolean;
  time?: number;
  c1?: string;
  c2?: string;
  c3?: string;
  [key: string]: unknown;
}

interface FilteredEventData {
  key: string;
  success: number;
  time?: number;
  c1?: string;
  c2?: string;
  c3?: string;
}

function logEvent(
  this: { _lg: (type: string, data: FilteredEventData, callback?: unknown) => void },
  eventData: EventData,
  callback?: unknown
): void {
  if (typeof eventData === "object" && eventData && eventData.key) {
    const filteredData: Partial<FilteredEventData> = {};
    const allowedKeys: ReadonlyArray<string> = [
      "key",
      "success",
      "time",
      "c1",
      "c2",
      "c3"
    ];

    for (const property in eventData) {
      if (allowedKeys.indexOf(property) > -1) {
        filteredData[property as keyof FilteredEventData] = eventData[property] as never;
      }
    }

    filteredData.success = eventData.success === false ? 0 : 1;

    this._lg("event", filteredData as FilteredEventData, callback);
  }
}