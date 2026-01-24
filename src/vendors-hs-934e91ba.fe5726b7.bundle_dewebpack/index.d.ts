/**
 * Webpack Bundle Type Definitions
 * 
 * This file contains type definitions for a bundle that includes the Clipper library
 * and various module exports. The bundle has been processed through Webpack and contains
 * multiple modules identified by numeric IDs and named exports.
 */

// ============================================================================
// Core Clipper Library Exports
// ============================================================================

/**
 * Re-exported types and functions from the 'b' module (module 85521)
 * Typically contains base utility functions and types
 */
export * from './b';

/**
 * Re-exported types and functions from the Clipper module (module 9478)
 * The main Clipper library for polygon clipping operations
 */
export * from './clipper';

/**
 * Re-exported ClipType enumeration (module 45019)
 * Defines the types of clipping operations (intersection, union, difference, xor)
 */
export * from './cliptype';

/**
 * Re-exported native Clipper library loaded format types (module 58829)
 * Defines the format specifications for the native Clipper library when loaded
 */
export * from './nativeclipperlibloadedformat';

/**
 * Re-exported PolyTree types and classes (module 444357)
 * Provides tree structure representation of polygon hierarchies
 */
export * from './polytree';

// ============================================================================
// Module Metadata
// ============================================================================

/**
 * Enumeration of all module IDs present in this Webpack bundle
 * Used for module resolution and debugging purposes
 */
