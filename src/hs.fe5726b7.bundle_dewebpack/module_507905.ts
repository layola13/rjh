const styles = `.hintView {
            
 display: flex;
 line-height: 24px;
 padding: 0px 10% 80px;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 flex: 1;
 width: 100%;
 height: 100%;
 text-align: center;
 font-size: 16px;
 color: #ccc;
 box-sizing: border-box;
 -moz-box-sizing: border-box;
 -webkit-box-sizing: border-box;

}
.hintView .hintText {
 width: 80%;

}
.hintView .hintIcon {
 display: block;
 background-repeat: no-repeat;
 background-position: center;
 width: 106px;
 height: 120px;
 background-size: 106px 120px;
 margin-bottom: 20px;

}
.hintView .hintIcon.svgicon {
 display: flex;

}
.hintView .hintIcon.svgicon svg {
 width: 106px;
 height: 120px;

}
.hintView a {
 cursor: pointer;
 color: #4d9bd6;
 margin: 0px 2px;

}
.hintView a:hover {
 text-decoration: none;

}
`;

export default styles;