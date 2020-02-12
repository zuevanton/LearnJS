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
    incomeItems = document.querySelectorAll('.income-items'),
    cancel = document.getElementById('cancel');
const isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};


const AppData = function(){
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;

};
AppData.prototype.check = function(){
  if(salaryAmount !== ''){
    start.removeAttribute('disabled');
  }
};
AppData.prototype.start = function(){
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getIncome();
  this.getBudget();
  this.showResult();
  this.blockInputs();
  this.showClear();
};
AppData.prototype.showResult = function(){
  let _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcPeriod();
  periodSelect.addEventListener('input', function(){
    incomePeriodValue.value = _this.calcPeriod();
  });
};
AppData.prototype.getExpensesMonth = function() {
  for(let key in this.expenses){
    this.expensesMonth += this.expenses[key];
  }
};
AppData.prototype.getAddExpenses = function(){
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item !== ''){
      this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getBudget = function(){
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function(){
  return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function(){
  if (this.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  }
  else if (this.budgetDay >= 600) {
    return ('У вас средний уровень дохода');
  }
  else if (this.budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  }
  else {
    return ('Что то пошло не так');
  }  
};
AppData.prototype.addExpensesBlock = function(){
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.querySelectorAll('input')[0].value = '';
  cloneExpensesItem.querySelectorAll('input')[1].value = '';
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  this.validateNumber();
  this.validateText();
  if(expensesItems.length === 3){
    expensesPlus.style.display = 'none';
  }
};
AppData.prototype.addIncomeBlock = function(){
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.querySelectorAll('input')[0].value = '';
  cloneIncomeItem.querySelectorAll('input')[1].value = '';
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  this.validateNumber();
  this.validateText();
  if(incomeItems.length === 3) {
    incomePlus.style.display = 'none';
  }
};
AppData.prototype.getExpenses = function(){
  expensesItems.forEach((item) => {
    let itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = +item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== ''){
      this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function(){
  incomeItems.forEach((item) => {
    let itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value;
    if(itemIncome !== '' && cashIncome !== ''){
      this.income[itemIncome] = +cashIncome;
    }
  });
  for(let key in this.income){
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getAddIncome = function(){
  additionalIncomeItem.forEach((item) => {
    let itemValue = item.value.trim();
    if(itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.calcSavedMoney = function(){
  return this.budgetMonth * this.period;
};
AppData.prototype.calcPeriod = function(){
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.getPeriodAmount = function(){
  periodAmount.textContent = periodSelect.value;
};
AppData.prototype.validateNumber = function(){
  document.querySelectorAll('[placeholder="Сумма"]').forEach((item) => {
    item.addEventListener('keydown', function(e){
      if((e.key >= '0' && e.key <= '9') || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Delete' || e.key === 'Backspace'){
        return e.key;
      }
      else e.preventDefault();
    });
  });
};
AppData.prototype.validateText = function(){
  document.querySelectorAll('[placeholder="Наименование"]').forEach((item) => {
      item.addEventListener('keydown', function(e){
        let reg = /[а-яё]/i;
        if(reg.test(e.key) || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Delete' ||
        e.key === 'Backspace' || e.key === ' ' || e.key === ',' || e.key === '.'){
          return e.key;
        }
        else e.preventDefault();
      });
  });
};
AppData.prototype.blockInputs = function(){
  document.querySelectorAll('.data input[type="text"]').forEach(item =>{
    item.disabled = true;
  });
};
AppData.prototype.showClear = function(){
  start.style.display = 'none';
  cancel.style.display = 'block';
  expensesPlus.style.display = 'none';
  incomePlus.style.display = 'none';
};
AppData.prototype.reset = function(){
  document.querySelectorAll('input[type="text"]').forEach(item =>{
    item.disabled = false;
    item.value = '';
  });
  start.style.display = 'block';
  cancel.style.display = 'none';
  start.disabled = true;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  periodAmount.textContent = 1;
  periodSelect.value = 1;
  expensesPlus.style.display = 'block';
  incomePlus.style.display = 'block';
  document.querySelectorAll('.expenses-items').forEach((item, i) => {
    if (i > 0){
      item.remove();
    }
  });
  document.querySelectorAll('.income-items').forEach((item, i) => {
    if (i > 0){
      item.remove();
    }
  });
};
AppData.prototype.init = function(){
  start.disabled = true;
  salaryAmount.addEventListener('input', function(e){
  if(e.target.value === ''){
    start.disabled = true;
  }
  else {
    start.disabled = false;
  }
  });
  start.addEventListener('click', this.start.bind(this));
  cancel.addEventListener('click', this.reset.bind(this));
  this.validateText();
  this.validateNumber();
  expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
  incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
  periodSelect.addEventListener('input', this.getPeriodAmount.bind(this));
};
const appData = new AppData();
appData.init();