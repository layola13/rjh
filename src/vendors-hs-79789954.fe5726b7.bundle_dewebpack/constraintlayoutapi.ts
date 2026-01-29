interface SearchParams {
  data: {
    fc: string;
    args: string[];
    k: number;
  };
}

interface DesignSearchInput {
  bathroomNum: number;
  bedroomNum: number;
  livingroomNum: number;
  area: number;
  excludedRegion?: string;
  k?: number;
}

interface EstimateRoomTypeInput {
  floorOuterWKT: string;
  source: string;
  k?: number;
}

interface PolygonCentroid {
  floorPolygonWKT: string;
  numOfOuterCurves?: number;
  openings: {
    hostInfos: HostInfo[];
    doorsBottomProfilesWKT: string;
    windowsBottomProfilesWKT: string;
  };
  glazedFacadeIndex?: number;
}

interface Polygon {
  centroid: PolygonCentroid;
}

interface HostInfo {
  hostCurveIndex: number;
  openingIndex: number;
  openingType: "door" | "window" | "feature";
  posParam: {
    startParam: number;
    centerParam: number;
    endParam: number;
  };
}

interface GroupInfo {
  xLength: number;
  yLength: number;
  type: string;
  categoryIds: string[];
}

interface LayoutSearchInput {
  polygon: Polygon;
  numOfOuterCurves?: number;
  roomTypes: string[];
  strictMode: boolean;
  groupInfos?: GroupInfo[];
  origin?: string;
  k?: number;
}

interface LayoutSearchWithVectorInput extends LayoutSearchInput {
  vector: unknown;
}

interface RoomIdSearchInput {
  roomId: string;
  k?: number;
}

interface DesignIdSearchInput {
  designId: string;
  k?: number;
}

interface SearchResult {
  room_id: string;
  image?: {
    desc: string;
    src: string;
  };
  [key: string]: unknown;
}

interface DifyInput {
  targetRoomType: string;
  urls: string[];
}

const API_BASE_URL = "http://localhost:3003/api";
const LAYOUT_SEARCH_URL = `${API_BASE_URL}/layout-search`;
const DIFY_URL = `${API_BASE_URL}/dify`;
const DATABASE_PREFIX = "clip12a0";

let requestCounter = 1;

