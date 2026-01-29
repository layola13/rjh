const styles = `.property-bar-dropdownroomtypelist {
            
 display: flex;
            
 font-size: 12px;
            
 align-items: center;
            
 justify-content: space-between;
            

        }
.property-bar-dropdownroomtypelist .dropdownroomtypelist-label {
        
 margin-right: 8px;
        
 line-height: 34px;
        
 width: 80px;
        
 color: #888888;
        
 font-size: 12px;
        

    }
.property-bar-dropdownroomtypelist .dropdownroomtypelist-comp {
    
 width: 130px;
    
 height: 24px;
    
 display: flex;
    
 border: 1px solid #E1E3E8;
    
 border-radius: 4px;
    

}
.property-bar-dropdownroomtypelist .dropdownroomtypelist-comp:focus-within {

 border: 1px solid rgba(57, 110, 254, 0.8);

 outline: unset;

 background-color: #ECF1FF;


}
.property-bar-dropdownroomtypelist .dropdownroomtypelist-comp .tp-select {

 padding: 0;

 border: none;

 border-radius: 4px 0 0 4px;

 min-width: 50px;


}
.property-bar-dropdownroomtypelist .dropdownroomtypelist-comp .tp-select:hover, 
.property-bar-dropdownroomtypelist .dropdownroomtypelist-comp .tp-select:focus {

 border: none;

 background: unset;


}
.property-bar-dropdownroomtypelist .dropdownroomtypelist-comp .tp-select .tp-select-container {

 padding-left: 8px;

 line-height: 22px;


}
.property-bar-dropdownroomtypelist .dropdownroomtypelist-comp .tp-input {

 border: none;

 padding: 0 8px;

 text-overflow: ellipsis;

 line-height: unset !important;

 height: unset !important;


}
.property-bar-dropdownroomtypelist .dropdownroomtypelist-comp .tp-input:hover, 
.property-bar-dropdownroomtypelist .dropdownroomtypelist-comp .tp-input:focus {

 border: none;

 background: unset;


}
.property-bar-dropdownroomtypelist .dropdownroomtypelist-comp .tp-input__inputting {

 padding-right: 0;


}
.property-bar-dropdownroomtypelist .dropdownroomtypelist-comp .count-down {

 display: flex;

 justify-content: center;

 align-items: center;

 position: relative;

 right: 0;

 margin: 0 4px;

 font-family: PingFangSC-Regular, sans-serif;

 font-size: 12px;

 color: #9B9FAB;

 line-height: 16px;

 font-weight: 400;

 height: 24px;

 width: 16px;


}
.property-bar-dropdownroomtypelist .dropdownroomtypelist-comp .count-down__error {

 color: #EB5D46;


}
.property-bar-dropdownroomtypelist .dropdownroomtypelist-comp-none {

 width: 130px;

 height: 24px;

 display: flex;

 border: 1px solid #E1E3E8;

 border-radius: 4px;


}
.room-name-tooltip__hidden {

 visibility: hidden;


}
`;

export default styles;