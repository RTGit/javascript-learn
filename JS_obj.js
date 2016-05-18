function Parent() {
	var x = 'parent_x';
	this.y = 'parent_y';
	this.getX = function(){return this.x;};
	this.getY = function(){return this.y + ' from constructor!';};
	console.log("==> Parent constructor!!!");
};

Parent.prototype.get_Y = function(){return this.y + ' from prototype!'};

var p1 = new Parent();	/* p1 has y, getX(), getY(), get_Y() */
// "==> Parent constructor!!!"
p1.x;			// undefined
p1.y;			// "parent_y"
p1.getX();		// undefined
p1.getY();		// "parent_y from constructor!"
p1.get_Y();		// "parent_y from prototype!"

var p2 = Object.create(Parent.prototype);	/* p2 has get_Y() */
p2.x;			// undefined
p2.y;			// undefined
p2.getX();		// undefined is not a function
p2.getY();		// undefined is not a function
p2.get_Y();		// "undefined from prototype!"

/* * * * * * * * * * * * * * * * * * * * * * * */

function Child_1() {
	this.y = 'child_1_y';
	console.log("==> Child_1 constructor!!!");
};

Child_1.prototype = new Parent();
// "==> Parent constructor!!!"

var c1 = new Child_1();
// "==> Child_1 constructor!!!"
c1.x;					// undefined
c1.y;					// "child_1_y"
c1.getX();				// undefined
c1.getY();				// "child_1_y from constructor!"
c1.get_Y();				// "child_1_y from prototype!"
c1.__proto__.y;			// "parent_y"
c1.__proto__.getY();	// "parent_y from constructor!"
c1.__proto__.get_Y();	// "parent_y from prototype!"

/* * * * * * * * * * * * * * * * * * * * * * * */

function Child_2() {
	this.y = 'child_2_y';
	console.log("==> Child_2 constructor!!!");
};

Child_2.prototype = Object.create(Parent.prototype);

var c2 = new Child_2();
// "==> Child_2 constructor!!!"
c2.x;					// undefined
c2.y;					// "child_2_y"
c2.getX();				// undefined is not a function
c2.getY();				// undefined is not a function
c2.get_Y();				// "child_2_y from prototype!"
c2.__proto__.y;			// undefined
c2.__proto__.getY();	// undefined is not a function
c2.__proto__.get_Y();	// undefined is not a function

/* * * * * * * * * * * * * * * * * * * * * * * */

function Child_3() {
	Parent.call(this);
	this.y = 'child_3_y';
	console.log("==> Child_3 constructor!!!");
};

Child_3.prototype = Object.create(Parent.prototype);

var c3 = new Child_3();
// "==> Parent constructor!!!"
// "==> Child_3 constructor!!!""
c3.x;					// undefined
c3.y;					// "child_3_y"
c3.getX();				// undefined
c3.getY();				// "child_3_y from constructor!"
c3.get_Y();				// "child_3_y from prototype!"
c3.__proto__.y;			// undefined
c3.__proto__.getY();	// undefined is not a function
c3.__proto__.get_Y();	// "undefined from prototype!"


/* * * * * * * * * * * * * * * * * * * * * * * */

function Func() {
	this.field = [];
	(function () {
		this.field[0] = 1;
		this.field[1] = 2;
	})();
}

var f = new Func();
f.field; 				// ? Error