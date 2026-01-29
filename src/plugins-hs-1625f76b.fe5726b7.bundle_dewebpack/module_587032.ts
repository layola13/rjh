const cssContent = `.hsc-merchant-page-container {
            \n width: 280px;
            \n height: 100%;
            \n border-radius: 10px;
            \n overflow: hidden;
            \n
        }\n.hsc-merchant-page-container .hsc-back-header {
        \n height: 40px;
        \n margin: 10px 0 8px 12px;
        \n
    }\n.hsc-merchant-page-container .hsc-back-header .back-tip {
    \n font-family: 'AlibabaPuHuiTi-Bold' !important;
    \n font-size: 16px;
    \n color: #33353b;
    \n cursor: pointer;
    \n
}\n.hsc-merchant-page-container .loading img {
\n position: absolute;
\n left: calc(50% - 20px);
\n top: 50%;
\n width: 40px;
\n height: 40px;
\n
}\n.hsc-merchant-page-container .merchant-search-icon {
\n position: absolute;
\n right: 12px;
\n top: 17px;
\n
}\n.hsc-merchant-page-container .high-commision {
\n padding: 0px 18px;
\n max-height: calc(100% - 117px);
\n
}\n.hsc-merchant-page-container .high-commision .header {
\n display: flex;
\n align-items: center;
\n justify-content: space-between;
\n margin-bottom: 20px;
\n margin-top: 10px;
\n
}\n.hsc-merchant-page-container .high-commision .header .text {
\n font-size: 14px;
\n color: #33353b;
\n font-weight: bold;
\n
}\n.hsc-merchant-page-container .high-commision .header .date {
\n color: #60646f;
\n font-weight: 300;
\n
}\n.hsc-merchant-page-container .high-commision .merchant-category-card {
\n position: relative;
\n margin-top: 10px;
\n margin-bottom: 20px;
\n border-radius: 4px;
\n
}\n.hsc-merchant-page-container .high-commision .merchant-category-card .merchant-category-card-name {
\n font-size: 14px;
\n height: 18px;
\n line-height: 18px;
\n margin: 10px 0;
\n color: #33353b;
\n font-weight: bold;
\n
}\n.hsc-merchant-page-container .high-commision .merchant-category-card .merchant-category-more {
\n position: absolute;
\n width: 60px;
\n top: 0;
\n text-align: right;
\n right: 5px;
\n color: #33353b;
\n font-weight: 300;
\n font-size: 12px;
\n line-height: 18px;
\n height: 18px;
\n cursor: pointer;
\n
}\n.hsc-merchant-page-container .high-commision .merchant-category-card .merchant-category-more:hover {
\n color: #396efe;
\n
}\n.hsc-merchant-page-container .high-commision .merchant-category-card .merchant-img-container {
\n display: flex;
\n justify-content: left;
\n width: 100%;
\n
}\n.hsc-merchant-page-container .high-commision .merchant-category-card .merchant-img-container .merchant-img {
\n width: 72px;
\n height: 72px;
\n margin: 5px;
\n border: 1px solid #f2f2f2;
\n border-radius: 8px;
\n cursor: pointer;
\n
}\n.hsc-merchant-page-container .high-commision .merchant-category-card .merchant-img-container .merchant-img:first-child {
\n margin-left: 0px;
\n
}\n.hsc-merchant-page-container .high-commision .merchant-category-card .merchant-img-container .merchant-img:last-child {
\n margin-right: 0px;
\n
}\n.hsc-merchant-page-container .high-commision .merchant-category-card .merchant-img-container .merchant-img img {
\n border-radius: 8px;
\n width: 100%;
\n height: 100%;
\n
}\n.hsc-merchant-page-container .high-commision .merchant-category-card .merchant-img-container .merchant-img:hover {
\n box-shadow: 0px 4px 20px 0px rgba(86, 95, 121, 0.2);
\n
}\n.hsc-merchant-page-container .shop-list {
\n overflow: hidden;
\n padding-top: 8px;
\n
}\n.hsc-merchant-page-container .hsc-search-box {
\n margin: 0 18px 0 13px;
\n padding-bottom: 10px;
\n
}\n.hsc-merchant-page-container .header-area .hsc-back-header {
\n margin-left: 10px;
\n margin-bottom: 5px;
\n
}`;

interface CSSLoader {
  (sourceMap: boolean): Array<[string, string]>;
  push: (entry: [string, string]) => void;
}

export default function loadStyles(cssLoaderFactory: (sourceMap: boolean) => CSSLoader): CSSLoader {
  const loader = cssLoaderFactory(false);
  loader.push(['module_587032', cssContent]);
  return loader;
}