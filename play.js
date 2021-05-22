const canvas=document.querySelector("canvas");
let scoreEl=document.querySelector(".score b");
const colors=["rgb(255, 0, 34)","rgb(0, 119, 255)","rgb(0, 183, 255)","rgb(9, 255, 0)","rgb(38, 0, 255)","rgb(247, 11, 156)"]
let score=0;
let auto=false;
let enemyDur=50;
document.querySelector(".score button").addEventListener("click",(e)=>{
  if(auto){
    auto=false;
    enemyDur=22;
    document.querySelector(".score .fa").className="fa fa-circle-o"
    gameId==null ? document.querySelector(".score button").style.animationName="sign":"";
  }
  else{
    auto=true;
    enemyDur=2;
    document.querySelector(".score .fa").className="fa fa-check-circle-o"
    document.querySelector(".score button").style.animationName="none"
  }
  });
canvas.width=innerWidth;
canvas.height=innerHeight;
x=canvas.width/2;
let y=canvas.height/2;
addEventListener("resize",()=>{
  window.location.href=window.location
})
const ctx=canvas.getContext("2d");
class Player{
  constructor(x,y,r){
    this.r=r;
    this.x=x;
    this.y=y;
  }
  draw(){
    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
    ctx.fill();
  }
}
 const allBullets=[];
class Bullet{
constructor(colors){
  this.colors=colors;
}
draw(x,y,r,v={"x":1,"y":1}){
  ctx.beginPath()
  ctx.fillStyle=this.colors;
  ctx.arc(x+v.x,y+v.y,r,0,Math.PI*2);
  ctx.fill();
}
update(){
}
}
const allParticles=[];
class Particles{
  constructor(color){
    this.color=color;
  }
  draw(x,y,r){
    ctx.beginPath();
    ctx.fillStyle=this.color;
    ctx.arc(x,y,r,0,Math.PI*2,true);
      ctx.fill();
  }
}
//clash paticles
 const ptcls=[];
function drawPaticles(x,y,r,v={"x":1,"y":1},color,alpha){
ctx.save();
  ctx.beginPath()
  ctx.globalAlpha=alpha;
  ctx.fillStyle=color;
  ctx.arc(x+v.x,y+v.y,r,0,Math.PI*2);
  ctx.fill();
ctx.restore();
}
function clash(x,y,color){
for (let i = 0; i < 30; i++){
 ptcls.push({"x":x,"y":y,"v":{"x": i % 2==0 ? Math.random()*1:Math.random()* -1,"y":i % 2 ==0 ? Math.random()* -1:Math.random()* 1},"alpha":1,"color":color});
}
}
const allEnemies=[];
class Enemies{
  constructor(color){
    this.color=color;
  }
  draw(x,y,r,color){
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.arc(x,y,r,0,Math.PI*2,true);
      ctx.fill();
  }
}
//ends clash collision
function gameOver(){
  Swal.fire({
    imageUrl: 'https://i.imgur.com/83bLhCx.jpg',
  imageWidth: 300,
  imageHeight: 120,
    title:"Points<br><small>"+score+"</small>",
    text:"Becouse Enemy hits You  : click play Again to restart this game!",
    confirmButtonText:"Play Again"
  }).then((e)=>{
    if(e.isConfirmed){
      allBullets.splice(0,allBullets.length);
      allEnemies.splice(0,allEnemies.length);
      setTimeout(() => {
        score=0;
        scoreEl.innerHTML=score;
        clicked=false;
        animate();
      }, 1000);
     
    }
    else{
      gameOver();
    }
  })
  
}

