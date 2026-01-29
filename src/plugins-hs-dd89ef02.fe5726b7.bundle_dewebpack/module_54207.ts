const cssContent = `.login-folder {
    position: relative;
    cursor: pointer;
    width: 100%;
    z-index: 3001;
    margin-left: -12px;
    padding-left: 12px;
}
.login-folder-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.login-folder .dropdown {
    top: 0px;
    left: 0px;
    font-size: 12px;
    z-index: 1;
    opacity: 1;
    flex-direction: column;
    padding: 4px 0px;
    width: 140px;
    position: absolute;
    box-shadow: 0px 5px 50px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    transform: translateX(-100%);
    display: none;
}
.login-folder .dropdown.black {
    background-color: #343538;
    color: #FFFFFF;
}
.login-folder .dropdown.light {
    background-color: #fff;
    color: #60646f;
}
.login-folder .dropdownshow {
    display: flex;
}
.login-folder .user-info-folder-cli {
    width: 100%;
    height: 100%;
    text-align: start;
    display: flex;
    align-items: center;
    clear: both;
    margin: 0;
    padding: 5px 12px;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s;
}
.login-folder .user-info-folder-cli a {
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
}
.login-folder .user-info-folder-cli.light {
    background-color: #FFFFFF;
    color: #60646f;
}
.login-folder .user-info-folder-cli.light:hover {
    background-color: #F2F2F2;
}
.login-folder .user-info-folder-cli.black {
    color: #ffffff;
    background-color: #343538;
}
.login-folder .user-info-folder-cli.black:hover {
    color: #ffffff;
    background-color: #3D3D40;
}
.login-folder .helpicon-light {
    color: '#1c1c1c';
}
.login-folder .helpicon-dark {
    color: '#ffffff';
}`;

export default cssContent;