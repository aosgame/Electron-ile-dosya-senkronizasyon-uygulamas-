const {app,BrowserWindow} = require('electron')
const url=require('url')
const path=require('path')


let win;

function createWindow(){
    win=new BrowserWindow({
        width:900,
        height:700,
        frame:false,
        webPreferences:{
            nodeIntegration:true
        }
    })


win.loadURL(url.format({
    pathname:path.join(__dirname,'index.html'),
    protocol:'file:',
    slashes:true
}))

win.openDevTools()

}

app.on('ready',createWindow)