function win(){
  Swal.fire({
    imageUrl: 'https://i.imgur.com/PiWc1hU.jpg',
  imageWidth: 300,
  imageHeight: 120,
    title:"Points<br><small>"+score+"</small>",
    text:"You have complete this level  : click 'play Next Level' to start new Level",
    confirmButtonText:"Play Next Level"
  }).then((e)=>{
    if(e.isConfirmed){
      allBullets.splice(0,allBullets.length);
      allEnemies.splice(0,allEnemies.length);
      enemyDur-=5;
      score=0;
      scoreEl.innerHTML=score;
      setTimeout(() => {
        clicked=false;
        animate();
      }, 1000);
     
    }
    else{
      win();
    }
  })
  
}
let enemies=0;
let animationName;
function animate(){
  ptcls.forEach((e,i)=> {
  e.x+=e.v.x*5;
  e.y+=e.v.y*5;
drawPaticles(e.x,e.y,2,e.v,e.color);
   e.alpha-=0.04;
 if(e.alpha<0){
   ptcls.splice(i,1)
 }
});

  animationName=requestAnimationFrame(animate);

//  enemies++;
  enemies > enemyDur ? enemies=0:enemies+=1; 
  ctx.fillStyle="rgba(0,0,0,0.3)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  player.draw();
allBullets.forEach((e,i)=>{//shoot all projectiles
if(e.x > canvas.width||e.y > canvas.height || e.x < 0 || e.y < 0){
 allBullets.splice(i,1);
 }
  allBullets[i].x-=e.v.x*10;
  allBullets[i].y-=e.v.y*10;
bullet.draw(e.x,e.y,e.r);
if(e.x > canvas.width||e.y > canvas.height){
  allBullets.splice(i,1);
 }

});//end shooting projectiles
if(allEnemies.length<1 && clicked){
win();
cancelAnimationFrame(animationName);
}

allEnemies.forEach((e,i)=>{
  e.y+=e.v.y;
  e.x+=e.v.x;
  Enemy.draw(e.x,e.y,e.r,e.color)
if(e.x > canvas.width||e.y > canvas.height || e.x < 0 || e.y < 0){
 allEnemies.splice(i,1);
 }
  const el=e;
  const enemyIndex=i;
 allBullets.forEach((e,i) => {
   const distance=Math.hypot(e.x-el.x,e.y-el.y);//projectile collision
   if(distance-e.r-el.r < 1){
     if(el.r<15){
      score+=50;
     setTimeout(() => {
    allEnemies.splice(enemyIndex,1)
     allBullets.splice(i,1);
     clash(e.x,e.y,el.color);
     }, 0);
     }
     else{
       allBullets.splice(i,1);
       el.r-=5;
       score+=10;
     }
     scoreEl.innerHTML=score;
      }
   
 });
 //player collision
 const distance=Math.hypot(e.x-player.x,e.y-player.y);
 if(distance-e.r-playerRadius<1){
  cancelAnimationFrame(animationName);
  gameOver();
 }
})
if(enemies==1){
 let x=Math.floor(Math.random()*canvas.width) > canvas.width/2 ? canvas.width:0;
 let y=Math.floor(Math.random()*canvas.height) > canvas.height/2 ? canvas.height:0;
  if(x<2){
    y=Math.floor(Math.random()*canvas.height);
     x=Math.floor(Math.random()*canvas.width) > canvas.width/2 ? canvas.width:0;
  }
  else{
    x=Math.floor(Math.random()*canvas.width);
   y=Math.floor(Math.random()*canvas.height) > canvas.height/2 ? canvas.height:0;
  }
  const tan=Math.atan2(canvas.height/2-y,canvas.width/2-x);
allEnemies.push({"x":x,"y":y,"v":{"x":Math.cos(tan),"y":Math.sin(tan)},"r":Math.floor(Math.random()*20)+5,"color":colors[Math.floor(Math.random()*colors.length-1)]});
 }
}
let playerRadius=30;
const player=new Player(x,y,playerRadius);
const bullet=new Bullet("white");
const Enemy=new Enemies("red");
let clicked=false
canvas.addEventListener("click",(e)=>{
  clicked=true;
  const x=e.clientX;
  const y=e.clientY;
  const tan=Math.atan2(canvas.height/2-y,canvas.width/2-x);
  allBullets.push({"x":canvas.width/2,"y":canvas.height/2,"v":{"x":Math.cos(tan),"y":Math.sin(tan)},"r":10});
});
//mouse events and touchs events
const handleMouse=(e)=>{
 const x=e.clientX;
 const  y=e.clientY
 if(auto){
 const tan=Math.atan2(canvas.height/2-y,canvas.width/2-x);
  allBullets.push({"x":canvas.width/2,"y":canvas.height/2,"v":{"x":Math.cos(tan),"y":Math.sin(tan)},"r":10});
 }
}
const handleTouch=(e)=>{
  const x=e.touches[0].clientX;
  const  y=e.touches[0].clientY;
if(auto){
  const tan=Math.atan2(canvas.height/2-y,canvas.width/2-x);
   allBullets.push({"x":canvas.width/2,"y":canvas.height/2,"v":{"x":Math.cos(tan),"y":Math.sin(tan)},"r":10});
 }
}

canvas.addEventListener("mousedown",handleMouse)
canvas.addEventListener("mousemove",handleMouse)
canvas.addEventListener("mouseup",handleMouse)

canvas.addEventListener("touchstart",handleTouch);
canvas.addEventListener("touchmove",handleTouch);
canvas.addEventListener("touchend",handleTouch);

let initId;
let initText=x;
function init(){
  ctx.fillStyle="black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.font="20px Times";
  ctx.fillStyle="white"
  ctx.fillText(`Welcome Back to Another Game...
DEVELOPERS : Game Codes writen by Austine Samuel 
GAME IDEAS from christCouses.com  HOW TO PLAY
click on the screen to shoot an enemy you can also use auto shoot to automatically shoot on Enemies
  `,initText,y);
  initId=requestAnimationFrame(init);
  initText-=3;
 if(initText < -2000){
  document.querySelector(".score button").style.animationName="sign";
   localStorage.setItem("gameId","none");
     cancelAnimationFrame(initId)
     player.draw();
     animate();
   }
  }
let gameId;
  onload=()=>{
 gameId=localStorage.getItem("gameId");
    if(gameId==null||gameId==undefined){
 init();
    }
    else{
      player.draw();
     animate();
    }
  }
  
//Code Writen by Austine Samuel  22/5/2021
//Game Ideas From ChristCouses.com