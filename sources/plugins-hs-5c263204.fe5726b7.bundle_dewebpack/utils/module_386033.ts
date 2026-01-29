interface CSSExport {
  push(data: [string, string]): void;
}

const cssContent = `
.md-effect-1 {
  /* Effect 1: Fade in and scale up */
  transform: scale(0.3);
  opacity: 0;
  transition: all 0.3s;
}

.md-show-md-effect-1 {
  transform: scale(1);
  opacity: 1;
}

.commonButtonStyle {
  border: 1px solid #3085c4;
  border-radius: 2px;
  background: #4d9bd6;
  color: #fff;
  line-height: 44px;
  cursor: pointer;
}

.commonButtonStyle:hover {
  border-color: #3085c4;
  background-color: #36a1f0 !important;
  color: #fff;
}

.commonTextStyleForLongText {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#fpcollectiondoms #fpcollectiondomsMask {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 3003;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  text-align: center;
}

#fpcollectiondoms .header {
  height: 60px;
  overflow: hidden;
  line-height: 60px;
  margin-top: 10px;
  text-align: left;
  background-color: #fff;
}

#fpcollectiondoms .header .label {
  font-size: 22px;
  color: #33353B;
  font-weight: bold;
  margin-left: 40px;
  line-height: 60px;
  padding: 0;
  display: inline-block;
}

#fpcollectiondoms .header .closeBtn {
  float: right;
  width: 25px;
  height: 25px;
  margin-top: 20px;
  margin-right: 40px;
}

#fpcollectiondoms #collectionFrame {
  width: 900px;
  height: 600px;
  margin: -300px auto 0 -450px;
  background: #FFFFFF;
  box-shadow: 0px 5px 50px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 12px;
  color: #33353B;
}

#fpcollectiondoms #collectionFrame.fpcollectionAnimation-appear {
  /* Effect 1: Fade in and scale up */
  transform: scale(0.3);
  opacity: 0;
  transition: all 0.3s;
}

#fpcollectiondoms #collectionFrame.fpcollectionAnimation-appear.fpcollectionAnimation-appear-active {
  transform: scale(1);
  opacity: 1;
}

#fpcollectiondoms #collectionFrame .searchBar {
  position: absolute;
  top: 22px;
  left: 140px;
  width: 300px;
  height: 36px;
  line-height: 36px;
  border: 0.5px solid #EAECF1;
  border-radius: 18px;
  background-color: #ffffff;
}

#fpcollectiondoms #collectionFrame .searchBar .clearUp {
  position: absolute;
  right: 36px;
  top: 9px;
  z-index: 999999;
}

#fpcollectiondoms #collectionFrame .searchBar .clearUp:hover {
  cursor: pointer;
}

#fpcollectiondoms #collectionFrame .searchBar .cityZone {
  height: 36px;
  float: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
}

#fpcollectiondoms #collectionFrame .searchBar .cityZone #triangle-down {
  margin: 0 4px;
}

#fpcollectiondoms #collectionFrame .searchBar .cityZone .label {
  flex: 1;
  display: inline-block;
  color: #33353B;
  font-size: 12px;
  max-width: 54px;
  margin-left: 14px;
  line-height: 36px;
  padding: 0;
  font-weight: normal;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#fpcollectiondoms #collectionFrame .searchBar .cityZone img {
  position: absolute;
  top: 13px;
  left: 15px;
  height: 22px;
  width: 22px;
}

#fpcollectiondoms #collectionFrame .searchBar .selected .label {
  color: #396EFE;
}

#fpcollectiondoms #collectionFrame .searchBar .popover {
  background-color: #4d9bd6 !important;
  top: 97px!important;
  left: 2.5px !important;
  border: 0px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0);
}

#fpcollectiondoms #collectionFrame .searchBar .popover.bottom > .arrow:after {
  border-bottom-color: #4d9bd6 !important;
}

#fpcollectiondoms #collectionFrame .searchBar .popover .popover-content {
  width: 177px;
  background-color: #4d9bd6 !important;
  color: #ffffff !important;
}

#fpcollectiondoms #collectionFrame .searchBar input {
  display: inline-block;
  width: 170px;
  height: 33px;
  border: unset;
  outline: 0px;
}

#fpcollectiondoms #collectionFrame .searchBar input.searchKey {
  border-right: none;
  border-left: none;
}

#fpcollectiondoms #collectionFrame .searchBar input.searchKey::-moz-placeholder {
  color: #CDCFD5;
}

#fpcollectiondoms #collectionFrame .searchBar input.searchKey::placeholder {
  color: #CDCFD5;
}

#fpcollectiondoms #collectionFrame .searchBar .searchButton {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 25px;
  height: 36px;
  line-height: 44px;
  cursor: pointer;
}

#fpcollectiondoms #collectionFrame .focus-input {
  background: #ECF1FF;
  border: 0.5px solid #396efe;
}

#fpcollectiondoms #collectionFrame .focus-input .searchKey {
  background: #ECF1FF;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer {
  width: 849px;
  height: 395px;
  padding: 14px 0px 0px 42px;
  position: relative;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fullcover {
  position: inherit;
  width: 100%;
  height: 103%;
  background: #FFFFFF;
  z-index: 10;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer #emptyView.show {
  position: inherit;
  width: 100%;
  height: 100%;
  background-color: inherit;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer #emptyView.show .hintView {
  font-size: 14px;
  color: #9B9FAB;
  padding: 0px 12% 0 10%;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer #emptyView.show .hintView img {
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer #emptyView.show .hintView a {
  color: #396EFE;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer #fpcollectionlistview {
  width: 100%;
  height: 100%;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer #fpcollectionlistview .listItem {
  float: left;
  width: 187px;
  height: 187px;
  background: #FFFFFF;
  box-shadow: 0px 2px 50px 0px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  margin: 0px 24px 24px 0px;
  font-size: 12px;
  cursor: pointer;
  position: relative;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer #fpcollectionlistview .listItem .masker {
  display: none;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 187px;
  height: 160px;
  background-color: rgba(255, 255, 255, 0.38);
  cursor: pointer;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer #fpcollectionlistview .listItem:hover .masker {
  display: block;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer #fpcollectionlistview .listItem img {
  width: 170px;
  height: 160px;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer #fpcollectionlistview .listItem .detailInfo {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  height: 15px;
  padding: 2px 12px 8px 12px;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer #fpcollectionlistview .listItem .detailInfo .room-detail {
  font-size: 12px;
  color: #33353B;
  font-weight: bold;
  letter-spacing: -0.03px;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer #fpcollectionlistview .listItem .detailInfo .neighbor-name {
  max-width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  color: #33353B;
  letter-spacing: -0.03px;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination {
  position: absolute;
  bottom: -34px;
  font-size: 12px;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination.ant-pagination-simple .ant-pagination-simple-pager, 
#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination.ant-pagination-simple .ant-pagination-prev, 
#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination.ant-pagination-simple .ant-pagination-next {
  height: 14px;
  line-height: 20px;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination.ant-pagination-simple .ant-pagination-simple-pager .hs-iconfont-view, 
#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination.ant-pagination-simple .ant-pagination-prev .hs-iconfont-view, 
#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination.ant-pagination-simple .ant-pagination-next .hs-iconfont-view {
  margin-top: 3px;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination.ant-pagination-simple .ant-pagination-simple-pager .ant-pagination-item-link, 
#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination.ant-pagination-simple .ant-pagination-prev .ant-pagination-item-link, 
#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination.ant-pagination-simple .ant-pagination-next .ant-pagination-item-link {
  height: 18px;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination.ant-pagination-simple .ant-pagination-prev, 
#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination.ant-pagination-simple .ant-pagination-next {
  min-width: auto;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination.ant-pagination-simple .ant-pagination-simple-pager {
  color: #33353B;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination.ant-pagination-simple .ant-pagination-simple-pager .ant-pagination-slash {
  margin: 0;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination.ant-pagination-simple .ant-pagination-simple-pager input {
  padding: 0;
}

#fpcollectiondoms #collectionFrame #fpcollectionlistview-scrollContainer .fpcollectionlistview-pagination.ant-pagination-simple .ant-pagination-simple-pager input:hover {
  border-color: #396EFE;
}

#fpcollectiondoms #collectionFrame #list-item-detail-view-container {
  top: -545px;
  width: 900px;
  height: 600px;
  z-index: 444444;
  position: relative;
  border-radius: 10px;
  background-color: #ffffff;
}

#fpcollectiondoms #collectionFrame #list-item-detail-view-container .closeBtn {
  width: 25px;
  height: 25px;
  float: right;
  margin-top: 30px;
  margin-right: 40px;
}

#fpcollectiondoms #collectionFrame #list-item-detail-view-container .detail-info {
  position: absolute;
  right: 0;
  bottom: 62px;
  width: 290px;
  height: 300px;
  z-index: 999;
}

#fpcollectiondoms #collectionFrame #list-item-detail-view-container .detail-info .area-detail, 
#fpcollectiondoms #collectionFrame #list-item-detail-view-container .detail-info .style-detail {
  height: 24px;
  line-height: 24px;
  margin-bottom: 10px;
}

#fpcollectiondoms #collectionFrame #list-item-detail-view-container .detail-info .room-detail {
  color: #33353B;
  line-height: 24px;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
}

#fpcollectiondoms #collectionFrame #list-item-detail-view-container .detail-info .room-detail .room-detail-name {
  align-items: center;
  color: #33353B;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: bottom;
  font-weight: 600;
  font-size: 16px;
  line-height: 14px;
  margin-bottom: 40px;
}

#fpcollectiondoms #collectionFrame #list-item-detail-view-container .detail-info .room-detail .room-detail-name .region-info {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#fpcollectiondoms #collectionFrame #list-item-detail-view-container .detail-info .room-detail .room-detail-name .region-info img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

#fpcollectiondoms #collectionFrame #list-item-detail-view-container .detail-info .room-detail .room-detail-name .region-info .region-info-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 16px;
  line-height: 16px;
  width: 100%;
}

#fpcollectiondoms #collectionFrame #list-item-detail-view-container .detail-info .start-design {
  width: 160px;
  height: 46px;
  font-size: 18px;
  margin-top: 42px;
  margin-left: 5px;
  box-sizing: border-box;
  display: block;
}

#fpcollectiondoms #collectionFrame #list-item-detail-view-container .list-item-detail-view {
  width: 600px;
  height: 100%;
  border-radius: 4px;
  padding-top: 40px;
}

#fpcollectiondoms #collectionFrame #list-item-detail-view-container .list-item-detail-view.fpDetailViewAnimation-appear {
  /* Effect 1: Fade in and scale up */
  transform: scale(0.3);
  opacity: 0;
  transition: all 0.3s;
}

#fpcollectiondoms #collectionFrame #list-item-detail-view-container .list-item-detail-view.fpDetailViewAnimation-appear.fpDetailViewAnimation-appear-active {
  transform: scale(1);
  opacity: 1;
}

#fpcollectiondoms #collectionFrame #list-item-detail-view-container .list-item-detail-view img {
  width: 520px;
  height: 520px;
  border-radius: 15px;
  border: 1px solid #d4d7e1;
}

#fpcollectiondoms .total {
  display: block;
  height: 26px;
  font-size: 12px;
  color: #33353B;
  letter-spacing: 0;
  position: absolute;
  bottom: -42px;
  right: 31px;
  z-index: 9;
}

#fpcollectiondoms .total-number {
  font-size: 12px;
  color: #396EFE;
  letter-spacing: 0;
  line-height: 17px;
  margin: 0 2px;
}

#fpcollectiondoms .fpcollection-welcome {
  width: 300px;
  height: 300px;
  margin: 94px auto 0;
}

#fpcollectiondoms .fpcollection-welcome .pic {
  width: 102px;
  height: 111px;
  margin: 0 auto 12px;
}

#fpcollectiondoms .fpcollection-welcome .pic img {
  width: 100%;
  height: 100%;
}

#fpcollectiondoms .fpcollection-welcome .text {
  font-size: 14px;
  color: #9B9FAB;
  height: 24px;
  line-height: 24px;
}

#fpcollectiondoms .fpcollection-welcome.init {
  display: block;
}

#fpcollectiondoms .fpcollection-welcome.result {
  display: none;
}
`;

export default cssContent;