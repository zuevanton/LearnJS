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

let money = getNumberFromPrompt('Ваш месячный доход?');

let 
    startBtn = document.getElementById('start'),
    addIncomeBtn = document.querySelector('.income').getElementsByTagName('button')[0],
    addExpensesBtn = document.querySelector('.expenses').getElementsByTagName('button')[0],
    depositCheckBtn = document.querySelector('#deposit-check'),
    addIncomeInput = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalexpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    period = document.querySelector('.period-select'),
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

console.log(startBtn);
console.log(addIncomeBtn);
console.log(addExpensesBtn);
console.log(addIncomeBtn);
console.log(addExpensesBtn);
console.log(depositCheckBtn);
console.log(addIncomeInput);
console.log(budgetMonthValue);
console.log(budgetDayValue);
console.log(expensesMonthValue);
console.log(additionalIncomeValue);
console.log(additionalexpensesValue);
console.log(incomePeriodValue);
console.log(targetMonthValue);
console.log(salaryAmount);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(addExpensesItem);
console.log(targetAmount);
console.log(period);
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