export enum ModuleId {
  /** Module 442689 */
  MODULE_442689 = 442689,
  /** Module 347881 */
  MODULE_347881 = 347881,
  /** Module 49209 */
  MODULE_49209 = 49209,
  /** Module 115536 */
  MODULE_115536 = 115536,
  /** Module 396880 */
  MODULE_396880 = 396880,
  /** Module 440414 */
  MODULE_440414 = 440414,
  /** Module 84086 */
  MODULE_84086 = 84086,
  /** Module 412995 */
  MODULE_412995 = 412995,
  /** Module 473606 */
  MODULE_473606 = 473606,
  /** Module 21 */
  MODULE_21 = 21,
  /** Module 96835 */
  MODULE_96835 = 96835,
  /** Module 283533 */
  MODULE_283533 = 283533,
  /** Module 146524 */
  MODULE_146524 = 146524,
  /** Module 166514 */
  MODULE_166514 = 166514,
  /** Module 178264 */
  MODULE_178264 = 178264,
  /** Module 194261 */
  MODULE_194261 = 194261,
  /** Module 273835 */
  MODULE_273835 = 273835,
  /** Module 309250 */
  MODULE_309250 = 309250,
  /** Module 428762 */
  MODULE_428762 = 428762,
  /** Module 15 */
  MODULE_15 = 15,
  /** Module 389570 */
  MODULE_389570 = 389570,
  /** Module 127517 */
  MODULE_127517 = 127517,
  /** Module 5 */
  MODULE_5 = 5,
  /** Module 296869 */
  MODULE_296869 = 296869,
  /** Module 247589 */
  MODULE_247589 = 247589,
  /** Module 379127 */
  MODULE_379127 = 379127,
  /** Module 133539 */
  MODULE_133539 = 133539,
  /** Module 493929 */
  MODULE_493929 = 493929,
  /** Module 3 */
  MODULE_3 = 3,
  /** Module 347483 */
  MODULE_347483 = 347483,
  /** Module 418347 */
  MODULE_418347 = 418347,
  /** Module 170747 */
  MODULE_170747 = 170747,
  /** Module 320795 */
  MODULE_320795 = 320795,
  /** Module 351504 */
  MODULE_351504 = 351504,
  /** Module 165326 */
  MODULE_165326 = 165326,
  /** Module 16 */
  MODULE_16 = 16,
  /** Module 2 */
  MODULE_2 = 2,
  /** Module 18812 */
  MODULE_18812 = 18812,
  /** Module 85521 - Base module (b.js) */
  MODULE_85521 = 85521,
  /** Module 27542 */
  MODULE_27542 = 27542,
  /** Module 147616 */
  MODULE_147616 = 147616,
  /** Module 14 */
  MODULE_14 = 14,
  /** Module 18 */
  MODULE_18 = 18,
  /** Module 286699 */
  MODULE_286699 = 286699,
  /** Module 295154 */
  MODULE_295154 = 295154,
  /** Module 38712 */
  MODULE_38712 = 38712,
  /** Module 140709 */
  MODULE_140709 = 140709,
  /** Module 157642 */
  MODULE_157642 = 157642,
  /** Module 414621 */
  MODULE_414621 = 414621,
  /** Module 269547 */
  MODULE_269547 = 269547,
  /** Module 191766 */
  MODULE_191766 = 191766,
  /** Module 326845 */
  MODULE_326845 = 326845,
  /** Module 430433 */
  MODULE_430433 = 430433,
  /** Module 53491 */
  MODULE_53491 = 53491,
  /** Module 106603 */
  MODULE_106603 = 106603,
  /** Module 34034 */
  MODULE_34034 = 34034,
  /** Module 417945 */
  MODULE_417945 = 417945,
  /** Module 189559 */
  MODULE_189559 = 189559,
  /** Module 240896 */
  MODULE_240896 = 240896,
  /** Module 313156 */
  MODULE_313156 = 313156,
  /** Module 146220 */
  MODULE_146220 = 146220,
  /** Module 477592 */
  MODULE_477592 = 477592,
  /** Module 48257 */
  MODULE_48257 = 48257,
  /** Module 396450 */
  MODULE_396450 = 396450,
  /** Module 1 */
  MODULE_1 = 1,
  /** Module 158520 */
  MODULE_158520 = 158520,
  /** Module 141474 */
  MODULE_141474 = 141474,
  /** Module 189769 */
  MODULE_189769 = 189769,
  /** Module 166183 */
  MODULE_166183 = 166183,
  /** Module 265494 */
  MODULE_265494 = 265494,
  /** Module 84607 */
  MODULE_84607 = 84607,
  /** Module 425345 */
  MODULE_425345 = 425345,
  /** Module 13 */
  MODULE_13 = 13,
  /** Module 248794 */
  MODULE_248794 = 248794,
  /** Module 172834 */
  MODULE_172834 = 172834,
  /** Module 9478 - Clipper library */
  MODULE_9478 = 9478,
  /** Module 45019 - ClipType enumeration */
  MODULE_45019 = 45019,
  /** Module 375318 */
  MODULE_375318 = 375318,
  /** Module 348634 */
  MODULE_348634 = 348634,
  /** Module 389511 */
  MODULE_389511 = 389511,
  /** Module 199281 */
  MODULE_199281 = 199281,
  /** Module 274839 */
  MODULE_274839 = 274839,
  /** Module 420242 */
  MODULE_420242 = 420242,
  /** Module 434072 */
  MODULE_434072 = 434072,
  /** Module 440364 */
  MODULE_440364 = 440364,
  /** Module 7 */
  MODULE_7 = 7,
  /** Module 165476 */
  MODULE_165476 = 165476,
  /** Module 80732 */
  MODULE_80732 = 80732,
  /** Module 44099 */
  MODULE_44099 = 44099,
  /** Module 207700 */
  MODULE_207700 = 207700,
  /** Module 226013 */
  MODULE_226013 = 226013,
  /** Module 63524 */
  MODULE_63524 = 63524,
  /** Module 66543 */
  MODULE_66543 = 66543,
  /** Module 491447 */
  MODULE_491447 = 491447,
  /** Module 48818 */
  MODULE_48818 = 48818,
  /** Module 116078 */
  MODULE_116078 = 116078,
  /** Module 341953 */
  MODULE_341953 = 341953,
  /** Module 6164 */
  MODULE_6164 = 6164,
  /** Module 37331 */
  MODULE_37331 = 37331,
  /** Module 110458 */
  MODULE_110458 = 110458,
  /** Module 12 */
  MODULE_12 = 12,
  /** Module 11 */
  MODULE_11 = 11,
  /** Module 173976 */
  MODULE_173976 = 173976,
  /** Module 17 */
  MODULE_17 = 17,
  /** Module 20 */
  MODULE_20 = 20,
  /** Module 286435 */
  MODULE_286435 = 286435,
  /** Module 20727 */
  MODULE_20727 = 20727,
  /** Module 411483 */
  MODULE_411483 = 411483,
  /** Module 394540 */
  MODULE_394540 = 394540,
  /** Module 308121 */
  MODULE_308121 = 308121,
  /** Module 33302 */
  MODULE_33302 = 33302,
  /** Module 352072 */
  MODULE_352072 = 352072,
  /** Module 122686 */
  MODULE_122686 = 122686,
  /** Module 399244 */
  MODULE_399244 = 399244,
  /** Module 423027 */
  MODULE_423027 = 423027,
  /** Module 58829 - Native Clipper library loaded format */
  MODULE_58829 = 58829,
  /** Module 388160 */
  MODULE_388160 = 388160,
  /** Module 109565 */
  MODULE_109565 = 109565,
  /** Module 472123 */
  MODULE_472123 = 472123,
  /** Module 9278 */
  MODULE_9278 = 9278,
  /** Module 360548 */
  MODULE_360548 = 360548,
  /** Module 468662 */
  MODULE_468662 = 468662,
  /** Module 242017 */
  MODULE_242017 = 242017,
  /** Module 275042 */
  MODULE_275042 = 275042,
  /** Module 81837 */
  MODULE_81837 = 81837,
  /** Module 184917 */
  MODULE_184917 = 184917,
  /** Module 308579 */
  MODULE_308579 = 308579,
  /** Module 263437 */
  MODULE_263437 = 263437,
  /** Module 19 */
  MODULE_19 = 19,
  /** Module 69882 */
  MODULE_69882 = 69882,
  /** Module 71373 */
  MODULE_71373 = 71373,
  /** Module 471677 */
  MODULE_471677 = 471677,
  /** Module 38357 */
  MODULE_38357 = 38357,
  /** Module 69548 */
  MODULE_69548 = 69548,
  /** Module 446094 */
  MODULE_446094 = 446094,
  /** Module 196448 */
  MODULE_196448 = 196448,
  /** Module 444357 - PolyTree */
  MODULE_444357 = 444357,
  /** Module 280253 */
  MODULE_280253 = 280253,
  /** Module 79216 */
  MODULE_79216 = 79216,
  /** Module 434143 */
  MODULE_434143 = 434143,
  /** Module 440081 */
  MODULE_440081 = 440081,
  /** Module 6 */
  MODULE_6 = 6,
  /** Module 351589 */
  MODULE_351589 = 351589,
  /** Module 384603 */
  MODULE_384603 = 384603,
  /** Module 10 */
  MODULE_10 = 10,
  /** Module 475420 */
  MODULE_475420 = 475420,
  /** Module 28122 */
  MODULE_28122 = 28122,
  /** Module 61593 */
  MODULE_61593 = 61593,
  /** Module 89845 */
  MODULE_89845 = 89845,
  /** Module 241820 */
  MODULE_241820 = 241820,
  /** Module 131004 */
  MODULE_131004 = 131004,
  /** Module 148440 */
  MODULE_148440 = 148440,
  /** Module 393324 */
  MODULE_393324 = 393324,
  /** Module 495493 */
  MODULE_495493 = 495493,
  /** Module 274587 */
  MODULE_274587 = 274587,
  /** Module 364441 */
  MODULE_364441 = 364441,
  /** Module 269657 */
  MODULE_269657 = 269657,
  /** Module 490126 */
  MODULE_490126 = 490126,
  /** Module 79922 */
  MODULE_79922 = 79922,
  /** Module 494090 */
  MODULE_494090 = 494090,
  /** Module 280873 */
  MODULE_280873 = 280873,
  /** Module 190585 */
  MODULE_190585 = 190585,
  /** Module 285803 */
  MODULE_285803 = 285803,
  /** Module 413181 */
  MODULE_413181 = 413181,
  /** Module 460717 */
  MODULE_460717 = 460717,
  /** Module 193274 */
  MODULE_193274 = 193274,
  /** Module 195776 */
  MODULE_195776 = 195776,
  /** Module 337245 */
  MODULE_337245 = 337245,
  /** Module 287589 */
  MODULE_287589 = 287589,
  /** Module 9 */
  MODULE_9 = 9,
  /** Module 82659 */
  MODULE_82659 = 82659,
  /** Module 100156 */
  MODULE_100156 = 100156,
  /** Module 104627 */
  MODULE_104627 = 104627,
  /** Module 154446 */
  MODULE_154446 = 154446,
  /** Module 424904 */
  MODULE_424904 = 424904,
  /** Module 8 */
  MODULE_8 = 8,
  /** Module 4 */
  MODULE_4 = 4,
  /** Module 208582 */
  MODULE_208582 = 208582,
  /** Module 22 */
  MODULE_22 = 22,
  /** Module 379081 */
  MODULE_379081 = 379081,
  /** Module 151594 */
  MODULE_151594 = 151594,
  /** Module 7774 */
  MODULE_7774 = 7774,
  /** Module 30794 */
  MODULE_30794 = 30794,
  /** Module 66282 */
  MODULE_66282 = 66282,
  /** Module 113904 */
  MODULE_113904 = 113904,
  /** Module 3721 */
  MODULE_3721 = 3721,
  /** Module 58545 */
  MODULE_58545 = 58545,
  /** Module 435627 */
  MODULE_435627 = 435627,
  /** Module 329367 */
  MODULE_329367 = 329367,
  /** Module 482910 */
  MODULE_482910 = 482910,
  /** Module 491573 */
  MODULE_491573 = 491573,
  /** Module 176585 */
  MODULE_176585 = 176585,
  /** Module 179012 */
  MODULE_179012 = 179012,
  /** Module 18897 */
  MODULE_18897 = 18897,
  /** Module 478440 */
  MODULE_478440 = 478440,
  /** Module 457672 */
  MODULE_457672 = 457672,
  /** Module 189611 */
  MODULE_189611 = 189611,
}

