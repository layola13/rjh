const styles = `button.hsw-btn {
            
 font-size: 14px;
            
 width: -moz-fit-content;
            
 width: fit-content;
            
 padding: 0px 20px;
            
 border: 1px solid #c3c4c8;
            
 border-radius: 2px;
            
 background-color: #ffffff;
            
 color: #343a40;
            
 display: inline-block;
            
 line-height: 2;
            
 cursor: pointer;
            
 text-align: center;
            
 outline: none;
            
 /*button type = normal*/
 /*button type = primary*/
            
        }

button.hsw-btn:focus, 

button.hsw-btn-active {
        
 z-index: 2;
        
 color: #2e92de;
        
 background-color: #fff;
        
 border-color: #2e92de;
        

    }

button.hsw-btn:hover {
    
 color: #2e92de;
    
 background-color: #fff;
    
 border-color: #2e92de;
    

}

button.hsw-btn-primary {

 color: #fff;

 background-color: #4d9bd6;

 border-color: #3085c4;


}

button.hsw-btn-primary:hover, 

button.hsw-btn-primary:focus {

 z-index: 2;

 color: #fff;

 background-color: #36a1f0;

 border-color: #3085c4;


}

button.hsw-btn-primarybutton.hsw-btn-active {

 z-index: 2;

 color: #fff;

 background-color: #36a1f0;

 border-color: #3085c4;


}

button.hsw-btn-pop {

 color: #2e92de;

 background-color: #fff;

 border-color: transparent;


}

button.hsw-btn-pop:hover, 

button.hsw-btn-pop:focus {

 z-index: 2;

 color: #fff;

 background: linear-gradient(to right, #5E96F7, #93B8F9);

 background: -o-linear-gradient(to right, #5E96F7, #93B8F9);

 border-color: transparent;

 font-weight: 600;


}

button.hsw-btn-disable {

 color: #c3c4c8;

 background-color: #fff;

 border-color: #cecece;

 cursor: default;


}

button.hsw-btn-disable:hover, 

button.hsw-btn-disable:focus {

 z-index: 2;

 color: #c3c4c8;

 background-color: #fff;

 border-color: #cecece;


}

button.hsw-btn.btn-small {

 font-size: 12px;

 padding: 0px 15px;


}
`;

export default styles;