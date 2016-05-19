var array = ['One', 'Two', 'Three', 'Four', 'Five'];

for(var i = 0; i < array.length; i++) {
  var item = i;
  setTimeout(function(){
    console.log(array[item]);
  }, 1000);
}

//Result: Five Five Five Five Five

for(var i = 0; i < array.length; i++) {
  (function() {
    var item = i;
    setTimeout(function(){
      console.log(array[item]);
    }, 1000);
  })()
}

//Result: One, Two, Three, Four, Five
