const {remote}=require('electron')
const {Tray,Menu}=remote
const fs=require('fs')
let importantDosya='important'
let copyDosya='copy'


var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$interval){

    $interval(function(){
        SenkronizeEt()
        EkranaYaz()
    },10000)
})

let tray=new Tray('synchronization.png')

function EkranaYaz(){

    var p=document.getElementById("sonSenkron")
    var zaman=new Date().toLocaleTimeString("en-US")
    p.innerText="Son eşitleme saati "+ zaman;
}

function SenkronizeEt(){

    let data=fs.readFileSync(importantDosya,'utf-8')

    fs.writeFile(copyDosya,data,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            EkranaYaz()
        }
    })
}



const trayMenuTemplate=[
    {
        label:'Senkronize Uygulaması',
        enabled:false
    },
    {
        label:'Senkronize Et',
        click:function(){
            // console.log("Senkronize et ve ekrana yaz");
            SenkronizeEt()
            EkranaYaz()
        }
    },

    {
        label:'Gizle/Göster',
        click:function(){
            let win=remote.getCurrentWindow()
            win.isVisible() ? win.hide() : win.show()
        }
    },
    {
        label:'Çıkış',
        click:function(){
            remote.app.quit()
        }
    }
]

let trayMenu=Menu.buildFromTemplate(trayMenuTemplate)
tray.setContextMenu(trayMenu)