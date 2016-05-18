/* * * The Module Pattern * * * * */
var testModule = (function(){
  var str;
  return {
    setStr: function(newStr){
      str = newStr;
    },
    getStr: function(){
      return str;
    }
  }
})();

testModule.setStr('string');
testModule.getStr();


/* * * The Revealing Module Pattern * * */
var testModule = (function(){
  var publicStr, privateStr;
  function privateMethhod() {
  	//private method
  };
  function publicSetStr(newStr) {
  	privateMethhod();
    str = newStr;
  };
  function publicGetStr() {
    return str;
  };
  
  return {
  	str: publicStr,
  	setStr: publicSetStr,
  	getStr: publicGetStr
  };
})();

testModule.setStr('string');
testModule.getStr();


/* * * The Singleton Pattern * * */
var Singleton = (function() {
	var instance;
	function init() {
		function privateMethod() {
			console.log('I am private');
		};
		var privateVar = 'Private';
		var privateRandomNumber = Math.random();
		return {
			publicMethod: function() {
				cosnole.log('I am public');
			},
			publicVar: 'Public',
			getRundomNumber: function() {
				return privateRandomNumber;
			}
		} 
	};

	return {
		getInstance: function() {
			if(!instance) {
				instance = init();
			};
			return instance;
		}
	}
})();

var singleA = Singleton.getInstance(); // !instance = true, do init();
var singleB = Singleton.getInstance(); // !instance = false, return the same instance
console.log( singleA.getRandomNumber() === singleB.getRandomNumber() ); // true


/* * * The Observer Pattern * * */
function ObserverList() {
	this.observerList = [];
};
ObserverList.prototype.add = function( obj ) {
	this.observerList.push( obj );
};
ObserverList.prototype.get = function( index ) {
	if(index > -1 && index < this.observerList.length) {
		return this.observerList[ index ];
	};
};
ObserverList.prototype.remove = function( index ) {
	this.observerList.splice( index, 1 );
};
ObserverList.prototype.indexOf = function( obj, startIndex ) {
	var i = startIndex || 0;
	while(i < this.observerList.length) {
		if(this.observerList[ i ] === obj) {
			return i;
		}
		i++;
	};
	return -1;
};
ObserverList.prototype.count = function() {
	return this.observerList.length;
};



function Subject() {
	this.observers = new ObserverList();
};
Subject.prototype.addObsever = function( obj ) {
	this.observers.add( obj );
};
Subject.prototype.removeObserver = function( obj ) {
	this.observers.remove( this.observers.indexOf( obj ));
};
Subject.prototype.notify = function( context ) {
	var observersCount = this.observers.count();
	for(var i = 0; i < observersCount; i++) {
		this.observers.get(i).update( context );
	};
};


function Observer() {
	this.update = function() {
		console.log('Notified!');
	}
};

function extend( extension, obj ){	//copies methods from Subject or Observer
  for ( var key in extension ){
    obj[key] = extension[key];
  }
}

var subj = new Subject();
var obj1 = new Observer();
var obj2 = new Observer();
var obj3 = new Observer();

subj.addObsever(obj1);
subj.addObsever(obj2);
subj.addObsever(obj3);

subj.notify();


/* * * The Publish/Subscribe Pattern * * */
function init(myObject) {
	var types = {};
	var id = -1;

	myObject.publish = function( type, args ) {			// 'fire' function
		if(!types[type]) {
			return false;
		};
		var subscribers = types[type];
		var length = subscribers ? subscribers.length : 0;
		while(length--) {
			subscribers[length].func( type, args );
		};
		return this;	//TODO
	};

	myObject.subscribe = function( type, func ) {		// 'on' function
		if(!types[type]) {
			types[type] = [];
		};
		var token = (++id).toString();
		types[type].push({
			token: token,
			func: func
		});
		return token; 	//TODO
	};

	myObject.unsubscribe = function( token ) {			// 'off' function
		for(var key in types) {
			if(types[key]) {
				for(var i=0, j=types[key].length; i<j; i++) {
					if(types[key][i].token === token) {
						types[key].splice(i, 1);
						return token;
					};
				};
			};
		};
		return this;
	};
};

var PubSub = {};	// Publish/Subscribe object
init(PubSub);

var subscriber1 = PubSub.subscribe('test', function(types, data) { console.log(types + ': ' + data); });
var subscriber2 = PubSub.subscribe('test', function() { console.log('subscriber2'); });
var subscriber3 = PubSub.subscribe('new_test', function(types, data) { console.log(types + ': ' + data); });

PubSub.publish('test', 'Hi everyone!');
PubSub.publish('new_test', 'Hi new test!');



/* * * The Mediator Pattern * * */
var orgChart = {
 
  addNewEmployee: function(){
 
    // getEmployeeDetail provides a view that users interact with
    var employeeDetail = this.getEmployeeDetail();
 
    // when the employee detail is complete, the mediator (the 'orgchart' object)
    // decides what should happen next
    employeeDetail.on("complete", function(employee){
 
      // set up additional objects that have additional events, which are used
      // by the mediator to do additional things
      var managerSelector = this.selectManager(employee);
      managerSelector.on("save", function(employee){
        employee.save();
      });
 
    });
  },
 
  // ...
}


