let queueData = null;

const STORAGE_KEY = "myQueueNumber";

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

if(queueData.activityEnded){

document.getElementById("mainContent")
.style.display = "none";

document.getElementById("endScreen")
.classList.remove("hidden");

document.getElementById("endMessageText")
.innerText =
queueData.endMessage;

return;

}

document.getElementById("mainContent")
.style.display = "block";

document.getElementById("endScreen")
.classList.add("hidden");

document.getElementById("eventName")
.innerText =
queueData.eventName;

const current =
queueData.current;

const currentElement =
document.getElementById("currentNumber");

currentElement.innerText =
formatNumber(current);

currentElement.style.color =
queueData.color;

let totalPeople = 0;

(queueData.groups || []).forEach(group=>{

totalPeople += Number(group.people);

});

document.getElementById("waitingCount")
.innerText = totalPeople;

renderMyNumber();

}

function openTakeNumber(){

if(queueData.activityEnded){

alert("活動已結束");
return;

}

if(!queueData.queueOpen){

alert("目前暫停排隊");
return;

}

document.getElementById("takeModal")
.style.display = "flex";

}

function closeTakeNumber(){

document.getElementById("takeModal")
.style.display = "none";

}

function submitNumber(){

const people =
Number(
document.getElementById("peopleInput").value
);

if(
people < 1 ||
people > 10
){

alert("請輸入1~10");
return;

}

db.ref("queue").once("value")
.then(snapshot=>{

let data = snapshot.val();

let nextNumber =
(data.lastNumber || 0) + 1;

const group = {

id: nextNumber,
people: people,
createdAt: Date.now()

};

const groups =
data.groups || [];

groups.push(group);

db.ref("queue/groups")
.set(groups);

db.ref("queue/lastNumber")
.set(nextNumber);

localStorage.setItem(
STORAGE_KEY,
JSON.stringify(group)
);

closeTakeNumber();

});

}

function renderMyNumber(){

const saved =
localStorage.getItem(
STORAGE_KEY
);

if(!saved){

document.getElementById("myNumber")
.innerText = "-";

return;

}

const myData =
JSON.parse(saved);

document.getElementById("myNumber")
.innerText =
formatNumber(myData.id);

const status =
document.getElementById("myStatus");

const retakeArea =
document.getElementById("retakeArea");

retakeArea.innerHTML = "";

status.style.color = "#888";

const current =
queueData.current;

if(current === myData.id){

status.style.color = "green";

status.innerHTML =
"輪到您了";

return;

}

if(current < myData.id){

status.innerHTML =
"尚未輪到";

return;

}

const diff =
current - myData.id;

if(diff > 0){

const minutes =
Math.floor(
(Date.now() - myData.createdAt)
/ 1000 / 60
);

if(minutes >= 10){

status.style.color = "#999";

status.innerHTML =
"您已過號10分鐘，請重新取號";

retakeArea.innerHTML = `
<button onclick="resetMyNumber()">
重新取號
</button>
`;

return;

}

if(minutes >= 5){

status.style.color = "#999";

status.innerHTML =
"您已過號，請主動尋求工作人員協助";

retakeArea.innerHTML = `
<button onclick="resetMyNumber()">
重新取號
</button>
`;

return;

}

status.innerHTML =
"已過號";

}

}

function resetMyNumber(){

localStorage.removeItem(
STORAGE_KEY
);

location.reload();

}