const executeSearch = async (params: SearchParams, apiMode: string = "mtop"): Promise<SearchResult[]> => {
  const logLabel = `[${requestCounter++}] ${params.data.fc} 检索 ${apiMode} 接口耗时：`;
  console.time(logLabel);

  let results: SearchResult[] = [];

  switch (apiMode) {
    case "injected":
    case "localhost": {
      const response = await fetch(LAYOUT_SEARCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      const data = await response.json();
      results = data.results;
      break;
    }
    case "mtop": {
      const mtopResponse = await (window as any).NWTK.mtop.ConstraintLayout.search(params);
      results = mtopResponse.data.result || [];
      results.forEach((result) => {
        for (const key in result) {
          if (result.hasOwnProperty(key)) {
            const value = result[key];
            result[key] = !isNaN(parseFloat(value)) && isFinite(value) ? Number(value) : value;
          }
        }
      });
      break;
    }
  }

  console.timeEnd(logLabel);
  return results;
};

const API_MODE = new URLSearchParams(window?.location?.search).get("CLLocalApi") === "true" ? "localhost" : "mtop";

const buildImageUrl = (roomId: string): string => {
  return `https://jr-alpha-cms-assets.oss-cn-beijing.aliyuncs.com/LayoutThumbnails/${roomId}.png`;
};

const formatHostInfoArray = (input: LayoutSearchInput, hostInfos: HostInfo[]): string => {
  const { strictMode } = input;
  
  if (strictMode) {
    const formattedItems = hostInfos.map((info) => 
      `ROW(${info.hostCurveIndex}, ${info.openingIndex}, ${info.posParam.startParam}, ${info.posParam.centerParam}, ${info.posParam.endParam})`
    ).join(", ");
    return `array[${formattedItems}]::${DATABASE_PREFIX}_opening_host_info[]`;
  }
  
  return `array[]::${DATABASE_PREFIX}_opening_host_info[]`;
};

const formatGroupInfoArray = (groupInfos?: GroupInfo[]): string => {
  if (!groupInfos) {
    return `array[]::${DATABASE_PREFIX}_minimal_group_info2[]`;
  }
  
  const formattedItems = groupInfos.map((info) => {
    const categoryList = [...info.categoryIds, "cabb5091-b54f-4fe9-b990-a7ac1b1b2803", "cabb5091-b54f-4fe9-b990-a7ac1b1b2803"].join(", ");
    return `ROW(${info.xLength.toFixed(7)}, ${info.yLength.toFixed(7)}, '${info.type}', '{${categoryList}}')`;
  }).join(", ");
  
  return `array[ ${formattedItems}]::${DATABASE_PREFIX}_minimal_group_info2[]`;
};

const buildLayoutSearchArgs = (input: LayoutSearchInput): string[] => {
  const { polygon, numOfOuterCurves, roomTypes, strictMode, groupInfos, origin } = input;
  
  const toleranceThreshold = roomTypes.includes("Bathroom") ? 0.1 : 0.25;
  const roomTypesFormatted = roomTypes.map((type) => `'${type}'`).join(", ");
  
  const doorHostInfos = formatHostInfoArray(input, polygon.centroid.openings.hostInfos.filter(({ openingType }) => openingType === "door"));
  const windowHostInfos = formatHostInfoArray(input, polygon.centroid.openings.hostInfos.filter(({ openingType }) => openingType === "window"));
  const featureHostInfos = formatHostInfoArray(input, polygon.centroid.openings.hostInfos.filter(({ openingType }) => openingType === "feature"));
  const groupInfosFormatted = formatGroupInfoArray(groupInfos);
  
  return [
    "POLYGON EMPTY",
    polygon.centroid.floorPolygonWKT,
    "POLYGON EMPTY",
    "POLYGON EMPTY",
    polygon.centroid.numOfOuterCurves ?? numOfOuterCurves,
    toleranceThreshold,
    `array[${roomTypesFormatted}]::text[]`,
    origin ?? "domestic",
    strictMode,
    doorHostInfos,
    windowHostInfos,
    featureHostInfos,
    groupInfosFormatted
  ].map((value) => value.toString());
};

const buildFloorOpeningSearchArgs = (input: LayoutSearchInput): string[] => {
  const baseArgs = buildLayoutSearchArgs(input);
  const { polygon } = input;
  
  return [
    ...baseArgs,
    polygon.centroid.openings.doorsBottomProfilesWKT,
    polygon.centroid.openings.windowsBottomProfilesWKT,
    polygon.centroid.glazedFacadeIndex
  ].map((value) => value.toString());
};

const buildVectorSearchArgs = (input: LayoutSearchWithVectorInput): string[] => {
  const { polygon, numOfOuterCurves, roomTypes, strictMode, groupInfos, origin } = input;
  
  const toleranceThreshold = roomTypes.includes("Bathroom") ? 0.1 : 0.25;
  const roomTypesFormatted = roomTypes.map((type) => `'${type}'`).join(", ");
  
  const doorHostInfos = formatHostInfoArray(input, polygon.centroid.openings.hostInfos.filter(({ openingType }) => openingType === "door"));
  const windowHostInfos = formatHostInfoArray(input, polygon.centroid.openings.hostInfos.filter(({ openingType }) => openingType === "window"));
  const featureHostInfos = formatHostInfoArray(input, polygon.centroid.openings.hostInfos.filter(({ openingType }) => openingType === "feature"));
  const groupInfosFormatted = formatGroupInfoArray(groupInfos);
  
  return [
    "POLYGON EMPTY",
    polygon.centroid.floorPolygonWKT,
    "POLYGON EMPTY",
    "POLYGON EMPTY",
    polygon.centroid.numOfOuterCurves ?? numOfOuterCurves,
    toleranceThreshold,
    `array[${roomTypesFormatted}]::text[]`,
    origin ?? "domestic",
    strictMode,
    doorHostInfos,
    windowHostInfos,
    featureHostInfos,
    groupInfosFormatted,
    polygon.centroid.openings.doorsBottomProfilesWKT,
    polygon.centroid.openings.windowsBottomProfilesWKT
  ].map((value) => value.toString());
};

const buildRoomIdSearchArgs = (input: RoomIdSearchInput): string[] => {
  const { roomId } = input;
  return [roomId].map((value) => value.toString());
};

const buildDesignIdSearchArgs = (input: DesignIdSearchInput): string[] => {
  const { designId } = input;
  return [designId].map((value) => value.toString());
};

const buildDesignSearchArgs = (input: DesignSearchInput): string[] => {
  const { bathroomNum, bedroomNum, livingroomNum, area } = input;
  return [area, bedroomNum, bathroomNum, livingroomNum].map((value) => value.toString());
};

const buildGlobalDesignSearchArgs = (input: DesignSearchInput): string[] => {
  const { bathroomNum, bedroomNum, livingroomNum, area, excludedRegion } = input;
  return [area, bedroomNum, bathroomNum, livingroomNum, excludedRegion ?? "美国"].map((value) => value.toString());
};

const buildEstimateRoomTypeArgs = (input: EstimateRoomTypeInput): string[] => {
  const { floorOuterWKT, source } = input;
  return [floorOuterWKT, 0.1, false, source].map((value) => value.toString());
};

export const ConstraintLayoutApi = {
  designSearch: async (input: DesignSearchInput): Promise<SearchResult[]> => {
    const tenantConfig = (window as any).HSApp?.Config?.TENANT;
    
    if (tenantConfig === "fp") {
      const params: SearchParams = {
        data: {
          fc: "rf_search_global_template_design",
          args: buildGlobalDesignSearchArgs(input),
          k: input.k ?? 5
        }
      };
      return await executeSearch(params, API_MODE);
    } else {
      const params: SearchParams = {
        data: {
          fc: "rf_search_template_design",
          args: buildDesignSearchArgs(input),
          k: input.k ?? 5
        }
      };
      return await executeSearch(params, API_MODE);
    }
  },

  estimateRoomType: async (input: EstimateRoomTypeInput): Promise<SearchResult[]> => {
    const params: SearchParams = {
      data: {
        fc: "rf_search_similar_floor",
        args: buildEstimateRoomTypeArgs(input),
        k: input.k ?? 5
      }
    };
    return await executeSearch(params, API_MODE);
  },

  copilotLayoutSearch: async (input: LayoutSearchInput): Promise<SearchResult[]> => {
    const params: SearchParams = {
      data: {
        fc: "rf_search_desigcopilot_layout",
        args: buildLayoutSearchArgs(input),
        k: input.k ?? 5
      }
    };
    const results = await executeSearch(params, API_MODE);
    
    for (const result of results) {
      result.image = {
        desc: result.room_id,
        src: buildImageUrl(result.room_id)
      };
    }
    
    return results;
  },

  layoutSearch: async (input: LayoutSearchInput): Promise<SearchResult[]> => {
    const params: SearchParams = {
      data: {
        fc: `${DATABASE_PREFIX}_search_ranking_test_layout`,
        args: buildLayoutSearchArgs(input),
        k: input.k ?? 5
      }
    };
    const results = await executeSearch(params, API_MODE);
    
    for (const result of results) {
      result.image = {
        desc: result.room_id,
        src: buildImageUrl(result.room_id)
      };
    }
    
    return results;
  },

  layoutSearchGroupFloorOpening: async (input: LayoutSearchInput): Promise<SearchResult[]> => {
    const params: SearchParams = {
      data: {
        fc: `${DATABASE_PREFIX}_search_group_floor_opening`,
        args: buildFloorOpeningSearchArgs(input),
        k: input.k ?? 5
      }
    };
    const results = await executeSearch(params, API_MODE);
    
    for (const result of results) {
      result.image = {
        desc: result.room_id,
        src: buildImageUrl(result.room_id)
      };
    }
    
    return results;
  },

  layoutSearchGroupFloorOpeningCount: async (input: LayoutSearchInput): Promise<SearchResult[]> => {
    const params: SearchParams = {
      data: {
        fc: `${DATABASE_PREFIX}_search_group_floor_opening_count`,
        args: buildFloorOpeningSearchArgs(input),
        k: input.k ?? 5
      }
    };
    return await executeSearch(params, API_MODE);
  },

  layoutSearchFloorCoversContents: async (input: LayoutSearchInput): Promise<SearchResult[]> => {
    const params: SearchParams = {
      data: {
        fc: `${DATABASE_PREFIX}_search_group_concavehull_opening`,
        args: buildFloorOpeningSearchArgs(input),
        k: input.k ?? 5
      }
    };
    const results = await executeSearch(params, API_MODE);
    
    for (const result of results) {
      result.image = {
        desc: result.room_id,
        src: buildImageUrl(result.room_id)
      };
    }
    
    return results;
  },

  layoutSearchWithVector: async (input: LayoutSearchWithVectorInput): Promise<SearchResult[]> => {
    const params: SearchParams = {
      data: {
        fc: `${DATABASE_PREFIX}_search_group_vector_opening`,
        args: buildVectorSearchArgs(input),
        k: input.k ?? 5
      }
    };
    const results = await executeSearch(params, API_MODE);
    
    for (const result of results) {
      result.image = {
        desc: result.room_id,
        src: buildImageUrl(result.room_id)
      };
    }
    
    return results;
  },

  groupSearchByRoomId: async (input: RoomIdSearchInput): Promise<SearchResult[]> => {
    const params: SearchParams = {
      data: {
        fc: `${DATABASE_PREFIX}_search_group_data_by_roomid`,
        args: buildRoomIdSearchArgs(input),
        k: input.k ?? 1000
      }
    };
    return await executeSearch(params, API_MODE);
  },

  groupSearch: async (input: DesignIdSearchInput): Promise<SearchResult[]> => {
    const params: SearchParams = {
      data: {
        fc: `${DATABASE_PREFIX}_search_group_data_by_designid`,
        args: buildDesignIdSearchArgs(input),
        k: input.k ?? 1000
      }
    };
    return await executeSearch(params, API_MODE);
  },

  searchRoomsOfDesignId: async (input: DesignIdSearchInput): Promise<SearchResult[]> => {
    const params: SearchParams = {
      data: {
        fc: `${DATABASE_PREFIX}_search_rooms_of_design_id`,
        args: buildDesignIdSearchArgs(input),
        k: input.k ?? 50
      }
    };
    return await executeSearch(params, API_MODE);
  }
};

const executeDifyRequest = async (params: SearchParams, apiMode: string = "mtop"): Promise<unknown> => {
  const logLabel = `[${requestCounter++}] ${params.data.fc} 调用 ${apiMode} 接口耗时：`;
  console.time(logLabel);

  let result: unknown;

  switch (apiMode) {
    case "injected":
    case "localhost": {
      const response = await fetch(DIFY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      result = await response.json();
      break;
    }
    case "mtop": {
      throw new Error("mtop request not been implemented yet.");
    }
  }

  console.timeEnd(logLabel);
  return result;
};

export const DifyApi = {
  getBestLayoutIndex: async (targetRoomType: string, urls: string[]): Promise<unknown> => {
    const params: SearchParams = {
      data: {
        fc: "dify_get_best_layout_index",
        args: [JSON.stringify({ targetRoomType, urls })],
        k: 0
      }
    };
    return await executeDifyRequest(params, API_MODE);
  }
};