/* * * The Command Pattern * * */
(function(){
 
  var carManager = {
 
    // request information
    requestInfo: function( model, id ){
      return "The information for " + model + " with ID " + id + " is foobar";
    },
 
    // purchase the car
    buyVehicle: function( model, id ){
      return "You have successfully purchased Item " + id + ", a " + model;
    },
 
    // arrange a viewing
    arrangeViewing: function( model, id ){
      return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
    }
 
  };
 
})();

carManager.execute = function ( name ) {
    return carManager[name] && carManager[name].apply( carManager, [].slice.call(arguments, 1) );
};

carManager.execute( "arrangeViewing", "Ferrari", "14523" );
carManager.execute( "requestInfo", "Ford Mondeo", "54323" );
carManager.execute( "requestInfo", "Ford Escort", "34232" );
carManager.execute( "buyVehicle", "Ford Escort", "34232" );


/* * * The Facade Pattern * * */
//jQuery functions like ready(), css(), animate() ...
//it has easy sintax and we do not need to know about the implementation



/* * * The Factory Pattern * * */
// Rather than creating a component directly using the 'new' operator or via another creational constructor, 
// we ask a Factory object for a new component instead. We inform the Factory what type of object is required 
// (e.g "Car", "Truck") and it instantiates this, returning it to us for use.

// Types.js - Constructors used behind the scenes
function Car( options ) {
  this.doors = options.doors || 4;
  this.state = options.state || "brand new";
  this.color = options.color || "silver";
}
 
function Truck( options){
  this.state = options.state || "used";
  this.wheelSize = options.wheelSize || "large";
  this.color = options.color || "blue";
}

// FactoryExample.js
function VehicleFactory() {}
VehicleFactory.prototype.vehicleClass = Car;
VehicleFactory.prototype.createVehicle = function ( options ) {
  switch(options.vehicleType){
    case "car":
      this.vehicleClass = Car;
      break;
    case "truck":
      this.vehicleClass = Truck;
      break;
    //defaults to VehicleFactory.prototype.vehicleClass (Car)
  }
  return new this.vehicleClass( options );
};
 
// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle( {
            vehicleType: "car",
            color: "yellow",
            doors: 6 } );
var movingTruck = carFactory.createVehicle( {
                      vehicleType: "truck",
                      state: "like new",
                      color: "red",
                      wheelSize: "small" } );




/* * * Abstract Factory * * */
var abstractVehicleFactory = (function () {
  // Storage for our vehicle types
  var types = {};
 
  return {
      getVehicle: function ( type, customizations ) {
          var Vehicle = types[type];
          return (Vehicle ? new Vehicle(customizations) : null);
      },
 
      registerVehicle: function ( type, Vehicle ) {
          var proto = Vehicle.prototype;
          // only register classes that fulfill the vehicle contract
          if ( proto.drive && proto.breakDown ) {
              types[type] = Vehicle;
          }
          return abstractVehicleFactory;
      }
  };
})();
 
 
// Usage:
abstractVehicleFactory.registerVehicle( "car", Car );
abstractVehicleFactory.registerVehicle( "truck", Truck );
 
var car = abstractVehicleFactory.getVehicle( "car", {
            color: "lime green",
            state: "like new" } );
 
var truck = abstractVehicleFactory.getVehicle( "truck", {
            wheelSize: "medium",
            color: "neon yellow" } );




/* * * The Mixin Pattern * * */
// Define a simple Car constructor
var Car = function ( settings ) {
    this.model = settings.model || "no model provided";
    this.color = settings.color || "no colour provided";
 };
 
var Mixin = function () {};
 
Mixin.prototype = {
    driveForward: function () {
        console.log( "drive forward" );
    },
    driveBackward: function () {
        console.log( "drive backward" );
    },
    driveSideways: function () {
        console.log( "drive sideways" );
    }
};
 
function augment( receivingClass, givingClass ) {
    // only provide certain methods
    if ( arguments[2] ) {
        for ( var i = 2; i < arguments.length; i++ ) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    }
    // provide all methods
    else {
        for ( var methodName in givingClass.prototype ) {
            if ( !receivingClass.prototype[methodName] ) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
        }
    }
}
 
augment( Car, Mixin, "driveForward", "driveBackward" );
var myCar = new Car({
    model: "Ford Escort",
    color: "blue"
});
myCar.driveForward();
myCar.driveBackward();
 
augment( Car, Mixin );
var mySportsCar = new Car({
    model: "Porsche",
    color: "red"
});
mySportsCar.driveSideways();



/* * * The Decorator Pattern * * */
// The constructor to decorate
function MacBook() {
  this.cost = function () { return 997; };
  this.screenSize = function () { return 11.6; };
 }
 
// Decorator 1
function memory( macbook ) {
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 75;
  };
 }
 
// Decorator 2
function engraving( macbook ){
  var v = macbook.cost();
  macbook.cost = function(){
    return v + 200;
  };
}

// Decorator 3
function insurance( macbook ){
  var v = macbook.cost();
  macbook.cost = function(){
     return v + 250;
  };
}
 
var mb = new MacBook();
memory( mb );
engraving( mb );
insurance( mb );
 
console.log( mb.cost() );
console.log( mb.screenSize() );