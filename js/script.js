'use strict';
let arg = prompt('введите что нибудь');
function myFunction(arg){
  if (arg === null){
    alert('передана не строка!');
    arg = prompt('попробуйте еще раз');
    return myFunction(arg);
  }
  arg = arg.trim();
  if (arg.length > 30) {
    arg = arg.slice(0, 30);
    return arg + '...';
  }
  return arg;
}

console.log(myFunction(arg));