'use strict';
let money = +prompt('Ваш месячный доход?'), 
    income = 'фриланс', 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), 
    deposit = confirm('Есть ли у вас депозит в банке?'), 
    mission = 200000, 
    period,
    budgetDay,
    accumulatedMonth,
    expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1   = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2   = +prompt('Во сколько это обойдется?');

function showTypeOf(data){
  console.log(typeof(data));
}

const getExpensesMonth = function() {
  return amount1 + amount2;
};

function getAccumulatedMonth(){
  return money - getExpensesMonth();
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
console.log('расходы за месяц ' + getExpensesMonth());
console.log(addExpenses.toLowerCase().split(', '));
console.log('цель будет достигнута через ' + getTargetMonth() + ' месяцев');
console.log('бюджет на день составляет: ' + budgetDay);
console.log(getStatusIncome());