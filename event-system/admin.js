let data=getData();

function fmt(n){
return "A"+String(n).padStart(3,"0");
}

function save(){
saveData(data);
render();
}

function next(){
data.current++;
save();
}

function prev(){
if(data.current>1) data.current--;
save();
}

function recall(){
alert("請 "+fmt(data.current));
}

function render(){

// 活動名稱
document.getElementById("eventName").value=data.eventName;

// 顏色
document.getElementById("color").value=data.settings.color;

// ⭐ 即時預覽（你說不見的部分已修復）
let c=document.getElementById("current");
c.innerText=fmt(data.current);
c.style.color=data.settings.color;

// 排隊表
document.getElementById("table").innerHTML=
data.groups.map(g=>
`<div><b>${fmt(g.id)}</b> ｜ ${g.people}人</div>`
).join("");
}

document.getElementById("eventName").oninput=(e)=>{
data.eventName=e.target.value;
save();
};

document.getElementById("color").oninput=(e)=>{
data.settings.color=e.target.value;
save();
};

function end(){
data.ended=true;
data.endText=document.getElementById("endText").value;
save();
}

render();