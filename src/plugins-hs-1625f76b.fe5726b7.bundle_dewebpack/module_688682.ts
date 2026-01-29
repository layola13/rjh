const styles = `.hsc-shop-rank .merchant {
            
 display: flex;
            
 justify-content: space-between;
            
 align-items: center;
            
 border-radius: 4px;
            
 background: white;
            
 box-shadow: 0px 2px 50px 0px rgba(0, 0, 0, 0.03);
            
 margin-bottom: 12px;
            

        }
.hsc-shop-rank .merchant .left {
        
 display: flex;
        
 align-items: center;
        

    }
.hsc-shop-rank .merchant .left .logo {
    
 width: 30px;
    
 height: 30px;
    
 margin: 8px 10px;
    
 border-radius: 4px;
    

}
.hsc-shop-rank .merchant .left .name {

 max-width: 130px;

 font-size: 13px;

 padding: 10px 0;

 overflow: hidden;

 text-overflow: ellipsis;

 white-space: nowrap;

 color: #33353B;


}
.hsc-shop-rank .merchant .right {

 margin-right: 8px;


}
.hsc-shop-rank .merchant .right .number .number-pre {

 color: #33353B;

 transform: scale(0.8);

 display: inline-block;

 font-weight: 300;


}
.hsc-shop-rank .merchant .right .number .number-value {

 font-family: AlibabaPuHuiTi-Bold !important;

 color: #40485F;

 font-size: 14px;

 transform: skew(-12deg);

 display: inline-block;


}
.hsc-shop-rank .merchant:hover {

 cursor: pointer;

 box-shadow: 0px 4px 20px 0px rgba(86, 95, 121, 0.2);


}
`;

export default styles;