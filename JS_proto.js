function Klass(){
	this.x = 'x';
	this.y = [];
}
Klass.prototype.z = 'z';
Klass.prototype.w = [];


var k1 = new Klass();
var k2 = new Klass();

k1.x = 'new x';
k1.y.push(1,2);
k1.z = 'new z';
k1.w.push(3,4);

k2.x;	// ? 'x'
k2.y;	// ? []
k2.z;	// ? 'z'
k2.w;	// ? [3,4]
