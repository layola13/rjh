const cssContent = `.ai-moodboard-page .is-generating {
            
 position: absolute;
            
 z-index: 1;
            
 width: 100%;
            
 height: 100%;
            
 background-color: rgba(255, 255, 255, 0.6);
            

        }
.ai-moodboard-page .ai-moodboard-item {
        
 margin-bottom: 14px;
        

    }
.ai-moodboard-page .ai-moodboard-item .ai-moodboard-img-block {
    
 width: 244px;
    
 height: 164px;
    
 background-color: #d8d8d8;
    
 border: 1px solid #dddddd;
    
 border-radius: 8px;
    
 position: relative;
    

}
.ai-moodboard-page .ai-moodboard-item .ai-moodboard-img-block .ai-moodboard-img {

 width: 100%;

 height: 100%;

 border-radius: 8px;


}
.ai-moodboard-page .ai-moodboard-item .ai-moodboard-img-block .ai-moodboard-item-mask {

 position: absolute;

 top: 0;

 left: 0;

 z-index: 1;

 width: 100%;

 height: 100%;

 border-radius: 8px;

 background-color: rgba(0, 0, 0, 0.6);

 display: none;


}
.ai-moodboard-page .ai-moodboard-item .ai-moodboard-img-block:hover .ai-moodboard-item-mask {

 display: flex;

 align-items: center;

 justify-content: center;


}
.ai-moodboard-page .ai-moodboard-item .ai-moodboard-img-block.ai-moodboard-processing-item, 
.ai-moodboard-page .ai-moodboard-item .ai-moodboard-img-block.ai-moodboard-failed-item {

 background-color: #f7f7f9;

 border: none;

 display: flex;

 align-items: center;

 justify-content: center;

 flex-direction: column;


}
.ai-moodboard-page .ai-moodboard-item .ai-moodboard-img-block.ai-moodboard-processing-item .processing-percent, 
.ai-moodboard-page .ai-moodboard-item .ai-moodboard-img-block.ai-moodboard-failed-item .processing-percent {

 font-family: PingFangSC-Medium;

 color: #33353b 100%;

 font-size: 20px;

 line-height: 20px;


}
.ai-moodboard-page .ai-moodboard-item .ai-moodboard-img-block.ai-moodboard-processing-item .processing-text, 
.ai-moodboard-page .ai-moodboard-item .ai-moodboard-img-block.ai-moodboard-failed-item .processing-text, 
.ai-moodboard-page .ai-moodboard-item .ai-moodboard-img-block.ai-moodboard-processing-item .failed-text, 
.ai-moodboard-page .ai-moodboard-item .ai-moodboard-img-block.ai-moodboard-failed-item .failed-text {

 margin-top: 5px;

 font-size: 12px;

 line-height: 12px;

 color: #333538;


}
.ai-moodboard-page .ai-moodboard-item .ai-moodboard-item-name {

 margin-top: 8px;

 font-size: 12px;

 line-height: 12px;

 color: #333538;

 text-align: left;


}
`;

export default cssContent;