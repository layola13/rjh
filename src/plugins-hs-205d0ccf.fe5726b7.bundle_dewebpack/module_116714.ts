const styles = `.grid-area {
            
 display: flex;
            
 flex-wrap: wrap;
            
 padding-top: 10px;
            
 height: calc(100% - 134px);
            
 overflow-y: scroll;
            
 align-content: flex-start;
            

        }
.grid-area::-webkit-scrollbar {
        
 display: none;
        

    }
.ant-badge-dot {
    
 background: #3DFFC5 !important;
    

}
.grid-viewer-card-wrapper {

 padding-right: 24px;
 padding-bottom: 35px;


}
.grid-viewer-card-wrapper .ant-badge .ant-badge-dot {

 box-shadow: none;


}
.grid-viewer-card {

 position: relative;
 display: inline-block;
 width: 300px;


}
.grid-viewer-card .card-wrapper {

 position: relative;
 background-color: #323232;
 color: white;
 border-radius: 8px;
 width: 300px;
 margin: 0 8px 8px 0;


}
.grid-viewer-card .card-wrapper .card-img {

 width: 100%;
 height: 169px;
 border-radius: 6px;
 position: relative;
 background-position: center;
 background-size: cover;
 background-repeat: no-repeat;


}
.grid-viewer-card .card-wrapper .card-corner-sign {

 background: #1c1c1c;
 padding: 6px 8px;
 color: rgba(255, 255, 255, 0.86);
 border-radius: 6px 2px 10px 0;
 display: flex;
 align-items: center;
 width: -moz-fit-content;
 width: fit-content;
 font-size: 12px;
 opacity: 0;


}
.grid-viewer-card .card-wrapper .card-bottom {

 position: absolute;
 width: 100%;
 right: 0;
 bottom: 0;
 border-radius: 0 0 6px 6px;
 display: inline-flex;
 justify-content: space-between;
 height: 40px;
 align-items: flex-end;
 background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.4));


}
.grid-viewer-card .card-wrapper .card-bottom .card-name {

 margin: 0 10px 2px 6px;
 display: block;
 color: rgba(255, 255, 255, 0.86);
 width: 155px;
 height: 24px;
 line-height: 24px;
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
 font-size: 12px;


}
.grid-viewer-card .card-wrapper .card-bottom .card-name:hover {

 background: rgba(0, 0, 0, 0.3);
 border-radius: 4px;


}
@keyframes rotateit {

 from {
    
 transform: rotate(0deg);
    

}
 to {

 transform: rotate(360deg);


}

}
`;

export default styles;