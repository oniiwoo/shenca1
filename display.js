let data = getData();

function fmt(n){
return "A"+String(n).padStart(3,"0");
}

function total(){
return data.groups.reduce((a,b)=>a+b.people,0);
}

function myGroup(){
return data.groups.find(g=>g.id===data.lastGroup);
}

// ⭐ 修正：統一同步方法（關鍵）
function sync(){
saveData(data);   // ← localStorage + broadcast
render();
}

// ⭐ 取號（修正同步核心）
function take(n){

data.lastGroup++;

data.groups.push({
id:data.lastGroup,
people:n,
time:Date.now()
});

// ⚠️ 必須用 sync，不是 saveData 單獨呼叫
sync();

document.getElementById("modal").style.display="none";
}

function openModal(){
let m=document.getElementById("modal");
m.style.display="block";

let box=document.getElementById("btns");
box.innerHTML="";

for(let i=1;i<=10;i++){
let b=document.createElement("button");
b.innerText=i+" 人";
b.onclick=()=>take(i);
box.appendChild(b);
}
}

function render(){

if(data.ended){
document.body.innerHTML=
"<h1 style='text-align:center;margin-top:200px'>"+data.endText+"</h1>";
return;
}

document.getElementById("title").innerText=data.eventName;

let c=document.getElementById("current");
c.innerText=fmt(data.current);
c.style.color=data.settings.color;

document.getElementById("waiting").innerText=total();

// 我的號碼
let my=myGroup();
document.getElementById("my").innerText=my?fmt(my.id):"尚未取號";

// 狀態判斷
let status="";

if(my){

if(data.current===my.id){
status="輪到您了";
}

if(data.current>my.id){
status="<button onclick='retake()'>重新取號</button>";
}
}

document.getElementById("status").innerHTML=status;
}

function retake(){
alert("請重新取號");
}

// ⭐ 即時同步監聽（保留）
listen((d)=>{
data=d;
render();
});

render();