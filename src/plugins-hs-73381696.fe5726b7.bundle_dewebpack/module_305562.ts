import cssLoader from './cssLoader';

const imageUrl = require('./assets/drag-drop-indicator.png');

const styles = `.layer-list-container {
            
 width: 154px;
            
 margin-bottom: 2px;
            
 background: #FFFFFF;
            
 box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.1);
            
 border-radius: 8px;
            
 overflow: hidden;
            

        }
.layer-list-container.dark {
        
 background-color: rgba(43, 44, 46, 0.6);
        

    }
.layer-list-container.dark .layer-list-item:hover {
    
 background-color: rgba(131, 131, 131, 0.4) !important;
    

}
.layer-list-container.dark .layer-list-item .floor-number, 
.layer-list-container.dark .layer-list-item .floor-name > .floor-name-display > .floor-name-text {

 color: rgba(255, 255, 255, 0.86);


}
.layer-list-container.dark .layer-list-item .floor-number.active, 
.layer-list-container.dark .layer-list-item .floor-name > .floor-name-display > .floor-name-text.active {

 color: white;


}
.layer-list-container.dark > .homestyler-smart-scroll::-webkit-scrollbar-thumb {

 background: rgba(255, 255, 255, 0.3);


}
.layer-list-container .drag-drop-indicator {

 background-image: url(${imageUrl});

 background-repeat: no-repeat;

 position: fixed;

 z-index: 9999;

 height: 8px;

 margin-top: -4px;

 display: none;


}
.layer-list-container .homestyler-smart-scroll {

 max-height: 400px;


}
.layer-list-container .layer-list-item {

 display: flex;

 height: 32px;

 width: 154px;

 align-items: center;

 transition: all 0.3s;

 background: transparent;


}
.layer-list-container .layer-list-item:last-child {

 margin-bottom: 8px;


}
.layer-list-container .layer-list-item:first-child {

 margin-top: 4px;


}
.layer-list-container .layer-list-item.hover-able:hover {

 background: #F5F5F5;


}
.layer-list-container .layer-list-item[draggable=true] {

 transition: none;

 background: transparent;

 opacity: 0.4;


}
.layer-list-container .layer-list-item .floor-number {

 box-sizing: content-box;

 width: 22px;

 font-size: 12px;

 padding-left: 6px;

 color: #33353B;

 letter-spacing: 0;

 line-height: 12px;

 font-family: PingFangSC-Medium, sans-serif !important;

 font-weight: 500;

 float: right;

 text-align: center;


}
.layer-list-container .layer-list-item .floor-name {

 display: flex;

 align-items: center;


}
.layer-list-container .layer-list-item .floor-name .floor-name-display {

 display: flex;

 align-items: center;


}
.layer-list-container .layer-list-item .floor-name .floor-name-display .floor-name-text {

 width: 60px;

 margin-left: 4px;

 margin-right: 11px;

 opacity: 0.7;

 font-size: 12px;

 color: #33353B;

 letter-spacing: 0;

 line-height: 12px;

 font-weight: 400;


}
.layer-list-container .layer-list-item .floor-name .floor-name-display .floor-name-text.active {

 font-weight: 600;

 opacity: 1;


}
.layer-list-container .layer-list-item .floor-name .floor-name-display .floor-name-text.extended {

 width: 110px;


}
.layer-list-container .layer-list-item .floor-name .floor-name-display .operations {

 display: inline-flex;

 justify-content: center;

 width: 51px;


}
.layer-list-container .layer-list-item .floor-name .floor-name-display .operations .operation-icon {

 margin-right: 4px;


}
.layer-list-container .layer-list-item .floor-name .floor-name-display .operations .operation-icon.grab > .iconfont {

 cursor: grab;


}
.layer-list-container .layer-list-item .floor-name .floor-name-display .operations .operation-icon.grab > .iconfont:active {

 cursor: grabbing;


}
.layer-list-container .layer-list-item .floor-name .floor-name-display .operations .operation-icon.disabled {

 pointer-events: none;

 opacity: 0.4;

 cursor: not-allowed;


}
.layer-list-container .layer-list-item .floor-name .ant-input-affix-wrapper {

 position: relative;

 display: inline-flex;

 padding: 0;

 background: white;

 border-color: #EAECF1;

 line-height: 1;


}
.layer-list-container .layer-list-item .floor-name .ant-input-affix-wrapper .ant-input {

 background: white;

 padding-left: 3px;

 font-size: 12px;

 color: #33353B;

 text-align: left;

 line-height: 12px;

 font-weight: 400;


}
.layer-list-container .layer-list-item .floor-name .ant-input-affix-wrapper .ant-input::-webkit-input-value {

 color: #CDCFD5;

 font-size: 12px;


}
.layer-list-container .layer-list-item .floor-name .ant-input-affix-wrapper:focus, 
.layer-list-container .layer-list-item .floor-name .ant-input-affix-wrapper:hover {

 border: 1px solid #396EFE;

 box-shadow: none;

 background: #ECF1FF;


}
.layer-list-container .layer-list-item .floor-name .ant-input-affix-wrapper:focus .ant-input, 
.layer-list-container .layer-list-item .floor-name .ant-input-affix-wrapper:hover .ant-input {

 background: #ECF1FF;


}
.layer-list-container .layer-list-item .floor-name .ant-input-affix-wrapper .ant-input-suffix {

 display: none;


}
.layer-list-container .layer-list-item .floor-name .ant-input-affix-wrapper-focused {

 border: 1px solid #396EFE;

 box-shadow: none;

 background: #ECF1FF;


}
.layer-list-container .layer-list-item .floor-name .ant-input-affix-wrapper-focused .ant-input {

 background: #ECF1FF;


}
.layer-list-container .layer-list-item .floor-name .floor-name-input {

 width: 116px;

 height: 22px;

 border-radius: 4px;

 overflow: hidden;


}
.layer-list-container .layer-list-item .floor-name .floor-name-input.error, 
.layer-list-container .layer-list-item .floor-name .floor-name-input.error:focus, 
.layer-list-container .layer-list-item .floor-name .floor-name-input.error:hover {

 border: 1px solid #EB5D46;

 box-shadow: none;

 background: #FFFFFF;


}
.layer-list-container .layer-list-item .floor-name .floor-name-input.error .ant-input, 
.layer-list-container .layer-list-item .floor-name .floor-name-input.error:focus .ant-input, 
.layer-list-container .layer-list-item .floor-name .floor-name-input.error:hover .ant-input {

 background: #FFFFFF;


}
`;

export default cssLoader(false).push([module.id, styles]);