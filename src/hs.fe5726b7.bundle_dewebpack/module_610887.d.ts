/**
 * Locale module mapping for moment.js or similar i18n library
 * Maps locale identifiers to their corresponding module IDs
 */

/**
 * Locale identifier type - represents supported locale codes
 */
type LocaleIdentifier = 
  | "./af" | "./af.js"
  | "./ar" | "./ar.js"
  | "./ar-dz" | "./ar-dz.js"
  | "./ar-kw" | "./ar-kw.js"
  | "./ar-ly" | "./ar-ly.js"
  | "./ar-ma" | "./ar-ma.js"
  | "./ar-ps" | "./ar-ps.js"
  | "./ar-sa" | "./ar-sa.js"
  | "./ar-tn" | "./ar-tn.js"
  | "./az" | "./az.js"
  | "./be" | "./be.js"
  | "./bg" | "./bg.js"
  | "./bm" | "./bm.js"
  | "./bn" | "./bn.js"
  | "./bn-bd" | "./bn-bd.js"
  | "./bo" | "./bo.js"
  | "./br" | "./br.js"
  | "./bs" | "./bs.js"
  | "./ca" | "./ca.js"
  | "./cs" | "./cs.js"
  | "./cv" | "./cv.js"
  | "./cy" | "./cy.js"
  | "./da" | "./da.js"
  | "./de" | "./de.js"
  | "./de-at" | "./de-at.js"
  | "./de-ch" | "./de-ch.js"
  | "./dv" | "./dv.js"
  | "./el" | "./el.js"
  | "./en-au" | "./en-au.js"
  | "./en-ca" | "./en-ca.js"
  | "./en-gb" | "./en-gb.js"
  | "./en-ie" | "./en-ie.js"
  | "./en-il" | "./en-il.js"
  | "./en-in" | "./en-in.js"
  | "./en-nz" | "./en-nz.js"
  | "./en-sg" | "./en-sg.js"
  | "./eo" | "./eo.js"
  | "./es" | "./es.js"
  | "./es-do" | "./es-do.js"
  | "./es-mx" | "./es-mx.js"
  | "./es-us" | "./es-us.js"
  | "./et" | "./et.js"
  | "./eu" | "./eu.js"
  | "./fa" | "./fa.js"
  | "./fi" | "./fi.js"
  | "./fil" | "./fil.js"
  | "./fo" | "./fo.js"
  | "./fr" | "./fr.js"
  | "./fr-ca" | "./fr-ca.js"
  | "./fr-ch" | "./fr-ch.js"
  | "./fy" | "./fy.js"
  | "./ga" | "./ga.js"
  | "./gd" | "./gd.js"
  | "./gl" | "./gl.js"
  | "./gom-deva" | "./gom-deva.js"
  | "./gom-latn" | "./gom-latn.js"
  | "./gu" | "./gu.js"
  | "./he" | "./he.js"
  | "./hi" | "./hi.js"
  | "./hr" | "./hr.js"
  | "./hu" | "./hu.js"
  | "./hy-am" | "./hy-am.js"
  | "./id" | "./id.js"
  | "./is" | "./is.js"
  | "./it" | "./it.js"
  | "./it-ch" | "./it-ch.js"
  | "./ja" | "./ja.js"
  | "./jv" | "./jv.js"
  | "./ka" | "./ka.js"
  | "./kk" | "./kk.js"
  | "./km" | "./km.js"
  | "./kn" | "./kn.js"
  | "./ko" | "./ko.js"
  | "./ku" | "./ku.js"
  | "./ku-kmr" | "./ku-kmr.js"
  | "./ky" | "./ky.js"
  | "./lb" | "./lb.js"
  | "./lo" | "./lo.js"
  | "./lt" | "./lt.js"
  | "./lv" | "./lv.js"
  | "./me" | "./me.js"
  | "./mi" | "./mi.js"
  | "./mk" | "./mk.js"
  | "./ml" | "./ml.js"
  | "./mn" | "./mn.js"
  | "./mr" | "./mr.js"
  | "./ms" | "./ms.js"
  | "./ms-my" | "./ms-my.js"
  | "./mt" | "./mt.js"
  | "./my" | "./my.js"
  | "./nb" | "./nb.js"
  | "./ne" | "./ne.js"
  | "./nl" | "./nl.js"
  | "./nl-be" | "./nl-be.js"
  | "./nn" | "./nn.js"
  | "./oc-lnc" | "./oc-lnc.js"
  | "./pa-in" | "./pa-in.js"
  | "./pl" | "./pl.js"
  | "./pt" | "./pt.js"
  | "./pt-br" | "./pt-br.js"
  | "./ro" | "./ro.js"
  | "./ru" | "./ru.js"
  | "./sd" | "./sd.js"
  | "./se" | "./se.js"
  | "./si" | "./si.js"
  | "./sk" | "./sk.js"
  | "./sl" | "./sl.js"
  | "./sq" | "./sq.js"
  | "./sr" | "./sr.js"
  | "./sr-cyrl" | "./sr-cyrl.js"
  | "./ss" | "./ss.js"
  | "./sv" | "./sv.js"
  | "./sw" | "./sw.js"
  | "./ta" | "./ta.js"
  | "./te" | "./te.js"
  | "./tet" | "./tet.js"
  | "./tg" | "./tg.js"
  | "./th" | "./th.js"
  | "./tk" | "./tk.js"
  | "./tl-ph" | "./tl-ph.js"
  | "./tlh" | "./tlh.js"
  | "./tr" | "./tr.js"
  | "./tzl" | "./tzl.js"
  | "./tzm" | "./tzm.js"
  | "./tzm-latn" | "./tzm-latn.js"
  | "./ug-cn" | "./ug-cn.js"
  | "./uk" | "./uk.js"
  | "./ur" | "./ur.js"
  | "./uz" | "./uz.js"
  | "./uz-latn" | "./uz-latn.js"
  | "./vi" | "./vi.js"
  | "./x-pseudo" | "./x-pseudo.js"
  | "./yo" | "./yo.js"
  | "./zh-cn" | "./zh-cn.js"
  | "./zh-hk" | "./zh-hk.js"
  | "./zh-mo" | "./zh-mo.js"
  | "./zh-tw" | "./zh-tw.js";

/**
 * Module ID type - numeric identifier for webpack modules
 */
type ModuleId = number;

/**
 * Mapping of locale identifiers to module IDs
 */
interface LocaleModuleMap {
  readonly [key: string]: ModuleId;
}

/**
 * Locale loader function interface
 */
interface LocaleLoader {
  /**
   * Load a locale module by its identifier
   * @param localeId - The locale identifier (e.g., "./en-us" or "./en-us.js")
   * @returns The loaded locale module
   * @throws {ModuleNotFoundError} When the locale identifier is not found
   */
  (localeId: LocaleIdentifier): unknown;

  /**
   * Get all available locale identifiers
   * @returns Array of all supported locale keys
   */
  keys(): string[];

  /**
   * Resolve a locale identifier to its module ID
   * @param localeId - The locale identifier to resolve
   * @returns The numeric module ID
   * @throws {ModuleNotFoundError} When the locale identifier is not found
   */
  resolve(localeId: LocaleIdentifier): ModuleId;

  /**
   * The unique module ID for this loader
   */
  readonly id: 610887;
}

/**
 * Error thrown when a requested module cannot be found
 */
interface ModuleNotFoundError extends Error {
  code: "MODULE_NOT_FOUND";
  message: string;
}

/**
 * Locale module loader
 * Dynamically loads locale configuration files for internationalization
 */
declare const localeLoader: LocaleLoader;

export = localeLoader;