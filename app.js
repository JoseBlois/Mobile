(function(window,undefined){
    'use strict';
var ctx=null,canvas = null;
var touches=[];
var COLORS=['#f00','#0f0','#00f','#fff'];
var scaleX=1,scaleY=1;
var player = new Rectangle(95,260,10,10);
var btnLeft=new Button(10,270,20,20);
var btnRight=new Button(40,270,20,20);
var btnShoot=new Button(170,270,20,20);
var btnPause=new Button(90,0,20,20);
var pause=false;
var lastPress=null;
function Button(x,y,width,height){
    this.x = (x===undefined)?0:x;
    this.y = (y===undefined)?0:y;
    this.width = (width===undefined)?0:width;
    this.height = (height===undefined)?width:height;

}
Button.prototype.touch = function(){
    for(var i =0, l = touches.length;i<l;i++){
        if(touches[i]!==null){
            if(this.x < touches[i].x &&
                    this.x + this.width> touches[i].x&&
                    this.y < touches[i].y &&
                    this.y + this.height> touches[i].y){
                        return true;
                    }
            }
    }
    return false;
}
Button.prototype.stroke = function(ctx){
    ctx.strokeRect(this.x,this.y,this.width,this.height);
}
function Rectangle(x,y,width,height){
    this.x = (x===undefined)?0:x;
    this.y = (y===undefined)?0:y;
    this.width = (width===undefined)?0:width;
    this.height = (height===undefined)?width:height;
}
Rectangle.prototype.fill = function(ctx){
    ctx.fillRect(this.x,this.y,this.width,this.height);
}
function enableInputs(){
    canvas.addEventListener('touchstart',function(evt){
        var t = evt.changedTouches;
        for(var i = 0;i<t.length;i++){
            var x =~~((t[i].pageX - canvas.offsetLeft)*scaleX);
            var y = ~~((t[i].pageY - canvas.offsetTop)*scaleY);
            touch[t[i].identifier%100]=new Point (x,y); 
        }
    },false);
    canvas.addEventListener('touchend',function (evt){
        var t = evt.changedTouches;
        for(var i =0; i<t.length;i++){
        touches[t[i].identifier%100]=null;
        }
    },false);
    canvas.addEventListener('touchcancel',function (evt){
        var t = evt.changedTouches;
        for(var i =0; i<t.length;i++){
        touches[t[i].identifier%100]=null;
        }
    },false);
    canvas.addEventListener('touchmove',function(evt){
        evt.preventDefault();
        var t = evt.changedTouches;
        for(var i =0;i<t.length;i++){
            if(touches[t[i].identifier%100]){
            touches[t[i].identifier%100].x = ~~((t[i].pageX - canvas.offsetLeft)*scaleX);
            touches[t[i].identifier%100].y =  ~~((t[i].pageY - canvas.offsetTop)*scaleY);
            }
        }
    },false);
    canvas.addEventListener('mousedown',function(evt){
        evt.preventDefault();

        var x = ~~((evt.pageX - canvas.offsetLeft)*scaleX);
        var y = ~~((evt.pageY - canvas.offsetTop)*scaleY);
        touches[0] = new Point(x,y);
        lastPress=1;

    },false);
    document.addEventListener('mousemove',function(evt){
        if(touches[0]){
            touches[0].x = ~~((evt.pageX - canvas.offsetLeft)*scaleX);
            touches[0].y = ~~((evt.pageY - canvas.offsetTop)*scaleY);
        }
    },false);
    document.addEventListener('mouseup',function(evt){
        touches[0]=null;
    },false);
}
function Point(x,y){
    this.x = x||0;
    this.y = y||0;

}
function resize(){
    if(window.innerWidth>window.innerHeight){
        //Landscape
        canvas.style.position='';
        canvas.style.top='';
        canvas.style.left='';
        canvas.style.width='';
        canvas.style.height='';
        scaleX=1;
        scaleY=1;
    }else{
        canvas.style.position='fixed';
        canvas.style.top='0';
        canvas.style.left='0';
        canvas.style.width='100%';
        canvas.style.height='100%';
        scaleX= canvas.width/window.innerWidth;
        scaleY= canvas.height/window.innerHeight;
    }
    // scaleX = canvas.width/window.innerWidth;
    // scaleY = canvas.height/window.innerHeight;
}
function run(){
    window.requestAnimationFrame(run);

    act()
    paint(ctx)
}
function paint(ctx){
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle='#fff';
    for(var i=0; i < touches.length;i++){
        if(touches[i]){
            ctx.fillStyle=COLORS[i%COLORS.length];
            ctx.fillRect(touches[i].x-5,touches[i].y-5,10,10);
            ctx.fillText('ID: '+i+' X: '+touches[i].x+' Y: '+touches[i].y,10,10*i+20);
        }
    }
    if(pause){
        ctx.textAlign='center'
        ctx.fillText('PAUSE',canvas.width/2,canvas.height/2)
    }
    ctx.textAlign='left'
    ctx.strokeStyle='#fff';;
    ctx.fillStyle='#fff';
    player.fill(ctx)
    btnLeft.stroke(ctx);
    btnRight.stroke(ctx);
    btnShoot.stroke(ctx);
    btnPause.stroke(ctx);
}
function act(){
    if(!pause){
        if(lastPress===1 &&btnPause.touch()){
            pause=true;
            lastPress=null;
        }
     if(btnRight.touch()){
         player.x+=5;
     }
     if(btnLeft.touch()){
         player.x-=5;
     }
     if(player.x<0){
        player.x=0
     }else if(player.x+player.width>canvas.width){
         player.x=canvas.width-player.width
     }
        }
    if(lastPress===1&&btnPause.touch()){
        pause=false;
        lastPress=null;
    }
}
function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width=200;
    canvas.height=300;

    enableInputs();
    resize();
    run();
    // repaint();

}
window.addEventListener('resize',resize,false);
window.addEventListener('load',init,false);
window.requestAnimationFrame=(function(){
    return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(callback){window.setTimeout(callback,17);};
            })();
}(window))