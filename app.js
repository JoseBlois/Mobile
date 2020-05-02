(function(window,undefined){
var ctx=null,canvas = null;
var touches=[];
var COLORS=['#f00','#0f0','#00f','#fff'];

function enableInputs(){
    canvas.addEventListener('touchstart',function(evt){
        var t = evt.changedTouches;
        for(var i = 0;i<t.length;i++){
            var x =t[i].pageX - canvas.offsetLeft;
            var y = t[i].pageY - canvas.offsetTop;
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
            touches[t[i].identifier%100].x = evt.pageX - canvas.offsetLeft;
            touches[t[i].identifier%100].y = evt.pageY - canvas.offsetTop;
        }
    },false);
    canvas.addEventListener('mousedown',function(evt){
        evt.preventDefault();
        var x = evt.pageX - canvas.offsetLeft
        var y = evt.pageY - canvas.offsetTop
        
        touches[0] = new Point(x,y);

    },false);
    document.addEventListener('mousemove',function(evt){
        if(touches[0]){
            touches[0].x = evt.pageX - canvas.offsetLeft;
            touches[0].y = evt.pageY - canvas.offsetTop;
        }
    },false);
    document.addEventListener('mouseup',function(){
        touches[0]=null;
    },false);
}
function Point(x,y){
    this.x = x||0;
    this.y = y||0;

}
function run(){
    window.requestAnimationFrame(run);

    act()
    paint(ctx)
}
function paint(ctx){
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle='#999';
    for(var i=0; i < touches.length;i++){
        if(touches[i]){
            ctx.fillStyle=COLORS[i%COLORS.length];
            ctx.fillRect(touches[i].x-10,touches[i].y-10,20,20);
            ctx.fillText('ID: '+i+' X: '+touches[i].x+' Y: '+touches[i].y,10,10*i+20);
        }
    }
}
function act(){

}
function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width=300;
    canvas.height=200;

    // console.log('andaaa')
    enableInputs();
    run();
    // repaint();

}
window.addEventListener('load',init,false);
window.requestAnimationFrame=(function(){
    return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(callback){window.setTimeout(callback,17);};
            })();
}(window))