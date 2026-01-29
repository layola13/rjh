const styles = `.opendesign-input-body {
            
 position: relative;
            
 color: #33353B;
            
 width: 148px;
            

        }
.opendesign-input-body.disable-edit {
        
 pointer-events: none;
        
 width: 200px;
        

    }
.opendesign-input-body.disable-edit .edit-input {
    
 padding-right: 8px;
    

}
.opendesign-input-body.not-focus .edit-input {

 border: 1px solid transparent;

 background: transparent;

 overflow: hidden;

 text-overflow: ellipsis;

 white-space: nowrap;


}
.opendesign-input-body.not-focus:hover .edit-input {

 background: rgba(0, 0, 0, 0.04);


}
.opendesign-input-body.not-focus .icon-wrapper {

 display: none;


}
.opendesign-input-body .edit-input {

 font-size: 12px;

 height: 24px;

 margin-bottom: 0;

 padding: 4px 30px 4px 8px;

 border-radius: 3px;


}
.opendesign-input-body .edit-input:focus {

 background: rgba(236, 241, 255, 0.6);

 border: 1px solid #396EFE;

 box-shadow: unset;


}
.opendesign-input-body .icon-wrapper {

 display: inline-block;

 position: absolute;

 right: 0px;

 top: 0px;

 width: 24px;

 height: 24px;

 border-top-right-radius: 3px;

 border-bottom-right-radius: 3px;

 font-size: 14px;

 color: white;

 display: flex;

 justify-content: center;

 align-items: center;


}
.opendesign-input-body .icon-clear {

 display: none;

 position: absolute;

 right: 6px;

 top: 6px;

 width: 13px;

 height: 13px;

 border-radius: 50%;

 background-color: red;

 cursor: pointer;


}
.opendesign-input-body .icon-clear::before {

 position: absolute;
 content: '';
 width: 1px;
 height: 8px;
 top: 3px;
 left: 6px;
 background: white;
 transform: rotate(45deg);


}
.opendesign-input-body .icon-clear::after {

 position: absolute;

 content: '';

 width: 1px;

 height: 8px;

 top: 3px;

 left: 6px;

 background: white;

 transform: rotate(-45deg);


}
.opendesign-input-body.success .icon-wrapper {

 background: #396EFE;

 cursor: pointer;


}
.opendesign-input-body.failed {

 margin-bottom: 20px;


}
.opendesign-input-body.failed .edit-input {

 border: 1px solid #eb5d46;


}
.opendesign-input-body.failed .edit-input:focus {

 box-shadow: unset;


}
.opendesign-input-body.failed .icon-wrapper {

 display: none;


}
.opendesign-input-body.failed .icon-clear {

 display: inline-block;


}
.opendesign-input-body.failed .error-tips {

 color: red;


}
`;

export default styles;