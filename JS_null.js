var a = {};
var b = {x:'x'};
var c = 5;

var F = function(x,y,z) {
	x = null;
	y = null;
	z = null;
};

F(a,b,c);
a;	// ? {}
b;  // ? {x:'x'}
c;  // ? 5

var F2 = function(x,y,z) {
	x = {d: 'd'};
	y.x = 'new x';
	z = {z: 'z'};
};

F2(a,b,c);

a;	// ? {}
b;  // ? {x:'new x'}
c;  // ? 5


/* * * * * * * * * * * * * */

var arr = document.getElementsByTagName('*');

arr.forEach(function(el){
	//do something with el
});


/* * * * * * * * * * * * * */

function x(){
	console.log(y);
	return;
	var y = 10;
	function y(){};
}

x();	// ? function y();


/* * * * * * * * * * * * * */
var x = '5';
var y = '7';

console.log(+x + +y);

/* * * *   #1  * * * * * * */
sayHi("Вася"); // Привет, Вася

function sayHi(name) {
  alert( "Привет, " + name );
};

/* * * *   #1  * * * * * * */
sayHi("Вася"); // ошибка!

var sayHi = function(name) {
  alert( "Привет, " + name );
};


/* * * * * */
var arr = [5,6,7];
arr.age = 28;

arr.length;    // ? 3

for (var i = 0; i < arr.length; i++) {
	console.log(arr[i]);				// ? 5,6,7
};

for (var i in arr) {
	console.log(arr[i]);				// ? 5,6,7,28
};

arr[199] = 8;

arr.length;	   // ? 200


/* * * * * * * * */
var arr = [1, 2, 3, 4, 5];

arr.length = 2; // укоротить до 2 элементов
console.log( arr ); // [1, 2]


/** * * * * * * * */
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  if(a > b) return 1;
  if(a < b) return -1;
});

/** * * * * * * * */
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
	return a - b;
});



/* * * * * * * * */
var d = 5;
function R() {
    this.d = 1;
    (function f() {
        console.log(this.d)
    })();
};
var r = new R();
console.log(d);
R();
console.log(d);
// ? 5 5 1 1
