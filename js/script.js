'use strict';
let money, 
    income = 'фриланс', 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), 
    deposit = confirm('Есть ли у вас депозит в банке?'), 
    mission = 200000, 
    period,
    budgetDay,
    accumulatedMonth,
    expenses = [],
    amount    = [];

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};
function showTypeOf(data){
  console.log(typeof(data));
}

let start = function(){
  do {
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money) || money.trim() === '' || money === null);
};
start();

const getExpensesMonth = function() {
  let sum = 0,
      i = 0,
      sumCheck;
  do{
    i++;
    amount[i] = prompt('введите обязательную статью расходов');
    sumCheck = prompt('во сколько это обойдется?');
    while(!isNumber(sumCheck) || sumCheck.trim() === '' || sumCheck === null){
      sumCheck = prompt('во сколько это обойдется?');
    }
    sum += +sumCheck;
  }
  while (confirm('есть еще расходы?'));
  return sum;
};
let expensesMonth = getExpensesMonth();

function getAccumulatedMonth(){
  return money - expensesMonth;
}

accumulatedMonth = getAccumulatedMonth();
budgetDay = Math.floor(accumulatedMonth / 30);
function getTargetMonth(){
  period = Math.ceil(mission / accumulatedMonth);
  return period;
}

// определяем уровень дохода
const getStatusIncome = function(){
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  }
  else if (budgetDay >= 600) {
    return ('У вас средний уровень дохода');
  }
  else if (budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  }
  else {
    return ('Что то пошло не так');
  }  
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('расходы за месяц ' + expensesMonth);
console.log(addExpenses.toLowerCase().split(', '));
if (getTargetMonth() < 0){
  console.log('цель не будет достигнута');
} else {
  console.log('цель будет достигнута через ' + getTargetMonth() + ' месяцев');
}
console.log('бюджет на день составляет: ' + budgetDay);
console.log(getStatusIncome());