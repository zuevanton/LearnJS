// 'use strict';
// const isNumber = function(n){
//   return !isNaN(parseFloat(n)) && isFinite(n);
// };

// const getNumberFromPrompt = function (promptText){
//   let answer;
//   do {
//     answer = prompt(promptText);
//   }
//   while(!isNumber(answer) || answer.trim() === '' || answer === null);
//   return answer;
// };

// const getTextFromPrompt = function(promptText){
//   let answer;
//   do {
//     answer = prompt(promptText);
//   }
//   while(!isNaN(+answer));
//   return answer;
// };

// let money = getNumberFromPrompt('Ваш месячный доход?'),

// appData = {
//   income: {},
//   addIncome: [],
//   expenses: {},
//   expensesMonth: 0,
//   addExpenses: [],
//   deposit: false,
//   percentDeposit: 0,
//   moneyDeposit: 0,
//   mission: 50000,
//   period: 6,
//   budget: money,
//   budgetDay: 0,
//   budgetMonth: 0,
//   getExpensesMonth: function() {
//     for(let key in appData.expenses){
//       appData.expensesMonth += appData.expenses[key];
//     }
//   },
//   getBudget: function(){
//     appData.budgetMonth = appData.budget - appData.expensesMonth;
//     appData.budgetDay = Math.floor(appData.budgetMonth / 30);
//   },
//   getTargetMonth: function(){
//     return Math.ceil(appData.mission / appData.budgetMonth);
//   },
//   getStatusIncome: function(){
//     if (appData.budgetDay >= 1200) {
//       return ('У вас высокий уровень дохода');
//     }
//     else if (appData.budgetDay >= 600) {
//       return ('У вас средний уровень дохода');
//     }
//     else if (appData.budgetDay < 600) {
//       return ('К сожалению у вас уровень дохода ниже среднего');
//     }
//     else {
//       return ('Что то пошло не так');
//     }  
//   },
//   asking: function(){
//     if(confirm('есть ли у вас дополнительный источник дохода?')){
//       let itemIncome = getTextFromPrompt('какой?'),
//           cashIncome = getNumberFromPrompt('сколько в месяц на это зарабатываете?');
//       appData.income[itemIncome] = cashIncome;
//     }

//     let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
//         appData.deposit = confirm('Есть ли у вас депозит в банке?');

//     if(addExpenses.length === addExpenses.toLowerCase().split(', ').length){
//       appData.addExpenses = addExpenses.toLowerCase().split(',');
//     }
//     else appData.addExpenses = addExpenses.toLowerCase().split(', ');
//     let i = 1;
//     const getPropertyName = function(count){
//       return count + '. ' + getTextFromPrompt('введите обязательную статью расходов');
//     };
//     do{
//       let propertyName = getPropertyName(i);
//       appData.expenses[propertyName] = getNumberFromPrompt('во сколько это обойдется?');
//       i++;
//     }
//     while (confirm('есть еще расходы?'));
//   },
//   getInfoDeposit: function(){
//     if(appData.deposit){
//       appData.percentDeposit = getNumberFromPrompt('Какой годовой процент?');
//       appData.moneyDeposit   = getNumberFromPrompt('какая сумма заложена?');
//     }
//   },
//   calcSavedMoney: function(){
//     return appData.budgetMonth * appData.period;
//   }
// };

// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();

// console.log('расходы за месяц составят ' + appData.expensesMonth + ' р.');
// if (appData.getTargetMonth() < 0){
//   console.log('цель не будет достигнута');
// } else {
//   console.log('цель будет достигнута через ' + appData.getTargetMonth() + ' месяцев');
// }
// console.log(appData.getStatusIncome());

// console.log('Наша программа включает в себя данные: ');
// for(let key in appData){
//   console.log(key + ' : ' + appData[key]);
// }
// appData.getInfoDeposit();
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());


// function up(){
//   let addExpensesStr = '';
//   appData.addExpenses.forEach(function(el){
//     addExpensesStr += el[0].toUpperCase() + el.slice(1) + ', ';
//   });
//   return addExpensesStr.slice(0, addExpensesStr.length - 2);
// }

// console.log(up());



'use strict';
const isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const getNumberFromPrompt = function (promptText){
  let answer;
  do {
    answer = prompt(promptText);
  }
  while(!isNumber(answer) || answer.trim() === '' || answer === null);
  return answer;
};

const getTextFromPrompt = function(promptText){
  let answer;
  do {
    answer = prompt(promptText);
  }
  while(!isNaN(+answer));
  return answer;
};

let money = getNumberFromPrompt('Ваш месячный доход?'),

appData = {
  income: {},
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 6,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  getExpensesMonth: function() {
    for(let key in appData.expenses){
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function(){
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function(){
    return Math.ceil(appData.mission / appData.budgetMonth);
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
    if(confirm('есть ли у вас дополнительный источник дохода?')){
      let itemIncome = getTextFromPrompt('какой?'),
          cashIncome = getNumberFromPrompt('сколько в месяц на это зарабатываете?');
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        appData.addExpenses = addExpenses.split(',');
    for(let x = 0; x < appData.addExpenses.length; x++){
      let trimmed = appData.addExpenses[x].trim();
      appData.addExpenses[x] = trimmed[0].toUpperCase() + trimmed.slice(1).toLowerCase();
    }
    appData.addExpenses = appData.addExpenses.join(', ');

    let i = 1;
    const getPropertyName = function(count){
      return count + '. ' + getTextFromPrompt('введите обязательную статью расходов');
    };
    do{
      let propertyName = getPropertyName(i);
      appData.expenses[propertyName] = getNumberFromPrompt('во сколько это обойдется?');
      i++;
    }
    while (confirm('есть еще расходы?'));
  },
  getInfoDeposit: function(){
    if(appData.deposit){
      appData.percentDeposit = getNumberFromPrompt('Какой годовой процент?');
      appData.moneyDeposit   = getNumberFromPrompt('какая сумма заложена?');
    }
  },
  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

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
appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
console.log(appData.addExpenses);