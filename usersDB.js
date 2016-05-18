var db;
var users = [{
  "id": 111,
  "name": "Roman",
  "email": "roman.tomakh@echostar.com",
  "company": "Echostar"
},{
  "id": 222,
  "name": "Alexey",
  "email": "alexey.ruzmetov@echostar.com",
  "company": "Echostar"
},{
  "id": 333,
  "name": "Dmitro",
  "email": "dmitro.suprun@echostar.com",
  "company": "Echostar"
},{
  "id": 444,
  "name": "Eugene",
  "email": "eugene.laptur@echostar.com",
  "company": "Echostar"
},{
  "id": 555,
  "name": "Yuri",
  "email": "yuri.kostiv@echostar.com",
  "company": "Echostar"
},{
  "id": 666,
  "name": "Bill",
  "email": "bill.gates@microsoft.com",
  "company": "Microsoft"
},{
  "id": 777,
  "name": "Larry",
  "email": "larry.page@gmail.com",
  "company": "Google"
}];

var request = indexedDB.open("mailDB");

request.onupgradeneeded = function(e) {
  db = e.target.result;
  var store = db.createObjectStore("users", {autoIncrement: true});
  store.createIndex("email_index", "email", {unique: true});
  store.createIndex("company_index", "company", {unique: false});
};

request.onsuccess = function(e) {
  console.log("Request Success");
};

request.onerror = function(e) {
  console.log("Request Error");
};

/**/
var trans = db.transaction(["users"],"readwrite");
var usersStore = trans.objectStore("users");
for (var i = 0; i < users.length; i++) {
  usersStore.add(users[i]);
};
