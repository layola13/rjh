interface RoomInfo {
  layout_json_string?: string;
  roomInfoCentroid: {
    glazedFacadeIndex: number;
  };
  glazed_facade_index: number;
  matched_group_count: number;
  group_distance: number;
  main_group_distance: number;
  floor_distance: number;
  doors_distance: number;
  windows_distance: number;
  rounded_opening_host_similarity: number;
  targetReduceStep: number;
  reduce_step: number;
  matched_doors_count: number;
  score?: number;
}

interface ScoredRoomInfo extends RoomInfo {
  score: number;
}

interface ScoreStep<T> {
  getter: (item: T) => number;
  higherTheBetter: boolean;
  weight: number;
}

interface OrderByStep<T> {
  getter: (item: T) => number;
  highestFirst: boolean;
}

class RoomSorter<T extends RoomInfo> {
  private scoreSteps: ScoreStep<T>[] = [];
  private orderBySteps: OrderByStep<T>[] = [];
  private filterFn?: (item: T) => boolean;
  private initializeFn?: (item: T) => T & { score: number };

  addFilter(filterFunction: (item: T) => boolean): this {
    this.filterFn = filterFunction;
    return this;
  }

  addInitializer(initializeFunction: (item: T) => T & { score: number }): this {
    this.initializeFn = initializeFunction;
    return this;
  }

  addScoreStep(step: ScoreStep<T>): this {
    this.scoreSteps.push(step);
    return this;
  }

  addOrderBy(step: OrderByStep<T>): this {
    this.orderBySteps.push(step);
    return this;
  }

  sort(items: T[]): Array<T & { score: number }> {
    let result = [...items];

    if (this.filterFn) {
      result = result.filter(this.filterFn);
    }

    let scoredResult: Array<T & { score: number }>;
    if (this.initializeFn) {
      scoredResult = result.map(this.initializeFn);
    } else {
      scoredResult = result.map(item => ({ ...item, score: 0 }));
    }

    for (const step of this.scoreSteps) {
      scoredResult = scoredResult
        .sort((a, b) => {
          const valueA = step.getter(a);
          const valueB = step.getter(b);
          return step.higherTheBetter ? valueA - valueB : valueB - valueA;
        })
        .map((item, index) => ({
          ...item,
          score: (item.score ?? 0) + step.weight * (index + 1)
        }));
    }

    return scoredResult.sort((a, b) => {
      for (const orderStep of this.orderBySteps) {
        const valueA = orderStep.getter(a);
        const valueB = orderStep.getter(b);
        if (valueA !== valueB) {
          return orderStep.highestFirst 
            ? (valueB < valueA ? -1 : 1) 
            : (valueA < valueB ? -1 : 1);
        }
      }
      return 0;
    });
  }
}

function calculateGlazedFacadeIndexPenalty(room: RoomInfo): number {
  const centroidIndex = room.roomInfoCentroid.glazedFacadeIndex;
  const facadeIndex = room.glazed_facade_index;

  if (centroidIndex === facadeIndex) {
    return 0;
  }

  const absoluteDifference = Math.abs(centroidIndex - facadeIndex);

  if (absoluteDifference === 1 || absoluteDifference === 3) {
    return 1;
  } else if (absoluteDifference === 2) {
    return 2;
  }

  return 10;
}

export const livingDiningRoomSorter = new RoomSorter<RoomInfo>()
  .addFilter(room => !!room.layout_json_string)
  .addInitializer(room => ({ ...room, score: 0 }))
  .addScoreStep({
    getter: room => room.matched_group_count,
    higherTheBetter: true,
    weight: 0.4
  })
  .addScoreStep({
    getter: room => room.group_distance,
    higherTheBetter: false,
    weight: 0.2
  })
  .addScoreStep({
    getter: room => room.main_group_distance,
    higherTheBetter: false,
    weight: 0.2
  })
  .addScoreStep({
    getter: room => room.floor_distance + 0.5 * (room.doors_distance + room.windows_distance),
    higherTheBetter: false,
    weight: 0.4
  })
  .addScoreStep({
    getter: room => room.rounded_opening_host_similarity,
    higherTheBetter: true,
    weight: 0.4
  })
  .addScoreStep({
    getter: calculateGlazedFacadeIndexPenalty,
    higherTheBetter: false,
    weight: 0.4
  })
  .addScoreStep({
    getter: room => room.targetReduceStep + room.reduce_step,
    higherTheBetter: false,
    weight: 0.4
  })
  .addOrderBy({
    getter: room => room.score ?? 0,
    highestFirst: true
  });

export const bathroomSorter = new RoomSorter<RoomInfo>()
  .addFilter(room => !!room.layout_json_string)
  .addInitializer(room => ({ ...room, score: 0 }))
  .addScoreStep({
    getter: room => room.matched_group_count,
    higherTheBetter: true,
    weight: 0.4
  })
  .addScoreStep({
    getter: room => room.group_distance,
    higherTheBetter: false,
    weight: 0.2
  })
  .addScoreStep({
    getter: room => room.main_group_distance,
    higherTheBetter: false,
    weight: 0.2
  })
  .addScoreStep({
    getter: room => room.floor_distance + 0.5 * (room.doors_distance + room.windows_distance),
    higherTheBetter: false,
    weight: 0.4
  })
  .addScoreStep({
    getter: room => room.rounded_opening_host_similarity,
    higherTheBetter: true,
    weight: 0.4
  })
  .addScoreStep({
    getter: calculateGlazedFacadeIndexPenalty,
    higherTheBetter: false,
    weight: 0.4
  })
  .addScoreStep({
    getter: room => room.targetReduceStep,
    higherTheBetter: false,
    weight: 0.4
  })
  .addScoreStep({
    getter: room => room.targetReduceStep + room.reduce_step,
    higherTheBetter: false,
    weight: 0.4
  })
  .addOrderBy({
    getter: room => room.matched_doors_count,
    highestFirst: true
  })
  .addOrderBy({
    getter: room => room.targetReduceStep,
    highestFirst: false
  })
  .addOrderBy({
    getter: room => room.score ?? 0,
    highestFirst: true
  });

export const bedroomSorter = new RoomSorter<RoomInfo>()
  .addFilter(room => !!room.layout_json_string)
  .addInitializer(room => ({ ...room, score: 0 }))
  .addScoreStep({
    getter: room => room.matched_group_count,
    higherTheBetter: true,
    weight: 0.4
  })
  .addScoreStep({
    getter: room => room.group_distance,
    higherTheBetter: false,
    weight: 0.2
  })
  .addScoreStep({
    getter: room => room.main_group_distance,
    higherTheBetter: false,
    weight: 0.2
  })
  .addScoreStep({
    getter: room => room.doors_distance + room.windows_distance,
    higherTheBetter: false,
    weight: 0.4
  })
  .addScoreStep({
    getter: room => room.floor_distance,
    higherTheBetter: false,
    weight: 0.5
  })
  .addScoreStep({
    getter: room => room.rounded_opening_host_similarity,
    higherTheBetter: true,
    weight: 0.4
  })
  .addScoreStep({
    getter: room => room.targetReduceStep + room.reduce_step,
    higherTheBetter: false,
    weight: 0.4
  })
  .addOrderBy({
    getter: room => room.targetReduceStep,
    highestFirst: false
  })
  .addOrderBy({
    getter: room => room.score ?? 0,
    highestFirst: true
  });