import moment from 'moment';

interface LocaleWords {
  ss: [string, string, string];
  m: [string, string];
  mm: [string, string, string];
  h: [string, string];
  hh: [string, string, string];
  dd: [string, string, string];
  MM: [string, string, string];
  yy: [string, string, string];
}

interface TranslationHelper {
  words: LocaleWords;
  correctGrammaticalCase: (count: number, forms: string[]) => string;
  translate: (count: number, withoutSuffix: boolean, key: string) => string;
}

const translationHelper: TranslationHelper = {
  words: {
    ss: ['sekund', 'sekunda', 'sekundi'],
    m: ['jedan minut', 'jednog minuta'],
    mm: ['minut', 'minuta', 'minuta'],
    h: ['jedan sat', 'jednog sata'],
    hh: ['sat', 'sata', 'sati'],
    dd: ['dan', 'dana', 'dana'],
    MM: ['mjesec', 'mjeseca', 'mjeseci'],
    yy: ['godina', 'godine', 'godina']
  },
  
  correctGrammaticalCase(count: number, forms: string[]): string {
    return count === 1 ? forms[0] : count >= 2 && count <= 4 ? forms[1] : forms[2];
  },
  
  translate(count: number, withoutSuffix: boolean, key: string): string {
    const forms = translationHelper.words[key as keyof LocaleWords];
    
    if (key.length === 1) {
      return withoutSuffix ? forms[0] : forms[1];
    }
    
    return `${count} ${translationHelper.correctGrammaticalCase(count, forms)}`;
  }
};

moment.defineLocale('me', {
  months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
  monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
  monthsParseExact: true,
  weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
  weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
  weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd, D. MMMM YYYY H:mm'
  },
  calendar: {
    sameDay: '[danas u] LT',
    nextDay: '[sjutra u] LT',
    nextWeek(): string {
      switch (this.day()) {
        case 0:
          return '[u] [nedjelju] [u] LT';
        case 3:
          return '[u] [srijedu] [u] LT';
        case 6:
          return '[u] [subotu] [u] LT';
        case 1:
        case 2:
        case 4:
        case 5:
          return '[u] dddd [u] LT';
        default:
          return '[u] dddd [u] LT';
      }
    },
    lastDay: '[juče u] LT',
    lastWeek(): string {
      const lastWeekFormats = [
        '[prošle] [nedjelje] [u] LT',
        '[prošlog] [ponedjeljka] [u] LT',
        '[prošlog] [utorka] [u] LT',
        '[prošle] [srijede] [u] LT',
        '[prošlog] [četvrtka] [u] LT',
        '[prošlog] [petka] [u] LT',
        '[prošle] [subote] [u] LT'
      ];
      return lastWeekFormats[this.day()];
    },
    sameElse: 'L'
  },
  relativeTime: {
    future: 'za %s',
    past: 'prije %s',
    s: 'nekoliko sekundi',
    ss: translationHelper.translate,
    m: translationHelper.translate,
    mm: translationHelper.translate,
    h: translationHelper.translate,
    hh: translationHelper.translate,
    d: 'dan',
    dd: translationHelper.translate,
    M: 'mjesec',
    MM: translationHelper.translate,
    y: 'godinu',
    yy: translationHelper.translate
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: '%d.',
  week: {
    dow: 1,
    doy: 7
  }
});

export default moment;