const styles = `.task-view-name-input {
            
 display: flex;
            

        }
.task-view-name-input .name-input {
        
 width: 290px;
        
 height: 24px;
        
 border-radius: 4px;
        
 overflow: hidden;
        
    
    }
.task-view-name-input .name-input.ant-input-affix-wrapper {
    
 position: relative;
    
 display: inline-flex;
    
 padding: 0;
    
 background: rgba(57, 110, 254, 0.2);
    
 border-color: #396EFE;
    
 line-height: 1;
    
 border-top-right-radius: 0;
    
 border-bottom-right-radius: 0;
    

}
.task-view-name-input .name-input.ant-input-affix-wrapper .ant-input {

 background: rgba(57, 110, 254, 0.2);

 padding-left: 3px;

 font-size: 14px;

 color: white;

 text-align: left;

 line-height: 14px;

 font-weight: 400;


}
.task-view-name-input .name-input.ant-input-affix-wrapper .ant-input::-webkit-input-value {

 color: #CDCFD5;

 font-size: 12px;


}
.task-view-name-input .name-input.ant-input-affix-wrapper:focus, 
.task-view-name-input .name-input.ant-input-affix-wrapper:hover {

 border: 1px solid #396EFE;

 box-shadow: none;


}
.task-view-name-input .name-input.ant-input-affix-wrapper .ant-input-suffix {

 display: none;


}
.task-view-name-input .name-input.ant-input-affix-wrapper-focused {

 border: 1px solid #396EFE;

 box-shadow: none;


}
.task-view-name-input .name-input.error, 
.task-view-name-input .name-input.error:focus, 
.task-view-name-input .name-input.error:hover {

 border: 1px solid #EB5D46;

 box-shadow: none;


}
.task-view-name-input .iconWrapper {

 display: flex;

 align-items: center;

 justify-content: center;

 width: 24px;

 height: 24px;

 border-top-right-radius: 4px;

 border-bottom-right-radius: 4px;

 background-color: #396EFE;


}
.task-view-name-input .iconWrapper .icon {

 top: 6px;

 left: 7px;


}
.task-view-name-input .iconWrapper .icon .anticon {

 font-size: 12px !important;


}
`;

export default styles;