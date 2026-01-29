const imageUrl = require('./assets/header-bg.png');

const cssContent = `
.markingsystem {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 3002;
    background: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    text-align: center;
}

.markingsystem-popup-header-tips {
    border: 2px solid rgba(255, 255, 255, 0.14);
    border-radius: 6px;
    height: 40px;
    width: 180px;
    color: #ddd;
    padding: 10px;
    font-size: 12px;
    line-height: 20px;
    position: absolute;
    left: 80px;
    top: 60px;
}

.markingsystem-popup-header-tips-arrow {
    width: 5px;
    height: 5px;
    border-top: 2px solid rgba(255, 255, 255, 0.14);
    border-right: 2px solid rgba(255, 255, 255, 0.14);
    transform: translate(188px, -24px) rotate(45deg);
    background: #1c1c1c;
}

.markingsystem .popup {
    width: 500px;
    background: #fff;
    background-size: 100%;
    -moz-background-size: 100% 100%;
    box-shadow: 0px 0px 8px 1px #4c8708;
    border-radius: 4px;
    color: #343a40;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 533px;
    padding-bottom: 50px;
}

.markingsystem .popup .header {
    height: 150px;
    overflow: hidden;
    line-height: 50px;
    text-align: left;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    font-size: 18px;
    background-size: contain;
    background-image: url(${imageUrl});
}

.markingsystem .popup .header label {
    line-height: 50px;
    text-align: center;
    margin: 0px auto;
    margin-left: 25px;
    width: 50px;
    height: 32px;
    font-size: 20px;
    font-weight: 400;
    color: #fff;
    line-height: 70px;
    padding: 0;
    display: inline-block;
}

.markingsystem .popup .header .logo {
    position: absolute;
    right: 70px;
    top: 42px;
}

.markingsystem .popup .header .closeBtn {
    width: 30px;
    height: 30px;
    float: right;
    cursor: pointer;
}

.markingsystem .popup .header .closeBtn img {
    position: absolute;
    top: 25px;
    right: 25px;
    width: 15px;
    height: 15px;
}

.markingsystem .popup .content * {
    box-sizing: content-box !important;
}

.markingsystem .popup .content {
    width: 455px;
    margin: 0 auto;
    max-height: 320px;
    padding-top: 12px;
    overflow-y: scroll;
    overflow-x: scroll;
    padding-bottom: 50px;
    box-sizing: content-box !important;
}

.markingsystem .popup .content .functionname {
    height: 16px;
    width: 100%;
    padding: 12px 1px 12px 2px;
    font-size: 15px;
    font-weight: 500;
    color: #444;
    line-height: 18px;
    text-align: left;
}

.markingsystem .popup .content .starmarkingentry {
    position: relative;
    text-align: left;
    padding-bottom: 10px;
}

.markingsystem .popup .content .starmarkingentry .starcontainer {
    width: 170px;
    display: flex;
    justify-content: space-between;
}

.markingsystem .popup .content .starmarkingentry .starcontainer .staricon {
    height: 30px;
    cursor: pointer;
}

.markingsystem .popup .content .commentcontainer .functionname {
    width: 190px;
}

.markingsystem .popup .content .commentcontainer .textcontainer {
    width: 430px;
    height: 107px;
    background: #ffffff;
    border-radius: 5px;
    border: 1px solid #d8d8d8;
    background: #FFFFFF;
    border: 1px solid #d4d7e1;
    padding: 10px;
}

.markingsystem .popup .content .commentcontainer .textcontainer textarea {
    width: 100%;
    height: 105px;
    padding: 3px;
    font-size: 14px;
    border: none;
}

.markingsystem .popup .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 32px 0;
    border-radius: 5px;
    background: linear-gradient(to top, #fff 60%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
}

.markingsystem .popup .footer input[type="submit"] {
    margin-left: 270px;
    cursor: pointer;
    padding: 0 12px;
    line-height: 36px;
    text-shadow: none;
    color: #fff;
    font-size: 13px;
    font-weight: bold;
    border-radius: 36px;
    background: #396EFE;
    border: none;
    height: 36px;
    width: 100px;
}

.markingsystem .popup .footer input[type="submit"]:hover {
    background: #305DD7;
}

.markingsystem .popup .footer input[disabled] {
    background: rgba(57, 110, 254, 0.3);
}

.markingsystem .popup .footer input[disabled]:hover {
    background: rgba(57, 110, 254, 0.3);
}
`;

export default cssContent;