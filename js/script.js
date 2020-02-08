'use strict';
let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), 
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items');
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

function validateNumber(){
  document.querySelectorAll('[placeholder="Сумма"]').forEach((item) => {
    item.addEventListener('keydown', function(e){
      if((e.key >= '0' && e.key <= '9') || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Delete' || e.key === 'Backspace'){
        return e.key;
      }
      else e.preventDefault();
    });
  });
}
validateNumber();
function validateText(){
  document.querySelectorAll('[placeholder="Наименование"]').forEach((item) => {
      item.addEventListener('keydown', function(e){
        let reg = /[а-яё]/i;
        if(reg.test(e.key) || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Delete' ||
        e.key === 'Backspace' || e.key === ' ' || e.key === ',' || e.key === '.'){
          return e.key;
        }
        else e.preventDefault();
      });
  })
}
validateText();
let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  start: function(){
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getIncome();
    appData.getBudget();
    appData.showResult();
  },
  showResult: function(){
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('input', function(){
      incomePeriodValue.value = appData.calcPeriod();
    });
  },
  getExpensesMonth: function() {
    for(let key in appData.expenses){
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getBudget: function(){
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function(){
    return Math.ceil(targetAmount.value / appData.budgetMonth);
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
  addExpensesBlock: function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelectorAll('input')[0].value = '';
    cloneExpensesItem.querySelectorAll('input')[1].value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    validateNumber();
    validateText();
    if(expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input')[0].value = '';
    cloneIncomeItem.querySelectorAll('input')[1].value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    validateNumber();
    validateText();
    if(incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getExpenses: function(){
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value,
          cashExpenses = +item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function(){
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value,
          cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = +cashIncome;
      }
    });
    for(let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddIncome: function(){
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if(itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getInfoDeposit: function(){
    if(appData.deposit){
      appData.percentDeposit = getNumberFromPrompt('Какой годовой процент?');
      appData.moneyDeposit   = getNumberFromPrompt('какая сумма заложена?');
    }
  },
  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
  },
  calcPeriod: function(){
    return appData.budgetMonth * periodSelect.value;
  },
  getPeriodAmount: function(){
    periodAmount.textContent = periodSelect.value;
  }
};

start.disabled = true;
salaryAmount.addEventListener('input', function(e){
  if(e.target.value !== ''){
    start.disabled = false;
    start.addEventListener('click', appData.start);
  }
  else {
    start.disabled = true;
  }
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriodAmount);
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
