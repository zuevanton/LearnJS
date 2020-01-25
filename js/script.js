let num = 266219;
let str = String(num);

let result = 1;
for (let i = 0; i < str.length; i++) {
  result *= str[i];
}
console.log('результат умножения всех цифр в числе ' + num + ' = ' + result);

let resultPow = String(result ** 3);
console.log(resultPow[0] + ', ' + resultPow[1]);