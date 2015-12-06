if(!Date.now){
  Date.now = function now(){
    return new Date().getTime();
  };
}

// Why cant this go here?
/*$.validator.addMethod('minMoney', function(param) {
  return param > 0 ? true : false
});*/
