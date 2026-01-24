/**
 * HDR (High Dynamic Range) 环境贴图数据库模块
 * 提供HDR环境贴图的唯一标识符(UID)常量集合
 * @module HDR_DATABASE
 */

/**
 * HDR环境贴图数据库对象
 * 包含所有可用HDR环境贴图的分类标识符
 */
export declare const HDR_DATABASE: {
  /**
   * HDR环境贴图唯一标识符集合
   * 按场景类型分类：日间场景、夜间场景、户外场景、室内场景等
   */
  readonly UID: {
    /** 李家嘴 - 日间 */
    readonly LJZ_DAY: "ljz_day";
    /** 人民广场 */
    readonly PEOPLES_SQUARE: "peoples_square";
    /** 人民广场 - 黎明 */
    readonly PEOPLES_SQUARE_DAWN: "peoples_square_dawn";
    /** 北欧城市 */
    readonly NORTH_EURO_CITY: "north_euro_city";
    /** 海湾游览 */
    readonly BAY_TOUR: "bay_tour";
    /** 威尼斯 - 黎明 */
    readonly VENICE_DAWN: "venice_dawn";
    /** 乌姆兰加 - 日出 */
    readonly UMHLANGA_SUNRISE: "umhlanga_sunrise";
    /** 海天一色 */
    readonly SEA_SKY: "sea_sky";
    /** 北国雪景 */
    readonly NORTHERN_SNOW: "northern_snow";
    /** 欧式花园 */
    readonly EURO_GARDEN: "euro_garden";
    /** 城市公园 */
    readonly CITY_PARK: "city_park";
    /** 乡村春景 */
    readonly RURAL_SPRING_SCENE: "rural_spring_scene";
    /** 清晨 */
    readonly MORNING: "morning";
    /** 冯德尔公园 - 晴天 */
    readonly SUNNY_VONDELPARK: "sunny_vondelpark";
    /** 落叶 */
    readonly FALLEN_LEAVES: "fallen_leaves";
    /** 秋景 */
    readonly AUTUMN_SCENE: "autumn_scene";
    /** 山间台地 */
    readonly MOUNTAIN_LEDGE: "mountain_ledge";
    /** 无户外场景 */
    readonly NOOUTDOORSCENE: "nooutdoor";
    /** 小港湾 - 夜晚 */
    readonly SMALL_HARBOR_NIGHT: "small_harbor_night";
    /** 国王大道 - 夜晚 */
    readonly KONIGSALLEE_NIGHT: "konigsallee_night";
    /** 威尼斯黎明 - 夜晚 */
    readonly VENICE_DAWN_NIGHT: "venice_dawn_night";
    /** 贝尔公园黎明 - 夜晚 */
    readonly BELL_PARK_DAWN_NIGHT: "bell_park_dawn_night";
    /** 基亚拉 - 黄昏夜晚 */
    readonly KIARA_DUSK_NIGHT: "kiara_dusk_night";
    /** 李家嘴 - 夜晚 */
    readonly LJZ_NIGHT: "ljz_night";
    /** 武汉 - 夜晚 */
    readonly WUHAN_NIGHT: "wuhan_night";
    /** 深圳 - 夜晚 */
    readonly SHENZHEN_NIGHT: "shenzhen_night";
    /** 人民广场 - 夜晚 */
    readonly PEOPLES_SQUARE_NIGHT: "peoples_square_night";
    /** 月光高尔夫 */
    readonly MOONLIT_GLOF: "moonlit_golf";
    /** 艾伦里德公园 (户外) */
    readonly O_EILENRIEDE_PARK: "eilenriede_park";
    /** 卑尔根 (户外) */
    readonly O_BERGEN: "bergen";
    /** 城市公园 (户外) */
    readonly O_CITY_PARK: "o_city_park";
    /** 利连斯泰因 (户外) */
    readonly O_LILIENSTEIN: "lilienstein";
    /** 岩石迷宫 (户外) */
    readonly O_FELSENLABYRINTH: "felsenlabyrinth";
    /** 海天一色 (户外) */
    readonly O_SEA_SKY: "o_sea_sky";
    /** 红山曲线 (户外) */
    readonly O_RED_HILL_CURVE: "red_hill_curve";
    /** 铁路桥 (户外) */
    readonly O_RAILWAY_BRIDGES: "railway_bridges";
    /** 夸塔尼 (户外) */
    readonly O_QWANTANI: "qwantani";
    /** 山顶 (户外) */
    readonly O_HILLTOP: "hilltop";
    /** 宁静 (户外) */
    readonly O_RUSTIG: "rustig";
    /** 雪地公园 (户外) */
    readonly O_SNOWY_PARK: "snowy_park";
    /** 空白 (户外) */
    readonly O_BLANK: "o_blank";
    /** VR天空 (通用) */
    readonly G_VRSKY: "g_vrsky";
    /** 金丝雀码头 (通用) */
    readonly G_CANARY_WHARF: "g_canary_wharf";
    /** 国王大道 (通用) */
    readonly G_KONIGSALLEE: "g_konigsallee";
    /** 波特兰 (通用) */
    readonly G_PORTLAND: "g_portland";
    /** 秋季公园 (通用) */
    readonly G_AUTUMN_PARK: "g_autumn_park";
    /** 河岸 (通用) */
    readonly G_BANK: "g_bank";
    /** 李家嘴 - 日间 (通用) */
    readonly G_LJZ_DAY: "g_ljz_day";
    /** 人民广场 (通用) */
    readonly G_PEOPLES_SQUARE: "g_peoples_square";
    /** 人民广场 - 黎明 (通用) */
    readonly G_PEOPLES_SQUARE_DAWN: "g_peoples_square_dawn";
    /** 北欧城市 (通用) */
    readonly G_NORTH_EURO_CITY: "g_north_euro_city";
    /** 城市公园 (通用) */
    readonly G_CITY_PARK: "g_city_park";
    /** 乡村春景 (通用) */
    readonly G_RURAL_SPRING_SCENE: "g_rural_spring_scene";
    /** 欧式花园 (通用) */
    readonly G_EURO_GARDEN: "g_euro_garden";
    /** 清晨 (通用) */
    readonly G_MORNING: "g_morning";
    /** 冯德尔公园 - 晴天 (通用) */
    readonly G_SUNNY_VONDELPARK: "g_sunny_vondelpark";
    /** 海湾游览 (通用) */
    readonly G_BAY_TOUR: "g_bay_tour";
    /** 威尼斯 - 黎明 (通用) */
    readonly G_VENICE_DAWN: "g_venice_dawn";
    /** 海天一色 (通用) */
    readonly G_SEA_SKY: "g_sea_sky";
    /** 乌姆兰加 - 日出 (通用) */
    readonly G_UMHLANGA_SUNRISE: "g_umhlanga_sunrise";
    /** 北国雪景 (通用) */
    readonly G_NORTHERN_SNOW: "g_northern_snow";
    /** 利连斯泰因 (通用) */
    readonly G_LILIENSTEIN: "g_lilienstein";
    /** 落叶 (通用) */
    readonly G_FALLEN_LEAVES: "g_fallen_leaves";
    /** 秋景 (通用) */
    readonly G_AUTUMN_SCENE: "g_autumn_scene";
    /** 山间台地 (通用) */
    readonly G_MOUNTAIN_LEDGE: "g_mountain_ledge";
    /** 夸塔尼 (通用) */
    readonly G_QWANTANI: "g_qwantani";
    /** 铁路桥 (通用) */
    readonly G_RAILWAY_BRIDGES: "g_railway_bridges";
    /** 红山曲线 (通用) */
    readonly G_RED_HILL_CURVE: "g_red_hill_curve";
    /** 山顶 (通用) */
    readonly G_HILLTOP: "g_hilltop";
    /** 无户外场景 (通用) */
    readonly G_NOOUTDOORSCENE: "g_nooutdoor";
    /** 莱斯森林田野 (植被) */
    readonly V_LYTH_WOOD_FIELD: "v_lyth_wood_field";
    /** 舒都湖 (植被) */
    readonly V_SHUDULAKE: "v_shudulake";
    /** 西蒙镇岩石 (植被) */
    readonly V_SIMONS_TOWN: "v_simons_town_rocks";
    /** 三位一体山 (植被) */
    readonly V_DREIFALT: "v_dreifaltigkeitsberg";
    /** 湖泊 (植被) */
    readonly V_LAKE: "v_lake";
    /** 森林公园 (植被) */
    readonly V_FOREST_PARK: "v_forest_park";
    /** 李家嘴 - 日间 (云) */
    readonly C_LJZ_DAY: "c_ljz_day";
    /** 人民广场 (云) */
    readonly C_PEOPLES_SQUARE: "c_peoples_square";
    /** 人民广场 - 黎明 (云) */
    readonly C_PEOPLES_SQUARE_DAWN: "c_peoples_square_dawn";
    /** 北欧城市 (云) */
    readonly C_NORTH_EURO_CITY: "c_north_euro_city";
    /** 海湾游览 (云) */
    readonly C_BAY_TOUR: "c_bay_tour";
    /** 威尼斯 - 黎明 (云) */
    readonly C_VENICE_DAWN: "c_venice_dawn";
    /** 乌姆兰加 - 日出 (云) */
    readonly C_UMHLANGA_SUNRISE: "c_umhlanga_sunrise";
    /** 海天一色 (云) */
    readonly C_SEA_SKY: "c_sea_sky";
    /** 北国雪景 (云) */
    readonly C_NORTHERN_SNOW: "c_northern_snow";
    /** 欧式花园 (云) */
    readonly C_EURO_GARDEN: "c_euro_garden";
    /** 城市公园 (云) */
    readonly C_CITY_PARK: "c_city_park";
    /** 乡村春景 (云) */
    readonly C_RURAL_SPRING_SCENE: "c_rural_spring_scene";
    /** 清晨 (云) */
    readonly C_MORNING: "c_morning";
    /** 冯德尔公园 - 晴天 (云) */
    readonly C_SUNNY_VONDELPARK: "c_sunny_vondelpark";
    /** 落叶 (云) */
    readonly C_FALLEN_LEAVES: "c_fallen_leaves";
    /** 秋景 (云) */
    readonly C_AUTUMN_SCENE: "c_autumn_scene";
    /** 山间台地 (云) */
    readonly C_MOUNTAIN_LEDGE: "c_mountain_ledge";
    /** 无户外场景 (云) */
    readonly C_NOOUTDOORSCENE: "c_nooutdoor";
    /** 海岸黄昏 (植被-黄昏) */
    readonly VD_COASTAL_DUSK: "vd_coastal_dusk";
    /** 加塔黄昏 (植被-黄昏) */
    readonly VD_GATA_DUSK: "vd_gata_dusk";
    /** 艾勒黄昏 (植被-黄昏) */
    readonly VD_ELLE_DUSK: "vd_elle_dusk";
    /** 西蒙镇岩石 (植被-黄昏) */
    readonly VD_SIMONS_TOWN: "vd_simons_town_rocks";
    /** 三位一体山 (植被-黄昏) */
    readonly VD_DREIFALT: "vd_dreifaltigkeitsberg";
    /** 森林公园 (植被-黄昏) */
    readonly VD_FOREST_PARK: "vd_forest_park";
    /** 莱斯森林田野 (植被-夜晚) */
    readonly VN_LYTH_WOOD_FIELD: "vn_lyth_wood_field";
    /** 舒都湖 (植被-夜晚) */
    readonly VN_SHUDULAKE: "vn_shudulake";
    /** 西蒙镇岩石 (植被-夜晚) */
    readonly VN_SIMONS_TOWN: "vn_simons_town_rocks";
    /** 三位一体山 (植被-夜晚) */
    readonly VN_DREIFALT: "vn_dreifaltigkeitsberg";
    /** 湖泊 (植被-夜晚) */
    readonly VN_LAKE: "vn_lake";
    /** 森林公园 (植被-夜晚) */
    readonly VN_FOREST_PARK: "vn_forest_park";
  };
};

/**
 * HDR环境贴图名称列表
 * 包含所有HDR环境贴图UID值的只读数组（已冻结，不可修改）
 * @readonly
 */
export declare const HdrNameList: ReadonlyArray<string>;