/**
 * Named module identifier mapping
 * Maps semantic names to their corresponding module identifiers
 */
export interface NamedModuleMap {
  /** Object property attributes helper module */
  withAttributes: 'module_withattributes.js';
  /** Type converter helper module */
  withConverter: 'module_withconverter.js';
  /** Base utilities module */
  b: 'b.js';
  /** Object.defineProperty polyfill/helper */
  defineProperty: 'module_defineproperty.js';
  /** Object.getOwnPropertyDescriptor polyfill/helper */
  getOwnPropertyDescriptor: 'module_getownpropertydescriptor.js';
  /** Main Clipper library module */
  clipper: 'clipper.js';
  /** ClipType enumeration module */
  cliptype: 'cliptype.js';
  /** Array.prototype.includes polyfill/helper */
  includes: 'module_includes.js';
  /** Object.getPrototypeOf polyfill/helper */
  getPrototypeOf: 'module_getprototypeof.js';
  /** Reflect.deleteProperty helper */
  deleteProperty: 'module_deleteproperty.js';
  /** Native Clipper library format definitions */
  nativeclipperlibloadedformat: 'nativeclipperlibloadedformat.js';
  /** Array.prototype.remove helper */
  remove: 'module_remove.js';
  /** PolyTree data structure module */
  polytree: 'polytree.js';
  /** Map/Set.prototype.set helper */
  set: 'module_set.js';
  /** Sequence key helper */
  keySeq: 'module_keyseq.js';
  /** Object.setPrototypeOf polyfill/helper */
  setPrototypeOf: 'module_setprototypeof.js';
  /** Value accessor helper */
  value: 'module_value.js';
  /** Map/Set.prototype.has helper */
  has: 'module_has.js';
  /** Reflect.ownKeys helper */
  ownKeys: 'module_ownkeys.js';
  /** Getter helper */
  get: 'module_get.js';
}

/**
 * Bundle configuration and metadata
 */
export interface WebpackBundleMetadata {
  /** Total number of modules in the bundle */
  readonly moduleCount: 236;
  /** List of all module identifiers */
  readonly moduleIds: ReadonlyArray<ModuleId | string>;
  /** Named module mappings */
  readonly namedModules: NamedModuleMap;
  /** Bundle version information */
  readonly version?: string;
  /** Build timestamp */
  readonly buildTimestamp?: number;
}