'use strict';
let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money,
    start = function(){
  do {
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money) || money.trim() === '' || money === null);
};
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 6,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  getExpensesMonth: function() {
    let sum = 0;
    for(let key in appData.expenses){
      sum += appData.expenses[key];
    }
    return sum;
  },
  getBudget: function(){
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function(){
    appData.period = Math.ceil(appData.mission / appData.budgetMonth);
    return appData.period;
  },
  getStatusIncome: function(){
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    }
    else if (appData.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    }
    else if (appData.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    }
    else {
      return ('Что то пошло не так');
    }  
  },
  asking: function(){
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
    let i = 1;
    const getPropertyName = function(count){
      return count + '. ' + prompt('введите обязательную статью расходов');
    };
    do{
      let propertyName = getPropertyName(i);
      appData.expenses[propertyName] = prompt('во сколько это обойдется?');
      while(!isNumber(appData.expenses[propertyName]) || appData.expenses[propertyName].trim() === '' || appData.expenses[propertyName] === null){
        appData.expenses[propertyName] = prompt('во сколько это обойдется?');
      }
      appData.expenses[propertyName] = +appData.expenses[propertyName];
      i++;
    }
    while (confirm('есть еще расходы?'));
  } 
};

appData.asking();
appData.expensesMonth = appData.getExpensesMonth();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log('расходы за месяц составят ' + appData.expensesMonth + ' р.');
if (appData.getTargetMonth() < 0){
  console.log('цель не будет достигнута');
} else {
  console.log('цель будет достигнута через ' + appData.getTargetMonth() + ' месяцев');
}
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for(let key in appData){
  console.log(key + ' : ' + appData[key]);
}