const imageUrlImport1 = require('./assets/high-quality-pool.png');
const imageUrlImport2 = require('./assets/high-commission-pool.png');
const imageUrlImport3 = require('./assets/high-commission-pool-tpzz.png');

const cssContent = `.special-topic-container-new {
            
 height: 100%;
            

        }
.special-topic-container-new .special-topic-landing-page {
        
 height: 100%;
        
 width: 280px;
        
 background-color: hsl(0, 0%, 100%);
        
 border-radius: 10px;
        
 overflow: hidden;
        

    }
.special-topic-container-new .special-topic-landing-page .special-topic-header .hsc-back-header {
    
 margin: 10px 0 8px 18px !important;
    

}
.special-topic-container-new .special-topic-landing-page .special-topic-header .hsc-search-box {

 margin: 10px 18px 4px;


}
.special-topic-container-new .special-topic-landing-page .special-topic-header .special-search-icon {

 position: absolute;

 right: 16px;

 top: 16px;


}
.special-topic-container-new .special-topic-landing-page .model-area {

 overflow-y: auto;

 width: 100%;

 overflow-x: hidden;

 height: calc(100% - 58px);


}
.special-topic-container-new .special-topic-landing-page .model-area .model-pool-area {

 margin-bottom: 24px;


}
.special-topic-container-new .special-topic-landing-page .model-area .model-pool-area .title {

 font-size: 14px;

 margin-left: 18px;

 margin-bottom: 15px;

 font-weight: bold;


}
.special-topic-container-new .special-topic-landing-page .model-area .model-pool-area .model-pool {

 background-size: 244px 116px;

 background-repeat: no-repeat;

 background-position: center;

 border-radius: 6px;

 width: 244px;

 height: 116px;

 margin-bottom: 12px;

 margin-left: 18px;

 cursor: pointer;


}
.special-topic-container-new .special-topic-landing-page .model-area .model-pool-area .model-pool.high-quality-pool {

 background-image: url(${imageUrlImport1});


}
.special-topic-container-new .special-topic-landing-page .model-area .model-pool-area .model-pool.high-commission-pool {

 background-image: url(${imageUrlImport2});


}
.special-topic-container-new .special-topic-landing-page .model-area .model-pool-area .model-pool.high-commission-pool_tpzz {

 background-image: url(${imageUrlImport3});


}
.special-topic-container-new .special-topic-landing-page .model-area .model-pool-area .model-pool.high-commission-pool-hide {

 display: none;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-styler-link {

 display: block;

 height: 24px;

 line-height: 24px;

 padding: 0 6px;

 border: 1px solid #282828;

 border-radius: 15px 4px 15px 4px;

 text-align: center;

 margin: 0 18px 6px;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-styler-link span {

 margin-right: 9px;

 opacity: 0.86;

 font-family: PingFangSC-Semibold;

 font-size: 12px;

 color: #33353B;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-styler-link .special-topic-styler-text {

 display: inline-block;

 margin-right: 6px;

 font-size: 12px;

 color: #33353B;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-styler-link .icon-badge-symbol, 

.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-styler-link .icon-badge-symbol2 {

 display: inline-block;

 vertical-align: middle;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-styler-link .icon-badge-symbol {

 margin-right: 4px;

 margin-top: -1px;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-styler-link .icon-badge-symbol2 {

 margin-top: -2px;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area {

 padding: 0 18px;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .loading-wrapper {

 position: absolute;

 top: calc(50% - 40px);

 left: calc(50% - 40px / 2);

 height: 40px;

 background: #fff;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .loading-wrapper img {

 width: 40px;

 height: 40px;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .special-second-tabs {

 height: 30px;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .special-second-tabs .homestyler-tabs-list .homestyler-tabs-tab-active {

 color: #33353B;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .special-second-tabs .homestyler-tabs-list .homestyler-tabs-bar .homestyler-tabs-bar-inner {

 background: #FFFFFF;

 border: 1px solid #e8ebf2;

 box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.04);


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .title {

 font-size: 14px;

 margin-bottom: 15px;

 font-weight: bold;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .special-topic-list .no-result-area {

 width: 100%;

 display: flex;

 justify-content: center;

 align-items: center;

 flex-direction: column;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .special-topic-list .no-result-area .no-data-img {

 display: block;

 background-repeat: no-repeat;

 background-position: center;

 width: 100px;

 height: 100px;

 background-size: 100px 100px;

 margin-bottom: 5px;

 margin-top: 120px;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .special-topic-list .no-result-area .no-data-tip {

 margin-top: 10px;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .special-topic-list .img-cover {

 cursor: pointer;

 width: 244px;

 height: 116px;

 border-radius: 6px;

 margin-bottom: 12px;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .special-topic-list .fav-icon {

 position: absolute;

 width: 18px;

 height: 18px;

 top: 3px;

 left: 3px;

 border-radius: 9px;

 display: flex;

 align-items: center;

 justify-content: center;

 background: rgba(255, 255, 255, 0.8);


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .link-to-model-special-topic {

 display: flex;

 justify-content: center;

 margin-top: 12px;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .link-to-model-special-topic .link-to-web {

 display: flex;

 font-size: 12px;

 color: #33353b;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .link-to-model-special-topic .link-to-web .hsc-iconfont-view {

 margin-left: 5px;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .link-to-model-special-topic .link-to-web:hover {

 color: #396EFE;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .link-to-model-special-topic .link-to-web:hover .hsc-iconfont-view .anticon {

 color: #396EFE !important;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .no-relative-container {

 padding: 10px 0;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .no-relative-container .no-relative-model {

 margin-left: 18px;

 border-radius: 4px;

 width: 244px;

 height: 44px;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .no-relative-container .no-relative-model .logo {

 width: 20px;

 height: 20px;

 display: inline-flex;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .no-relative-container .no-relative-model .logo img {

 width: inherit;

 height: inherit;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .no-relative-container .no-relative-model .no-result-tips {

 color: #19191e;

 padding: 4px 12px;

 line-height: 17px;

 font-size: 12px;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .no-relative-container .no-relative-model .no-result-tips .no-relative-model-text {

 font-family: PingFangSC-Regular !important;

 color: #60646F;


}
.special-topic-container-new .special-topic-landing-page .model-area .special-topic-list-page .no-relative-container .no-relative-model .no-result-tips .model-apply-tip {

 color: #396efe;

 cursor: pointer;


}
.specical-topic-fav-pop {

 position: absolute;

 top: 33px;

 left: 106px;

 width: 140px;


}
.special-topic-list-fav-wrapper {

 position: relative;

 height: 128px;


}
.special-topic-list-fav-wrapper .new-tag {

 font-family: AlibabaPuHuiTi-Bold !important;

 font-size: 12px;

 line-height: 1;

 padding: 4px 8px;

 border-radius: 2px 6px 2px 6px;

 position: absolute;

 right: 0;

 top: 0;

 color: #000;

 background-color: #3DFFC5;


}
.special-topic-list-fav-wrapper .special-topic-list-fav-icon {

 position: relative;

 top: -120px;

 left: 220px;

 width: 18px;

 height: 18px;

 border-radius: 9px;

 display: flex;

 align-items: center;

 justify-content: center;

 background: rgba(255, 255, 255, 0.8);


}
.special-topic-list-fav-wrapper .specical-topic-fav-pop {

 position: absolute;

 top: 33px;

 left: 106px;

 width: 140px;


}
.special-topic-list-fav-wrapper .icon-model-charge {

 position: absolute;

 top: 3px;

 right: 3px;

 opacity: 0.8;


}
.special-topic-list-fav-wrapper .new {

 padding: 3px 6px;

 border-radius: 12px 2px 10px 10px;

 background-color: #EB5D46;

 position: absolute;

 right: 24px;

 color: #fff;

 font-size: 12px;

 top: 5px;

 font-style: italic;

 transform: scale(0.8);


}
.special-topic-list-fav-wrapper .icon-styler {

 position: absolute;

 top: 3px;

 right: 5px;


}
.special-topic-model-page-new {

 display: flex;

 flex-direction: column;

 height: 100%;

 width: 280px;


}
.special-topic-model-page-new .special-topic-model-header {

 padding: 10px 18px 0 18px;


}
.special-topic-model-page-new .special-topic-model-header .special-topic-model-first-row {

 display: flex;

 justify-content: space-between;

 height: 30px;


}
.special-topic-model-page-new .special-topic-model-header .special-topic-model-back {

 display: flex;

 align-items: center;


}
.special-topic-model-page-new .special-topic-model-header .special-topic-model-fav {

 display: flex;

 align-items: center;

 cursor: pointer;


}
.special-topic-model-page-new .special-topic-model-header .special-topic-model-fav .fav-text {

 margin-left: 5px;


}
.special-topic-model-page-new .special-topic-model-header .back-tip {

 margin-left: 8px;

 font-family: 'AlibabaPuHuiTi-Bold' !important;

 font-size: 16px;

 color: #33353b;

 cursor: pointer;


}
.special-topic-model-page-new .special-topic-model-header .banner {

 width: 244px;

 height: 100%;

 border-radius: 8px;


}
.special-topic-model-page-new .special-topic-model-header .banner-filters-area {

 position: relative;

 display: flex;


}
.special-topic-model-page-new .special-topic-model-header .banner-filter-item {

 display: flex;

 align-items: center;

 width: auto;

 margin-bottom: 0;

 background-color: unset;

 border-radius: 12px;


}
.special-topic-model-page-new .special-topic-model-header .hsc-catalog-filter {

 max-height: 36px;

 min-height: 36px;


}
.special-topic-model-page-new .special-topic-model-header .hsc-catalog-filter-content {

 margin-left: -10px !important;


}
.special-topic-model-page-new .banner-wrapper {

 position: relative;

 height: 116px;

 margin: 6px 0 10px 0;


}
.special-topic-model-page-new .banner-wrapper .icon-model-charge {

 position: absolute;

 top: 3px;

 right: 3px;

 opacity: 0.8;


}
.special-topic-model-page-new .model-list {

 overflow: hidden;

 flex-grow: 2;


}
.global-en .special-topic-container .special-topic-model-page .special-topic-model-header {

 padding: 20px 18px 0 18px;


}
.global-en .special-topic-container .special-topic-model-page .special-topic-model-header .special-topic-model-first-row {

 margin-bottom: 18px;


}
.global-en .special-topic-container .special-topic-model-page .filters-area {

 margin: 9px 0 2px 0;


}
.global-en .special-topic-container .special-topic-model-page .banner {

 cursor: pointer;


}
.global-en .special-topic-container .special-topic-landing-page .model-area {

 padding-top: 0;


}
.global-en .special-topic-container .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .special-second-tabs .homestyler-tabs-list .homestyler-tabs-tab-active {

 background: #1c1c1c;

 color: #fff;

 border-radius: 50px;


}
.global-en .special-topic-container .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .special-second-tabs .homestyler-tabs-list .homestyler-tabs-bar {

 padding: 0;


}
.global-en .special-topic-container .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .special-second-tabs .homestyler-tabs-list .homestyler-tabs-bar .homestyler-tabs-bar-inner {

 display: none;


}
.global-en .special-topic-container .special-topic-landing-page .model-area .special-topic-list-page .no-relative-container .no-relative-model .no-result-tips {

 padding: 4px 9px;


}
.global-en .special-topic-container .special-topic-list-fav-wrapper:hover .img-cover {

 animation: open_product_img 0.3s forwards;

}
.global-en .special-topic-container .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .special-topic-list {

 margin-top: 0;

}
.global-en .special-topic-container .special-topic-landing-page .model-area .special-topic-list-page .special-topic-area .special-topic-list .hsc-filter-container {

 padding: 5px 0 7px 0;

}
@keyframes open_product_img {

 100% {
    
 transform: scale(1.01);
    
 box-shadow: 0 4px 16px 0 rgba(25, 25, 50, 0.24);
    

}

}
`;

export default cssContent;