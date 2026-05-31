const KEY="queue_v6";
const channel=new BroadcastChannel("queue_v6");

function getData(){
return JSON.parse(localStorage.getItem(KEY))||{
eventName:"活動名稱",
current:1,

groups:[],
lastGroup:0,

settings:{
color:"#ff5d8f"
},

ended:false,
endText:"今日已結束"
};
}

function saveData(data){
localStorage.setItem(KEY,JSON.stringify(data));
channel.postMessage(data);
}

function listen(cb){
channel.onmessage=(e)=>cb(e.data);
}