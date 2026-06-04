const firebaseConfig = {
apiKey: "AIzaSyBEMsM9hxTr37Lb5wC1gcJM9Dg3YfjdLYg",
authDomain: "shenca-f7700.firebaseapp.com",
databaseURL: "https://shenca-f7700-default-rtdb.firebaseio.com",
projectId: "shenca-f7700",
storageBucket: "shenca-f7700.firebasestorage.app",
messagingSenderId: "100990519321",
appId: "1:100990519321:web:827dd8d00f17da19038288"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const defaultData = {

eventName:"活動名稱",

current:1,

lastNumber:0,

color:"#000000",

queueOpen:true,

activityEnded:false,

endMessage:"今日號碼牌已發放完畢",

groups:[]

};

function initializeData(){

db.ref("queue").once("value")
.then(snapshot=>{

if(!snapshot.exists()){

db.ref("queue").set(defaultData);

}

});

}

initializeData();