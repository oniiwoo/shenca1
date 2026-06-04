let queueData = null;

function formatNumber(num){

return "A" +
String(num).padStart(3,"0");

}

db.ref("queue").on("value",(snapshot)=>{

queueData = snapshot.val();

render();

});

function render(){

if(!queueData) return;

document.getElementById("eventName").value =
queueData.eventName || "";

document.getElementById("endMessage").value =
queueData.endMessage || "";

document.getElementById("colorPicker").value =
queueData.color || "#000000";

const current =
document.getElementById("currentPreview");

current.innerText =
formatNumber(queueData.current);

current.style.color =
queueData.color;

let totalPeople = 0;

let html = "";

(queueData.groups || []).forEach(group=>{

totalPeople += Number(group.people);

html += `
<div class="list-item">

<div class="queue-number">
${formatNumber(group.id)}
</div>

<div>
${group.people} 人
</div>

</div>
`;

});

document.getElementById("waitingCount").innerText =
totalPeople;

document.getElementById("queueList").innerHTML =
html;

}

document.getElementById("eventName")
.addEventListener("input",(e)=>{

db.ref("queue/eventName")
.set(e.target.value);

});

document.getElementById("endMessage")
.addEventListener("input",(e)=>{

db.ref("queue/endMessage")
.set(e.target.value);

});

document.getElementById("colorPicker")
.addEventListener("input",(e)=>{

db.ref("queue/color")
.set(e.target.value);

});

function nextNumber(){

let next =
queueData.current + 1;

db.ref("queue/current").set(next);

}

function prevNumber(){

let prev =
Math.max(1,queueData.current - 1);

db.ref("queue/current").set(prev);

}

function recallNumber(){

alert(
"重叫：" +
formatNumber(queueData.current)
);

}

function resetCurrent(){

if(!confirm("確定重置叫號？"))
return;

db.ref("queue/current")
.set(1);

}

function clearQueue(){

if(!confirm("確定清空全部排隊資料？"))
return;

db.ref("queue/groups")
.set([]);

db.ref("queue/current")
.set(1);

db.ref("queue/lastNumber")
.set(0);

}

function openQueue(){

db.ref("queue/queueOpen")
.set(true);

db.ref("queue/activityEnded")
.set(false);

}

function pauseQueue(){

db.ref("queue/queueOpen")
.set(false);

}

function endActivity(){

if(!confirm("確定結束活動？"))
return;

db.ref("queue/activityEnded")
.set(true);

}