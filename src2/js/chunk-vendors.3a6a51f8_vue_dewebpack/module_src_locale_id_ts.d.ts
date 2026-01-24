/**
 * Indonesian (Bahasa Indonesia) locale configuration for Vuetify
 * Konfigurasi lokal Bahasa Indonesia untuk Vuetify
 */

/**
 * Aria label configuration for data table sorting
 * Konfigurasi label aria untuk pengurutan tabel data
 */
interface DataTableAriaLabel {
  /** Label when sorted in descending order / Label saat diurutkan menurun */
  sortDescending: string;
  /** Label when sorted in ascending order / Label saat diurutkan menaik */
  sortAscending: string;
  /** Label when not sorted / Label saat tidak diurutkan */
  sortNone: string;
  /** Label to activate for removing sort / Label untuk mengaktifkan penghapusan urutan */
  activateNone: string;
  /** Label to activate descending sort / Label untuk mengaktifkan urutan menurun */
  activateDescending: string;
  /** Label to activate ascending sort / Label untuk mengaktifkan urutan menaik */
  activateAscending: string;
}

/**
 * Data table configuration
 * Konfigurasi tabel data
 */
interface DataTable {
  /** Text for items per page selector / Teks untuk pemilih item per halaman */
  itemsPerPageText: string;
  /** Aria labels for accessibility / Label aria untuk aksesibilitas */
  ariaLabel: DataTableAriaLabel;
  /** Text for sort by label / Teks untuk label urutkan berdasarkan */
  sortBy: string;
}

/**
 * Data iterator configuration
 * Konfigurasi iterator data
 */
interface DataIterator {
  /** Text shown when no results found / Teks yang ditampilkan saat tidak ada hasil */
  noResultsText: string;
  /** Text shown while loading / Teks yang ditampilkan saat memuat */
  loadingText: string;
}

/**
 * Pagination aria label configuration
 * Konfigurasi label aria untuk pagination
 */
interface PaginationAriaLabel {
  /** Wrapper aria label / Label aria pembungkus */
  wrapper: string;
  /** Next page aria label / Label aria halaman berikutnya */
  next: string;
  /** Previous page aria label / Label aria halaman sebelumnya */
  previous: string;
  /** Page aria label with page number / Label aria halaman dengan nomor halaman */
  page: string;
  /** Current page aria label / Label aria halaman saat ini */
  currentPage: string;
}

/**
 * Pagination configuration
 * Konfigurasi pagination
 */
interface Pagination {
  /** Aria labels for accessibility / Label aria untuk aksesibilitas */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Data footer configuration
 * Konfigurasi footer data
 */
interface DataFooter {
  /** Text for items per page selector / Teks untuk pemilih item per halaman */
  itemsPerPageText: string;
  /** Text for all items option / Teks untuk opsi semua item */
  itemsPerPageAll: string;
  /** Text for next page button / Teks untuk tombol halaman berikutnya */
  nextPage: string;
  /** Text for previous page button / Teks untuk tombol halaman sebelumnya */
  prevPage: string;
  /** Text for first page button / Teks untuk tombol halaman pertama */
  firstPage: string;
  /** Text for last page button / Teks untuk tombol halaman terakhir */
  lastPage: string;
  /** Template text for page range display / Teks template untuk tampilan rentang halaman */
  pageText: string;
}

/**
 * Date picker configuration
 * Konfigurasi pemilih tanggal
 */
interface DatePicker {
  /** Text template for selected items count / Template teks untuk jumlah item terpilih */
  itemsSelected: string;
  /** Aria label for next month button / Label aria untuk tombol bulan berikutnya */
  nextMonthAriaLabel: string;
  /** Aria label for next year button / Label aria untuk tombol tahun berikutnya */
  nextYearAriaLabel: string;
  /** Aria label for previous month button / Label aria untuk tombol bulan sebelumnya */
  prevMonthAriaLabel: string;
  /** Aria label for previous year button / Label aria untuk tombol tahun sebelumnya */
  prevYearAriaLabel: string;
}

/**
 * Carousel aria label configuration
 * Konfigurasi label aria untuk carousel
 */
interface CarouselAriaLabel {
  /** Aria label template for carousel slide / Template label aria untuk slide carousel */
  delimiter: string;
}

/**
 * Carousel configuration
 * Konfigurasi carousel
 */
interface Carousel {
  /** Text for previous slide button / Teks untuk tombol slide sebelumnya */
  prev: string;
  /** Text for next slide button / Teks untuk tombol slide berikutnya */
  next: string;
  /** Aria labels for accessibility / Label aria untuk aksesibilitas */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar configuration
 * Konfigurasi kalender
 */
interface Calendar {
  /** Text template for additional events count / Template teks untuk jumlah event tambahan */
  moreEvents: string;
}

/**
 * File input configuration
 * Konfigurasi input file
 */
interface FileInput {
  /** Text template for file count / Template teks untuk jumlah file */
  counter: string;
  /** Text template for file count with total size / Template teks untuk jumlah file dengan ukuran total */
  counterSize: string;
}

/**
 * Time picker configuration
 * Konfigurasi pemilih waktu
 */
interface TimePicker {
  /** AM time indicator / Indikator waktu AM */
  am: string;
  /** PM time indicator / Indikator waktu PM */
  pm: string;
}

/**
 * Rating aria label configuration
 * Konfigurasi label aria untuk rating
 */
interface RatingAriaLabel {
  /** Aria label template for rating icon / Template label aria untuk ikon rating */
  icon: string;
}

/**
 * Rating configuration
 * Konfigurasi rating
 */
interface Rating {
  /** Aria labels for accessibility / Label aria untuk aksesibilitas */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete locale configuration interface
 * Interface konfigurasi lokal lengkap
 */
export interface VuetifyLocale {
  /** Badge component text / Teks komponen badge */
  badge: string;
  /** Close button text / Teks tombol tutup */
  close: string;
  /** Data iterator configuration / Konfigurasi iterator data */
  dataIterator: DataIterator;
  /** Data table configuration / Konfigurasi tabel data */
  dataTable: DataTable;
  /** Data footer configuration / Konfigurasi footer data */
  dataFooter: DataFooter;
  /** Date picker configuration / Konfigurasi pemilih tanggal */
  datePicker: DatePicker;
  /** Text shown when no data available / Teks yang ditampilkan saat tidak ada data */
  noDataText: string;
  /** Carousel configuration / Konfigurasi carousel */
  carousel: Carousel;
  /** Calendar configuration / Konfigurasi kalender */
  calendar: Calendar;
  /** File input configuration / Konfigurasi input file */
  fileInput: FileInput;
  /** Time picker configuration / Konfigurasi pemilih waktu */
  timePicker: TimePicker;
  /** Pagination configuration / Konfigurasi pagination */
  pagination: Pagination;
  /** Rating configuration / Konfigurasi rating */
  rating: Rating;
}

/**
 * Indonesian locale for Vuetify components
 * Lokal Bahasa Indonesia untuk komponen Vuetify
 */
declare const indonesianLocale: VuetifyLocale;

export default indonesianLocale;