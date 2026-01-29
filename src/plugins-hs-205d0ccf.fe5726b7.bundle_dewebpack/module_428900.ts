const cssContent = `#editor .snapshotresizable {
            
 display: none;
 position: absolute;
 background: rgba(0, 0, 0, 0.3);
 margin: 0;
 border: none;
 overflow: inherit;

}
#editor .resizablePart {

 position: absolute;
 z-index: 1000;
 top: 0px;
 left: 0px;

}
#editor .snapshotresizable.left {
 border-right: solid 2px #1c79bc;

}
#editor .snapshotresizable.right {
 border-left: solid 2px #1c79bc;

}
#editor .snapshotresizable.left .ui-resizable-e {
 cursor: ew-resize;
 background: #1c79bc;
 height: 26px;
 top: 50%;
 margin-top: -16px;
 right: -8px;
 width: 8px;

}
#editor .snapshotresizable.left .ui-resizable-ne {
 background: url(__ASSET_625095__) no-repeat;
 width: 26px;
 height: 26px;
 right: -26px;
 top: 0;
 cursor: nwse-resize;

}
#editor .snapshotresizable.left .ui-resizable-se {
 background: url(__ASSET_124013__) no-repeat;
 width: 26px;
 height: 26px;
 right: -26px;
 bottom: 0;
 cursor: nesw-resize;

}
#editor .snapshotresizable.right .ui-resizable-w {
 cursor: ew-resize;
 background: #1c79bc;
 height: 26px;
 top: 50%;
 margin-top: -16px;
 right: auto;
 width: 8px;
 left: -8px;

}
#editor .snapshotresizable.right .ui-resizable-nw {
 background: url(__ASSET_502769__) no-repeat;
 width: 26px;
 height: 26px;
 top: 0;
 cursor: nesw-resize;
 left: -26px;
 right: auto;

}
#editor .snapshotresizable.right .ui-resizable-sw {
 background: url(__ASSET_218863__) no-repeat;
 width: 26px;
 height: 26px;
 bottom: 0;
 cursor: nwse-resize;
 left: -26px;
 right: auto;

}
#editor .snapshotresizable.top .ui-resizable-s {
 cursor: ns-resize;
 background: #1c79bc;
 width: 26px;
 left: 50%;
 margin-left: -16px;
 bottom: -8px;
 height: 8px;

}
#editor .snapshotresizable.bottom .ui-resizable-n {
 cursor: ns-resize;
 background: #1c79bc;
 width: 26px;
 left: 50%;
 margin-left: -16px;
 height: 8px;
 top: -8px;

}
#editor .decorateline {
 position: absolute;
 background: #1c79bc;
 display: none;

}
#editor .decorateline.tborder, 
#editor .decorateline.bborder {
 height: 2px;

}
#editor .resizablePart .canvasController {
 position: absolute;
 opacity: 0.3;
 cursor: pointer;

}
.snapshotBtnContanier {
 position: absolute;
 bottom: 10px;
 z-index: 1000;
 text-align: center;
 display: none;
 background-color: transparent;
 width: 100%;

}
.snapshotBtnContanier .snapshotBtns {
 background: #fff;
 padding: 14px 10px 14px 4px;
 width: 400px;
 margin: 0px auto;

}
.snapshotBtnContanier .snapshotBtns .savesnapshot {
 display: none;
 list-style: none;

}
.snapshotBtnContanier .snapshotBtns .dropdown {
 display: inline-block;

}
.snapshotBtnContanier .snapshotBtns .dropdown-toggle {
 margin-left: 0;

}
.snapshotBtnContanier .snapshotBtns .dropdown > button {
 width: 122px;

}
.snapshotBtnContanier .snapshotBtns .dropdown ul {
 display: none;
 margin-top: -200px;
 margin-left: 6px;
 min-width: 0;
 width: 142px;

}
.snapshotBtnContanier .snapshotBtns .dropdown ul li {
 float: none;
 height: 32px;

}
.snapshotBtnContanier .snapshotBtns .sdivider {
 height: 29px;
 display: inline-block;
 border-right: 1px solid #cfcfcf;
 margin: 0 9px;
 vertical-align: middle;

}
.snapshotBtnContanier .snapshotBtns .btn {
 width: auto;

}
.snapshotBtnContanier .snapshotBtns .btn-default {
 margin-left: 6px;

}
`;

export default cssContent;